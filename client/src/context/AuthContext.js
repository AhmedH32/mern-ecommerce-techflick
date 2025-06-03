import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('authUser');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async ({ username, password }) => {
    try {
      const res = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const userObj = await res.json();
        setUser(userObj);
        localStorage.setItem('authUser', JSON.stringify(userObj));
        return { success: true };
      } else {
        const errorData = await res.json();
        return { success: false, message: errorData.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login API call error:', error);
      return { success: false, message: 'Network error or server unavailable' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}