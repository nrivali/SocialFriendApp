import React from 'react';
import './Post.css';
import { useUser } from '../context/UserContext';
import { useChat } from '../context/ChatContext';

const Post = ({ post }) => {
  const { getFriendById, currentUser } = useUser();
  const { toggleLike } = useChat();

  const user = post.userId === 'current' ? currentUser : getFriendById(post.userId);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'now';
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) return null;

  return (
    <article className="post">
      <div
        className="post-avatar"
        style={{ backgroundColor: user.avatarColor || '#1da1f2' }}
      >
        {getInitials(user.name)}
      </div>
      <div className="post-content">
        <div className="post-header">
          <span className="post-name">{user.name}</span>
          <span className="post-handle">{user.handle}</span>
          <span className="post-separator">·</span>
          <span className="post-time">{formatTime(post.timestamp)}</span>
        </div>
        <div className="post-text">{post.content}</div>
        <div className="post-actions">
          <button className="action-btn comment-btn">
            <span className="action-icon">💬</span>
            <span className="action-count">{post.comments > 0 ? formatNumber(post.comments) : ''}</span>
          </button>
          <button className="action-btn repost-btn">
            <span className="action-icon">🔁</span>
            <span className="action-count">{post.reposts > 0 ? formatNumber(post.reposts) : ''}</span>
          </button>
          <button
            className={`action-btn like-btn ${post.liked ? 'liked' : ''}`}
            onClick={() => toggleLike(post.id)}
          >
            <span className="action-icon">{post.liked ? '❤️' : '🤍'}</span>
            <span className="action-count">{post.likes > 0 ? formatNumber(post.likes) : ''}</span>
          </button>
          <button className="action-btn share-btn">
            <span className="action-icon">📤</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default Post;
