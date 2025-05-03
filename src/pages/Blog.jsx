import React, { useState, useEffect } from "react";
import {
  Calendar,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

const API_BASE_URL = '/api';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs`);
      setBlogPosts(response.data);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300); // Wait for animation to complete
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      } 
    },
    hover: {
      y: -8,
      transition: { duration: 0.3 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
        <motion.div
          animate={{ 
            rotate: 360,
            transition: { 
              duration: 0.8, 
              repeat: Infinity, 
              ease: "linear" 
            } 
          }}
          className="w-12 h-12 border-4 border-[#FFD700] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog - DC Premier Limo</title>
        <meta name="description" content="Read our blog for expert guides, industry trends, and tips on luxury transportation in Washington D.C." />
        <meta name="keywords" content="limo blog, luxury transportation tips, DC limo insights" />
      </Helmet>

      <div className="bg-[#1A1A1A] text-white min-h-screen font-sans">
        {/* Animated Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="py-20 bg-gradient-to-b from-[#262626] to-[#1A1A1A]"
        >
          <div className="container mx-auto px-6 pt-16 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block mb-6"
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-[#FFD700] mb-6"
              >
                Luxury Transport Insights
              </motion.h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-[#AAAAAA] max-w-4xl mx-auto leading-relaxed"
            >
              Discover expert guides, industry trends, and insider tips to elevate
              your travel experience.
            </motion.p>
          </div>
        </motion.header>

        {/* Blog Posts Grid */}
        <main className="container mx-auto px-6 py-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post._id}
                variants={item}
                whileHover="hover"
                className="bg-[#262626] rounded-xl shadow-lg overflow-hidden flex flex-col group relative"
              >
                <div className="overflow-hidden relative">
                  <motion.img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-[#FFE657] bg-[#626262] rounded-full mb-3">
                    {post.category || 'General'}
                  </span>
                  <h2 className="text-2xl font-bold text-[#FFD700] mb-3 leading-tight">
                    {post.title}
                  </h2>
                  <div className="flex items-center text-[#AAAAAA] text-sm mb-4">
                    <Calendar size={16} className="mr-2" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-[#AAAAAA] mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt || post.content.substring(0, 70) + '...'}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal(post)}
                    className="mt-auto inline-flex items-center text-[#FFD700] hover:text-[#FFE657] transition duration-300 self-start group/link"
                  >
                    <span className="relative">
                      Read More
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#FFE657] transition-all duration-300 group-hover/link:w-full"></span>
                    </span>
                    <ArrowRight
                      size={18}
                      className="ml-2 transform transition-transform duration-300 group-hover/link:translate-x-2"
                    />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </main>

        {/* Newsletter Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-16 bg-[#262626]"
        >
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#FFD700] mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-[#AAAAAA] max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter for the latest luxury transport insights
              and exclusive offers.
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none text-gray-900 bg-white placeholder-gray-600"
              />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FFD700] hover:bg-[#FFE657] text-gray-900 font-bold px-6 py-3 rounded-r-lg transition duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#262626] shadow-2xl border border-[#626262]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="sticky top-0 z-10 bg-[#262626] p-4 border-b border-[#626262] flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-[#FFD700]">
                    {selectedPost?.title}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeModal}
                    className="text-[#AAAAAA] hover:text-[#FFD700] transition-colors"
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-[#AAAAAA] text-sm mb-6">
                    <Calendar size={16} className="mr-2" />
                    <span>{selectedPost && new Date(selectedPost.createdAt).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span className="text-[#FFE657]">{selectedPost?.category}</span>
                  </div>

                  <div className="mb-8 overflow-hidden rounded-lg">
                    <motion.img
                      src={selectedPost?.imageUrl}
                      alt={selectedPost?.title}
                      className="w-full h-64 object-cover"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="prose prose-invert max-w-none text-[#AAAAAA]"
                  >
                    {selectedPost?.content.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Blog;