// "use client"
//
// import type React from "react"
// import { useState } from "react"
// import Image from "next/image"
// import { Play, X } from "lucide-react"
// import { cn } from "@/lib/utils"
// import YouTubeEmbed from "@/components/YouTubeEmbed"
// import { Button } from "@/components/ui/button"
//
// interface Tutorial {
//   id: number
//   title: string
//   description: string
//   imageUrl: string
//   videoUrl: string
// }
//
// interface TutorialCardProps {
//   tutorial: Tutorial
//   isActive: boolean
//   direction: number
// }
//
// const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, isActive, direction }) => {
//   const imagesArray: string[] = tutorial.imageUrl.split(",")
//   const [selectedImage, setSelectedImage] = useState<string | null>(null)
//   const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
//
//   return (
//     <div className={cn("w-full h-full mx-auto", isActive ? "z-20" : "z-10")}>
//       <div className="w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-card to-background shadow-xl">
//         <div className="relative h-full">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10 rounded-3xl" />
//           <div className="relative z-20 px-5 sm:px-12 py-8 sm:py-16 flex flex-col justify-between h-full">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{tutorial.title}</h2>
//               <p className="text-white/80 mb-6">{tutorial.description}</p>
//               <Button
//                 onClick={() => setIsVideoModalOpen(true)}
//                 className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
//               >
//                 <Play size={20} />
//                 Watch Video
//               </Button>
//             </div>
//             {imagesArray.length > 0 && (
//               <div
//                 className={`grid ${
//                   imagesArray.length === 1
//                     ? "grid-cols-1"
//                     : imagesArray.length === 2
//                       ? "grid-cols-1 sm:grid-cols-2"
//                       : imagesArray.length <= 3
//                         ? "grid-cols-1 sm:grid-cols-3"
//                         : "grid-cols-1 sm:grid-cols-4"
//                 } gap-5 w-full mt-6`}
//               >
//                 {imagesArray.map((item: string, index: number) => (
//                   <div key={index} className="relative h-[200px] group">
//                     <Image
//                       src={item || "/placeholder.svg"}
//                       alt={`${tutorial.title} - Image ${index + 1}`}
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105 cursor-pointer"
//                       onClick={() => setSelectedImage(item)}
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 rounded-xl flex items-center justify-center">
//                       <Button
//                         variant="secondary"
//                         size="sm"
//                         className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                         onClick={() => setSelectedImage(item)}
//                       >
//                         View
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div className="relative w-full h-full max-w-6xl max-h-6xl p-4">
//             <Image
//               src={selectedImage || "/placeholder.svg"}
//               alt="Enlarged view"
//               layout="fill"
//               objectFit="contain"
//               className="rounded-lg"
//             />
//             <Button
//               variant="secondary"
//               size="icon"
//               className="absolute top-2 right-2"
//               onClick={() => setSelectedImage(null)}
//             >
//               <X size={24} />
//             </Button>
//           </div>
//         </div>
//       )}
//       {isVideoModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
//           onClick={() => setIsVideoModalOpen(false)}
//         >
//           <div className="relative w-full h-full max-w-6xl max-h-6xl p-6" onClick={(e) => e.stopPropagation()}>
//             <YouTubeEmbed videoUrl={tutorial.videoUrl} />
//             <Button
//               variant="secondary"
//               size="icon"
//               className="absolute top-2 right-2"
//               onClick={() => setIsVideoModalOpen(false)}
//             >
//               <X size={24} />
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
//
// export default TutorialCard
//
//
//




//
// // 2 verssiya
// "use client"
//
// import type React from "react"
// import { useState } from "react"
// import Image from "next/image"
// import { Play, X } from "lucide-react"
// import { cn } from "@/lib/utils"
// import YouTubeEmbed from "@/components/YouTubeEmbed"
// import { Button } from "@/components/ui/button"
//
// interface Tutorial {
//   id: number
//   title: string
//   description: string
//   imageUrl: string
//   videoUrl: string
// }
//
// interface TutorialCardProps {
//   tutorial: Tutorial
//   isActive: boolean
//   direction: number
// }
//
// const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, isActive, direction }) => {
//   const imagesArray: string[] = tutorial.imageUrl.split(",")
//   const [selectedImage, setSelectedImage] = useState<string | null>(null)
//   const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
//
//   return (
//     <div className={cn("w-full h-full mx-auto", isActive ? "z-20" : "z-10")}>
//       <div className="w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-card to-background shadow-xl">
//         <div className="relative h-full">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10 rounded-3xl" />
//           <div className="relative z-20 px-5 sm:px-12 py-8 sm:py-16 flex flex-col justify-between h-full">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{tutorial.title}</h2>
//               <p className="text-white/80 mb-6">{tutorial.description}</p>
//               <Button
//                 onClick={() => setIsVideoModalOpen(true)}
//                 className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
//               >
//                 <Play size={20} />
//                 Watch Video
//               </Button>
//             </div>
//             {imagesArray.length > 0 && (
//               <div
//                 className={`grid ${
//                   imagesArray.length === 1
//                     ? "grid-cols-1"
//                     : imagesArray.length === 2
//                       ? "grid-cols-1 sm:grid-cols-2"
//                       : imagesArray.length <= 3
//                         ? "grid-cols-1 sm:grid-cols-3"
//                         : "grid-cols-2 sm:grid-cols-4"
//                 } gap-5 w-full mt-6`}
//               >
//                 {imagesArray.map((item: string, index: number) => (
//                   <div key={index} className="relative h-[300px] group">
//                     <Image
//                       src={item || "/placeholder.svg"}
//                       alt={`${tutorial.title} - Image ${index + 1}`}
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105 cursor-pointer"
//                       onClick={() => setSelectedImage(item)}
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 rounded-xl flex items-center justify-center">
//                       <Button
//                         variant="secondary"
//                         size="sm"
//                         className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                         onClick={() => setSelectedImage(item)}
//                       >
//                         View
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div className="relative w-full h-full p-4 flex items-center justify-center">
//             <Image
//               src={selectedImage || "/placeholder.svg"}
//               alt="Enlarged view"
//               layout="fill"
//               objectFit="contain"
//               className="rounded-lg"
//             />
//             <Button
//               variant="secondary"
//               size="icon"
//               className="absolute top-4 right-4 z-10"
//               onClick={() => setSelectedImage(null)}
//             >
//               <X size={24} />
//             </Button>
//           </div>
//         </div>
//       )}
//       {isVideoModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
//           onClick={() => setIsVideoModalOpen(false)}
//         >
//           <div
//             className="relative w-full h-full p-4 flex items-center justify-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <YouTubeEmbed videoUrl={tutorial.videoUrl} />
//             <Button
//               variant="secondary"
//               size="icon"
//               className="absolute top-4 right-4 z-10"
//               onClick={() => setIsVideoModalOpen(false)}
//             >
//               <X size={24} />
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
//
// export default TutorialCard
//



//
// "use client"
//
// import type React from "react"
// import { useState } from "react"
// import Image from "next/image"
// import { Play, X, ChevronLeft, ChevronRight } from "lucide-react"
// import { cn } from "@/lib/utils"
// import YouTubeEmbed from "@/components/YouTubeEmbed"
// import { Button } from "@/components/ui/button"
//
// interface Tutorial {
//   id: number
//   title: string
//   description: string
//   imageUrl: string
//   videoUrl: string
// }
//
// interface TutorialCardProps {
//   tutorial: Tutorial
//   isActive: boolean
//   direction: number
// }
//
// const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, isActive, direction }) => {
//   const imagesArray: string[] = tutorial.imageUrl.split(",")
//   const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
//   const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
//
//   const openImageModal = (index: number) => {
//     setSelectedImageIndex(index)
//   }
//
//   const closeImageModal = () => {
//     setSelectedImageIndex(null)
//   }
//
//   const navigateImage = (direction: number) => {
//     if (selectedImageIndex === null) return
//     const newIndex = selectedImageIndex + direction
//     if (newIndex >= 0 && newIndex < imagesArray.length) {
//       setSelectedImageIndex(newIndex)
//     }
//   }
//
//   return (
//     <div className={cn("w-full h-full mx-auto", isActive ? "z-20" : "z-10")}>
//       <div className="w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-card to-background shadow-xl">
//         <div className="relative h-full">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10 rounded-3xl" />
//           <div className="relative z-20 px-5 sm:px-12 py-8 sm:py-16 flex flex-col justify-between h-full">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{tutorial.title}</h2>
//               <p className="text-white/80 mb-6">{tutorial.description}</p>
//               <Button
//                 onClick={() => setIsVideoModalOpen(true)}
//                 className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
//               >
//                 <Play size={20} />
//                 Watch Video
//               </Button>
//             </div>
//             {imagesArray.length > 0 && (
//               <div
//                 className={`grid ${
//                   imagesArray.length === 1
//                     ? "grid-cols-1"
//                     : imagesArray.length === 2
//                       ? "grid-cols-1 sm:grid-cols-2"
//                       : imagesArray.length <= 3
//                         ? "grid-cols-1 sm:grid-cols-3"
//                         : "grid-cols-2 sm:grid-cols-4"
//                 } gap-5 w-full mt-6`}
//               >
//                 {imagesArray.map((item: string, index: number) => (
//                   <div key={index} className="relative h-[300px] group">
//                     <Image
//                       src={item || "/placeholder.svg"}
//                       alt={`${tutorial.title} - Image ${index + 1}`}
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105 cursor-pointer"
//                       onClick={() => openImageModal(index)}
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 rounded-xl flex items-center justify-center">
//                       <Button
//                         variant="secondary"
//                         size="sm"
//                         className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                         onClick={() => openImageModal(index)}
//                       >
//                         View
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       {selectedImageIndex !== null && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
//           onClick={closeImageModal}
//         >
//           <div
//             className="relative w-full h-full p-4 flex flex-col items-center justify-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="relative w-full h-[70%]">
//               <Image
//                 src={imagesArray[selectedImageIndex] || "/placeholder.svg"}
//                 alt={`${tutorial.title} - Image ${selectedImageIndex + 1}`}
//                 layout="fill"
//                 objectFit="contain"
//                 className="rounded-lg"
//               />
//             </div>
//             <div className="mt-4 max-w-2xl text-center">
//               <h3 className="text-xl font-semibold text-white mb-2">{tutorial.title}</h3>
//               <p className="text-white/80">{tutorial.description}</p>
//             </div>
//             <div className="absolute top-4 right-4 flex gap-2">
//               <Button
//                 variant="secondary"
//                 size="icon"
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   navigateImage(-1)
//                 }}
//                 disabled={selectedImageIndex === 0}
//               >
//                 <ChevronLeft size={24} />
//               </Button>
//               <Button
//                 variant="secondary"
//                 size="icon"
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   navigateImage(1)
//                 }}
//                 disabled={selectedImageIndex === imagesArray.length - 1}
//               >
//                 <ChevronRight size={24} />
//               </Button>
//               <Button variant="secondary" size="icon" onClick={closeImageModal}>
//                 <X size={24} />
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//       {isVideoModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
//           onClick={() => setIsVideoModalOpen(false)}
//         >
//           <div
//             className="relative w-full h-full p-4 flex items-center justify-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <YouTubeEmbed videoUrl={tutorial.videoUrl} />
//             <Button
//               variant="secondary"
//               size="icon"
//               className="absolute top-4 right-4 z-10"
//               onClick={() => setIsVideoModalOpen(false)}
//             >
//               <X size={24} />
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
//
// export default TutorialCard
//






"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Play, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import YouTubeEmbed from "@/components/YouTubeEmbed"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface Tutorial {
  id: number
  title: string
  description: string
  imageUrl: string
  videoUrl: string
}

interface TutorialCardProps {
  tutorial: Tutorial
  isActive: boolean
  direction: number
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, isActive, direction }) => {
  const imagesArray: string[] = tutorial.imageUrl.split(",")
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeImageModal = () => {
    setSelectedImageIndex(null)
  }

  const navigateImage = (direction: number) => {
    if (selectedImageIndex === null) return
    const newIndex = selectedImageIndex + direction
    if (newIndex >= 0 && newIndex < imagesArray.length) {
      setSelectedImageIndex(newIndex)
    }
  }

  return (
    <div className={cn("w-full h-full mx-auto", isActive ? "z-20" : "z-10")}>
      <div className="w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-card to-background shadow-xl">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10 rounded-3xl" />
          <div className="relative z-20 px-6 sm:px-12 py-10 sm:py-16 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{tutorial.title}</h2>
              <p className="text-white/90 text-lg mb-6">{tutorial.description}</p>
              <Button
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-6 py-3 rounded-full"
              >
                <Play size={24} />
                Watch Video
              </Button>
            </div>
            {imagesArray.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {imagesArray.map((item: string, index: number) => (
                    <div key={index} className="relative aspect-square group">
                      <Image
                        src={item || "/placeholder.svg"}
                        alt={`${tutorial.title} - Image ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={() => openImageModal(index)}
                        >
                          <Maximize2 size={24} />
                          <span className="sr-only">View image</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full p-4 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh]">
                <Image
                  src={imagesArray[selectedImageIndex] || "/placeholder.svg"}
                  alt={`${tutorial.title} - Image ${selectedImageIndex + 1}`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <div className="mt-4 max-w-2xl text-center">
                <h3 className="text-2xl font-semibold text-white mb-2">{tutorial.title}</h3>
                <p className="text-white/90 text-lg">{tutorial.description}</p>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage(-1)
                  }}
                  disabled={selectedImageIndex === 0}
                  className="rounded-full"
                >
                  <ChevronLeft size={24} />
                  <span className="sr-only">Previous image</span>
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage(1)
                  }}
                  disabled={selectedImageIndex === imagesArray.length - 1}
                  className="rounded-full"
                >
                  <ChevronRight size={24} />
                  <span className="sr-only">Next image</span>
                </Button>
                <Button variant="secondary" size="icon" onClick={closeImageModal} className="rounded-full">
                  <X size={24} />
                  <span className="sr-only">Close modal</span>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full h-full p-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <YouTubeEmbed videoUrl={tutorial.videoUrl} />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 z-10 rounded-full"
              onClick={() => setIsVideoModalOpen(false)}
            >
              <X size={24} />
              <span className="sr-only">Close video</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TutorialCard


// 角田さん、お疲れ様です。
//
// ギャラリーのようにカルーセルを設定しました。各カードの説明は、そのカードに関連する画像の下に表示されるようになりました。

