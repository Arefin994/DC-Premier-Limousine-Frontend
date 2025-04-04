import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaSnowflake, FaWifi, FaGlassCheers, FaStar, FaCheck } from 'react-icons/fa';

const Fleet = () => {
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
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Our Luxury Fleet
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
          >
            Choose from our meticulously maintained vehicles for any occasion
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
          >
            Book Your Ride
          </motion.button>
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
          {vehicles.map((vehicle, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ y: -10 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-xl font-bold">{vehicle.name}</h3>
                  <p className="text-yellow-400">{vehicle.type}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-300 mb-4">{vehicle.description}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <FaUsers className="text-yellow-500" />
                  <span>{vehicle.capacity}</span>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Features:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {vehicle.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <FaCheck className="text-yellow-500 text-xs" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <span className="text-yellow-500 font-bold">{vehicle.price}</span>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
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
                className="bg-gray-900 p-6 rounded-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-yellow-400">- {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Ready to Experience Luxury Transportation?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-3xl mx-auto"
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
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">
              Book Online
            </button>
            <button className="bg-transparent border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">
              Call: (555) 123-4567
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Fleet;