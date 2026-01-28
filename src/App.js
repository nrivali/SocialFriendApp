import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import RightSidebar from './components/RightSidebar';
import Messages from './components/Messages';
import Profile from './components/Profile';
import { UserProvider } from './context/UserContext';
import { ChatProvider } from './context/ChatContext';

function App() {
  const [currentView, setCurrentView] = useState('feed');
  const [selectedChat, setSelectedChat] = useState(null);

  const renderMainContent = () => {
    switch (currentView) {
      case 'messages':
        return <Messages selectedChat={selectedChat} setSelectedChat={setSelectedChat} />;
      case 'profile':
        return <Profile />;
      default:
        return <Feed />;
    }
  };

  return (
    <UserProvider>
      <ChatProvider>
        <div className="app">
          <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
          <main className="main-content">
            {renderMainContent()}
          </main>
          <RightSidebar />
        </div>
      </ChatProvider>
    </UserProvider>
  );
}

export default App;
