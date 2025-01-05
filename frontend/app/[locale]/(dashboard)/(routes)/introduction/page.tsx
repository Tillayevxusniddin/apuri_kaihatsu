// "use client"
//
// import React from "react";
// import { useTranslations } from "next-intl";
// import { Link } from "@/navigation";
// import { motion } from "framer-motion";
// import { ArrowRight } from 'lucide-react';
// import {useActiveState} from "@/hooks/useActiveState";
//
// const IntroductionPage: React.FC = () => {
//   const i = useTranslations("intro");
//   const t = useTranslations("nav");
//   const { pathname , getActiveState } = useActiveState();
//
//   const isMessagesActive = getActiveState("/messages", [
//     {url: "/messages", parent: "/dashboard"},
//   ])
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 dark:from-green-800 dark:to-blue-900 px-6 py-12">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl items-center"
//       >
//         {/* Left Content */}
//         <div className="space-y-8">
//           <motion.h1
//             className="text-5xl md:text-6xl font-bold text-white mb-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//           >
//             {i("start your journey with")} <span className="text-yellow-300">{t("introduction")}</span>
//           </motion.h1>
//           <motion.p
//             className="text-white text-xl mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//           >
//             {i("administration")}
//           </motion.p>
//           <motion.div
//             className="flex gap-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//           >
//             <a href="/messages">
//               <button className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-100 transition duration-300 transform hover:scale-105">
//                 {i("skip")}
//               </button>
//             </a>
//             <Link href='/getstarted'>
//               <button className="text-white text-lg font-semibold flex items-center group">
//                 {i("get started")}
//                 <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
//               </button>
//             </Link>
//           </motion.div>
//         </div>
//
//         {/* Right Image Section */}
//         <motion.div
//           className="relative"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.4, duration: 0.5 }}
//         >
//           <img
//             src="https://farm9.staticflickr.com/8410/30193245810_7b7ff74cd5.jpg"
//             alt="Hero Section"
//             className="w-full h-auto rounded-2xl shadow-2xl object-cover"
//           />
//           {/* User Comments */}
//           <motion.div
//             className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 flex items-center gap-3"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.8, duration: 0.5 }}
//           >
//             <img
//               src="https://i.pravatar.cc/40?img=1"
//               alt="Julia"
//               className="w-10 h-10 rounded-full"
//             />
//             <div>
//               <p className="text-sm font-medium text-gray-800">Julia</p>
//               <span className="text-gray-600 text-sm">{i("fantastic theme!")}</span>
//             </div>
//           </motion.div>
//           <motion.div
//             className="absolute bottom-4 right-4 bg-orange-500 text-white rounded-lg shadow-lg p-3 flex items-center gap-3"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 1, duration: 0.5 }}
//           >
//             <img
//               src="https://i.pravatar.cc/40?img=2"
//               alt="Michael"
//               className="w-10 h-10 rounded-full"
//             />
//             <div>
//               <p className="text-sm font-medium">Michael</p>
//               <span className="text-sm">{i("excellent documentation")}</span>
//             </div>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };
//
// export default IntroductionPage;
//
//
//



// 2 versiya
//
// "use client"
//
// import React, { useState, useEffect } from "react";
// import { useTranslations } from "next-intl";
// import { Link } from "@/navigation";
// import { motion, useAnimation } from "framer-motion";
// import { ArrowRight, Star, MessageCircle, ThumbsUp } from 'lucide-react';
// import { useActiveState } from "@/hooks/useActiveState";
//
// const IntroductionPage: React.FC = () => {
//   const i = useTranslations("intro");
//   const t = useTranslations("nav");
//   const { pathname, getActiveState } = useActiveState();
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const backgroundControls = useAnimation();
//
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);
//
//   useEffect(() => {
//     backgroundControls.start({
//       background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
//     });
//   }, [mousePosition, backgroundControls]);
//
//   const isMessagesActive = getActiveState("/messages", [
//     {url: "/messages", parent: "/dashboard"},
//   ]);
//
//   return (
//     <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-green-400 to-blue-500 dark:from-green-800 dark:to-blue-900">
//       <motion.div
//         className="absolute inset-0 z-0"
//         animate={backgroundControls}
//       />
//       <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-5" />
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl items-center px-6 py-12"
//       >
//         {/* Left Content */}
//         <div className="space-y-8">
//           <motion.h1
//             className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//           >
//             {i("start your journey with")} <br />
//             <span className="text-yellow-300 inline-block transform hover:scale-105 transition-transform cursor-default">
//               {t("introduction")}
//             </span>
//           </motion.h1>
//           <motion.p
//             className="text-white text-xl mb-8 leading-relaxed"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//           >
//             {i("administration")}
//           </motion.p>
//           <motion.div
//             className="flex gap-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//           >
//             <Link href="/messages">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-100 transition duration-300 shadow-lg"
//               >
//                 {i("skip")}
//               </motion.button>
//             </Link>
//             <Link href='/getstarted'>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="text-white text-lg font-semibold flex items-center group bg-blue-600 px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
//               >
//                 {i("get started")}
//                 <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
//               </motion.button>
//             </Link>
//           </motion.div>
//         </div>
//
//         {/* Right Image Section */}
//         <motion.div
//           className="relative"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.4, duration: 0.5 }}
//         >
//           <img
//             src="https://farm9.staticflickr.com/8410/30193245810_7b7ff74cd5.jpg"
//             alt="Hero Section"
//             className="w-full h-auto rounded-2xl shadow-2xl object-cover"
//           />
//           {/* User Comments */}
//           <UserComment
//             avatar="https://i.pravatar.cc/40?img=1"
//             name="Julia"
//             comment={i("fantastic theme!")}
//             position={{ top: 4, left: 4 }}
//             delay={0.8}
//           />
//           <UserComment
//             avatar="https://i.pravatar.cc/40?img=2"
//             name="Michael"
//             comment={i("excellent documentation")}
//             position={{ bottom: 4, right: 4 }}
//             delay={1}
//             bgColor="bg-orange-500"
//           />
//           <FloatingIcon Icon={Star} delay={1.2} top="10%" left="90%" />
//           <FloatingIcon Icon={MessageCircle} delay={1.4} top="85%" left="5%" />
//           <FloatingIcon Icon={ThumbsUp} delay={1.6} top="50%" left="95%" />
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };
//
// interface UserCommentProps {
//   avatar: string;
//   name: string;
//   comment: string;
//   position: { top?: number; bottom?: number; left?: number; right?: number };
//   delay: number;
//   bgColor?: string;
// }
//
// const UserComment: React.FC<UserCommentProps> = ({ avatar, name, comment, position, delay, bgColor = "bg-white" }) => (
//   <motion.div
//     className={`absolute ${bgColor} rounded-lg shadow-lg p-3 flex items-center gap-3`}
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay, duration: 0.5 }}
//     style={position}
//   >
//     <img
//       src={avatar}
//       alt={name}
//       className="w-10 h-10 rounded-full"
//     />
//     <div>
//       <p className={`text-sm font-medium ${bgColor === "bg-white" ? "text-gray-800" : "text-white"}`}>{name}</p>
//       <span className={`text-sm ${bgColor === "bg-white" ? "text-gray-600" : "text-white"}`}>{comment}</span>
//     </div>
//   </motion.div>
// );
//
// interface FloatingIconProps {
//   Icon: React.ElementType;
//   delay: number;
//   top: string;
//   left: string;
// }
//
// const FloatingIcon: React.FC<FloatingIconProps> = ({ Icon, delay, top, left }) => (
//   <motion.div
//     className="absolute text-white opacity-50"
//     initial={{ opacity: 0, scale: 0 }}
//     animate={{ opacity: 0.5, scale: 1 }}
//     transition={{ delay, duration: 0.5 }}
//     style={{ top, left }}
//   >
//     <Icon size={24} />
//   </motion.div>
// );
//
// export default IntroductionPage;
//


"use client"

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useActiveState } from "@/hooks/useActiveState";

const IntroductionPage: React.FC = () => {
  const i = useTranslations("intro");
  const t = useTranslations("nav");
  const { pathname, getActiveState } = useActiveState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      title: i("welcome"),
      description: i("welcomeDescription"),
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
    },
    {
      title: i("messages"),
      description: i("messagesDescription"),
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: i("admin"),
      description: i("adminDescription"),
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
    },
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gray-900 text-white">
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].image}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 w-full h-full object-cover"
            alt={slides[currentSlide].title}
          />
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="relative z-20 max-w-4xl mx-auto px-4 py-16 text-center">
        <motion.h1
          key={currentSlide + "-title"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          {slides[currentSlide].title}
        </motion.h1>
        <motion.p
          key={currentSlide + "-description"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl mb-12"
        >
          {slides[currentSlide].description}
        </motion.p>
        <div className="flex justify-center space-x-4">
          <a href="/messages">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-gray-900 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300"
            >
              {i("skip")}
            </motion.button>
          </a>
          <Link href="/getstarted">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-white rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition duration-300"
            >
              {i("learn-more")}
            </motion.button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-4 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 text-white hover:text-gray-300 transition duration-300"
      >
        <ChevronLeft size={48} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 text-white hover:text-gray-300 transition duration-300"
      >
        <ChevronRight size={48} />
      </button>
    </div>
  );
};

export default IntroductionPage;

