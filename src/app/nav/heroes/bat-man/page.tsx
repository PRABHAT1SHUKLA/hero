"use client"

import React, { useState, useEffect } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Moon, Sun, Bird, Shield } from 'lucide-react'

const FloatingBird = ({ delay }) => {
  return (
    <motion.div
      className="absolute"
      initial={{ y: -20, x: Math.random() * 100 - 50, opacity: 0 }}
      animate={{
        y: ["0%", "100%"],
        x: ["-50%", "50%", "-50%"],
        opacity: [0, 1, 0],
        rotate: [0, 360],
      }}
      transition={{
        y: { duration: 20, repeat: Infinity, ease: "linear", delay },
        x: { duration: 15, repeat: Infinity, ease: "easeInOut", delay },
        opacity: { duration: 20, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 30, repeat: Infinity, ease: "linear", delay },
      }}
    >
      <Bird className="h-8 w-8 text-yellow-500" />
    </motion.div>
  )
}

const AnimatedText = ({ children }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.span>
  )
}

const ParallaxBackground = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <motion.div
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nYJnodB9HfftnTdOvRvbMqIj9hP0Fg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        y
      }}
    />
  )
}

export default function BatmanUniverse() {
  const [theme, setTheme] = useState('dark')
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 200])
  const y2 = useTransform(scrollY, [0, 300], [0, -200])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <ParallaxBackground />

      <header className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 h-14 flex items-center backdrop-blur-md bg-opacity-30 border-b border-gray-700">
        <motion.a
          className="flex items-center justify-center"
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Shield className="h-6 w-6 text-yellow-500" />
          <span className="ml-2 text-lg font-bold">Batman Universe</span>
        </motion.a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <motion.a
            className="text-sm font-medium hover:text-yellow-400 transition-colors"
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Gotham
          </motion.a>
          <motion.a
            className="text-sm font-medium hover:text-yellow-400 transition-colors"
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Villains
          </motion.a>
          <motion.a
            className="text-sm font-medium hover:text-yellow-400 transition-colors"
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Batcave
          </motion.a>
        </nav>
        <motion.button
          className="ml-4 p-2 rounded-full bg-gray-800 text-yellow-400"
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </motion.button>
      </header>

      <main className="relative z-10">
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="container px-4 md:px-6 text-center">
            <motion.h1
              className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatedText>Welcome to the</AnimatedText>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                <AnimatedText>Batman Universe</AnimatedText>
              </span>
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <AnimatedText>
                Dive into the dark and gritty world of Gotham City. Explore the legendary Batman's universe,
                his allies, and the notorious villains that plague the city.
              </AnimatedText>
            </motion.p>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button className="bg-yellow-500 text-gray-900 hover:bg-yellow-600">
                Enter the Batcave
              </Button>
            </motion.div>
          </div>
          {[...Array(5)].map((_, i) => (
            <FloatingBird key={i} delay={i * 2} />
          ))}
        </section>

        <section className="py-20 bg-gray-800 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              y: y1,
            }}
          />
          <div className="container px-4 md:px-6 relative z-10">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Gotham's Dark Knight
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold">The Caped Crusader</h3>
                <p className="text-gray-300">
                  Bruce Wayne, Gotham's billionaire philanthropist, dons the cape and cowl to become Batman,
                  the city's silent guardian and watchful protector.
                </p>
              </motion.div>
              <motion.div
                className="relative h-64 md:h-full"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg transform rotate-3 scale-105" />
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Batman"
                  className="relative z-10 w-full h-full object-cover rounded-lg shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-900 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              y: y2,
            }}
          />
          <div className="container px-4 md:px-6 relative z-10">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Gotham's Rogues Gallery
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {['Joker', 'Catwoman', 'Penguin'].map((villain, index) => (
                <motion.div
                  key={villain}
                  className="bg-gray-800 p-6 rounded-lg shadow-xl"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-2">{villain}</h3>
                  <p className="text-gray-400">
                    A notorious villain in Batman's rogues gallery, causing chaos in Gotham City.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 border-t border-gray-800 py-8 relative z-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Batman Universe. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <Input
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Subscribe to our newsletter"
                type="email"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}