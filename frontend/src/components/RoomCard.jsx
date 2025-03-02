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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={buildingImage}
        alt={building.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{building.name}</h3>
      <p className="text-gray-600">{building.rooms_available} rooms available</p>
    </div>
  );
};

export default RoomCard;