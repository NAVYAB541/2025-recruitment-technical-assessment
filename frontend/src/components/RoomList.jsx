// src/components/RoomList.jsx
import React from 'react';
import RoomCard from './RoomCard';
import data from '../data.json'; // Import the data

const RoomList = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {data.map((building, index) => (
          <RoomCard key={index} building={building} />
        ))}
      </div>
    </div>
  );
};

export default RoomList;