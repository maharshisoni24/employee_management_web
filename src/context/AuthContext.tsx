// AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  login: (token: string) => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('authToken') // Check if authToken exists in localStorage
  );

  const login = (token: string) => {
    localStorage.setItem('authToken', token); // Save token to localStorage
    setIsAuthenticated(true); // Update state
  };

  const logout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    setIsAuthenticated(false); // Update state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
