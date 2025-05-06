import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FaPlay, FaChevronRight, FaTimes, FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Helper function to extract YouTube ID from any URL format
  const getYouTubeId = (url) => {
    if (!url) return null;

    // Standard YouTube links
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    }

    // Short youtu.be links
    if (url.includes("youtu.be/")) {
      return url.split("youtu.be/")[1].split(/[?&#]/)[0];
    }

    // Embed links
    if (url.includes("youtube.com/embed/")) {
      return url.split("youtube.com/embed/")[1].split(/[?&#]/)[0];
    }

    return null;
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://dc-premier-limousine-backend-api.vercel.app/api/videos`
        );

        const videoData = response.data
          .map((video) => {
            const videoId = getYouTubeId(video.url);

            if (!videoId) {
              console.warn("Could not extract YouTube ID from URL:", video.url);
              return null;
            }

            return {
              id: video._id,
              youtubeId: videoId,
              title: `Luxury Limousine Service`,
              description: "Experience our premium transportation service",
              thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
              embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1`,
              createdAt: video.createdAt,
            };
          })
          .filter(Boolean); // Remove any null entries

        setVideos(videoData);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Videos - DC Premier Limousine</title>
        <meta
          name="description"
          content="Explore our luxury transportation services through our video collection"
        />
      </Helmet>

      <div className="bg-gradient-to-b from-[#1A1A1A] to-[#262626] text-[#AAAAAA] min-h-screen">
        {/* Hero Section */}
        <div className="relative h-96 flex items-center justify-center overflow-hidden bg-slate-900 shadow-2xl border-b-2 border-[#FFD700]">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-0" />
          <div className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1702339955839-489ff9b5ce58')] opacity-50" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-6"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              <span className="text-[#FFD700]">Premium</span> Video Gallery
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Witness the elegance of our luxury fleet in motion
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-16 h-16 border-4 border-[#FFD700] border-t-transparent rounded-full mb-4"
              />
              <p className="text-[#FFD700]">Loading videos...</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {videos.map((video) => (
                  <motion.div
                    key={video.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{
                      y: -10,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-lg border border-[#3A3A3A] hover:border-[#FFD700] group relative"
                    onClick={() => setSelectedVideo(video.embedUrl)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-[#FFD700] text-black p-5 rounded-full transform scale-90 group-hover:scale-110 transition-all duration-300 shadow-xl">
                          <FaPlay className="text-2xl" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white drop-shadow-lg">
                          {video.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6 bg-gradient-to-b from-[#2A2A2A] to-[#1E1E1E]">
                      <p className="text-gray-300 mb-5 line-clamp-2">
                        {video.description}
                      </p>
                      <motion.button
                        whileHover={{ x: 5, backgroundColor: "#FFE657" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#FFD700] text-black font-medium px-5 py-2.5 rounded-lg flex items-center gap-2"
                      >
                        Watch Now <FaChevronRight />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Enhanced Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-[#3A3A3A]"
              >
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 bg-black/70 text-white hover:text-[#FFD700] p-2 rounded-full z-10 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
                <iframe
                  src={selectedVideo}
                  className="w-full h-full"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, backgroundColor: "#FFE657" }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 bg-[#FFD700] text-black p-4 rounded-full shadow-xl hover:shadow-2xl transition-all z-50 flex items-center justify-center"
            style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)" }}
          >
            <FaArrowUp size={20} />
          </motion.button>
        )}
      </div>
    </>
  );
};

export default Videos;

{
  /* <iframe width="560" height="315" src="https://www.youtube.com/embed/FzpjHINVsIs?si=jEU2dZTefM1cmzhB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Kp9LmSy8I9Q?si=7eCa3uoB-NxcYxUb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ani9dWmdW_w?si=gWqzVIBzA6z3wacn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/PqvSJ4t_Bic?si=gGSFEOGreyN-SFs7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

https://www.youtube.com/embed/FzpjHINVsIs?si=jEU2dZTefM1cmzhB
https://www.youtube.com/embed/Kp9LmSy8I9Q?si=7eCa3uoB-NxcYxUb
https://www.youtube.com/embed/ani9dWmdW_w?si=gWqzVIBzA6z3wacn
https://www.youtube.com/embed/PqvSJ4t_Bic?si=gGSFEOGreyN-SFs7 */
}
