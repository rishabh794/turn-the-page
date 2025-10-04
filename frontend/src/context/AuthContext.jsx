import React, { useState, useEffect , useCallback } from 'react';
import { AuthContext } from './auth-context';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

   const refetchUser = useCallback(async () => {
    try {
      const res = await apiClient.get('api/auth/user-details');
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
    await apiClient.get('api/auth/logout');
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

