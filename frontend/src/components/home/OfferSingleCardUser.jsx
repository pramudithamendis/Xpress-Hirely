import React, { useState } from 'react';
import { BiShowAlt } from 'react-icons/bi';  // Assuming this is the icon for showing more details
import OfferModelUser from './OfferModelUser';

const OffersSingleCardUser = ({ offer }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='max-w-md w-full m-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-r from-green-500 to-yellow-500 rounded-lg overflow-hidden cursor-pointer'>
            <div className='p-4 flex flex-col justify-between leading-normal'>
                <div className='mb-8'>
                    <div className='text-white font-bold text-xl mb-2'>{offer.name}</div>
                    <p className='text-white text-base'>{offer.description}</p>
                </div>
                <div className='flex items-center'>
                    <BiShowAlt
                        className='text-3xl cursor-pointer'
                        onClick={() => setShowModal(true)}
                    />
                    {showModal && (
                        <OfferModelUser offer={offer} onClose={() => setShowModal(false)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default OffersSingleCardUser;