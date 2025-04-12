import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  // Navigation hook for routing
  const navigate = useNavigate();
  
  // State management for authentication and UI
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('fleet'); // Current active tab in admin dashboard
  const [error, setError] = useState('');

  // State for managing different content types
  const [topFleet, setTopFleet] = useState([
    {
      name: "Mercedes S600 Limo",
      imageUrl: "https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Mercedes S600 luxury limousine",
      passenger: 6,
      luggage: 4,
      hourlyRate: "$120/hour",
    },
    // ... more fleet items
  ]);

  const [ServiceData, setServiceData] = useState([
    {
      name: "Airport Transfers",
      description: "Enjoy seamless airport transport with our luxury fleet...",
      imageUrl: "https://images.unsplash.com/photo-1616620418290-81a162f05e5d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      features: [
        "Flight tracking for delayed arrivals",
        "Meet & greet with name signage",
        "Disinfectant wipes & sanitizer provided",
        "24/7 availability including holidays",
      ],
      to: "/services",
    },
    // ... more service items
  ]);

  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "Top 7 Reasons to Choose a Luxury Limo for Your Wedding",
      excerpt: "Your wedding day deserves nothing but perfection...",
      imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04d7f7d019?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      altText: "Luxury limo for wedding day",
      date: "May 15, 2024",
      link: "#",
      category: "Weddings",
    },
    // ... more blog posts
  ]);

  const [youtubeLinks, setYoutubeLinks] = useState([
    "https://youtu.be/FzpjHINVsIs?si=Zty74gYr2VkiSSJG",
    "https://youtu.be/Kp9LmSy8I9Q?si=gvJnRwSVOwa5ooj8",
    // ... more YouTube links
  ]);

  // Form states for each content type
  const [fleetForm, setFleetForm] = useState({
    name: '',
    imageUrl: '',
    altText: '',
    passenger: '',
    luggage: '',
    hourlyRate: ''
  });

  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    imageUrl: '',
    features: [''],
    to: '/services'
  });

  const [blogForm, setBlogForm] = useState({
    id: '',
    title: '',
    excerpt: '',
    imageUrl: '',
    altText: '',
    date: new Date().toISOString().split('T')[0],
    link: '#',
    category: ''
  });

  const [youtubeForm, setYoutubeForm] = useState('');

  // Edit states for tracking which item is being edited
  const [editingFleet, setEditingFleet] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingYoutube, setEditingYoutube] = useState(null);

  // Authentication handlers
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple password check - replace with proper auth in production
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
    navigate('/admin');
  };

  // Fleet management handlers
  const handleAddFleet = (e) => {
    e.preventDefault();
    const newFleet = {
      name: fleetForm.name,
      imageUrl: fleetForm.imageUrl,
      altText: fleetForm.altText,
      passenger: parseInt(fleetForm.passenger),
      luggage: parseInt(fleetForm.luggage),
      hourlyRate: fleetForm.hourlyRate
    };
    setTopFleet([...topFleet, newFleet]);
    setFleetForm({
      name: '',
      imageUrl: '',
      altText: '',
      passenger: '',
      luggage: '',
      hourlyRate: ''
    });
  };

  const handleEditFleet = (index) => {
    setEditingFleet(index);
    setFleetForm({
      name: topFleet[index].name,
      imageUrl: topFleet[index].imageUrl,
      altText: topFleet[index].altText,
      passenger: topFleet[index].passenger,
      luggage: topFleet[index].luggage,
      hourlyRate: topFleet[index].hourlyRate
    });
  };

  const handleUpdateFleet = (e) => {
    e.preventDefault();
    const updatedFleet = [...topFleet];
    updatedFleet[editingFleet] = {
      name: fleetForm.name,
      imageUrl: fleetForm.imageUrl,
      altText: fleetForm.altText,
      passenger: parseInt(fleetForm.passenger),
      luggage: parseInt(fleetForm.luggage),
      hourlyRate: fleetForm.hourlyRate
    };
    setTopFleet(updatedFleet);
    setEditingFleet(null);
    setFleetForm({
      name: '',
      imageUrl: '',
      altText: '',
      passenger: '',
      luggage: '',
      hourlyRate: ''
    });
  };

  const handleDeleteFleet = (index) => {
    const updatedFleet = topFleet.filter((_, i) => i !== index);
    setTopFleet(updatedFleet);
  };

  // Service CRUD operations
  const handleAddService = (e) => {
    e.preventDefault();
    const newService = {
      name: serviceForm.name,
      description: serviceForm.description,
      imageUrl: serviceForm.imageUrl,
      features: serviceForm.features.filter(f => f.trim() !== ''),
      to: serviceForm.to
    };
    setServiceData([...ServiceData, newService]);
    setServiceForm({
      name: '',
      description: '',
      imageUrl: '',
      features: [''],
      to: '/services'
    });
  };

  const handleEditService = (index) => {
    setEditingService(index);
    setServiceForm({
      name: ServiceData[index].name,
      description: ServiceData[index].description,
      imageUrl: ServiceData[index].imageUrl,
      features: [...ServiceData[index].features, ''],
      to: ServiceData[index].to
    });
  };

  const handleUpdateService = (e) => {
    e.preventDefault();
    const updatedService = [...ServiceData];
    updatedService[editingService] = {
      name: serviceForm.name,
      description: serviceForm.description,
      imageUrl: serviceForm.imageUrl,
      features: serviceForm.features.filter(f => f.trim() !== ''),
      to: serviceForm.to
    };
    setServiceData(updatedService);
    setEditingService(null);
    setServiceForm({
      name: '',
      description: '',
      imageUrl: '',
      features: [''],
      to: '/services'
    });
  };

  const handleDeleteService = (index) => {
    const updatedService = ServiceData.filter((_, i) => i !== index);
    setServiceData(updatedService);
  };

  const handleServiceFeatureChange = (index, value) => {
    const updatedFeatures = [...serviceForm.features];
    updatedFeatures[index] = value;
    setServiceForm({ ...serviceForm, features: updatedFeatures });
  };

  const handleAddServiceFeature = () => {
    setServiceForm({ ...serviceForm, features: [...serviceForm.features, ''] });
  };

  const handleRemoveServiceFeature = (index) => {
    const updatedFeatures = serviceForm.features.filter((_, i) => i !== index);
    setServiceForm({ ...serviceForm, features: updatedFeatures });
  };

  // Blog CRUD operations
  const handleAddBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      id: blogPosts.length > 0 ? Math.max(...blogPosts.map(b => b.id)) + 1 : 1,
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      imageUrl: blogForm.imageUrl,
      altText: blogForm.altText,
      date: blogForm.date,
      link: blogForm.link,
      category: blogForm.category
    };
    setBlogPosts([...blogPosts, newBlog]);
    setBlogForm({
      id: '',
      title: '',
      excerpt: '',
      imageUrl: '',
      altText: '',
      date: new Date().toISOString().split('T')[0],
      link: '#',
      category: ''
    });
  };

  const handleEditBlog = (index) => {
    setEditingBlog(index);
    setBlogForm({
      id: blogPosts[index].id,
      title: blogPosts[index].title,
      excerpt: blogPosts[index].excerpt,
      imageUrl: blogPosts[index].imageUrl,
      altText: blogPosts[index].altText,
      date: blogPosts[index].date,
      link: blogPosts[index].link,
      category: blogPosts[index].category
    });
  };

  const handleUpdateBlog = (e) => {
    e.preventDefault();
    const updatedBlog = [...blogPosts];
    updatedBlog[editingBlog] = {
      id: blogForm.id,
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      imageUrl: blogForm.imageUrl,
      altText: blogForm.altText,
      date: blogForm.date,
      link: blogForm.link,
      category: blogForm.category
    };
    setBlogPosts(updatedBlog);
    setEditingBlog(null);
    setBlogForm({
      id: '',
      title: '',
      excerpt: '',
      imageUrl: '',
      altText: '',
      date: new Date().toISOString().split('T')[0],
      link: '#',
      category: ''
    });
  };

  const handleDeleteBlog = (index) => {
    const updatedBlog = blogPosts.filter((_, i) => i !== index);
    setBlogPosts(updatedBlog);
  };

  // YouTube Links CRUD operations
  const handleAddYoutubeLink = (e) => {
    e.preventDefault();
    setYoutubeLinks([...youtubeLinks, youtubeForm]);
    setYoutubeForm('');
  };

  const handleEditYoutubeLink = (index) => {
    setEditingYoutube(index);
    setYoutubeForm(youtubeLinks[index]);
  };

  const handleUpdateYoutubeLink = (e) => {
    e.preventDefault();
    const updatedLinks = [...youtubeLinks];
    updatedLinks[editingYoutube] = youtubeForm;
    setYoutubeLinks(updatedLinks);
    setEditingYoutube(null);
    setYoutubeForm('');
  };

  const handleDeleteYoutubeLink = (index) => {
    const updatedLinks = youtubeLinks.filter((_, i) => i !== index);
    setYoutubeLinks(updatedLinks);
  };

  // Login form UI
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] p-4">
        <div className="bg-[#262626] p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-[#FFD700] mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-[#AAAAAA] mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#FFD700] text-[#1A1A1A] py-2 px-4 rounded-md font-medium hover:bg-[#FFE657] transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Main admin dashboard UI
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white p-4 pt-24">
      {/* Header section with logout button */}
      <header className="bg-[#262626] p-4 rounded-lg mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#FFD700]">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-[#FFD700] text-[#1A1A1A] py-1 px-3 rounded-md font-medium hover:bg-[#FFE657] transition duration-200"
        >
          Logout
        </button>
      </header>

      {/* Navigation tabs */}
      <div className="flex mb-6 border-b border-[#626262]">
        <button
          onClick={() => setActiveTab('fleet')}
          className={`py-2 px-4 font-medium ${activeTab === 'fleet' ? 'text-[#FFD700] border-b-2 border-[#FFD700]' : 'text-[#AAAAAA] hover:text-[#FFE657]'}`}
        >
          Fleet
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`py-2 px-4 font-medium ${activeTab === 'services' ? 'text-[#FFD700] border-b-2 border-[#FFD700]' : 'text-[#AAAAAA] hover:text-[#FFE657]'}`}
        >
          Services
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`py-2 px-4 font-medium ${activeTab === 'blog' ? 'text-[#FFD700] border-b-2 border-[#FFD700]' : 'text-[#AAAAAA] hover:text-[#FFE657]'}`}
        >
          Blog
        </button>
        <button
          onClick={() => setActiveTab('youtube')}
          className={`py-2 px-4 font-medium ${activeTab === 'youtube' ? 'text-[#FFD700] border-b-2 border-[#FFD700]' : 'text-[#AAAAAA] hover:text-[#FFE657]'}`}
        >
          YouTube Links
        </button>
      </div>

      {/* Content sections based on active tab */}
      {activeTab === 'fleet' && (
        <div className="space-y-8">
          {/* Fleet form section */}
          <div className="bg-[#262626] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-[#FFD700] mb-4">
              {editingFleet !== null ? 'Edit Fleet Vehicle' : 'Add New Fleet Vehicle'}
            </h2>
            <form onSubmit={editingFleet !== null ? handleUpdateFleet : handleAddFleet} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fleet-name" className="block text-[#AAAAAA] mb-2">Name</label>
                  <input
                    type="text"
                    id="fleet-name"
                    value={fleetForm.name}
                    onChange={(e) => setFleetForm({ ...fleetForm, name: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="fleet-image" className="block text-[#AAAAAA] mb-2">Image URL</label>
                  <input
                    type="text"
                    id="fleet-image"
                    value={fleetForm.imageUrl}
                    onChange={(e) => setFleetForm({ ...fleetForm, imageUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="fleet-alt" className="block text-[#AAAAAA] mb-2">Alt Text</label>
                  <input
                    type="text"
                    id="fleet-alt"
                    value={fleetForm.altText}
                    onChange={(e) => setFleetForm({ ...fleetForm, altText: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="fleet-passenger" className="block text-[#AAAAAA] mb-2">Passenger Capacity</label>
                  <input
                    type="number"
                    id="fleet-passenger"
                    value={fleetForm.passenger}
                    onChange={(e) => setFleetForm({ ...fleetForm, passenger: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="fleet-luggage" className="block text-[#AAAAAA] mb-2">Luggage Capacity</label>
                  <input
                    type="number"
                    id="fleet-luggage"
                    value={fleetForm.luggage}
                    onChange={(e) => setFleetForm({ ...fleetForm, luggage: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="fleet-rate" className="block text-[#AAAAAA] mb-2">Hourly Rate</label>
                  <input
                    type="text"
                    id="fleet-rate"
                    value={fleetForm.hourlyRate}
                    onChange={(e) => setFleetForm({ ...fleetForm, hourlyRate: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                {editingFleet !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingFleet(null);
                      setFleetForm({
                        name: '',
                        imageUrl: '',
                        altText: '',
                        passenger: '',
                        luggage: '',
                        hourlyRate: ''
                      });
                    }}
                    className="mr-2 bg-[#626262] text-white py-2 px-4 rounded-md hover:bg-[#AAAAAA] transition duration-200"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-[#FFD700] text-[#1A1A1A] py-2 px-4 rounded-md font-medium hover:bg-[#FFE657] transition duration-200"
                >
                  {editingFleet !== null ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>

          {/* Fleet list section */}
          <div className="bg-[#262626] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-[#FFD700] mb-4">Current Fleet</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#1A1A1A] rounded-lg overflow-hidden">
                <thead className="bg-[#626262]">
                  <tr>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Passengers</th>
                    <th className="py-3 px-4 text-left">Luggage</th>
                    <th className="py-3 px-4 text-left">Rate</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {topFleet.map((vehicle, index) => (
                    <tr key={index} className="border-b border-[#626262] hover:bg-[#2A2A2A]">
                      <td className="py-3 px-4">{vehicle.name}</td>
                      <td className="py-3 px-4">{vehicle.passenger}</td>
                      <td className="py-3 px-4">{vehicle.luggage}</td>
                      <td className="py-3 px-4">{vehicle.hourlyRate}</td>
                      <td className="py-3 px-4 flex space-x-2">
                        <button
                          onClick={() => handleEditFleet(index)}
                          className="text-[#FFD700] hover:text-[#FFE657]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteFleet(index)}
                          className="text-red-500 hover:text-red-400"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Services Management */}
      {activeTab === 'services' && (
        <div className="space-y-8">
          <div className="bg-[#262626] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-[#FFD700] mb-4">
              {editingService !== null ? 'Edit Service' : 'Add New Service'}
            </h2>
            <form onSubmit={editingService !== null ? handleUpdateService : handleAddService} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="service-name" className="block text-[#AAAAAA] mb-2">Name</label>
                  <input
                    type="text"
                    id="service-name"
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="service-image" className="block text-[#AAAAAA] mb-2">Image URL</label>
                  <input
                    type="text"
                    id="service-image"
                    value={serviceForm.imageUrl}
                    onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="service-description" className="block text-[#AAAAAA] mb-2">Description</label>
                <textarea
                  id="service-description"
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-[#AAAAAA] mb-2">Features</label>
                {serviceForm.features.map((feature, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleServiceFeatureChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                      required={index === 0}
                    />
                    {serviceForm.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveServiceFeature(index)}
                        className="ml-2 bg-red-500 text-white px-3 rounded-md hover:bg-red-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddServiceFeature}
                  className="mt-2 bg-[#626262] text-white py-1 px-3 rounded-md hover:bg-[#AAAAAA]"
                >
                  + Add Feature
                </button>
              </div>
              <div className="flex justify-end">
                {editingService !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingService(null);
                      setServiceForm({
                        name: '',
                        description: '',
                        imageUrl: '',
                        features: [''],
                        to: '/services'
                      });
                    }}
                    className="mr-2 bg-[#626262] text-white py-2 px-4 rounded-md hover:bg-[#AAAAAA] transition duration-200"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-[#FFD700] text-[#1A1A1A] py-2 px-4 rounded-md font-medium hover:bg-[#FFE657] transition duration-200"
                >
                  {editingService !== null ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-[#262626] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-[#FFD700] mb-4">Current Services</h2>
            <div className="space-y-4">
              {ServiceData.map((service, index) => (
                <div key={index} className="bg-[#1A1A1A] p-4 rounded-lg border border-[#626262]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-[#FFD700]">{service.name}</h3>
                      <p className="text-[#AAAAAA] mt-1">{service.description}</p>
                      <ul className="mt-2 list-disc list-inside text-[#AAAAAA]">
                        {service.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditService(index)}
                        className="text-[#FFD700] hover:text-[#FFE657]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteService(index)}
                        className="text-red-500 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Blog Management */}
      {activeTab === 'blog' && (
        <div className="space-y-8">
          <div className="bg-[#262626] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-[#FFD700] mb-4">
              {editingBlog !== null ? 'Edit Blog Post' : 'Add New Blog Post'}
            </h2>
            <form onSubmit={editingBlog !== null ? handleUpdateBlog : handleAddBlog} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="blog-title" className="block text-[#AAAAAA] mb-2">Title</label>
                  <input
                    type="text"
                    id="blog-title"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="blog-category" className="block text-[#AAAAAA] mb-2">Category</label>
                  <input
                    type="text"
                    id="blog-category"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="blog-image" className="block text-[#AAAAAA] mb-2">Image URL</label>
                  <input
                    type="text"
                    id="blog-image"
                    value={blogForm.imageUrl}
                    onChange={(e) => setBlogForm({ ...blogForm, imageUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="blog-alt" className="block text-[#AAAAAA] mb-2">Alt Text</label>
                  <input
                    type="text"
                    id="blog-alt"
                    value={blogForm.altText}
                    onChange={(e) => setBlogForm({ ...blogForm, altText: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="blog-date" className="block text-[#AAAAAA] mb-2">Date</label>
                  <input
                    type="date"
                    id="blog-date"
                    value={blogForm.date}
                    onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="blog-excerpt" className="block text-[#AAAAAA] mb-2">Excerpt</label>
                <textarea
                  id="blog-excerpt"
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                {editingBlog !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBlog(null);
                      setBlogForm({
                        id: '',
                        title: '',
                        excerpt: '',
                        imageUrl: '',
                        altText: '',
                        date: new Date().toISOString().split('T')[0],
                        link: '#',
                        category: ''
                      });
                    }}
                    className="mr-2 bg-[#626262] text-white py-2 px-4 rounded-md hover:bg-[#AAAAAA] transition duration-200"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-[#FFD700] text-[#1A1A1A] py-2 px-4 rounded-md font-medium hover:bg-[#FFE657] transition duration-200"
                >
                  {editingBlog !== null ? 'Update Post' : 'Add Post'}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-[#262626] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-[#FFD700] mb-4">Current Blog Posts</h2>
            <div className="space-y-4">
              {blogPosts.map((post, index) => (
                <div key={index} className="bg-[#1A1A1A] p-4 rounded-lg border border-[#626262]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-[#FFD700]">{post.title}</h3>
                      <p className="text-sm text-[#AAAAAA] mt-1">{post.category} • {post.date}</p>
                      <p className="text-[#AAAAAA] mt-2">{post.excerpt}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditBlog(index)}
                        className="text-[#FFD700] hover:text-[#FFE657]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(index)}
                        className="text-red-500 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* YouTube Links Management */}
      {activeTab === 'youtube' && (
        <div className="space-y-8">
          <div className="bg-[#262626] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-[#FFD700] mb-4">
              {editingYoutube !== null ? 'Edit YouTube Link' : 'Add New YouTube Link'}
            </h2>
            <form onSubmit={editingYoutube !== null ? handleUpdateYoutubeLink : handleAddYoutubeLink} className="space-y-4">
              <div>
                <label htmlFor="youtube-link" className="block text-[#AAAAAA] mb-2">YouTube URL</label>
                <input
                  type="text"
                  id="youtube-link"
                  value={youtubeForm}
                  onChange={(e) => setYoutubeForm(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  placeholder="https://youtu.be/..."
                  required
                />
              </div>
              <div className="flex justify-end">
                {editingYoutube !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingYoutube(null);
                      setYoutubeForm('');
                    }}
                    className="mr-2 bg-[#626262] text-white py-2 px-4 rounded-md hover:bg-[#AAAAAA] transition duration-200"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-[#FFD700] text-[#1A1A1A] py-2 px-4 rounded-md font-medium hover:bg-[#FFE657] transition duration-200"
                >
                  {editingYoutube !== null ? 'Update Link' : 'Add Link'}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-[#262626] p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-[#FFD700] mb-4">Current YouTube Links</h2>
            <div className="space-y-2">
              {youtubeLinks.map((link, index) => (
                <div key={index} className="bg-[#1A1A1A] p-4 rounded-lg border border-[#626262] flex justify-between items-center">
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-[#FFD700] hover:underline truncate">
                    {link}
                  </a>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditYoutubeLink(index)}
                      className="text-[#FFD700] hover:text-[#FFE657]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteYoutubeLink(index)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;