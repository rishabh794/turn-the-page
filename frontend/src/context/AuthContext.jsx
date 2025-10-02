import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await axios.get('http://localhost:8008/api/auth/user-details', {
          withCredentials: true,
        });
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);


  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await axios.get('http://localhost:8008/api/auth/logout', {
      withCredentials: true,
    });
    setUser(null);
  };

  const value = {
    user,
    loading, 
    login,
    logout,
  };

  return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>);
};

