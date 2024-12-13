import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './components/login';
import BlogDetail from './components/BlogDetail';
import Home from './components/home';
import Feedback from './components/contact.tsx';
import Diagnose from './components/services.tsx';
import History from './components/history.tsx';
import FAQ from './components/FAQ.tsx';
import Blog from './components/blog';
import { AuthProvider } from './context/AuthContext';
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/resetpassword';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* No Navbar here */}
        <Route path="/home" element={<><Navbar /><Home /></>} /> {/* Navbar included */}
        <Route path="/contact" element={<><Navbar /><Feedback /></>} /> {/* Navbar included */}
        <Route path="/services" element={<><Navbar /><Diagnose /></>} /> {/* Navbar included */}
        <Route path="/history" element={<><Navbar /><History /></>} /> {/* Navbar included */}
        <Route path="/blog" element={<><Navbar /><Blog /></>} /> {/* Navbar included */}
        <Route path="/blog/:blogId" element={<><Navbar /><BlogDetail /></>} />
        <Route path="/FAQ" element={<><Navbar /><FAQ /></>} /> {/* Navbar included */}
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
