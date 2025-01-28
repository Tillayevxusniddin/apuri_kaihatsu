// // // // 2 versiya
//
// "use client"
// import React, {useRef} from "react"
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
// import {usePathname, useRouter} from "next/navigation";
// import useApiQuery from "@/lib/useApiQuery";
// import {useQuery} from "@tanstack/react-query";
//
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
//   const imagesArray: string[] = images.split(",");
//   // const router = usePathname();
//   // const currentLanguage = router.split("/")?.[1]
//
//   return (
//     <div className={cn("w-full h-full mx-auto", isActive ? "z-20" : "z-10")}>
//       <div className="w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-card to-background shadow-xl">
//         <div className="relative h-full">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10 rounded-3xl" />
//           <div className="relative z-20 px-5 sm:px-12 py-8 sm:py-16 flex flex-col justify-between">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{tutorial.title}</h2>
//               </div>
//             <LightGallery
//               // onInit={(ref) => {
//               //   lightGalleryRef.current = ref.instance;
//               // }}
//               speed={500}
//               plugins={[lgThumbnail, lgZoom]}
//               elementClassNames={`grid ${
//                 imagesArray.length === 1
//                   ? "grid-cols-1"
//                   : imagesArray.length === 2
//                     ? "grid-cols-1 sm:grid-cols-2"
//                     : imagesArray.length <= 3
//                       ? "grid-cols-1 sm:grid-cols-3"
//                       : "grid-cols-1 sm:grid-cols-4"
//               } gap-5 w-full`}
//               // key={currentLanguage || "default"}
//             >
//               {/*<div className={'grid gap-5 w-full'} style={{*/}
//               {/*  gridTemplateColumns: imagesArray.length < 4*/}
//               {/*    ? `repeat(${imagesArray.length}, minmax(0, 1fr))`*/}
//               {/*    : 'repeat(4, minmax(0, 1fr))',*/}
//               {/*}}>*/}
//                 {imagesArray.map((item: string, index: number) => (
//                   <a href={item || "/placeholder.svg"} key={index} group={tutorial.title}>
//                     <img
//                       src={item || "/placeholder.svg"}
//                       alt={tutorial.title}
//                       className={`w-full h-[300px] object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105`}
//                     />
//                   </a>
//                 ))}
//               {/*</div>*/}
//             </LightGallery>
//
//
//           <div className="bg-card/80 backdrop-blur-md rounded-xl p-6 flex items-center justify-between shadow-md mt-6">
//             <p className="text-card-foreground text-sm sm:text-base leading-relaxed flex-1 mr-6">
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
//   // const [tutorials, setMediaList] = useState<any[]>([])
//   const { data: session  } = useSession()
//   const i = useTranslations("tutor")
//   const {data : tutorials, isLoading, error} = useQuery({
//     queryKey: ["tutor"],
//     queryFn: async () => await getMediaList(session?.sessionToken)
//   })
//
//   const paginate = (newDirection: any) => {
//     const newIndex = activeIndex + newDirection
//     if (newIndex >= 0 && newIndex < tutorials?.length) {
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
//         <div className="relative  mb-8">
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



//
// "use client"
// import React, { useState, useEffect } from "react"
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
// import { useQuery } from "@tanstack/react-query"
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
//   const imagesArray: string[] = images.split(",");
//
//   return (
//     <div className={cn("w-full h-full mx-auto", isActive ? "z-20" : "z-10")}>
//       <div className="w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-card to-background shadow-xl">
//         <div className="relative h-full">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10 rounded-3xl" />
//           <div className="relative z-20 px-5 sm:px-12 py-8 sm:py-16 flex flex-col justify-between">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{tutorial.title}</h2>
//             </div>
//             <LightGallery
//               speed={500}
//               plugins={[lgThumbnail, lgZoom]}
//               elementClassNames={`grid ${
//                 imagesArray.length === 1
//                   ? "grid-cols-1"
//                   : imagesArray.length === 2
//                     ? "grid-cols-1 sm:grid-cols-2"
//                     : imagesArray.length <= 3
//                       ? "grid-cols-1 sm:grid-cols-3"
//                       : "grid-cols-1 sm:grid-cols-4"
//               } gap-5 w-full`}
//             >
//               {imagesArray.map((item: string, index: number) => (
//                 <a href={item || "/placeholder.svg"} key={index} group={tutorial.title}>
//                   <img
//                     src={item || "/placeholder.svg"}
//                     alt={tutorial.title}
//                     className={`w-full h-[300px] object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105`}
//                   />
//                 </a>
//               ))}
//             </LightGallery>
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
//   const { data: session } = useSession()
//   const i = useTranslations("tutor")
//
//   const { data: tutorials = [], isLoading, error } = useQuery({
//     queryKey: ["tutor"],
//     queryFn: async () => await getMediaList(session?.sessionToken),
//     enabled: !!session?.sessionToken,  // This ensures that the query is only triggered if sessionToken is present
//   })
//
//   const paginate = (newDirection: number) => {
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
//   }, [activeIndex])
//
//   if (isLoading) return <p className="text-center text-white text-2xl">{i("loading")}</p>
//   if (error) return <p className="text-center text-red-500 text-2xl">Error: {error.message}</p>
//   if (tutorials.length === 0) return <p className="text-center text-white text-2xl">No tutorials available.</p>
//
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-16 px-6 overflow-hidden transition-colors duration-300">
//       <div className="container mx-auto relative">
//         <h1 className="text-6xl font-bold text-center mb-6 text-foreground">{i("h1title")}</h1>
//         <div className="relative mb-8">
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
//         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoUrl={tutorials[activeIndex]?.videoId} />
//       </div>
//     </div>
//   )
// }
//
// export default TutorialsCarousel


//
//
// "use client"
// import React, { useState, useEffect, useRef } from "react"
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
// import { useQuery } from "@tanstack/react-query"
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
//   const imagesArray: string[] = images.split(",");
//
//   return (
//     <div className={cn("w-full h-full mx-auto", isActive ? "z-20" : "z-10")}>
//       <div className="w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-card to-background shadow-xl">
//         <div className="relative h-full">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10 rounded-3xl" />
//           <div className="relative z-20 px-5 sm:px-12 py-8 sm:py-16 flex flex-col justify-between">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{tutorial.title}</h2>
//             </div>
//             {/*{imagesArray.length > 0 && (*/}
//             {/*  <LightGallery*/}
//             {/*    speed={500}*/}
//             {/*    plugins={[lgThumbnail, lgZoom]}*/}
//             {/*    elementClassNames={`grid ${*/}
//             {/*      imagesArray.length === 1*/}
//             {/*        ? "grid-cols-1"*/}
//             {/*        : imagesArray.length === 2*/}
//             {/*          ? "grid-cols-1 sm:grid-cols-2"*/}
//             {/*          : imagesArray.length <= 3*/}
//             {/*            ? "grid-cols-1 sm:grid-cols-3"*/}
//             {/*            : "grid-cols-1 sm:grid-cols-4"*/}
//             {/*    } gap-5 w-full`}*/}
//             {/*  >*/}
//             {/*    {imagesArray.map((item: string, index: number) => (*/}
//             {/*      <a href={item || "/placeholder.svg"} key={index} group={tutorial.title}>*/}
//             {/*        <img*/}
//             {/*          src={item || "/placeholder.svg"}*/}
//             {/*          alt={tutorial.title}*/}
//             {/*          className={`w-full h-[300px] object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105`}*/}
//             {/*        />*/}
//             {/*      </a>*/}
//             {/*    ))}*/}
//             {/*  </LightGallery>*/}
//             {/*)}*/}
//
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
//   const { data: session } = useSession()
//   const i = useTranslations("tutor")
//
//   const { data: tutorials = [], isLoading, error } = useQuery({
//     queryKey: ["tutor"],
//     queryFn: async () => await getMediaList(session?.sessionToken),
//     enabled: !!session?.sessionToken,  // This ensures that the query is only triggered if sessionToken is present
//   })
//
//   const paginate = (newDirection: number) => {
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
//   }, [activeIndex])
//
//   if (isLoading) return <p className="text-center text-white text-2xl">{i("loading")}</p>
//   if (error) return <p className="text-center text-red-500 text-2xl">Error: {error.message}</p>
//   if (tutorials.length === 0) return <p className="text-center text-white text-2xl">No tutorials available.</p>
//
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-16 px-6 overflow-hidden transition-colors duration-300">
//       <div className="container mx-auto relative">
//         <h1 className="text-6xl font-bold text-center mb-6 text-foreground">{i("h1title")}</h1>
//         <div className="relative mb-8">
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
//         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoUrl={tutorials[activeIndex]?.videoId} />
//       </div>
//     </div>
//   )
// }
//
// export default TutorialsCarousel
//




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



