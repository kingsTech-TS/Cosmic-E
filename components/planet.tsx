"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

export function Planet() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 2.5
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create planet geometry
    const geometry = new THREE.SphereGeometry(1, 64, 64)

    // Create a gradient material with purple/blue tones
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext("2d")
    if (ctx) {
      const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
      gradient.addColorStop(0, "#6d28d9") // Purple
      gradient.addColorStop(0.5, "#1e40af") // Deep blue
      gradient.addColorStop(1, "#0c1929") // Very dark blue
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 512, 512)

      // Add some noise/clouds
      ctx.fillStyle = "rgba(148, 163, 184, 0.1)"
      for (let i = 0; i < 100; i++) {
        ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 50, Math.random() * 50)
      }
    }

    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.3,
      shininess: 10,
    })

    const planet = new THREE.Mesh(geometry, material)
    scene.add(planet)

    // Lighting
    const light = new THREE.PointLight(0xa78bfa, 2, 100)
    light.position.set(5, 5, 5)
    scene.add(light)

    const ambientLight = new THREE.AmbientLight(0x3b82f6, 0.5)
    scene.add(ambientLight)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      planet.rotation.x += 0.001
      planet.rotation.y += 0.002
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
