import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    try {
      // Ensure storedUser is valid JSON and not undefined
      if (storedUser && storedUser !== "undefined" && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      // Clear invalid or corrupted data from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.access_token);
        return data;
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.access_token);
        return data;
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const updateProfile = async (userData) => {
    if (!user || !user.id) {
      console.error("User is not defined or does not have an ID");
      throw new Error("User is not defined or does not have an ID");
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
      } else {
        throw new Error(data.message || "Profile update failed");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  };

  const uploadProfilePicture = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://127.0.0.1:5000/auth/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        const updatedUser = { ...user, profile_image: data.url };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return data;
      } else {
        throw new Error(data.message || "Profile picture upload failed");
      }
    } catch (error) {
      console.error("Profile picture upload error:", error);
      throw error;
    }
  };

  const deleteAccount = async () => {
    if (!user || !user.id) {
      console.error("User is not defined or does not have an ID");
      throw new Error("User is not defined or does not have an ID");
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        logout();
        return { message: "Account deleted successfully" };
      } else {
        throw new Error("Account deletion failed");
      }
    } catch (error) {
      console.error("Account deletion error:", error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    updateProfile,
    uploadProfilePicture,
    deleteAccount,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};