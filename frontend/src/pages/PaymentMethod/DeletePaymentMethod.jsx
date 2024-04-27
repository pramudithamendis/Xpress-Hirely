import React, { useState } from 'react';
import axios from 'axios';
import clientbg from '../../images/clientbg.jpeg';

import { useNavigate, useParams } from 'react-router-dom';

const DeletePaymentMethod = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeletePaymentMethod = () => {
        setLoading(true);
        axios.delete(`http://localhost:5555/savepaymentmethod/user/${id}`).then(() => {
            setLoading(false);
            alert('Deleted successfully');
            navigate('/');
        })
        .catch((error) => {
            setLoading(false); 
            alert('An error occurred');
            console.log(error);
        });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{backgroundImage: `url(${clientbg})`}}>
        <div className='bg-gray-300 rounded-lg bg-opacity-88 p-4'>
        
            <h1 className='text-orange-500 font-bold'>Delete Payment Method</h1>

            {loading ? <Spinner /> : ''}
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto'>

            <h3 className='text-2x1'>Delete payment method?</h3>

            <button className='bg-red-500 bg-opacity-80 hover:bg-red-600 text-black px-4 py-2 rounded-full' onClick={handleDeletePaymentMethod}>Yes, Delete</button>
            </div>
        </div>
        </div>
    )
}

export default DeletePaymentMethod