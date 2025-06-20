import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const data = await api('/api/bookings/my-bookings');
        setBookings(data);
      } catch (err) {
        setError('Failed to fetch bookings.');
        console.error(err);
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading your bookings..." />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
        {bookings.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No bookings found.</p>
            <Link to="/" className="text-primary-600 hover:underline mt-2 inline-block">
              Explore properties
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map(booking => (
              <div key={booking.id} className="card p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{booking.listing.title}</h3>
                  <div className="text-gray-600 text-sm mb-1">{booking.listing.location}</div>
                  <div className="text-gray-500 text-sm mb-1">
                    {booking.checkInDate} &rarr; {booking.checkOutDate}
                  </div>
                  <div className="text-gray-500 text-sm mb-1">
                    Guests: {booking.guests}
                  </div>
                </div>
                <div className="text-primary-600 font-bold text-lg mt-4 md:mt-0">
                  Total: ${booking.listing.price * ((new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings; 