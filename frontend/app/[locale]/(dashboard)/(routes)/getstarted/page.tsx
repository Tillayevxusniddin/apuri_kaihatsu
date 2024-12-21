// import React from "react";
//
// const GetStartedPage: React.FC = () => {
//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
//           Welcome to the Education Management System
//         </h1>
//         <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
//           The Education Management System (EMS) is designed to streamline and
//           optimize university administrative tasks. With an easy-to-use interface
//           and powerful features, you can manage courses, students, staff, and more!
//         </p>
//
//         {/* Features Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
//               Manage Courses
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300">
//               Create, update, and manage courses with ease. Assign professors,
//               set schedules, and track student progress.
//             </p>
//           </div>
//
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
//               Track Students
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300">
//               Keep track of students' grades, attendance, and performance with
//               comprehensive dashboards and reports.
//             </p>
//           </div>
//
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
//               Staff Management
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300">
//               Easily manage your faculty and staff, assign roles, and keep track
//               of their work schedules.
//             </p>
//           </div>
//         </div>
//
//         {/* Call to Action */}
//         <div className="mt-12 text-center">
//           <a
//             href="#"
//             className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 transition"
//           >
//             Get Started Now
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default GetStartedPage;



"use client"

import React from "react";
import { motion } from "framer-motion";
import { Book, Users, BarChart, ArrowRight } from 'lucide-react';
import { Link } from "@/navigation";

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="text-green-500 mb-4">{icon}</div>
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h2>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

const GetStartedPage: React.FC = () => {
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
            Welcome to the Education Management System
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            The Education Management System (EMS) is designed to streamline and
            optimize university administrative tasks. With an easy-to-use interface
            and powerful features, you can manage courses, students, staff, and more!
          </motion.p>
        </div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <FeatureCard
            icon={<Book size={32} />}
            title="Parents"
            description="Send messages to parents, update their profiles, and perform various tasks related to their data management. Keep parents informed about their children's progress and ensure smooth communication."
          />
          <FeatureCard
            icon={<Users size={32} />}
            title="Track Students"
            description="Keep track of students' grades, attendance, performance, and overall progress with comprehensive dashboards, detailed reports, and analytics to make data-driven decisions."
          />
          <FeatureCard
            icon={<BarChart size={32} />}
            title="Management"
            description="Easily manage admins, assign roles, and track work schedules. View results through interactive charts and gain insights into performance. Enjoy convenient features to streamline your workflow."
          />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link
            href="/tutorial"
            className="bg-green-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-green-600 transition duration-300 inline-flex items-center group"
          >
            Open page tutorials now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GetStartedPage;


