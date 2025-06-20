import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await api('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      navigate('/login');
    } catch (err) {
      // Try to parse backend validation errors
      try {
        const errorData = JSON.parse(err.message);
        if (typeof errorData === 'object') {
          setFieldErrors(errorData);
        } else {
          setError('Registration failed. Please try again.');
        }
      } catch {
        setError('Registration failed. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-center">Register for Stayfinder</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className={`input-field ${fieldErrors.name ? 'border-red-500' : ''}`}
              value={name}
              onChange={e => {
                setName(e.target.value);
                setFieldErrors(prev => ({ ...prev, name: null }));
              }}
              autoFocus
            />
            {fieldErrors.name && <p className="text-red-500 text-sm">{fieldErrors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className={`input-field ${fieldErrors.email ? 'border-red-500' : ''}`}
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                setFieldErrors(prev => ({ ...prev, email: null }));
              }}
            />
            {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className={`input-field ${fieldErrors.password ? 'border-red-500' : ''}`}
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setFieldErrors(prev => ({ ...prev, password: null }));
              }}
            />
            {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              className={`input-field ${password !== confirmPassword && confirmPassword ? 'border-red-500' : ''}`}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            {password !== confirmPassword && confirmPassword && (
              <p className="text-red-500 text-sm">Passwords do not match.</p>
            )}
          </div>

          {/* General Error */}
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-primary flex items-center justify-center"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-primary-600 hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
