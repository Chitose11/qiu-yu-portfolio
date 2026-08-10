import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import * as THREE from 'three'

type ColorBendsProps = {
  colors: string[]
  className?: string
  speed?: number
  rotation?: number
  scale?: number
  frequency?: number
  warpStrength?: number
  mouseInfluence?: number
  noise?: number
  intensity?: number
}

const MAX_COLORS = 4

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  #define MAX_COLORS ${MAX_COLORS}
  uniform vec2 uCanvas;
  uniform float uTime;
  uniform float uSpeed;
  uniform vec2 uRotation;
  uniform int uColorCount;
  uniform vec3 uColors[MAX_COLORS];
  uniform float uScale;
  uniform float uFrequency;
  uniform float uWarpStrength;
  uniform vec2 uPointer;
  uniform float uMouseInfluence;
  uniform float uNoise;
  uniform float uIntensity;
  varying vec2 vUv;

  void main() {
    float t = uTime * uSpeed;
    vec2 p = vUv * 2.0 - 1.0;
    vec2 rotated = vec2(
      p.x * uRotation.x - p.y * uRotation.y,
      p.x * uRotation.y + p.y * uRotation.x
    );
    vec2 q = vec2(rotated.x * (uCanvas.x / uCanvas.y), rotated.y);
    q /= max(uScale, 0.001);
    q += (uPointer - rotated) * uMouseInfluence * 0.16;
    q += vec2(-4.8, 0.22 * cos(t));

    vec3 color = vec3(0.0);
    float coverage = 0.0;
    vec2 samplePoint = q;

    for (int i = 0; i < MAX_COLORS; i++) {
      if (i >= uColorCount) break;
      samplePoint -= 0.018;
      vec2 ripple = sin(1.35 * (samplePoint.yx * uFrequency) + 1.8 * cos(samplePoint * uFrequency));
      vec2 warped = mix(samplePoint, ripple, clamp(uWarpStrength, 0.0, 1.0));
      float distanceField = length(
        warped + sin(4.4 * warped.y * uFrequency - 2.6 * t + float(i)) / 3.7
      );
      float band = 1.0 - exp(-5.2 / exp(5.2 * distanceField));
      color += uColors[i] * band;
      coverage = max(coverage, band);
    }

    color = clamp(color * uIntensity, 0.0, 1.0);
    float grain = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453);
    color = clamp(color + (grain - 0.5) * uNoise, 0.0, 1.0);
    gl_FragColor = vec4(color * coverage, coverage);
  }
`

function hexToVector(hex: string) {
  const value = hex.replace('#', '').trim()
  const expanded = value.length === 3 ? value.split('').map(character => character + character).join('') : value
  const number = Number.parseInt(expanded, 16)
  return new THREE.Vector3(
    ((number >> 16) & 255) / 255,
    ((number >> 8) & 255) / 255,
    (number & 255) / 255,
  )
}

export function ColorBends({
  colors,
  className = '',
  speed = 0.24,
  rotation = 112,
  scale = 0.82,
  frequency = 1.08,
  warpStrength = 0.94,
  mouseInfluence = 0.7,
  noise = 0.035,
  intensity = 1.12,
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer: THREE.WebGLRenderer | null = null
    let animationFrame = 0
    let sectionVisible = false
    let pageVisible = !document.hidden
    const pointerTarget = new THREE.Vector2(0, 0)
    const pointerCurrent = new THREE.Vector2(0, 0)

    try {
      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      const geometry = new THREE.PlaneGeometry(2, 2)
      const colorVectors = Array.from({ length: MAX_COLORS }, (_, index) =>
        index < colors.length ? hexToVector(colors[index]) : new THREE.Vector3(0, 0, 0),
      )
      const angle = (rotation * Math.PI) / 180
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        premultipliedAlpha: true,
        uniforms: {
          uCanvas: { value: new THREE.Vector2(1, 1) },
          uTime: { value: reduceMotion ? 2.4 : 0 },
          uSpeed: { value: speed },
          uRotation: { value: new THREE.Vector2(Math.cos(angle), Math.sin(angle)) },
          uColorCount: { value: Math.min(colors.length, MAX_COLORS) },
          uColors: { value: colorVectors },
          uScale: { value: scale },
          uFrequency: { value: frequency },
          uWarpStrength: { value: warpStrength },
          uPointer: { value: pointerCurrent },
          uMouseInfluence: { value: mouseInfluence },
          uNoise: { value: noise },
          uIntensity: { value: intensity },
        },
      })
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.setClearColor(0x000000, 0)
      renderer.domElement.setAttribute('aria-hidden', 'true')
      container.appendChild(renderer.domElement)

      const resize = () => {
        const width = Math.max(container.clientWidth, 1)
        const height = Math.max(container.clientHeight, 1)
        renderer?.setSize(width, height, false)
        material.uniforms.uCanvas.value.set(width, height)
        renderer?.render(scene, camera)
      }
      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(container)
      resize()

      const clock = new THREE.Clock()
      const stop = () => {
        if (animationFrame) window.cancelAnimationFrame(animationFrame)
        animationFrame = 0
        clock.stop()
      }
      const frame = () => {
        if (!sectionVisible || !pageVisible || reduceMotion) {
          stop()
          return
        }
        pointerCurrent.lerp(pointerTarget, 0.075)
        material.uniforms.uTime.value += clock.getDelta()
        renderer?.render(scene, camera)
        animationFrame = window.requestAnimationFrame(frame)
      }
      const start = () => {
        if (animationFrame || reduceMotion || !sectionVisible || !pageVisible) return
        clock.start()
        animationFrame = window.requestAnimationFrame(frame)
      }

      const intersectionObserver = new IntersectionObserver(
        entries => {
          sectionVisible = entries.some(entry => entry.isIntersecting)
          if (sectionVisible) start()
          else stop()
        },
        { rootMargin: '20% 0px', threshold: 0.01 },
      )
      intersectionObserver.observe(container)

      const handleVisibility = () => {
        pageVisible = !document.hidden
        if (pageVisible) start()
        else stop()
      }
      document.addEventListener('visibilitychange', handleVisibility)

      const pointerSurface = container.parentElement ?? container
      const handlePointerMove = (event: PointerEvent) => {
        const rect = container.getBoundingClientRect()
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return
        pointerTarget.set(
          ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1,
          -(((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1),
        )
      }
      if (!reduceMotion) pointerSurface.addEventListener('pointermove', handlePointerMove, { passive: true })

      if (reduceMotion) renderer.render(scene, camera)

      return () => {
        stop()
        resizeObserver.disconnect()
        intersectionObserver.disconnect()
        document.removeEventListener('visibilitychange', handleVisibility)
        pointerSurface.removeEventListener('pointermove', handlePointerMove)
        geometry.dispose()
        material.dispose()
        renderer?.dispose()
        renderer?.forceContextLoss()
        renderer?.domElement.remove()
      }
    } catch {
      container.dataset.fallback = 'true'
      renderer?.dispose()
    }
  }, [colors, frequency, intensity, mouseInfluence, noise, reduceMotion, rotation, scale, speed, warpStrength])

  return <div ref={containerRef} className={`color-bends ${className}`.trim()} aria-hidden="true" />
}
