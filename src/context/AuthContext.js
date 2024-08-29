import React, { createContext, useState, useContext } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component to wrap the app
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login (this could be expanded with real authentication)
  const login = () => setIsLoggedIn(true);
  
  // Function to handle logout
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access Auth context
export function useAuth() {
  return useContext(AuthContext);
}
