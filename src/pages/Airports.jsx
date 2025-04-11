import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaPlane, FaSuitcase, FaCarAlt, FaStar, FaPhoneAlt, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';


const AirportServices = () => {
  return (
    <div className="bg-[#1A1A1A] text-[#AAAAAA]">
      {/* Hero Section */}
      <div className="relative bg-[#1A1A1A] text-white">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2094&q=80')] bg-cover bg-center opacity-40"
          style={{ backgroundAttachment: 'fixed' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#FFD700]">Premium Airport Transportation</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            Luxury chauffeur services to all major airports in Washington DC, Maryland, and Virginia
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#FFD700] hover:bg-[#FFE657] text-[#1A1A1A] font-bold py-3 px-6 rounded-lg text-lg transition duration-300 flex items-center">
              <FaCalendarAlt className="mr-2" /> Book Online
            </button>
            <button className="bg-transparent border-2 border-[#FFD700] hover:bg-[#FFD700] hover:text-[#1A1A1A] font-bold py-3 px-6 rounded-lg text-lg transition duration-300 flex items-center">
              <FaPhoneAlt className="mr-2" /> (888) 412-9150
            </button>
          </div>
        </div>
      </div>

      {/* Airport Services */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#FFD700]">Our Airport Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              name: "DCA Airport", 
              description: "Professional Reagan National Airport car service with real-time flight tracking",
              image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            },
            { 
              name: "IAD Dulles", 
              description: "Luxury transportation to Dulles International Airport with VIP meet & greet",
              image: "https://images.unsplash.com/photo-1470847352555-49687d7bc7ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80"
            },
            { 
              name: "BWI Airport", 
              description: "Reliable Baltimore-Washington service with complimentary waiting time",
              image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            }
          ].map((airport, index) => (
            <div key={index} className="bg-[#262626] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <img src={airport.image} alt={airport.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{airport.name}</h3>
                <p className="text-[#AAAAAA] mb-4">{airport.description}</p>
                <button className="text-[#FFD700] font-semibold hover:text-[#FFE657] transition duration-300 flex items-center">
                  View Service Details <FaChevronRight className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-[#262626] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#FFD700]">Why Choose Premier International Travel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center ">
            {[
              { icon: <FaClock className="text-4xl mb-4 text-[#FFD700]" />, 
                title: "24/7 Availability", 
                text: "Service around the clock for any flight schedule" },
              { icon: <FaPlane className="text-4xl mb-4 text-[#FFD700]" />, 
                title: "Flight Monitoring", 
                text: "Real-time tracking to adjust for delays" },
              { icon: <FaSuitcase className="text-4xl mb-4 text-[#FFD700]" />, 
                title: "VIP Greeter Service", 
                text: "Meet at baggage claim with personalized assistance" },
              { icon: <FaCarAlt className="text-4xl mb-4 text-[#FFD700]" />, 
                title: "Diverse Fleet", 
                text: "Sedans, SUVs, limousines, and executive shuttles" }
            ].map((item, index) => (
              <div key={index} className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300 border border-[#626262]">
                {item.icon}
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-[#AAAAAA]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fleet Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#FFD700]">Our Luxury Fleet</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Executive Sedans",
              description: "Mercedes-Benz E-Class, BMW 5 Series for business travel",
              image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            },
            {
              name: "Premium SUVs",
              description: "Cadillac Escalade, Lincoln Navigator for groups",
              image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            },
            {
              name: "Luxury Limousines",
              description: "Stretch limos for special occasions and corporate events",
              image: "https://images.unsplash.com/photo-1551830820-330a71b99659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            }
          ].map((vehicle, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg">
              <img 
                src={vehicle.image} 
                alt={vehicle.name} 
                className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{vehicle.name}</h3>
                  <p className="text-[#AAAAAA]">{vehicle.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-[#262626] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#FFD700]">Client Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "The driver was waiting when we landed and helped with all our luggage. Made our international arrival completely stress-free!",
                author: "Michael T., Corporate Client",
                rating: 5
              },
              {
                quote: "Perfect service from booking to drop-off. The car was spotless and the driver knew all the best routes to avoid traffic.",
                author: "Sarah K., Frequent Traveler",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-[#1A1A1A] p-6 rounded-lg border border-[#626262]">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-[#FFD700]" />
                  ))}
                </div>
                <p className="text-[#AAAAAA] italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-white">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#FFD700]">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Book Your Ride",
              description: "Reserve online or by phone with upfront pricing"
            },
            {
              step: "2",
              title: "We Pick You Up",
              description: "Professional chauffeur arrives on time at your location"
            },
            {
              step: "3",
              title: "Relax & Arrive",
              description: "Sit back while we handle the traffic and airport logistics"
            }
          ].map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-[#FFD700] text-[#1A1A1A] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-[#AAAAAA]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#FFD700] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6 text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Experience Luxury Transportation?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-3xl mx-auto text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contact us today to book your ride or get a free quote
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/reservation">
              <motion.button 
                className="bg-black hover:bg-[#1A1A1A] text-[#FFD700] font-bold py-3 px-8 rounded-lg text-lg transition duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCalendarAlt className="mr-2" /> Book Online
              </motion.button>
            </Link>
            <a href="tel:5551234567">
              <motion.button 
                className="bg-black hover:bg-[#1A1A1A] text-[#FFD700] font-bold py-3 px-8 rounded-lg text-lg transition duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPhoneAlt className="mr-2" /> (555) 123-4567
              </motion.button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportServices;