import React, { useEffect } from "react";
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
        <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl">
          Love me like a sailor
        </h1>
        <p className="mt-4 mb-4 max-w-2xl text-lg md:text-xl">
          Beautiful description that overlays the carousel
        </p>
        <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.25,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50 hover:scale-125"
        >
          Book Now
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>
    </div>
  );
};
