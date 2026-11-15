# 规则来源与核实程度

初版核查：2026-11-12；本轮增补核查：2026-11-15（本机日期）。当前共 156 条：121 条域名后缀、33 条精确主机、2 条 IPv4 /32。按交易所分别为 Gate 39、MEXC 31、Bybit 30、Bitget 7、Bitfinex 1、OKX 10、Binance 38。初版 73 条及用户最初提供的 22 个域名全部保留；本轮新增 83 条。

除注明本轮增补外，既有五家交易所的历史依据保留初版核查记录，没有将旧的可用性观测改写为本轮实测。安卓另外增加七个 Google Play 包名规则，直接指向“个人交易所代理”，不经过 GLOBAL。

本文件记录代理匹配的依据，不是登录网址导航。官网引用、页面跳转、证书关联和社区维护是不同等级的证据，均不能保证域名未来仍归同一方、当前可用或适合登录。没有将搜索结果里自称“官网”的推广/SEO 域名直接加入规则。

## Gate：39 条（原有 13，本轮新增 26）

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

## Bybit：30 条（原有 21，本轮新增 9）

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

## 本轮 Gate / Bybit 的连接证据与新增项

用户开启 FlClash“查找进程”后提供的连接记录确认：

| App 进程 | 实际目标 | 原命中策略 |
| --- | --- | --- |
| `com.bybit.app` | `43.135.121.179`、`43.154.61.67`，UDP `51051/51052` | `Match → Final → 美国节点` |
| `com.gateio.gateio` | `app-fx-ws.bxjddjt.com`、`api-normal-v2.xtwlps.com`、`api.ldd678.com` | `GeoIP(cn) → DIRECT` |
| `com.gateio.gateio` | `app.studiotv.net` | `Match → Final → 美国节点` |
| `com.bybit.app` | `sc-datasink.ffbbbdc6d3c353211fe2ba39c9f744cd.com` | `Match → Final → 美国节点` |

这证明对应 App 发起过这些连接，不证明目标根域/IP 是交易所独占，也不能仅凭 UDP 端口或速率推断其为交易、登录或风控接口。截图不包含订阅或账户凭据，因此本仓库只记录必要的包名与目标，不保存截图。

- Gate 的四个截图主机按 `DOMAIN` 精确加入，不扩成整个根域或其共用 CDN IP。
- Gate 另有 22 条来自社区 [Lxp1986/rules-and-scripts 的 gate.rules](https://github.com/Lxp1986/rules-and-scripts/blob/master/sources/gate.rules)：`gateio.io`、`gateio.im`、`gateio.services`；`csrqoa.com`、`zhaqby.com`、`panpno.com`、`wzchjq.com` 下清单列明的 App/现货 WS/合约 API 主机；`orig-app-spot-ws.bitstreamonline.net`、`app.smartappnet.net`、`fx-appapi.gateio.live`、`snssdk.gatedata.org`、`query.gatedns.net`、`social.gposts.net`、`gatedataimg.com`。这些是社区匹配线索，未取得逐项官方公告；随机名称的接口域优先匹配具体主机。没有把清单里的 Google、AppsFlyer、Volcengine 等共享平台整个根域纳入，也没有扩展独立 Web3 钱包的全部域名。
- Bybit 官方 [V5 指引源码](https://github.com/bybit-exchange/docs/blob/master/docs/v5/guide.mdx)新增 Japan / HongKong 段，明确列出 `api.manepa.jp`、`api-testnet.manepa.jp`、`api.spark-fintech.com`、`api-testnet.spark-fintech.com`。按四个精确主机加入，不把其他券商/金融站点的整个根域代理。
- Bybit 官网加载的 [data-core 公开脚本](https://www.bybit.com/common-static/infra-static/data-core/data-core.latest.min.js)引用 `sc-abtest.ffe390afd658c19dcbf707e0597b846d.de`、`sc-web.ffe390afd658c19dcbf707e0597b846d.de`、`sc-datasink.ffbbbdc6d3c353211fe2ba39c9f744cd.com`，加入三个精确主机。这是统计资源引用，不能当作交易 API 地址。
- 两个 Bybit IP 同时见于社区 [Bybit.list](https://github.com/RainesCheng/ProxyTools/blob/6898b204664874bbdf437e028988d9f8c07f5083/Loon/rules/Bybit.list)，但本轮启用的主要依据是用户实际 App 进程记录。仅加 `/32,no-resolve`，没有照抄该清单的其他云网段或第三方 IP。IP 可能变更或被其他服务使用。

## OKX：10 条

### 官方文档与官网配置：6 条

- `okx.com`：[官方 V5 文档](https://www.okx.com/docs-v5/en/)和 [OKX 官方 agent-trade-kit 常量](https://github.com/okx/agent-trade-kit/blob/github-main/packages/core/src/constants.ts)列明 `https://www.okx.com`、`eea.okx.com`、`us.okx.com`、`tr.okx.com`，网页入口 `my.okx.com` / `app.okx.com`。根域还覆盖 REST、`ws.okx.com`、模拟盘 `wspap.okx.com`、SBE 的 `openapi.okx.com`、静态资源与推送子域。
- `okx.ac`、`okx.cab`、`okx.reise`：[OKX 官网](https://www.okx.com/en-us)内嵌 `cdnDomainMap` 明确列出 `static.okx.ac`、`static.okx.cab`、`static.okx.reise`。这是第一方运行配置引用；本轮也观察到这些站点的 OKX 页面，不等同于逐项备用域官方公告。
- `static.coinall.ltd`：同页 `cdnDomainMap.CN` 和 `languageCdnUrl` 使用该主机。仅按 `DOMAIN` 加入实际静态主机。
- `static.jingyunyilian.com`：同页 `cdnBackupList` 为 `["https://static.okx.com","https://static.jingyunyilian.com"]`。只加入精确共享 CDN 主机。

### 社区备用/历史项：4 条

[v2fly OKX 清单](https://github.com/v2fly/domain-list-community/blob/master/data/okx)列出 `okex.com`、`okx-dns.com`、`okx-dns1.com`、`okx-dns2.com`。沿用本仓库对社区备用域的分级方式纳入匹配，**未取得本轮逐项官方用途声明，不保证旧域仍在使用**。没有因名称猜测更多后缀；未把独立链/浏览器的 `xlayer.tech`、`oklink.com` 加入。

未找到官方公布的固定服务端 IP/CIDR；V5 文档里的 API Key 绑定 IP、用户 IP 白名单、错误信息中的 IP 是用户侧地址，不是应加入规则的 OKX 服务器。没有用即时 DNS 地址替代固定 IP。

## Binance（币安）：38 条

### 官方来源：6 条

| 已启用后缀 | 官方来源与覆盖 |
| --- | --- |
| `binance.com` | [现货 REST 文档](https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md)列 `api`、`api-gcp`、`api1`—`api4`；[官方连接器常量](https://github.com/binance/binance-connector-python/blob/master/common/src/binance_common/constants.py)覆盖现货、杠杆、USD-M/COIN-M 合约、期权、组合保证金、WebSocket、FIX/SBE 及 Demo 所用的该根域子域。无需逐条重复每个 API 路径。 |
| `binance.vision` | 同一 REST 文档列 `data-api.binance.vision`，连接器含 `data-stream` 和 `testnet`；[官方公共数据仓库](https://github.com/binance/binance-public-data)使用 `data.binance.vision`。覆盖公开行情、现货测试网和历史数据。 |
| `binance.info` | [官方 CHANGELOG](https://github.com/binance/binance-spot-api-docs/blob/master/CHANGELOG.md)的 Block Trades FAQ 链接直接使用 `www.binance.info/en/support/faq/detail/557f95eaf8fb4460aed0a891d42a1425`。本轮该站返回 Binance 页面，资源引用 `public.bnbstatic.com` 等。依据是官方文档引用，不是仅看证书或站点名称。 |
| `bnbstatic.com` | 上述站点页面资源引用；[官方 binance-skills-hub](https://github.com/binance/binance-skills-hub/tree/main/skills/binance-web3/query-address-info)也明确使用 `https://bin.bnbstatic.com` 作为资源前缀。 |
| `binancefuture.com` | 官方连接器常量列 `testnet.binancefuture.com`、`fstream.binancefuture.com`、`dstream.binancefuture.com`；属于合约测试环境。 |
| `binance.us` | [Binance.US 官方文档](https://docs.binance.us/)列 `https://api.binance.us`。它是独立美国实体，收录 API 匹配不代表与全球版账户或 App 互通。 |

### 社区备用与接口：32 条

来源为 [v2fly Binance 清单](https://github.com/v2fly/domain-list-community/blob/master/data/binance)。本轮与 Bybit/OKX 采用同样的社区证据等级：启用匹配，不宣称每个条目是当前可登录的官方入口。

- 备用/区域名称：`binance.cc`、`binance.cloud`、`binance.co`、`binance.me`、`binance.net`、`binancecnt.com`；`binancezh.be`、`.biz`、`.cc`、`.co`、`.com`、`.info`、`.ink`、`.kim`、`.link`、`.live`、`.mobi`、`.net`、`.pro`、`.sh`、`.top`。
- 社区 API/资源：`binanceapi.com`、`binanceru.net`、`bmwweb.solutions`、`bnappweb.black`、`bntrace.com`、`bsappapi.cc`、`bsappapi.com`、`bscdnweb.com`、`nftstatic.com`。
- 两个清单明确标为 `full:` 的 App 统计主机：`zftksc.cdn-settings.appsflyersdk.com`、`zftksc.launches.appsflyersdk.com`，使用 `DOMAIN` 精确匹配，不启用整个 AppsFlyer 根域。

上述社区项没有取得逐项官方公告，部分可能停用或改变用途。未收录搜索推广站 `binanceapp.com`，也未将社区中的独立链、慈善或白标 SaaS 平台（`binance.org`、`binance.charity`、`bnbchain.org`、`saasexch.*`）一并扩展。

未找到官方公布的固定服务端 IP/CIDR。官方文档给出域名，API Key IP 白名单涉及用户侧限制；本轮没有将文档示例 IP、解析出的 CDN 地址或整个 AWS/CloudFront 网段加入规则。

## Google Play 安卓包名

本轮逐项读取 Google Play 页面确认交易所主 App。只收录用户所用的 Play 版本，不自动加入独立钱包、地区版或侧载版本。

| 交易所 | Google Play 包名及来源 |
| --- | --- |
| Gate | [`com.gateio.gateio`](https://play.google.com/store/apps/details?id=com.gateio.gateio) |
| MEXC | [`com.mexcpro.client`](https://play.google.com/store/apps/details?id=com.mexcpro.client) |
| Bybit | [`com.bybit.app`](https://play.google.com/store/apps/details?id=com.bybit.app) |
| Bitget | [`com.bitget.exchange`](https://play.google.com/store/apps/details?id=com.bitget.exchange) |
| Bitfinex | [`com.bitfinex.mobileapp`](https://play.google.com/store/apps/details?id=com.bitfinex.mobileapp) |
| OKX | [`com.okinc.okex.gp`](https://play.google.com/store/apps/details?id=com.okinc.okex.gp) |
| Binance | [`com.binance.dev`](https://play.google.com/store/apps/details?id=com.binance.dev) |

OKX 的官网直装版 `com.okinc.okex` 和 Google Play 版不是同一个包名，本次只加 `.gp` 版。Binance.US 的 `com.binance.us` 是另一个 App，本次只为全球版添加包名规则。若今后改装其他版本，需要以连接记录中的实际包名为准。

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
