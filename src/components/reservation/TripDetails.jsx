import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaChevronRight } from 'react-icons/fa';

const serviceOptions = [
  'Airport Transfer',
  'Corporate Event',
  'Wedding',
  'Prom/Graduation',
  'Night Out',
  'Special Occasion',
  'Hourly Service'
];

const TripDetails = ({ formData, handleChange, nextStep }) => {
  return (
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
  );
};

export default TripDetails; 