import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

type ImageTrailProps = {
  images: string[]
  threshold?: number
}

type Point = {
  x: number
  y: number
}

const distanceBetween = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y)

export function ImageTrail({ images, threshold = 76 }: ImageTrailProps) {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const imageRefs = useRef<Array<HTMLImageElement | null>>([])
  const currentIndex = useRef(0)
  const lastPoint = useRef<Point | null>(null)
  const layer = useRef(1)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const desktop = window.matchMedia('(min-width: 901px)')
    const updateEnabled = () => setEnabled(finePointer.matches && desktop.matches && !reduceMotion)

    updateEnabled()
    finePointer.addEventListener('change', updateEnabled)
    desktop.addEventListener('change', updateEnabled)

    return () => {
      finePointer.removeEventListener('change', updateEnabled)
      desktop.removeEventListener('change', updateEnabled)
    }
  }, [reduceMotion])

  useEffect(() => {
    const container = containerRef.current

    if (!container || !enabled || images.length === 0) return

    const showNextImage = (point: Point, previous: Point) => {
      const image = imageRefs.current[currentIndex.current % images.length]
      if (!image) return

      const directionX = point.x - previous.x
      const directionY = point.y - previous.y
      const rotation = Math.max(-10, Math.min(10, directionX * 0.075))
      const driftX = Math.max(-32, Math.min(32, directionX * 0.24))
      const driftY = Math.max(-24, Math.min(28, directionY * 0.18))

      image.getAnimations().forEach(animation => animation.cancel())
      image.style.left = `${point.x}px`
      image.style.top = `${point.y}px`
      image.style.zIndex = `${layer.current}`
      image.style.willChange = 'transform, opacity, filter, clip-path'

      const animation = image.animate(
        [
          {
            opacity: 0,
            transform: `translate(-50%, -50%) scale(0.42) rotate(${rotation - 4}deg)`,
            filter: 'blur(10px) saturate(0.7)',
            clipPath: 'inset(42% 0 42% 0 round 16px)',
          },
          {
            opacity: 0.88,
            transform: `translate(-50%, -50%) scale(1.04) rotate(${rotation}deg)`,
            filter: 'blur(0px) saturate(0.92)',
            clipPath: 'inset(0% 0 0% 0 round 16px)',
            offset: 0.2,
          },
          {
            opacity: 0.72,
            transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY - 16}px)) scale(1) rotate(${rotation * 0.65}deg)`,
            filter: 'blur(0px) saturate(0.92)',
            clipPath: 'inset(0% 0 0% 0 round 16px)',
            offset: 0.58,
          },
          {
            opacity: 0,
            transform: `translate(calc(-50% + ${driftX * 1.45}px), calc(-50% + ${driftY - 52}px)) scale(0.82) rotate(${rotation * 0.2}deg)`,
            filter: 'blur(5px) saturate(0.78)',
            clipPath: 'inset(8% 4% 8% 4% round 16px)',
          },
        ],
        {
          duration: 1120,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards',
        },
      )

      animation.addEventListener('finish', () => {
        image.style.willChange = 'auto'
      }, { once: true })

      currentIndex.current = (currentIndex.current + 1) % images.length
      layer.current = layer.current > 200 ? 1 : layer.current + 1
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return

      const bounds = container.getBoundingClientRect()
      const inside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom

      if (!inside) {
        lastPoint.current = null
        return
      }

      const point = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      }

      if (!lastPoint.current) {
        lastPoint.current = point
        return
      }

      if (distanceBetween(point, lastPoint.current) < threshold) return

      showNextImage(point, lastPoint.current)
      lastPoint.current = point
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      imageRefs.current.forEach(image => image?.getAnimations().forEach(animation => animation.cancel()))
    }
  }, [enabled, images, threshold])

  if (!enabled) return null

  return (
    <div className="image-trail" ref={containerRef} aria-hidden="true">
      {images.map((src, index) => (
        <img
          className="image-trail__item"
          src={src}
          alt=""
          draggable="false"
          ref={node => {
            imageRefs.current[index] = node
          }}
          key={`${src}-${index}`}
        />
      ))}
    </div>
  )
}
