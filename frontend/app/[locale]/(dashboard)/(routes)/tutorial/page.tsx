//
// "use client";
//
// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence, useAnimation } from "framer-motion";
// import { Book, Users, MessageSquare, Settings, UserCheck, Pencil, ChevronLeft, ChevronRight, Play } from 'lucide-react';
// import { useTranslations } from "next-intl";
// import { Button } from "@/components/ui/button";
// import YouTubeEmbed from "@/components/YouTubeEmbed";
// import { cn } from "@/lib/utils";
// import {getMediaList} from "@/app/[locale]/(dashboard)/(routes)/media/action";
// import {toast} from "@/components/ui/use-toast";
// import {useSession} from "next-auth/react";
// // import {
// //   getMediaList
// // } from "./../media/action";
//
// interface Tutorial {
//   id: number;
//   title: string;
//   description: string;
//   content: string;
//   icon: React.ReactNode;
//   videoId: string;
//   color: string;
// }
//
// const TutorialCard: React.FC<{
//   tutorial: any;
//   isActive: boolean;
//   direction: number;
//   onOpenModal: () => void;
// }> = ({ tutorial, isActive, direction, onOpenModal }) => {
//   const controls = useAnimation();
//   const cardRef = useRef<HTMLDivElement>(null);
//
//   useEffect(() => {
//     if (isActive) {
//       controls.start({ opacity: 1, scale: 1, x: 0 });
//     }
//   }, [isActive, controls]);
//
//   return (
//     <motion.div
//       ref={cardRef}
//       className={cn(
//         "absolute top-0 left-0 right-0 w-[90%] h-[80%] mx-auto",
//         isActive ? "z-20" : "z-10"
//       )}
//       initial={{ opacity: 0, scale: 0.8, x: direction > 0 ? 1000 : -1000 }}
//       animate={controls}
//       exit={{ opacity: 0, scale: 0.8, x: direction < 0 ? 1000 : -1000 }}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//     >
//       <div className={`w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br`}>
//         <div className="relative h-full">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10" />
//           <div className="absolute inset-0 z-20 px-5  sm:px-12 py-8 sm:py-20 flex flex-col justify-between">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               <div className="flex items-center gap-4 mb-6">
//                 {/*<motion.div*/}
//                 {/*  className="p-3 rounded-full bg-white/20 backdrop-blur-sm"*/}
//                 {/*  whileHover={{ rotate: 360, scale: 1.1 }}*/}
//                 {/*  transition={{ duration: 0.6 }}*/}
//                 {/*>*/}
//                 {/*  {tutorial.icon}*/}
//                 {/*</motion.div>*/}
//                 <h2 className="text-3xl font-bold text-white">{tutorial.title}</h2>
//               </div>
//               <p className="text-2xl md:text-4xl text-white/90 max-w-2xl">{tutorial.description}</p>
//             </motion.div>
//             <motion.div
//               className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex items-center justify-between"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <p className="text-white/80 text-lg leading-relaxed flex-1 mr-4">{tutorial.content}</p>
//               <motion.button
//                 className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-colors duration-300"
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
//   );
// };
//
// const Modal: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   videoId: string;
// }> = ({ isOpen, onClose, videoId }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
//           onClick={onClose}
//         >
//           <motion.div
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             exit={{ scale: 0.9 }}
//             className="bg-white rounded-lg p-4 w-full max-w-3xl h-[450px]"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <YouTubeEmbed videoId={videoId}/>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };
//
// const TutorialsCarousel: React.FC = () => {
//   const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [tutorials, setMediaList] = useState<any[]>([]);
//   const { data: session } = useSession();
//   const i = useTranslations("tutor");
//
//   // const tutorials: Tutorial[] = [
//   //   {
//   //     id: 1,
//   //     title: i("student-t"),
//   //     description: i("student-d"),
//   //     content: i("student-c"),
//   //     icon: <Users className="text-green-300" size={32} />,
//   //     videoId: "dQw4w9WgXcQ",
//   //     color: "from-green-600 to-green-900",
//   //   },
//   //   {
//   //     id: 2,
//   //     title: i("groups-t"),
//   //     description: i("groups-d"),
//   //     content: i("groups-c"),
//   //     icon: <Settings className="text-purple-300" size={32} />,
//   //     videoId: "dQw4w9WgXcQ",
//   //     color: "from-purple-600 to-purple-900",
//   //   },
//   //   {
//   //     id: 3,
//   //     title: i("parents-t"),
//   //     description: i("parents-d"),
//   //     content: i("parents-c"),
//   //     icon: <UserCheck className="text-pink-300" size={32} />,
//   //     videoId: "dQw4w9WgXcQ",
//   //     color: "from-pink-600 to-pink-900",
//   //   },
//   //   {
//   //     id: 4,
//   //     title: i("message-t"),
//   //     description: i("message-d"),
//   //     content: i("message-c"),
//   //     icon: <MessageSquare className="text-blue-300" size={32} />,
//   //     videoId: "dQw4w9WgXcQ",
//   //     color: "from-blue-600 to-blue-900",
//   //   },
//   //   {
//   //     id: 5,
//   //     title: i("forms-t"),
//   //     description: i("forms-d"),
//   //     content: i("forms-c"),
//   //     icon: <Pencil className="text-orange-300" size={32} />,
//   //     videoId: "dQw4w9WgXcQ",
//   //     color: "from-orange-600 to-orange-900",
//   //   },
//   //   {
//   //     id: 6,
//   //     title: i("admins-t"),
//   //     description: i("admins-d"),
//   //     content: i("admins-c"),
//   //     icon: <Book className="text-red-300" size={32} />,
//   //     videoId: "dQw4w9WgXcQ",
//   //     color: "from-red-600 to-red-900",
//   //   },
//   // ];
//
//   const fetchMediaList = async () => {
//     try {
//       const media = await getMediaList(session?.sessionToken);
//       setMediaList(media);
//     } catch (error: any) {
//       toast({
//         title: "Xatolik",
//         description: error.message || "Media ro'yxatini olishda xatolik yuz berdi.",
//         variant: "destructive",
//       });
//     }
//   };
//
//   useEffect(() => {
//     if (session?.sessionToken) fetchMediaList();
//   }, [session]);
//
//
//
//   const paginate = (newDirection: number) => {
//     const newIndex = activeIndex + newDirection;
//     if (newIndex >= 0 && newIndex < tutorials.length) {
//       setActiveIndex([newIndex, newDirection]);
//     }
//   };
//
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-16 px-6 overflow-hidden transition-colors duration-500">
//       <div className="container mx-auto relative">
//         <motion.h1
//           className="text-6xl md:text-7xl font-bold text-center mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-300 dark:to-gray-500 bg-clip-text text-transparent"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           {i("h1title")}
//         </motion.h1>
//         <motion.p
//           className="text-2xl text-center text-gray-600 dark:text-gray-400 mt-6 mb-12"
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.8 }}
//         >
//           {i("p-subtitle")}
//         </motion.p>
//
//         <div className="relative h-[700px] mb-12">
//           <AnimatePresence initial={false} custom={direction}>
//             <TutorialCard
//               key={activeIndex}
//               tutorial={tutorials[activeIndex]}
//               isActive={true}
//               direction={direction}
//               onOpenModal={() => setIsModalOpen(true)}
//             />
//           </AnimatePresence>
//         </div>
//
//         <motion.div
//           className="flex items-center justify-center gap-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//         >
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => paginate(-1)}
//             disabled={activeIndex === 0}
//             className="rounded-full w-16 h-16 border-2 border-gray-400/20 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-white transition-all duration-300"
//           >
//             <ChevronLeft className="h-8 w-8" />
//             <span className="sr-only">Previous</span>
//           </Button>
//           <div className="flex gap-4">
//             {tutorials.map((_, index) => (
//               <Button
//                 key={index}
//                 variant={index === activeIndex ? "default" : "ghost"}
//                 size="icon"
//                 className={cn(
//                   "w-4 h-4 rounded-full p-0 transition-all duration-300",
//                   index === activeIndex
//                     ? "bg-gray-900 dark:bg-white scale-125"
//                     : "bg-gray-400/30 hover:bg-gray-400/50 dark:bg-white/30 dark:hover:bg-white/50"
//                 )}
//                 onClick={() => setActiveIndex([index, index > activeIndex ? 1 : -1])}
//               >
//                 <span className="sr-only">Go to slide {index + 1}</span>
//               </Button>
//             ))}
//           </div>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => paginate(1)}
//             disabled={activeIndex === tutorials.length - 1}
//             className="rounded-full w-16 h-16 border-2 border-gray-400/20 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-white transition-all duration-300"
//           >
//             <ChevronRight className="h-8 w-8" />
//             <span className="sr-only">Next</span>
//           </Button>
//         </motion.div>
//         {/*<Modal*/}
//         {/*  isOpen={isModalOpen}*/}
//         {/*  onClose={() => setIsModalOpen(false)}*/}
//         {/*  videoId={tutorials[activeIndex].videoId}*/}
//         {/*/>*/}
//       </div>
//     </div>
//   );
// };
//
// export default TutorialsCarousel;
//







// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence, useAnimation } from "framer-motion";
// import { ChevronLeft, ChevronRight, Play } from "lucide-react";
// import { useTranslations } from "next-intl";
// import { Button } from "@/components/ui/button";
// import YouTubeEmbed from "@/components/YouTubeEmbed";
// import { cn } from "@/lib/utils";
// import { getMediaList } from "@/app/[locale]/(dashboard)/(routes)/media/action";
// import { toast } from "@/components/ui/use-toast";
// import { useSession } from "next-auth/react";
//
// interface Tutorial {
//   id: number;
//   title: string;
//   description: string;
//   imageUrl: string;
//   videoId: string;
// }
//
// interface TutorialCardProps {
//   tutorial: Tutorial;
//   isActive: boolean;
//   direction: number;
//   onOpenModal: () => void;
// }
//
//
// const TutorialCard: React.FC<TutorialCardProps> = ({
//                                                      tutorial,
//                                                      isActive,
//                                                      direction,
//                                                      onOpenModal,
//                                                    }) => {
//   const controls = useAnimation();
//
//   useEffect(() => {
//     if (isActive) {
//       controls.start({ opacity: 1, scale: 1, x: 0 });
//     }
//   }, [isActive, controls]);
//
//   return (
//     <motion.div
//       className={cn(
//         "absolute top-0 left-0 right-0 w-[90%] h-full mx-auto",
//         isActive ? "z-20" : "z-10"
//       )}
//       initial={{ opacity: 0, scale: 0.8, x: direction > 0 ? 1000 : -1000 }}
//       animate={controls}
//       exit={{ opacity: 0, scale: 0.8, x: direction < 0 ? 1000 : -1000 }}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//     >
//       <div className="w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br">
//         <div className="relative h-full">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10" />
//           <div className="absolute inset-0 z-20 px-5 sm:px-12 py-8 sm:py-16 flex flex-col justify-between">
//             {/* Title */}
//             <motion.div
//               initial={{opacity: 0, y: 20}}
//               animate={{opacity: 1, y: 0}}
//               transition={{delay: 0.2}}
//             >
//               <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
//                 {tutorial.title}
//               </h2>
//               <img
//                 src={tutorial.imageUrl || "/placeholder.svg"}
//                 alt={tutorial.title}
//                 className="w-full h-80 object-cover mb-2"
//               />
//               {/*<p className="text-sm sm:text-base text-white/90 max-w-2xl">*/}
//               {/*  {tutorial.description}*/}
//               {/*</p>*/}
//             </motion.div>
//
//             {/* Content + Play Button */}
//             <motion.div
//               className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-between"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <p className="text-white/80 text-sm sm:text-base leading-relaxed flex-1 mr-4">
//                 {tutorial.description}
//               </p>
//               <motion.button
//                 className="bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-colors duration-300"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={onOpenModal}
//               >
//                 <Play size={20} />
//               </motion.button>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };
//
//
//
// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   videoId: string;
// }
//
// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, videoId }) => (
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9 }}
//           animate={{ scale: 1 }}
//           exit={{ scale: 0.9 }}
//           className="bg-white rounded-lg p-4 w-full max-w-3xl h-[450px]"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <YouTubeEmbed videoId={videoId} />
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );
//
// const TutorialsCarousel = () => {
//   const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [tutorials, setMediaList] = useState<any[]>([]);
//   const { data: session } = useSession();
//   const i = useTranslations("tutor");
//
//   const fetchMediaList = async () => {
//     try {
//       const media = await getMediaList(session?.sessionToken);
//       setMediaList(media);
//     } catch (error:any) {
//       toast({
//         title: "Xatolik",
//         description: error.message || "Media ro'yxatini olishda xatolik yuz berdi.",
//         variant: "destructive",
//       });
//     }
//   };
//
//   useEffect(() => {
//     if (session?.sessionToken) fetchMediaList();
//   }, [session]);
//
//   const paginate = (newDirection:any) => {
//     const newIndex = activeIndex + newDirection;
//     if (newIndex >= 0 && newIndex < tutorials.length) {
//       setActiveIndex([newIndex, newDirection]);
//     }
//   };
//
//   if (!tutorials.length) return <p>Loading...</p>;
//
//   return (
//     <div className="min-h-screen bg-gradient-to-br py-16 px-6 overflow-hidden">
//       <div className="container mx-auto relative">
//         <motion.h1 className="text-6xl font-bold text-center mb-6">{i("h1title")}</motion.h1>
//         <div className="relative h-[700px] mb-8">
//           <AnimatePresence initial={false} custom={direction}>
//             <TutorialCard
//               key={activeIndex}
//               tutorial={tutorials[activeIndex]}
//               isActive={true}
//               direction={direction}
//               onOpenModal={() => setIsModalOpen(true)}
//             />
//           </AnimatePresence>
//         </div>
//         <div className="flex items-center justify-center gap-6">
//           <Button
//             onClick={() => paginate(-1)}
//             disabled={activeIndex === 0}
//             className="rounded-full w-16 h-16"
//           >
//             <ChevronLeft size={24} />
//           </Button>
//           <Button
//             onClick={() => paginate(1)}
//             disabled={activeIndex === tutorials.length - 1}
//             className="rounded-full w-16 h-16"
//           >
//             <ChevronRight size={24} />
//           </Button>
//         </div>
//         <Modal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           videoId={tutorials[activeIndex]?.videoId}
//         />
//       </div>
//     </div>
//   );
// };
//
// export default TutorialsCarousel;



"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { cn } from "@/lib/utils";
import { getMediaList } from "@/app/[locale]/(dashboard)/(routes)/media/action";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

interface Tutorial {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  videoId: string;
}

interface TutorialCardProps {
  tutorial: Tutorial;
  isActive: boolean;
  direction: number;
  onOpenModal: () => void;
}

const TutorialCard: React.FC<TutorialCardProps> = ({
                                                     tutorial,
                                                     isActive,
                                                     direction,
                                                     onOpenModal,
                                                   }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isActive) {
      controls.start({ opacity: 1, scale: 1, x: 0 });
    }
  }, [isActive, controls]);

  return (
    <motion.div
      className={cn(
        "absolute top-0 left-0 right-0 w-[90%] h-full mx-auto",
        isActive ? "z-20" : "z-10"
      )}
      initial={{ opacity: 0, scale: 0.8, x: direction > 0 ? 1000 : -1000 }}
      animate={controls}
      exit={{ opacity: 0, scale: 0.8, x: direction < 0 ? 1000 : -1000 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10" />
          <div className="absolute inset-0 z-20 px-5 sm:px-12 py-8 sm:py-16 flex flex-col justify-between">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                {tutorial.title}
              </h2>
              <img
                src={tutorial.imageUrl || "/placeholder.svg"}
                alt={tutorial.title}
                className="w-full h-[500px] object-cover rounded-xl mb-4"
              />
            </motion.div>

            {/* Content + Play Button */}
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-white/80 text-sm sm:text-base leading-relaxed flex-1 mr-4">
                {tutorial.description}
              </p>
              <motion.button
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenModal}
              >
                <Play size={20} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, videoId }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white rounded-lg p-4 w-full max-w-3xl h-[450px]"
          onClick={(e) => e.stopPropagation()}
        >
          <YouTubeEmbed videoId={videoId} />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const TutorialsCarousel = () => {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tutorials, setMediaList] = useState<any[]>([]);
  const { data: session } = useSession();
  const i = useTranslations("tutor");

  const fetchMediaList = async () => {
    try {
      const media = await getMediaList(session?.sessionToken);
      setMediaList(media);
    } catch (error: any) {
      toast({
        title: "Xatolik",
        description: error.message || "Media ro'yxatini olishda xatolik yuz berdi.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (session?.sessionToken) fetchMediaList();
  }, [session]);

  const paginate = (newDirection: any) => {
    const newIndex = activeIndex + newDirection;
    if (newIndex >= 0 && newIndex < tutorials.length) {
      setActiveIndex([newIndex, newDirection]);
    }
  };

  if (!tutorials.length) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br py-16 px-6 overflow-hidden">
      <div className="container mx-auto relative">
        <motion.h1 className="text-6xl font-bold text-center mb-6">
          {i("h1title")}
        </motion.h1>
        <div className="relative h-[800px] mb-8">
          <AnimatePresence initial={false} custom={direction}>
            <TutorialCard
              key={activeIndex}
              tutorial={tutorials[activeIndex]}
              isActive={true}
              direction={direction}
              onOpenModal={() => setIsModalOpen(true)}
            />
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center gap-6">
          <Button
            onClick={() => paginate(-1)}
            disabled={activeIndex === 0}
            className="rounded-full w-16 h-16"
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            onClick={() => paginate(1)}
            disabled={activeIndex === tutorials.length - 1}
            className="rounded-full w-16 h-16"
          >
            <ChevronRight size={24} />
          </Button>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoId={tutorials[activeIndex]?.videoId}
        />
      </div>
    </div>
  );
};

export default TutorialsCarousel;
