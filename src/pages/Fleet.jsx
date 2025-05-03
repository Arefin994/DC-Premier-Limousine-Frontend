import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaPhoneAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import Car_Card from "../components/Car_Card";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const API_BASE_URL = "/api";

const Fleet = () => {
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFleet = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fleets`);
      console.log(response.data);
      setFleet(response.data);
    } catch (err) {
      console.error("Error fetching fleet:", err);
      setError("Failed to fetch fleet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFleet();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
        <motion.div
          animate={{ 
            rotate: 360,
            transition: { 
              duration: 0.8, 
              repeat: Infinity, 
              ease: "linear" 
            } 
          }}
          className="w-12 h-12 border-4 border-[#FFD700] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Our Fleet - DC Premier Limo</title>
        <meta
          name="description"
          content="Discover our luxury fleet of limousines, SUVs, and sedans. Perfect for any occasion, from weddings to corporate events."
        />
        <meta
          name="keywords"
          content="luxury fleet, limousines, SUVs, sedans, DC limo fleet"
        />
      </Helmet>
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-800 lg:rounded-es-[100px] lg:rounded-ee-[100px] shadow-lg shadow-black border-b-4 border-[#1a1a1a] ">
        <div className="absolute inset-0 bg-cover bg-center opacity-85 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')]" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-[#FFD700]"
          >
            Our Luxury Fleet
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white"
          >
            Choose from our meticulously maintained vehicles for any occasion
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/Reservation"
              className="bg-[#FFD700] hover:bg-[#FFE657] text-[#1A1A1A] font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
            >
              Book Your Ride
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Fleet Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {Array.isArray(fleet) && fleet.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Car_Card {...card} flag={false} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Testimonials */}
      <div className="bg-[#1A1A1A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#FFD700]">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The Escalade was perfect for our group trip to the airport. Spacious and comfortable!",
                author: "Michael T.",
                rating: 5,
              },
              {
                quote:
                  "The Mercedes S-Class made our corporate clients feel special. Professional service throughout.",
                author: "Sarah K.",
                rating: 5,
              },
              {
                quote:
                  "The stretch limo was the highlight of our wedding day. Beautifully maintained and the chauffeur was excellent.",
                author: "James & Emily",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1A1A1A] p-6 rounded-lg border border-[#626262]"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-[#FFD700]" />
                  ))}
                </div>
                <p className="text-[#AAAAAA] italic mb-4">
                  "{testimonial.quote}"
                </p>
                <p className="font-semibold text-[#FFD700]">
                  - {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6 text-[#FFD700]"
          >
            Ready to Experience Luxury Transportation?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-3xl mx-auto text-[#AAAAAA]"
          >
            Contact us today to book your vehicle or get a free quote
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
              <Link to="/reservation">
                <motion.button
                  className="bg-[#FFD700] hover:bg-[#FFE657] text-[#1A1A1A] font-bold py-3 px-8 rounded-lg text-lg transition duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCalendarAlt className="mr-2" /> Book Online
                </motion.button>
              </Link>
            <a href="tel:+1 (202) 630-2686">
                <motion.button
                  className="bg-black hover:bg-[#1A1A1A] text-[#FFD700] font-bold py-3 px-8 rounded-lg text-lg transition duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPhoneAlt className="mr-2" /> +1 (202) 630-2686
                </motion.button>
              </a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Fleet;

// // Vehicle data
// const vehicles = [
//   {
//     name: "Cadillac Escalade",
//     type: "Premium SUV",
//     image: "https://images.unsplash.com/photo-1494976388901-7509ad7112ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     description: "Spacious luxury SUV perfect for group travel and special events",
//     capacity: "6 passengers",
//     features: ["Leather seating", "Climate control", "Premium sound system"],
//     price: "$95/hour"
//   },
//   {
//     name: "Mercedes-Benz S-Class",
//     type: "Executive Sedan",
//     image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     description: "Ultimate in luxury and technology for corporate travel",
//     capacity: "4 passengers",
//     features: ["Massage seats", "Ambient lighting", "Privacy divider"],
//     price: "$85/hour"
//   },
//   {
//     name: "Lincoln Stretch Limousine",
//     type: "Luxury Limo",
//     image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     description: "Elegant transportation for weddings and special occasions",
//     capacity: "10 passengers",
//     features: ["Wet bar", "LED lighting", "Entertainment system"],
//     price: "$125/hour"
//   },
//   {
//     name: "Tesla Model S",
//     type: "Electric Luxury",
//     image: "https://images.unsplash.com/photo-1551836022-d5a88c20c5d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     description: "Eco-friendly luxury with cutting-edge technology",
//     capacity: "5 passengers",
//     features: ["Glass roof", "Premium audio", "Zero emissions"],
//     price: "$90/hour"
//   },
//   {
//     name: "Chevy Suburban",
//     type: "Executive SUV",
//     image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     description: "Comfortable and spacious for airport transfers",
//     capacity: "7 passengers",
//     features: ["Tinted windows", "Complimentary water", "Phone chargers"],
//     price: "$75/hour"
//   },
//   {
//     name: "Chrysler 300",
//     type: "Business Class",
//     image: "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     description: "Sophisticated sedan for business meetings",
//     capacity: "4 passengers",
//     features: ["Spacious trunk", "Quiet cabin", "Professional aesthetic"],
//     price: "$65/hour"
//   }
// ];
