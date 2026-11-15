import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import { generate } from '../scripts/build.mjs';

test('生成脚本只携带有效规则，忽略注释和空行', () => {
  const context = vm.createContext({ config: { rules: ['MATCH,DIRECT'] } });
  vm.runInContext(generate('# test\r\n\nDOMAIN-SUFFIX,gate.com\r\nDOMAIN-SUFFIX,mexc.com\n'), context);
  const result = JSON.parse(JSON.stringify(vm.runInContext('main(config)', context)));
  assert.deepEqual(result['rule-providers']['personal-exchanges'].payload,
    ['DOMAIN-SUFFIX,gate.com', 'DOMAIN-SUFFIX,mexc.com']);
});

test('精确主机和 IPv4 规则完整传给内核，不混入代理策略', () => {
  const context = vm.createContext({ config: { rules: ['MATCH,DIRECT'] } });
  vm.runInContext(generate('DOMAIN,api.manepa.jp\nIP-CIDR,43.135.121.179/32,no-resolve\n'), context);
  const result = JSON.parse(JSON.stringify(vm.runInContext('main(config)', context)));
  assert.deepEqual(result['rule-providers']['personal-exchanges'].payload,
    ['DOMAIN,api.manepa.jp', 'IP-CIDR,43.135.121.179/32,no-resolve']);
});

test('无效输入不能生成额外策略、全局匹配或格式错误的规则', () => {
  for (const text of ['', '# comment', 'MATCH,DIRECT', 'DOMAIN-SUFFIX,example.com,DIRECT',
    'DOMAIN-SUFFIX,https://gate.com', 'DOMAIN-SUFFIX,-gate.com', 'DOMAIN-SUFFIX,gate..com',
    'DOMAIN,api.bybit.com,GLOBAL', 'DOMAIN,*.bybit.com',
    'IP-CIDR,999.135.121.179/32,no-resolve', 'IP-CIDR,43.135.121.179/33,no-resolve',
    'IP-CIDR,43.135.121.179/-1,no-resolve', 'IP-CIDR,43.135.121.179/032,no-resolve',
    'IP-CIDR,43.135.121.179/0,no-resolve', 'IP-CIDR,43.135.121.179/24,no-resolve',
    'IP-CIDR,43.135.121.179/32', 'IP-CIDR,43.135.121.179/32,DIRECT',
    'IP-CIDR,43.135.121.179/32,no-resolve,GLOBAL',
    'DOMAIN-SUFFIX,gate.com\nDOMAIN-SUFFIX,gate.com']) {
    assert.throws(() => generate(text), undefined, text);
  }
});
