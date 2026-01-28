import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const STORAGE_KEY = 'socialfriend_auth';
const USERS_KEY = 'socialfriend_users';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem(STORAGE_KEY);
    if (savedAuth) {
      try {
        const user = JSON.parse(savedAuth);
        setCurrentUser(user);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const getUsers = () => {
    try {
      const users = localStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  };

  const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const signup = async (email, password, name, handle) => {
    setError(null);

    const users = getUsers();

    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      setError('An account with this email already exists');
      return false;
    }

    if (users.find(u => u.handle.toLowerCase() === handle.toLowerCase())) {
      setError('This handle is already taken');
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      password,
      name,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      avatar: null,
      bio: '',
      location: '',
      website: '',
      joinedDate: new Date().toISOString(),
      isProfileComplete: false,
      followers: [],
      following: [],
    };

    users.push(newUser);
    saveUsers(users);

    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));

    return true;
  };

  const login = async (email, password) => {
    setError(null);

    const users = getUsers();
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      setError('Invalid email or password');
      return false;
    }

    const { password: _, ...userWithoutPassword } = user;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));

    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateProfile = (updates) => {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      saveUsers(users);
    }

    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  };

  const completeProfile = (profileData) => {
    updateProfile({
      ...profileData,
      isProfileComplete: true,
    });
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        error,
        isAuthenticated: !!currentUser,
        signup,
        login,
        logout,
        updateProfile,
        completeProfile,
        clearError,
        getUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
