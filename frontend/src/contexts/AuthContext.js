import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('stayfinder_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stayfinder_user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 