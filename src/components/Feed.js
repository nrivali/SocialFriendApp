import React, { useState } from 'react';
import './Feed.css';
import { useChat } from '../context/ChatContext';
import { useUser } from '../context/UserContext';
import Post from './Post';

const Feed = () => {
  const [newPost, setNewPost] = useState('');
  const { posts, addPost } = useChat();
  const { currentUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      addPost(newPost);
      setNewPost('');
    }
  };

  return (
    <div className="feed">
      <header className="feed-header">
        <h1>Home</h1>
      </header>

      <div className="compose-box">
        <img src={currentUser.avatar} alt="You" className="compose-avatar" />
        <form onSubmit={handleSubmit} className="compose-form">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's happening?"
            className="compose-input"
            rows={3}
          />
          <div className="compose-actions">
            <div className="compose-icons">
              <button type="button" className="icon-btn" title="Add image">📷</button>
              <button type="button" className="icon-btn" title="Add GIF">🎬</button>
              <button type="button" className="icon-btn" title="Add emoji">😀</button>
            </div>
            <button
              type="submit"
              className="post-submit-btn"
              disabled={!newPost.trim()}
            >
              Post
            </button>
          </div>
        </form>
      </div>

      <div className="feed-divider" />

      <div className="posts-list">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
