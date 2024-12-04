import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLoginRedirect = () => {
    navigate('/'); // Redirect to the login page
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('username');
    navigate('/'); // Redirect to login page or homepage after logout
  };

  const styles = {
    navigation: {
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'cornflowerblue',
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
      position: 'relative', // Position relative to control dropdown placement
    },
    icon: {
      marginRight: '5px', // Space between icon and label
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      right: 0,
      backgroundColor: 'white',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      borderRadius: '5px',
      display: isDropdownVisible ? 'block' : 'none',
      zIndex: 10,
    },
    dropdownItem: {
      padding: '10px 20px',
      cursor: 'pointer',
      borderBottom: '1px solid #ddd',
    },
    dropdownItemLast: {
      borderBottom: 'none',
    },
  };

  return (
    <nav style={styles.navigation}>
      <ul style={styles.ul}>
        <li style={styles.li}><Link to="/home">Home</Link></li>
        <li style={styles.li}><Link to="/services">Services</Link></li>
        <li style={styles.li}><Link to="/history">History</Link></li>
        <li style={styles.li}><Link to="/blog">Community</Link></li>
        <li style={styles.li}><Link to="/contact">Contact</Link></li>
        
        {isLoggedIn ? (
          <li
            style={styles.li}
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <i className='bx bx-user' style={styles.icon}></i>
            <span>{username}</span>
            <div className="dropdown" style={styles.dropdown}>
              <div
                className="dropdownItem"
                style={styles.dropdownItem}
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          </li>
        ) : (
          <li style={styles.li} onClick={handleLoginRedirect}>
            <i className='bx bx-user' style={styles.icon}></i>
            <label htmlFor="bx-user" style={{ cursor: 'pointer' }}>Login</label>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
