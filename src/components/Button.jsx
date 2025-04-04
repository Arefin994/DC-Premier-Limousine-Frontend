import React from "react";
import { motion } from "framer-motion";

const CustomButton = ({ href, text, icon }) => {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05, // Pop-up effect
        translateX: -4,
        translateY: -4,
        boxShadow: "4px 4px 0px black", // Lift effect
      }}
      whileTap={{
        scale: 1,
        translateX: 0,
        translateY: 0,
        borderRadius: "16px",
        boxShadow: "none",
      }}
      transition={{ duration: 0.3 }}
      className="relative z-10 border-2 border-dashed border-black bg-emerald-400 bg-opacity-55 px-6 py-3 
      font-semibold uppercase text-black transition-all duration-300 shadow-xl shadow-emerald-500"
      style={{
        clipPath: "polygon(0% 0%, 90% 0%, 100% 20%, 100% 100%, 0% 100%)", // Top-right corner sliced
      }}
    >
      <div className="flex items-center justify-center gap-2">
        {text} {icon}
      </div>
    </motion.a>
  );
};

export default CustomButton;
