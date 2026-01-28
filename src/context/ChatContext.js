import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

const initialPosts = [
  {
    id: '1',
    userId: '1',
    content: 'Just shipped a new feature! 🚀 The feeling of seeing your code go live never gets old.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    likes: 24,
    comments: 5,
    reposts: 3,
    liked: false,
  },
  {
    id: '2',
    userId: '2',
    content: 'Beautiful sunset today 🌅 Sometimes you just need to stop and appreciate the little things.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    likes: 56,
    comments: 12,
    reposts: 8,
    liked: true,
  },
  {
    id: '3',
    userId: '4',
    content: 'Hot take: Pineapple belongs on pizza 🍕🍍 Fight me.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    likes: 128,
    comments: 89,
    reposts: 23,
    liked: false,
  },
  {
    id: '4',
    userId: '3',
    content: 'Currently reading "The Midnight Library" and I can\'t put it down. Any book recommendations? 📚',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    likes: 45,
    comments: 32,
    reposts: 5,
    liked: false,
  },
  {
    id: '5',
    userId: '5',
    content: 'Finally beat that boss after 47 attempts. Gaming teaches you patience like nothing else 🎮',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    likes: 89,
    comments: 23,
    reposts: 11,
    liked: true,
  },
];

const initialMessages = {
  '1': [
    { id: 'm1', senderId: '1', content: 'Hey! How are you doing?', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
    { id: 'm2', senderId: 'current', content: 'I\'m great! Just working on some code.', timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString() },
    { id: 'm3', senderId: '1', content: 'Nice! What are you building?', timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString() },
  ],
  '2': [
    { id: 'm4', senderId: '2', content: 'Did you see the sunset today?', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
    { id: 'm5', senderId: 'current', content: 'Yes! It was gorgeous 🌅', timestamp: new Date(Date.now() - 1000 * 60 * 115).toISOString() },
  ],
  '4': [
    { id: 'm6', senderId: '4', content: 'Pizza night tonight?', timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString() },
  ],
};

export const ChatProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [messages, setMessages] = useState(initialMessages);

  const addPost = (content) => {
    const newPost = {
      id: Date.now().toString(),
      userId: 'current',
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      reposts: 0,
      liked: false,
    };
    setPosts([newPost, ...posts]);
  };

  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const sendMessage = (friendId, content) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: 'current',
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => ({
      ...prev,
      [friendId]: [...(prev[friendId] || []), newMessage],
    }));
  };

  const getMessages = (friendId) => {
    return messages[friendId] || [];
  };

  return (
    <ChatContext.Provider value={{ posts, addPost, toggleLike, sendMessage, getMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
