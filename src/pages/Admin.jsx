import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = '/api';

// Helper function to get headers with token
const getHeaders = (token) => ({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
});

// Helper function to handle API errors
const handleApiError = (err, setError) => {
  console.error('API Error:', err);
  if (err.response?.data?.message) {
    setError(err.response.data.message);
  } else if (err.response?.status === 401) {
    setError('Session expired. Please login again.');
    localStorage.removeItem('adminToken');
    window.location.reload();
  } else {
    setError('An error occurred. Please try again.');
  }
};

const Admin = () => {
  // Navigation hook for routing
  const navigate = useNavigate();
  
  // State for managing different content types
  const [fleets, setFleets] = useState([]);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('fleet');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form states for each content type
  const [fleetForm, setFleetForm] = useState({
    name: '',
    imageUrl: '',
    altText: '',
    passengerCapacity: '',
    hourlyRate: ''
  });

  const [serviceForm, setServiceForm] = useState({
    name: '',
    imageUrl: '',
    description: '',
    features: ['']
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    author: ''
  });

  const [videoForm, setVideoForm] = useState({
    url: ''
  });

  // Edit states for tracking which item is being edited
  const [editingFleet, setEditingFleet] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);

  // Check for existing token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      fetchAllData();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_BASE_URL}/admins/login`, {
        username,
        password
      });
      
      if (response.data && response.data.token) {
        const newToken = response.data.token;
        localStorage.setItem('adminToken', newToken);
        setToken(newToken);
        setIsLoggedIn(true);
        
        // Add a small delay to ensure token is saved
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Fetch data with the new token
        await fetchAllData();
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear token from localStorage and state
    localStorage.removeItem('adminToken');
    setToken('');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    navigate('/admin');
  };

  const fetchAllData = async () => {
    if (!token) {
      console.error('No token available');
      setError('No authentication token found');
      setIsLoggedIn(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      // Fetch data sequentially to ensure proper error handling
      const fleetsRes = await axios.get(`${API_BASE_URL}/fleets`, { headers });
      const servicesRes = await axios.get(`${API_BASE_URL}/services`, { headers });
      const blogsRes = await axios.get(`${API_BASE_URL}/blogs`, { headers });
      const videosRes = await axios.get(`${API_BASE_URL}/videos`, { headers });
      
      // Ensure each item in the arrays has the required properties
      const processFleets = (data) => {
        if (!Array.isArray(data)) return [];
        return data.map(fleet => ({
          _id: fleet._id || Date.now(),
          name: fleet.name || '',
          imageUrl: fleet.imageUrl || '',
          altText: fleet.altText || '',
          passengerCapacity: fleet.passengerCapacity || 0,
          hourlyRate: fleet.hourlyRate || 0
        }));
      };

      const processServices = (data) => {
        if (!Array.isArray(data)) return [];
        return data.map(service => ({
          _id: service._id || Date.now(),
          name: service.name || '',
          description: service.description || '',
          imageUrl: service.imageUrl || '',
          features: Array.isArray(service.features) ? service.features : []
        }));
      };

      const processBlogs = (data) => {
        if (!Array.isArray(data)) return [];
        return data.map(blog => ({
          _id: blog._id || Date.now(),
          title: blog.title || '',
          content: blog.content || '',
          imageUrl: blog.imageUrl || ''
        }));
      };

      const processVideos = (data) => {
        if (!Array.isArray(data)) return [];
        return data.map(video => ({
          _id: video._id || Date.now(),
          title: video.title || '',
          url: video.url || '',
          description: video.description || ''
        }));
      };

      // Update state with processed data
      setFleets(processFleets(fleetsRes.data));
      setServices(processServices(servicesRes.data));
      setBlogs(processBlogs(blogsRes.data));
      setVideos(processVideos(videosRes.data));
      
    } catch (err) {
      console.error('Fetch data error:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        setToken('');
        setIsLoggedIn(false);
        setError('Session expired. Please login again.');
      } else {
        setError('Failed to fetch data: ' + (err.response?.data?.message || err.message));
      }
      // Reset all data arrays on error
      setFleets([]);
      setServices([]);
      setBlogs([]);
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Success Modal Component
  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#262626] p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold text-[#FFD700] mb-4">Success!</h3>
        <p className="text-white mb-6">{successMessage}</p>
        <button
          onClick={() => setShowSuccessModal(false)}
          className="w-full bg-[#FFD700] text-[#1A1A1A] py-2 px-4 rounded-md font-medium hover:bg-[#FFE657] transition duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );

  // Fleet management handlers
  const handleAddFleet = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/fleets`,
        {
          name: fleetForm.name,
          imageUrl: fleetForm.imageUrl,
          altText: fleetForm.altText,
          passengerCapacity: Number(fleetForm.passengerCapacity),
          hourlyRate: Number(fleetForm.hourlyRate)
        },
        { headers: getHeaders(token) }
      );
      setFleets(prevFleets => [...prevFleets, response.data]);
      setFleetForm({
        name: '',
        imageUrl: '',
        altText: '',
        passengerCapacity: '',
        hourlyRate: ''
      });
      setSuccessMessage('Fleet vehicle added successfully!');
      setShowSuccessModal(true);
      setError('');
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  const handleEditFleet = (index) => {
    setEditingFleet(index);
    setFleetForm(fleets[index]);
  };

  const handleUpdateFleet = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}/fleets/${fleets[editingFleet]._id}`,
        {
          name: fleetForm.name,
          imageUrl: fleetForm.imageUrl,
          altText: fleetForm.altText,
          passengerCapacity: Number(fleetForm.passengerCapacity),
          hourlyRate: Number(fleetForm.hourlyRate)
        },
        { headers: getHeaders(token) }
      );
      setFleets(prevFleets => 
        prevFleets.map((fleet, index) => 
          index === editingFleet ? response.data : fleet
        )
      );
      setEditingFleet(null);
      setFleetForm({
        name: '',
        imageUrl: '',
        altText: '',
        passengerCapacity: '',
        hourlyRate: ''
      });
      setSuccessMessage('Fleet vehicle updated successfully!');
      setShowSuccessModal(true);
      setError('');
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  const handleDeleteFleet = async (index) => {
    try {
      await axios.delete(`${API_BASE_URL}/fleets/${fleets[index]._id}`, {
        headers: getHeaders(token)
      });
      setFleets(prevFleets => prevFleets.filter((_, i) => i !== index));
      setSuccessMessage('Fleet vehicle deleted successfully!');
      setShowSuccessModal(true);
      setError('');
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  // Service management handlers
  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const filteredFeatures = serviceForm.features
        .map(feature => feature.trim())
        .filter(feature => feature !== '');

      const response = await axios.post(
        `${API_BASE_URL}/services`,
        {
          name: serviceForm.name,
          imageUrl: serviceForm.imageUrl,
          description: serviceForm.description,
          features: filteredFeatures
        },
        { headers: getHeaders(token) }
      );
      setServices(prevServices => [...prevServices, response.data]);
      setServiceForm({ name: '', imageUrl: '', description: '', features: [''] });
      setSuccessMessage('Service added successfully!');
      setShowSuccessModal(true);
      setError('');
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  const handleEditService = (index) => {
    setEditingService(index);
    setServiceForm(services[index]);
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      const filteredFeatures = serviceForm.features
        .map(feature => feature.trim())
        .filter(feature => feature !== '');

      const response = await axios.put(
        `${API_BASE_URL}/services/${services[editingService]._id}`,
        {
          name: serviceForm.name,
          imageUrl: serviceForm.imageUrl,
          description: serviceForm.description,
          features: filteredFeatures
        },
        { headers: getHeaders(token) }
      );
      setServices(prevServices => 
        prevServices.map((service, index) => 
          index === editingService ? response.data : service
        )
      );
      setEditingService(null);
      setServiceForm({ name: '', imageUrl: '', description: '', features: [''] });
      setSuccessMessage('Service updated successfully!');
      setShowSuccessModal(true);
      setError('');
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  const handleDeleteService = async (index) => {
    try {
      await axios.delete(`${API_BASE_URL}/services/${services[index]._id}`, {
        headers: getHeaders(token)
      });
      setServices(prevServices => prevServices.filter((_, i) => i !== index));
      setSuccessMessage('Service deleted successfully!');
      setShowSuccessModal(true);
      setError('');
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  // Blog management handlers
  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/blogs`,
        {
          title: blogForm.title,
          content: blogForm.content,
          author: blogForm.author
        },
        { headers: getHeaders(token) }
      );
      setBlogs([...blogs, response.data]);
      setBlogForm({ title: '', content: '', author: '' });
      setSuccessMessage('Blog post added successfully!');
      setShowSuccessModal(true);
      setError('');
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  const handleEditBlog = (index) => {
    setEditingBlog(index);
    setBlogForm(blogs[index]);
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}/blogs/${blogs[editingBlog]._id}`,
        {
          title: blogForm.title,
          content: blogForm.content,
          author: blogForm.author
        },
        { headers: getHeaders(token) }
      );
      const updatedBlogs = [...blogs];
      updatedBlogs[editingBlog] = response.data;
      setBlogs(updatedBlogs);
      setEditingBlog(null);
      setBlogForm({ title: '', content: '', author: '' });
      setSuccessMessage('Blog post updated successfully!');
      setShowSuccessModal(true);
      setError('');
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  const handleDeleteBlog = async (index) => {
    try {
      await axios.delete(`${API_BASE_URL}/blogs/${blogs[index]._id}`, {
        headers: getHeaders(token)
      });
      setBlogs(blogs.filter((_, i) => i !== index));
      setSuccessMessage('Blog post deleted successfully!');
      setShowSuccessModal(true);
      setError('');
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  // Video management handlers
  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/videos`,
        { url: videoForm.url },
        { headers: getHeaders(token) }
      );
      setVideos([...videos, response.data]);
      setVideoForm({ url: '' });
      setSuccessMessage('Video added successfully!');
      setShowSuccessModal(true);
      setError('');
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  const handleEditVideo = (index) => {
    setEditingVideo(index);
    setVideoForm(videos[index]);
  };

  const handleUpdateVideo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}/videos/${videos[editingVideo]._id}`,
        { url: videoForm.url },
        { headers: getHeaders(token) }
      );
      const updatedVideos = [...videos];
      updatedVideos[editingVideo] = response.data;
      setVideos(updatedVideos);
      setEditingVideo(null);
      setVideoForm({ url: '' });
      setSuccessMessage('Video updated successfully!');
      setShowSuccessModal(true);
      setError('');
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  const handleDeleteVideo = async (index) => {
    try {
      await axios.delete(`${API_BASE_URL}/videos/${videos[index]._id}`, {
        headers: getHeaders(token)
      });
      setVideos(videos.filter((_, i) => i !== index));
      setSuccessMessage('Video deleted successfully!');
      setShowSuccessModal(true);
      setError('');
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  // Login form UI
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] p-4">
        <div className="bg-[#262626] p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-[#FFD700] mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-[#AAAAAA] mb-2">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                required
              />
            </div>
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
              disabled={isLoading}
              className="w-full bg-[#FFD700] text-[#1A1A1A] py-2 px-4 rounded-md font-medium hover:bg-[#FFE657] transition duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
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

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-[#FFD700]">Loading...</div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : (
        <>
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
              onClick={() => setActiveTab('videos')}
              className={`py-2 px-4 font-medium ${activeTab === 'videos' ? 'text-[#FFD700] border-b-2 border-[#FFD700]' : 'text-[#AAAAAA] hover:text-[#FFE657]'}`}
            >
              Videos
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
                    <div className="col-span-2">
                      <label htmlFor="fleet-altText" className="block text-[#AAAAAA] mb-2">Alt Text</label>
                      <input
                        type="text"
                        id="fleet-altText"
                        value={fleetForm.altText}
                        onChange={(e) => setFleetForm({ ...fleetForm, altText: e.target.value })}
                        className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="fleet-passengerCapacity" className="block text-[#AAAAAA] mb-2">Passenger Capacity</label>
                      <input
                        type="text"
                        id="fleet-passengerCapacity"
                        value={fleetForm.passengerCapacity}
                        onChange={(e) => setFleetForm({ ...fleetForm, passengerCapacity: e.target.value })}
                        className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="fleet-hourlyRate" className="block text-[#AAAAAA] mb-2">Hourly Rate</label>
                      <input
                        type="text"
                        id="fleet-hourlyRate"
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
                            passengerCapacity: '',
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
                <div className="space-y-4">
                  {Array.isArray(fleets) && fleets.map((fleet, index) => (
                    <div key={fleet._id || `fleet-${index}`} className="bg-[#1A1A1A] p-4 rounded-lg border border-[#626262]">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-[#FFD700]">{fleet.name}</h3>
                          <p className="text-[#AAAAAA] mt-1">Alt Text: {fleet.altText}</p>
                          <p className="text-[#AAAAAA] mt-1">Capacity: {fleet.passengerCapacity} passengers</p>
                          <p className="text-[#AAAAAA] mt-1">Rate: ${fleet.hourlyRate}/hour</p>
                        </div>
                        <div className="flex space-x-2">
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
                        </div>
                      </div>
                    </div>
                  ))}
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
                    <div className="col-span-2">
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
                    <div className="col-span-2">
                      <label className="block text-[#AAAAAA] mb-2">Features</label>
                      {serviceForm.features.map((feature, index) => (
                        <div key={`${serviceForm._id}-feature-${index}`} className="flex mb-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => {
                              const updatedFeatures = [...serviceForm.features];
                              updatedFeatures[index] = e.target.value;
                              setServiceForm({ ...serviceForm, features: updatedFeatures });
                            }}
                            className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                            required={index === 0}
                          />
                          {serviceForm.features.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updatedFeatures = serviceForm.features.filter((_, i) => i !== index);
                                setServiceForm({ ...serviceForm, features: updatedFeatures });
                              }}
                              className="ml-2 bg-red-500 text-white px-3 rounded-md hover:bg-red-600"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setServiceForm({ ...serviceForm, features: [...serviceForm.features, ''] })}
                        className="mt-2 bg-[#626262] text-white py-1 px-3 rounded-md hover:bg-[#AAAAAA]"
                      >
                        + Add Feature
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    {editingService !== null && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingService(null);
                          setServiceForm({ name: '', imageUrl: '', description: '', features: [''] });
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
                  {Array.isArray(services) && services.map((service, index) => (
                    <div key={service._id || `service-${index}`} className="bg-[#1A1A1A] p-4 rounded-lg border border-[#626262]">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-[#FFD700]">{service.name}</h3>
                          <p className="text-[#AAAAAA] mt-1">{service.description}</p>
                          <ul className="mt-2 list-disc list-inside text-[#AAAAAA]">
                            {Array.isArray(service.features) && service.features.map((feature, i) => (
                              <li key={`${service._id}-feature-${i}`}>{feature}</li>
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
                      <label htmlFor="blog-author" className="block text-[#AAAAAA] mb-2">Author</label>
                      <input
                        type="text"
                        id="blog-author"
                        value={blogForm.author}
                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                        className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="blog-content" className="block text-[#AAAAAA] mb-2">Content</label>
                      <textarea
                        id="blog-content"
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                        rows="6"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    {editingBlog !== null && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingBlog(null);
                          setBlogForm({ title: '', content: '', author: '' });
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
                  {Array.isArray(blogs) && blogs.map((blog, index) => (
                    <div key={blog._id} className="bg-[#1A1A1A] p-4 rounded-lg border border-[#626262]">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-[#FFD700]">{blog.title}</h3>
                          <p className="text-[#AAAAAA] mt-2">{blog.content}</p>
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

          {/* Video Management */}
          {activeTab === 'videos' && (
            <div className="space-y-8">
              <div className="bg-[#262626] p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-[#FFD700] mb-4">
                  {editingVideo !== null ? 'Edit Video' : 'Add New Video'}
                </h2>
                <form onSubmit={editingVideo !== null ? handleUpdateVideo : handleAddVideo} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="video-url" className="block text-[#AAAAAA] mb-2">Video URL</label>
                      <input
                        type="text"
                        id="video-url"
                        value={videoForm.url}
                        onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
                        className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    {editingVideo !== null && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingVideo(null);
                          setVideoForm({url: '' });
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
                      {editingVideo !== null ? 'Update Video' : 'Add Video'}
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-[#262626] p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-[#FFD700] mb-4">Current Videos</h2>
                <div className="space-y-4">
                  {Array.isArray(videos) && videos.map((video, index) => (
                    <div key={video._id} className="bg-[#1A1A1A] p-4 rounded-lg border border-[#626262]">
                      <div className="flex justify-between items-start">
                        <div>
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FFD700] hover:underline mt-2 block"
                          >
                            Watch Video
                          </a>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditVideo(index)}
                            className="text-[#FFD700] hover:text-[#FFE657]"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteVideo(index)}
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
        </>
      )}

      {/* Add Success Modal */}
      {showSuccessModal && <SuccessModal />}
    </div>
  );
};

export default Admin;