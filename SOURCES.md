# 域名来源与核实程度

核查日期：2026-11-12（本机日期）。当前启用 73 条域名后缀：Gate 13、MEXC 31、Bybit 21、Bitget 7、Bitfinex 1。用户最初提供的 22 个域名全部保留。

本文件记录代理匹配的依据，不是登录网址导航。官网引用、页面跳转、证书关联和社区维护是不同等级的证据，均不能保证域名未来仍归同一方、当前可用或适合登录。没有将搜索结果里自称“官网”的推广/SEO 域名直接加入规则。

## Gate：9 条

| 已启用域名 | 依据与等级 |
| --- | --- |
| `gate.com`、`gate.io` | 用户指定的现行/原主域；备用页面引用 `www.gate.com`，官方 SDK 链接指向 Gate 开发文档。主站部分请求受 WAF 限制，未读到官方备用域公告。 |
| `gateio.ws` | [Gate 官方 Python SDK 配置](https://github.com/gateio/gateapi-python/blob/master/gate_api/configuration.py) 的默认基址为 `https://api.gateio.ws/api/v4`；[时间接口](https://api.gateio.ws/api/v4/spot/time) 本次返回 JSON。根域规则覆盖 API、合约和 WebSocket 子域。 |
| `gate.ac` | [实际页面](https://www.gate.ac/) 返回 Gate 前端，引用 `www.gate.com`、`web3.gate.com` 等；社区 [Crypto.list](https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/Crypto/Crypto.list) 也收录。属于页面/社区证据，未取得官方公告。 |
| `gateimg.com`、`gimg2.staticimgs.com`、`icon.staticimgs.com` | `www.gate.ac` 页面引用的图片/图标资源。对 `staticimgs.com` 仅匹配观察到的两个主机及其子域，未把整个共享根域加入。 |
| `gate51.club`；`api-normal-g2.studiotv.net`、`api-normal-g5.studiotv.net`、`spotws-normal-g2.studiotv.net`、`fxws-normal-g2.studiotv.net`、`wsapp-spot-g2.studiotv.net` | 证书透明度记录中与 `www.gate.io` 同证书的备用域/接口主机。属于技术关联，未取得官方页面公告。对 `studiotv.net` 仅匹配观察到的具体接口主机，未启用整个根域。 |

证书线索可从 [CertSpotter：gate51.club](https://api.certspotter.com/v1/issuances?domain=gate51.club&include_subdomains=true&expand=dns_names) 复核；本次记录 ID 为 `17192407682`。共享证书是关联线索，不能单独当作登录安全证明。

## MEXC：31 条

一手来源为 [www.mexc.fm](https://www.mexc.fm/) 的生产前端配置，以及页面的 `hreflang` 链接。页面根节点的 `data-env` 值带有 `_env_context_:::` 前缀，后续 Base64 内容为 JSON。仅检查公开配置里的域名字段，没有保存账户凭据。

- `hreflang` 引用 `mexc.com`、`mexc.co`、`mexc.fm`。
- `PUBLIC_S3_DOMAIN` 为 `static.mocortech.com`，因此加入 `mocortech.com`，覆盖静态资源和下载等子域。
- `PUBLIC_THIRD_PARTY_LOGIN` 中列出的站点域名如下。这里只将其认定为“官网生产配置列出”，不额外推断每个域名仍在服务，也没有查询或验证 Google 侧的授权状态。

```text
mexc.com
mexc.co
greentreeone.com
365huo.xyz
flytogarden.com
mcaketech.com
hotbookzone.com
alookzone.com
payapptoday.com
weappnet.com

mexc.fm
mexc.in
mexc.kr
linkappmarketing.com
mexc.ae
mexc.cl
mexc.ee
mexc.ge
getappnet.com
cryptolinkapp.com

atomupre.com
getgogoto.com
ddjhe.com
hottreeswim.ru
mexc.io
mexc.cc
mexccex.com
mexcsite.com
mx-exchange.co
coldbookfly.ru
```

`mexccex.com` 是配置中的准确拼写；没有把无相同证据的 `mexcex.com` 加进去。配置中的 Google 等共享第三方域没有整体加入交易所规则。

`mocortech.com` 是资源域；`flytogarden.com` 是上述配置列出的关联站点，应归入 MEXC。备用域不必名称中包含 `mexc`；反过来，名称相似也不足以证明归属。

## Bybit：21 条

[Bybit 官方 API 指引](https://bybit-exchange.github.io/docs/v5/guide)及其[官方源码](https://github.com/bybit-exchange/docs/blob/master/docs/v5/guide.mdx)明确列出：

```text
api.bybit.com
api.bytick.com
api.bybit.tr
api.bybit.kz
api.bybitgeorgia.ge
api.bybit.ae
api.bybit.eu
api.bybit.id
```

因此加入以上 8 个域名的根域后缀。官方 [WebSocket 文档](https://bybit-exchange.github.io/docs/v5/ws/connect)中的 `stream.bybit.com` 等已经被根域规则覆盖。

用户指定的 `www.bybit.nl` 本次观察到 HTTP 301 跳转至 `https://www.bybit.eu/`，一并保留 `bybit.nl`。区域 API 地址不意味着可当作其他地区账户的网页登录入口。

其余 12 个域名来自 [v2fly/domain-list-community 的 Bybit 清单](https://github.com/v2fly/domain-list-community/blob/master/data/bybit)：

```text
bycsi.com
byapis.com
bycbe.com
bymj.io
byabcde.com
byapps.net
byd3c3.com
bybit.biz
bybdc6.com
bybit-global.com
bybit.cloud
bybitglobal.com
```

这 12 个按社区追踪的备用/接口域纳入分流，没有取得逐一对应的官方公告；部分本次未解析或未连接成功，不保证仍在使用。`bytick.com` 同时出现在官方文档和社区清单，按官方文档证据记录。未把共享客服服务的整个根域加入。

## Bitget：7 条

一手来源 [Bitget 主站](https://www.bitget.com/) 本次页面包含：

- `hrefLang="en-NG"` 指向 `https://www.bitgetapp.com`。
- `hrefLang="fr"` 指向 `https://www.bitget.site/fr`。
- `hrefLang="id"` 指向 `https://www.bitgetapps.com/id`。
- 页面资源/安全配置引用 `https://static.bgbstatic.com`。

因此 `bitget.com`、`bitget.site`、`bitgetapp.com`、`bitgetapps.com`、`bgbstatic.com` 共 5 个后缀有官网直接引用证据。`api.bitget.com`、`ws.bitget.com` 等由 `bitget.com` 覆盖。

另外启用：

| 域名 | 依据与等级 |
| --- | --- |
| `krbitget.com` | [urlscan 历史索引](https://urlscan.io/api/v1/search/?q=domain%3Akrbitget.com) 有 Bitget App 落地页，第三方渲染观察到跳往 `www.bitget.com`；属于行为/历史记录，未找到官方公告。 |
| `bitget.cc` | [CCXT 的 Bitget 实现](https://github.com/ccxt/ccxt/blob/master/ts/src/bitget.ts) 中 `urls.fees` 使用 `https://www.bitget.cc/zh-CN/rate?tab=1`；属于第三方项目源码线索，未取得官方页面背书。 |

未扩展 Bitget Wallet/BitKeep 的独立域名体系，当前任务只处理用户列出的交易所。

## Bitfinex：1 条

保留 `bitfinex.com`，覆盖主站、API、公开行情 API、文档和支持子域。[Bitfinex 官方 Node SDK](https://github.com/bitfinexcom/bitfinex-api-node) 指向[官方 API 文档](https://docs.bitfinex.com/v2/reference)。

未找到足够依据确认独立的中国大陆备用根域，因此没有凭名称额外生成类似网址。

## 未默认启用的线索

| 域名 | 未启用原因 |
| --- | --- |
| `9global.net`、`gatebase.center`、`gatedex.com` | 有证书/技术关联线索，未取得当前页面用途与交易所访问关系的足够证据。 |
| `gatescan.org` | 与 Gate 链浏览器相关的证书线索，未确认属于本次交易所网页/App 分流所需。 |
| `mexc.us` | 见于 MEXC 多域测试网证书，但不在本次提取的生产站点配置清单内。 |
| `gdiii.xyz`、`mexceu.com` | 证书或历史线索，未取得本次官网生产配置/公告确认。 |

这些线索没有加入生效规则。若日后确认有实际需要，可核实当前归属后再添加。

## 可用性与大陆入口的限制

本次既做了公开搜索、官网/官方仓库读取，也参考了社区清单、页面跳转和证书记录。部分站点直连失败，部分返回 403/WAF；没有把失败直接等同于域名无效，也没有把同一 CDN IP 或相同注册商单独当作官方认证。

使用本机已配置的代理读取到页面，不能证明该地址能在中国大陆直连。这里提供尽可能完整且注明来源的匹配清单，不保证所有备用地址当前可用，也不声称已经穷尽全部域名。
