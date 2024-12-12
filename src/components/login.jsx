import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import useAuth to handle global login state

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); // Destructure login from useAuth context to update login status
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
    navigate('/home'); // Navigate to the home page as a guest
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
      console.error(err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('./api/auth/login', { username, password });
      localStorage.setItem('username', username);
      authLogin();  // Call the login function from useAuth to update the global login state
      alert(res.data.msg);
      navigate('/home');
    } catch (err) {
      console.error(err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side (Image) */}
      <div className="w-1/2 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${require('../assets/login-background.jpg')})` }}>
        {/* You can add any overlay or content in this section if necessary */}
      </div>

      {/* Right side (Login Form) */}
      <div className="w-1/2 bg-black bg-opacity-75 p-8 flex justify-center items-center">
        <div className="w-full max-w-md">
          <h1 className="text-white text-2xl text-center mb-6">{isRegistering ? 'Register' : 'Login'}</h1>
          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            {isRegistering && (
              <>
                <div className="mb-4">
                  <input 
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={handleChange} 
                    className="w-full p-3 bg-transparent border-2 border-gray-400 rounded-xl text-white focus:outline-none" 
                  />
                </div>
                <div className="mb-4">
                  <input 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name" 
                    value={firstName} 
                    onChange={handleChange} 
                    className="w-full p-3 bg-transparent border-2 border-gray-400 rounded-xl text-white focus:outline-none" 
                  />
                </div>
                <div className="mb-4">
                  <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Last Name" 
                    value={lastName} 
                    onChange={handleChange} 
                    className="w-full p-3 bg-transparent border-2 border-gray-400 rounded-xl text-white focus:outline-none" 
                  />
                </div>
              </>
            )}

            <div className="mb-4">
              <input 
                type="text" 
                name="username" 
                placeholder="Username" 
                value={username} 
                onChange={handleChange} 
                className="w-full p-3 bg-transparent border-2 border-gray-400 rounded-xl text-white focus:outline-none" 
              />
            </div>
            
            <div className="mb-4">
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={password} 
                onChange={handleChange} 
                className="w-full p-3 bg-transparent border-2 border-gray-400 rounded-xl text-white focus:outline-none" 
              />
            </div>
            
            {isRegistering && (
              <div className="mb-6">
                <input 
                  type="password" 
                  name="confirmPassword" 
                  placeholder="Confirm Password" 
                  value={confirmPassword} 
                  onChange={handleChange} 
                  className="w-full p-3 bg-transparent border-2 border-gray-400 rounded-xl text-white focus:outline-none" 
                />
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              {!isRegistering && (
                <>
                  <label className="text-white">
                    <input type="checkbox" className="mr-2" /> Remember me
                  </label>
                  <button 
                    onClick={handleForgotPassword} 
                    type="button" 
                    className="text-blue-500 text-sm">
                    Forgot Password?
                  </button>
                </>
              )}
            </div>

            <button 
              type="submit" 
              className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 focus:outline-none">
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>

          {/* Continue as Guest Button */}
          <div className="text-center mt-4">
            <button 
              onClick={handleGuestLogin} 
              className="w-full py-3 mt-4 bg-gray-600 text-white rounded-xl hover:bg-gray-700 focus:outline-none">
              Continue as Guest
            </button>
          </div>

          <div className="text-center mt-4">
            {!isRegistering ? (
              <p className="text-white">
                Don't have an account?{' '}
                <button 
                  onClick={toggleForm} 
                  className="text-blue-500 font-semibold">
                  Create one
                </button>
              </p>
            ) : (
              <p className="text-white">
                Already have an account?{' '}
                <button 
                  onClick={toggleForm} 
                  className="text-blue-500 font-semibold">
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
