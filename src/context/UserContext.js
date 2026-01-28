import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const FRIENDS_KEY = 'socialfriend_friends';

const defaultFriends = [
  {
    id: '1',
    name: 'Alex Johnson',
    handle: '@alexj',
    avatarColor: '#1da1f2',
    bio: 'Coffee enthusiast & code wizard ☕💻',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Sam Wilson',
    handle: '@samwilson',
    avatarColor: '#00ba7c',
    bio: 'Living life one day at a time 🌟',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Jordan Lee',
    handle: '@jordanlee',
    avatarColor: '#f91880',
    bio: 'Music lover | Bookworm | Dreamer',
    isOnline: false,
  },
  {
    id: '4',
    name: 'Taylor Swift',
    handle: '@nottaylorswift',
    avatarColor: '#ffd400',
    bio: 'Definitely not that Taylor Swift',
    isOnline: true,
  },
  {
    id: '5',
    name: 'Morgan Chen',
    handle: '@morganc',
    avatarColor: '#7856ff',
    bio: 'Tech geek | Gamer | Pizza lover 🍕',
    isOnline: false,
  },
];

export const UserProvider = ({ children }) => {
  const { currentUser: authUser, getUsers } = useAuth();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const savedFriends = localStorage.getItem(FRIENDS_KEY);
    if (savedFriends) {
      setFriends(JSON.parse(savedFriends));
    } else {
      setFriends(defaultFriends);
      localStorage.setItem(FRIENDS_KEY, JSON.stringify(defaultFriends));
    }
  }, []);

  const currentUser = {
    id: 'current',
    name: authUser?.name || 'User',
    handle: authUser?.handle || '@user',
    avatarColor: authUser?.avatarColor || '#1da1f2',
    bio: authUser?.bio || '',
    location: authUser?.location || '',
    website: authUser?.website || '',
    joinedDate: authUser?.joinedDate || new Date().toISOString(),
  };

  const getFriendById = (id) => {
    if (id === 'current') return currentUser;
    return friends.find(friend => friend.id === id);
  };

  const getRegisteredUsers = () => {
    const users = getUsers();
    return users
      .filter(u => u.id !== authUser?.id)
      .map(u => ({
        id: u.id,
        name: u.name,
        handle: u.handle,
        avatarColor: u.avatarColor || '#1da1f2',
        bio: u.bio || '',
        isOnline: Math.random() > 0.5,
      }));
  };

  const addFriend = (friendId) => {
    const registeredUsers = getRegisteredUsers();
    const userToAdd = registeredUsers.find(u => u.id === friendId);
    if (userToAdd && !friends.find(f => f.id === friendId)) {
      const newFriends = [...friends, userToAdd];
      setFriends(newFriends);
      localStorage.setItem(FRIENDS_KEY, JSON.stringify(newFriends));
    }
  };

  const removeFriend = (friendId) => {
    const newFriends = friends.filter(f => f.id !== friendId);
    setFriends(newFriends);
    localStorage.setItem(FRIENDS_KEY, JSON.stringify(newFriends));
  };

  const getAllUsers = () => {
    const registeredUsers = getRegisteredUsers();
    const friendIds = new Set(friends.map(f => f.id));
    return {
      friends,
      suggestions: [...defaultFriends, ...registeredUsers].filter(
        u => !friendIds.has(u.id) && u.id !== authUser?.id
      ),
    };
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      friends,
      getFriendById,
      addFriend,
      removeFriend,
      getAllUsers,
      getRegisteredUsers,
    }}>
      {children}
    </UserContext.Provider>
  );
};
