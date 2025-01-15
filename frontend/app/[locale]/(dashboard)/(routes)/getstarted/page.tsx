//
// "use client"
//
// import React from "react";
// import { motion } from "framer-motion";
// import { Book, Users, BarChart, ArrowRight } from 'lucide-react';
// import { Link } from "@/navigation";
// import {useTranslations} from "next-intl";
//
// const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
//   <motion.div
//     className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//     whileHover={{ y: -5 }}
//   >
//     <div className="text-green-500 mb-4">{icon}</div>
//     <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h2>
//     <p className="text-gray-600 dark:text-gray-300">{description}</p>
//   </motion.div>
// );
//
// const GetStartedPage: React.FC = () => {
//   const i = useTranslations("getstart");
//   return (
//     <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 min-h-screen py-16 px-6">
//       <motion.div
//         className="max-w-7xl mx-auto space-y-12"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="text-center">
//           <motion.h1
//             className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//           >
//             {i("h1welcome")}
//           </motion.h1>
//           <motion.p
//             className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//           >
//             {i("ptexts")}
//           </motion.p>
//         </div>
//
//         {/* Features Section */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.5 }}
//         >
//           <FeatureCard
//             icon={<Book size={32} />}
//             title={i("parents")}
//             description={i("parents-text")}
//           />
//           <FeatureCard
//             icon={<Users size={32} />}
//             title={i("track-students")}
//             description={i("track-text")}
//           />
//           <FeatureCard
//             icon={<BarChart size={32} />}
//             title={i("management")}
//             description={i("management-text")}
//           />
//         </motion.div>
//
//         {/* Call to Action */}
//         <motion.div
//           className="mt-16 text-center"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8, duration: 0.5 }}
//         >
//           <Link
//             href="/tutorial"
//             className="bg-green-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-green-600 transition duration-300 inline-flex items-center group"
//           >
//             {i("buttontutorial")}
//             <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
//           </Link>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };
//
// export default GetStartedPage;
//
//
//
//
//
//
//
//
//
//


"use client"

import React from "react"
import { motion } from "framer-motion"
import { Book, Users, BarChart, ArrowRight, MessageCircle, Calendar, Award, Smile } from 'lucide-react'
import { Link } from "@/navigation"
import { useTranslations } from "next-intl"
import Image from "next/image"

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="text-green-500 mb-4">{icon}</div>
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h2>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
)

const GetStartedPage: React.FC = () => {
  const i = useTranslations("getstart")
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 min-h-screen py-16 px-6">
      <motion.div
        className="max-w-7xl mx-auto space-y-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {i("h1welcome")}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {i("ptexts")}
          </motion.p>
        </div>

        {/* Happy Parents Image Section */}
        <motion.div
          className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}

        >
          <Image
            src="https://www.sunlife.co.id/content/dam/sunlife/legacy/assets/id/Life%20Moments/Building%20a%20Family/OG%20Images_L4%20Life%20Moments_Building%20a%20Family_7%20Ways%20to%20Make%20Your%20Parents%20Happy.jpg"
            alt="Happy Parents"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{i("img-h1")}</h2>
            <p className="text-xl">{i("img-p")}</p>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <FeatureCard
            icon={<MessageCircle size={32} />}
            title={i("d-title")}
            description={i("d-description")}
          />
          <FeatureCard
            icon={<Calendar size={32} />}
            title={i("e-title")}
            description={i("e-description")}
          />
          <FeatureCard
            icon={<Award size={32} />}
            title={i("c-title")}
            description={i("c-description")}
          />
          <FeatureCard
            icon={<Book size={32} />}
            title={i("parents")}
            description={i("parents-text")}
          />
          <FeatureCard
            icon={<Users size={32} />}
            title={i("track-students")}
            description={i("track-text")}
          />
          <FeatureCard
            icon={<BarChart size={32} />}
            title={i("management")}
            description={i("management-text")}
          />
        </motion.div>

        {/* Parent Testimonial */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <Smile className="text-yellow-500 mr-2" size={24} />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{i("parent-testmon")}</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 italic">
            {i("parent-comment")}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2"> {i("parent-name")}</p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Link
            href="/tutorial"
            className="bg-green-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-green-600 transition duration-300 inline-flex items-center group"
          >
            {i("buttontutorial")}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default GetStartedPage

