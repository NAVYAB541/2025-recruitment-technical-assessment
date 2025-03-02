// src/components/Filters.jsx
import React from 'react';

const Filters = () => {
  return (
    <div className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <input
          type="text"
          placeholder="Search for a building..."
          className="p-2 border rounded"
        />
        <select className="p-2 px-8 border border-orange-500 rounded text-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500">
          <option>Sort</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;