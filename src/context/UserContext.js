import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const initialFriends = [
  {
    id: '1',
    name: 'Alex Johnson',
    username: 'alexj',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    bio: 'Coffee enthusiast & code wizard ☕💻',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Sam Wilson',
    username: 'samwilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
    bio: 'Living life one day at a time 🌟',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Jordan Lee',
    username: 'jordanlee',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    bio: 'Music lover | Bookworm | Dreamer',
    isOnline: false,
  },
  {
    id: '4',
    name: 'Taylor Swift',
    username: 'nottaylorswift',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
    bio: 'Definitely not that Taylor Swift',
    isOnline: true,
  },
  {
    id: '5',
    name: 'Morgan Chen',
    username: 'morganc',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan',
    bio: 'Tech geek | Gamer | Pizza lover 🍕',
    isOnline: false,
  },
];

export const UserProvider = ({ children }) => {
  const [currentUser] = useState({
    id: 'current',
    name: 'You',
    username: 'yourhandle',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
    bio: 'Welcome to SocialFriend!',
  });

  const [friends] = useState(initialFriends);

  const getFriendById = (id) => {
    return friends.find(friend => friend.id === id);
  };

  return (
    <UserContext.Provider value={{ currentUser, friends, getFriendById }}>
      {children}
    </UserContext.Provider>
  );
};
