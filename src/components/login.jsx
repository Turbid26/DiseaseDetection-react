import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import useAuth to handle global login state

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin, setToken } = useAuth(); // Use setToken from AuthContext to save the JWT globally
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

    // Check if a token exists and redirect to the home page if the user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const handleGuestLogin = () => {
    navigate('/home');
  };

  const handleForgotPassword = () => {
    navigate('/forgotpassword');
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
      alert('Email is empty');
      return;
    }
    if (firstName.length === 0) {
      alert('First name is empty');
      return;
    }
    if (lastName.length === 0) {
      alert('Last name is empty');
      return;
    }
    if (username.length === 0) {
      alert('Username is empty');
      return;
    }
    if (password.length === 0) {
      alert('Password is empty');
      return;
    }
    if (confirmPassword.length === 0) {
      alert('Confirm password is empty');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('./api/auth/register', {
        email,
        firstName,
        lastName,
        username,
        password,
      });
      alert(res.data.msg);
      setIsRegistering(false);
    } catch (err) {
      console.error(err.response?.data?.msg || 'Registration failed');
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('./api/auth/login', { username, password });

      // Save JWT to localStorage
      const { token } = res.data;
      localStorage.setItem('token', token);

      // Set global login state and save the token using useAuth context
      authLogin();
      setToken(token);

      alert(res.data.msg);

      // Redirect the user to the home page after successful login
      navigate('/home');
    } catch (err) {
      console.error(err.response?.data?.msg || 'Login failed');
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  const styles = {
    // (Styling code remains unchanged)
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
                <i className="bx bx-envelope" style={styles.icon}></i>
              </div>
              <div style={styles.inputBox}>
                <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={handleChange} style={styles.input} />
                <i className="bx bx-user" style={styles.icon}></i>
              </div>
              <div style={styles.inputBox}>
                <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={handleChange} style={styles.input} />
                <i className="bx bx-user" style={styles.icon}></i>
              </div>
            </>
          )}
          <div style={styles.inputBox}>
            <input type="text" name="username" placeholder="Username" value={username} onChange={handleChange} style={styles.input} />
            <i className="bx bx-user" style={styles.icon}></i>
          </div>
          <div style={styles.inputBox}>
            <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} style={styles.input} />
            <i className="bx bx-lock-alt" style={styles.icon}></i>
          </div>
          {isRegistering && (
            <div style={styles.inputBox}>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={handleChange} style={styles.input} />
              <i className="bx bx-lock-alt" style={styles.icon}></i>
            </div>
          )}
          <div style={styles.remember}>
            {!isRegistering && (
              <>
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <button onClick={handleForgotPassword} type="button" style={styles.emptyButton}>Forgot Password?</button>
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
