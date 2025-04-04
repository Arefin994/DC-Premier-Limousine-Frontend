import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { link } from "framer-motion/client";
{
  /* overflow-hidden */
}
const Card = ({ name, description, imageUrl, features, to }) => {
  return (
    <Link
      to={to}
      className="group relative  h-96 w-72 
      bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-300 
      rounded-3xl  shadow-2xl shadow-black cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          transform: "translateZ(65px)",
          transformStyle: "preserve-3d",
          backgroundImage: `url(${imageUrl})`,
        }}
        className="absolute inset-1 rounded-3xl bg-cover bg-center"
      >
        <div className="w-full h-full rounded-3xl bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-500 ease-in-out">
          <div className="relative p-4">
            <p className="text-xl font-bold tracking-widest sm:text-2xl text-[#FFD700] uppercase">
              {name}
            </p>
            <div className="mt-4 sm:mt-6 lg:mt-8">
              <div className="transform opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100">
                <p className="text-sm text-white">{description}</p>
                {/* Features list */}
                {features && features.length > 0 && (
                  <ul className="text-sm text-white mt-2 list-disc pl-5">
                    {features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;

// <motion.div
// className="p-4 "
// initial={{ opacity: 0.5 }}
// whileInView={{ opacity: 1 }}
// transition={{ duration: 0.5, delay: 0.3 }}
// viewport={{ once: true }}
// >
// <div className="relative">
//   <p className="text-xl font-bold tracking-widest sm:text-2xl text-[#FFD700] uppercase shadow-2xl">
//     {name}
//   </p>
//   <div className="mt-32 sm:mt-48 lg:mt-64">
//     <div className="transform opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100">
//       <p className="text-sm text-white">{description}</p>
//       {/* Features list */}
//       {features && features.length > 0 && (
//         <ul className="text-sm text-white mt-2 list-disc pl-5">
//           {features.map((feature, index) => (
//             <li key={index}>{feature}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   </div>
// </div>
// </motion.div>
