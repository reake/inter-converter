## 在 interconverter.com 上增加很多相关的工具落地页：

### 要求：每个落地页符合 google seo 搜索规范；样式风格统一，用户体验友好；

#### Cobol Converter 这个搜索量在增加，可以增加一个工具页



先优化统一布局吧，所有工具落地页，我看到auto/和其它几个使用布局不一样，有些AutomotiveLayout，有些AutomotiveLayout布局，有些ToolLayout布局，我 希望都统一为ToolLayout布局，后面好切换和管理。也能实现样式和风格统一。


现在咱们优化seo，每个工具页的seo及落地页文案都是独立，争对这个工具页来优化符合google seo规范及长尾词规范，seo title带上品牌名｜ InterConverter 60个字内，seo desc160个字内

你是资深seo运营人员，现在网站品牌词：InterConverter，域名：https://interconverter.com，准备要上线了，现在咱们对 @/Users/reake/data/jswork/inter-converter/src/app/[locale]/ 目录下所有的页面进行优化seo，以及每个工具落地页的seo文案和长尾关键字规范和优化，符合google seo规范及长尾词规划，要求：seo title带上品牌名｜ InterConverter 60个字内，seo desc160个字内



InterConverter 工具分类结构（建议）
1. Finance（金 融）

Currency → 汇率换算器、历史汇率

Credit Cards → 信用卡利息计算、分期付款计算

Mortgages → 房贷月供计算、提前还款模拟

Investing → 投资回报率、复利计算、ETF/基金比较

Insurance → 保费计算、保障范围对比

2. Unit（单位换算）

长度转换（米 ↔ 英尺 ↔ 英里）

重量转换（公斤 ↔ 磅 ↔ 盎司）

温度转换（摄氏度 ↔ 华氏度 ↔ 开尔文）

面积、体积、速度、压力等

3. Time（时间工具）

时间戳 ↔ 日期转换（Unix timestamp）

时区转换（UTC ↔ 本地时间）

倒计时/计时器

工作日计算（两个日期之间的工作日数）

4. Color（颜色工具）

HEX ↔ RGB ↔ HSL 转换

渐变生成器

调色板提取（上传图片 → 提取颜色）

5. Media（多媒体工具）

图片压缩、图片格式转换（JPG ↔ PNG ↔ WebP）

音频转换（MP3 ↔ WAV ↔ OGG）

视频压缩、格式转换

6. Health（健康工具）

BMI 计算器

卡路里消耗计算

心率区间计算

7. Auto（汽车工具）

油耗计算（百公里耗油 vs MPG）

二手车贷款计算器

汽车保险保费估算

8. Moving（生活/搬家工具）

搬家费用计算器

城市对比（生活成本对比）

房租预算计算器

🔧 实现思路（前端结构）

/tools/[category]/index.tsx
→ 展示该分类下的所有工具列表（卡片式 UI）。

/tools/[category]/[tool].tsx
→ 具体工具页面。

数据存储方式（推荐）

建一个 tools.json（或数据库表），字段包括：

{
  "slug": "mortgage-calculator",
  "title": "Mortgage Calculator",
  "category": "mortgages",
  "description": "Calculate your monthly mortgage payments and interest.",
  "cover_url": "/images/mortgage.png"
}


每个分类页面自动读取属于该分类的工具列表，渲染卡片。

这样你不用手写每个分类页，系统会自动根据 category 生成导航。



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
