import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { BiShowAlt } from 'react-icons/bi'; // Corrected import for show icon
import OfferModel from './OfferModel';

const OffersSingleCard = ({ offer }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='max-w-md w-full m-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-r from-yellow-400 to-orange-200 rounded-lg overflow-hidden cursor-pointer'>
            <h2 className='font-bold text-lg text-center'>{offer.name}</h2>
            <p className='text-center'>{offer.description}</p>
            <p className='text-center'>{offer.details}</p>
            <div className='flex justify-around mt-4'>
                
                <BiShowAlt
                
                    className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                    onClick={() => setShowModal(true)}
                />
                <Link to={`/offers/show/${offer._id}`}>
                    <BsInfoCircle className='text-2xl text-green-600' />
                </Link>
                <Link to={`/offers/edit/${offer._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/offers/delete/${offer._id}`}>
                    <AiOutlineDelete className='text-2xl text-red-600' />
                </Link>
            </div>
            {showModal && (
                <OfferModel offer={offer} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default OffersSingleCard;
