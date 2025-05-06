import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Car_Card = ({
  name,
  imageUrl,
  altText, 
  passengerCapacity,
  laggageCapacity,
  hourlyRate,
  flag = false,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  // Combined hover and click state
  const isActive = isClicked || false; // Remove the "|| false" if you want click to override hover

  return (
    <div
      className={`group w-[320px] h-[320px] rounded-3xl relative shadow-xl shadow-black/50 bg-[#2c2c2c]
      transition-all duration-500 ease-in-out hover:rounded-tl-[56px] cursor-pointer
      ${isClicked ? "rounded-tl-[56px]" : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${name}`}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Profile Image */}
      <div
        className={`absolute w-[calc(100%-12px)] h-[calc(100%-12px)] top-1.5 left-1.5 
        rounded-3xl z-10 border-[#FFD700] overflow-hidden transition-all duration-500 
        ease-in-out delay-200 group-hover:w-[100px] group-hover:h-[100px] group-hover:aspect-square 
        group-hover:top-[10px] group-hover:left-[10px] group-hover:rounded-full group-hover:z-30 
        group-hover:border-[8px] group-hover:border-[#FFD700] group-hover:shadow-[0_5px_5px_0_rgba(26,26,26,0.19)]
        ${
          isClicked
            ? "!w-[100px] !h-[100px] !aspect-square !top-[10px] !left-[10px] !rounded-full !z-30 !border-[8px] !border-[#FFD700] !shadow-[0_5px_5px_0_rgba(26,26,26,0.19)]"
            : ""
        }`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover object-[0px_0px] transition-all duration-500 ease-in-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#FFE657]" aria-hidden="true" />
        )}
      </div>

      {/* Bottom Content */}
      <div
        className={`absolute bottom-[4px] left-[4px] right-[4px] bg-[#1A1A1A]/80 rounded-3xl z-20 
        shadow-[inset_0_5px_5px_0_rgba(26,26,26,0.19)] overflow-hidden border-4 border-[#626262]
        transition-all duration-500 [transition-timing-function:cubic-bezier(0.645,0.045,0.355,1)] 
        group-hover:top-[20%] top-[75%]
        ${isClicked ? "!top-[20%]" : ""}`}
      >
        <div
          className={`absolute bottom-0 left-6 right-6 transition-all duration-500 ease-in-out 
          group-hover:h-4/6 h-[65px]
          ${isClicked ? "!h-4/6" : ""}`}
        >
          <span className="block text-lg text-[#FFD700] font-bold">{name}</span>
          <div
            className={`max-h-[calc(100%-50px)] overflow-y-auto custom-scrollbar mt-2 
            transition-opacity duration-500 group-hover:opacity-100 opacity-0
            ${isClicked ? "!opacity-100" : ""}`}
          >
            <p className="text-sm text-[#AAAAAA] mb-2">{altText}</p>
            <span className="block text-sm text-[#AAAAAA]">
              Passenger Capacity: {passengerCapacity}
              <br />
              Luggage Capacity: {laggageCapacity}
              <br />
              Hourly Rate: {hourlyRate}$
            </span>
          </div>
          {flag && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-end">
              <Link
                to="/fleet"
                className="bg-[#FFD700] text-[#1A1A1A] border-none rounded-[20px] text-xs py-1 px-2 
                shadow-[0_5px_5px_0_rgba(26,26,26,0.13)] hover:bg-[#1A1A1A] hover:text-[#FFD700] 
                transition-colors"
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Car_Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  altText:PropTypes.string ,
  passengerCapacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  laggageCapacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  hourlyRate: PropTypes.number.isRequired,
  flag: PropTypes.bool,
};

export default Car_Card;
