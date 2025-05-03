import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Function to determine navbar background classes
  const getNavbarClasses = () => {
    if (isOpen) {
      return "bg-opacity-100";
    }
    if (scrolled) {
      return "bg-opacity-45";
    }
    return "bg-opacity-0";
  };

  const handleContactClick = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Airports", path: "/Airports" },
    { name: "Fleet", path: "/Fleet" },
    { name: "Services", path: "/services" },
    { name: "Reservation", path: "/Reservation" },
    { name: "Blog", path: "/Blog" },
    { name: "Videos", path: "/Videos" },
  ];

  return (
    <>
      <Helmet>
        <title>DC Premier Limousine - Luxury Transportation</title>
        <meta name="description" content="Experience luxury transportation services in Washington DC with DC Premier Limousine." />
      </Helmet>
      <nav
        className={`flex-wrap bg-black fixed w-full z-50 top-0 start-0 transition-all duration-300 ease-in-out ${getNavbarClasses()}`}
      >
        <div
          className={`max-w-screen-2xl flex flex-wrap items-center mx-auto p-4`}
        >
          {/* Logo - Fixed position */}
          <Link
            to="/"
            className="flex items-center space-x-2 flex-shrink-0 mr-4 hover:opacity-80 active:opacity-60 transition-opacity"
          >
            <span className="text-xl font-bold text-[#FFD700] z-50">
              DC Premier Limousine
            </span>
          </Link>

          {/* Desktop Navigation - Will wrap if needed */}
          <div className="hidden md:flex space-x-8 flex-grow justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-white py-2 transition-all duration-300 ease-in-out hover:scale-125 active:scale-95 font-medium relative 
                ${
                  location.pathname === link.path
                    ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#FFD700]'
                    : ""
                }
                hover:text-[#FFD700]`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact Button - Fixed position */}
          <button
            className="hidden md:block text-black rounded-[10em] font-semibold px-6 py-3 cursor-pointer 
        transition-all duration-300 ease-in-out border border-black shadow-none hover:-translate-y-1 
        hover:shadow-[2px_5px_0_0_#000] active:translate-y-0.5 active:shadow-none flex-shrink-0 ml-4"
            style={{ backgroundColor: "#FFD700" }}
            onClick={handleContactClick}
          >
            Contact Us
          </button>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-md focus:outline-none text-white ml-auto hover:bg-gray-800 active:bg-gray-700 transition-colors`}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 90 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              ) : (
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.svg>
          </motion.button>
        </div>

        {/* Backdrop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`md:hidden fixed top-16 left-0 right-0 bg-black bg-opacity-95 overflow-hidden z-50`}
            >
              <div className="px-4 pb-4 space-y-2">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 px-4 rounded-md text-white hover:text-[#FFD700] hover:bg-gray-800 active:bg-gray-700 transition-colors duration-300
                      ${
                        location.pathname === link.path
                          ? "border-l-4 border-[#FFD700]"
                          : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <Link
                    to="/reservation"
                    onClick={() => setIsOpen(false)}
                    className="block w-full mt-4 bg-white text-black rounded-[10em] font-semibold px-6 py-3 cursor-pointer transition-all duration-300 ease-in-out border border-black shadow-none hover:-translate-y-1 hover:shadow-[2px_5px_0_0_#000] active:translate-y-0.5 active:shadow-none text-center"
                  >
                    Book Now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
