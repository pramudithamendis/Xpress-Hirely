import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { BiShowAlt } from 'react-icons/bi'; // Corrected import for show icon
import FeedbackModal from './FeedbackModel';

const FeedbackSingleCard  = ({ feedback }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='border-2 border-gray-500 rounded-lg p-4 m-4 hover:shadow-xl bg-blue-200'>
            <h2 className='font-bold text-lg'>{feedback.name}</h2>
            <p>{feedback.email}</p>
            <p>{feedback.details}</p>
            <div className='flex justify-around mt-4'>
                <BiShowAlt
                    className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                    onClick={() => setShowModal(true)}
                />
                <Link to={`/feedbacks/show/${feedback._id}`}>
                    <BsInfoCircle className='text-2xl text-green-600' />
                </Link>
                
                <Link to={`/feedbacks/delete/${feedback._id}`}>
                    <AiOutlineDelete className='text-2xl text-red-600' />
                </Link>
            </div>
            {showModal && (
                <FeedbackModal feedback={feedback} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default FeedbackSingleCard ;
