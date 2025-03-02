// src/components/Filters.jsx
import React from 'react';

const Filters = () => {
  return (
    <div className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Filter Button */}
        <button className="flex items-center border-3 border-orange-500 space-x-2 bg-white text-orange-500 px-4 py-1 rounded-lg">
          <span className="material-symbols-outlined">filter_alt</span>
          <span>Filters</span>
        </button>

        {/* Search Bar */}
        <div className="relative w-full max-w-full sm:max-w-sm md:max-w-md">
          {/* Search Icon */}
          <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            search
          </span>

          <input
            type="text"
            placeholder="Search for a building..."
            className="w-full px-11 py-1 border border-gray-300 rounded-sm shadow-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Sort Button */}
        <button className="flex items-center space-x-2 bg-white text-orange-500 border-3 border-orange-500 px-4 py-1 rounded-lg">
          <span className="material-symbols-outlined">filter_list</span>
          <span>Sort</span>
        </button>
      </div>
    </div>
  );
};

export default Filters;
