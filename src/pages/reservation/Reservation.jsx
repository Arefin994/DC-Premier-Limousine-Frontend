import React, { useState } from "react";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  pickupStreet: "",
  pickupStreet2: "",
  pickupCity: "",
  pickupRegion: "",
  pickupPostal: "",
  dropoffStreet: "",
  dropoffStreet2: "",
  dropoffCity: "",
  dropoffRegion: "",
  dropoffPostal: "",
  phone: "",
  date: "",
  time: "",
  message: "",
};

const Reservation = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Submit logic here
    setTimeout(() => setIsSubmitting(false), 1500); // Simulate submit
  };

  return (
    <form className="max-w-3xl mx-auto p-6 sm:p-8 bg-[#1A1A1A] rounded-xl shadow-lg" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-[#FFD700] mb-8 text-center">Reservation Form</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#AAAAAA] mb-2">First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-bold text-[#FFD700] mb-2">Pick Up Address</h3>
          <input type="text" name="pickupStreet" value={formData.pickupStreet} onChange={handleChange} placeholder="Street Address" required className="mb-2 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
          <input type="text" name="pickupStreet2" value={formData.pickupStreet2} onChange={handleChange} placeholder="Street Address Line 2" className="mb-2 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
          <input type="text" name="pickupCity" value={formData.pickupCity} onChange={handleChange} placeholder="City" required className="mb-2 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
          <input type="text" name="pickupRegion" value={formData.pickupRegion} onChange={handleChange} placeholder="Region" required className="mb-2 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
          <input type="text" name="pickupPostal" value={formData.pickupPostal} onChange={handleChange} placeholder="Postal / Zip Code" required className="mb-2 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
          <input type="text" name="pickupCountry" value={formData.pickupCountry} onChange={handleChange} placeholder="Country" required className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#FFD700] mb-2">Drop-off Address</h3>
          <input type="text" name="dropoffStreet" value={formData.dropoffStreet} onChange={handleChange} placeholder="Street Address" required className="mb-2 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
          <input type="text" name="dropoffStreet2" value={formData.dropoffStreet2} onChange={handleChange} placeholder="Street Address Line 2" className="mb-2 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
          <input type="text" name="dropoffCity" value={formData.dropoffCity} onChange={handleChange} placeholder="City" required className="mb-2 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
          <input type="text" name="dropoffRegion" value={formData.dropoffRegion} onChange={handleChange} placeholder="Region" required className="mb-2 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
          <input type="text" name="dropoffPostal" value={formData.dropoffPostal} onChange={handleChange} placeholder="Postal / Zip Code" required className="mb-2 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
          <input type="text" name="dropoffCountry" value={formData.dropoffCountry} onChange={handleChange} placeholder="Country" required className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="### ### ####" required className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Time</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#AAAAAA] mb-2">Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white" placeholder="Special requests, notes, etc." />
      </div>
      <div className="mt-10 flex justify-center">
        <button type="submit" disabled={isSubmitting} className={`${"bg-[#FFD700] hover:bg-[#FFE657] text-[#1A1A1A] font-medium py-3 px-8 rounded-lg transition-colors duration-300 flex items-center"} ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}>
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#1A1A1A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Form"
          )}
        </button>
      </div>
    </form>
  );
};

export default Reservation;
