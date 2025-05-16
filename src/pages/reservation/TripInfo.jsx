import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaChevronRight,
} from "react-icons/fa";
import MapRouting from "../../components/MapRouting";

function AutocompleteInput({ name, value, onSelect, placeholder }) {
  const [input, setInput] = useState(value?.name || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setInput(value?.name || "");
    setShowSuggestions(false);
  }, [value]);

  useEffect(() => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }
    const ctrl = new AbortController();
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        input
      )}`
    )
      .then((r) => r.json())
      .then(setSuggestions)
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });
    return () => ctrl.abort();
  }, [input]);

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

  return (
    <div className="relative">
      <input
        name={name}
        type="text"
        value={input}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg text-white pl-10 focus:ring-2 focus:ring-[#FFD700]"
        onChange={(e) => {
          setInput(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 bg-[#262626] border border-[#FFD700] rounded-lg mt-1 max-h-48 overflow-y-auto shadow-xl">
          {suggestions.map((p, i) => (
            <li
              key={p.place_id || i}
              className="px-4 py-2 cursor-pointer hover:bg-[#FFD700] hover:text-[#1A1A1A] text-[#AAAAAA]"
              onMouseDown={() => choose(p)}
            >
              {p.display_name}
            </li>
          ))}
        </ul>
      )}
      {/* NOTE: If suggestions are still clipped, check parent containers for 'overflow-hidden' and remove or adjust as needed. */}
    </div>
  );
}

const TripInfo = ({ formData, setFormData, nextStep, serviceOptions }) => {
  const handleSelect = (field, obj) => {
    setFormData((fd) => ({ ...fd, [field]: obj }));
  };

  // Generic handler for standard input/select fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 rounded-full bg-[#FFD700] text-[#1A1A1A] flex items-center justify-center mr-4">
          <FaMapMarkerAlt />
        </div>
        <h2 className="text-2xl font-semibold text-[#FFD700]">
          Trip Information
        </h2>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#AAAAAA] mb-2">
            Service Type
          </label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] text-white"
            required
          >
            <option value="" className="text-[#AAAAAA]">
              Select a service
            </option>
            {serviceOptions.map((service, index) => (
              <option
                key={index}
                value={service.toLowerCase().replace(/ /g, "-")}
                className="bg-[#1A1A1A]"
              >
                {service}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-[#AAAAAA] mb-2">
              Pickup Location
            </label>
            <AutocompleteInput
              name="pickup"
              value={formData.pickup}
              onSelect={handleSelect}
              placeholder="Address, airport, hotel..."
            />
          </div>
          <div>
            <label className="block text-sm text-[#AAAAAA] mb-2">
              Destination
            </label>
            <AutocompleteInput
              name="destination"
              value={formData.destination}
              onSelect={handleSelect}
              placeholder="Address, airport, hotel..."
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-[#FFD700] underline">
            Route Preview
          </h2>
          <div className="flex items-center mb-4 rounded-lg border-2 border-[#FFD700] p-2 border-rounded-lg">
            <MapRouting
              pickup={formData.pickup}
              destination={formData.destination}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#AAAAAA] mb-2">
              Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#626262]">
                <FaCalendarAlt />
              </div>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="pl-10 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] text-white"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#AAAAAA] mb-2">
              Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#626262]">
                <FaClock />
              </div>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="pl-10 w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] text-white"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#AAAAAA] mb-2">
            Number of Passengers
          </label>
          <input
            type="number"
            name="passengers"
            min="1"
            max="20"
            value={formData.passengers}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#262626] border border-[#626262] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] text-white"
            required
          />
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
      </div>
    </div>
  );
};

export default TripInfo;
