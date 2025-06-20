import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaBath, FaUsers } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/listings/${property.id}`} className="block">
      <div className="card overflow-hidden group">
        {/* Property Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={property.images ? property.images.split(',')[0] : 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md shadow-sm">
            <span className="text-sm font-semibold text-gray-900">${property.price}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <FaMapMarkerAlt className="text-sm mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>

          {/* Property Features */}
          <div className="flex items-center space-x-4 text-gray-500 text-sm">
            <div className="flex items-center">
              <FaBed className="mr-1" />
              <span>{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <FaBath className="mr-1" />
              <span>{property.bathrooms} baths</span>
            </div>
            <div className="flex items-center">
              <FaUsers className="mr-1" />
              <span>Up to {property.maxGuests} guests</span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-lg font-bold text-primary-600">
              ${property.price}
            </span>
            <span className="text-gray-500 text-sm"> / night</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard; 