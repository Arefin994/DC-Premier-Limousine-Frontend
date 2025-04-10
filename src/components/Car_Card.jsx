import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CarCard = ({ name, imageUrl, passenger, luggage, hourlyRate, flag }) => {
  const [isTapped, setIsTapped] = useState(false);

  return (
    <div
      className="w-[320px] h-[320px] bg-[#1A1A1A] rounded-3xl relative shadow-xl shadow-black/50
      transition-all duration-500 ease-in-out hover:rounded-tl-[56px] group cursor-pointer"
      onClick={() => setIsTapped(!isTapped)}
      onMouseEnter={() => setIsTapped(true)}
      onMouseLeave={() => setIsTapped(false)}
    >
      {/* Profile Image */}
      <div
        className={`absolute w-[calc(100%-12px)] h-[calc(100%-12px)] top-1.5 left-1.5 
        rounded-3xl z-10 border-[#FFD700] overflow-hidden transition-all duration-500 
        ease-in-out delay-200 ${
          isTapped
            ? "w-[100px] h-[100px] aspect-square top-[10px] left-[10px] rounded-full z-30 border-[8px] border-[#FFD700] shadow-[0_5px_5px_0_rgba(26,26,26,0.19)]"
            : ""
        }`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover object-[0px_0px] transition-all duration-500 ease-in-out"
          />
        ) : (
          <div className="w-full h-full bg-[#FFE657]"></div>
        )}
      </div>

      {/* Bottom Content */}
      <div
        className={`absolute bottom-[4px] left-[4px] right-[4px] bg-[#1A1A1A]/80 rounded-3xl z-20 
        shadow-[inset_0_5px_5px_0_rgba(26,26,26,0.19)] overflow-hidden border-4 border-[#626262]
        transition-all duration-500 [transition-timing-function:cubic-bezier(0.645,0.045,0.355,1)] 
        ${isTapped ? "top-[20%]" : "top-[75%]"}`}
      >
        <div
          className={`absolute bottom-0 left-6 right-6 transition-all duration-500 ease-in-out 
        ${isTapped ? "h-4/6" : "h-[65px]"}`}
        >
          <span className="block text-lg text-[#FFD700] font-bold">{name}</span>
          <div
            className={`max-h-[calc(100%-50px)] overflow-y-auto custom-scrollbar mt-2 
          transition-opacity duration-500 ${
            isTapped ? "opacity-100" : "opacity-0"
          }`}
          >
            <span className="block text-sm text-[#AAAAAA]">
              Passenger Capacity: {passenger}
              <br />
              Luggage Capacity: {luggage}
              <br />
              Hourly Rate: {hourlyRate}
            </span>
          </div>
          <div>
            {flag ? (
              <div className="absolute bottom-2 left-0 right-0 flex justify-end">
                <Link
                  to="/fleet"
                  className="bg-[#FFD700] text-[#1A1A1A] border-none rounded-[20px] text-xs py-1 px-2 
        shadow-[0_5px_5px_0_rgba(26,26,26,0.13)] hover:bg-[#1A1A1A] hover:text-[#FFD700] 
        transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Contact Us
                </Link>
              </div>
            ) : (
              <div></div> // or just use null if you don't need an empty div
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CarCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  passenger: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  luggage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  hourlyRate: PropTypes.string.isRequired,
};

export default CarCard;
