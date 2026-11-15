const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const scriptPath = path.join(__dirname, '..', 'flclash.js');
const personalRules = [
  'PROCESS-NAME,com.gateio.gateio,个人交易所代理',
  'PROCESS-NAME,com.mexcpro.client,个人交易所代理',
  'PROCESS-NAME,com.bybit.app,个人交易所代理',
  'PROCESS-NAME,com.bitget.exchange,个人交易所代理',
  'PROCESS-NAME,com.bitfinex.mobileapp,个人交易所代理',
  'PROCESS-NAME,com.okinc.okex.gp,个人交易所代理',
  'PROCESS-NAME,com.binance.dev,个人交易所代理',
  'RULE-SET,personal-exchanges,个人交易所代理',
];
function apply(config) {
  const context = vm.createContext({ config });
  vm.runInContext(fs.readFileSync(scriptPath, 'utf8'), context);
  return JSON.parse(JSON.stringify(vm.runInContext('main(config)', context)));
}

test('个人规则优先于订阅规则，并保留节点、DNS、既有分组和规则集', () => {
  const config = {
    proxies: [{ name: '示例节点', type: 'socks5', server: '127.0.0.1', port: 1080 }],
    'proxy-groups': [{ name: '机场选择', type: 'select', proxies: ['示例节点'] }],
    'rule-providers': { original: { type: 'inline', behavior: 'domain', payload: ['example.org'] } },
    rules: ['DOMAIN-SUFFIX,google.com,DIRECT', 'GEOIP,CN,DIRECT', 'MATCH,机场选择'],
    dns: { enable: true, nameserver: ['https://dns.alidns.com/dns-query'] },
    mode: 'rule',
    'find-process-mode': 'off',
  };
  const result = apply(structuredClone(config));
  assert.deepEqual(result.rules.slice(0, 8), personalRules);
  assert.deepEqual(result.rules.slice(8), config.rules);
  assert.equal(result.mode, 'rule');
  assert.equal(result['find-process-mode'], 'always');
  assert.deepEqual(result.proxies, config.proxies);
  assert.deepEqual(result.dns, config.dns);
  assert.deepEqual(result['proxy-groups'][0], config['proxy-groups'][0]);
  assert.deepEqual(result['rule-providers'].original, config['rule-providers'].original);
  const group = result['proxy-groups'].find(x => x.name === '个人交易所代理');
  assert.equal(group.type, 'select');
  assert.equal(group['include-all'], true);
  assert.deepEqual(group.proxies, ['REJECT']);
  const provider = result['rule-providers']['personal-exchanges'];
  assert.equal(provider.type, 'inline');
  assert.equal(provider.behavior, 'classical');
  assert.ok(provider.payload.includes('DOMAIN-SUFFIX,gate.com'));
  assert.ok(provider.payload.includes('DOMAIN-SUFFIX,bitfinex.com'));
  assert.equal(provider.url, undefined);
});

test('重复应用不会重复添加分组或规则', () => {
  const config = { proxies: [], 'proxy-groups': [], rules: ['MATCH,DIRECT'] };
  const once = apply(config);
  assert.deepEqual(apply(structuredClone(once)), once);
});

test('只有 proxy-providers 的订阅也能接入个人策略组', () => {
  const config = {
    'proxy-providers': { airport: { type: 'http', url: 'https://example.org/nodes.yaml' } },
    rules: ['MATCH,DIRECT'],
  };
  const result = apply(structuredClone(config));
  assert.deepEqual(result['proxy-providers'], config['proxy-providers']);
  assert.equal(result['proxy-groups'][0]['include-all'], true);
  assert.deepEqual(result.rules.slice(0, 8), personalRules);
  assert.equal(result.rules[8], 'MATCH,DIRECT');
});

test('升级旧脚本保留已有个人分组，并去除重复的个人规则', () => {
  const group = { name: '个人交易所代理', type: 'select', proxies: ['台湾 08', 'REJECT'] };
  const result = apply({
    'proxy-groups': [group],
    rules: [personalRules[2], personalRules[7], 'MATCH,DIRECT'],
  });
  assert.deepEqual(result['proxy-groups'], [group]);
  assert.deepEqual(result.rules, [...personalRules, 'MATCH,DIRECT']);
});
