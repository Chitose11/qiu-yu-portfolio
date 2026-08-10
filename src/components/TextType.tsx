import { createElement, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

type TextTypeProps = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  className?: string
  typingSpeed?: number
  initialDelay?: number
  variableSpeed?: { min: number; max: number }
  startOnVisible?: boolean
  showCursor?: boolean
  cursorCharacter?: string
  'aria-label'?: string
  id?: string
}

export function TextType({
  text,
  as = 'span',
  className = '',
  typingSpeed = 90,
  initialDelay = 0,
  variableSpeed,
  startOnVisible = false,
  showCursor = true,
  cursorCharacter = '|',
  ...props
}: TextTypeProps) {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(!startOnVisible)
  const [characterCount, setCharacterCount] = useState(reduceMotion ? text.length : 0)
  const [complete, setComplete] = useState(Boolean(reduceMotion))

  useEffect(() => {
    if (reduceMotion) {
      setCharacterCount(text.length)
      setComplete(true)
      return
    }

    if (!startOnVisible || !containerRef.current) return
    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0.35 },
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [reduceMotion, startOnVisible, text.length])

  useEffect(() => {
    if (!visible || reduceMotion || complete) return
    if (characterCount >= text.length) {
      setComplete(true)
      return
    }

    const delay = characterCount === 0
      ? initialDelay
      : variableSpeed
        ? variableSpeed.min + Math.random() * (variableSpeed.max - variableSpeed.min)
        : typingSpeed
    const timer = window.setTimeout(() => setCharacterCount(count => count + 1), delay)
    return () => window.clearTimeout(timer)
  }, [characterCount, complete, initialDelay, reduceMotion, text.length, typingSpeed, variableSpeed, visible])

  return createElement(
    as,
    {
      ref: containerRef,
      className: `text-type ${complete ? 'text-type--complete' : ''} ${className}`.trim(),
      ...props,
    },
    createElement('span', { className: 'text-type__content', 'aria-hidden': true }, text.slice(0, characterCount)),
    showCursor && !reduceMotion
      ? createElement('span', { className: 'text-type__cursor', 'aria-hidden': true }, cursorCharacter)
      : null,
  )
}
