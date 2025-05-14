import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // try to restore user from localStorage
    const stored = localStorage.getItem('authUser');
    return stored ? JSON.parse(stored) : null;
  });

  // login function: checks against json-server /users
  const login = async ({ username, password }) => {
    const res = await fetch(
      `http://localhost:8000/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    );
    const data = await res.json();
    if (data.length === 1) {
      const [userObj] = data;
      setUser(userObj);
      localStorage.setItem('authUser', JSON.stringify(userObj));
      return { success: true };
    } else {
      return { success: false, message: 'Invalid credentials' };
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
