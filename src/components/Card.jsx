import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Card = ({ name, description, imageUrl, features, to }) => {
  const [isTapped, setIsTapped] = useState(false);

  return (
    <>
      <Helmet>
        <title>{name} - DC Premier Limousine</title>
        <meta name="description" content={`Explore ${name} with features like ${features?.join(", ")}.`} />
      </Helmet>
      <div
        className="group relative h-96 w-72 
        bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-300 
        rounded-3xl shadow-2xl shadow-black cursor-pointer"
        onTouchStart={() => setIsTapped(!isTapped)} // Toggle on tap
        onMouseEnter={() => setIsTapped(true)} // Show on hover
        onMouseLeave={() => setIsTapped(false)} // Hide on leave
      >
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
          className="absolute inset-1 rounded-3xl bg-cover bg-center"
        >
          <div className={`w-full h-full rounded-3xl bg-black transition-all duration-500 ease-in-out ${
            isTapped ? "bg-opacity-50" : "bg-opacity-0"
          }`}>
            <div className="relative p-4 h-full flex flex-col">
              <div>
                <p className="text-xl font-bold tracking-widest sm:text-2xl text-[#FFD700] uppercase">
                  {name}
                </p>
              </div>
              
              <div className="mt-4 sm:mt-6 lg:mt-8 flex-grow overflow-hidden">
                <div className={`transition-all duration-500 ease-in-out h-full flex flex-col ${
                  isTapped ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}>
                  <div className="overflow-y-auto flex-grow pr-2 custom-scrollbar">
                    <p className="text-sm text-white mb-2">{description}</p>
                    {features && features.length > 0 && (
                      <ul className="text-sm text-white mt-2 list-disc pl-5">
                        {features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  <div className="mt-auto pt-2">
                    <Link 
                      to={to} 
                      className="inline-block px-4 py-2 text-sm font-medium text-white bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-300 rounded-lg hover:from-orange-700 hover:via-amber-700 hover:to-yellow-400 transition-colors shadow-md"
                      onClick={(e) => e.stopPropagation()} // Prevent card tap from interfering
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;