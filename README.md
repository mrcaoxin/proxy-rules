# 个人交易所代理规则

为 iOS Shadowrocket（小火箭）和 Android FlClash 维护同一份交易所域名清单，匹配流量走代理。范围仅包含 Gate、MEXC、Bybit、Bitget、Bitfinex；来源和核实程度见 [SOURCES.md](SOURCES.md)。

## 固定地址

| 用途 | 地址 |
| --- | --- |
| 小火箭模块 | https://raw.githubusercontent.com/mrcaoxin/proxy-rules/main/shadowrocket.module |
| FlClash 扩展脚本 | https://raw.githubusercontent.com/mrcaoxin/proxy-rules/main/flclash.js |
| 共用规则清单 | https://raw.githubusercontent.com/mrcaoxin/proxy-rules/main/rules/exchanges.list |

使用 `raw.githubusercontent.com` 文件直链，不要复制 GitHub 的 `blob` 网页地址。以上链接随文件更新保持不变，读取时下载当前公开内容。

## iOS：Shadowrocket

1. 首页将“全局路由”设为“配置”，并选好可用的代理节点。
2. 打开“配置 → 模块 → ＋”，粘贴上表的小火箭模块地址并下载。
3. 启用“个人交易所代理”模块；如有其他包含分流规则的模块，将本模块放在它们前面。
4. 回到当前配置，执行“使用配置”或“编译配置”，拉取远程规则，再连接代理。

模块里的 `PROXY` 表示使用小火箭当前选中的代理节点。模块规则优先于普通配置规则，未匹配的流量继续遵循原配置。本模块只包含域名规则，无需 HTTPS 解密或安装证书。

更新节点订阅后，模块通常仍保留；确认模块启用并重新使用/编译配置即可。以后更新 GitHub 清单，也通过“使用配置”或“编译配置”拉取；仅更新节点订阅不等于刷新规则。

## Android：FlClash

以下入口按 FlClash 当前源码核对，需要客户端具有“脚本扩展”和“通过 URL 导入”功能。

1. 打开正在使用的订阅的“扩展”设置，将扩展模式设为“脚本”。
2. 在脚本选择页面点“前往配置脚本”（脚本管理入口），点“＋ → 通过 URL 导入”，粘贴上表的 FlClash 扩展脚本地址。
3. 回到订阅的扩展页面，选中刚导入的脚本，并应用/重新加载当前配置。
4. 将运行模式设为“规则”；在代理页面打开新出现的“个人交易所代理”，**手工选择一个可用的代理节点**。

策略组初始选择 `REJECT`。在选好节点前，匹配的交易所流量会被拦截；如果节点列表为空，请先检查机场订阅。该策略组不依赖机场原来的策略组名称。

脚本将个人规则放到机场规则前面，保留节点、DNS、原策略组和原规则。内部名称 `personal-exchanges` 和“个人交易所代理”由本脚本使用，请不要为无关配置使用相同名称。

订阅刷新保留已绑定的扩展脚本。更新后确认脚本仍被选中，应用/重新加载配置，并检查“个人交易所代理”当前选中的节点。切换到另一个订阅，需要给那个订阅也绑定一次脚本。

以后同步个人规则：在脚本管理页面对该脚本使用“同步”，或在“资源”页面同步这个远程脚本，再应用/重新加载当前配置。脚本自带完整规则，不依赖内核另行下载规则集。

## 以后如何维护

只编辑 [rules/exchanges.list](rules/exchanges.list)：

```text
# 一条规则一行，根域和所有子域均匹配
DOMAIN-SUFFIX,gate.com
```

在 GitHub 文件页面点铅笔，新增或删除域名后提交。不要写网址前缀 `https://`、路径、端口或代理策略；不要添加机场订阅、节点密码或 Token。

提交后，GitHub Actions 的“更新安卓规则脚本”会校验清单并自动更新 `flclash.js`。等 [Actions](https://github.com/mrcaoxin/proxy-rules/actions) 显示成功后，再在手机上同步。小火箭读取原始清单，安卓读取生成后的脚本；GitHub 文件直链可能短暂缓存，提交后不保证立即刷新。

`flclash.js` 为生成文件，不要直接编辑。域名只有一份维护源，不需要手工把同一批规则改两遍。自动化不会更新或扩充交易所域名，它只转换你维护的清单。

## 覆盖与边界

- `DOMAIN-SUFFIX,bitget.com` 同时覆盖 `www.bitget.com`、`api.bitget.com`、`ws.bitget.com` 等，不需要枚举子域名。
- 清单既有官网/官方文档引用的域名，也有用户指定项、社区规则和技术关联备用域；已在注释及来源文件中区分。
- **代理匹配不等于官方身份认证。** 不要把规则清单当成交易所登录网址导航。未确认的线索放在来源文件的“未默认启用”部分。
- 备用域可能更换或停用，无法承诺穷尽全部地址，也不能保证特定区域的访问或服务资格。
- 本仓库不修改全局 DNS 和其他网站规则；如果 GitHub 直链或交易所域名无法正确解析，规则本身不能修复现有网络/DNS配置。

## 验证

本地维护使用 Node.js 22 或更高版本，无需安装第三方包：

```sh
node scripts/build.mjs
node --test tests/*.test.*
```

测试覆盖原配置保留、规则优先级、重复应用、只有代理集合的订阅和无效规则拒绝。发布时还使用本机 Mihomo v1.19.13 实际加载配置，检查普通节点、代理集合和空节点三种情况。尚未在用户的两台手机上实测。

手机端验证：打开一个清单内的网站，在连接/请求日志中确认命中个人规则，并检查 FlClash 使用的是“个人交易所代理”中选定的节点。更新一次订阅后重复检查，即可确认绑定与选择是否保留。

实现依据：[FlClash 脚本扩展](https://github.com/chen08209/FlClash/blob/main/lib/views/profiles/extend/script.dart)、[脚本导入与同步](https://github.com/chen08209/FlClash/blob/main/lib/views/config/scripts.dart)、[Mihomo 规则集合](https://wiki.metacubex.one/config/rule-providers/)、[Shadowrocket 社区使用手册](https://github.com/LOWERTOP/Shadowrocket#模块)。
