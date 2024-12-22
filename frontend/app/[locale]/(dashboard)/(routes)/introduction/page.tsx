"use client"

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import {useActiveState} from "@/hooks/useActiveState";

const IntroductionPage: React.FC = () => {
  const i = useTranslations("intro");
  const t = useTranslations("nav");
  const { pathname , getActiveState } = useActiveState();

  const isMessagesActive = getActiveState("/messages", [
    {url: "/messages", parent: "/dashboard"},
  ])
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
            <a href="/messages">
              <button className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-100 transition duration-300 transform hover:scale-105">
                {i("skip")}
              </button>
            </a>
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



