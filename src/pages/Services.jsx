import React from 'react';
import { FaPlane, FaBriefcase, FaGlassCheers, FaGraduationCap, FaCalendarAlt, FaCarAlt, FaStar, FaPhoneAlt, FaCheck } from 'react-icons/fa';

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