import React from 'react';
import OffersSingleCard from './OffersSingleCard';

const OfferCard = ({ offers }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {offers.map((offer) => (
        <OffersSingleCard key={offer._id} offer={offer} />
      ))}
    </div>
  );
};

export default OfferCard;
