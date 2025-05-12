import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set token in axios default headers
      axios.defaults.headers.Authorization = `Bearer ${token}`;

      // Fetch user details using the token
      axios
        .get('https://music-app-szmg.onrender.com/api/auth/me')
        .then((response) => setUser(response.data))
        .catch(() => setUser(null))  // If error, set user to null
        .finally(() => setLoading(false));  // Once done, set loading to false
    } else {
      setLoading(false);  // If no token, stop loading
    }
  }, []);

  // The login function that stores the token
  const login = (token) => {
    localStorage.setItem('token', token);  // Store token in localStorage
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    setLoading(true);
    axios
      .get('https://music-app-szmg.onrender.com/api/auth/me')
      .then((response) => setUser(response.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  };

  // The logout function that clears the token
  const logout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    setUser(null);
    axios.defaults.headers.Authorization = '';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
