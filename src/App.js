import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar'; // Only import if needed
import Login from './components/login';
import Home from './components/home';
import Contact from './components/contact';
import Services from './components/services';
import History from './components/history';
import Blog from './components/blog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* No Navbar here */}
        <Route path="/home" element={<><Navbar /><Home /></>} /> {/* Navbar included */}
        <Route path="/contact" element={<><Navbar /><Contact /></>} /> {/* Navbar included */}
        <Route path="/services" element={<><Navbar /><Services /></>} /> {/* Navbar included */}
        <Route path="/history" element={<><Navbar /><History /></>} /> {/* Navbar included */}
        <Route path="/blog" element={<><Navbar /><Blog /></>} /> {/* Navbar included */}

      </Routes>
    </Router>
  );
}

export default App;
