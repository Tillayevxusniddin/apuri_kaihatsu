"use client"

import React, { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { getMediaList } from "@/app/[locale]/(dashboard)/(routes)/media/action"
import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import TutorialCard from "@/components/TutorialCard";

interface Tutorial {
  id: number
  title: string
  description: string
  imageUrl: string
  videoId: string
}

const TutorialsCarousel = () => {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0])
  const { data: session } = useSession()
  const i = useTranslations("tutor")

  const {
    data: tutorials = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tutor"],
    queryFn: async () => await getMediaList(session?.sessionToken),
    enabled: !!session?.sessionToken,
  })

  const paginate = useCallback(
    (newDirection: number) => {
      const newIndex = activeIndex + newDirection
      if (newIndex >= 0 && newIndex < tutorials.length) {
        setActiveIndex([newIndex, newDirection])
      }
    },
    [activeIndex, tutorials.length],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        paginate(-1)
      } else if (event.key === "ArrowRight") {
        paginate(1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [paginate])

  if (isLoading) return <p className="text-center text-white text-2xl">{i("loading")}</p>
  if (error) return <p className="text-center text-red-500 text-2xl">Error: {error.message}</p>
  if (tutorials.length === 0) return <p className="text-center text-white text-2xl">No tutorials available.</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-16 px-6 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto relative">
        <h1 className="text-6xl font-bold text-center mb-6 text-foreground">{i("h1title")}</h1>
        <div className="relative mb-8">
          <TutorialCard key={activeIndex} tutorial={tutorials[activeIndex]} isActive={true} direction={direction} />
        </div>
        <div className="flex items-center justify-center gap-6">
          <Button
            onClick={() => paginate(-1)}
            disabled={activeIndex === 0}
            className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            onClick={() => paginate(1)}
            disabled={activeIndex === tutorials.length - 1}
            className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <ChevronRight size={28} />
          </Button>
        </div>
        <div className="mt-8 flex justify-center items-center">
          {tutorials.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${index === activeIndex ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TutorialsCarousel



