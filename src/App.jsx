import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Reservation from './pages/Reservation';
import Fleet from './pages/Fleet';
import AirportServices from './pages/Airports';
import Blog from './pages/Blog';
import Videos from './pages/Videos';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
import LoadingState from './components/LoadingState';

// ScrollToTop component - Ensures page scrolls to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Main App component with routing configuration
function App() {
  return (
    <HelmetProvider>
      <LoadingState>
        <Router>
          <div className="min-h-screen flex flex-col">
            <header>
              <Navbar />
            </header>
            <main className="flex-grow">
              <ScrollToTop />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/services" element={<Services />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/fleet" element={<Fleet />} />
                <Route path="/airports" element={<AirportServices />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </Router>
      </LoadingState>
    </HelmetProvider>
  );
}

export default App;