import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - DC Premier Limo</title>
        <meta
          name="description"
          content="The page you are looking for does not exist. Return to the homepage or explore our luxury transportation services."
        />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-4">
        <div className="max-w-md w-full mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Animated 404 number */}
            <motion.div
              className="relative mb-8"
              animate={{
                rotate: [0, -5, 5, -3, 3, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <span className="text-[#FFD700] text-9xl font-bold tracking-tighter">
                404
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent opacity-70"></div>
            </motion.div>

            <motion.h1
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Lost in Luxury
            </motion.h1>

            <motion.p
              className="text-[#AAAAAA] mb-8 text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              The page you're seeking has taken a detour. Let us chauffeur you
              back to familiar territory.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                to="/"
                className="px-6 py-3 bg-[#FFD700] hover:bg-[#FFE657] text-[#1a1a1a] rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#FFD700]/30 hover:-translate-y-1"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
                className="px-6 py-3 border-2 border-[#FFD700] text-[#FFD700] hover:text-[#1a1a1a] hover:bg-[#FFD700] rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Go Back</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;