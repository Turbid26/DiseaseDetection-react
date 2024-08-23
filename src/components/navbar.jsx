import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/'); // Redirect to the login page
  };

  // Styles as a JavaScript object
  const styles = {
    navigation: {
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'yellow',
      zIndex: 1,
      width: 'auto',
      padding: '10px',
      borderRadius: '10px',
    },
    ul: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px', // Spacing between menu items
      margin: 0,
      padding: 0,
      listStyleType: 'none', // Remove default list styling
    },
    li: {
      padding: '10px 20px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      marginRight: '5px', // Space between icon and label
    },
  };

  return (
    <nav style={styles.navigation}>
      <ul style={styles.ul}>
        <li style={styles.li}><Link to="/home">Home</Link></li>
        <li style={styles.li}><Link to="/services">Services</Link></li>
        <li style={styles.li}><Link to="/History">History</Link></li>
        <li style={styles.li}><Link to="/blog">Blog</Link></li>
        <li style={styles.li}><Link to="/contact">Contact</Link></li>
        <li style={styles.li} onClick={handleLoginRedirect}>
          <i className='bx bx-user' style={styles.icon}></i>
          <label htmlFor="bx-user" style={{ cursor: 'pointer' }}>Login</label>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
