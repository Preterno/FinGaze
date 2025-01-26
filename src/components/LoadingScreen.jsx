import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-light-black p-12 rounded-2xl flex flex-col items-center shadow-[0_0_15px_rgba(219,245,8,0.1)] hover:shadow-[0_0_30px_rgba(219,245,8,0.125)] transition-all duration-300"
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.1 },
        }}
      >
        <motion.div
          className="mb-6"
          initial={{ scale: 0.65, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <i className="bi bi-graph-up text-2xl text-yellow"></i>
            <span className="text-4xl font-semibold text-white">FinGaze</span>
          </div>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full bg-yellow"
              animate={{
                y: [-10, 0, -10],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className="mt-4 text-white text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading your portfolio...
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
