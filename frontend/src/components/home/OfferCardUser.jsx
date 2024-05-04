import React from 'react';
import OffersSingleCardUser from './OfferSingleCardUser';

const OfferCardUser = ({ offers }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {offers.map((offer) => (
        <OffersSingleCardUser key={offer._id} offer={offer} />
      ))}
    </div>
  );
};

export default OfferCardUser;
