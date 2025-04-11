import React from "react";
import {
  Calendar,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';

// Enhanced blog post data
const blogPosts = [
  {
    id: 1,
    title: "Top 7 Reasons to Choose a Luxury Limo for Your Wedding",
    excerpt:
      "Your wedding day deserves nothing but perfection. Beyond the obvious elegance, luxury limousines offer climate control, privacy partitions, champagne service, and spacious interiors for bridal parties. Professional chauffeurs handle D.C. traffic while you relax. We explore how the right vehicle can reduce stress and create unforgettable photo opportunities.",
    imageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04d7f7d019?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    altText: "Luxury limo for wedding day",
    date: "May 15, 2024",
    link: "#",
    category: "Weddings",
  },
  {
    id: 2,
    title: "Corporate Event Success Starts with Luxury Transportation",
    excerpt:
      "First impressions matter in business. Our analysis shows companies using professional transportation services see 28% higher client satisfaction scores. Learn how to coordinate multi-vehicle logistics for conferences, how discreet chauffeurs enhance executive travel, and why hybrid luxury vehicles are becoming the choice for eco-conscious firms in the capital region.",
    imageUrl:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    altText: "Luxury transportation for corporate events",
    date: "April 28, 2024",
    link: "#",
    category: "Business",
  },
  {
    id: 3,
    title: "Airport Transfers: Why Professional Beats Rideshare Every Time",
    excerpt:
      "Comparing costs between rideshares and chauffeur services reveals surprising truths. With meet-and-greet service, flight tracking, and 24/7 availability, professional drivers eliminate airport stress. We break down hidden rideshare costs, luggage capacity issues, and safety considerations - plus tips for getting the best value on your next DCA, IAD, or BWI transfer.",
    imageUrl:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    altText: "Professional airport transfer service",
    date: "April 22, 2024",
    link: "#",
    category: "Travel",
  },
  {
    id: 4,
    title: "2024 Luxury Vehicle Guide: Matching Cars to Occasions",
    excerpt:
      "From classic stretch limousines to sleek Mercedes Sprinter vans, each vehicle serves different needs. Our comprehensive guide helps you choose: 10-passenger SUVs for sports teams, vintage cars for proms, or armored vehicles for executives. Includes maintenance tips to keep your chosen vehicle looking pristine for the big event.",
    imageUrl:
      "https://images.unsplash.com/photo-1617933472044-384a37a1b0a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    altText: "Guide to luxury vehicles",
    date: "April 10, 2024",
    link: "#",
    category: "Guide",
  },
  {
    id: 5,
    title: "The Green Luxury Revolution: Eco-Friendly Transport Trends",
    excerpt:
      "The luxury transportation industry is going green without compromising comfort. Discover how electric limousines achieve 300-mile ranges, how carbon offset programs work, and why hybrid executive cars are dominating D.C.s political circuit. We interview fleet managers about the challenges and rewards of sustainable luxury service.",
    imageUrl:
      "https://images.unsplash.com/photo-1629444295295-7ad2f1a0a5b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    altText: "Eco-friendly luxury transport",
    date: "March 29, 2024",
    link: "#",
    category: "Trends",
  },
  {
    id: 6,
    title: "Behind the Scenes: The Life of a Luxury Chauffeur",
    excerpt:
      "What does it take to become a top-tier chauffeur in Washington D.C.? We follow a 20-year veteran through a typical day - from pre-dawn vehicle inspections to navigating diplomatic motorcades. Learn about the extensive training, discreet professionalism, and local knowledge that separates true luxury service from ordinary drivers.",
    imageUrl:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    altText: "Life of a luxury chauffeur",
    date: "March 15, 2024",
    link: "#",
    category: "Insider",
  },
];

const Blog = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Helmet>
        <title>Blog - DC Premier Limo</title>
        <meta name="description" content="Read our blog for expert guides, industry trends, and tips on luxury transportation in Washington D.C." />
        <meta name="keywords" content="limo blog, luxury transportation tips, DC limo insights" />
      </Helmet>
      <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen font-sans">
        {/* Animated Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl"
        >
          <div className="container mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-[#FFD700] mb-6"
            >
              Luxury Transport Insights
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Discover expert guides, industry trends, and insider tips to elevate
              your travel experience. Whether planning a wedding, corporate event,
              or special occasion, our curated articles help you navigate the
              world of premium transportation in Washington D.C. and beyond.
            </motion.p>
          </div>
        </motion.header>

        {/* Blog Posts Grid */}
        <main className="container mx-auto px-6 py-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={item}
                whileHover={{ y: -10 }}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:shadow-2xl flex flex-col group"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.altText}
                    className="w-full h-64 object-cover transform transition duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-[#FFD700] bg-gray-700 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h2 className="text-2xl font-bold text-[#FFD700] mb-4 leading-tight">
                    {post.title}
                  </h2>
                  <div className="flex items-center text-gray-400 text-sm mb-5">
                    <Calendar size={16} className="mr-2" />
                    <span>{post.date}</span>
                  </div>
                  <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
                    {post.excerpt}
                  </p>
                  <a
                    href={post.link}
                    className="mt-auto inline-flex items-center text-[#FFD700] hover:text-yellow-300 transition duration-300 self-start group/link"
                  >
                    <span className="relative">
                      Read More
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover/link:w-full"></span>
                    </span>
                    <ArrowRight
                      size={18}
                      className="ml-2 transform transition-transform duration-300 group-hover/link:translate-x-2"
                    />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </main>

        {/* Newsletter Section */}
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#FFD700] mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter for the latest luxury transport insights
              and exclusive offers.
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none text-gray-900"
              />
              <button className="bg-[#FFD700] hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-r-lg transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold text-[#FFD700] mb-4">
                  Luxury Transport Services
                </h3>
                <p className="max-w-xs">
                  Premium transportation solutions for Washington D.C. and
                  surrounding areas.
                </p>
              </div>

              <div className="flex space-x-6 mb-6 md:mb-0">
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#FFD700] transition duration-300"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#FFD700] transition duration-300"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#FFD700] transition duration-300"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#FFD700] transition duration-300"
                >
                  <Mail size={24} />
                </a>
              </div>

              <div className="text-sm">
                <p>
                  &copy; {new Date().getFullYear()} Luxury Transport Services. All
                  Rights Reserved.
                </p>
                <p className="mt-2">Designed with elegance in Washington D.C.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Blog;
