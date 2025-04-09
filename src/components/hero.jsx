import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { HeroSection } from "./Carousel";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const Hero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <div>
      <HeroSection />
      <div className="max-w-screen-2xl mx-auto absolute inset-0 z-10 flex flex-col items-start justify-center text-left text-white">
        <h1 className="ml-2 text-4xl font-bold md:text-6xl lg:text-7xl text-[#FFD700]">
          Love me like a sailor
        </h1>
        <p className="ml-2 mb-4 max-w-2xl text-lg md:text-xl">
          Beautiful description that overlays the carousel
        </p>
        <Link to="/Reservation">
          <motion.button
            style={{
              border,
              boxShadow,
            }}
          whileTap={{
            scale: 0.985,
          }}
          className="ml-3 group relative flex w-fit items-center gap-1.5 rounded-full bg-black 
          px-4 py-2 text-lg text-gray-50 transition-all duration-300 hover:scale-125"
        >
          Book Now
            <FiArrowRight className="transition-transform group-hover:text-2xl group-hover:-rotate-45 group-active:-rotate-12" />
          </motion.button>
        </Link>
      </div>
    </div>
  );
};
