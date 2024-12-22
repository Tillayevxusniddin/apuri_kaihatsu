//
// "use client";
//
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Book, Users, MessageSquare, Settings, UserCheck, Pencil } from 'lucide-react';
// import {useTranslations} from "next-intl";
//
// interface Tutorial {
//   id: number;
//   title: string;
//   description: string;
//   content: string;
//   icon: React.ReactNode; // Har bir kartaga mos ikonka
// }
//
// const TutorialCard: React.FC<{ tutorial: Tutorial; onClick: () => void }> = ({ tutorial, onClick }) => (
//   <motion.button
//     layout
//     onClick={onClick}
//     className="w-full text-left p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-600 space-y-3"
//     whileHover={{ y: -5 }}
//   >
//     <div className="flex items-center space-x-3">
//       {tutorial.icon} {/* Bu yerda ikonka chiqariladi */}
//       <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{tutorial.title}</h2>
//     </div>
//     <p className="text-gray-600 dark:text-gray-400">{tutorial.description}</p>
//   </motion.button>
// );
//
// const TutorialsPage: React.FC = () => {
//   const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);
//   const i = useTranslations("tutor");
//
//   const tutorials: Tutorial[] = [
//     {
//       id: 1,
//       title: i("message-t"),
//       description: i("message-d"),
//       content: i("message-c"),
//       icon: <MessageSquare className="text-blue-500" size={24} />,
//     },
//     {
//       id: 2,
//       title: i("student-t"),
//       description: i("student-d"),
//       content: i("student-c"),
//       icon: <Users className="text-green-500" size={24} />,
//     },
//     {
//       id: 3,
//       title: i("groups-t"),
//       description: i("groups-d"),
//       content: i("groups-c"),
//       icon: <Settings className="text-purple-500" size={24} />,
//     },
//     {
//       id: 4,
//       title: i("parents-t"),
//       description: i("parents-d"),
//       content: i("parents-c"),
//       icon: <UserCheck className="text-pink-500" size={24} />,
//     },
//     {
//       id: 5,
//       title: i("admins-t"),
//       description: i("admins-d"),
//       content: i("admins-c"),
//       icon: <Book className="text-red-500" size={24} />,
//     },
//     {
//       id: 6,
//       title: i("forms-t"),
//       description: i("forms-d"),
//       content: i("forms-c"),
//       icon: <Pencil className="text-orange-500" size={24} />,
//     },
//   ];
//
//
//
//   const openModal = (tutorial: Tutorial) => setActiveTutorial(tutorial);
//   const closeModal = () => setActiveTutorial(null);
//
//   return (
//     <div className="container mx-auto py-16 px-6">
//       <motion.h1
//         className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white"
//         initial={{opacity: 0, y: -20}}
//         animate={{opacity: 1, y: 0}}
//         transition={{duration: 0.5}}
//       >
//         {i("h1title")}
//       </motion.h1>
//       <motion.p
//         className="text-lg text-center text-gray-500 dark:text-gray-400 mt-6 py-5"
//         initial={{opacity: 0, y: -10}}
//         animate={{opacity: 1, y: 0}}
//         transition={{delay: 0.2, duration: 0.5}}
//       >
//         {i("p-subtitle")}
//       </motion.p>
//
//       <motion.div
//         className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
//         initial={{opacity: 0, y: 20}}
//         animate={{opacity: 1, y: 0}}
//         transition={{delay: 0.2, duration: 0.5}}
//       >
//         {tutorials.map((tutorial) => (
//           <TutorialCard key={tutorial.id} tutorial={tutorial} onClick={() => openModal(tutorial)}/>
//         ))}
//       </motion.div>
//
//       {/* Modal */}
//       <AnimatePresence>
//         {activeTutorial && (
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-6"
//             initial={{opacity: 0}}
//             animate={{opacity: 1}}
//             exit={{opacity: 0}}
//           >
//             <motion.div
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-8 relative"
//               initial={{scale: 0.9, opacity: 0}}
//               animate={{scale: 1, opacity: 1}}
//               exit={{scale: 0.9, opacity: 0}}
//               transition={{type: "spring", damping: 20, stiffness: 300}}
//             >
//               <button
//                 onClick={closeModal}
//                 className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700"
//                 aria-label="Close modal"
//               >
//                 X
//               </button>
//               <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{activeTutorial.title}</h2>
//               <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">{activeTutorial.content}</p>
//               <button
//                 onClick={closeModal}
//                 className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
//               >
//                 {i("close")}
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };
//
// export default TutorialsPage;
//
//
//
//
//   2 versiya ------------------------------------
//
// "use client";
//
// import React, { useState } from "react";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import { Book, Users, MessageSquare, Settings, UserCheck, Pencil } from 'lucide-react';
// import { useTranslations } from "next-intl";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//
// interface Tutorial {
//   id: number;
//   title: string;
//   description: string;
//   content: string;
//   icon: React.ReactNode;
// }
//
// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.1,
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   }),
// };
//
// const TutorialCard: React.FC<{ tutorial: Tutorial; onClick: () => void; index: number }> = ({ tutorial, onClick, index }) => (
//   <motion.div
//     variants={cardVariants}
//     initial="hidden"
//     animate="visible"
//     custom={index}
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//   >
//     <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={onClick}>
//       <CardHeader>
//         <CardTitle className="flex items-center space-x-3">
//           <div className="p-2 rounded-full bg-primary/10">
//             {tutorial.icon}
//           </div>
//           <span>{tutorial.title}</span>
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p className="text-muted-foreground">{tutorial.description}</p>
//       </CardContent>
//     </Card>
//   </motion.div>
// );
//
// const TutorialsPage: React.FC = () => {
//   const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);
//   const i = useTranslations("tutor");
//
//   const tutorials: Tutorial[] = [
//     {
//       id: 1,
//       title: i("message-t"),
//       description: i("message-d"),
//       content: i("message-c"),
//       icon: <MessageSquare className="text-blue-500" size={24} />,
//     },
//     {
//       id: 2,
//       title: i("student-t"),
//       description: i("student-d"),
//       content: i("student-c"),
//       icon: <Users className="text-green-500" size={24} />,
//     },
//     {
//       id: 3,
//       title: i("groups-t"),
//       description: i("groups-d"),
//       content: i("groups-c"),
//       icon: <Settings className="text-purple-500" size={24} />,
//     },
//     {
//       id: 4,
//       title: i("parents-t"),
//       description: i("parents-d"),
//       content: i("parents-c"),
//       icon: <UserCheck className="text-pink-500" size={24} />,
//     },
//     {
//       id: 5,
//       title: i("admins-t"),
//       description: i("admins-d"),
//       content: i("admins-c"),
//       icon: <Book className="text-red-500" size={24} />,
//     },
//     {
//       id: 6,
//       title: i("forms-t"),
//       description: i("forms-d"),
//       content: i("forms-c"),
//       icon: <Pencil className="text-orange-500" size={24} />,
//     },
//   ];
//
//   const openModal = (tutorial: Tutorial) => setActiveTutorial(tutorial);
//   const closeModal = () => setActiveTutorial(null);
//
//   return (
//     <div className="container mx-auto py-16 px-6">
//       <motion.h1
//         className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         {i("h1title")}
//       </motion.h1>
//       <motion.p
//         className="text-lg text-center text-muted-foreground mt-6 mb-12"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//       >
//         {i("p-subtitle")}
//       </motion.p>
//
//       <motion.div
//         className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.4, duration: 0.5 }}
//       >
//         {tutorials.map((tutorial, index) => (
//           <TutorialCard key={tutorial.id} tutorial={tutorial} onClick={() => openModal(tutorial)} index={index} />
//         ))}
//       </motion.div>
//
//       <AnimatePresence>
//         {activeTutorial && (
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-background rounded-xl shadow-2xl max-w-2xl w-full p-8 relative"
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 20, stiffness: 300 }}
//             >
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute top-4 right-4"
//                 onClick={closeModal}
//               >
//                 <span className="sr-only">Close</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
//               </Button>
//               <motion.h2
//                 className="text-3xl font-bold mb-4 text-foreground"
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 {activeTutorial.title}
//               </motion.h2>
//               <motion.p
//                 className="text-muted-foreground mb-6 text-lg leading-relaxed"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 {activeTutorial.content}
//               </motion.p>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <Button onClick={closeModal}>
//                   {i("close")}
//                 </Button>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };
//
// export default TutorialsPage;


// 3 versiya ------------------------------
//
// "use client";
//
// import React, { useState } from "react";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import { Book, Users, MessageSquare, Settings, UserCheck, Pencil, Play } from 'lucide-react';
// import { useTranslations } from "next-intl";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//
// interface Tutorial {
//   id: number;
//   title: string;
//   description: string;
//   content: string;
//   icon: React.ReactNode;
// }
//
// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.1,
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   }),
// };
//
// const TutorialCard: React.FC<{ tutorial: Tutorial; onClick: () => void; index: number }> = ({ tutorial, onClick, index }) => (
//   <motion.div
//     variants={cardVariants}
//     initial="hidden"
//     animate="visible"
//     custom={index}
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//   >
//     <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={onClick}>
//       <CardHeader>
//         <CardTitle className="flex items-center space-x-3">
//           <div className="p-2 rounded-full bg-primary/10">
//             {tutorial.icon}
//           </div>
//           <span>{tutorial.title}</span>
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p className="text-muted-foreground">{tutorial.description}</p>
//       </CardContent>
//     </Card>
//   </motion.div>
// );
//
// const VideoIcon: React.FC = () => (
//   <motion.div
//     className="absolute top-4 left-4 text-primary"
//     initial={{ scale: 0.5, opacity: 0 }}
//     animate={{ scale: 1, opacity: 1 }}
//     transition={{
//       duration: 0.5,
//       repeat: Infinity,
//       repeatType: "reverse",
//     }}
//   >
//     <Play size={24} />
//   </motion.div>
// );
//
// const TutorialsPage: React.FC = () => {
//   const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);
//   const i = useTranslations("tutor");
//
//   const tutorials: Tutorial[] = [
//     {
//       id: 1,
//       title: i("message-t"),
//       description: i("message-d"),
//       content: i("message-c"),
//       icon: <MessageSquare className="text-blue-500" size={24} />,
//     },
//     {
//       id: 2,
//       title: i("student-t"),
//       description: i("student-d"),
//       content: i("student-c"),
//       icon: <Users className="text-green-500" size={24} />,
//     },
//     {
//       id: 3,
//       title: i("groups-t"),
//       description: i("groups-d"),
//       content: i("groups-c"),
//       icon: <Settings className="text-purple-500" size={24} />,
//     },
//     {
//       id: 4,
//       title: i("parents-t"),
//       description: i("parents-d"),
//       content: i("parents-c"),
//       icon: <UserCheck className="text-pink-500" size={24} />,
//     },
//     {
//       id: 5,
//       title: i("admins-t"),
//       description: i("admins-d"),
//       content: i("admins-c"),
//       icon: <Book className="text-red-500" size={24} />,
//     },
//     {
//       id: 6,
//       title: i("forms-t"),
//       description: i("forms-d"),
//       content: i("forms-c"),
//       icon: <Pencil className="text-orange-500" size={24} />,
//     },
//   ];
//
//   const openModal = (tutorial: Tutorial) => setActiveTutorial(tutorial);
//   const closeModal = () => setActiveTutorial(null);
//
//   return (
//     <div className="container mx-auto py-16 px-6">
//       <motion.h1
//         className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         {i("h1title")}
//       </motion.h1>
//       <motion.p
//         className="text-lg text-center text-muted-foreground mt-6 mb-12"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//       >
//         {i("p-subtitle")}
//       </motion.p>
//
//       <motion.div
//         className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.4, duration: 0.5 }}
//       >
//         {tutorials.map((tutorial, index) => (
//           <TutorialCard key={tutorial.id} tutorial={tutorial} onClick={() => openModal(tutorial)} index={index} />
//         ))}
//       </motion.div>
//
//       <AnimatePresence>
//         {activeTutorial && (
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-background rounded-xl shadow-2xl max-w-2xl w-full p-8 relative"
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 20, stiffness: 300 }}
//             >
//               <VideoIcon />
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute top-4 right-4"
//                 onClick={closeModal}
//               >
//                 <span className="sr-only">Close</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
//               </Button>
//               <motion.h2
//                 className="text-3xl font-bold mb-4 text-foreground"
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 {activeTutorial.title}
//               </motion.h2>
//               <motion.p
//                 className="text-muted-foreground mb-6 text-lg leading-relaxed"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 {activeTutorial.content}
//               </motion.p>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <Button onClick={closeModal}>
//                   {i("close")}
//                 </Button>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };
//
// export default TutorialsPage;

// 4 versiya

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Book, Users, MessageSquare, Settings, UserCheck, Pencil } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Tutorial {
  id: number;
  title: string;
  description: string;
  content: string;
  icon: React.ReactNode;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  }),
};

const TutorialCard: React.FC<{ tutorial: Tutorial; onClick: () => void; index: number }> = ({ tutorial, onClick, index }) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    custom={index}
    whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
    whileTap={{ scale: 0.95 }}
  >
    <Card className="h-full cursor-pointer transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900" onClick={onClick}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <motion.div
            className="p-2 rounded-full bg-primary/10"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {tutorial.icon}
          </motion.div>
          <span>{tutorial.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{tutorial.description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const ModalContent: React.FC<{ tutorial: Tutorial; onClose: () => void }> = ({ tutorial, onClose }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-8 relative overflow-hidden"
    initial={{ scale: 0.9, opacity: 0, y: 50 }}
    animate={{ scale: 1, opacity: 1, y: 0 }}
    exit={{ scale: 0.9, opacity: 0, y: 50 }}
    transition={{ type: "spring", damping: 20, stiffness: 300 }}
  >
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 right-4"
      onClick={onClose}
    >
      <span className="sr-only">Close</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </Button>
    <motion.h2
      className="text-3xl font-bold mb-4 text-foreground"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {tutorial.title}
    </motion.h2>
    <motion.p
      className="text-muted-foreground mb-6 text-lg leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {tutorial.content.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.01 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <Button onClick={onClose}>Close</Button>
    </motion.div>
  </motion.div>
);

const TutorialsPage: React.FC = () => {
  const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);
  const i = useTranslations("tutor");

  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: i("message-t"),
      description: i("message-d"),
      content: i("message-c"),
      icon: <MessageSquare className="text-blue-500" size={24} />,
    },
    {
      id: 2,
      title: i("student-t"),
      description: i("student-d"),
      content: i("student-c"),
      icon: <Users className="text-green-500" size={24} />,
    },
    {
      id: 3,
      title: i("groups-t"),
      description: i("groups-d"),
      content: i("groups-c"),
      icon: <Settings className="text-purple-500" size={24} />,
    },
    {
      id: 4,
      title: i("parents-t"),
      description: i("parents-d"),
      content: i("parents-c"),
      icon: <UserCheck className="text-pink-500" size={24} />,
    },
    {
      id: 5,
      title: i("admins-t"),
      description: i("admins-d"),
      content: i("admins-c"),
      icon: <Book className="text-red-500" size={24} />,
    },
    {
      id: 6,
      title: i("forms-t"),
      description: i("forms-d"),
      content: i("forms-c"),
      icon: <Pencil className="text-orange-500" size={24} />,
    },
  ];

  const openModal = (tutorial: Tutorial) => setActiveTutorial(tutorial);
  const closeModal = () => setActiveTutorial(null);

  return (
    <div className="container mx-auto py-16 px-6">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        {i("h1title")}
      </motion.h1>
      <motion.p
        className="text-lg text-center text-muted-foreground mt-6 mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        {i("p-subtitle")}
      </motion.p>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {tutorials.map((tutorial, index) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} onClick={() => openModal(tutorial)} index={index} />
        ))}
      </motion.div>

      <AnimatePresence>
        {activeTutorial && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent tutorial={activeTutorial} onClose={closeModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TutorialsPage;




