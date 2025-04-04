import React from 'react';
import { FaClock, FaPlane, FaSuitcase, FaCarAlt, FaStar, FaPhoneAlt, FaCalendarAlt } from 'react-icons/fa';

const AirportServices = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-black text-white">
        <div 
          className="absolute inset-0 bg-[url('/limo-airport.jpg')] bg-cover bg-center opacity-70"
          style={{ backgroundAttachment: 'fixed' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Airport Limo Services in Washington, DC</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            Reliable Luxury Transportation to All Major Airports
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
              Book Now
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
              Call Now: (555) 123-4567
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Airport Limo Service?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <FaClock className="text-4xl mb-4" />, 
              title: "24/7 Availability", 
              text: "Service around the clock to match any flight schedule" },
            { icon: <FaPlane className="text-4xl mb-4" />, 
              title: "Flight Monitoring", 
              text: "Real-time tracking to adjust for delays" },
            { icon: <FaSuitcase className="text-4xl mb-4" />, 
              title: "Meet & Greet", 
              text: "Personal assistance with your luggage" },
            { icon: <FaCarAlt className="text-4xl mb-4" />, 
              title: "Luxury Fleet", 
              text: "Sedans, SUVs, limousines for every need" }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
              <div className="text-yellow-500">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Airport Services */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Airport Transportation Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Dulles Airport (IAD)", 
                description: "Professional service to/from Dulles International Airport with complimentary waiting time",
                image: "/iad-airport.jpg"
              },
              { 
                name: "Reagan National (DCA)", 
                description: "Efficient transportation to downtown DC, Silver Spring, and surrounding areas",
                image: "/dca-airport.jpg"
              },
              { 
                name: "Baltimore (BWI)", 
                description: "Comfortable rides to/from BWI with flexible pricing options",
                image: "/bwi-airport.jpg"
              }
            ].map((airport, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                <img src={airport.image} alt={airport.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{airport.name} Service</h3>
                  <p className="text-gray-600 mb-4">{airport.description}</p>
                  <button className="text-yellow-500 font-semibold hover:text-yellow-600 transition duration-300">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote: "The driver was waiting when we landed and helped with all our luggage. Made our trip stress-free!",
              author: "Michael T.",
              rating: 5
            },
            {
              quote: "Perfect service from booking to drop-off. The car was clean and the driver was professional.",
              author: "Sarah K.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for Your Luxury Airport Transfer?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Book your ride today and experience stress-free airport transportation
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 flex items-center justify-center">
              <FaCalendarAlt className="mr-2" /> Book Online
            </button>
            <button className="bg-white hover:bg-gray-100 text-black font-bold py-3 px-8 rounded-lg text-lg transition duration-300 flex items-center justify-center">
              <FaPhoneAlt className="mr-2" /> (555) 123-4567
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportServices;