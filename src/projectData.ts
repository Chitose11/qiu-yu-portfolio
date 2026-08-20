export type ProjectImage = {
  src: string
  alt: string
  caption: string
}

export type ProjectGallerySection = {
  title: string
  intro: string
  images: ProjectImage[]
}

export type PortfolioProject = {
  slug: string
  title: string
  englishTitle: string
  category: string
  platform: string
  role: string
  accent: string
  accentSoft: string
  summary: string
  challenge: string
  approach: string
  coverage: string
  sourceCount: number
  cover: string
  coverAlt: string
  external?: { label: string; href: string }
  sections: ProjectGallerySection[]
}

const asset = (slug: string, name: string) => `./assets/projects/${slug}/${name}.webp`

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'watermark',
    title: '简鹿水印助手',
    englishTitle: 'Jianlu Watermark Assistant',
    category: '图片与视频效率工具',
    platform: 'Windows 桌面端',
    role: '产品体验 / UI 视觉 / 设计规范',
    accent: '#7651c7',
    accentSoft: '#dcd0f5',
    summary: '把图片与视频的加水印、去水印、画布编辑和批量导出，收束进一套清晰可控的桌面工作流。',
    challenge: '四类任务共享大量操作，但图片与视频又分别需要选区、时间轴、文字和位置控制。界面需要保持一致，同时让用户明确当前正在处理什么。',
    approach: '以任务类型建立一级入口，再把文件、画布、参数与导出稳定在固定区域；复杂能力通过工具栏和分组面板逐步展开。',
    coverage: '现有素材覆盖入口页、图片与视频编辑、画面调节、异常提示，以及文字和颜色设计规范。',
    sourceCount: 8,
    cover: asset('watermark', 'overview'),
    coverAlt: '简鹿水印助手四类任务入口',
    sections: [
      {
        title: '先建立统一的任务模型',
        intro: '图片与视频、添加与去除共用同一套导航和文件处理逻辑，让用户能从任务入口快速进入正确工作台。',
        images: [
          { src: asset('watermark', 'overview'), alt: '水印助手首页', caption: '四类任务入口与产品能力总览' },
          { src: asset('watermark', 'image-watermark'), alt: '图片加水印界面', caption: '文字、图片、透明度、旋转与九宫格定位' },
          { src: asset('watermark', 'image-remove'), alt: '图片去水印界面', caption: '多选区、框选、画笔与橡皮工具' },
        ],
      },
      {
        title: '让跨媒体编辑保持可控',
        intro: '视频去水印引入时间范围和播放预览；画面调节与异常反馈补齐从编辑到导出的完整闭环。',
        images: [
          { src: asset('watermark', 'video-remove'), alt: '视频去水印界面', caption: '时间范围、时间轴与选区预览' },
          { src: asset('watermark', 'adjustment'), alt: '画面调节界面', caption: '参数调节与实时画布反馈' },
          { src: asset('watermark', 'error'), alt: '错误提示弹窗', caption: '格式、损坏与重复文件的分类反馈' },
        ],
      },
      {
        title: '设计规范',
        intro: '字体层级、品牌紫色阶与功能色构成可复用的桌面端设计基础。',
        images: [
          { src: asset('watermark', 'colors'), alt: '水印助手颜色规范', caption: '品牌色、中性色与功能色' },
          { src: asset('watermark', 'type'), alt: '水印助手文字规范', caption: 'Source Han Sans CN 文字层级' },
        ],
      },
    ],
  },
  {
    slug: 'voice-separation',
    title: '简鹿人声分离',
    englishTitle: 'Jianlu Vocal Separation',
    category: '音视频处理工具',
    platform: 'Windows 桌面端',
    role: '信息架构 / 工作流 / UI 视觉',
    accent: '#227ebc',
    accentSoft: '#bddcf3',
    summary: '为人声、伴奏与多种乐器声部处理设计端到端体验，从拖拽导入、批量任务到参数导出与结果反馈。',
    challenge: '多种音轨处理能力容易形成冗长工具列表，批量任务又同时包含文件、进度、参数和行级操作。',
    approach: '首页先用高频卡片建立能力地图，进入任务后保持列表、导出参数和主操作的稳定位置，并补齐空态与完成反馈。',
    coverage: '现有素材覆盖欢迎页、空状态、批量列表、元数据编辑、导出结果和完整视觉规范。',
    sourceCount: 8,
    cover: asset('voice-separation', 'overview'),
    coverAlt: '简鹿人声分离欢迎页',
    sections: [
      {
        title: '用能力地图降低专业门槛',
        intro: '高频的人声与伴奏提取被提升为主卡片，其他乐器声部分离保留清晰入口。',
        images: [
          { src: asset('voice-separation', 'overview'), alt: '人声分离欢迎页', caption: '多工具入口与高频能力分层' },
          { src: asset('voice-separation', 'empty'), alt: '人声分离空状态', caption: '点击或拖拽文件与文件夹的导入引导' },
        ],
      },
      {
        title: '把批处理做成连续工作流',
        intro: '文件状态、进度、格式、声道、采样率、保存位置与主操作集中在同一视野内。',
        images: [
          { src: asset('voice-separation', 'batch'), alt: '批量文件处理列表', caption: '批量任务、进度、参数与行级操作' },
          { src: asset('voice-separation', 'metadata'), alt: '音频文件信息编辑弹窗', caption: 'ID3 信息编辑与应用到全部' },
          { src: asset('voice-separation', 'result'), alt: '批处理完成反馈', caption: '完成状态与成功结果反馈' },
        ],
      },
      {
        title: '从产品界面延伸到官网表达',
        intro: '官网长页把多种专业能力重新组织为更易理解的功能卖点、流程和使用场景。',
        images: [
          { src: asset('voice-separation', 'website'), alt: '人声分离产品官网', caption: '从产品能力到营销表达的完整官网长页' },
        ],
      },
      {
        title: '设计规范',
        intro: '蓝色品牌层级与清晰文字规格让多工具页面保持一致。',
        images: [
          { src: asset('voice-separation', 'colors'), alt: '人声分离颜色规范', caption: '主色、中性色与状态色' },
          { src: asset('voice-separation', 'type'), alt: '人声分离文字规范', caption: '文字字号与字重层级' },
        ],
      },
    ],
  },
  {
    slug: 'xhs-ai',
    title: '小红书 AI 创作助手',
    englishTitle: 'AI Content Workflow',
    category: 'AI 内容创作工具',
    platform: 'Web 应用',
    role: '产品流程 / 交互设计 / UI 视觉',
    accent: '#d92e49',
    accentSoft: '#f2cfd4',
    summary: '把账号定位、选题规划、文案生成、违规检测与封面预览串成一条可执行的小红书创作流程。',
    challenge: 'AI 创作不是单次生成：用户需要先建立账号方向，再把策略传递到选题与文案，同时处理合规、预览和会员权限。',
    approach: '将创作拆成五个连续模块，用一致的输入、历史记录和结果承载方式连接上下游；商业化状态作为流程的一部分，而不是独立弹窗堆叠。',
    coverage: '现有素材覆盖五步创作流程、案例、跨设备封面预览、会员与积分，以及完整设计规范。',
    sourceCount: 11,
    cover: asset('xhs-ai', 'overview'),
    coverAlt: '小红书 AI 创作助手首页',
    sections: [
      {
        title: '从账号策略开始，而不是从输入框开始',
        intro: '先明确账号方向和变现方式，再把定位带入选题与内容生成，减少每一步重新描述背景。',
        images: [
          { src: asset('xhs-ai', 'overview'), alt: 'AI 创作助手首页', caption: '五步创作流程总览' },
          { src: asset('xhs-ai', 'positioning'), alt: 'IP 账号定位', caption: '账号方向、变现方式、历史记录与案例' },
          { src: asset('xhs-ai', 'topics'), alt: '选题规划', caption: '十天选题计划与自定义选题' },
          { src: asset('xhs-ai', 'topic-case'), alt: '选题案例', caption: '标题和内容方向的案例承载' },
        ],
      },
      {
        title: '让生成结果进入发布前检查',
        intro: '文案参数、风险检测和真实信息流预览组成发布前的连续校验过程。',
        images: [
          { src: asset('xhs-ai', 'copywriting'), alt: '文案生成', caption: '账号定位、文案想法与内容类型' },
          { src: asset('xhs-ai', 'risk-check'), alt: '违规检测', caption: '标题、正文和话题标签风险检查' },
          { src: asset('xhs-ai', 'cover-preview'), alt: '手机封面预览', caption: '模拟小红书信息流的手机预览' },
        ],
      },
      {
        title: '把权限和消耗解释清楚',
        intro: '会员套餐、积分余额、记录和新用户权益对照共同承载商业化状态。',
        images: [
          { src: asset('xhs-ai', 'membership'), alt: '会员中心', caption: '套餐、积分余额与使用记录' },
          { src: asset('xhs-ai', 'new-user'), alt: '新用户开通会员页面', caption: '非会员权益对照与开通引导' },
        ],
      },
      {
        title: '设计规范',
        intro: '品牌红、状态色与 MiSans 字体层级，为多步骤 AI 工具建立一致的界面语言。',
        images: [
          { src: asset('xhs-ai', 'colors'), alt: 'AI 创作助手颜色规范', caption: '品牌红与界面状态色' },
          { src: asset('xhs-ai', 'type'), alt: 'AI 创作助手文字规范', caption: 'MiSans 文字层级' },
        ],
      },
    ],
  },
  {
    slug: 'screen-recorder',
    title: '电脑录屏',
    englishTitle: 'Desktop Recording Studio',
    category: '录屏与录音工具',
    platform: 'Windows / macOS',
    role: '复杂状态设计 / 桌面端 UI / 交互细化',
    accent: '#2d70d6',
    accentSoft: '#c9dcf5',
    summary: '围绕录制、录音、定时任务、设备配置与文件管理，建立覆盖大量状态的桌面端工作台。',
    challenge: '录制过程涉及音源、暂停、完成、悬浮控制和设备异常；任务与文件管理又包含大量弹窗和边界状态。',
    approach: '用稳定主框架承载录制状态，通过局部控件、弹窗和状态反馈渐进呈现复杂度；高频入口与更多设置保持明确分工。',
    coverage: '本页仅使用项目根目录的 6 张代表图，覆盖录制状态、计划任务、设置与文件管理；“全部页面”文件夹不纳入展示。',
    sourceCount: 6,
    cover: asset('screen-recorder', 'recording'),
    coverAlt: '电脑录屏录音中状态',
    sections: [
      {
        title: '录制状态始终可感知',
        intro: '主界面把时长、音源和录制状态集中呈现，用户不必在多个窗口间确认任务进展。',
        images: [
          { src: asset('screen-recorder', 'recording'), alt: '录音中界面', caption: '录制进行中的主界面反馈' },
          { src: asset('screen-recorder', 'empty'), alt: '录屏空状态', caption: '初始状态与录制入口' },
        ],
      },
      {
        title: '把计划任务与设备设置拆清楚',
        intro: '时间、录制时长、音源和设备参数属于不同决策层级，通过独立入口降低配置压力。',
        images: [
          { src: asset('screen-recorder', 'schedule'), alt: '定时任务', caption: '定时录制任务的计划与管理' },
          { src: asset('screen-recorder', 'settings'), alt: '更多设置', caption: '设备、快捷键与输出配置' },
        ],
      },
      {
        title: '录完之后仍是一条工作流',
        intro: '列表展开和录音管理把任务结果留在同一产品内，便于继续查看和整理文件。',
        images: [
          { src: asset('screen-recorder', 'expanded-list'), alt: '录制任务列表展开', caption: '任务详情与行级操作' },
          { src: asset('screen-recorder', 'recordings'), alt: '录音列表', caption: '录音文件的集中管理' },
        ],
      },
    ],
  },
  {
    slug: 'video-master',
    title: '视频大师',
    englishTitle: 'Video Master',
    category: '视频处理工具',
    platform: 'Windows 桌面端',
    role: '工具架构 / 编辑工作台 / UI 规范',
    accent: '#286ac8',
    accentSoft: '#c8dcf7',
    summary: '把剪切、合并、配乐、片头与画面调节组织为一套易进入、可连续操作的视频处理工具。',
    challenge: '不同视频任务需要的时间轴、文件列表和参数并不相同，但频繁切换结构会增加学习成本。',
    approach: '用统一侧边能力导航和固定编辑舞台建立熟悉感，再让每类任务只替换必要的专属控制。',
    coverage: '现有素材覆盖首页、五类视频任务，以及颜色和文字设计规范。',
    sourceCount: 8,
    cover: asset('video-master', 'overview'),
    coverAlt: '视频大师首页',
    sections: [
      {
        title: '同一框架承载不同编辑任务',
        intro: '用户始终在熟悉的桌面布局中工作，任务差异由编辑区和参数区承担。',
        images: [
          { src: asset('video-master', 'overview'), alt: '视频大师首页', caption: '视频处理能力总览' },
          { src: asset('video-master', 'cut'), alt: '视频剪切', caption: '时间轴与片段剪切工作流' },
          { src: asset('video-master', 'merge'), alt: '视频合并', caption: '多文件合并与顺序管理' },
          { src: asset('video-master', 'music'), alt: '视频配乐', caption: '视频与音频素材的组合' },
        ],
      },
      {
        title: '补齐内容包装与画面控制',
        intro: '片头和画面调节让基础编辑延伸到输出前的内容包装。',
        images: [
          { src: asset('video-master', 'intro'), alt: '添加片头', caption: '片头内容与时长设置' },
          { src: asset('video-master', 'adjustment'), alt: '画面调节', caption: '画面参数与预览反馈' },
        ],
      },
      {
        title: '设计规范',
        intro: '蓝色阶、功能色和文字层级共同约束桌面编辑工具的视觉一致性。',
        images: [
          { src: asset('video-master', 'colors'), alt: '视频大师颜色规范', caption: '蓝色阶与功能色' },
          { src: asset('video-master', 'type'), alt: '视频大师文字规范', caption: '桌面端文字层级' },
        ],
      },
    ],
  },
  {
    slug: 'wuji',
    title: '吾记',
    englishTitle: 'Wuji Journal',
    category: '个人记录产品',
    platform: '桌面端 / 移动端',
    role: '多端体验 / 内容组织 / UI 视觉',
    accent: '#8a623a',
    accentSoft: '#e3d3bd',
    summary: '围绕写作、回看、搜索与日历，设计一套安静但功能完整的个人日记体验。',
    challenge: '日记产品既要降低写作阻力，也要让大量历史内容能够被搜索、按日历浏览和重新发现。',
    approach: '把“写”和“找”作为两条主要路径：首页与新建入口降低记录阻力，搜索、日历和全部日记承担长期内容回访。',
    coverage: '本页仅使用项目根目录的 12 张界面与规范图，覆盖登录、首页、新建、搜索、日历、个人信息、垃圾箱、阅读选择和设计规范。',
    sourceCount: 12,
    cover: asset('wuji', 'overview'),
    coverAlt: '吾记日记首页',
    external: { label: '访问吾记官网', href: 'https://www.wujiapp.cn/#/' },
    sections: [
      {
        title: '让记录自然开始',
        intro: '登录、首页和新建日记的层级保持安静，内容本身占据主要注意力。',
        images: [
          { src: asset('wuji', 'login'), alt: '吾记登录页', caption: '简洁的产品进入状态' },
          { src: asset('wuji', 'overview'), alt: '吾记首页', caption: '日记列表与内容阅读布局' },
          { src: asset('wuji', 'new-entry'), alt: '新建日记', caption: '从浏览自然进入写作' },
          { src: asset('wuji', 'reading-selection'), alt: '阅读日记并选择文字', caption: '阅读状态中的文字选择与操作' },
        ],
      },
      {
        title: '让过去的内容重新出现',
        intro: '搜索、日历和全部日记以不同线索帮助用户回到历史记录。',
        images: [
          { src: asset('wuji', 'search'), alt: '吾记搜索', caption: '关键词搜索与结果定位' },
          { src: asset('wuji', 'calendar'), alt: '吾记日历', caption: '按日期浏览历史记录' },
          { src: asset('wuji', 'all-entries'), alt: '全部日记', caption: '集中浏览与管理历史记录' },
          { src: asset('wuji', 'all-entries-alt'), alt: '全部日记的另一布局状态', caption: '历史内容在不同状态下的浏览方式' },
        ],
      },
      {
        title: '管理个人内容',
        intro: '个人信息和垃圾箱补齐从账号设置到删除恢复的内容生命周期。',
        images: [
          { src: asset('wuji', 'profile'), alt: '个人信息', caption: '账号与个人资料管理' },
          { src: asset('wuji', 'trash'), alt: '垃圾箱', caption: '删除内容的恢复与管理' },
        ],
      },
      {
        title: '设计规范',
        intro: '颜色与文字规范为阅读、编辑和多端界面提供一致的基础规则。',
        images: [
          { src: asset('wuji', 'colors'), alt: '吾记颜色规范', caption: '品牌色与内容界面色彩' },
          { src: asset('wuji', 'type'), alt: '吾记文字规范', caption: '阅读与编辑文字层级' },
        ],
      },
    ],
  },
  {
    slug: 'pea-notes',
    title: '豌豆便签',
    englishTitle: 'Pea Notes',
    category: '便签与桌面效率',
    platform: 'PC / 移动端 / 桌面组件',
    role: '跨形态体验 / 信息组织 / UI 视觉',
    accent: '#4d8f50',
    accentSoft: '#d2e4c8',
    summary: '从单列、多列和文件夹管理，到悬浮便签与桌面小组件，建立跨形态的轻量记录体验。',
    challenge: '同一条便签需要在列表、宫格、详情、悬浮窗和桌面组件中保持可识别，同时适应不同信息密度。',
    approach: '用一致的内容层级和色彩分类连接不同形态，再根据使用场景调整布局密度与操作暴露程度。',
    coverage: '素材覆盖 PC 单列与多列、文件夹、移动端宫格、拖动、悬浮便签、桌面组件和设计规范。',
    sourceCount: 13,
    cover: asset('pea-notes', 'multi-column'),
    coverAlt: '豌豆便签 PC 多列首页',
    sections: [
      {
        title: '一份内容，多种浏览密度',
        intro: '单列强调连续阅读，多列强调快速扫描，文件夹和详情负责进一步组织。',
        images: [
          { src: asset('pea-notes', 'single-column'), alt: 'PC 单列首页', caption: '连续阅读的单列模式' },
          { src: asset('pea-notes', 'multi-column'), alt: 'PC 多列首页', caption: '适合快速扫描的多列模式' },
          { src: asset('pea-notes', 'entry'), alt: '查看便签详情', caption: '列表与内容详情并置' },
          { src: asset('pea-notes', 'folder'), alt: '便签文件夹', caption: '按文件夹组织大量便签' },
        ],
      },
      {
        title: '把便签带到桌面上',
        intro: '移动端、悬浮窗与桌面组件让便签在不同工作场景中保持随手可用。',
        images: [
          { src: asset('pea-notes', 'mobile-overview'), alt: '移动端便签常态', caption: '移动端便签阅读与编辑' },
          { src: asset('pea-notes', 'grid'), alt: '移动端宫格首页', caption: '高密度宫格浏览' },
          { src: asset('pea-notes', 'drag'), alt: '长按拖动便签', caption: '直接操控的信息整理' },
          { src: asset('pea-notes', 'export'), alt: '长按导出便签', caption: '从长按操作进入内容导出' },
          { src: asset('pea-notes', 'floating'), alt: '悬浮便签', caption: '覆盖当前任务的快速记录' },
          { src: asset('pea-notes', 'widget'), alt: '桌面小组件', caption: '桌面常驻的信息入口' },
          { src: asset('pea-notes', 'combined'), alt: '组合便签', caption: '多条内容的组合展示' },
        ],
      },
      {
        title: '设计规范',
        intro: '颜色和文字规则保证不同尺寸、密度与平台之间仍属于同一产品。',
        images: [
          { src: asset('pea-notes', 'colors'), alt: '豌豆便签色彩规范', caption: '便签分类色与基础色' },
          { src: asset('pea-notes', 'type'), alt: '豌豆便签文字规范', caption: '多密度场景的文字层级' },
        ],
      },
    ],
  },
  {
    slug: 'multiboxing',
    title: '简鹿多开',
    englishTitle: 'Jianlu Multiboxing',
    category: '效率工具官网',
    platform: 'Web 官网 / Windows 产品',
    role: '官网信息架构 / 营销视觉 / 产品表达',
    accent: '#18896b',
    accentSoft: '#c7e4d9',
    summary: '面向多账号服务场景的产品官网设计，用清晰的功能分组和应用场景解释产品价值。',
    challenge: '本地素材仅包含官网长页，需要在不虚构应用内交互的前提下，完整呈现官网如何组织产品能力与转化路径。',
    approach: '以产品定位、能力说明、使用场景和下载入口形成连续营销叙事；本页把它明确作为官网设计案例展示。',
    coverage: '现有项目文件包含 1 张完整官网长图，可核验页面结构和视觉表达，不据此推断软件内部实现。',
    sourceCount: 1,
    cover: asset('multiboxing', 'website'),
    coverAlt: '简鹿多开官网完整设计',
    external: { label: '访问产品官网', href: 'https://www.jianlu365.com/multiboxing.html' },
    sections: [
      {
        title: '用一张长页讲清产品',
        intro: '从首屏定位到功能、场景和转化入口，完整长页承担产品介绍与下载决策。',
        images: [
          { src: asset('multiboxing', 'website'), alt: '简鹿多开官网长页', caption: '官网完整页面设计；仅展示可由现有素材核验的内容' },
        ],
      },
    ],
  },
  {
    slug: 'audio-editor',
    title: '音频剪辑',
    englishTitle: 'Audio Editor Website',
    category: '音频工具官网',
    platform: 'Web 官网 / Windows 产品',
    role: '官网视觉 / 功能叙事 / 转化设计',
    accent: '#2c69c9',
    accentSoft: '#ceddf4',
    summary: '围绕音频剪辑工具的核心能力、使用流程和产品价值，完成一套完整官网长页设计。',
    challenge: '本地素材只有官网长图，因此案例重点是营销页面如何建立信息顺序，而不延伸未经证实的软件内部交互。',
    approach: '通过首屏主张、功能演示、操作流程、应用场景和下载入口逐步回答“是什么、能做什么、如何开始”。',
    coverage: '现有项目文件包含 1 张完整官网长图；本页忠实展示页面本身，不加入无法核验的产品数据。',
    sourceCount: 1,
    cover: asset('audio-editor', 'website'),
    coverAlt: '音频剪辑官网完整设计',
    sections: [
      {
        title: '完整官网叙事',
        intro: '长页通过连续内容区块承载产品定位、能力说明与下载转化。',
        images: [
          { src: asset('audio-editor', 'website'), alt: '音频剪辑官网长页', caption: '官网完整页面设计；保留原始页面比例' },
        ],
      },
    ],
  },
]

export const projectBySlug = new Map(portfolioProjects.map(project => [project.slug, project]))
