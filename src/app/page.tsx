"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Zap, Star, Moon, Sun, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const FloatingHero = ({ delay, icon: Icon, color }) => {
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
      <Icon className={`h-12 w-12 ${color}`} />
    </motion.div>
  )
}

const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Panther,%20Phone%20Wallpapers,%20marvel-SY1ibxX9xfiHw8yk0nRV0YJHy77eZz.jfif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: scrollY * 0.5,
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Black%20Panther%20Theory%20by%20digableteez-TsonXInEGYkOlD8LpaqqsrijFuwlht.jfif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: scrollY * 0.3,
        }}
      />
    </div>
  )
}

const AnimatedSection = ({ children }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 1 }}
      variants={{
        visible: { opacity: 0.8, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
    >
      {children}
    </motion.div>
  )
}

const NavItem = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.button
        className="flex items-center text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {title}
        <ChevronDown className="ml-1 h-4 w-4" />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
          >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.route}
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                  role="menuitem"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Component() {
  const [theme, setTheme] = useState("dark")

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const heroes = [
    { name: "Superman", route: "nav/heroes/super-man" },
    { name: "Batman", route: "nav/heroes/bat-man" },
    { name: "Spider-Man", route: "nav/heroes/spider-man" },
    { name: "Iron Man", route: "nav/heroes/iron-man" },
  ]

  const villains = [
    { name: "Joker", route: "/villains/joker" },
    { name: "Lex Luthor", route: "/villains/lex-luthor" },
    { name: "Venom", route: "/villains/venom" },
    { name: "Thanos", route: "/villains/thanos" },
  ]

  const universes = [
    { name: "Marvel", route: "/universes/marvel" },
    { name: "DC", route: "/universes/dc" },
    { name: "Disney", route: "/universes/disney" },
  ]

  return (
    <div className={`flex flex-col min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <ParallaxBackground />
      <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 z-50 backdrop-blur-md bg-opacity-80 border-b border-gray-700">
        <motion.a
          className="flex items-center justify-center"
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Shield className="h-6 w-6 text-purple-500" />
          <span className="ml-2 text-lg font-bold">Superhero Universe</span>
        </motion.a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <NavItem title="Heroes" items={heroes} />
          <NavItem title="Villains" items={villains} />
          <NavItem title="Universes" items={universes} />
        </nav>
        <motion.button
          className="ml-4 p-2 rounded-full bg-gray-800 text-yellow-400"
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </motion.button>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Welcome to the Superhero Universe
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl lg:text-2xl">
                  Explore the epic worlds of Marvel and DC. Unleash your inner hero.
                </p>
              </motion.div>
              <motion.div
                className="w-full max-w-sm space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-gray-800 text-lg border-purple-500 text-white placeholder-gray-400"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="bg-purple-600 text-lg text-white hover:bg-purple-700" type="submit">
                    Join the League
                  </Button>
                </form>
                <p className="text-lg text-gray-400">
                  Sign up for exclusive superhero content.
                  <a className="underline underline-offset-2 text-purple-400 hover:text-purple-300" href="#">
                    Terms & Conditions
                  </a>
                </p>
              </motion.div>
            </div>
          </div>
         {[...Array(10)].map((_, i) => (
            <FloatingHero
              key={i}
              delay={i * 2}
              icon={i % 2 === 0 ? Shield : Zap}
              color={i % 2 === 0 ? "text-purple-500" : "text-yellow-500"}
            />
          ))} 
          
        </section>
        <AnimatedSection>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 items-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Hero: Black Panther</h2>
                  <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Discover the power and legacy of Wakanda's protector, T'Challa.
                  </p>
                  <Button className="bg-purple-600 text-white hover:bg-purple-700 mt-4" variant="default">
                    Explore Black Panther
                  </Button>
                </div>
                <div className="relative h-[400px] w-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Panther,%20Phone%20Wallpapers,%20marvel-SY1ibxX9xfiHw8yk0nRV0YJHy77eZz.jfif"
                    alt="Black Panther"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                <motion.div className="space-y-2" whileHover={{ scale: 1.05 }}>
                  <Shield className="h-12 w-12 text-purple-500" />
                  <h3 className="text-2xl font-bold">Marvel Universe</h3>
                  <p className="text-gray-400">Explore the vast Marvel multiverse and its legendary heroes.</p>
                </motion.div>
                <motion.div className="space-y-2" whileHover={{ scale: 1.05 }}>
                  <Zap className="h-12 w-12 text-yellow-500" />
                  <h3 className="text-2xl font-bold">DC Universe</h3>
                  <p className="text-gray-400">Dive into the DC universe and discover iconic superheroes.</p>
                </motion.div>
                <motion.div className="space-y-2" whileHover={{ scale: 1.05 }}>
                  <Star className="h-12 w-12 text-blue-500" />
                  <h3 className="text-2xl font-bold">Crossover Events</h3>
                  <p className="text-gray-400">Experience epic crossovers between Marvel and DC universes.</p>
                </motion.div>
              </div>
            </div>
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Join the Superhero Community
                  </h2>
                  <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Get exclusive updates, behind-the-scenes content, and early access to new releases.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex  flex-col sm:flex-row gap-2">
                    <Input
                      className="max-w-lg flex-1 bg-gray-700 border-purple-500 text-white placeholder-gray-400"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Button className="bg-purple-600 text-white hover:bg-purple-700" type="submit">
                      Subscribe
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>
      <footer className="w-full py-6 bg-gray-800 border-t border-gray-700">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 sm:flex-row items-center justify-between">
            <p className="text-xs text-gray-400">© 2024 Superhero Universe. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6">
              <a className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-purple-400" href="#">
                Privacy Policy
              </a>
              <a className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-purple-400" href="#">
                Terms of Service
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}