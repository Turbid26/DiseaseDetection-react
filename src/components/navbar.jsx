import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css'; // Assuming you might want separate styles for the navbar

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/'); // Redirect to the login page
  };

  return (
    <nav className="navigation">
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li onClick={handleLoginRedirect}>
          <i className='bx bx-user'></i>
          <label htmlFor="bx-user">Login</label>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
