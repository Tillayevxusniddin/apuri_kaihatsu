// "use client"
// import type React from "react"
// import { useState, useEffect } from "react"
// import { motion, AnimatePresence, useAnimation } from "framer-motion"
// import { ChevronLeft, ChevronRight, Play } from "lucide-react"
// import { useTranslations } from "next-intl"
// import { Button } from "@/components/ui/button"
// import YouTubeEmbed from "@/components/YouTubeEmbed"
// import { cn } from "@/lib/utils"
// import { getMediaList } from "@/app/[locale]/(dashboard)/(routes)/media/action"
// import { toast } from "@/components/ui/use-toast"
// import { useSession } from "next-auth/react"
// import LightGallery from "lightgallery/react"
//
// // Import styles and plugins (optional)
// import "lightgallery/css/lightgallery.css"
// import "lightgallery/css/lg-thumbnail.css"
// import "lightgallery/css/lg-zoom.css"
// import lgThumbnail from "lightgallery/plugins/thumbnail"
// import lgZoom from "lightgallery/plugins/zoom"
//
// interface Tutorial {
//   id: number
//   title: string
//   description: string
//   imageUrl: string
//   videoId: string
// }
//
// interface TutorialCardProps {
//   tutorial: Tutorial
//   isActive: boolean
//   direction: number
//   onOpenModal: () => void
//   images: string
// }
//
// const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, isActive, direction, onOpenModal, images }) => {
//   const controls = useAnimation()
//
//   useEffect(() => {
//     if (isActive) {
//       controls.start({ opacity: 1, scale: 1, x: 0 })
//     }
//   }, [isActive, controls])
//
//   const imagesArray: string[] = images.split(",")
//
//   return (
//     <motion.div
//       className={cn("absolute top-0 left-0 right-0 w-[90%] h-full mx-auto", isActive ? "z-20" : "z-10")}
//       initial={{ opacity: 0, scale: 0.8, x: direction > 0 ? 1000 : -1000 }}
//       animate={controls}
//       exit={{ opacity: 0, scale: 0.8, x: direction < 0 ? 1000 : -1000 }}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//     >
//       <div className="w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-card to-background shadow-xl">
//         <div className="relative h-full">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10 rounded-3xl" />
//           <div className="absolute inset-0 z-20 px-5 sm:px-12 py-8 sm:py-16 flex flex-col justify-between">
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
//               <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{tutorial.title}</h2>
//               <LightGallery
//                 speed={500}
//                 plugins={[lgThumbnail, lgZoom]}
//                 elementClassNames={`grid ${
//                   imagesArray.length === 1
//                     ? "grid-cols-1"
//                     : imagesArray.length > 2
//                       ? "grid-cols-1 sm:grid-cols-3"
//                       : "grid-cols-1 sm:grid-cols-2"
//                 } gap-5 w-full`}
//               >
//                 {imagesArray.map((item: string, index: number) => (
//                   <a href={item || "/placeholder.svg"} key={index}>
//                     <img
//                       src={item || "/placeholder.svg"}
//                       alt={tutorial.title}
//                       className={`w-full ${
//                         imagesArray.length > 2 ? "h-[300px]" : "h-[400px]"
//                       } object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105`}
//                     />
//                   </a>
//                 ))}
//               </LightGallery>
//             </motion.div>
//
//             <motion.div
//               className="bg-card/80 backdrop-blur-md rounded-xl p-6 flex items-center justify-between shadow-md mt-6"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <p className="text-card-foreground text-sm sm:text-base leading-relaxed flex-1 mr-6">
//                 {tutorial.description}
//               </p>
//               <motion.button
//                 className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg transition-colors duration-300"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={onOpenModal}
//               >
//                 <Play size={24} />
//               </motion.button>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   )
// }
//
// interface ModalProps {
//   isOpen: boolean
//   onClose: () => void
//   videoUrl: string
// }
//
// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, videoUrl }) => (
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9 }}
//           animate={{ scale: 1 }}
//           exit={{ scale: 0.9 }}
//           className="bg-card rounded-lg p-6 w-full max-w-4xl h-[500px] shadow-2xl relative overflow-hidden"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <YouTubeEmbed videoId={videoUrl} />
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// )
//
// const TutorialsCarousel = () => {
//   const [[activeIndex, direction], setActiveIndex] = useState([0, 0])
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [tutorials, setMediaList] = useState<any[]>([])
//   const { data: session } = useSession()
//   const i = useTranslations("tutor")
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//
//   const fetchMediaList = async () => {
//     try {
//       setIsLoading(true)
//       setError(null)
//       const media = await getMediaList(session?.sessionToken)
//       setMediaList(media)
//     } catch (error: any) {
//       setError(error.message || "An error occurred while fetching the media list.")
//       toast({
//         title: "Error",
//         description: error.message || "An error occurred while fetching the media list.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }
//
//   useEffect(() => {
//     if (session?.sessionToken) fetchMediaList()
//   }, [session])
//
//   const paginate = (newDirection: any) => {
//     const newIndex = activeIndex + newDirection
//     if (newIndex >= 0 && newIndex < tutorials.length) {
//       setActiveIndex([newIndex, newDirection])
//     }
//   }
//
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "ArrowLeft") {
//         paginate(-1)
//       } else if (event.key === "ArrowRight") {
//         paginate(1)
//       }
//     }
//
//     window.addEventListener("keydown", handleKeyDown)
//     return () => window.removeEventListener("keydown", handleKeyDown)
//   }, [])
//
//   if (isLoading) return <p className="text-center text-white text-2xl">{i("loading")}</p>
//   if (error) return <p className="text-center text-red-500 text-2xl">Error: {error}</p>
//   if (!tutorials.length) return <p className="text-center text-white text-2xl">No tutorials available.</p>
//
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-16 px-6 overflow-hidden transition-colors duration-300">
//       <div className="container mx-auto relative">
//         <motion.h1 className="text-6xl font-bold text-center mb-6 text-foreground">{i("h1title")}</motion.h1>
//         <div className="relative min-h-[800px] mb-8">
//           <AnimatePresence initial={false} custom={direction}>
//             <TutorialCard
//               key={activeIndex}
//               tutorial={tutorials[activeIndex]}
//               isActive={true}
//               direction={direction}
//               onOpenModal={() => setIsModalOpen(true)}
//               images={tutorials[activeIndex]?.imageUrl}
//             />
//           </AnimatePresence>
//         </div>
//         <div className="flex items-center justify-center gap-6">
//           <Button
//             onClick={() => paginate(-1)}
//             disabled={activeIndex === 0}
//             className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground"
//           >
//             <ChevronLeft size={24} />
//           </Button>
//           <Button
//             onClick={() => paginate(1)}
//             disabled={activeIndex === tutorials.length - 1}
//             className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground"
//           >
//             <ChevronRight size={28} />
//           </Button>
//         </div>
//         <div className="mt-8 flex justify-center items-center">
//           {tutorials.map((_, index) => (
//             <motion.div
//               key={index}
//               className={`w-3 h-3 rounded-full mx-1 ${index === activeIndex ? "bg-primary" : "bg-muted"}`}
//               initial={{ scale: 1 }}
//               animate={{ scale: index === activeIndex ? 1.2 : 1 }}
//               transition={{ duration: 0.3 }}
//             />
//           ))}
//         </div>
//         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoUrl={tutorials[activeIndex]?.videoUrl} />
//       </div>
//     </div>
//   )
// }
//
// export default TutorialsCarousel
//
//




//
//
// "use client"
// import type React from "react"
// import { useState, useEffect } from "react"
// import { ChevronLeft, ChevronRight, Play } from "lucide-react"
// import { useTranslations } from "next-intl"
// import { Button } from "@/components/ui/button"
// import YouTubeEmbed from "@/components/YouTubeEmbed"
// import { cn } from "@/lib/utils"
// import { getMediaList } from "@/app/[locale]/(dashboard)/(routes)/media/action"
// import { toast } from "@/components/ui/use-toast"
// import { useSession } from "next-auth/react"
// import LightGallery from "lightgallery/react"
//
// // Import styles and plugins (optional)
// import "lightgallery/css/lightgallery.css"
// import "lightgallery/css/lg-thumbnail.css"
// import "lightgallery/css/lg-zoom.css"
// import lgThumbnail from "lightgallery/plugins/thumbnail"
// import lgZoom from "lightgallery/plugins/zoom"
//
// interface Tutorial {
//   id: number
//   title: string
//   description: string
//   imageUrl: string
//   videoId: string
// }
//
// interface TutorialCardProps {
//   tutorial: Tutorial
//   isActive: boolean
//   direction: number
//   onOpenModal: () => void
//   images: string
// }
//
// const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, isActive, direction, onOpenModal, images }) => {
//   const imagesArray: string[] = images.split(",")
//
//   return (
//     <div className={cn("w-full h-full mx-auto", isActive ? "z-20" : "z-10")}>
//       <div className="w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-card to-background shadow-xl">
//         <div className="relative h-full">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10 rounded-3xl" />
//           <div className="relative z-20 px-5 sm:px-12 py-8 sm:py-16 flex flex-col justify-between">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{tutorial.title}</h2>
//               <LightGallery
//                 speed={500}
//                 plugins={[lgThumbnail, lgZoom]}
//                 elementClassNames={`grid ${
//                   imagesArray.length === 1
//                     ? "grid-cols-1"
//                     : imagesArray.length > 2
//                       ? "grid-cols-1 sm:grid-cols-3"
//                       : "grid-cols-1 sm:grid-cols-2"
//                 } gap-5 w-full`}
//               >
//                 {imagesArray.map((item: string, index: number) => (
//                   <a href={item || "/placeholder.svg"} key={index}>
//                     <img
//                       src={item || "/placeholder.svg"}
//                       alt={tutorial.title}
//                       className={`w-full ${
//                         imagesArray.length > 2 ? "h-[300px]" : "h-[400px]"
//                       } object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105`}
//                     />
//                   </a>
//                 ))}
//               </LightGallery>
//             </div>
//
//             <div className="bg-card/80 backdrop-blur-md rounded-xl p-6 flex items-center justify-between shadow-md mt-6">
//               <p className="text-card-foreground text-sm sm:text-base leading-relaxed flex-1 mr-6">
//                 {tutorial.description}
//               </p>
//               <button
//                 className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg transition-colors duration-300"
//                 onClick={onOpenModal}
//               >
//                 <Play size={24} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
//
// interface ModalProps {
//   isOpen: boolean
//   onClose: () => void
//   videoUrl: string
// }
//
// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, videoUrl }) => (
//   <>
//     {isOpen && (
//       <div
//         className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
//         onClick={onClose}
//       >
//         <div
//           className="bg-card rounded-lg p-6 w-full max-w-4xl h-[500px] shadow-2xl relative overflow-hidden"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <YouTubeEmbed videoId={videoUrl} />
//         </div>
//       </div>
//     )}
//   </>
// )
//
// const TutorialsCarousel = () => {
//   const [[activeIndex, direction], setActiveIndex] = useState([0, 0])
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [tutorials, setMediaList] = useState<any[]>([])
//   const { data: session } = useSession()
//   const i = useTranslations("tutor")
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//
//   const fetchMediaList = async () => {
//     try {
//       setIsLoading(true)
//       setError(null)
//       const media = await getMediaList(session?.sessionToken)
//       setMediaList(media)
//     } catch (error: any) {
//       setError(error.message || "An error occurred while fetching the media list.")
//       toast({
//         title: "Error",
//         description: error.message || "An error occurred while fetching the media list.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }
//
//   useEffect(() => {
//     if (session?.sessionToken) fetchMediaList()
//   }, [session])
//
//   const paginate = (newDirection: any) => {
//     const newIndex = activeIndex + newDirection
//     if (newIndex >= 0 && newIndex < tutorials.length) {
//       setActiveIndex([newIndex, newDirection])
//     }
//   }
//
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "ArrowLeft") {
//         paginate(-1)
//       } else if (event.key === "ArrowRight") {
//         paginate(1)
//       }
//     }
//
//     window.addEventListener("keydown", handleKeyDown)
//     return () => window.removeEventListener("keydown", handleKeyDown)
//   }, [])
//
//   if (isLoading) return <p className="text-center text-white text-2xl">{i("loading")}</p>
//   if (error) return <p className="text-center text-red-500 text-2xl">Error: {error}</p>
//   if (!tutorials.length) return <p className="text-center text-white text-2xl">No tutorials available.</p>
//
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-16 px-6 overflow-hidden transition-colors duration-300">
//       <div className="container mx-auto relative">
//         <h1 className="text-6xl font-bold text-center mb-6 text-foreground">{i("h1title")}</h1>
//         <div className="relative min-h-[800px] mb-8">
//           <TutorialCard
//             key={activeIndex}
//             tutorial={tutorials[activeIndex]}
//             isActive={true}
//             direction={direction}
//             onOpenModal={() => setIsModalOpen(true)}
//             images={tutorials[activeIndex]?.imageUrl}
//           />
//         </div>
//         <div className="flex items-center justify-center gap-6">
//           <Button
//             onClick={() => paginate(-1)}
//             disabled={activeIndex === 0}
//             className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground"
//           >
//             <ChevronLeft size={24} />
//           </Button>
//           <Button
//             onClick={() => paginate(1)}
//             disabled={activeIndex === tutorials.length - 1}
//             className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground"
//           >
//             <ChevronRight size={28} />
//           </Button>
//         </div>
//         <div className="mt-8 flex justify-center items-center">
//           {tutorials.map((_, index) => (
//             <div
//               key={index}
//               className={`w-3 h-3 rounded-full mx-1 ${index === activeIndex ? "bg-primary" : "bg-muted"}`}
//             />
//           ))}
//         </div>
//         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoUrl={tutorials[activeIndex]?.videoUrl} />
//       </div>
//     </div>
//   )
// }
//
// export default TutorialsCarousel
//


"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import YouTubeEmbed from "@/components/YouTubeEmbed"
import { cn } from "@/lib/utils"
import { getMediaList } from "@/app/[locale]/(dashboard)/(routes)/media/action"
import { toast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"
import LightGallery from "lightgallery/react"

// Import styles and plugins (optional)
import "lightgallery/css/lightgallery.css"
import "lightgallery/css/lg-thumbnail.css"
import "lightgallery/css/lg-zoom.css"
import lgThumbnail from "lightgallery/plugins/thumbnail"
import lgZoom from "lightgallery/plugins/zoom"

interface Tutorial {
  id: number
  title: string
  description: string
  imageUrl: string
  videoId: string
}

interface TutorialCardProps {
  tutorial: Tutorial
  isActive: boolean
  direction: number
  onOpenModal: () => void
  images: string
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, isActive, direction, onOpenModal, images }) => {
  const imagesArray: string[] = images.split(",")

  return (
    <div className={cn("w-full h-full mx-auto", isActive ? "z-20" : "z-10")}>
      <div className="w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-card to-background shadow-xl">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10 rounded-3xl" />
          <div className="relative z-20 px-5 sm:px-12 py-8 sm:py-16 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{tutorial.title}</h2>
              <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
              >
                <div className={'grid gap-5 w-full'} style={{
                  gridTemplateColumns: imagesArray.length < 4
                    ? `repeat(${imagesArray.length}, minmax(0, 1fr))`
                    : 'repeat(4, minmax(0, 1fr))',
                }}>
                  {imagesArray.map((item: string, index: number) => (
                    <a href={item || "/placeholder.svg"} key={index}>
                      <img
                        src={item || "/placeholder.svg"}
                        alt={tutorial.title}
                        className={`w-full h-[300px] object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105`}
                      />
                    </a>
                  ))}
                </div>

              </LightGallery>
            </div>

            <div className="bg-card/80 backdrop-blur-md rounded-xl p-6 flex items-center justify-between shadow-md mt-6">
              <p className="text-card-foreground text-sm sm:text-base leading-relaxed flex-1 mr-6">
                {tutorial.description}
              </p>
              <button
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg transition-colors duration-300"
                onClick={onOpenModal}
              >
                <Play size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, videoUrl }) => (
  <>
    {isOpen && (
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <div
          className="bg-card rounded-lg p-6 w-full max-w-4xl h-[500px] shadow-2xl relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <YouTubeEmbed videoId={videoUrl} />
        </div>
      </div>
    )}
  </>
)

const TutorialsCarousel = () => {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tutorials, setMediaList] = useState<any[]>([])
  const { data: session } = useSession()
  const i = useTranslations("tutor")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMediaList = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const media = await getMediaList(session?.sessionToken)
      setMediaList(media)
    } catch (error: any) {
      setError(error.message || "An error occurred while fetching the media list.")
      toast({
        title: "Error",
        description: error.message || "An error occurred while fetching the media list.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (session?.sessionToken) fetchMediaList()
  }, [session])

  const paginate = (newDirection: any) => {
    const newIndex = activeIndex + newDirection
    if (newIndex >= 0 && newIndex < tutorials.length) {
      setActiveIndex([newIndex, newDirection])
    }
  }

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
  }, [])

  if (isLoading) return <p className="text-center text-white text-2xl">{i("loading")}</p>
  if (error) return <p className="text-center text-red-500 text-2xl">Error: {error}</p>
  if (!tutorials.length) return <p className="text-center text-white text-2xl">No tutorials available.</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-16 px-6 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto relative">
        <h1 className="text-6xl font-bold text-center mb-6 text-foreground">{i("h1title")}</h1>
        <div className="relative  mb-8">
          <TutorialCard
            key={activeIndex}
            tutorial={tutorials[activeIndex]}
            isActive={true}
            direction={direction}
            onOpenModal={() => setIsModalOpen(true)}
            images={tutorials[activeIndex]?.imageUrl}
          />
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
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoUrl={tutorials[activeIndex]?.videoUrl} />
      </div>
    </div>
  )
}

export default TutorialsCarousel
