import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/logi.css';
import '../styles/scroll.css';

const Login = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleGuestLogin = () => {
    navigate('/home'); // Redirect to the home page
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div>
      <button className="continue-guest" onClick={handleGuestLogin}>Continue as Guest</button>
      <div className={`login ${isRegistering ? 'registering' : ''}`}>
        <h1>{isRegistering ? 'Register' : 'Login'}</h1>
        {isRegistering ? (
          <>
            <div className="input-box">
              <input type="text" placeholder="Email" />
              <i className='bx bx-envelope'></i>
            </div>
            <div className="input-box">
              <input type="text" placeholder="First Name" />
              <i className='bx bx-user'></i>
            </div>
            <div className="input-box">
              <input type="text" placeholder="Last Name" />
              <i className='bx bx-user'></i>
            </div>
            <div className="input-box">
              <input type="text" placeholder="Username" />
              <i className='bx bx-user'></i>
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" />
              <i className='bx bx-lock-alt'></i>
            </div>
            <div className="input-box">
              <input type="password" placeholder="Confirm Password" />
              <i className='bx bx-lock-alt'></i>
            </div>
            <div className="forget-password">
              <button type="submit">Register</button>
            </div>
            <div className="create">
              Already have an account? <a href="#" onClick={toggleForm}>Login</a>
            </div>
          </>
        ) : (
          <>
            <div className="input-box">
              <input type="text" placeholder="Username" />
              <i className='bx bx-user'></i>
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" />
              <i className='bx bx-lock-alt'></i>
            </div>
            <div className="remember">
              <label htmlFor="rem">
                <input type="checkbox" name="rem" id="rem" />
                Remember me
              </label>
              <a href="#">Forget Password?</a>
            </div>
            <div className="forget-password">
              <button type="submit">Login</button>
            </div>
            <div className="create">
              Don't have an account? <a href="#" onClick={toggleForm}>Register</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
