import React from "react";
import { AnimatePresence, motion } from "framer-motion";

function AnimationWrapper({ children}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
          delay: 0,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimationWrapper;
