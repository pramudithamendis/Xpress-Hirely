import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { BiShowAlt } from 'react-icons/bi'; // Corrected import for show icon
import OfferModel from './OfferModel';

const OffersSingleCard = ({ offer }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='border-2 border-gray-500 rounded-lg p-4 m-4 hover:shadow-xl'>
            <h2 className='font-bold text-lg'>{offer.name}</h2>
            <p>{offer.description}</p>
            <p>{offer.details}</p>
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
