/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const cardGLB = './assets/lanyard/card.glb'

type LanyardCardProps = {
  portrait: string
  logo: string
  cameraDistance?: number
}

type CardModel = {
  nodes: {
    card: THREE.Mesh
    clip: THREE.Mesh
    clamp: THREE.Mesh
  }
  materials: {
    base: THREE.MeshStandardMaterial
    metal: THREE.MeshStandardMaterial
  }
}

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 }

export function LanyardCard({ portrait, logo, cameraDistance = 41 }: LanyardCardProps) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return (
    <div className="lanyard-wrapper" aria-label="邱宇的可拖拽三维身份牌">
      <Canvas
        camera={{ position: [0, 0, cameraDistance], fov: 20 }}
        dpr={[1, isMobile ? 1.25 : 1.6]}
        gl={{ alpha: true, antialias: !isMobile, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
      >
        <ambientLight intensity={2.7} />
        <directionalLight intensity={2.4} position={[5, 8, 10]} />
        <directionalLight intensity={1.2} position={[-6, -3, 6]} />
        <LanyardScene portrait={portrait} logo={logo} isMobile={isMobile} />
      </Canvas>
      <p className="lanyard-wrapper__hint">DRAG THE CARD · 拖动身份牌</p>
    </div>
  )
}

function LanyardScene({ portrait, logo, isMobile }: LanyardCardProps & { isMobile: boolean }) {
  const group = useRef<THREE.Group>(null!)
  const ropeSegments = useRef<Array<THREE.Mesh | null>>([])
  const velocity = useRef(new THREE.Vector3())
  const position = useRef(new THREE.Vector3(isMobile ? 0 : 1.2, -0.8, 0))
  const dragOffset = useRef<THREE.Vector3 | null>(null)
  const dragTarget = useRef(new THREE.Vector3())
  const pointerWorld = useRef(new THREE.Vector3())
  const rayDirection = useRef(new THREE.Vector3())
  const [dragged, setDragged] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { nodes, materials } = useGLTF(cardGLB) as unknown as CardModel
  const [cardImages, setCardImages] = useState<{ portrait: HTMLImageElement; logo: HTMLImageElement } | null>(null)

  useEffect(() => {
    let cancelled = false
    const loadImage = (source: string) => new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()
      image.decoding = 'async'
      image.onload = () => resolve(image)
      image.onerror = reject
      image.src = source
    })
    Promise.all([loadImage(portrait), loadImage(logo)]).then(([portraitImage, logoImage]) => {
      if (!cancelled) setCardImages({ portrait: portraitImage, logo: logoImage })
    }).catch(() => undefined)
    return () => { cancelled = true }
  }, [logo, portrait])

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map
    const baseImage = baseMap?.image as CanvasImageSource & { width: number; height: number }
    const portraitImage = cardImages?.portrait as CanvasImageSource & { width: number; height: number }
    const logoImage = cardImages?.logo as CanvasImageSource & { width: number; height: number }
    if (!baseMap || !baseImage || !portraitImage || !logoImage) return baseMap

    const width = baseImage.width
    const height = baseImage.height
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    if (!context) return baseMap
    context.drawImage(baseImage, 0, 0, width, height)

    const front = {
      x: FRONT_UV_RECT.x * width,
      y: FRONT_UV_RECT.y * height,
      w: FRONT_UV_RECT.w * width,
      h: FRONT_UV_RECT.h * height,
    }
    const unit = front.w / 100

    const drawCover = (image: typeof portraitImage, rect: { x: number; y: number; w: number; h: number }) => {
      const scale = Math.max(rect.w / image.width, rect.h / image.height)
      const drawWidth = image.width * scale
      const drawHeight = image.height * scale
      context.save()
      context.beginPath()
      context.roundRect(rect.x, rect.y, rect.w, rect.h, 3.2 * unit)
      context.clip()
      context.drawImage(image, rect.x + (rect.w - drawWidth) / 2, rect.y + (rect.h - drawHeight) * 0.2, drawWidth, drawHeight)
      context.restore()
    }

    context.fillStyle = '#f5f3ed'
    context.fillRect(front.x, front.y, front.w, front.h)
    context.fillStyle = '#171b1d'
    context.beginPath()
    context.arc(front.x + 12 * unit, front.y + 11.5 * unit, 6.8 * unit, 0, Math.PI * 2)
    context.fill()
    context.drawImage(logoImage, front.x + 8.1 * unit, front.y + 7.6 * unit, 7.8 * unit, 7.8 * unit)

    context.fillStyle = '#171b1d'
    context.font = `700 ${4.4 * unit}px Manrope, sans-serif`
    context.fillText('QIU YU', front.x + 21 * unit, front.y + 10.8 * unit)
    context.fillStyle = '#657075'
    context.font = `600 ${2.15 * unit}px Manrope, sans-serif`
    context.fillText('PRODUCT DESIGN', front.x + 21 * unit, front.y + 15.1 * unit)

    drawCover(portraitImage, {
      x: front.x + 5.5 * unit,
      y: front.y + 21 * unit,
      w: front.w - 11 * unit,
      h: front.h - 41 * unit,
    })

    context.fillStyle = '#171b1d'
    context.font = `700 ${6.4 * unit}px sans-serif`
    context.fillText('邱宇', front.x + 6 * unit, front.y + front.h - 10.5 * unit)
    context.textAlign = 'right'
    context.font = `600 ${2.6 * unit}px sans-serif`
    context.fillText('UI / UX 设计师', front.x + front.w - 6 * unit, front.y + front.h - 11.1 * unit)
    context.textAlign = 'left'
    context.fillStyle = '#647075'
    context.font = `600 ${2.15 * unit}px Manrope, sans-serif`
    context.fillText('6 YEARS · HUIZHOU', front.x + 6 * unit, front.y + front.h - 5.5 * unit)

    const composite = new THREE.CanvasTexture(canvas)
    composite.colorSpace = THREE.SRGBColorSpace
    composite.flipY = baseMap.flipY
    composite.anisotropy = 8
    composite.needsUpdate = true
    return composite
  }, [cardImages, materials.base.map])

  const ropeNodeCount = 16
  const cardScale = isMobile ? 5.45 : 6.2
  // The GLB clip ring tops out at local y 1.229. Connecting here prevents
  // the cord from appearing to pierce the card body during a drag.
  const attachOffset = cardScale * 1.225
  const ropeLength = isMobile ? 3.3 : 3.25
  const ropeSegmentLength = ropeLength / (ropeNodeCount - 1)
  const ropeAnchor = useMemo(() => new THREE.Vector3(0, isMobile ? 8.6 : 9, -0.32), [isMobile])
  const ropePoints = useMemo(() => {
    const restPosition = new THREE.Vector3(isMobile ? 0 : 1.1, -0.9 + attachOffset, -0.32)
    return Array.from({ length: ropeNodeCount }, (_, index) =>
      ropeAnchor.clone().lerp(restPosition, index / (ropeNodeCount - 1)),
    )
  }, [attachOffset, isMobile, ropeAnchor])
  const ropePrevious = useMemo(() => ropePoints.map(point => point.clone()), [ropePoints])
  const ropeDirection = useMemo(() => new THREE.Vector3(), [])
  const ropeMidpoint = useMemo(() => new THREE.Vector3(), [])
  const ropeCorrection = useMemo(() => new THREE.Vector3(), [])
  const ropeVelocity = useMemo(() => new THREE.Vector3(), [])
  const cardAttachment = useMemo(() => new THREE.Vector3(), [])
  const attachmentOffsetVector = useMemo(() => new THREE.Vector3(), [])
  const verticalAxis = useMemo(() => new THREE.Vector3(0, 1, 0), [])

  useEffect(() => {
    if (!hovered) return
    document.body.style.cursor = dragged ? 'grabbing' : 'grab'
    return () => { document.body.style.cursor = 'auto' }
  }, [dragged, hovered])

  useFrame((state, delta) => {
    const frameDelta = Math.min(delta, 1 / 30)
    if (dragOffset.current) {
      pointerWorld.current.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      rayDirection.current.copy(pointerWorld.current).sub(state.camera.position).normalize()
      pointerWorld.current.add(rayDirection.current.multiplyScalar(-pointerWorld.current.z / rayDirection.current.z))
      dragTarget.current.copy(pointerWorld.current).sub(dragOffset.current)
      attachmentOffsetVector.set(0, attachOffset, -0.32)
      cardAttachment.copy(dragTarget.current).add(attachmentOffsetVector)
      ropeDirection.copy(cardAttachment).sub(ropeAnchor)
      if (ropeDirection.length() > ropeLength) {
        cardAttachment.copy(ropeAnchor).add(ropeDirection.setLength(ropeLength))
        dragTarget.current.copy(cardAttachment).sub(attachmentOffsetVector)
      }
      position.current.lerp(dragTarget.current, 1 - Math.exp(-18 * frameDelta))
      velocity.current.multiplyScalar(0.72)
    } else {
      const rest = new THREE.Vector3(isMobile ? 0 : 1.1, -0.9, 0)
      const spring = rest.sub(position.current).multiplyScalar(17)
      velocity.current.addScaledVector(spring, frameDelta)
      velocity.current.multiplyScalar(Math.exp(-4.2 * frameDelta))
      position.current.addScaledVector(velocity.current, frameDelta)
    }

    group.current.position.copy(position.current)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -velocity.current.x * 0.05, 0.08)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, velocity.current.y * 0.025, 0.08)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, velocity.current.x * 0.018, 0.08)

    attachmentOffsetVector.set(0, attachOffset, 0).applyQuaternion(group.current.quaternion)
    cardAttachment.copy(position.current).add(attachmentOffsetVector)
    cardAttachment.z = -0.32

    for (let index = 1; index < ropeNodeCount - 1; index += 1) {
      const point = ropePoints[index]
      const previous = ropePrevious[index]
      ropeVelocity.copy(point).sub(previous).multiplyScalar(0.94)
      previous.copy(point)
      point.add(ropeVelocity)
      point.y -= 1.25 * frameDelta * frameDelta
    }

    ropePoints[0].copy(ropeAnchor)
    ropePoints[ropeNodeCount - 1].copy(cardAttachment)
    for (let iteration = 0; iteration < 8; iteration += 1) {
      ropePoints[0].copy(ropeAnchor)
      ropePoints[ropeNodeCount - 1].copy(cardAttachment)
      for (let index = 0; index < ropeNodeCount - 1; index += 1) {
        const start = ropePoints[index]
        const end = ropePoints[index + 1]
        ropeCorrection.copy(end).sub(start)
        const distance = Math.max(ropeCorrection.length(), 0.0001)
        ropeCorrection.multiplyScalar((distance - ropeSegmentLength) / distance)
        if (index === 0) {
          end.sub(ropeCorrection)
        } else if (index === ropeNodeCount - 2) {
          start.add(ropeCorrection)
        } else {
          start.addScaledVector(ropeCorrection, 0.5)
          end.addScaledVector(ropeCorrection, -0.5)
        }
      }
    }
    ropePoints[0].copy(ropeAnchor)
    ropePoints[ropeNodeCount - 1].copy(cardAttachment)

    ropeSegments.current.forEach((segment, index) => {
      if (!segment) return
      const start = ropePoints[index]
      const end = ropePoints[index + 1]
      ropeDirection.copy(end).sub(start)
      const length = ropeDirection.length()
      ropeMidpoint.copy(start).add(end).multiplyScalar(0.5)
      segment.position.copy(ropeMidpoint)
      segment.quaternion.setFromUnitVectors(verticalAxis, ropeDirection.normalize())
      segment.scale.set(1, length, 1)
    })
  })

  const releasePointer = (event: ThreeEvent<PointerEvent>) => {
    ;(event.target as Element).releasePointerCapture?.(event.pointerId)
    dragOffset.current = null
    setDragged(false)
  }

  return (
    <>
      <group
        ref={group}
        scale={cardScale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerUp={releasePointer}
        onPointerDown={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation()
          ;(event.target as Element).setPointerCapture?.(event.pointerId)
          dragOffset.current = event.point.clone().sub(position.current)
          setDragged(true)
        }}
      >
        <mesh geometry={nodes.card.geometry}>
          <meshStandardMaterial map={cardMap} roughness={0.72} metalness={0.12} />
        </mesh>
        <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.28} />
        <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
      </group>
      {Array.from({ length: ropeNodeCount - 1 }, (_, index) => (
        <mesh key={index} ref={node => { ropeSegments.current[index] = node }}>
          <cylinderGeometry args={[0.055, 0.055, 1, 10]} />
          <meshStandardMaterial color="#171c1f" roughness={0.82} />
        </mesh>
      ))}
    </>
  )
}

useGLTF.preload(cardGLB)
