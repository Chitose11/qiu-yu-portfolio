---
name: "邱宇作品集"
description: "以克制的编辑排版承载真实产品证据的招聘向作品集"
colors:
  paper: "#f2f0ea"
  ink: "#171716"
  text-muted: "#66645e"
  project-violet: "#dcd0f5"
  project-blue: "#bddcf3"
  project-red: "#f2cfd4"
  focus-blue: "#2f62ff"
typography:
  display:
    fontFamily: "Noto Sans SC Variable, sans-serif"
    fontSize: "clamp(3rem, 7.15vw, 7.15rem)"
    fontWeight: 720
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Noto Sans SC Variable, sans-serif"
    fontSize: "clamp(2.5rem, 5.3vw, 5.6rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Noto Sans SC Variable, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Manrope Variable, Noto Sans SC Variable, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 560
rounded:
  media: "24px"
  detail: "20px"
  chip: "999px"
spacing:
  page-gutter: "max(clamp(1.5rem, 5vw, 6rem), calc((100vw - 100rem) / 2))"
  section-y: "clamp(7rem, 13vw, 13rem)"
  content-gap: "clamp(2rem, 8vw, 9rem)"
components:
  project-chip:
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "0.45rem 0.75rem"
    typography: "{typography.label}"
  project-stage:
    rounded: "{rounded.media}"
    padding: "clamp(1rem, 3.2vw, 3.25rem)"
  contact-link:
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
    padding: "1.3rem 0"
---

# Design System: 邱宇作品集

## Overview

**Creative North Star: "编辑式产品档案"**

整个系统像一本为招聘方编辑的产品档案：外层克制、安静，真实界面与设计判断占据注意力。大字号职业陈述负责建立身份，宽松留白让项目之间形成清楚章节，暖灰底色降低作品截图之间的视觉冲突。

界面不以装饰制造“科技感”，而以真实产品画面、可证实的工作流和清晰排版建立可信度。项目自身的紫、蓝、红承担章节识别，网站框架保持近黑与纸张色。

**Key Characteristics:**

- 暖灰纸张底与近黑文字构成稳定外壳。
- 大字号、短行宽和非对称双栏建立编辑感。
- 项目颜色只进入项目舞台与标签，不扩散为全站装饰。
- 真实界面图是主要视觉内容，文字负责解释设计判断。
- 显著动效集中在首屏职业陈述、作品界面轨迹和项目证据揭示。

## Colors

调色策略是“中性外壳，项目着色”：站点本身保持低饱和，章节色直接来自作品内容。

### Primary

- **墨黑正文**：用于主要文字、深色能力区和品牌圆标，提供最高对比与稳定锚点。

### Secondary

- **水印紫雾**：仅承载水印助手项目舞台与同色标签。
- **人声浅蓝**：仅承载人声分离项目舞台与同色标签。
- **创作柔红**：仅承载 AI 小红书项目舞台与同色标签。

### Neutral

- **暖灰纸张**：全站基础背景，避免纯白带来的模板感。
- **沉静次级字**：正文说明、时间与元信息使用，保持内容层次。

### Named Rules

**The Project Owns the Color Rule.** 项目色属于对应案例，不把它们混合成全站渐变或通用装饰。

**The Cover Frames, Evidence Stays Exact Rule.** 项目主封面使用统一的深色设备特写来建立系列感；封面只改变展示环境、裁切与透视，项目下方的细节图继续使用原始界面，确保招聘方能核验真实交互与信息架构。

**The UI Never Warps Rule.** 软件界面只能等比缩放、平移与裁切，不使用透视变形或生成式重绘；需要设备感时由网页容器、边框、阴影和背景承担。

## Typography

**Display Font:** Noto Sans SC Variable（sans-serif 回退）  
**Body Font:** Noto Sans SC Variable（sans-serif 回退）  
**Label Font:** Manrope Variable 与 Noto Sans SC Variable

**Character:** 中文主字体保持中性、清楚和现代；Manrope 只用于英文名称、数字与短标签。大标题通过紧凑字距和短行宽获得编辑力量，而不是依赖特殊字形效果。

### Hierarchy

- **Display**（720，流体字号，1.04）：仅用于首屏职业陈述，最大行宽约 12.5 个汉字。
- **Headline**（700，流体字号，1.08）：用于章节主标题，保持明显的段落停顿。
- **Title**（约 1.45–2.3rem，1.3）：用于项目判断与项目内部结论。
- **Body**（400，1rem，1.8）：用于项目说明与履历，文本行宽通常控制在 42–58 个字符。
- **Label**（560–650，约 0.72–0.82rem）：用于导航、标签、时间和元信息。

### Named Rules

**The Short Statement Rule.** 大标题必须像判断而不是说明书；超过两层从句时拆成正文。

## Layout

页面左右留白使用流体 gutter，在桌面端以非对称双栏组织“结论与证据”，在 900px 以下转为单栏。首屏为文字与肖像双栏；项目段落使用“标题/说明—主界面—细节/证据”的固定叙事节奏。章节之间使用大间距，章节内部的信息组保持紧凑。

项目主图在桌面端嵌入带色舞台，页面内容最大宽度为 1600px，超宽屏将多余空间均分到左右；移动端舞台延伸到屏幕边缘，让小屏仍保留足够的界面可读面积。主项目封面保持静态；“我在这个项目里解决了什么”三条事实直接控制左侧三张对应界面证据，桌面悬浮、键盘聚焦与移动端点击共享同一状态。620px 以下简化导航，但所有内容仍可线性滚动访问。

## Elevation & Depth

系统默认保持平面，主要通过色块与间距区分层级。只有人物肖像和真实产品界面使用柔和、向下扩散的环境阴影，用于表达“实物被放置在页面上”，不使用发光或硬偏移阴影。

### Shadow Vocabulary

- **媒体浮层**（`0 1.35rem 3.5rem rgba(35, 28, 55, 0.18)`）：仅用于项目舞台内的产品截图。
- **肖像浮层**（`0 1.5rem 4rem rgba(20, 20, 18, 0.14)`）：仅用于首屏本人肖像。

### Named Rules

**The Evidence Lifts Rule.** 只有作为证据的真实媒体可以获得阴影，文字容器与普通内容保持平面。

## Shapes

形状语言服务于媒体承载：大型图片舞台使用柔和的 24px 圆角，细节图使用 20px 圆角；项目标签使用胶囊形以表达轻量分类。分隔关系优先使用 1px 低对比线条，不用嵌套圆角卡片。

## Components

### Navigation

- 固定在顶部，由独立 QY 圆标、章节胶囊和邮箱胶囊组成，不再铺满整个视口。
- 当前章节使用近黑滑动胶囊标记，基于共享布局动画在作品、能力、经历与联系之间连续移动。
- 620px 以下只保留品牌与菜单圆标，展开后提供完整章节链接和发送邮件入口；键盘焦点继续使用清晰蓝色外环。

### Profile Card

- 本人照片是卡片主体，保持当前低饱和肖像处理，不使用卡片外部光晕。
- 底部信息层显示姓名、UI / UX 设计师身份、求职状态、6 年经验和惠州信息，并使用用户提供的猫咪插画作为小头像。
- 桌面鼠标与移动端触摸位置驱动有限幅度的 3D 倾斜；离开或结束触摸后通过弹簧回正。

### Chips

- 透明背景、1px 同色描边、胶囊形圆角。
- 颜色跟随所属项目，仅作为分类信息，不承载主要操作。

### Cards / Containers

- 项目不是同规格卡片网格，而是完整宽度的叙事章节。
- 主界面置于项目色舞台内；细节图单独浮起，旁边使用线性事实列表解释设计判断。
- 可切换的界面证据保持原始宽高比并完整显示，由图片自然撑开对应项目色的窄边画框；四向边距保持一致，内层软件窗口承担柔和阴影，外层舞台保持平面。

### Project Detail Pages

- 9 个项目均使用 `#/project/{slug}` 的 GitHub Pages 兼容路由，首页项目名、精选案例链接与 Flowing Menu 都进入对应详情。
- 详情页沿用暖灰纸张、最大 1600px 内容宽度与项目单色；首屏只把真实界面作为封面裁切，正文画廊始终保留截图原始比例。
- 每页依次说明项目定位、设计挑战、组织方式、素材覆盖与真实界面；只有官网长图的项目明确作为官网设计案例，不推断软件内部流程。
- 项目截图使用 WebP、首图优先加载、其余懒加载；点击界面图可在新标签打开大图。

### Contact Link

- 邮箱是页面唯一主要转化动作，以全宽上下分隔线呈现，不伪装成按钮。
- 同时提供邮件图标、地址和方向箭头；hover 保持克制，焦点状态必须明显。

### Motion

- 默认体验采用明显的高动态滚动编舞：固定顶部进度线持续反馈阅读位置。
- 桌面端首屏采用 Image Trail：鼠标在整个首屏范围内移动达到约 52px 距离阈值后，轮换带出六个常用工具标识；图标沿移动方向旋转、漂移并在 1120ms 内退场，固定复用 6 个节点。
- 首屏 Image Trail 覆盖完整首屏交互区域，内容为 Figma、After Effects、C4D、即梦、Lovart 与 Nano Banana 工具标识；工具图负责说明工作方式，不再与下方项目证据争夺叙事职责。
- “更多产品”使用 Flowing Menu：默认保持项目名与说明可扫描，桌面悬停或键盘聚焦后整行翻入深色循环字幕与真实项目缩略图；已确认官网的产品使用右上箭头和真实外链，未确认地址的项目保持纯展示；触屏端退化为静态缩略图列表。
- 联系区使用以 `#A1B1BD` 为核心的分层 Color Bends 色带作为收尾场景，低频漂移动画保留色带深度并将 WebGL 预算留给身份牌；主标题使用单次 Text Type 逐字切入，完成后保留低频光标呼吸。
- 联系区右侧直接使用 React Bits 官方 Lanyard 的 `card.glb` 卡扣与身份牌模型，镜头距离保持 41；卡面仅替换为本人照片、个人 SVG Logo 与真实职业信息，拖拽后通过轻量弹簧摆动回位；绳体保持固定总长且连接模型卡扣环，避免弹性拉伸或穿过卡面，不自行重画卡扣结构。
- Image Trail 只出现在支持 hover 的精细指针且宽度大于 900px 的设备；触摸设备与 `prefers-reduced-motion` 下不渲染轨迹图片，避免额外加载与干扰。
- 顶部章节胶囊使用共享布局弹簧保持导航位置连续；Profile Card 使用最大约 12° 的方向倾斜回应鼠标与触摸位置。
- 首屏按“导航—身份—逐字标题—肖像—说明”的次序进入，结合大幅位移、模糊和裁切。
- 章节标题使用更深的裁切与模糊揭示；正文、标签与列表按阅读顺序错峰进入，避免所有内容同速淡入。
- 项目舞台以整块项目色幕揭开，封面截图同时从放大与模糊状态收束，并在滚动期间保留轻微纵向视差和旋转；下方事实行悬浮或聚焦时，左侧证据图使用短促裁切、轻微模糊与等比缩放完成对应切换，软件画面始终保持原始比例。
- 细节截图从侧向裁切进入，事实列表随后逐项跟进，形成“先看证据、再读判断”的节奏。
- 所有动画尊重 `prefers-reduced-motion`，禁用后不影响内容可见性。
- `prefers-reduced-motion` 下联系区直接显示完整标题，Color Bends 只渲染静态帧。

## Do's and Don'ts

### Do:

- **Do** 让真实产品界面占据主要视觉面积，并在附近解释一个可证实的设计判断。
- **Do** 继续使用暖灰外壳，让新增案例继承自己的单一章节色。
- **Do** 保持桌面非对称、移动单栏的响应式语法。
- **Do** 将主要联系动作保持为直接可复制、可点击的邮箱。

### Don't:

- **Don't** 把不同项目色混合为渐变背景或统一品牌特效。
- **Don't** 使用同尺寸图标卡片阵列代替项目叙事。
- **Don't** 为无独立内容的案例制造空链接或假详情页。
- **Don't** 把 AI 标签放在 UI/UX 设计师身份之前。
- **Don't** 添加无法从项目素材、简历或公开仓库核验的结果数字。
