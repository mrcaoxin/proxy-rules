// 首次发布检查：GitHub Actions 将规范此生成文件。
// 由 scripts/build.mjs 生成。请编辑 rules/exchanges.list。
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
    payload: [
      "DOMAIN-SUFFIX,gate.com",
      "DOMAIN-SUFFIX,gate.io",
      "DOMAIN-SUFFIX,gateio.ws",
      "DOMAIN-SUFFIX,gate.ac",
      "DOMAIN-SUFFIX,gateimg.com",
      "DOMAIN-SUFFIX,gimg2.staticimgs.com",
      "DOMAIN-SUFFIX,icon.staticimgs.com",
      "DOMAIN-SUFFIX,gate51.club",
      "DOMAIN-SUFFIX,studiotv.net",
      "DOMAIN-SUFFIX,mexc.com",
      "DOMAIN-SUFFIX,mexc.co",
      "DOMAIN-SUFFIX,mexc.fm",
      "DOMAIN-SUFFIX,mexc.ge",
      "DOMAIN-SUFFIX,mexc.in",
      "DOMAIN-SUFFIX,mexc.kr",
      "DOMAIN-SUFFIX,mexc.ae",
      "DOMAIN-SUFFIX,mexc.cl",
      "DOMAIN-SUFFIX,mexc.ee",
      "DOMAIN-SUFFIX,mexc.io",
      "DOMAIN-SUFFIX,mexc.cc",
      "DOMAIN-SUFFIX,mexccex.com",
      "DOMAIN-SUFFIX,mexcsite.com",
      "DOMAIN-SUFFIX,mx-exchange.co",
      "DOMAIN-SUFFIX,greentreeone.com",
      "DOMAIN-SUFFIX,365huo.xyz",
      "DOMAIN-SUFFIX,flytogarden.com",
      "DOMAIN-SUFFIX,mcaketech.com",
      "DOMAIN-SUFFIX,hotbookzone.com",
      "DOMAIN-SUFFIX,alookzone.com",
      "DOMAIN-SUFFIX,payapptoday.com",
      "DOMAIN-SUFFIX,weappnet.com",
      "DOMAIN-SUFFIX,linkappmarketing.com",
      "DOMAIN-SUFFIX,getappnet.com",
      "DOMAIN-SUFFIX,cryptolinkapp.com",
      "DOMAIN-SUFFIX,atomupre.com",
      "DOMAIN-SUFFIX,getgogoto.com",
      "DOMAIN-SUFFIX,ddjhe.com",
      "DOMAIN-SUFFIX,hottreeswim.ru",
      "DOMAIN-SUFFIX,coldbookfly.ru",
      "DOMAIN-SUFFIX,mocortech.com",
      "DOMAIN-SUFFIX,bybit.com",
      "DOMAIN-SUFFIX,bybit.nl",
      "DOMAIN-SUFFIX,bybit.eu",
      "DOMAIN-SUFFIX,bytick.com",
      "DOMAIN-SUFFIX,bybit.tr",
      "DOMAIN-SUFFIX,bybit.kz",
      "DOMAIN-SUFFIX,bybitgeorgia.ge",
      "DOMAIN-SUFFIX,bybit.ae",
      "DOMAIN-SUFFIX,bybit.id",
      "DOMAIN-SUFFIX,bycsi.com",
      "DOMAIN-SUFFIX,byapis.com",
      "DOMAIN-SUFFIX,bycbe.com",
      "DOMAIN-SUFFIX,bymj.io",
      "DOMAIN-SUFFIX,byabcde.com",
      "DOMAIN-SUFFIX,byapps.net",
      "DOMAIN-SUFFIX,byd3c3.com",
      "DOMAIN-SUFFIX,bybit.biz",
      "DOMAIN-SUFFIX,bybdc6.com",
      "DOMAIN-SUFFIX,bybit-global.com",
      "DOMAIN-SUFFIX,bybit.cloud",
      "DOMAIN-SUFFIX,bybitglobal.com",
      "DOMAIN-SUFFIX,bitget.com",
      "DOMAIN-SUFFIX,bitget.site",
      "DOMAIN-SUFFIX,bitgetapp.com",
      "DOMAIN-SUFFIX,bitgetapps.com",
      "DOMAIN-SUFFIX,bgbstatic.com",
      "DOMAIN-SUFFIX,krbitget.com",
      "DOMAIN-SUFFIX,bitget.cc",
      "DOMAIN-SUFFIX,bitfinex.com"
],
  };
  config.rules = [rule].concat((config.rules || []).filter(item => item !== rule));
  return config;
}
