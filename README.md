# 个人交易所代理规则

为 iOS Shadowrocket（小火箭）和 Android FlClash 维护同一份交易所域名/IP 清单。范围为 Gate、MEXC、Bybit、Bitget、Bitfinex、OKX、Binance（币安）；来源与核实程度见 [SOURCES.md](SOURCES.md)。安卓另外按 Google Play 官方 App 包名匹配，覆盖 App 的未知域名和纯 IP 连接。

## 固定地址

| 用途 | 地址 |
| --- | --- |
| 小火箭模块（使用首页当前代理节点） | https://raw.githubusercontent.com/mrcaoxin/proxy-rules/main/shadowrocket.module |
| FlClash 扩展脚本 | https://raw.githubusercontent.com/mrcaoxin/proxy-rules/main/flclash.js |
| 小火箭 RULE-SET / 两端共用清单 | https://raw.githubusercontent.com/mrcaoxin/proxy-rules/main/rules/exchanges.list |

使用 `raw.githubusercontent.com` 文件直链，不要复制 GitHub 的 `blob` 网页地址。小火箭“新建 RULE-SET”应填写 `exchanges.list`，`shadowrocket.module` 只供“模块”页面导入。链接随文件更新保持不变。

## iOS：Shadowrocket

### 使用独立的“台湾”策略组

1. 首页“全局路由”设为“配置”，选中正在使用的配置文件。
2. 在该配置中保留或创建“台湾”代理分组，并选好台湾节点。
3. 添加或编辑一条 `RULE-SET`：地址使用上表 `rules/exchanges.list`，策略选择实际的“台湾”分组，放在规则列表靠前的位置。
4. 如果此前启用了本仓库的“个人交易所代理”模块，先停用该模块，避免其中的 `PROXY` 规则先命中、转向首页默认节点。模块规则优先于普通配置规则。
5. 对当前配置执行“使用配置”或“编译配置”，下载更新后的远程清单，再重新连接并重开交易所 App。

**已经按上述方式配置的用户，无需重新添加规则或分组。** 更新仓库后，执行“使用配置 / 编译配置”即可。可在“配置 → 测试规则”测试 `www.okx.com`、`api.binance.com` 等域名，再用连接日志核对实际节点。

### 使用首页当前代理节点的可选方式

在“配置 → 模块 → ＋”导入 `shadowrocket.module` 并启用，再使用/编译当前配置。模块中的 `PROXY` 使用首页当前选中的节点，不固定到“台湾”组。不要同时依赖该模块和普通配置中的另一条同清单规则来选择不同节点。

iOS 使用域名和 IP 规则，不具备安卓 `PROCESS-NAME` 按包名兜底的能力。已知地址可以补充；未收录、又无法恢复域名的纯 IP 连接仍可能漏匹配。不需要 HTTPS 解密或安装证书。

## Android：FlClash

### 已经导入脚本的用户

1. 在脚本管理或“资源”页面，对已导入的 `flclash.js` 执行“同步”。固定地址未变，不需要重新导入机场订阅。
2. 确认当前订阅“扩展”仍使用“脚本”模式，并选中这个脚本；出现“立即应用”时执行应用。
3. **如果此前手工添加了指向 `GLOBAL` 的交易所包名规则，删除这些重复规则。** 本次脚本直接指向“个人交易所代理”；FlClash 的全局附加规则会排在脚本规则前面。
4. 保持“规则”运行模式，并在“常规”中保持“查找进程”开启。如果启用分应用代理，需将七家交易所 App 纳入代理范围。
5. 在“代理 → 个人交易所代理”中选择台湾 08 或你指定的节点。无需设置 `GLOBAL`。
6. 应用配置，必要时在首页通过内核状态按钮重启核心，然后强制停止并重新打开交易所 App，让新连接按新规则匹配。

验证时，App 连接应命中 `ProcessName / PROCESS-NAME`，代理链包含“个人交易所代理”和选中的节点；不会再经过 `GLOBAL`。UDP 连接还要求选中的节点支持 UDP。

### 首次导入

1. 打开正在使用的订阅的“扩展”设置，将扩展模式设为“脚本”。
2. 点击“前往配置脚本 → ＋ → 通过 URL 导入”，粘贴上表 `flclash.js` 地址。
3. **返回订阅的扩展页面，点选刚导入的脚本。导入本身不自动绑定订阅。** 应用当前配置。
4. 按上述步骤开启查找进程、保持规则模式，并选择个人分组内的节点。

分组初始选择 `REJECT`，选好节点前匹配流量会被拦截；无节点时也不回退到直连。已有同名个人分组会被保留。内部名称 `personal-exchanges` 和“个人交易所代理”由本脚本使用，请不要用于无关配置。

### 安卓覆盖范围

七个 Google Play App 的包名规则前置于共用域名/IP 规则，并全部直接指向个人分组：

| 交易所 | Google Play 包名 |
| --- | --- |
| Gate | `com.gateio.gateio` |
| MEXC | `com.mexcpro.client` |
| Bybit | `com.bybit.app` |
| Bitget | `com.bitget.exchange` |
| Bitfinex | `com.bitfinex.mobileapp` |
| OKX | `com.okinc.okex.gp` |
| Binance | `com.binance.dev` |

包名来源链接见 [SOURCES.md](SOURCES.md#google-play-安卓包名)。覆盖以 VPN 已接管、进程识别成功为前提。浏览器、独立 API 工具或其他进程发起的连接仍需依靠域名/IP 清单。

脚本把 `find-process-mode` 设为 `always`，保留 DNS、节点、机场策略组和原规则，不修改运行模式。FlClash 自身设置仍可能覆写生成参数，因此也须保持“查找进程”开启。全局附加规则、完整规则覆写等仍可能先命中或替换脚本规则。

同一订阅更新后通常保留绑定和节点选择；节点被改名或删除后需要重选。切换另一个订阅时，要给新订阅绑定同一脚本。后续同步个人规则，在已导入脚本上执行“同步”，再确认应用生效。

## 以后如何维护

共用地址只编辑 [rules/exchanges.list](rules/exchanges.list)，支持以下格式：

```text
# 根域及全部子域
DOMAIN-SUFFIX,gate.com
# 仅匹配已核实的具体主机
DOMAIN,api.manepa.jp
# 已观察到的纯 IPv4 目标，不额外触发 DNS 解析
IP-CIDR,43.135.121.179/32,no-resolve
```

不要填写 `https://`、路径、端口或代理策略。添加 IP 时注明来源；当前只接受单个 IPv4 的 `/32`，不接受整段网段。不要把一次 DNS 解析结果、API 密钥的用户 IP 白名单或共享云厂商网段当成交易所固定地址。安卓包名维护在 [scripts/build.mjs](scripts/build.mjs)，不放入 iOS 共用清单。

提交后，GitHub Actions 会校验清单、运行测试并自动更新 `flclash.js`。等 [Actions](https://github.com/mrcaoxin/proxy-rules/actions) 成功后再同步手机。`flclash.js` 是生成文件，不应单独编辑。GitHub 文件直链可能短暂缓存；自动化只转换清单，不会自动发现新的域名或 IP。

公开仓库不得加入机场订阅、节点密码、Token 或账户资料。

## 覆盖与边界

- 根域后缀已覆盖官网、REST、WebSocket、文档等子域，不必重复枚举每个 API 路径。区域与测试网入口按实际证据收录，不意味着不同地区账户可互换使用。
- 清单区分官方开发文档、官网公开引用、用户 App 实际连接和社区线索。**代理匹配不等于官方身份认证，不要把清单当作登录网址导航。**
- 共享资源优先使用具体主机，不把 Google、AppsFlyer 或整个云平台网段都列为交易所流量。
- 没有声称穷尽全部动态域名/IP。未核实线索、缺少固定服务 IP 的情况见来源记录。
- 本仓库不修改全局 DNS；规则不能修复现有网络的 DNS 故障，也不能保证某个地区的访问资格。

## 验证

使用 Node.js 22 或更高版本，无需安装第三方依赖：

```sh
node scripts/build.mjs
node --test tests/*.test.*
```

测试覆盖七个包名和共用规则的优先级、原配置保留、重复应用、升级已有分组、仅代理集合的订阅，以及精确主机/IP 输入校验。发布还使用本机 Mihomo v1.19.13 加载普通节点、代理集合和无节点配置，并进行本地转发验证。

新版本仍需在手机端按连接日志复核；安卓检查实际包名、命中规则和最终节点，iOS 检查域名/IP 是否命中所选策略。更新一次订阅后重复检查，即可核对绑定与选择是否保留。
