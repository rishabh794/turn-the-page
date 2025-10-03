import React, { useState, useEffect , useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from './auth-context';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

   const refetchUser = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:8008/api/auth/user-details', {
        withCredentials: true,
      });
      setUser(res.data);
    } catch  {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);


   const login = async () => {
    await refetchUser();
  };

  const logout = async () => {
    await axios.get('http://localhost:8008/api/auth/logout', {
      withCredentials: true,
    });
    setUser(null);
    navigate('/login');
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

