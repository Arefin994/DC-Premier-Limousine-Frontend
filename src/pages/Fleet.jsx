import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaSnowflake, FaWifi, FaGlassCheers, FaStar, FaCheck } from 'react-icons/fa';
import Car_Card from '../components/Car_Card';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Fleet = () => {
  const topFleet = [
    {
      name: "Mercedes S600 Limo",
      imageUrl:
        "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Mercedes S600 luxury limousine",
      passenger: 6,
      luggage: 4,
      hourlyRate: "$120/hour",
    },
    {
      name: "BMW 7 Series Executive",
      imageUrl:
        "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "BMW 7 Series executive sedan",
      passenger: 5,
      luggage: 3,
      hourlyRate: "$110/hour",
    },
    {
      name: "Cadillac Escalade Limousine",
      imageUrl:
        "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Cadillac Escalade luxury limousine",
      passenger: 8,
      luggage: 6,
      hourlyRate: "$150/hour",
    },
    {
      name: "Lincoln Navigator Limo",
      imageUrl:
        "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Lincoln Navigator luxury limousine",
      passenger: 7,
      luggage: 5,
      hourlyRate: "$140/hour",
    },
    {
      name: "Hummer Limousine",
      imageUrl:
        "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Hummer luxury limousine",
      passenger: 10,
      luggage: 8,
      hourlyRate: "$160/hour",
    },
    {
      name: "Chrysler 300 Limo",
      imageUrl:
        "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Chrysler 300 luxury limousine",
      passenger: 6,
      luggage: 4,
      hourlyRate: "$130/hour",
    },
    {
      name: "Audi A8 Limousine",
      imageUrl:
        "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Audi A8 luxury limousine",
      passenger: 5,
      luggage: 3,
      hourlyRate: "$125/hour",
    },
    {
      name: "Rolls Royce Phantom",
      imageUrl:
        "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Rolls Royce Phantom luxury limousine",
      passenger: 4,
      luggage: 2,
      hourlyRate: "$250/hour",
    },
    {
      name: "Bentley Mulsanne Limo",
      imageUrl:
        "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Bentley Mulsanne luxury limousine",
      passenger: 4,
      luggage: 2,
      hourlyRate: "$240/hour",
    },
    {
      name: "Lexus LS Limousine",
      imageUrl:
        "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Lexus LS luxury limousine",
      passenger: 5,
      luggage: 3,
      hourlyRate: "$115/hour",
    },
    {
      name: "Jaguar XJ Limousine",
      imageUrl:
        "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Jaguar XJ luxury limousine",
      passenger: 4,
      luggage: 2,
      hourlyRate: "$135/hour",
    },
    {
      name: "Tesla Model S Limo",
      imageUrl:
        "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Tesla Model S luxury limousine",
      passenger: 5,
      luggage: 3,
      hourlyRate: "$180/hour",
    },
  ];

  // Vehicle data
  const vehicles = [
    {
      name: "Cadillac Escalade",
      type: "Premium SUV",
      image: "https://images.unsplash.com/photo-1494976388901-7509ad7112ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Spacious luxury SUV perfect for group travel and special events",
      capacity: "6 passengers",
      features: ["Leather seating", "Climate control", "Premium sound system"],
      price: "$95/hour"
    },
    {
      name: "Mercedes-Benz S-Class",
      type: "Executive Sedan",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Ultimate in luxury and technology for corporate travel",
      capacity: "4 passengers",
      features: ["Massage seats", "Ambient lighting", "Privacy divider"],
      price: "$85/hour"
    },
    {
      name: "Lincoln Stretch Limousine",
      type: "Luxury Limo",
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Elegant transportation for weddings and special occasions",
      capacity: "10 passengers",
      features: ["Wet bar", "LED lighting", "Entertainment system"],
      price: "$125/hour"
    },
    {
      name: "Tesla Model S",
      type: "Electric Luxury",
      image: "https://images.unsplash.com/photo-1551836022-d5a88c20c5d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Eco-friendly luxury with cutting-edge technology",
      capacity: "5 passengers",
      features: ["Glass roof", "Premium audio", "Zero emissions"],
      price: "$90/hour"
    },
    {
      name: "Chevy Suburban",
      type: "Executive SUV",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Comfortable and spacious for airport transfers",
      capacity: "7 passengers",
      features: ["Tinted windows", "Complimentary water", "Phone chargers"],
      price: "$75/hour"
    },
    {
      name: "Chrysler 300",
      type: "Business Class",
      image: "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Sophisticated sedan for business meetings",
      capacity: "4 passengers",
      features: ["Spacious trunk", "Quiet cabin", "Professional aesthetic"],
      price: "$65/hour"
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Helmet>
        <title>Our Fleet - DC Premier Limo</title>
        <meta name="description" content="Discover our luxury fleet of limousines, SUVs, and sedans. Perfect for any occasion, from weddings to corporate events." />
        <meta name="keywords" content="luxury fleet, limousines, SUVs, sedans, DC limo fleet" />
      </Helmet>
      <div className="bg-gradient-to-br from-black to-[#626262] text-white">
        {/* Hero Section */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-30" />
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
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-[#AAAAAA]"
            >
              Choose from our meticulously maintained vehicles for any occasion
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
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
            {topFleet.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Car_Card {...card} flag={true} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="bg-[#1A1A1A] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#FFD700]">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The Escalade was perfect for our group trip to the airport. Spacious and comfortable!",
                  author: "Michael T.",
                  rating: 5
                },
                {
                  quote: "The Mercedes S-Class made our corporate clients feel special. Professional service throughout.",
                  author: "Sarah K.",
                  rating: 5
                },
                {
                  quote: "The stretch limo was the highlight of our wedding day. Beautifully maintained and the chauffeur was excellent.",
                  author: "James & Emily",
                  rating: 5
                }
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
                  <p className="text-[#AAAAAA] italic mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold text-[#FFD700]">- {testimonial.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-[#1A1A1A] to-[#626262]">
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
              <Link to="/Reservation">
                <motion.button 
                  className="bg-[#FFD700] hover:bg-[#FFE657] text-[#1A1A1A] font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Online
                </motion.button>
              </Link>
              <a href="tel:5551234567">
                <motion.button 
                  className="bg-transparent border-2 border-[#FFD700] hover:bg-[#FFD700] hover:text-[#1A1A1A] font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Call: (555) 123-4567
                </motion.button>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fleet;