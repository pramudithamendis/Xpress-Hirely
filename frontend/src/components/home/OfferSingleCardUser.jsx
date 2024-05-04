import React, { useState } from 'react';
import { BiShowAlt } from 'react-icons/bi';  // Assuming this is the icon for showing more details
import OfferModelUser from './OfferModelUser';

const OffersSingleCardUser = ({ offer }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='max-w-sm w-full lg:max-w-full lg:flex m-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-r from-yellow-600 to-green-500 text-white rounded-lg overflow-hidden'>
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
