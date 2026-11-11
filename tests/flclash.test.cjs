const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const scriptPath = path.join(__dirname, '..', 'flclash.js');
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
    rules: ['DOMAIN-SUFFIX,example.org,DIRECT', 'MATCH,机场选择'],
    dns: { enable: true, nameserver: ['https://dns.alidns.com/dns-query'] },
  };
  const result = apply(structuredClone(config));
  assert.equal(result.rules[0], 'RULE-SET,personal-exchanges,个人交易所代理');
  assert.deepEqual(result.rules.slice(1), config.rules);
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
  assert.equal(result.rules[1], 'MATCH,DIRECT');
});
