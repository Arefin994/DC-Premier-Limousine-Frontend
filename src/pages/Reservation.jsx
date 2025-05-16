import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronRight,
  FaChevronLeft,
  FaCar,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import emailjs from "emailjs-com";
import TripInfo from "./reservation/TripInfo";
import SelectVehicle from "./reservation/SelectVehicle";
import YourInfo from "./reservation/YourInfo";

const Reservation = () => {
  const [formData, setFormData] = useState({
    serviceType: "",
    pickupLocation: "",
    destination: "",
    date: "",
    time: "",
    vehicleType: "",
    passengers: 1,
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFleet = async () => {
    try {
      const response = await axios.get(
        `https://dc-premier-limousine-backend-api.vercel.app/api/fleets`
      );
      setFleet(response.data);
    } catch (err) {
      console.error("Error fetching fleet:", err);
      setError("Failed to fetch fleet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFleet();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const vehicleCost =
      formData.vehicleType === "sedan"
        ? "$85/hour"
        : formData.vehicleType === "suv"
        ? "$95/hour"
        : formData.vehicleType === "limo"
        ? "$125/hour"
        : "$200/hour";

    const emailParams = {
      email: formData.email,
      serviceType: formData.serviceType,
      pickupLocation: formData.pickupLocation,
      destination: formData.destination,
      date: formData.date,
      time: formData.time,
      vehicleType: formData.vehicleType,
      passengers: formData.passengers,
      name: formData.name,
      phone: formData.phone,
      specialRequests: formData.specialRequests,
      vehicleCost: vehicleCost,
    };

    emailjs
      .send(
        "service_9l3ongf",
        "template_180gc2h",
        emailParams,
        "bs2ff7w-W2Ibt0u7y"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setIsSubmitting(false);
          setIsSuccess(true);
        },
        (error) => {
          console.error("FAILED...", error);
          setIsSubmitting(false);
        }
      );
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // Update vehicle selection to use fleet data
  const vehicleOptions = fleet.map((vehicle) => ({
    value: vehicle.name.toLowerCase().replace(/\s+/g, "-"),
    label: vehicle.name,
    image: vehicle.imageUrl,
  }));

  const serviceOptions = [
    "Airport Transfer",
    "Corporate Event",
    "Wedding",
    "Prom/Graduation",
    "Night Out",
    "Special Occasion",
    "Hourly Service",
    "point-to-point",
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
        <motion.div
          animate={{
            rotate: 360,
            transition: {
              duration: 0.8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          className="w-12 h-12 border-4 border-[#FFD700] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

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
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep >= step
                    ? "bg-[#FFD700] text-[#1A1A1A]"
                    : "bg-[#626262] text-[#AAAAAA]"
                } font-semibold text-lg mb-2 transition-all duration-300`}
              >
                {step}
              </div>
              <div
                className={`text-sm ${
                  currentStep >= step
                    ? "text-[#FFD700] font-medium"
                    : "text-[#AAAAAA]"
                }`}
              >
                {step === 1
                  ? "Trip Details"
                  : step === 2
                  ? "Vehicle"
                  : "Your Info"}
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
                ></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#FFD700] mb-4">
              Reservation Confirmed!
            </h2>
            <p className="text-[#AAAAAA] text-lg mb-8 max-w-lg mx-auto">
              Thank you for choosing our luxury service. A confirmation has been
              sent to <span className="text-[#FFD700]">{formData.email}</span>.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setCurrentStep(1);
                  setFormData({
                    serviceType: "",
                    pickupLocation: "",
                    destination: "",
                    date: "",
                    time: "",
                    vehicleType: "",
                    passengers: 1,
                    name: "",
                    email: "",
                    phone: "",
                    specialRequests: "",
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
          <form
            onSubmit={handleSubmit}
            className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#626262] shadow-2xl"
          >
            {currentStep === 1 && (
              <TripInfo
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
                serviceOptions={serviceOptions}
              />
            )}
            {currentStep === 2 && (
              <SelectVehicle
                formData={formData}
                setFormData={setFormData}
                fleet={fleet}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {currentStep === 3 && (
              <YourInfo
                formData={formData}
                handleChange={handleChange}
                prevStep={prevStep}
                isSubmitting={isSubmitting}
              />
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
            <h3 className="font-semibold text-[#FFD700] mb-4 text-lg">
              Need Assistance?
            </h3>
            <p className="text-[#AAAAAA] mb-4">
              Our concierge team is available 24/7 to assist with your
              reservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+1 (202) 630-2686"
                className="flex items-center text-[#FFD700] hover:text-[#FFE657] transition-colors"
              >
                <FaPhoneAlt className="mr-2" /> +1 (202) 630-2686
              </a>
              <a
                href="mailto:Dcpremierlimo@gmail.com"
                className="flex items-center text-[#FFD700] hover:text-[#FFE657] transition-colors"
              >
                <FaEnvelope className="mr-2" /> Dcpremierlimo@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Reservation;