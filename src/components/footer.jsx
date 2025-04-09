import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="text-white pt-12 pb-8"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-[#FFD700] flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold">DC Premier Limousine</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your premier luxury transportation service in Washington DC.
              Experience elegance, comfort, and reliability with our fleet of
              premium vehicles and professional chauffeurs.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FFE657] transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FFE657] transition-colors duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FFE657] transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FFE657] transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-[#FFE657] transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/fleet"
                  className="text-gray-400 hover:text-[#FFE657] transition-colors duration-300"
                >
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-[#FFE657] transition-colors duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/airport"
                  className="text-gray-400 hover:text-[#FFE657] transition-colors duration-300"
                >
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-[#FFE657] transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Our Services
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-400 hover:text-[#FFE657] transition-colors duration-300">
                <Link to="/services">Wedding Transportation</Link>
              </li>
              <li className="text-gray-400 hover:text-[#FFE657] transition-colors duration-300">
                <Link to="/services">Corporate Events</Link>
              </li>
              <li className="text-gray-400 hover:text-[#FFE657] transition-colors duration-300">
                <Link to="/services">Airport Transfers</Link>
              </li>
              <li className="text-gray-400 hover:text-[#FFE657] transition-colors duration-300">
                <Link to="/services">Special Occasions</Link>
              </li>
              <li className="text-gray-400 hover:text-[#FFE657] transition-colors duration-300">
                <Link to="/services">City Tours</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#FFE657] mt-0.5" />
                <span className="text-gray-400">
                  123 Luxury Lane, Washington DC, USA
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#FFE657]" />
                <span className="text-gray-400">+1 (202) 555-0123</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#FFE657]" />
                <span className="text-gray-400">info@dcpremierlimo.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} DC Premier Limousine. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
