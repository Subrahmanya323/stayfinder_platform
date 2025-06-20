import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../utils/api';

const Login = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setUser(data);
      localStorage.setItem('stayfinder_user', JSON.stringify(data));
      navigate('/'); // or dashboard
    } catch (err) {
      setError('Invalid credentials or user does not exist.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Stayfinder</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className={`input-field ${error && !email ? 'border-red-500' : ''}`}
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className={`input-field ${error && !password ? 'border-red-500' : ''}`}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full btn-primary flex items-center justify-center"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-primary-600 hover:underline">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;