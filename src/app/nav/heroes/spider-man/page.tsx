'use client'

import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function SpiderMask() {
  const gltf = useLoader(GLTFLoader, '/spiderman-mask.glb')
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <primitive
      object={gltf.scene}
      ref={meshRef}
      scale={[0.5, 0.5, 0.5]}
      position={[0, 0, 0]}
    />
  )
}

export default function SpidermanFanPage() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-red-600 to-blue-900">
      <Canvas className="h-full w-full">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <SpiderMask />
        <OrbitControls enableZoom={false} />
      </Canvas>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
        <h1 className="mb-4 text-4xl font-bold text-white">Welcome Spider-Fans!</h1>
        <button
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => setShowInfo(!showInfo)}
        >
          {showInfo ? 'Hide Info' : 'Show Info'}
        </button>
      </div>
      {showInfo && (
        <div className="absolute left-0 right-0 top-0 m-4 rounded bg-white bg-opacity-80 p-4 text-center">
          <h2 className="mb-2 text-2xl font-bold">Spider-Man Facts</h2>
          <ul className="list-inside list-disc text-left">
            <li>Spider-Man's real name is Peter Parker</li>
            <li>He was created by Stan Lee and Steve Ditko in 1962</li>
            <li>His first appearance was in Amazing Fantasy #15</li>
            <li>He has "spider-sense" that warns him of danger</li>
          </ul>
        </div>
      )}
    </div>
  )
}