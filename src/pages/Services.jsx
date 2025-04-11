import React from 'react';
import { FaPlane, FaBriefcase, FaGlassCheers, FaGraduationCap, FaCalendarAlt, FaCarAlt, FaStar, FaPhoneAlt, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import CancellationPolicy from '../components/cancellation';
import { Helmet } from 'react-helmet-async';

const ServiceData = [
  {
    name: "Airport Transfers",
    description:
      "Enjoy seamless airport transport with our luxury fleet. Professional chauffeurs track flights in real-time for timely pickups. Relax with spacious luggage capacity, plush leather seats, and complimentary bottled water.",
    imageUrl:
      "https://images.unsplash.com/photo-1616620418290-81a162f05e5d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Flight tracking for delayed arrivals",
      "Meet & greet with name signage",
      "Disinfectant wipes & sanitizer provided",
      "24/7 availability including holidays",
    ],
    to: "/services",
  },
  {
    name: "Corporate Travel",
    description:
      "Impress clients with our discreet, professional chauffeur service. Our executive vehicles feature privacy partitions, onboard Wi-Fi, and power outlets for productivity. Perfect for client meetings, corporate events, or daily commutes in the DC metro area.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661397005386-5f35bae9f35a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Black luxury sedans & SUVs",
      "Documented safety records",
      "Same-day booking available",
      "Monthly billing options",
    ],
    to: "/services",
  },
  {
    name: "Wedding Transportation",
    description:
      "Make your wedding day flawless with our bridal fleet. From classic stretch limousines to vintage Rolls Royce options, we provide red carpet service, complimentary decorations, and experienced chauffeurs who understand wedding timelines.",
    imageUrl:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    features: [
      "Bridal party coordination",
      "Champagne toast service",
      "Emergency wedding day kit",
      "Flexible hourly packages",
    ],
    to: "/services",
  },
  {
    name: "Special Event Limousines",
    description:
      "Elevate your prom, anniversary, or milestone celebration with our luxury party buses and limousines. Featuring premium sound systems, LED lighting, and spacious interiors designed for group celebrations in the DC area.",
    imageUrl:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    features: [
      "Non-alcoholic beverage bar",
      "Social media photo lighting",
      "Overnight packages available",
      "20+ passenger options",
    ],
    to: "/services",
  },
  {
    name: "Wine Country Tours",
    description:
      "Discover Virginia's finest vineyards in luxury. Our wine tour packages include custom itineraries, knowledgeable chauffeurs, and climate-controlled vehicles perfect for transporting your purchases safely back to DC.",
    imageUrl:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    features: [
      "Vineyard recommendations",
      "Cooler storage for purchases",
      "Flexible pickup locations",
      "Private group tours",
    ],
    to: "/services",
  },
  {
    name: "Nightlife Transportation",
    description:
      "Enjoy DC's vibrant nightlife safely with our premium party transportation. Our chauffeurs know all the best routes to avoid traffic and get your group to clubs, concerts, and events on time with VIP treatment.",
    imageUrl:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    features: [
      "Late-night availability",
      "Designated driver service",
      "Phone chargers provided",
      "Multiple stop itineraries",
    ],
    to: "/services",
  },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services - DC Premier Limo</title>
        <meta name="description" content="Explore our premium limo services, including airport transfers, corporate travel, wedding transportation, and more." />
        <meta name="keywords" content="limo services, airport transfers, corporate travel, wedding transportation, luxury limo" />
      </Helmet>
      <main className="bg-[#1A1A1A]">
        <header className="relative h-[100vh] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              filter: "brightness(0.7)",
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white p-8 max-w-4xl">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 text-[#FFD700]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Premium Limo Services in Washington, DC
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Luxury transportation tailored for every occasion
              </motion.p>
              <Link to="/reservation">
                <motion.button
                  className="px-8 py-3 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-[#FFE657] transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Your Ride Now
                </motion.button>
              </Link>
            </div>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-[#FFD700]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ServiceData.map((service, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  name={service.name}
                  description={service.description}
                  features={service.features}
                  imageUrl={service.imageUrl}
                  to={service.to}
                />
              </motion.article>
            ))}
          </div>
        </section>

        {/* Benefits Section with Parallax */}
        <section className="relative h-[100vh] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              filter: "brightness(0.7)",
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
              <motion.h2 
                className="text-3xl font-bold text-center mb-12 text-[#FFD700]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Why Choose DC Premier Limousine?
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {[
                  { text: "Professional Licensed Chauffeurs" },
                  { text: "24/7 Customer Support" },
                  { text: "Flight Tracking for Airport Pickups" },
                  { text: "Competitive Pricing with No Hidden Fees" },
                  { text: "Luxury Well-Maintained Vehicles" },
                  { text: "Meet & Greet Service Available" },
                  { text: "Punctual & Reliable Service" },
                  { text: "Easy Online Booking" }
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start bg-[#1A1A1A] bg-opacity-80 p-4 rounded-lg text-xl"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FaCheck className="text-[#FFD700] mt-1 mr-2" />
                    <p className="text-white">{benefit.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CancellationPolicy/>

        {/* Testimonials */}
        <section className="relative h-[100vh] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              filter: "brightness(0.7)",
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2 
                className="text-3xl font-bold text-center mb-12 text-[#FFD700]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Client Testimonials
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    quote: "The airport pickup was flawless. The driver was waiting when we landed and helped with all our luggage.",
                    author: "Michael T.",
                    rating: 5
                  },
                  {
                    quote: "Perfect service for our wedding day. The limo arrived on time and was beautifully decorated.",
                    author: "Sarah K.",
                    rating: 5
                  },
                  {
                    quote: "Corporate clients were impressed with our transportation. Will definitely use again for business events.",
                    author: "James L.",
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <motion.article 
                    key={index}
                    className="bg-[#1A1A1A]/80 p-6 rounded-lg border border-[#626262]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-[#FFD700]" />
                      ))}
                    </div>
                    <p className="text-[#AAAAAA] italic mb-4">"{testimonial.quote}"</p>
                    <p className="font-semibold text-[#FFD700]">- {testimonial.author}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#FFD700] py-16">
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
        </section>
      </main>
    </>
  );
};

export default Services;