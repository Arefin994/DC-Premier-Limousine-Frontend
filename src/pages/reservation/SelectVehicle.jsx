import React from "react";
import { FaCar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SelectVehicle = ({ formData, setFormData, fleet, nextStep, prevStep }) => (
  <div className="p-6 sm:p-8">
    <div className="flex items-center mb-8">
      <div className="w-10 h-10 rounded-full bg-[#FFD700] text-[#1A1A1A] flex items-center justify-center mr-4">
        <FaCar />
      </div>
      <h2 className="text-2xl font-semibold text-[#FFD700]">Select Your Vehicle</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.isArray(fleet) &&
        fleet.map((vehicle) => (
          <div
            key={vehicle._id}
            className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
              formData.vehicleType === vehicle.name.toLowerCase().replace(/\s+/g, "-")
                ? "ring-2 ring-[#FFD700]"
                : "hover:ring-1 hover:ring-[#626262]"
            }`}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                vehicleType: vehicle.name.toLowerCase().replace(/\s+/g, "-"),
              }))
            }
          >
            <div className="h-48 overflow-hidden">
              <img
                src={vehicle.imageUrl}
                alt={vehicle.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-bold text-white text-lg">{vehicle.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-white">Passenger: {vehicle.passengerCapacity}</span>
                <span className="text-sm text-white">Luggage: {vehicle.laggageCapacity}</span>
                <span className="font-bold text-[#FFD700]">${vehicle.hourlyRate}/hour</span>
              </div>
            </div>
            {formData.vehicleType === vehicle.name.toLowerCase().replace(/\s+/g, "-") && (
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
        className={`$ {
          !formData.vehicleType
            ? "bg-[#626262] cursor-not-allowed"
            : "bg-[#FFD700] hover:bg-[#FFE657]"
        } text-[#1A1A1A] font-medium py-3 px-8 rounded-lg transition-colors duration-300 flex items-center`}
      >
        Next: Your Information <FaChevronRight className="ml-2" />
      </button>
    </div>
  </div>
);

export default SelectVehicle;
