import React from 'react';
import { motion } from 'framer-motion';
import { FaCarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const vehicleOptions = [
  { value: 'sedan', label: 'Executive Sedan', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { value: 'suv', label: 'Premium SUV', image: 'https://images.unsplash.com/photo-1494976388901-7509ad7112ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { value: 'limo', label: 'Stretch Limousine', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { value: 'party-bus', label: 'Party Bus', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }
];

const VehicleSelection = ({ formData, setFormData, prevStep, nextStep }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 sm:p-8"
    >
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 rounded-full bg-[#FFD700] text-[#1A1A1A] flex items-center justify-center mr-4">
          <FaCarAlt />
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
  );
};

export default VehicleSelection; 