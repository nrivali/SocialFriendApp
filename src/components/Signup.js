import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Signup = ({ onSwitchToLogin }) => {
  const { signup, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    handle: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (validationErrors[field]) {
      setValidationErrors({ ...validationErrors, [field]: null });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.handle.trim()) {
      errors.handle = 'Handle is required';
    } else if (formData.handle.replace('@', '').length < 3) {
      errors.handle = 'Handle must be at least 3 characters';
    } else if (!/^@?[a-zA-Z0-9_]+$/.test(formData.handle)) {
      errors.handle = 'Handle can only contain letters, numbers, and underscores';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) return;

    setIsLoading(true);
    await signup(
      formData.email,
      formData.password,
      formData.name,
      formData.handle
    );
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="auth-logo-icon">💬</span>
        </div>

        <h1 className="auth-title">Create your account</h1>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className={`form-input ${validationErrors.name ? 'error' : ''}`}
              placeholder="Name"
              value={formData.name}
              onChange={handleChange('name')}
              autoComplete="name"
            />
            {validationErrors.name && (
              <div className="input-error">{validationErrors.name}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="email"
              className={`form-input ${validationErrors.email ? 'error' : ''}`}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange('email')}
              autoComplete="email"
            />
            {validationErrors.email && (
              <div className="input-error">{validationErrors.email}</div>
            )}
          </div>

          <div className="form-group">
            <span className="handle-prefix">@</span>
            <input
              type="text"
              className={`form-input with-prefix ${validationErrors.handle ? 'error' : ''}`}
              placeholder="handle"
              value={formData.handle.replace('@', '')}
              onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
              autoComplete="username"
            />
            {validationErrors.handle ? (
              <div className="input-error">{validationErrors.handle}</div>
            ) : (
              <div className="form-hint">This is how friends will find you</div>
            )}
          </div>

          <div className="form-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-input ${validationErrors.password ? 'error' : ''}`}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange('password')}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {validationErrors.password && (
              <div className="input-error">{validationErrors.password}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-input ${validationErrors.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              autoComplete="new-password"
            />
            {validationErrors.confirmPassword && (
              <div className="input-error">{validationErrors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className="auth-btn primary"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <button className="auth-link" onClick={onSwitchToLogin}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
