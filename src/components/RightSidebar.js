import React, { useState } from 'react';
import './RightSidebar.css';
import { useUser } from '../context/UserContext';

const RightSidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { friends } = useUser();

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="right-sidebar">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search friends"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="widget">
        <h2 className="widget-title">Friends</h2>
        <div className="friends-list">
          {filteredFriends.map(friend => (
            <div key={friend.id} className="friend-item">
              <div className="friend-avatar-container">
                <div
                  className="friend-avatar"
                  style={{ backgroundColor: friend.avatarColor || '#1da1f2' }}
                >
                  {getInitials(friend.name)}
                </div>
                {friend.isOnline && <span className="online-indicator" />}
              </div>
              <div className="friend-info">
                <span className="friend-name">{friend.name}</span>
                <span className="friend-handle">{friend.handle}</span>
              </div>
              <button className="follow-btn">Message</button>
            </div>
          ))}
        </div>
        {filteredFriends.length === 0 && (
          <p className="no-results">No friends found</p>
        )}
      </div>

      <div className="widget">
        <h2 className="widget-title">What's happening</h2>
        <div className="trending-list">
          <div className="trending-item">
            <span className="trending-category">Technology · Trending</span>
            <span className="trending-topic">#ReactJS</span>
            <span className="trending-posts">12.5K posts</span>
          </div>
          <div className="trending-item">
            <span className="trending-category">Sports · Trending</span>
            <span className="trending-topic">#SuperBowl</span>
            <span className="trending-posts">89.2K posts</span>
          </div>
          <div className="trending-item">
            <span className="trending-category">Entertainment · Trending</span>
            <span className="trending-topic">#NewMusic</span>
            <span className="trending-posts">45.8K posts</span>
          </div>
        </div>
      </div>

      <footer className="sidebar-footer">
        <a href="#terms">Terms</a>
        <a href="#privacy">Privacy</a>
        <a href="#about">About</a>
        <span>© 2026 SocialFriend</span>
      </footer>
    </aside>
  );
};

export default RightSidebar;
