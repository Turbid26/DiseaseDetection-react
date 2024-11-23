import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './components/login';
import Home from './components/home';
import Contact from './components/contact';
import Services from './components/services';
import History from './components/history';
import Blog from './components/blog';
import { AuthProvider } from './context/AuthContext';
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/resetpassword';
import PrivateRoute from './components/privateRoute';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* No Navbar here */}
        <Route path="/home" element={<><Navbar /><Home /></>} /> {/* Navbar included */}
        <Route path="/contact" element={<><Navbar /><Contact /></>} /> {/* Navbar included */}
        <Route path="/services" element={<><Navbar /><Services /></>} /> {/* Navbar included */}
        <PrivateRoute path="/history" element={<><Navbar /><History /></>} /> {/* Navbar included */}
        <Route path="/blog" element={<><Navbar /><Blog /></>} /> {/* Navbar included */}
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
