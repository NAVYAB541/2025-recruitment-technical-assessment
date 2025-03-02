// src/components/RoomCard.jsx
import React from 'react';

// Import all images from the assets folder
import agsmImage from '../../assets/agsm.webp';
import ainsworthImage from '../../assets/ainsworth.webp';
import anitbImage from '../../assets/anitab.webp';
import biologicalScienceImage from '../../assets/biologicalScience.webp';
import biologicalScienceWestImage from '../../assets/biologicalScienceWest.webp';
import blockhouseImage from '../../assets/blockhouse.webp';
import businessSchoolImage from '../../assets/businessSchool.webp';
import civilBuildingImage from '../../assets/civilBuilding.webp';
import colomboImage from '../../assets/colombo.webp';
import cseBuildingImage from '../../assets/cseBuilding.webp';

const RoomCard = ({ building }) => {
  // Map building names to their corresponding imported images
  const imageMap = {
    'AGSM': agsmImage,
    'Ainsworth Building': ainsworthImage,
    'Anita B Lawrence Centre': anitbImage,
    'Biological Sciences': biologicalScienceImage,
    'Biological Science (West)': biologicalScienceWestImage,
    'Blockhouse': blockhouseImage,
    'Business School': businessSchoolImage,
    'Civil Engineering Building': civilBuildingImage,
    'Colombo Building': colomboImage,
    'Computer Science & Eng (K17)': cseBuildingImage,
  };

  // Get the image for the current building
  const buildingImage = imageMap[building.name];

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
      {/* Building Image */}
      <img
        src={buildingImage}
        alt={building.name}
        className="w-full h-56 object-cover"
      />

      {/* Rooms Available Badge */}
      <div className="absolute top-2 right-2 bg-white text-xs font-medium px-3 py-1 rounded-xl shadow-md flex items-center space-x-1">
        <span className="material-symbols-outlined text-green-500 text-xs">
          circle
        </span>
        <span className="text-gray-700">{building.rooms_available} rooms available</span>
      </div>

      {/* Building Name */}
      <div className="absolute bottom-2 left-3 right-3 bg-orange-600 text-white p-3 rounded-lg text-center font-medium">
        {building.name}
      </div>
    </div>
  );
};

export default RoomCard;