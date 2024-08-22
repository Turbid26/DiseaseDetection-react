import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { email, firstName, lastName, username, password, confirmPassword } = formData;

  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const keyframes = `
      @keyframes pulse {
        0% {
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
        }
      }
    `;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }, []);

  const handleGuestLogin = () => {
    navigate('/home');
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (email.length === 0) {
      alert('email is empty');
      return;
    }
    if (firstName.length === 0) {
      alert('first name is empty');
      return;
    }
    if (lastName.length === 0) {
      alert('last name is empty');
      return;
    }
    if (username.length === 0) {
      alert('username is empty');
      return;
    }
    if (password.length === 0) {
      alert('password is empty');
      return;
    }
    if (confirmPassword.length === 0) {
      alert('confirm password is empty');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        firstName,
        lastName,
        username,
        password,
      });
      alert(res.data.msg);
      setIsRegistering(false);
    } catch (err) {
      console.error(err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      alert(res.data.msg);
      navigate('/home');
    } catch (err) {
      console.error(err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  const styles = {
    body: {
      backgroundImage: `url(${require('../assets/login-background.jpg')})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    },
    continueGuest: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: 'rgba(89, 168, 89, 0.8)',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      padding: '10px 20px',
      cursor: 'pointer',
      fontSize: '16px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      zIndex: 10,
    },
    login: {
      position: 'relative',
      margin: 'auto',
      height: isRegistering ? '600px' : '400px',
      width: '300px',
      borderRadius: '30px',
      backgroundColor: '#ffffff',
      padding: '20px',
      zIndex: 5,
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
      transition: 'height 0.5s ease-in-out',
    },
    pulseCircle: {
      content: "''",
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: isRegistering ? '600px' : '500px',
      height: isRegistering ? '600px' : '500px',
      backgroundColor: isRegistering ? 'rgba(171, 97, 97, 0.5)' : 'rgba(89, 168, 89, 0.5)',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: -1,
      animation: 'pulse 2s infinite',
    },
    h1: {
      textAlign: 'center',
      color: '#333',
      zIndex: 2,
    },
    inputBox: {
      height: '50px',
      width: '100%',
      margin: isRegistering ? '15px 0' : '30px 0',
      position: 'relative',
      zIndex: 5,
    },
    input: {
      width: '90%',
      height: '100%',
      background: 'transparent',
      border: '2px solid #ccc',
      borderRadius: '40px',
      padding: '0 10px',
      outline: 'none',
      fontSize: '16px',
      zIndex: 2,
    },
    icon: {
      position: 'absolute',
      right: '10px',
      top: '12px',
      color: '#aaa',
      zIndex: 2,
    },
    remember: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '10px',
      zIndex: 5,
    },
    forgetPasswordButton: {
      padding: '10px 20px',
      justifyContent: 'center',
      border: 'none',
      borderRadius: '20px',
      backgroundColor: 'rgba(89, 168, 89, 0.8)',
      color: 'white',
      cursor: 'pointer',
      zIndex: 2,
    },
    create: {
      textAlign: 'center',
      marginTop: '20px',
      zIndex: 5,
    },
    createButton: {
      textDecoration: 'none',
      position: 'relative',
      justifyContent: 'center',
      color: 'rgba(38, 38, 255, 0.8)',
      fontWeight: 'bold',
      position: 'relative',
      cursor: 'pointer',
      zIndex: 10,
    },
    emptyButton: {
      background: 'none',
      border: 'none',
      color: '#1a71c9',
      fontSize: '14px',
      cursor: 'pointer',
      padding: 0,
      marginLeft: '10px',
      textDecoration: 'none',
      zIndex: 2,
    },
  };

  return (
    <div style={styles.body}>
      <button style={styles.continueGuest} onClick={handleGuestLogin}>Continue as Guest</button>
      <div style={styles.login}>
        <div style={styles.pulseCircle}></div>
        <h1 style={styles.h1}>{isRegistering ? 'Register' : 'Login'}</h1>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <>
              <div style={styles.inputBox}>
                <input type="text" name="email" placeholder="Email" value={email} onChange={handleChange} style={styles.input} />
                <i className='bx bx-envelope' style={styles.icon}></i>
              </div>
              <div style={styles.inputBox}>
                <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={handleChange} style={styles.input} />
                <i className='bx bx-user' style={styles.icon}></i>
              </div>
              <div style={styles.inputBox}>
                <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={handleChange} style={styles.input} />
                <i className='bx bx-user' style={styles.icon}></i>
              </div>
            </>
          )}
          <div style={styles.inputBox}>
            <input type="text" name="username" placeholder="Username" value={username} onChange={handleChange} style={styles.input} />
            <i className='bx bx-user' style={styles.icon}></i>
          </div>
          <div style={styles.inputBox}>
            <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} style={styles.input} />
            <i className='bx bx-lock-alt' style={styles.icon}></i>
          </div>
          {isRegistering && (
            <div style={styles.inputBox}>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={handleChange} style={styles.input} />
              <i className='bx bx-lock-alt' style={styles.icon}></i>
            </div>
          )}
          <div style={styles.remember}>
            {!isRegistering && (
              <>
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <button type="button" style={styles.emptyButton}>Forgot Password?</button>
              </>
            )}
          </div>
          <button type="submit" style={styles.forgetPasswordButton}>
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
        <div style={styles.create}>
          <span>{isRegistering ? 'Already have an account?' : "Don't have an account?"}</span>
          <button onClick={toggleForm} style={styles.createButton}>
            {isRegistering ? 'Login' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
