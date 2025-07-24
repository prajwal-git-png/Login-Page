import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  email: string;
  name: string;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, name: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  isLoading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    setIsLoading(true);
    return new Promise(resolve => {
      setTimeout(() => {
        // For demo purposes, check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find((u: any) => u.email === email && u.password === password);
        if (foundUser) {
          const userInfo = {
            email: foundUser.email,
            name: foundUser.name
          };
          setUser(userInfo);
          localStorage.setItem('user', JSON.stringify(userInfo));
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };
  const register = async (email: string, name: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    setIsLoading(true);
    return new Promise(resolve => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        // Check if user already exists
        if (users.some((u: any) => u.email === email)) {
          setIsLoading(false);
          resolve(false);
          return;
        }
        // Add new user
        users.push({
          email,
          name,
          password
        });
        localStorage.setItem('users', JSON.stringify(users));
        // Auto login after registration
        const userInfo = {
          email,
          name
        };
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
        setIsLoading(false);
        resolve(true);
      }, 1000);
    });
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  const resetPassword = async (email: string): Promise<boolean> => {
    // Simulate password reset process
    setIsLoading(true);
    return new Promise(resolve => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some((u: any) => u.email === email);
        setIsLoading(false);
        resolve(userExists);
      }, 1000);
    });
  };
  return <AuthContext.Provider value={{
    user,
    login,
    register,
    logout,
    resetPassword,
    isLoading
  }}>
      {children}
    </AuthContext.Provider>;
};