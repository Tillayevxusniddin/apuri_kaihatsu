// import React, { useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from "@/components/ui/button";
// import Particles from 'react-particles';
// import { loadFull } from "tsparticles";
// import type { Container, Engine } from "tsparticles-engine";
//
// interface EnhancedTutorialModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   content: string;
// }
//
// const EnhancedTutorialModal: React.FC<EnhancedTutorialModalProps> = ({ isOpen, onClose, title, content }) => {
//   const particlesInit = async (main: Engine) => {
//     await loadFull(main);
//   };
//
//   const particlesLoaded = async (container: Container | undefined) => {
//     console.log(container);
//   };
//
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl shadow-2xl max-w-2xl w-full p-8 relative overflow-hidden"
//             initial={{ scale: 0.9, opacity: 0, y: 20 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.9, opacity: 0, y: 20 }}
//             transition={{ type: "spring", damping: 20, stiffness: 300 }}
//           >
//             <Particles
//               id="tsparticles"
//               init={particlesInit}
//               loaded={particlesLoaded}
//               options={{
//                 background: {
//                   color: {
//                     value: "transparent",
//                   },
//                 },
//                 fpsLimit: 120,
//                 interactivity: {
//                   events: {
//                     onClick: {
//                       enable: true,
//                       mode: "push",
//                     },
//                     onHover: {
//                       enable: true,
//                       mode: "repulse",
//                     },
//                     resize: true,
//                   },
//                   modes: {
//                     push: {
//                       quantity: 4,
//                     },
//                     repulse: {
//                       distance: 200,
//                       duration: 0.4,
//                     },
//                   },
//                 },
//                 particles: {
//                   color: {
//                     value: "#ffffff",
//                   },
//                   links: {
//                     color: "#ffffff",
//                     distance: 150,
//                     enable: true,
//                     opacity: 0.5,
//                     width: 1,
//                   },
//                   collisions: {
//                     enable: true,
//                   },
//                   move: {
//                     direction: "none",
//                     enable: true,
//                     outModes: {
//                       default: "bounce",
//                     },
//                     random: false,
//                     speed: 2,
//                     straight: false,
//                   },
//                   number: {
//                     density: {
//                       enable: true,
//                       area: 800,
//                     },
//                     value: 80,
//                   },
//                   opacity: {
//                     value: 0.5,
//                   },
//                   shape: {
//                     type: "circle",
//                   },
//                   size: {
//                     value: { min: 1, max: 5 },
//                   },
//                 },
//                 detectRetina: true,
//               }}
//             />
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute top-4 right-4 text-white"
//               onClick={onClose}
//             >
//               <span className="sr-only">Close</span>
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
//             </Button>
//             <motion.h2
//               className="text-4xl font-bold mb-4 text-white relative z-10"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//             >
//               {title}
//             </motion.h2>
//             <motion.p
//               className="text-white text-lg leading-relaxed relative z-10"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4, duration: 0.5 }}
//             >
//               {content.split('').map((char, index) => (
//                 <motion.span
//                   key={index}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.5 + index * 0.01 }}
//                 >
//                   {char}
//                 </motion.span>
//               ))}
//             </motion.p>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };
//
// export default EnhancedTutorialModal;
//
