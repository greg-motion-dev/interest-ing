import { motion } from "motion/react";
import { useState } from "react";

export function TestComponent() {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, x: 100 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="w-50 h-50 bg-[var(--color-primary-500)]"
      />
      <motion.div
        className="w-20 h-20 bg-[var(--color-secondary-500)]"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.5 },
        }}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        onClick={() => setIsVisible(!isVisible)}
      />
      <motion.div
        className="w-20 h-20 bg-[var(--color-accent-500)]"
        animate={{
          scale: [1, 2, 3, 2, 1],
          transition: { duration: 5 },
          borderRadius: ["20%", "50%", "10%"],
        }}
      />
      <motion.div
        className="w-20 h-20 bg-orange-500"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 500 }}
      />
      <motion.div
        className="w-10 h-10 bg-pink-500"
        whileTap={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 500 }}
      />
      <motion.div className="w-10 h-10 bg-green-500" drag />
    </div>
  );
}
/*---TESTING CALCULATION---*/
