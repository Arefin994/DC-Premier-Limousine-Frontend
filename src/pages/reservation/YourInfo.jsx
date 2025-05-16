import React from "react";
import { FaUser, FaPhoneAlt, FaEnvelope, FaChevronLeft } from "react-icons/fa";

const YourInfo = ({ formData, handleChange, prevStep, isSubmitting }) => (
  <div className="p-6 sm:p-8">
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
        className={`$ {
          isSubmitting
            ? "bg-[#FFD700]/80"
            : "bg-[#FFD700] hover:bg-[#FFE657]"
        } text-[#1A1A1A] font-medium py-3 px-8 rounded-lg transition-colors duration-300 flex items-center`}
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
          "Complete Reservation"
        )}
      </button>
    </div>
  </div>
);

export default YourInfo;
