"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6GqhEFZrHBelYzTlpbMeWAPaiHujOp.png",
    alt: "Superman profile",
    title: "The Man of Steel",
    description: "Superman, the iconic hero known for his unwavering determination and strength."
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-z2pFcBM3G4P8gw14pyEyiFw8Sx1IxC.png",
    alt: "Superman using heat vision",
    title: "Heat Vision",
    description: "One of Superman's most powerful abilities, his heat vision can melt steel and defeat the strongest foes."
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ckz5opY1NTzgpYLQEGAeQtQEsW5OFD.png",
    alt: "Modern Superman",
    title: "The Modern Hero",
    description: "A contemporary take on Superman, showcasing his enduring legacy and relevance in today's world."
  }
]

const SupermanShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-red-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-8 text-center">
        IronMan :The genius the playboy , the billionaire
      </h1>
      
      <div className="relative w-full max-w-4xl aspect-[3/4] md:aspect-[16/9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={prevImage} className="bg-black bg-opacity-50 text-white hover:bg-opacity-75">
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button variant="ghost" size="icon" onClick={nextImage} className="bg-black bg-opacity-50 text-white hover:bg-opacity-75">
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </div>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {images[currentIndex].title}
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl">
          {images[currentIndex].description}
        </p>
      </motion.div>

      <div className="mt-8 flex space-x-2">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-yellow-400' : 'bg-gray-600'
            }`}
            animate={{ scale: index === currentIndex ? 1.2 : 1 }}
          />
        ))}
      </div>
    </div>
  )
}

export default SupermanShowcase