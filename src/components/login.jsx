import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/logi.css';
import '../styles/scroll.css';

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

  return (
    <div>
      <button className="continue-guest" onClick={handleGuestLogin}>Continue as Guest</button>
      <div className={`login ${isRegistering ? 'registering' : ''}`}>
        <h1>{isRegistering ? 'Register' : 'Login'}</h1>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <>
              <div className="input-box">
                <input type="text" name="email" placeholder="Email" value={email} onChange={handleChange} />
                <i className='bx bx-envelope'></i>
              </div>
              <div className="input-box">
                <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={handleChange} />
                <i className='bx bx-user'></i>
              </div>
              <div className="input-box">
                <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={handleChange} />
                <i className='bx bx-user'></i>
              </div>
            </>
          )}
          <div className="input-box">
            <input type="text" name="username" placeholder="Username" value={username} onChange={handleChange} />
            <i className='bx bx-user'></i>
          </div>
          <div className="input-box">
            <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
            <i className='bx bx-lock-alt'></i>
          </div>
          {isRegistering && (
            <div className="input-box">
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={handleChange} />
              <i className='bx bx-lock-alt'></i>
            </div>
          )}
          <div className="remember">
            {!isRegistering && (
              <>
                <label htmlFor="rem">
                  <input type="checkbox" name="rem" id="rem" />
                  Remember me
                </label>
                <a href="#">Forget Password?</a>
              </>
            )}
          </div>
          <div className="forget-password">
            <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
          </div>
          <div className="create">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}{' '}
            <button type="button" onClick={toggleForm}>{isRegistering ? 'Login' : 'Register'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
