// import React from "react";
// import { Link } from "@/navigation";
//
//
// const IntroductionPage: React.FC = () => {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 px-6">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl items-center">
//         {/* Left Content */}
//         <div>
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
//             Start your journey with{" "}
//             <span className="text-green-500">Introduction</span>
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
//             A modern and efficient admin management system for seamless university administration.
//           </p>
//           <div className="flex gap-4">
//             <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">
//               Admin page
//             </button>
//             <Link href='/getstarted'>
//               <button className="text-gray-700 dark:text-gray-300 underline">
//                 Get started →
//               </button>
//             </Link>
//
//           </div>
//         </div>
//
//         {/* Right Image Section */}
//         <div className="relative">
//           <img
//             // src="https://via.placeholder.com/500x500"
//             src="https://farm9.staticflickr.com/8410/30193245810_7b7ff74cd5.jpg"
//             alt="Hero Section"
//             className="w-full h-auto rounded-lg shadow-lg object-cover"
//           />
//           {/* User Comments */}
//           <div className="absolute top-4 left-4 bg-white rounded-lg shadow p-2 flex items-center gap-2">
//             <img
//               src="https://via.placeholder.com/32"
//               alt="Julia"
//               className="w-8 h-8 rounded-full"
//             />
//             <p className="text-sm font-medium text-gray-800">Julia</p>
//             <span className="text-gray-600 text-sm">Fantastic theme!</span>
//           </div>
//           <div className="absolute bottom-4 left-8 bg-orange-500 text-white rounded-lg shadow p-2 flex items-center gap-2">
//             <img
//               src="https://via.placeholder.com/32"
//               alt="Michael"
//               className="w-8 h-8 rounded-full"
//             />
//             <p className="text-sm font-medium">Michael</p>
//             <span className="text-sm">Excellent documentation 👏</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default IntroductionPage;


"use client"

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';

const IntroductionPage: React.FC = () => {
  const i = useTranslations("intro");
  const t = useTranslations("nav");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 dark:from-green-800 dark:to-blue-900 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl items-center"
      >
        {/* Left Content */}
        <div className="space-y-8">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {i("start your journey with")} <span className="text-yellow-300">{t("introduction")}</span>
          </motion.h1>
          <motion.p
            className="text-white text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {i("administration")}
          </motion.p>
          <motion.div
            className="flex gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="/messages">
              <button className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-100 transition duration-300 transform hover:scale-105">
                {i("skip")}
              </button>
            </Link>
            <Link href='/getstarted'>
              <button className="text-white text-lg font-semibold flex items-center group">
                {i("get started")}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Right Image Section */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <img
            src="https://farm9.staticflickr.com/8410/30193245810_7b7ff74cd5.jpg"
            alt="Hero Section"
            className="w-full h-auto rounded-2xl shadow-2xl object-cover"
          />
          {/* User Comments */}
          <motion.div
            className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <img
              src="https://i.pravatar.cc/40?img=1"
              alt="Julia"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">Julia</p>
              <span className="text-gray-600 text-sm">{i("fantastic theme!")}</span>
            </div>
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-4 bg-orange-500 text-white rounded-lg shadow-lg p-3 flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <img
              src="https://i.pravatar.cc/40?img=2"
              alt="Michael"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">Michael</p>
              <span className="text-sm">{i("excellent documentation")}</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntroductionPage;
