import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Airports", path: "/Airports" },
    { name: "Fleet", path: "/Fleet" },
    { name: "Services", path: "/services" },
    { name: "Reservation", path: "/Reservation" },
    { name: "Blog", path: "/Blog" },
    { name: "Videos", path: "/Videos" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className={`flex-wrap bg-black fixed w-full z-20 top-0 start-0
      ${
        scrolled
          ? "bg-opacity-35 shadow-2xl transition-all duration-300 ease-in-out"
          : "bg-opacity-0 transition-all duration-300 ease-in-out"
      }`}>
      <div
        className={`max-w-screen-2xl flex items-center justify-between mx-auto p-4`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-[#FFD700]">
            DC Premier Limousine
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${
                scrolled ? "text-white" : "text-white"
              } py-2 transition-all duration-300 ease-in-out hover:scale-125 text-gray-800 
              font-medium`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <button className="text-black rounded-[10em] font-semibold px-6 py-3 cursor-pointer 
        transition-all duration-300 ease-in-out border border-black shadow-none hover:-translate-y-1 
        hover:shadow-[2px_5px_0_0_#000] active:translate-y-0.5 active:shadow-none"
        style={{ backgroundColor: "#FFD700" }}>
          Contact Us
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden ${
          isOpen ? "max-h-max" : "max-h-0"
        } overflow-hidden transition-all duration-500 ease-in-out bg-white bg-opacity-25`}
      >
        <div className="px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 rounded-md text-gray-800 hover:text-black hover:bg-gray-100 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          <button className="w-full mt-4 bg-white text-black rounded-[10em] font-semibold px-6 py-3 cursor-pointer transition-all duration-300 ease-in-out border border-black shadow-none hover:-translate-y-1 hover:shadow-[2px_5px_0_0_#000] active:translate-y-0.5 active:shadow-none">
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
