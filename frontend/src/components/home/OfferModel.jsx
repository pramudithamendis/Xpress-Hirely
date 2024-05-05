import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const OfferModel = ({ offer, onClose }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center text-center'
            onClick={onClose}
        >
            <div
                className='w-[600px] max-w-full h-[400px] bg-orange-400 rounded-xl p-4 flex flex-col relative'
                onClick={(event) => event.stopPropagation()} // Prevent click inside the modal from closing it
            >
                <AiOutlineClose
                    className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <p><b>Name</b></p>
                <h2 className='font-bold text-lg mb-2'>{offer.name}</h2>
                <br></br>
                <br></br>
                <p><b>Description</b></p>
                <p className='mb-2'>{offer.description}</p>
                <br></br>
                <br></br>
                <p><b>Details</b></p>
                <p>{offer.details}</p>
            </div>
        </div>
    );
}

export default OfferModel;
