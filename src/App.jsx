import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
function App() {
  return (
    <Router>
      <div className=" min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/reservation" element={<Reservation />} />
            <Route exact path="/services" element={<Services />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/fleet" element={<Fleet />} />
            <Route exact path="/airports" element={<AirportServices />} />
            <Route exact path="/videos" element={<Videos />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;