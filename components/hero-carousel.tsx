"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/placeholder.svg?height=600&width=1200&text=Quality+School+Uniforms",
      title: "Quality School Uniforms",
      description:
        "One-stop shop for all your school uniform needs. Quality products, easy ordering, and fast delivery.",
      cta: "Find Your School",
      ctaLink: "/schools",
      secondaryCta: "Browse Catalog",
      secondaryCtaLink: "/catalog",
    },
    {
      image: "/placeholder.svg?height=600&width=1200&text=Custom+Uniforms",
      title: "Custom Uniforms",
      description: "Get uniforms tailored to your exact measurements for the perfect fit every time.",
      cta: "Custom Sizing",
      ctaLink: "/custom-sizing",
      secondaryCta: "Learn More",
      secondaryCtaLink: "/about",
    },
    {
      image: "/placeholder.svg?height=600&width=1200&text=School+Partnerships",
      title: "School Partnerships",
      description: "We partner with schools to ensure uniform compliance and quality for all students.",
      cta: "Partner With Us",
      ctaLink: "/partner",
      secondaryCta: "View Schools",
      secondaryCtaLink: "/schools",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="container px-4 md:px-6 text-center text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg md:text-xl max-w-[800px] mx-auto mb-8">{slide.description}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                    <Link href={slide.ctaLink}>{slide.cta}</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link href={slide.secondaryCtaLink}>{slide.secondaryCta}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ArrowRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

