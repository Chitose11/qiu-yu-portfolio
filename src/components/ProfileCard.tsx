import type { PointerEvent as ReactPointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

type ProfileCardProps = {
  portrait: string
  avatar: string
}

export function ProfileCard({ portrait, avatar }: ProfileCardProps) {
  const reduceMotion = useReducedMotion()
  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 22, mass: 0.55 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 22, mass: 0.55 })

  const updateTilt = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    rotateY.set(x * 12)
    rotateX.set(y * -10)
  }

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const captureTouch = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') event.currentTarget.setPointerCapture(event.pointerId)
    updateTilt(event)
  }

  return (
    <motion.article
      className="profile-card"
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onPointerDown={captureTouch}
      onPointerMove={updateTilt}
      onPointerLeave={resetTilt}
      onPointerUp={resetTilt}
      onPointerCancel={resetTilt}
    >
      <img className="profile-card__portrait" src={portrait} alt="UI/UX 设计师邱宇的个人肖像" />
      <div className="profile-card__shade" aria-hidden="true" />
      <div className="profile-card__identity">
        <img className="profile-card__avatar" src={avatar} alt="邱宇的插画头像" />
        <div>
          <strong>邱宇</strong>
          <span>UI / UX 设计师</span>
        </div>
        <span className="profile-card__status"><i aria-hidden="true" />考虑机会</span>
      </div>
      <div className="profile-card__meta" aria-label="求职状态">
        <span>6 年产品设计经验</span>
        <span>惠州 · 可沟通</span>
      </div>
    </motion.article>
  )
}
