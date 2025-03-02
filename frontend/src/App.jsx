// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import RoomList from './components/RoomList';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Filters />
      <RoomList />
    </div>
  );
}

export default App;