import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaEnvelope, FaChevronLeft, FaCheck } from 'react-icons/fa';

const ContactInfo = ({ formData, setFormData, prevStep, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
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
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#AAAAAA] mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-[#626262]" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white placeholder-[#626262] focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#AAAAAA] mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className="text-[#626262]" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white placeholder-[#626262] focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
              placeholder="(123) 456-7890"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#AAAAAA] mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-[#626262]" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white placeholder-[#626262] focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-[#AAAAAA] mb-2">
            Special Requests (Optional)
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white placeholder-[#626262] focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
            placeholder="Any special requirements or notes for your reservation..."
          />
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
          type="button"
          onClick={handleSubmit}
          disabled={!formData.name || !formData.phone || !formData.email}
          className={`${!formData.name || !formData.phone || !formData.email ? 'bg-[#626262] cursor-not-allowed' : 'bg-[#FFD700] hover:bg-[#FFE657]'} text-[#1A1A1A] font-medium py-3 px-8 rounded-lg transition-colors duration-300 flex items-center`}
        >
          Complete Reservation <FaCheck className="ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default ContactInfo; 