import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaPlay,
  FaClock,
  FaYoutube,
  FaChevronRight,
  FaTimes,
  FaArrowUp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Videos = () => {
  const youtubeLinks = [
    "https://youtu.be/FzpjHINVsIs?si=Zty74gYr2VkiSSJG",
    "https://youtu.be/Kp9LmSy8I9Q?si=gvJnRwSVOwa5ooj8",
    "https://youtu.be/ani9dWmdW_w?si=5PPj2XWxGluConRB",
    "https://youtu.be/PqvSJ4t_Bic?si=MVL9cLFWqtxTAc08",
  ];

  const categories = ["All", "Fleet", "Events", "Testimonials"];

  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [backgroundError, setBackgroundError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const videoData = await Promise.all(
          youtubeLinks.map(async (link) => {
            const videoId = link.split("youtu.be/")[1].split("?")[0];
            const apiUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            // Fetch video details from YouTube Data API
            const detailsResponse = await fetch(
              `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=YOUR_YOUTUBE_API_KEY`
            );
            const detailsData = await detailsResponse.json();
            const description =
              detailsData.items?.[0]?.snippet?.description ||
              "Experience luxury transportation at its finest";

            // Randomly assign a category for demo purposes
            const randomCategory =
              categories[
                Math.floor(Math.random() * (categories.length - 1)) + 1
              ];

            return {
              id: videoId,
              title: data.title,
              description: description,
              thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
              duration: "N/A",
              url: `https://www.youtube.com/embed/${videoId}`,
              category: randomCategory,
            };
          })
        );
        setVideos(videoData);
      } catch (error) {
        console.error("Error fetching video details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, []);

  const filteredVideos = videos.filter(
    (video) => activeCategory === "All" || video.category === activeCategory
  );

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
        <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black opacity-60 z-10" />
            {!backgroundError ? (
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1470847352555-49687d7bc7ec?q=80&w=2131&auto=format"
                onError={() => setBackgroundError(true)}
              >
                <source
                  src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761"
                  type="video/mp4"
                />
              </video>
            ) : (
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1470847352555-49687d7bc7ec?q=80&w=2131&auto=format")'
                }}
              />
            )}
          </div>
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Video <span className="text-[#FFD700]">Gallery</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200"
            >
              Experience the DC Premier Limousine difference
            </motion.p>
          </div>
        </div>

        {/* Sticky Category Filter */}
        <div className="top-0 z-10 bg-[#1A1A1A] bg-opacity-95 backdrop-blur-md border-b border-[#333333] py-4 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 overflow-x-auto py-1 px-1 no-scrollbar">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap text-sm sm:text-base sm:px-6 ${
                    activeCategory === category
                      ? "bg-[#FFD700] text-black font-semibold"
                      : "bg-[#262626] text-[#AAAAAA] hover:bg-[#333333]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-[#FFD700]">Loading videos...</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredVideos.map((video) => (
                  <motion.div
                    key={video.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -8 }}
                    className="bg-[#262626] rounded-xl overflow-hidden shadow-xl border border-[#333333] transform transition-all duration-300 hover:shadow-2xl hover:border-[#FFD700]"
                  >
                    <div
                      className="relative cursor-pointer group aspect-video"
                      onClick={() => setSelectedVideo(video.url)}
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23262626'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23AAAAAA'%3EVideo Thumbnail%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-[#FFD700] text-black p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <FaPlay className="text-xl" />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 bg-[#FFD700] text-black px-3 py-1 rounded-full text-sm font-medium">
                        {video.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {video.description}
                      </p>
                      <button
                        onClick={() => setSelectedVideo(video.url)}
                        className="inline-flex items-center text-[#FFD700] hover:text-[#FFE657] group"
                      >
                        Watch Video{" "}
                        <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-6xl h-[90vh] flex flex-col"
              >
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute -top-12 right-0 text-white hover:text-[#FFD700] transition-colors z-10"
                >
                  <FaTimes size={24} />
                </button>
                <iframe
                  src={selectedVideo}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-[#FFD700] text-black p-4 rounded-full shadow-lg hover:bg-[#FFE657] transition-colors z-50"
          >
            <FaArrowUp size={24} />
          </motion.button>
        )}
      </div>
    </>
  );
};

export default Videos;