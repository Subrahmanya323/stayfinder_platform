import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaUsers,
  FaWifi,
  FaParking,
  FaSnowflake,
  FaUtensils,
} from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../utils/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const data = await api(`/api/listings/${id}`);
        setProperty(data);
      } catch (error) {
        setError('Failed to fetch property details.');
        console.error('Failed to fetch property details', error);
      }
      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!checkInDate || !checkOutDate) {
      alert('Please select check-in and check-out dates');
      return;
    }

    setBookingLoading(true);
    setError('');
    try {
      await api('/api/bookings', {
        method: 'POST',
        body: JSON.stringify({
          listingId: property.id,
          checkInDate: checkInDate.toISOString().split('T')[0],
          checkOutDate: checkOutDate.toISOString().split('T')[0],
          guests,
        }),
      });
      alert('Booking successful! You will receive a confirmation email shortly.');
      navigate('/my-bookings');
    } catch (error) {
      if (error.status === 401) {
        setError('Session expired. Please log in again.');
        navigate('/login');
      } else if (
        error.message.includes('already booked') ||
        error.message.includes('not available')
      ) {
        setError('The selected dates are already booked for this property.');
      } else {
        setError(error.message || 'Booking failed. Please try again.');
      }
      console.error('Booking failed', error);
    }
    setBookingLoading(false);
  };

  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate || !property) return 0;
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights * property.price : 0;
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <FaWifi />;
      case 'parking':
        return <FaParking />;
      case 'air conditioning':
        return <FaSnowflake />;
      case 'kitchen':
        return <FaUtensils />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading property details..." />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {property.title}
          </h1>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>{property.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="relative h-96 rounded-lg overflow-hidden mb-4">
                <img
                  src={
                    property.images
                      ? property.images.split(',')[currentImageIndex]
                      : 'https://via.placeholder.com/800x400'
                  }
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.images && property.images.split(',').length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {property.images.split(',').map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {property.images && property.images.split(',').length > 1 && (
                <div className="flex space-x-2">
                  {property.images.split(',').map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden ${
                        index === currentImageIndex ? 'ring-2 ring-primary-500' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumb ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Property Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <FaBed className="text-gray-500 mr-2" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <FaBath className="text-gray-500 mr-2" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <FaUsers className="text-gray-500 mr-2" />
                  <span>Up to {property.maxGuests} Guests</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities &&
                  property.amenities.split(',').map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-primary-600 mr-2">
                        {getAmenityIcon(amenity)}
                      </span>
                      <span>{amenity}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-lg sticky top-24">
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">${property.price}</span>
                <span className="text-gray-600"> / night</span>
              </div>

              {/* Date Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <DatePicker
                    selected={checkInDate}
                    onChange={setCheckInDate}
                    selectsStart
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={tomorrow}
                    className="input-field"
                    placeholderText="Select check-in date"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Date
                  </label>
                  <DatePicker
                    selected={checkOutDate}
                    onChange={setCheckOutDate}
                    selectsEnd
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={checkInDate}
                    className="input-field"
                    placeholderText="Select check-out date"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="input-field"
                  >
                    {[...Array(property.maxGuests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {checkInDate && checkOutDate && (
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>
                      ${property.price} ×{' '}
                      {Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))} nights
                    </span>
                    <span>${calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              )}

              {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

              <button
                onClick={handleBooking}
                disabled={!checkInDate || !checkOutDate || bookingLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingLoading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Processing...</span>
                  </div>
                ) : (
                  'Book Now'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
