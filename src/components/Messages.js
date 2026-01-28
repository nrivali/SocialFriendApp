import React, { useState, useRef, useEffect } from 'react';
import './Messages.css';
import { useUser } from '../context/UserContext';
import { useChat } from '../context/ChatContext';

const Messages = ({ selectedChat, setSelectedChat }) => {
  const [newMessage, setNewMessage] = useState('');
  const { friends, currentUser } = useUser();
  const { sendMessage, getMessages } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      sendMessage(selectedChat.id, newMessage);
      setNewMessage('');
      setTimeout(scrollToBottom, 100);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const messages = selectedChat ? getMessages(selectedChat.id) : [];

  return (
    <div className="messages-container">
      <div className="messages-sidebar">
        <header className="messages-header">
          <h1>Messages</h1>
          <button className="new-message-btn" title="New message">✏️</button>
        </header>
        <div className="conversations-list">
          {friends.map(friend => (
            <div
              key={friend.id}
              className={`conversation-item ${selectedChat?.id === friend.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(friend)}
            >
              <div className="conversation-avatar-container">
                <div
                  className="conversation-avatar"
                  style={{ backgroundColor: friend.avatarColor || '#1da1f2' }}
                >
                  {getInitials(friend.name)}
                </div>
                {friend.isOnline && <span className="online-dot" />}
              </div>
              <div className="conversation-info">
                <div className="conversation-header">
                  <span className="conversation-name">{friend.name}</span>
                  <span className="conversation-handle">{friend.handle}</span>
                </div>
                <p className="conversation-preview">
                  {getMessages(friend.id).length > 0
                    ? getMessages(friend.id).slice(-1)[0].content
                    : 'No messages yet'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-area">
        {selectedChat ? (
          <>
            <header className="chat-header">
              <div className="chat-user-info">
                <div
                  className="chat-avatar"
                  style={{ backgroundColor: selectedChat.avatarColor || '#1da1f2' }}
                >
                  {getInitials(selectedChat.name)}
                </div>
                <div>
                  <span className="chat-name">{selectedChat.name}</span>
                  <span className="chat-status">
                    {selectedChat.isOnline ? 'Active now' : 'Offline'}
                  </span>
                </div>
              </div>
              <button className="chat-info-btn" title="Info">ℹ️</button>
            </header>

            <div className="chat-messages">
              <div className="chat-intro">
                <div
                  className="intro-avatar"
                  style={{ backgroundColor: selectedChat.avatarColor || '#1da1f2' }}
                >
                  {getInitials(selectedChat.name)}
                </div>
                <h2>{selectedChat.name}</h2>
                <p className="intro-handle">{selectedChat.handle}</p>
                <p className="intro-bio">{selectedChat.bio}</p>
              </div>

              {messages.map(message => (
                <div
                  key={message.id}
                  className={`message ${message.senderId === 'current' ? 'sent' : 'received'}`}
                >
                  {message.senderId !== 'current' && (
                    <div
                      className="message-avatar"
                      style={{ backgroundColor: selectedChat.avatarColor || '#1da1f2' }}
                    >
                      {getInitials(selectedChat.name)}
                    </div>
                  )}
                  <div className="message-content">
                    <p className="message-text">{message.content}</p>
                    <span className="message-time">{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-form">
              <div className="chat-input-container">
                <button type="button" className="attach-btn" title="Attach media">📷</button>
                <button type="button" className="attach-btn" title="Add GIF">🎬</button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Start a new message"
                  className="chat-input"
                />
                <button type="button" className="attach-btn" title="Add emoji">😀</button>
                <button
                  type="submit"
                  className="send-btn"
                  disabled={!newMessage.trim()}
                  title="Send"
                >
                  ➤
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="no-chat-content">
              <h2>Select a message</h2>
              <p>Choose from your existing conversations or start a new one.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
