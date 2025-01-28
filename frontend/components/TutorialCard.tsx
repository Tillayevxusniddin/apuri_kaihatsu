// "use client"
//
// import type React from "react"
// import { useState } from "react"
// import Image from "next/image"
// import { Play } from "lucide-react"
// import { cn } from "@/lib/utils"
// import YouTubeEmbed from "@/components/YouTubeEmbed"
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
//               <button
//                 onClick={() => setIsVideoModalOpen(true)}
//                 className="flex items-center text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-full transition-colors duration-300"
//               >
//                 <Play size={20} className="mr-2" />
//                 Watch Video
//               </button>
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
//                   <div key={index} className="relative h-[200px]">
//                     <Image
//                       src={item || "/placeholder.svg"}
//                       alt={`${tutorial.title} - Image ${index + 1}`}
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded-xl shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
//                       onClick={() => setSelectedImage(item)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div className="relative w-full h-full max-w-4xl max-h-4xl">
//             <Image src={selectedImage || "/placeholder.svg"} alt="Enlarged view" layout="fill" objectFit="contain" />
//           </div>
//         </div>
//       )}
//       {isVideoModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
//           onClick={() => setIsVideoModalOpen(false)}
//         >
//           <div className="relative w-full h-full max-w-4xl max-h-4xl p-6" onClick={(e) => e.stopPropagation()}>
//             <YouTubeEmbed videoUrl={tutorial.videoUrl} />
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
import { Play, X } from "lucide-react"
import { cn } from "@/lib/utils"
import YouTubeEmbed from "@/components/YouTubeEmbed"
import { Button } from "@/components/ui/button"

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  return (
    <div className={cn("w-full h-full mx-auto", isActive ? "z-20" : "z-10")}>
      <div className="w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-card to-background shadow-xl">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10 rounded-3xl" />
          <div className="relative z-20 px-5 sm:px-12 py-8 sm:py-16 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{tutorial.title}</h2>
              <p className="text-white/80 mb-6">{tutorial.description}</p>
              <Button
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Play size={20} />
                Watch Video
              </Button>
            </div>
            {imagesArray.length > 0 && (
              <div
                className={`grid ${
                  imagesArray.length === 1
                    ? "grid-cols-1"
                    : imagesArray.length === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : imagesArray.length <= 3
                        ? "grid-cols-1 sm:grid-cols-3"
                        : "grid-cols-1 sm:grid-cols-4"
                } gap-5 w-full mt-6`}
              >
                {imagesArray.map((item: string, index: number) => (
                  <div key={index} className="relative h-[200px] group">
                    <Image
                      src={item || "/placeholder.svg"}
                      alt={`${tutorial.title} - Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                      onClick={() => setSelectedImage(item)}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => setSelectedImage(item)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full max-w-6xl max-h-6xl p-4">
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Enlarged view"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </Button>
          </div>
        </div>
      )}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div className="relative w-full h-full max-w-6xl max-h-6xl p-6" onClick={(e) => e.stopPropagation()}>
            <YouTubeEmbed videoUrl={tutorial.videoUrl} />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setIsVideoModalOpen(false)}
            >
              <X size={24} />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TutorialCard



