'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function SpiderWebBackground({ scroll }) {
  const groupRef = useRef()
  const [paths, setPaths] = useState([])

  useEffect(() => {
    const loader = new SVGLoader()
    loader.load('/placeholder.svg', (data) => {
      const paths = data.paths.map((path) => {
        const material = new THREE.MeshBasicMaterial({
          color: path.color,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
        const shapes = path.toShapes(true)
        return shapes.map((shape) => {
          const geometry = new THREE.ShapeGeometry(shape)
          return new THREE.Mesh(geometry, material)
        })
      }).flat()
      setPaths(paths)
    })
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scroll.current * 0.2
      groupRef.current.position.z = -scroll.current * 10
    }
  })

  return (
    <group ref={groupRef}>
      {paths.map((path, i) => (
        <primitive key={i} object={path} />
      ))}
    </group>
  )
}

function SpiderMask({ scroll }) {
  const texture = useTexture('/placeholder.svg')
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = scroll.current * 0.5
      meshRef.current.position.y = Math.sin(scroll.current) * 2
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  )
}

export default function SpidermanFanSite() {
  const scrollRef = useRef(0)
  const [showBio, setShowBio] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-blue-900">
      <div className="fixed inset-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SpiderWebBackground scroll={scrollRef} />
          <SpiderMask scroll={scrollRef} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      
      <div className="relative z-10">
        <header className="flex items-center justify-between p-6 text-white">
          <h1 className="text-4xl font-bold">Spider-Man Fan Site</h1>
          <nav>
            <Button variant="outline" className="mr-2">Home</Button>
            <Button variant="outline" className="mr-2">Gallery</Button>
            <Button variant="outline">Contact</Button>
          </nav>
        </header>

        <main className="container mx-auto mt-12 p-6">
          <section className="mb-12">
            <Card className="bg-white bg-opacity-80">
              <CardHeader>
                <CardTitle>Welcome Spider-Fans!</CardTitle>
                <CardDescription>Swing into the amazing world of your friendly neighborhood Spider-Man</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Explore the web-slinging adventures, learn about Spider-Man's greatest foes, and discover the man behind the mask!</p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <Tabs defaultValue="powers" className="bg-white bg-opacity-80 p-6 rounded-lg">
              <TabsList>
                <TabsTrigger value="powers">Powers</TabsTrigger>
                <TabsTrigger value="villains">Villains</TabsTrigger>
                <TabsTrigger value="allies">Allies</TabsTrigger>
              </TabsList>
              <TabsContent value="powers">
                <h3 className="text-2xl font-bold mb-4">Spider-Man's Powers</h3>
                <ul className="list-disc pl-6">
                  <li>Superhuman strength, speed, and agility</li>
                  <li>Wall-crawling ability</li>
                  <li>Spider-sense</li>
                  <li>Web-shooting (mechanical web-shooters)</li>
                </ul>
              </TabsContent>
              <TabsContent value="villains">
                <h3 className="text-2xl font-bold mb-4">Spider-Man's Villains</h3>
                <ul className="list-disc pl-6">
                  <li>Green Goblin</li>
                  <li>Doctor Octopus</li>
                  <li>Venom</li>
                  <li>Mysterio</li>
                </ul>
              </TabsContent>
              <TabsContent value="allies">
                <h3 className="text-2xl font-bold mb-4">Spider-Man's Allies</h3>
                <ul className="list-disc pl-6">
                  <li>Mary Jane Watson</li>
                  <li>Aunt May</li>
                  <li>Harry Osborn</li>
                  <li>The Avengers</li>
                </ul>
              </TabsContent>
            </Tabs>
          </section>

          <section className="mb-12">
            <Card className="bg-white bg-opacity-80">
              <CardHeader>
                <CardTitle>Peter Parker's Biography</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setShowBio(!showBio)}>
                  {showBio ? 'Hide Bio' : 'Show Bio'}
                </Button>
                {showBio && (
                  <p className="mt-4">
                    Peter Parker, a brilliant but socially awkward high school student, gained spider-like abilities after being bitten by a radioactive spider. Motivated by personal tragedy, he chose to use his powers for good, becoming the amazing Spider-Man!
                  </p>
                )}
              </CardContent>
            </Card>
          </section>
        </main>

        <footer className="bg-black bg-opacity-50 p-6 text-white text-center">
          <p>&copy; 2024 Spider-Man Fan Site. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}