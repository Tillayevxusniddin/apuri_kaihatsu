
// "use client";
//
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Book, X } from 'lucide-react';
//
// interface Tutorial {
//   id: number;
//   title: string;
//   description: string;
//   content: string;
// }
//
// const TutorialCard: React.FC<{ tutorial: Tutorial; onClick: () => void }> = ({ tutorial, onClick }) => (
//   <motion.button
//     layout
//     onClick={onClick}
//     className="w-full text-left p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 space-y-3"
//     whileHover={{ y: -5 }}
//   >
//     <div className="flex items-center space-x-3">
//       <Book className="text-green-500" size={24} />
//       <h2 className="text-xl font-semibold text-gray-800">{tutorial.title}</h2>
//     </div>
//     <p className="text-gray-600">{tutorial.description}</p>
//   </motion.button>
// );
//
// export default function TutorialsPage() {
//   const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);
//
//   const tutorials: Tutorial[] = [
//     {
//       id: 1,
//       title: "Messages",
//       description: "Learn the basics of Next.js and how to build modern web applications.",
//       content: "Next.js is a React framework that enables server-side rendering and static site generation. It provides a great developer experience with features like automatic code splitting, optimized prefetching, and more.",
//     },
//     {
//       id: 2,
//       title: "Students",
//       description: "Understand the core concepts of React and start building your own components.",
//       content: "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called 'components'. React's declarative syntax and component-based architecture make it easy to create interactive UIs.",
//     },
//     {
//       id: 3,
//       title: "Groups",
//       description: "Get started with TypeScript and write more reliable JavaScript code.",
//       content: "TypeScript is a strongly typed programming language that builds on JavaScript. It adds optional static typing, classes, and modules to JavaScript, which enables developers to write more robust and maintainable code. TypeScript compiles to clean, simple JavaScript code which runs on any browser, in Node.js, or in any JavaScript engine that supports ECMAScript 3 or newer.",
//     },
//     {
//       id: 4,
//       title: "Parents",
//       description: "Get started with TypeScript and write more reliable JavaScript code.",
//       content: "TypeScript is a strongly typed programming language that builds on JavaScript. It adds optional static typing, classes, and modules to JavaScript, which enables developers to write more robust and maintainable code. TypeScript compiles to clean, simple JavaScript code which runs on any browser, in Node.js, or in any JavaScript engine that supports ECMAScript 3 or newer.",
//     },
//     {
//       id: 5,
//       title: "Admins",
//       description: "Get started with TypeScript and write more reliable JavaScript code.",
//       content: "TypeScript is a strongly typed programming language that builds on JavaScript. It adds optional static typing, classes, and modules to JavaScript, which enables developers to write more robust and maintainable code. TypeScript compiles to clean, simple JavaScript code which runs on any browser, in Node.js, or in any JavaScript engine that supports ECMAScript 3 or newer.",
//     },
//     {
//       id: 6,
//       title: "Forms",
//       description: "Get started with TypeScript and write more reliable JavaScript code.",
//       content: "TypeScript is a strongly typed programming language that builds on JavaScript. It adds optional static typing, classes, and modules to JavaScript, which enables developers to write more robust and maintainable code. TypeScript compiles to clean, simple JavaScript code which runs on any browser, in Node.js, or in any JavaScript engine that supports ECMAScript 3 or newer.",
//     },
//   ];
//
//   const openModal = (tutorial: Tutorial) => setActiveTutorial(tutorial);
//   const closeModal = () => setActiveTutorial(null);
//
//   return (
//     <div className="container mx-auto py-16 px-6 space-y-12">
//       <motion.h1
//         className="text-4xl md:text-5xl font-bold text-center text-gray-900"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Tutorials
//       </motion.h1>
//       <motion.div
//         className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//       >
//         {tutorials.map((tutorial) => (
//           <TutorialCard key={tutorial.id} tutorial={tutorial} onClick={() => openModal(tutorial)} />
//         ))}
//       </motion.div>
//
//       {/* Modal */}
//       <AnimatePresence>
//         {activeTutorial && (
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 20, stiffness: 300 }}
//             >
//               <button
//                 onClick={closeModal}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//                 aria-label="Close modal"
//               >
//                 <X size={24} />
//               </button>
//               <h2 className="text-3xl font-bold mb-4 text-gray-900">{activeTutorial.title}</h2>
//               <p className="text-gray-700 mb-6 text-lg leading-relaxed">{activeTutorial.content}</p>
//               <button
//                 onClick={closeModal}
//                 className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
//               >
//                 Close
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Users, MessageSquare, Settings, UserCheck, Pencil } from 'lucide-react';

interface Tutorial {
  id: number;
  title: string;
  description: string;
  content: string;
  icon: React.ReactNode; // Har bir kartaga mos ikonka
}

const TutorialCard: React.FC<{ tutorial: Tutorial; onClick: () => void }> = ({ tutorial, onClick }) => (
  <motion.button
    layout
    onClick={onClick}
    className="w-full text-left p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-600 space-y-3"
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center space-x-3">
      {tutorial.icon} {/* Bu yerda ikonka chiqariladi */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{tutorial.title}</h2>
    </div>
    <p className="text-gray-600 dark:text-gray-400">{tutorial.description}</p>
  </motion.button>
);

const TutorialsPage: React.FC = () => {
  const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);

  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: "Messages",
      description: "Learn to write and manage messages for groups or students.",
      content: "This tutorial covers the process of creating, sending, and managing messages for groups or students. You will learn how to effectively communicate within a group setting, how to create message templates for repetitive tasks, and how to ensure your messages are clear and well-organized. Additionally, this guide will cover how to manage incoming and outgoing communications, including filtering, sorting, and deleting messages as needed.",
      icon: <MessageSquare className="text-blue-500" size={24} />,
    },
    {
      id: 2,
      title: "Students",
      description: "Create and manage student records with CRUD operations.",
      content: "In this tutorial, you'll learn how to create, read, update, and delete student records in a database. We'll walk you through the entire process, from setting up a student database to implementing CRUD operations through a user-friendly interface. You will also learn how to validate student data to ensure accuracy and consistency. Furthermore, we will cover best practices for managing student data securely and efficiently, and how to organize the data for easy retrieval.",
      icon: <Users className="text-green-500" size={24} />,
    },
    {
      id: 3,
      title: "Groups",
      description: "Create and manage groups with CRUD operations.",
      content: "This tutorial focuses on how to create and manage groups, perform CRUD operations on group data, and handle tasks related to group communication. You'll learn how to set up groups based on different categories such as classes, departments, or special projects. Additionally, we’ll cover how to modify group settings, add or remove members, and delete entire groups if necessary. By the end of this tutorial, you'll be able to organize and manage groups effectively within your system.",
      icon: <Settings className="text-purple-500" size={24} />,
    },
    {
      id: 4,
      title: "Parents",
      description: "Create and manage parent profiles with CRUD operations.",
      content: "In this tutorial, you'll learn how to create and manage parent profiles within a system, including performing CRUD operations on their data. We'll cover how to capture essential parent information such as contact details, relationships to students, and preferences for communication. You'll also learn how to update and delete parent profiles, ensuring the data remains up-to-date. This guide will help you understand how to integrate parent data with student records to enhance communication and involvement in the educational process.",
      icon: <UserCheck className="text-pink-500" size={24} />,
    },
    {
      id: 5,
      title: "Admins",
      description: "Manage admin roles and CRUD operations.",
      content: "This tutorial will guide you through the process of managing admin roles within your system. You'll learn how to create admin profiles, assign roles, and handle admin permissions to ensure effective application administration. We'll also cover how to perform CRUD operations on admin data, enabling you to manage access, update admin details, and delete profiles when necessary. Additionally, we will discuss best practices for securing admin accounts and managing admin-related tasks in a secure and organized manner.",
      icon: <Book className="text-red-500" size={24} />,
    },
    {
      id: 6,
      title: "Forms",
      description: "Handle form inputs and validation in React.",
      content: "In this tutorial, you'll cover everything you need to know about handling forms in React, including how to create, validate, and manage form submissions. We’ll teach you how to implement input validation to ensure that all user-provided data is correct and meets the required format. The tutorial also dives into handling dynamic form inputs, managing state, and preventing common issues like form data loss. By the end of this tutorial, you'll know how to manage user inputs efficiently and handle form submissions with ease.",
      icon: <Pencil className="text-orange-500" size={24} />,
    },
  ];



  const openModal = (tutorial: Tutorial) => setActiveTutorial(tutorial);
  const closeModal = () => setActiveTutorial(null);

  return (
    <div className="container mx-auto py-16 px-6">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white"
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
      >
        Tutorials
      </motion.h1>
      <motion.p
        className="text-lg text-center text-gray-500 dark:text-gray-400 mt-6 py-5"
        initial={{opacity: 0, y: -10}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.2, duration: 0.5}}
      >
        The most important sections
      </motion.p>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.2, duration: 0.5}}
      >
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} onClick={() => openModal(tutorial)}/>
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {activeTutorial && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-6"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-8 relative"
              initial={{scale: 0.9, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              exit={{scale: 0.9, opacity: 0}}
              transition={{type: "spring", damping: 20, stiffness: 300}}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700"
                aria-label="Close modal"
              >
                X
              </button>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{activeTutorial.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">{activeTutorial.content}</p>
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TutorialsPage;




