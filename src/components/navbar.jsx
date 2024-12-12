import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo-nobg.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              {/* Logo */}
              <img
                className="h-8 w-auto"
                src={logo}
                style={{width:'120px', height:'100px'}}
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:flex sm:space-x-4">
              {/* Desktop Navigation */}
              <Link
                to="/home"
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Services
              </Link>
              <Link
                to="/history"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                History
              </Link>
              <Link
                to="/blog"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Community
              </Link>
              <Link
                to="/contact"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Contact
              </Link>
              <Link
                to="/FAQ"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                FAQ
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {/* Login/Logout and Profile */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    className="flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={() => setDropdownVisible(!isDropdownVisible)}
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User Profile"
                    />
                  </button>
                  {isDropdownVisible && (
                    <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLoginRedirect}
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                to="/home"
                className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Services
              </Link>
              <Link
                to="/history"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                History
              </Link>
              <Link
                to="/blog"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Community
              </Link>
              <Link
                to="/contact"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Contact
              </Link>
              <Link
                to="/FAQ"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                FAQ
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
