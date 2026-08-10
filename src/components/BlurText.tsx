import { motion, useReducedMotion } from 'motion/react'

type BlurTextProps = {
  text: string
  className?: string
  delay?: number
}

// Adapted for this portfolio from React Bits' BlurText component pattern.
// Source: https://github.com/DavidHDev/react-bits
export function BlurText({ text, className = '', delay = 0.025 }: BlurTextProps) {
  const reduceMotion = useReducedMotion()
  const characters = Array.from(text)

  return (
    <span className={`blur-text ${className}`} aria-label={text}>
      {characters.map((character, index) => (
        <motion.span
          aria-hidden="true"
          className="blur-text__character"
          initial={reduceMotion ? false : { opacity: 0.18, filter: 'blur(12px)', y: 18 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 0.72,
            delay: index * delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          key={`${character}-${index}`}
        >
          {character === ' ' ? '\u00A0' : character}
        </motion.span>
      ))}
    </span>
  )
}
