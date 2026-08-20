import { lazy, Suspense, useRef, useState, useSyncExternalStore } from 'react'
import { ArrowDownRight, ArrowUpRight, Github, Mail } from 'lucide-react'
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { BlurText } from './components/BlurText'
import { FlowingMenu } from './components/FlowingMenu'
import { ImageTrail } from './components/ImageTrail'
import { PillNav } from './components/PillNav'
import { ProfileCard } from './components/ProfileCard'
import { ScrollReveal } from './components/ScrollReveal'
import { TextType } from './components/TextType'
import { ProjectDetailPage } from './ProjectDetailPage'

const heroTrailImages = [
  './assets/tool-figma.svg',
  './assets/tool-ae.svg',
  './assets/tool-c4d.svg',
  './assets/tool-jimeng.svg',
  './assets/tool-lovart.svg',
  './assets/tool-nano-banana.svg',
]

const contactTypingSpeed = { min: 85, max: 155 }
const LazyLanyardCard = lazy(() => import('./components/LanyardCard').then(module => ({ default: module.LanyardCard })))

function ContactBends() {
  return (
    <div className="contact__bends" aria-hidden="true">
      <span className="contact__bend contact__bend--one" />
      <span className="contact__bend contact__bend--two" />
      <span className="contact__bend contact__bend--three" />
    </div>
  )
}

function ContactLanyard() {
  const loadBoundaryRef = useRef<HTMLDivElement | null>(null)
  const shouldLoad = useInView(loadBoundaryRef, { once: true, margin: '50% 0px' })
  const reduceMotion = useReducedMotion()

  return (
    <div ref={loadBoundaryRef} className="contact__lanyard-stage">
      {reduceMotion ? (
        <div className="contact__lanyard-fallback" aria-label="邱宇的个人身份牌">
          <img src="./assets/qiu-yu.webp" alt="邱宇" />
          <img src="./assets/logo.svg" alt="" aria-hidden="true" />
        </div>
      ) : shouldLoad ? (
        <Suspense fallback={<span className="contact__lanyard-loading">正在装配身份牌…</span>}>
          <LazyLanyardCard portrait="./assets/qiu-yu.webp" logo="./assets/logo.svg" cameraDistance={41} />
        </Suspense>
      ) : null}
    </div>
  )
}

const projects = [
  {
    id: 'watermark',
    detailSlug: 'watermark',
    title: '简鹿水印助手',
    subtitle: '让批量水印处理更清晰可控',
    summary:
      '把图片与视频的加水印、去水印、画布编辑和批量导出，收束进一套统一的桌面工作流。重点处理多选区、时间范围、批量应用与异常反馈。',
    tags: ['桌面端工具', '图片 / 视频工作流', '批量处理'],
    coverLabel: '水印助手',
    cover: { src: './assets/watermark-showcase.png', label: '项目封面', kind: 'showcase' },
    tone: 'violet',
    facts: [
      { title: '四类任务入口', body: '图片与视频的加水印、去水印共用一致的任务模型', asset: { src: './assets/watermark-fact-tasks.webp', label: '四类任务入口界面' } },
      { title: '复杂编辑控制', body: '文字、图片、多选区、时间范围与九宫格定位', asset: { src: './assets/watermark-fact-editor.webp', label: '图片加水印编辑工作台' } },
      { title: '批量与异常状态', body: '文件列表、应用到全部、输出目录和错误分类反馈', asset: { src: './assets/watermark-fact-feedback.webp', label: '导入异常分类反馈' } },
    ],
  },
  {
    id: 'voice',
    detailSlug: 'voice-separation',
    title: '简鹿人声分离',
    subtitle: '把复杂音频处理做成清晰的桌面工作流',
    summary:
      '围绕人声、伴奏与视频音轨处理，设计从拖拽导入、批量任务、参数设置到结果反馈的端到端体验，让专业操作更容易理解。',
    tags: ['音视频工具', '批量任务', '状态反馈'],
    coverLabel: '人声分离',
    cover: { src: './assets/voice-showcase.png', label: '项目封面', kind: 'showcase' },
    tone: 'blue',
    facts: [
      { title: '多工具信息架构', body: '统一组织人声、伴奏与多种乐器声部处理入口', asset: { src: './assets/voice-fact-architecture.webp', label: '多工具欢迎页' } },
      { title: '批处理工作流', body: '文件状态、进度、参数设置和行级操作保持连续', asset: { src: './assets/voice-fact-batch.webp', label: '批量任务工作台' } },
      { title: '完整反馈闭环', body: '覆盖空状态、编辑弹窗、处理中与完成反馈', asset: { src: './assets/voice-fact-feedback.webp', label: '批处理完成反馈' } },
    ],
  },
  {
    id: 'xhs',
    detailSlug: 'xhs-ai',
    title: '小红书 AI 创作助手',
    subtitle: '从账号定位到发布预览的一条完整创作链路',
    summary:
      '把账号定位、选题规划、文案生成、违规检测与封面预览串成可执行流程，同时覆盖历史记录、会员与积分等产品化场景。',
    tags: ['AI 创作工作流', '内容策略', '会员与权限'],
    coverLabel: '小红书 AI',
    cover: { src: './assets/xhs-showcase.png', label: '项目封面', kind: 'showcase' },
    tone: 'red',
    facts: [
      { title: '五步创作流程', body: '从账号策略到发布前检查，减少工具间的体验断点', asset: { src: './assets/xhs-fact-flow.webp', label: '五步创作流程首页' } },
      { title: '多维输入与结果', body: '承载账号画像、选题列表、文案参数与风险文本', asset: { src: './assets/xhs-fact-input.webp', label: 'IP 账号定位工作台' } },
      { title: '产品化完整度', body: '历史记录、会员套餐、积分消耗与权限状态形成闭环', asset: { src: './assets/xhs-fact-product.webp', label: '会员与权限页面' } },
    ],
  },
]

const experience = [
  {
    period: '2023.05 — 至今',
    company: '惠州市登临科技有限公司',
    role: 'UI 设计师',
    body: '主导 C 端工具类产品全链路设计，完成 7 款 PC 端专业工具从 0 到 1 的交互原型与视觉体系；持续推进跨平台组件库与设计规范。',
  },
  {
    period: '2022.01 — 2023.05',
    company: '惠州市虎三网络科技有限公司',
    role: 'UI 设计师',
    body: '负责多款 App 的界面与交互设计，覆盖 C 端与 B 端场景；从市场调研、原型到开发协作，持续根据反馈优化体验。',
  },
  {
    period: '2020.12 — 2021.12',
    company: '惠州英凡科技有限公司',
    role: 'UI 设计师',
    body: '负责交互与界面视觉设计，通过用户需求理解、信息架构和用户流程，交付清晰易用的产品界面。',
  },
]

const moreProjects = [
  { title: '电脑录屏', description: '录制、录音、定时任务与设备设置', image: './assets/more-recorder.webp', href: '#/project/screen-recorder' },
  { title: '视频大师', description: '剪切、合并、配乐与画面调节', image: './assets/more-video.webp', href: '#/project/video-master' },
  { title: '吾记', description: '日记、日历、模板与时光记录', image: './assets/more-journal.webp', href: '#/project/wuji' },
  { title: '豌豆便签', description: '多列便签、桌面组件与信息整理', image: './assets/more-notes.webp', href: '#/project/pea-notes' },
  { title: '多开', description: '多账号服务人员的效率工具', image: './assets/more-multi.webp', href: '#/project/multiboxing' },
  { title: '音频剪辑', description: '面向大众的音频处理体验', image: './assets/more-audio.webp', href: '#/project/audio-editor' },
]

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 26, mass: 0.28 })

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

function SectionHeading({
  id,
  title,
  body,
  dark = false,
}: {
  id: string
  title: string
  body: string
  dark?: boolean
}) {
  return (
    <div className={`section-heading ${dark ? 'section-heading--dark' : ''}`}>
      <ScrollReveal variant="title" amount={0.35}>
        <h2 id={id}>{title}</h2>
      </ScrollReveal>
      <ScrollReveal variant="copy" delay={0.12} amount={0.5}>
        <p>{body}</p>
      </ScrollReveal>
    </div>
  )
}

function ProjectSection({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const reduceMotion = useReducedMotion()
  const [activeFactIndex, setActiveFactIndex] = useState(0)
  const activeFact = project.facts[activeFactIndex]
  const stageRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [54, -54])
  const imageRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [0, 0, 0] : [0.45, 0, -0.45],
  )
  return (
    <article className={`project project--${project.tone}`} id={project.id}>
      <div className="project__intro">
        <ScrollReveal variant="title" amount={0.35}>
          <p className="project__type">精选项目 · {index + 1} / {projects.length}</p>
          <h3>{project.title}</h3>
        </ScrollReveal>
        <ScrollReveal className="project__copy" variant="copy" delay={0.14} amount={0.4}>
          <h4>{project.subtitle}</h4>
          <p>{project.summary}</p>
          <ul className="tag-list" aria-label="项目标签">
            {project.tags.map((tag, tagIndex) => (
              <motion.li
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.22 + tagIndex * 0.06, ease: [0.16, 1, 0.3, 1] }}
                key={tag}
              >
                {tag}
              </motion.li>
            ))}
          </ul>
          <a className="project__detail-link" href={`#/project/${project.detailSlug}`}>
            查看完整项目档案 <ArrowUpRight aria-hidden="true" />
          </a>
        </ScrollReveal>
      </div>

      <motion.figure
        ref={stageRef}
        className="project__stage"
        initial={reduceMotion ? false : { clipPath: 'inset(16% 0 16% 0 round 24px)', y: 94, scale: 0.96 }}
        whileInView={{ clipPath: 'inset(0% 0 0% 0 round 24px)', y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.14 }}
        transition={{ duration: 1.12, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="project__cover-label" aria-hidden="true">
          {project.coverLabel}
        </span>
        <motion.div
          className="project__gallery-frame"
          aria-label={`${project.title}：${project.cover.label}`}
          style={{ y: imageY, rotate: imageRotate }}
          initial={reduceMotion ? false : { scale: 1.11, filter: 'blur(9px)' }}
          whileInView={{ scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.16 }}
          transition={{ duration: 1.28, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            className={`project__gallery-image project__gallery-image--${project.cover.kind}`}
            src={project.cover.src}
            alt={`${project.title} · ${project.cover.label}`}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </motion.div>
        <motion.span
          aria-hidden="true"
          className="project__curtain"
          initial={reduceMotion ? false : { scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.14 }}
          transition={{ duration: 1.02, delay: 0.04, ease: [0.76, 0, 0.24, 1] }}
        />
      </motion.figure>

      <div className="project__evidence">
        <ScrollReveal variant="detail" amount={0.18}>
          <figure
            className="project__detail"
            id={`${project.id}-evidence-panel`}
            role="tabpanel"
            aria-label={`${project.title}：${activeFact.asset.label}`}
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.img
                key={activeFact.asset.src}
                src={activeFact.asset.src}
                alt={`${project.title} · ${activeFact.asset.label}`}
                loading="lazy"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.025, filter: 'blur(7px)', clipPath: 'inset(0 0 0 8%)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', clipPath: 'inset(0 0 0 0%)' }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99, filter: 'blur(5px)', clipPath: 'inset(0 8% 0 0)' }}
                transition={{ duration: reduceMotion ? 0.01 : 0.42, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
          </figure>
        </ScrollReveal>
        <div className="project__facts" role="tablist" aria-label={`${project.title}设计问题与界面证据`}>
          <ScrollReveal variant="copy" amount={0.5}>
            <p className="project__question">我在这个项目里解决了什么？</p>
          </ScrollReveal>
          {project.facts.map((fact, factIndex) => (
            <ScrollReveal variant="row" delay={factIndex * 0.08} amount={0.45} key={fact.title}>
              <button
                type="button"
                role="tab"
                aria-selected={factIndex === activeFactIndex}
                aria-controls={`${project.id}-evidence-panel`}
                className={`fact ${factIndex === activeFactIndex ? 'is-active' : ''}`}
                tabIndex={factIndex === activeFactIndex ? 0 : -1}
                onMouseEnter={() => setActiveFactIndex(factIndex)}
                onFocus={() => setActiveFactIndex(factIndex)}
                onClick={() => setActiveFactIndex(factIndex)}
                onKeyDown={event => {
                  if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return
                  event.preventDefault()
                  const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1
                  const nextIndex = (factIndex + direction + project.facts.length) % project.facts.length
                  setActiveFactIndex(nextIndex)
                  const buttons = event.currentTarget.closest('[role="tablist"]')?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
                  buttons?.[nextIndex]?.focus()
                }}
              >
                <h5>{fact.title}</h5>
                <p>{fact.body}</p>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </article>
  )
}

function HomePage() {
  const reduceMotion = useReducedMotion()
  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <ScrollProgress />
      <PillNav />
      <main id="main">
        <section className="hero" id="top">
          <ImageTrail images={heroTrailImages} threshold={52} />
          <div className="hero__copy">
            <motion.p
              className="identity"
              initial={reduceMotion ? false : { opacity: 0, y: 28, filter: 'blur(9px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.72, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              邱宇 · UI / UX 设计师 · 6 年经验
            </motion.p>
            <h1>
              <BlurText text="把产品想法，" />
                <BlurText text="设计成美观" delay={0.018} />
                <BlurText text="可运行的软件。" delay={0.036} />
            </h1>
            <motion.div
              className="hero__footer"
              initial={reduceMotion ? false : { opacity: 0, y: 46, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.86, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                我关注的不只是界面是否好看，也关心复杂任务如何被理解、状态如何被感知，以及设计如何顺利进入开发。
              </p>
              <a href="#work" className="scroll-cue">
                向下看作品 <ArrowDownRight aria-hidden="true" />
              </a>
            </motion.div>
          </div>
          <motion.div
            className="profile-card-wrap"
            initial={reduceMotion ? false : { opacity: 0.22, clipPath: 'inset(22% 0 0 0 round 24px)', y: 58, scale: 0.95 }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0 round 24px)', y: 0, scale: 1 }}
            transition={{ duration: 1.05, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProfileCard portrait="./assets/qiu-yu.webp" avatar="./assets/profile-avatar.jpeg" />
          </motion.div>
        </section>

        <section className="work" id="work" aria-labelledby="work-title">
          <SectionHeading
            id="work-title"
            title={'三个项目，\n三种复杂度。'}
            body="从跨媒体编辑、批量处理到 AI 内容工作流，作品首先回答“为什么这样设计”。"
          />
          {projects.map((project, index) => (
            <ProjectSection project={project} index={index} key={project.id} />
          ))}
        </section>

        <section className="capabilities" id="capabilities" aria-labelledby="capabilities-title">
          <SectionHeading
            id="capabilities-title"
            title="我把体验设计做成一条完整链路。"
            body="从需求判断到组件化交付，让产品目标、用户任务与开发实现能在同一套逻辑里对齐。"
            dark
          />
          <div className="capability-grid">
            {[
              ['理解问题', '用户建模、竞品拆解、信息架构与关键任务推演，先找到真正需要被解决的体验阻力。'],
              ['建立系统', '用 Figma 原子化组件与跨平台规范控制一致性，让多状态、多端交付保持可维护。'],
              ['推动落地', '结合原型、动效与 AIGC 快速验证方案，并与开发协作，把设计判断落实到可运行产品。'],
            ].map(([title, body], index) => (
              <div key={title}>
                <ScrollReveal variant="row" delay={index * 0.1} amount={0.5}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </ScrollReveal>
              </div>
            ))}
          </div>
          <ScrollReveal variant="copy" amount={0.7}>
            <div className="skill-line" aria-label="专业工具">
              <span>Figma</span><span>After Effects</span><span>C4D</span><span>交互原型</span><span>设计系统</span><span>AIGC</span>
            </div>
          </ScrollReveal>
        </section>

        <section className="experience" id="experience" aria-labelledby="experience-title">
          <SectionHeading
            id="experience-title"
            title="6 年，持续把复杂产品做得更清楚。"
            body="工作覆盖工具类软件、移动产品、B 端与 C 端体验，也包括规范、动效和开发协作。"
          />
          <div className="experience-list">
            {experience.map((item, index) => (
              <ScrollReveal variant="row" delay={index * 0.07} amount={0.45} key={item.company}>
                <article className="experience-row">
                  <p className="experience-row__period">{item.period}</p>
                  <div>
                    <h3>{item.company}</h3>
                    <p className="experience-row__role">{item.role}</p>
                  </div>
                  <p className="experience-row__body">{item.body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal variant="copy" amount={0.8}>
            <p className="education">广州铁路职业技术学院 · 视觉传达设计 · 2018—2020</p>
          </ScrollReveal>
        </section>

        <section className="more-work" aria-labelledby="more-title">
          <SectionHeading
            id="more-title"
            title="更多产品，也在同一套方法里。"
            body="这些项目覆盖效率工具、内容记录与音视频创作；每个项目都可以继续进入独立介绍页查看真实界面与设计状态。"
          />
          <FlowingMenu items={moreProjects} />
        </section>

        <section className="ai-builds" aria-labelledby="ai-title">
          <SectionHeading
            id="ai-title"
            title="我也用 AI，把自己的想法做成软件。"
            body="这不是工程师身份的包装，而是用可运行原型缩短设计验证距离，让交互判断更接近真实产品。"
            dark
          />
          <ScrollReveal variant="detail" amount={0.3}>
            <div className="build-links">
            <a href="https://github.com/Chitose11/World-Cup-prediction" target="_blank" rel="noreferrer">
              <span>赔率概率与量化策略工作台</span>
              <strong>World Cup Prediction</strong>
              <p>把概率模型、外部情报与 AI 推荐组织成可访问、可回测的本地工作台。</p>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="https://github.com/Chitose11/fps-sensitivity-flight-deck" target="_blank" rel="noreferrer">
              <span>个人 AI 编程实践</span>
              <strong>FPS Sensitivity Flight Deck</strong>
              <p>使用 AI 完成的个人软件实践；从 GitHub 进入项目查看当前可公开内容。</p>
              <ArrowUpRight aria-hidden="true" />
            </a>
            </div>
          </ScrollReveal>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <ContactBends />
          <div className="contact__content">
            <div className="contact__body">
              <div className="contact__message">
                <ScrollReveal variant="copy" amount={0.7}>
                  <p>如果你正在寻找一位能理解产品、建立系统，也愿意把想法做出来的设计师——</p>
                </ScrollReveal>
                <TextType
                  as="h2"
                  id="contact-title"
                  text="我们聊聊。"
                  aria-label="我们聊聊。"
                  startOnVisible
                  initialDelay={180}
                  variableSpeed={contactTypingSpeed}
                  cursorCharacter="|"
                />
                <ScrollReveal variant="row" delay={0.1} amount={0.7}>
                  <a className="contact-mail" href="mailto:953092385@qq.com">
                    <Mail aria-hidden="true" />
                    953092385@qq.com
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </ScrollReveal>
              </div>
              <ContactLanyard />
            </div>
            <div className="contact-meta">
              <span>邱宇 · UI / UX 设计师</span>
              <a href="https://github.com/Chitose11" target="_blank" rel="noreferrer">
                <Github aria-hidden="true" /> GitHub
              </a>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function subscribeToHash(callback: () => void) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

function getHashSnapshot() {
  return window.location.hash
}

function App() {
  const hash = useSyncExternalStore(subscribeToHash, getHashSnapshot, () => '')
  const projectMatch = hash.match(/^#\/project\/([^/?#]+)/)

  if (projectMatch) return <ProjectDetailPage slug={decodeURIComponent(projectMatch[1])} />
  return <HomePage />
}

export default App
