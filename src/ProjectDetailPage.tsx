import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { portfolioProjects, projectBySlug } from './projectData'
import { ScrollReveal } from './components/ScrollReveal'

type ProjectDetailPageProps = {
  slug: string
}

export function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const reduceMotion = useReducedMotion()
  const project = projectBySlug.get(slug)
  const projectIndex = portfolioProjects.findIndex(item => item.slug === slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = project ? `${project.title}｜邱宇作品集` : '项目未找到｜邱宇作品集'
    return () => { document.title = '邱宇｜UI / UX 设计师作品集' }
  }, [project])

  if (!project) {
    return (
      <main className="case-not-found">
        <img src="./assets/logo.svg" alt="" aria-hidden="true" />
        <h1>这个项目页面不存在。</h1>
        <a href="#work"><ArrowLeft aria-hidden="true" /> 返回作品首页</a>
      </main>
    )
  }

  const nextProject = portfolioProjects[(projectIndex + 1) % portfolioProjects.length]

  return (
    <div
      className="case-page"
      style={{ '--case-accent': project.accent, '--case-soft': project.accentSoft } as React.CSSProperties}
    >
      <header className="case-nav">
        <a className="case-nav__brand" href="#work" aria-label="返回作品首页">
          <img src="./assets/logo.svg" alt="" aria-hidden="true" />
        </a>
        <a className="case-nav__back" href="#work"><ArrowLeft aria-hidden="true" /> 全部作品</a>
        <span>{String(projectIndex + 1).padStart(2, '0')} / {String(portfolioProjects.length).padStart(2, '0')}</span>
      </header>

      <main>
        <section className="case-hero">
          <motion.div
            className="case-hero__copy"
            initial={reduceMotion ? false : { opacity: 0, y: 48, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1>{project.title}</h1>
            <p className="case-hero__english">{project.englishTitle}</p>
            <p className="case-hero__summary">{project.summary}</p>
            {project.external && (
              <a className="case-external" href={project.external.href} target="_blank" rel="noreferrer">
                {project.external.label}<ArrowUpRight aria-hidden="true" />
              </a>
            )}
          </motion.div>

          <motion.figure
            className="case-hero__media"
            initial={reduceMotion ? false : { opacity: 0.25, y: 72, clipPath: 'inset(18% 0 0 0 round 24px)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0 round 24px)' }}
            transition={{ duration: 1.05, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={project.cover} alt={project.coverAlt} fetchPriority="high" />
          </motion.figure>

          <motion.dl
            className="case-meta"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.66, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
          >
            <div><dt>类型</dt><dd>{project.category}</dd></div>
            <div><dt>平台</dt><dd>{project.platform}</dd></div>
            <div><dt>职责</dt><dd>{project.role}</dd></div>
            <div><dt>现有素材</dt><dd>{project.sourceCount} 张项目图</dd></div>
          </motion.dl>
        </section>

        <section className="case-brief" aria-labelledby="case-brief-title">
          <ScrollReveal variant="title" amount={0.4}>
            <h2 id="case-brief-title">我如何理解这个项目。</h2>
          </ScrollReveal>
          <div className="case-brief__grid">
            {[
              ['设计挑战', project.challenge],
              ['组织方式', project.approach],
              ['素材覆盖', project.coverage],
            ].map(([title, body], index) => (
              <ScrollReveal variant="row" delay={index * 0.08} amount={0.5} key={title}>
                <article>
                  <h3>{title}</h3>
                  <div>{body}</div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <div className="case-sections">
          {project.sections.map((section, sectionIndex) => (
            <section className="case-gallery" aria-labelledby={`${project.slug}-section-${sectionIndex}`} key={section.title}>
              <div className="case-gallery__heading">
                <ScrollReveal variant="title" amount={0.35}>
                  <p>{String(sectionIndex + 1).padStart(2, '0')}</p>
                  <h2 id={`${project.slug}-section-${sectionIndex}`}>{section.title}</h2>
                </ScrollReveal>
                <ScrollReveal variant="copy" delay={0.1} amount={0.55}>
                  <p>{section.intro}</p>
                </ScrollReveal>
              </div>

              <div className={`case-gallery__grid ${section.images.length === 1 ? 'case-gallery__grid--single' : ''}`}>
                {section.images.map((image, imageIndex) => (
                  <ScrollReveal
                    className={imageIndex % 3 === 0 ? 'case-shot-wrap case-shot-wrap--wide' : 'case-shot-wrap'}
                    variant="detail"
                    delay={(imageIndex % 2) * 0.08}
                    amount={0.12}
                    key={image.src}
                  >
                    <figure className="case-shot">
                      <a href={image.src} target="_blank" rel="noreferrer" aria-label={`查看大图：${image.caption}`}>
                        <img src={image.src} alt={image.alt} loading="lazy" />
                      </a>
                      <figcaption>
                        <span>{String(imageIndex + 1).padStart(2, '0')}</span>
                        {image.caption}
                      </figcaption>
                    </figure>
                  </ScrollReveal>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="case-next" style={{ background: nextProject.accentSoft }}>
          <p>下一个项目</p>
          <a href={`#/project/${nextProject.slug}`}>
            <span>{nextProject.title}</span>
            <ArrowRight aria-hidden="true" />
          </a>
          <span>{nextProject.category}</span>
        </section>
      </main>
    </div>
  )
}
