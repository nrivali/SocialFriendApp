import React, { useState } from 'react';
import './Sidebar.css';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ currentView, setCurrentView }) => {
  const { currentUser } = useUser();
  const { logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const navItems = [
    { id: 'feed', label: 'Home', icon: '🏠' },
    { id: 'messages', label: 'Messages', icon: '✉️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    setShowMenu(false);
    logout();
  };

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

        <div className="user-profile-container">
          <div
            className="user-profile"
            onClick={() => setShowMenu(!showMenu)}
          >
            <div
              className="user-avatar"
              style={{ backgroundColor: currentUser.avatarColor }}
            >
              {getInitials(currentUser.name)}
            </div>
            <div className="user-info">
              <span className="user-name">{currentUser.name}</span>
              <span className="user-handle">{currentUser.handle}</span>
            </div>
            <span className="more-icon">⋯</span>
          </div>

          {showMenu && (
            <div className="user-menu">
              <button
                className="menu-item"
                onClick={() => {
                  setShowMenu(false);
                  setCurrentView('profile');
                }}
              >
                View profile
              </button>
              <button className="menu-item logout" onClick={handleLogout}>
                Log out {currentUser.handle}
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
