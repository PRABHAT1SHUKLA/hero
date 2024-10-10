"use client"

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Text, useGLTF, PerspectiveCamera, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from "@/components/ui/button"

const SupermanLogo = () => {
  const { nodes } = useGLTF("/assets/3d/superman_logo.glb")
  const ref = useRef()

  useFrame((state) => {
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2
  })

  return (
    <group ref={ref} position={[0, 0, -5]} scale={[0.1, 0.1, 0.1]}>
      <mesh geometry={nodes.SupermanLogo.geometry}>
        <meshStandardMaterial color="#FFD700" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

const ParallaxLayer = ({ texture, z, speed }) => {
  const ref = useRef()
  const { scrollYProgress } = useScroll()
  
  useFrame(() => {
    ref.current.position.y = scrollYProgress.get() * speed
  })

  return (
    <mesh ref={ref} position={[0, 0, z]}>
      <planeBufferGeometry args={[16, 9]} />
      <meshBasicMaterial map={texture} transparent opacity={0.8} />
    </mesh>
  )
}

const ParallaxBackground = () => {
  const [metropolis, fortress, space] = useLoader(TextureLoader, [
    '/assets/metropolis.jpg',
    '/assets/fortress_of_solitude.jpg',
    '/assets/space.jpg'
  ])

  return (
    <>
      <ParallaxLayer texture={space} z={-10} speed={0.1} />
      <ParallaxLayer texture={fortress} z={-5} speed={0.5} />
      <ParallaxLayer texture={metropolis} z={-2} speed={1} />
    </>
  )
}

const AnimatedButton = ({ children, ...props }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Button className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-300" {...props}>
      {children}
    </Button>
  </motion.div>
)

const SupermanWebsite = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  return (
    <div ref={containerRef} className="h-[300vh] bg-gradient-to-b from-blue-900 via-blue-600 to-red-600">
      <Canvas className="fixed inset-0" camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ParallaxBackground />
        <SupermanLogo />
      </Canvas>

      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900 bg-opacity-80 backdrop-blur-md">
          <nav className="container mx-auto px-6 py-4">
            <ul className="flex justify-center space-x-8">
              <li><a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300">Home</a></li>
              <li><a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300">About</a></li>
              <li><a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300">Gallery</a></li>
              <li><a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300">Contact</a></li>
            </ul>
          </nav>
        </header>

        <main className="container mx-auto px-6 py-24">
          <motion.section style={{ y, opacity }} className="min-h-screen flex flex-col justify-center items-center text-center">
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-yellow-400 mb-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Superman
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white mb-12 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Discover the legend of the Man of Steel, protector of Earth and last son of Krypton.
            </motion.p>
            <AnimatedButton>Explore His World</AnimatedButton>
          </motion.section>

          <section className="min-h-screen flex flex-col justify-center items-center text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-8">Powers & Abilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['Flight', 'Super Strength', 'Heat Vision', 'X-Ray Vision', 'Super Speed', 'Invulnerability'].map((power, index) => (
                <motion.div 
                  key={power}
                  className="bg-blue-800 bg-opacity-80 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">{power}</h3>
                  <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </motion.div>
              ))}
            </div>
          </section>
        </main>

        <footer className="bg-blue-900 bg-opacity-80 backdrop-blur-md py-6">
          <div className="container mx-auto px-6 text-center text-white">
            <p>&copy; 2024 Superman Fan Site. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default SupermanWebsite