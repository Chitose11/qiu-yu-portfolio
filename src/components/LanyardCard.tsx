import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

type LanyardCardProps = {
  portrait: string
  logo: string
}

const spring = { stiffness: 150, damping: 18, mass: 0.72 }

export function LanyardCard({ portrait, logo }: LanyardCardProps) {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, spring)
  const smoothY = useSpring(y, spring)
  const rotateY = useTransform(smoothX, [-170, 0, 170], [-11, 0, 11])
  const rotateX = useTransform(smoothY, [-110, 0, 130], [7, 0, -8])
  const cordPath = useTransform([smoothX, smoothY], ([currentX, currentY]) => {
    const endX = 320 + Number(currentX) * 0.78
    const endY = 352 + Number(currentY) * 0.55
    const bendX = 320 + Number(currentX) * 0.28
    return `M 320 -32 C 320 86, ${bendX} 206, ${endX} ${endY}`
  })

  const reset = () => {
    animate(x, 0, { type: 'spring', stiffness: 180, damping: 20, mass: 0.7 })
    animate(y, 0, { type: 'spring', stiffness: 180, damping: 20, mass: 0.7 })
  }

  return (
    <div className="contact-lanyard" data-reduce-motion={reduceMotion ? 'true' : 'false'}>
      <svg className="contact-lanyard__cord" viewBox="0 0 640 760" preserveAspectRatio="none" aria-hidden="true">
        <motion.path d={cordPath} className="contact-lanyard__cord-shadow" />
        <motion.path d={cordPath} className="contact-lanyard__cord-line" />
        <motion.path d={cordPath} className="contact-lanyard__cord-stitch" />
      </svg>

      <div className="contact-lanyard__anchor">
        <motion.div
          className="contact-lanyard__swing"
          animate={reduceMotion ? undefined : { rotateZ: [-1.4, 1.1, -1.4] }}
          transition={reduceMotion ? undefined : { duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.button
            type="button"
            className="contact-lanyard__card"
            aria-label="邱宇的个人身份牌，可拖动查看动态效果；按回车或 Esc 回正"
            title="拖动身份牌"
            drag={!reduceMotion}
            dragConstraints={{ left: -170, right: 170, top: -96, bottom: 118 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragEnd={reset}
            onBlur={reset}
            onKeyDown={(event) => {
              const step = event.shiftKey ? 28 : 14
              if (event.key === 'ArrowLeft') x.set(Math.max(-170, x.get() - step))
              else if (event.key === 'ArrowRight') x.set(Math.min(170, x.get() + step))
              else if (event.key === 'ArrowUp') y.set(Math.max(-96, y.get() - step))
              else if (event.key === 'ArrowDown') y.set(Math.min(118, y.get() + step))
              else if (event.key === 'Enter' || event.key === 'Escape') reset()
              else return
              event.preventDefault()
            }}
            style={reduceMotion ? undefined : { x: smoothX, y: smoothY, rotateX, rotateY }}
            whileTap={reduceMotion ? undefined : { scale: 0.985, cursor: 'grabbing' }}
          >
            <span className="contact-lanyard__clip" aria-hidden="true"><i /></span>
            <span className="contact-lanyard__brand">
              <img src={logo} alt="" />
              <span>QIU YU</span>
              <small>PRODUCT DESIGN</small>
            </span>
            <span className="contact-lanyard__portrait">
              <img src={portrait} alt="" draggable="false" />
            </span>
            <span className="contact-lanyard__identity">
              <strong>邱宇</strong>
              <span>UI / UX 设计师</span>
              <small>6 YEARS · HUIZHOU</small>
            </span>
          </motion.button>
        </motion.div>
      </div>

      <p className="contact-lanyard__hint" aria-hidden="true">DRAG THE CARD · 拖动身份牌</p>
    </div>
  )
}
