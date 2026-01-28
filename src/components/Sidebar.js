import React from 'react';
import './Sidebar.css';
import { useUser } from '../context/UserContext';

const Sidebar = ({ currentView, setCurrentView }) => {
  const { currentUser } = useUser();

  const navItems = [
    { id: 'feed', label: 'Home', icon: '🏠' },
    { id: 'messages', label: 'Messages', icon: '✉️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="logo">
          <span className="logo-icon">💬</span>
          <span className="logo-text">SocialFriend</span>
        </div>

        <nav className="nav-menu">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="post-btn" onClick={() => setCurrentView('feed')}>
          Post
        </button>

        <div className="user-profile" onClick={() => setCurrentView('profile')}>
          <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar" />
          <div className="user-info">
            <span className="user-name">{currentUser.name}</span>
            <span className="user-handle">@{currentUser.username}</span>
          </div>
          <span className="more-icon">⋯</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
