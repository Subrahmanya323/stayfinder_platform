import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Stayfinder</h3>
          <p className="text-gray-300 mb-4">Find your perfect accommodation</p>
          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Stayfinder. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 