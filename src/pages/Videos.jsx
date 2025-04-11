import React from 'react';
import { Helmet } from 'react-helmet-async';

const Videos = () => {
  const videos = [
    {
      title: 'Luxury Fleet Tour',
      description: 'Take a virtual tour of our premium vehicle fleet.',
      thumbnail: '🎥',
      duration: '2:30'
    },
    {
      title: 'Customer Testimonials',
      description: 'Hear what our satisfied customers have to say about our service.',
      thumbnail: '🎬',
      duration: '3:15'
    },
    {
      title: 'Behind the Scenes',
      description: 'See how we maintain our vehicles and train our chauffeurs.',
      thumbnail: '📹',
      duration: '4:20'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Videos - DC Premier Limo</title>
        <meta name="description" content="Watch videos showcasing our luxury fleet, customer testimonials, and behind-the-scenes operations." />
        <meta name="keywords" content="limo videos, luxury fleet tour, customer testimonials, DC limo videos" />
      </Helmet>
      <main className="container mx-auto px-4 py-8">
        <header>
          <h1 className="text-4xl font-bold mb-6">Videos</h1>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <article key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <div className="text-6xl p-8 bg-gray-100 flex justify-center items-center">
                  {video.thumbnail}
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Watch Video
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
};

export default Videos;