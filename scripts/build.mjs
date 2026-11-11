import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function generate(text) {
  const rules = text.split(/\r?\n/).map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));
  if (rules.length === 0) throw new Error('规则清单不能为空');
  for (const rule of rules) {
    const [type, domain, ...extra] = rule.split(',');
    if (type !== 'DOMAIN-SUFFIX' || extra.length || !domain || domain.length > 253 ||
        !/\.[a-z]{2,}$/.test(domain) || domain.split('.').some(label =>
          !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))) {
      throw new Error('无效的域名规则：' + rule);
    }
  }
  if (new Set(rules).size !== rules.length) throw new Error('规则清单存在重复项');

  return `// 由 scripts/build.mjs 生成。请编辑 rules/exchanges.list。
function main(config) {
  const groupName = '个人交易所代理';
  const providerName = 'personal-exchanges';
  const rule = 'RULE-SET,' + providerName + ',' + groupName;

  config['proxy-groups'] = config['proxy-groups'] || [];
  if (!config['proxy-groups'].some(group => group.name === groupName)) {
    config['proxy-groups'].push({
      name: groupName,
      type: 'select',
      proxies: ['REJECT'],
      'include-all': true,
      'exclude-type': 'Direct|Compatible',
    });
  }

  config['rule-providers'] = config['rule-providers'] || {};
  config['rule-providers'][providerName] = {
    type: 'inline',
    behavior: 'classical',
    payload: ${JSON.stringify(rules, null, 6)},
  };
  config.rules = [rule].concat((config.rules || []).filter(item => item !== rule));
  return config;
}
`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const source = new URL('../rules/exchanges.list', import.meta.url);
  const output = new URL('../flclash.js', import.meta.url);
  const script = generate(readFileSync(source, 'utf8'));
  writeFileSync(output, script);
  console.log('已生成 flclash.js');
}
