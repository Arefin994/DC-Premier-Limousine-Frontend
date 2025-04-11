import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Reservation = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    pickupLocation: '',
    destination: '',
    date: '',
    time: '',
    vehicleType: '',
    passengers: 1,
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const vehicleOptions = [
    { value: 'sedan', label: 'Executive Sedan', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
    { value: 'suv', label: 'Premium SUV', image: 'https://images.unsplash.com/photo-1494976388901-7509ad7112ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
    { value: 'limo', label: 'Stretch Limousine', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
    { value: 'party-bus', label: 'Party Bus', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }
  ];

  const serviceOptions = [
    'Airport Transfer',
    'Corporate Event',
    'Wedding',
    'Prom/Graduation',
    'Night Out',
    'Special Occasion',
    'Hourly Service'
  ];

  return (
    <>
      <Helmet>
        <title>Book Your Ride - DC Premier Limo</title>
        <meta name="description" content="Reserve your luxury ride with DC Premier Limo. Easy online booking for weddings, corporate events, and airport transfers." />
        <meta name="keywords" content="book limo, reserve ride, online booking, DC limo reservation" />
      </Helmet>
      <main className="min-h-screen bg-[#1a1a1a] py-24 px-4 sm:px-6 lg:px-8">
        <section className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-extrabold text-[#FFD700] sm:text-4xl"
            >
              Book Your Luxury Ride
            </motion.h1>
            <p className="mt-4 text-xl text-gray-300">
              Complete the form below to reserve your premium transportation
            </p>
          </header>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center w-1/3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} font-semibold`}>
                  {step}
                </div>
                <div className={`mt-2 text-sm ${currentStep >= step ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                  {step === 1 ? 'Trip Details' : step === 2 ? 'Vehicle Selection' : 'Your Information'}
                </div>
              </div>
            ))}
          </div>

            {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Reservation Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for booking with us. We've sent a confirmation to {formData.email}.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setCurrentStep(1);
                  setFormData({
                    serviceType: '',
                    pickupLocation: '',
                    destination: '',
                    date: '',
                    time: '',
                    vehicleType: '',
                    passengers: 1,
                    name: '',
                    email: '',
                    phone: '',
                    specialRequests: ''
                  });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
              >
                Make Another Reservation
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg overflow-hidden">
              {/* Step 1: Trip Details */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Trip Information</h2>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((service, index) => (
                          <option key={index} value={service.toLowerCase().replace(' ', '-')}>{service}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaMapMarkerAlt className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="pickupLocation"
                            value={formData.pickupLocation}
                            onChange={handleChange}
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Address, airport, hotel..."
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaMapMarkerAlt className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Address, airport, hotel..."
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaCalendarAlt className="text-gray-400" />
                          </div>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaClock className="text-gray-400" />
                          </div>
                          <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of Passengers</label>
                      <input
                        type="number"
                        name="passengers"
                        min="1"
                        max="20"
                        value={formData.passengers}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                    >
                      Next: Select Vehicle
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Vehicle Selection */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Select Your Vehicle</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {vehicleOptions.map((vehicle) => (
                      <div 
                        key={vehicle.value}
                        className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${formData.vehicleType === vehicle.value ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => setFormData(prev => ({ ...prev, vehicleType: vehicle.value }))}
                      >
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={vehicle.image} 
                            alt={vehicle.label}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-gray-800">{vehicle.label}</h3>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-sm text-gray-600">Up to {vehicle.value === 'sedan' ? '4' : vehicle.value === 'suv' ? '6' : vehicle.value === 'limo' ? '10' : '20'} passengers</span>
                            <span className="font-semibold text-blue-600">
                              {vehicle.value === 'sedan' ? '$85/hour' : 
                               vehicle.value === 'suv' ? '$95/hour' : 
                               vehicle.value === 'limo' ? '$125/hour' : '$200/hour'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.vehicleType}
                      className={`${!formData.vehicleType ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300`}
                    >
                      Next: Your Information
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact Information */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Information</h2>
                  
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaPhoneAlt className="text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="(123) 456-7890"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests (Optional)</label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Child seats, wheelchair accessibility, etc."
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 flex items-center`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Complete Reservation'
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          )}

          {/* Additional Info */}
          {!isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="font-semibold text-gray-800 mb-3">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Call our reservation specialists at <a href="tel:+15551234567" className="text-blue-600 hover:underline">(555) 123-4567</a> or email us at <a href="mailto:reservations@yourcompany.com" className="text-blue-600 hover:underline">reservations@yourcompany.com</a>
              </p>
              <div className="text-sm text-gray-500">
                <p className="mb-2">• 24/7 availability for last-minute bookings</p>
                <p className="mb-2">• Flight tracking for airport pickups</p>
                <p>• Meet & greet service available upon request</p>
              </div>
            </motion.div>
          )}
        </section>
      </main>
    </>
  );
};

export default Reservation;