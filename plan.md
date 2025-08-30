## 在 interconverter.com 上增加很多相关的工具落地页：

### 要求：每个落地页符合 google seo 搜索规范；样式风格统一，用户体验友好；

#### Cobol Converter 这个搜索量在增加，可以增加一个工具页



先优化统一布局吧，所有工具落地页，我看到auto/和其它几个使用布局不一样，有些AutomotiveLayout，有些AutomotiveLayout布局，有些ToolLayout布局，我 希望都统一为ToolLayout布局，后面好切换和管理。也能实现样式和风格统一。


现在咱们优化seo，每个工具页的seo及落地页文案都是独立，争对这个工具页来优化符合google seo规范及长尾词规范，seo title带上品牌名｜ InterConverter 60个字内，seo desc160个字内

你是资深seo运营人员，现在网站品牌词：InterConverter，域名：https://interconverter.com，准备要上线了，现在咱们对 @/Users/reake/data/jswork/inter-converter/src/app/[locale]/ 目录下所有的页面进行优化seo，以及每个工具落地页的seo文案和长尾关键字规范和优化，符合google seo规范及长尾词规划，要求：seo title带上品牌名｜ InterConverter 60个字内，seo desc160个字内




Finance目录最终统计
总计：77个金融工具 🚀

详细分类：
🏠 Mortgages（房贷）：17个工具
30年固定、15年固定、FHA贷款、VA贷款等
💰 Loans（贷款）：18个工具
个人、汽车、学生、商业、设备贷款等
📊 Investing（投资）：10个工具
401k、股票、债券、ETF、退休规划等
🏦 Banking & Savings（银行储蓄）：7个工具
储蓄、复利、CD、应急基金等
💳 Credit Cards（信用卡）：7个工具
还款、余额转移、利息计算等
💱 Currency（货币）：6个工具
比特币、欧元、日元、英镑转换等
📋 Taxes（税务）：5个工具
所得税、财产税、销售税等
🛡️ Insurance（保险）：3个工具
汽车、房屋、人寿保险
📦 Moving（搬家）：1个工具
🧮 General（通用）：3个工具


要求：
1，统一规范，统一布局ToolLayout，多语言（默认为en)，SEO优化；
2，重构所有的工具页，根据主分类配置到统一json文件里，比如auto.json，unit.json，finance.json等，类似于数据管理，统一管理，可控制每个工具是否显示，方便后续切换和管理。
3，/tools列出部分工具页，根据分类进行分组展示，每个分类下展示5个工具，点击进入工具页，每个分类可以点击查看更多工具。


Unit（单位换算类）
常见的在线工具用户需求很大，覆盖“长度、重量、温度、面积、速度”等常见换算。
工具名称	建议 slug	功能描述
Length Converter	/unit/length-converter	米 ↔ 英尺 ↔ 英寸 ↔ 英里
Weight Converter	/unit/weight-converter	公斤 ↔ 磅 ↔ 克 ↔ 盎司
Temperature Converter	/unit/temperature-converter	摄氏度 ↔ 华氏度 ↔ 开尔文
Area Converter	/unit/area-converter	平方米 ↔ 平方英尺 ↔ 公顷
Volume Converter	/unit/volume-converter	升 ↔ 毫升 ↔ 立方米 ↔ 加仑
Speed Converter	/unit/speed-converter	公里/小时 ↔ 英里/小时 ↔ 节
Pressure Converter	/unit/pressure-converter	帕斯卡 ↔ 巴 ↔ PSI
Energy Converter	/unit/energy-converter	卡路里 ↔ 千焦 ↔ 千瓦时
Power Converter	/unit/power-converter	瓦特 ↔ 千瓦 ↔ 马力
Data Converter	/unit/data-converter	KB ↔ MB ↔ GB ↔ TB

🎨 Color（颜色工具）
这一类流量不小，很多设计师/开发者会用。
工具名称	建议 slug	功能描述
HEX to RGB Converter	/color/hex-to-rgb	十六进制色值转 RGB
RGB to HEX Converter	/color/rgb-to-hex	RGB 转十六进制色值
HEX to HSL Converter	/color/hex-to-hsl	HEX ↔ HSL 转换
Color Picker Tool	/color/color-picker	在线取色器（调色盘）
Gradient Generator	/color/gradient-generator	渐变背景生成
Color Palette Generator	/color/palette-generator	图片提取配色 / 自动调色板
Contrast Checker	/color/contrast-checker	检查文本与背景对比度（WCAG）

⏰ Time（时间工具）
时间相关搜索量很大，特别是 时区转换 & 时间戳转换。
工具名称	建议 slug	功能描述
Unix Timestamp Converter	/time/timestamp-converter	时间戳 ↔ 日期时间
Time Zone Converter	/time/timezone-converter	世界时区转换
Date Calculator	/time/date-calculator	计算两个日期之间的差值
Working Days Calculator	/time/working-days	计算两个日期之间的工作日数
Countdown Timer	/time/countdown-timer	在线倒计时
online-stopwatch	/time/online-stopwatch	在线秒表
Age Calculator	/time/age-calculator	根据出生日期计算年龄
World Clock	/time/world-clock	显示不同城市的当前时间


后面根据主关键字+长尾关键字进行内容优化，

1，分析优化每个工具落地页，根据主要关键字+长尾关键字进行重构，符合google seo规范，增加关键字的密度1.5%-2%之间，每个工具落地页总字数600-1000词，主要关键词出现 8-10 次，次要关键词出现 5-7 次，密度合理。
2，要求：
每页 600–1000 词最佳
关键词密度 1.5%–2%（主要）
同义词 1% 左右
增加About {工具名},{工具名}Features,How to Use {工具名},FAQ 等模块，并能覆盖长尾词流量
3，统一的现代化架构，具备完整的 SEO 优化、统一布局，统一规范和一致的用户体验。
4，多语言,语言内容@messages目录下，en.json，zh.json，default为en
5，工具页的多语言内容，可交流是否放到@data/tools/下的工具json文件中，根据语言读取不同的json文件内容；