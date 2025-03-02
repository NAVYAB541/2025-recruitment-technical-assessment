// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-500">Freerooms</h1>
        <div className="flex space-x-4">
          <span>Search</span>
          <span>Map</span>
          <span>Grid View</span>
          <span>Dark Mode</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;