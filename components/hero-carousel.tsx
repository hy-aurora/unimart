"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const carouselItems = [
  {
    id: 1,
    title: "Quality School Uniforms for Every Student",
    description: "Find the perfect fit with our extensive range of school uniforms designed for comfort and durability.",
    image: "/images/quality.jpg",
    cta: { text: "Shop Now", link: "/catalog" },
    color: "from-blue-900/70 to-indigo-900/90",
  },
  {
    id: 2,
    title: "Custom Sizing and School-Specific Collections",
    description: "Get uniforms tailored to your exact measurements with school-approved designs.",
    image: "/images/sizing.jpg",
    cta: { text: "Learn More", link: "/size-guide" },
    color: "from-indigo-900/70 to-purple-900/90",
  },
  {
    id: 3,
    title: "Fast Delivery to Your Doorstep",
    description: "Order online and have your uniforms delivered directly to your home or school.",
    image: "/images/fast.jpg",
    cta: { text: "How It Works", link: "/delivery" },
    color: "from-purple-900/70 to-indigo-900/90",
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left

  const goToSlide = (index: number) => {
    setAutoplay(false)
    setCurrent(index)
    // Restart autoplay after user interaction
    setTimeout(() => setAutoplay(true), 5000)
  }

  const nextSlide = () => {
    setDirection(1)
    if (current === carouselItems.length - 1) {
      setCurrent(0)
    } else {
      setCurrent(current + 1)
    }
  }

  const prevSlide = () => {
    setDirection(-1)
    if (current === 0) {
      setCurrent(carouselItems.length - 1)
    } else {
      setCurrent(current - 1)
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (autoplay) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
        setDirection(1)
      }, 6000)
    }

    return () => clearInterval(interval)
  }, [autoplay])

  const transitionSettings = {
    duration: 0.8,
    ease: [0.4, 0.0, 0.2, 1],
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { ...transitionSettings },
        opacity: { duration: 0.5, ease: "easeOut" }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { ...transitionSettings },
        opacity: { duration: 0.3, ease: "easeIn" }
      }
    }),
  }

  return (
    <div className="relative h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-indigo-50/50"></div>
      {/* Replace missing grid pattern with CSS-based pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
      
      {/* Main Carousel */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ willChange: "transform, opacity" }} /* Performance optimization */
          className="absolute inset-0"
        >
          <div className="absolute inset-0 z-10 backdrop-blur-[2px] bg-black/10"></div>
          <div className="absolute inset-0">
            <Image
              src={carouselItems[current].image}
              alt={carouselItems[current].title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              loading="eager"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${carouselItems[current].color} opacity-75`}></div>
          </div>
          
          <div className="container relative z-20 h-full mx-auto px-4 md:px-6 flex items-center">
            <div className="max-w-3xl text-white">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full mb-4 shadow-sm"
              >
                UniMart School Uniforms
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white drop-shadow-sm"
              >
                {carouselItems[current].title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg md:text-xl opacity-95 mb-8 max-w-2xl drop-shadow-sm"
              >
                {carouselItems[current].description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-indigo-900 hover:bg-indigo-100 px-8 py-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link href={carouselItems[current].cta.link}>
                    {carouselItems[current].cta.text}
                  </Link>
                </Button>
                
                <div className="relative w-full sm:w-64 md:w-80">
                  <Input 
                    placeholder="Search your school..." 
                    className="pl-10 py-6 bg-white/15 backdrop-blur-md border-white/30 text-white placeholder:text-white/80 shadow-sm focus:bg-white/20 transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/80" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons - Enhanced */}
      <button
        onClick={() => {
          setAutoplay(false)
          prevSlide()
          setTimeout(() => setAutoplay(true), 5000)
        }}
        className="absolute left-4 md:left-8 top-1/2 z-30 -translate-y-1/2 p-3 rounded-full bg-white/25 backdrop-blur-md hover:bg-white/40 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white drop-shadow-sm" />
      </button>
      
      <button
        onClick={() => {
          setAutoplay(false)
          nextSlide()
          setTimeout(() => setAutoplay(true), 5000)
        }}
        className="absolute right-4 md:right-8 top-1/2 z-30 -translate-y-1/2 p-3 rounded-full bg-white/25 backdrop-blur-md hover:bg-white/40 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white drop-shadow-sm" />
      </button>

      {/* Indicator Dots - Enhanced */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 shadow-md ${
              index === current
                ? "bg-white w-10 h-3"
                : "bg-white/40 hover:bg-white/60 w-3 h-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === current ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}

