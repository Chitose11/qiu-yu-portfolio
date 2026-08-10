import { ArrowDownRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

export type FlowingMenuItem = {
  title: string
  description: string
  image: string
}

type FlowingMenuProps = {
  items: FlowingMenuItem[]
}

export function FlowingMenu({ items }: FlowingMenuProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="flowing-menu">
      {items.map((item, index) => (
        <motion.div
          className={`flowing-menu__item ${index % 2 ? 'flowing-menu__item--reverse' : ''}`}
          initial={reduceMotion ? false : { opacity: 0, y: 42, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.72, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] }}
          tabIndex={0}
          aria-label={`${item.title}：${item.description}`}
          key={item.title}
        >
          <div className="flowing-menu__content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <img className="flowing-menu__thumb" src={item.image} alt="" loading="lazy" />
            <ArrowDownRight aria-hidden="true" />
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
        </motion.div>
      ))}
    </div>
  )
}
