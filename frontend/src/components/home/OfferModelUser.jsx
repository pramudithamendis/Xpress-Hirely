import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const OfferModelUser = ({ offer, onClose }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center'
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
                <h1 className='text-center text-red-600 '><b>Details</b></h1>
                <p className='text-center'>______________________________________________________________________________________</p>
                <br></br>
                <br></br>
               
                <p className='text-center'>{offer.details}</p>
            </div>
        </div>
    );
}

export default OfferModelUser;
