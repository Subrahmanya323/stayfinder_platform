import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <FaHome className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-gray-900">Stayfinder</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              Home
            </Link>

            {user ? (
              <>
                {user.role === 'host' ? (
                  <Link 
                    to="/dashboard/listings" 
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link 
                    to="/my-bookings" 
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    My Bookings
                  </Link>
                )}

                {/* User Icon Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-200 flex items-center"
                  >
                    <FaUser className="text-xl" />
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-primary-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
