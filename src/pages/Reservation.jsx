import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaChevronRight, FaChevronLeft, FaCar } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#FFD700] sm:text-5xl mb-4">
            Reserve Your Luxury Ride
          </h1>
          <p className="text-xl text-[#AAAAAA] max-w-2xl mx-auto">
            Experience premium transportation with our exclusive fleet
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#626262] -z-10 transform -translate-y-1/2"></div>
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-[#FFD700] text-[#1A1A1A]' : 'bg-[#626262] text-[#AAAAAA]'} font-semibold text-lg mb-2 transition-all duration-300`}>
                {step}
              </div>
              <div className={`text-sm ${currentStep >= step ? 'text-[#FFD700] font-medium' : 'text-[#AAAAAA]'}`}>
                {step === 1 ? 'Trip Details' : step === 2 ? 'Vehicle' : 'Your Info'}
              </div>
            </div>
          ))}
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1A1A1A] p-8 sm:p-12 rounded-xl border border-[#FFD700]/20 shadow-lg text-center"
          >
            <div className="w-24 h-24 bg-[#1A1A1A] border-2 border-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#FFD700] mb-4">Reservation Confirmed!</h2>
            <p className="text-[#AAAAAA] text-lg mb-8 max-w-lg mx-auto">
              Thank you for choosing our luxury service. A confirmation has been sent to <span className="text-[#FFD700]">{formData.email}</span>.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
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
                className="bg-[#FFD700] hover:bg-[#FFE657] text-[#1A1A1A] font-medium py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Book Another Ride
              </button>
              <a 
                href="/contact" 
                className="border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 font-medium py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#626262] shadow-2xl">
            {/* Step 1: Trip Details */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8"
              >
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700] text-[#1A1A1A] flex items-center justify-center mr-4">
                    <FaMapMarkerAlt />
                  </div>
                  <h2 className="text-2xl font-semibold text-[#FFD700]">Trip Information</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Service Type</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] text-white"
                      required
                    >
                      <option value="" className="text-[#AAAAAA]">Select a service</option>
                      {serviceOptions.map((service, index) => (
                        <option key={index} value={service.toLowerCase().replace(' ', '-')} className="bg-[#1A1A1A]">{service}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Pickup Location</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#626262]">
                          <FaMapMarkerAlt />
                        </div>
                        <input
                          type="text"
                          name="pickupLocation"
                          value={formData.pickupLocation}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] text-white"
                          placeholder="Address, airport, hotel..."
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Destination</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#626262]">
                          <FaMapMarkerAlt />
                        </div>
                        <input
                          type="text"
                          name="destination"
                          value={formData.destination}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] text-white"
                          placeholder="Address, airport, hotel..."
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Date</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#626262]">
                          <FaCalendarAlt />
                        </div>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Time</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#626262]">
                          <FaClock />
                        </div>
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Number of Passengers</label>
                    <input
                      type="number"
                      name="passengers"
                      min="1"
                      max="20"
                      value={formData.passengers}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] text-white"
                      required
                    />
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#FFD700] hover:bg-[#FFE657] text-[#1A1A1A] font-medium py-3 px-8 rounded-lg transition-colors duration-300 flex items-center"
                  >
                    Next: Select Vehicle <FaChevronRight className="ml-2" />
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
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700] text-[#1A1A1A] flex items-center justify-center mr-4">
                    <FaCar />
                  </div>
                  <h2 className="text-2xl font-semibold text-[#FFD700]">Select Your Vehicle</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vehicleOptions.map((vehicle) => (
                    <div 
                      key={vehicle.value}
                      className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${formData.vehicleType === vehicle.value ? 'ring-2 ring-[#FFD700]' : 'hover:ring-1 hover:ring-[#626262]'}`}
                      onClick={() => setFormData(prev => ({ ...prev, vehicleType: vehicle.value }))}
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={vehicle.image} 
                          alt={vehicle.label}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-bold text-white text-lg">{vehicle.label}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-[#AAAAAA]">
                            {vehicle.value === 'sedan' ? 'Up to 4 passengers' : 
                             vehicle.value === 'suv' ? 'Up to 6 passengers' : 
                             vehicle.value === 'limo' ? 'Up to 10 passengers' : 'Up to 20 passengers'}
                          </span>
                          <span className="font-bold text-[#FFD700]">
                            {vehicle.value === 'sedan' ? '$85/hour' : 
                             vehicle.value === 'suv' ? '$95/hour' : 
                             vehicle.value === 'limo' ? '$125/hour' : '$200/hour'}
                          </span>
                        </div>
                      </div>
                      {formData.vehicleType === vehicle.value && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-[#262626] hover:bg-[#333333] text-[#AAAAAA] font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center"
                  >
                    <FaChevronLeft className="mr-2" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.vehicleType}
                    className={`${!formData.vehicleType ? 'bg-[#626262] cursor-not-allowed' : 'bg-[#FFD700] hover:bg-[#FFE657]'} text-[#1A1A1A] font-medium py-3 px-8 rounded-lg transition-colors duration-300 flex items-center`}
                  >
                    Next: Your Information <FaChevronRight className="ml-2" />
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
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700] text-[#1A1A1A] flex items-center justify-center mr-4">
                    <FaUser />
                  </div>
                  <h2 className="text-2xl font-semibold text-[#FFD700]">Your Information</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#626262]">
                          <FaUser />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] text-white"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#626262]">
                          <FaPhoneAlt />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] text-white"
                          placeholder="(123) 456-7890"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#626262]">
                        <FaEnvelope />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] text-white"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Special Requests (Optional)</label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] text-white"
                      placeholder="Child seats, wheelchair accessibility, etc."
                    ></textarea>
                  </div>
                </div>

                <div className="mt-10 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-[#262626] hover:bg-[#333333] text-[#AAAAAA] font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center"
                  >
                    <FaChevronLeft className="mr-2" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${isSubmitting ? 'bg-[#FFD700]/80' : 'bg-[#FFD700] hover:bg-[#FFE657]'} text-[#1A1A1A] font-medium py-3 px-8 rounded-lg transition-colors duration-300 flex items-center`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#1A1A1A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
            className="mt-8 bg-[#1A1A1A] p-6 rounded-xl border border-[#626262]"
          >
            <h3 className="font-semibold text-[#FFD700] mb-4 text-lg">Need Assistance?</h3>
            <p className="text-[#AAAAAA] mb-4">
              Our concierge team is available 24/7 to assist with your reservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:+18884129150" 
                className="flex items-center text-[#FFD700] hover:text-[#FFE657] transition-colors"
              >
                <FaPhoneAlt className="mr-2" /> (888) 412-9150
              </a>
              <a 
                href="mailto:concierge@luxuryrides.com" 
                className="flex items-center text-[#FFD700] hover:text-[#FFE657] transition-colors"
              >
                <FaEnvelope className="mr-2" /> concierge@luxuryrides.com
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Reservation;