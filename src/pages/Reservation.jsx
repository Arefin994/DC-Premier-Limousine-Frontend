import React, { useState, useEffect, useCallback } from "react";
import emailjs from "emailjs-com";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUsers,
} from "react-icons/fa";
import MapRouting from "../components/MapRouting";

// AutocompleteInput component with improved real-time search
function AutocompleteInput({ name, value, onSelect, placeholder }) {
  const [input, setInput] = useState(value?.name || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInput(value?.name || "");
    setShowSuggestions(false);
  }, [value]);

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (searchTerm) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (searchTerm && searchTerm.length >= 2) {
            performSearch(searchTerm);
          } else {
            setSuggestions([]);
            setIsLoading(false);
          }
        }, 300); // 300ms delay
      };
    })(),
    []
  );

  const performSearch = async (searchTerm) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchTerm
        )}&limit=10&addressdetails=1`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
    setShowSuggestions(true);
    debouncedSearch(newValue);
  };

  const choose = (place) => {
    setInput(place.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
    onSelect(name, {
      name: place.display_name,
      lat: parseFloat(place.lat),
      lon: parseFloat(place.lon),
    });
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#626262]">
        <FaMapMarkerAlt />
      </div>
      <input
        name={name}
        type="text"
        value={input}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white pl-10 focus:ring-2 focus:ring-[#FFD700]"
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={handleBlur}
      />
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#FFD700]"></div>
        </div>
      )}
      
      {/* Suggestions dropdown */}
      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <ul className="absolute z-50 left-0 right-0 bg-[#262626] border border-[#FFD700] rounded-lg mt-1 max-h-48 overflow-y-auto shadow-xl">
          {isLoading ? (
            <li className="px-4 py-2 text-[#AAAAAA] text-center">
              Searching...
            </li>
          ) : (
            suggestions.map((p, i) => (
              <li
                key={p.place_id || i}
                className="px-4 py-2 cursor-pointer hover:bg-[#FFD700] hover:text-[#1A1A1A] text-[#AAAAAA] border-b border-[#626262] last:border-b-0"
                onMouseDown={() => choose(p)}
              >
                <div className="font-medium">{p.display_name.split(',')[0]}</div>
                <div className="text-sm opacity-75">
                  {p.display_name.split(',').slice(1).join(',').trim()}
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

const initialState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  passengers: "",
  pickup: null,
  destination: null,
  date: "",
  time: "",
};

const Reservation = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSelect = (field, obj) => {
    setFormData((fd) => ({ ...fd, [field]: obj }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare email data with correct field names for the template
    const emailData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      passengers: formData.passengers,
      pickupStreet: formData.pickup?.name || "Not specified",
      pickupCity: "",
      pickupRegion: "",
      pickupPostal: "",
      dropoffStreet: formData.destination?.name || "Not specified",
      dropoffCity: "",
      dropoffRegion: "",
      dropoffPostal: "",
      date: formData.date,
      time: formData.time,
      message: `Number of Passengers: ${formData.passengers}`,
    };

    // Prepare reservation data for backend
    const reservationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      passengers: parseInt(formData.passengers),
      pickupAddress: formData.pickup?.name || "Not specified",
      pickupLat: formData.pickup?.lat || null,
      pickupLon: formData.pickup?.lon || null,
      destinationAddress: formData.destination?.name || "Not specified",
      destinationLat: formData.destination?.lat || null,
      destinationLon: formData.destination?.lon || null,
      date: formData.date,
      time: formData.time,
      status: "pending"
    };

    try {
      // Send reservation to backend
      const backendResponse = await fetch('https://dc-premier-limousine-backend-api.vercel.app/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData)
      });

      if (!backendResponse.ok) {
        throw new Error('Failed to save reservation to backend');
      }

      // Send email to customer
      const customerEmailPromise = emailjs.send(
        "service_9l3ongf",
        "template_180gc2h",
        emailData,
        "bs2ff7w-W2Ibt0u7y"
      );

      // Send copy to website owner
      const ownerEmailData = {
        ...emailData,
        email: "arefinamin994@gmail.com", // Override to send to owner
        message: `New reservation from ${formData.firstName} ${formData.lastName}
        
Customer Details:
- Email: ${formData.email}
- Phone: ${formData.phone}
- Passengers: ${formData.passengers}

Trip Details:
- Pickup: ${formData.pickup?.name || "Not specified"}
- Destination: ${formData.destination?.name || "Not specified"}
- Date: ${formData.date}
- Time: ${formData.time}`,
      };

      const ownerEmailPromise = emailjs.send(
        "service_9l3ongf",
        "template_180gc2h",
        ownerEmailData,
        "bs2ff7w-W2Ibt0u7y"
      );

      // Wait for both emails to be sent
      await Promise.all([customerEmailPromise, ownerEmailPromise]);
      
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error) {
      console.error('Reservation error:', error);
      setIsSubmitting(false);
      alert("Failed to submit reservation. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-[#FFD700] mb-8 text-center">
          Reservation Form
        </h2>
        
        {isSuccess ? (
          <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#FFD700]/20 shadow-lg text-center">
            <div className="w-24 h-24 bg-[#1A1A1A] border-2 border-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-[#FFD700]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#FFD700] mb-4">
              Reservation Confirmed!
            </h2>
            <p className="text-[#AAAAAA] text-lg mb-8 max-w-lg mx-auto">
              Thank you for your reservation. We will contact you soon.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                setFormData(initialState);
              }}
              className="bg-[#FFD700] hover:bg-[#FFE657] text-[#1A1A1A] font-medium py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Book Another Ride
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-[#1A1A1A] rounded-xl shadow-lg p-8 border border-[#626262]">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#AAAAAA] mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter name here"
                      required
                      className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white focus:ring-2 focus:ring-[#FFD700]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#AAAAAA] mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter name here"
                      required
                      className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white focus:ring-2 focus:ring-[#FFD700]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#AAAAAA] mb-2 flex items-center">
                      <FaPhone className="mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                      className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white focus:ring-2 focus:ring-[#FFD700]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#AAAAAA] mb-2 flex items-center">
                      <FaEnvelope className="mr-2" />
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter e-mail"
                      required
                      className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white focus:ring-2 focus:ring-[#FFD700]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#AAAAAA] mb-2 flex items-center">
                    <FaUsers className="mr-2" />
                    Number of Passengers
                  </label>
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white focus:ring-2 focus:ring-[#FFD700]"
                  >
                    <option value="">Select Passenger</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#AAAAAA] mb-2">
                    Pick Up Address
                  </label>
                  <AutocompleteInput
                    name="pickup"
                    value={formData.pickup}
                    onSelect={handleSelect}
                    placeholder="Select destination"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#AAAAAA] mb-2">
                    Drop Off Address
                  </label>
                  <AutocompleteInput
                    name="destination"
                    value={formData.destination}
                    onSelect={handleSelect}
                    placeholder="Select destination"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#AAAAAA] mb-2 flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      Pick Up Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white focus:ring-2 focus:ring-[#FFD700]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#AAAAAA] mb-2 flex items-center">
                      <FaClock className="mr-2" />
                      Pick Up Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white focus:ring-2 focus:ring-[#FFD700]"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-[#FFD700] hover:bg-[#FFE657] text-[#1A1A1A] font-medium py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#1A1A1A]"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Reservation"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Map Section */}
            <div className="bg-[#1A1A1A] rounded-xl shadow-lg p-8 border border-[#626262]">
              <h3 className="text-xl font-bold text-[#FFD700] mb-6 flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                Route Map
              </h3>
              
              <div className="h-[500px] rounded-lg border-2 border-[#FFD700] overflow-hidden">
                <MapRouting
                  pickup={formData.pickup}
                  destination={formData.destination}
                  onLocationSelect={handleSelect}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservation;