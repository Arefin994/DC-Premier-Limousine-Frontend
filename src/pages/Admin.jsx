import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import BlogAdmin from './admin/BlogAdmin';
import FleetAdmin from './admin/FleetAdmin';
import ServiceAdmin from './admin/ServiceAdmin';
import VideoAdmin from './admin/VideoAdmin';

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
  const navigate = useNavigate();
  const location = useLocation();

  // State for managing different content types
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Check for existing token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      // Redirect to fleet page if on root admin path
      if (location.pathname === '/admin') {
        navigate('/admin/fleet');
      }
    }
  }, [location.pathname, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`https://dc-premier-limousine-backend-api.vercel.app/api/admins/login`, {
        username,
        password
      });
      
      if (response.data && response.data.token) {
        const newToken = response.data.token;
        localStorage.setItem('adminToken', newToken);
        setToken(newToken);
        setIsLoggedIn(true);
        navigate('/admin/fleet');
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
    localStorage.removeItem('adminToken');
    setToken('');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    navigate('/admin');
  };

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
  };

  // Success Modal Component
  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#262626] p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold text-[#FFD700] mb-4">Success!</h3>
        <p className="text-white mb-6">{successMessage}</p>
        <button
          onClick={() => {
            setShowSuccessModal(false);
            window.location.reload();
          }}
          className="w-full bg-[#FFD700] text-[#1A1A1A] py-2 px-4 rounded-md font-medium hover:bg-[#FFE657] transition duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );

  // Navigation Component
  const AdminNav = () => (
    <div className="flex mb-6 border-b border-[#626262]">
      <Link
        to="/admin/fleet"
        className={`py-2 px-4 font-medium ${location.pathname === '/admin/fleet' ? 'text-[#FFD700] border-b-2 border-[#FFD700]' : 'text-[#AAAAAA] hover:text-[#FFE657]'}`}
      >
        Fleet
      </Link>
      <Link
        to="/admin/services"
        className={`py-2 px-4 font-medium ${location.pathname === '/admin/services' ? 'text-[#FFD700] border-b-2 border-[#FFD700]' : 'text-[#AAAAAA] hover:text-[#FFE657]'}`}
      >
        Services
      </Link>
      <Link
        to="/admin/blog"
        className={`py-2 px-4 font-medium ${location.pathname === '/admin/blog' ? 'text-[#FFD700] border-b-2 border-[#FFD700]' : 'text-[#AAAAAA] hover:text-[#FFE657]'}`}
      >
        Blog
      </Link>
      <Link
        to="/admin/videos"
        className={`py-2 px-4 font-medium ${location.pathname === '/admin/videos' ? 'text-[#FFD700] border-b-2 border-[#FFD700]' : 'text-[#AAAAAA] hover:text-[#FFE657]'}`}
      >
        Videos
      </Link>
    </div>
  );

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
          <AdminNav />
          <Routes>
            <Route path="/fleet" element={<FleetAdmin token={token} onSuccess={handleSuccess} />} />
            <Route path="/services" element={<ServiceAdmin token={token} onSuccess={handleSuccess} />} />
            <Route path="/blog" element={<BlogAdmin token={token} onSuccess={handleSuccess} />} />
            <Route path="/videos" element={<VideoAdmin token={token} onSuccess={handleSuccess} />} />
          </Routes>
        </>
      )}

      {/* Add Success Modal */}
      {showSuccessModal && <SuccessModal />}
    </div>
  );
};

export default Admin;