import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type RevealVariant = 'title' | 'copy' | 'row' | 'detail'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  delay?: number
  amount?: number
}

const initialByVariant = {
  title: {
    opacity: 0.08,
    y: 68,
    filter: 'blur(16px)',
    clipPath: 'inset(0 0 34% 0)',
  },
  copy: {
    opacity: 0.08,
    y: 44,
    filter: 'blur(11px)',
  },
  row: {
    opacity: 0.12,
    y: 38,
    filter: 'blur(7px)',
  },
  detail: {
    opacity: 0.18,
    x: -76,
    scale: 0.96,
    clipPath: 'inset(0 18% 0 0 round 20px)',
  },
}

const visibleByVariant = {
  title: { opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0% 0)' },
  copy: { opacity: 1, y: 0, filter: 'blur(0px)' },
  row: { opacity: 1, y: 0, filter: 'blur(0px)' },
  detail: { opacity: 1, x: 0, scale: 1, clipPath: 'inset(0 0% 0 0 round 20px)' },
}

export function ScrollReveal({
  children,
  className = '',
  variant = 'copy',
  delay = 0,
  amount = 0.2,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`scroll-reveal scroll-reveal--${variant} ${className}`}
      initial={reduceMotion ? false : initialByVariant[variant]}
      whileInView={visibleByVariant[variant]}
      viewport={{ once: true, amount }}
      transition={{
        duration: variant === 'title' || variant === 'detail' ? 1.02 : 0.78,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
