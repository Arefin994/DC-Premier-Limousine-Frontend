import React from 'react';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - DC Premier Limo</title>
        <meta name="description" content="Learn about DC Premier Limo, a trusted provider of luxury transportation services since 2010. Discover our mission and vision." />
        <meta name="keywords" content="about DC Premier Limo, luxury transportation, limo services, company mission" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">About DC Premier Limo</h1>
        <p>Discover our <a href="/services" className="text-blue-500">services</a> and <a href="/fleet" className="text-blue-500">luxury fleet</a>.</p>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2010, Limo Rental Service has been at the forefront of luxury transportation.
              We pride ourselves on providing exceptional service and maintaining the highest standards
              in the industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To provide safe, reliable, and luxurious transportation services while ensuring
                customer satisfaction and comfort.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading provider of luxury transportation services, known for our
                exceptional service quality and customer care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;