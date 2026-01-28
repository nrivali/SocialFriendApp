import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';
import './AccountSetup.css';

const AccountSetup = () => {
  const { currentUser, completeProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    bio: '',
    location: '',
    website: '',
    avatarColor: '#1da1f2',
  });

  const avatarColors = [
    '#1da1f2', '#00ba7c', '#f91880', '#ffd400',
    '#7856ff', '#ff7a00', '#00d4c8', '#94a3b8',
  ];

  const handleChange = (field) => (e) => {
    setProfileData({ ...profileData, [field]: e.target.value });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleComplete = () => {
    completeProfile(profileData);
  };

  const handleSkip = () => {
    completeProfile({ isProfileComplete: true });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="auth-container">
      <div className="auth-card setup-card">
        <div className="auth-steps">
          <div className={`step-dot ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`} />
          <div className={`step-dot ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`} />
          <div className={`step-dot ${step >= 3 ? 'active' : ''}`} />
        </div>

        {step === 1 && (
          <>
            <h1 className="auth-title">Pick a profile color</h1>
            <p className="setup-subtitle">
              Choose a color for your avatar. You can change this later.
            </p>

            <div className="avatar-preview-container">
              <div
                className="avatar-preview"
                style={{ backgroundColor: profileData.avatarColor }}
              >
                {getInitials(currentUser.name)}
              </div>
              <div className="avatar-name">{currentUser.name}</div>
              <div className="avatar-handle">{currentUser.handle}</div>
            </div>

            <div className="color-picker">
              {avatarColors.map((color) => (
                <button
                  key={color}
                  className={`color-option ${profileData.avatarColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setProfileData({ ...profileData, avatarColor: color })}
                />
              ))}
            </div>

            <div className="setup-actions">
              <button className="auth-btn" onClick={handleSkip}>
                Skip for now
              </button>
              <button className="auth-btn primary" onClick={handleNext}>
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="auth-title">Tell us about yourself</h1>
            <p className="setup-subtitle">
              Add a bio so your friends know it's really you.
            </p>

            <div className="auth-form">
              <div className="form-group">
                <textarea
                  className="form-input form-textarea"
                  placeholder="Write a short bio..."
                  value={profileData.bio}
                  onChange={handleChange('bio')}
                  maxLength={160}
                  rows={4}
                />
                <div className="char-count">{profileData.bio.length}/160</div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Location (optional)"
                  value={profileData.location}
                  onChange={handleChange('location')}
                />
              </div>
            </div>

            <div className="setup-actions">
              <button className="auth-btn" onClick={handleBack}>
                Back
              </button>
              <button className="auth-btn primary" onClick={handleNext}>
                Next
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="auth-title">You're all set!</h1>
            <p className="setup-subtitle">
              Your profile is ready. Start connecting with friends!
            </p>

            <div className="profile-preview">
              <div
                className="preview-avatar"
                style={{ backgroundColor: profileData.avatarColor }}
              >
                {getInitials(currentUser.name)}
              </div>
              <div className="preview-info">
                <div className="preview-name">{currentUser.name}</div>
                <div className="preview-handle">{currentUser.handle}</div>
                {profileData.bio && (
                  <div className="preview-bio">{profileData.bio}</div>
                )}
                {profileData.location && (
                  <div className="preview-location">📍 {profileData.location}</div>
                )}
              </div>
            </div>

            <div className="setup-actions">
              <button className="auth-btn" onClick={handleBack}>
                Back
              </button>
              <button className="auth-btn primary" onClick={handleComplete}>
                Get started
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountSetup;
