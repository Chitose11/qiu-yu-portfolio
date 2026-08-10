import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

export type FlowingMenuItem = {
  title: string
  description: string
  image: string
  href?: string
}

type FlowingMenuProps = {
  items: FlowingMenuItem[]
}

export function FlowingMenu({ items }: FlowingMenuProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="flowing-menu">
      {items.map((item, index) => {
        const className = `flowing-menu__item ${item.href ? 'flowing-menu__item--linked' : ''} ${index % 2 ? 'flowing-menu__item--reverse' : ''}`
        const visual = (
          <>
          <div className="flowing-menu__content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <img className="flowing-menu__thumb" src={item.image} alt="" loading="lazy" />
            {item.href && <ArrowUpRight aria-hidden="true" />}
          </div>

          <div className="flowing-menu__marquee" aria-hidden="true">
            <div className="flowing-menu__track">
              {Array.from({ length: 4 }, (_, repeatIndex) => (
                <div className="flowing-menu__segment" key={repeatIndex}>
                  <span>{item.title}</span>
                  <img src={item.image} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          </>
        )
        const motionProps = {
          className,
          initial: reduceMotion ? false : { opacity: 0, y: 42, filter: 'blur(8px)' },
          whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
          viewport: { once: true, amount: 0.55 },
          transition: { duration: 0.72, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] as const },
        }

        return item.href ? (
          <motion.a
            {...motionProps}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${item.title}：${item.description}，打开产品官网（新标签页）`}
            key={item.title}
          >
            {visual}
          </motion.a>
        ) : (
          <motion.div {...motionProps} key={item.title}>
            {visual}
          </motion.div>
        )
      })}
    </div>
  )
}
