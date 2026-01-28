import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import RightSidebar from './components/RightSidebar';
import Messages from './components/Messages';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import AccountSetup from './components/AccountSetup';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { ChatProvider } from './context/ChatContext';

function AppContent() {
  const { isAuthenticated, isLoading, currentUser } = useAuth();
  const [currentView, setCurrentView] = useState('feed');
  const [selectedChat, setSelectedChat] = useState(null);
  const [authView, setAuthView] = useState('login');

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-logo">💬</div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (authView === 'signup') {
      return <Signup onSwitchToLogin={() => setAuthView('login')} />;
    }
    return <Login onSwitchToSignup={() => setAuthView('signup')} />;
  }

  if (!currentUser.isProfileComplete) {
    return <AccountSetup />;
  }

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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
