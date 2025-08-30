import React from "react";
import { Hero } from "../components/hero";
import { motion } from "framer-motion";
import Card from "../components/Card";
import Car_Card from "../components/Car_Card";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const ServiceData = [
  {
    name: "Airport Transfers",
    description:
      "Enjoy seamless airport transport with our luxury fleet. Professional chauffeurs track flights in real-time for timely pickups. Relax with spacious luggage capacity, plush leather seats, and complimentary bottled water.",
    imageUrl:
      "https://images.unsplash.com/photo-1616620418290-81a162f05e5d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Luxury airport transfer vehicle",
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
    altText: "Executive vehicle for corporate travel",
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
    altText: "Wedding limousine with decorations",
    features: [
      "Bridal party coordination",
      "Champagne toast service",
      "Emergency wedding day kit",
      "Flexible hourly packages",
    ],
    to: "/services",
  },
];

const topFleet = [
  {
    name: "Mercedes S600 Limo",
    imageUrl:
      "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    passenger: 6,
    luggage: 4,
    hourlyRate: "$120/hour",
  },
  {
    name: "BMW 7 Series Executive",
    imageUrl:
      "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    passenger: 5,
    luggage: 3,
    hourlyRate: "$110/hour",
  },
  {
    name: "Cadillac Escalade Limousine",
    imageUrl:
      "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    passenger: 8,
    luggage: 6,
    hourlyRate: "$150/hour",
  },
];

const Home = () => {
  return (
    <>
      <Helmet>
              <title>Quantico Car Rental Services - Luxury Transportation Services</title>
      <meta name="description" content="Experience the finest in luxury transportation with Quantico Car Rental Services. Book your ride for weddings, corporate events, airport transfers, and more." />
        <meta name="keywords" content="luxury limo, DC limo, airport transfers, wedding transportation, corporate travel" />
      </Helmet>
      <div className="relative min-h-screen">
        {/* Hero Section */}
        <div className="relative h-screen">
          <Hero />
        </div>

        {/* Services Section */}
        <div className="bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center">
          <div className="justify-center items-center flex flex-col m-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.h1 className="text-4xl font-bold md:text-6xl lg:text-7xl text-center text-yellow-500 p-8">
                Our Services
              </motion.h1>
              <motion.p className="text-lg text-white text-center mb-8 max-w-4xl mx-auto">
                Experience the finest in luxury transportation with our Quantico car rental services in Virginia and Washington DC. Whether you're planning a
                wedding, prom, corporate event, airport transfer, or a night out
                on the town, we offer tailored solutions to make every occasion
                unforgettable.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32">
              {ServiceData.map((service, index) => (
                <Card
                  key={index}
                  name={service.name}
                  description={service.description}
                  features={service.features}
                  imageUrl={service.imageUrl}
                  altText={service.altText}
                  to={service.to}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Parallax Section */}
        <div className="relative h-[100vh] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{
              backgroundImage: "url('/44.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              filter: "brightness(0.7)",
            }}
          />

          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white p-8 max-w-4xl">
              <motion.h2
                className="text-4xl font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Luxury at Your Fingertips
              </motion.h2>
              <motion.p
                className="text-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Experience the epitome of comfort and style with our premium fleet
                of vehicles. Whether it's a special occasion or just a night out,
                we ensure your journey is nothing short of extraordinary.
              </motion.p>
              <motion.button
                className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Your Ride Now
              </motion.button>
            </div>
          </div>
        </div>

        {/* Top Fleet Section */}
        <div className="bg-gray-100 py-20">
          <div className="max-w-screen-2xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Our Top Fleet
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our experienced team of professionals is dedicated to providing
                you with the best luxury transportation experience.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-16">
              {topFleet.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Car_Card 
                    name={card.name}
                    imageUrl={card.imageUrl}
                    passenger={card.passenger}
                    luggage={card.luggage}
                    hourlyRate={card.hourlyRate}
                    flag={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
