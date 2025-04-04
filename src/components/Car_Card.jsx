import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { link } from "framer-motion/client";

const ProfileCard = ({ name, imageUrl, passenger, luggage, hourlyRate }) => {
  return (
    <Link to="/fleet">
      <div
        className="w-[320px] h-[320px] bg-black bg-opacity-80 rounded-3xl relative shadow-xl shadow-black/50
    transition-all duration-500 ease-in-out hover:rounded-tl-[56px] group hover:delay-500"
      >
        {/* Profile Image */}
        <div
          className="absolute w-[calc(100%-12px)] h-[calc(100%-12px)] top-1.5 left-1.5 
      rounded-3xl z-10  border-[#FFD700] overflow-hidden transition-all duration-500 
      ease-in-out delay-200 group-hover:w-[100px] group-hover:h-[100px] group-hover:aspect-square 
      group-hover:top-[10px] group-hover:left-[10px] group-hover:rounded-full group-hover:z-30 
      group-hover:border-[8px] group-hover:border-[#FFD700] group-hover:shadow-[0_5px_5px_0_rgba(96,75,74,0.19)] 
      group-hover:hover:scale-125 group-hover:hover:rounded-none group-hover:hover:w-[100px] 
      group-hover:hover:h-[100px] group-hover:hover:aspect-square "
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover object-[0px_0px] transition-all duration-500 ease-in-out"
            />
          ) : (
            <div className="w-full h-full bg-yellow-100"></div>
          )}
        </div>

        {/* Bottom Content */}
        <div
          className="absolute bottom-[4px] left-[4px] right-[4px] bg-black/60 top-[75%] 
      rounded-3xl z-20 shadow-[inset_0_5px_5px_0_rgba(96,75,74,0.19)] overflow-hidden border-4 border-black
      transition-all duration-500 [transition-timing-function:cubic-bezier(0.645,0.045,0.355,1)] 
      group-hover:top-[20%] group-hover:rounded-3xl group-hover:delay-200"
        >
          <div className="absolute bottom-0 left-6 right-6 h-[65px] group-hover:h-4/6 transition-all duration-500 ease-in-out">
            <span className="block text-lg text-[#FFD700] font-bold">
              {name}
            </span>
            <span className="block text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              Passenger Capacity: {passenger}
              <br />
              Luggage Capacity: {luggage}
              <br />
              Hourly Rate: {hourlyRate}
            </span>
            <div className="absolute bottom-2 left-6 right-0 flex justify-end">
              <button
                className="bg-[#FFD700] text-black border-none rounded-[20px] text-xs py-1 px-2 
                             shadow-[0_5px_5px_0_rgba(165,132,130,0.13)] hover:bg-black 
                           hover:text-[#FFD700] transition-colors"
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

ProfileCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  passenger: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  luggage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  hourlyRate: PropTypes.string.isRequired,
};

export default ProfileCard;
