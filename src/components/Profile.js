import React, { useState } from 'react';
import './Profile.css';
import { useUser } from '../context/UserContext';
import { useChat } from '../context/ChatContext';
import Post from './Post';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const { currentUser, friends } = useUser();
  const { posts } = useChat();

  const userPosts = posts.filter(post => post.userId === 'current');
  const likedPosts = posts.filter(post => post.liked);

  const tabs = [
    { id: 'posts', label: 'Posts' },
    { id: 'likes', label: 'Likes' },
    { id: 'friends', label: 'Friends' },
  ];

  return (
    <div className="profile">
      <header className="profile-header">
        <button className="back-btn">←</button>
        <div className="profile-header-info">
          <h1>{currentUser.name}</h1>
          <span className="post-count">{userPosts.length} posts</span>
        </div>
      </header>

      <div className="profile-banner">
        <div className="banner-gradient" />
      </div>

      <div className="profile-info-section">
        <div className="profile-avatar-row">
          <img src={currentUser.avatar} alt={currentUser.name} className="profile-avatar" />
          <button className="edit-profile-btn">Edit profile</button>
        </div>

        <div className="profile-details">
          <h2 className="profile-name">{currentUser.name}</h2>
          <span className="profile-handle">@{currentUser.username}</span>
          <p className="profile-bio">{currentUser.bio}</p>

          <div className="profile-meta">
            <span className="meta-item">📅 Joined January 2024</span>
          </div>

          <div className="profile-stats">
            <span className="stat">
              <strong>{friends.length}</strong> Friends
            </span>
            <span className="stat">
              <strong>{likedPosts.length}</strong> Likes
            </span>
          </div>
        </div>
      </div>

      <nav className="profile-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="profile-content">
        {activeTab === 'posts' && (
          <div className="posts-list">
            {userPosts.length > 0 ? (
              userPosts.map(post => <Post key={post.id} post={post} />)
            ) : (
              <div className="empty-state">
                <h3>No posts yet</h3>
                <p>When you post, it will show up here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'likes' && (
          <div className="posts-list">
            {likedPosts.length > 0 ? (
              likedPosts.map(post => <Post key={post.id} post={post} />)
            ) : (
              <div className="empty-state">
                <h3>No likes yet</h3>
                <p>Posts you like will appear here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="friends-grid">
            {friends.map(friend => (
              <div key={friend.id} className="friend-card">
                <img src={friend.avatar} alt={friend.name} className="friend-card-avatar" />
                <div className="friend-card-info">
                  <span className="friend-card-name">{friend.name}</span>
                  <span className="friend-card-handle">@{friend.username}</span>
                  <p className="friend-card-bio">{friend.bio}</p>
                </div>
                <div className="friend-card-status">
                  {friend.isOnline && <span className="online-badge">Online</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
