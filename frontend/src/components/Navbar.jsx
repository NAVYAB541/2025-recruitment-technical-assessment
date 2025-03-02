// src/components/Navbar.jsx
import React, { useState } from 'react';
import freeRoomsLogo from '../../assets/FreeRoomsLogo.png';
import freeRoomsDoorClosed from '../../assets/FreeroomsDoorClosed.png';

const Navbar = () => {
  const [logo, setLogo] = useState(freeRoomsLogo);

  const handleLogoClick = () => {
    setLogo(prevLogo => (prevLogo === freeRoomsLogo ? freeRoomsDoorClosed : freeRoomsLogo));
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center border-b border-gray-100">
        {/* Logo + Name */}
        <div className="flex items-center space-x-1 pb-3">
          <img
            src={logo}
            alt="FreeRooms Logo"
            className="h-6 w-6 cursor-pointer"
            onClick={handleLogoClick}  // Trigger the state change on click
          />
          <h1 className="text-2xl font-bold text-orange-500">Freerooms</h1>
        </div>

        {/* Icons */}
        <div className="flex space-x-2 pb-2">
          {/* Search Icon */}
          <span className="material-symbols-outlined cursor-pointer border border-orange-500 p-1 rounded-md text-orange-500 hover:bg-orange-100">
            search
          </span>

          {/* Grid View - Active */}
          <span className="material-symbols-outlined cursor-pointer bg-orange-500 text-white p-1 rounded-md">
            grid_view
          </span>

          {/* Map Icon */}
          <span className="material-symbols-outlined cursor-pointer border border-orange-500 p-1 rounded-md text-orange-500 hover:bg-orange-100">
            map
          </span>

          {/* Dark Mode Icon */}
          <span className="material-symbols-outlined cursor-pointer border border-orange-500 p-1 rounded-md text-orange-500 hover:bg-orange-100">
            dark_mode
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
