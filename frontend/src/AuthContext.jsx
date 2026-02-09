import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// ✅ backend base url
const BASE_URL = "https://ecommerce-project-rho-gold.vercel.app";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      fetchSaved();
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    fetchSaved();
  };

  const logout = () => {
    setUser(null);
    setSaved([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // ✅ get saved products
  const fetchSaved = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/saved`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSaved(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ add saved
  const addToSaved = async (productId) => {
    try {
      await axios.post(
        `${BASE_URL}/api/saved/add/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      fetchSaved();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ remove saved
  const removeFromSaved = async (productId) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/saved/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      fetchSaved();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, saved, login, logout, addToSaved, removeFromSaved }}
    >
      {children}
    </AuthContext.Provider>
  );
};
