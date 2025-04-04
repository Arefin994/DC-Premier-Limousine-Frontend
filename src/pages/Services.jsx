import React from 'react';
import { FaPlane, FaBriefcase, FaGlassCheers, FaGraduationCap, FaCalendarAlt, FaCarAlt, FaStar, FaPhoneAlt, FaCheck } from 'react-icons/fa';

const Services = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-black text-white">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-70"
        />
        <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Premium Limo Services in Washington, DC</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Luxury transportation tailored for every occasion
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
            Book Your Ride Now
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              icon: <FaPlane className="text-4xl mb-4 text-yellow-500" />,
              title: "Airport Transportation",
              description: "Reliable service to all major airports including IAD, DCA, and BWI with flight monitoring",
              image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            { 
              icon: <FaBriefcase className="text-4xl mb-4 text-yellow-500" />,
              title: "Corporate Transportation",
              description: "Professional chauffeurs for business meetings, conferences, and executive travel",
              image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            { 
              icon: <FaGlassCheers className="text-4xl mb-4 text-yellow-500" />,
              title: "Wedding Services",
              description: "Elegant transportation to make your special day unforgettable",
              image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            { 
              icon: <FaGraduationCap className="text-4xl mb-4 text-yellow-500" />,
              title: "Prom & Graduation",
              description: "Safe and stylish rides for your milestone celebrations",
              image: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
            },
            { 
              icon: <FaCalendarAlt className="text-4xl mb-4 text-yellow-500" />,
              title: "Special Events",
              description: "Night out, concerts, or any occasion that deserves luxury transport",
              image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            { 
              icon: <FaCarAlt className="text-4xl mb-4 text-yellow-500" />,
              title: "Hourly Services",
              description: "Flexible rental options for city tours or as-needed transportation",
              image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80"
            }
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
              <div className="p-6 text-center">
                <div className="flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-yellow-500 font-semibold hover:text-yellow-600 transition duration-300">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fleet Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Luxury Fleet</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Executive Sedans", 
                description: "Luxury sedans for business travel or small groups",
                image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              },
              { 
                name: "Premium SUVs", 
                description: "Spacious and comfortable for groups up to 6 passengers",
                image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              },
              { 
                name: "Stretch Limousines", 
                description: "Elegant transportation for special occasions",
                image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              }
            ].map((vehicle, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                  <p className="text-gray-600 mb-4">{vehicle.description}</p>
                  <button className="text-yellow-500 font-semibold hover:text-yellow-600 transition duration-300">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose DC Premier Limousine?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <div key={index} className="flex items-start">
              <FaCheck className="text-yellow-500 mt-1 mr-2" />
              <p className="text-gray-700">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Client Testimonials</h2>
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
      </div>

      {/* CTA Section */}
      <div className="bg-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Luxury Transportation?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to book your ride or get a free quote
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

export default Services;