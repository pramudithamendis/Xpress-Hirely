import React from 'react';

const VehicleTypeCard = ({ type, image, selected, onClick }) => {
    return (
        <div 
            className={`cursor-pointer p-2 border border-gray-300 rounded-md ${selected ? 'bg-blue-200' : ''}`}
            onClick={() => onClick(type)}
        >
            <img src={image} alt={type} className="w-full h-auto" />
            <p className="text-center mt-2">{type}</p>
        </div>
    );
};

export default VehicleTypeCard;
