import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clientbg from '../../images/clientbg.jpeg';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const EditPaymentMethod = () => {
    const [PaymentMethod, setPaymentMethod] = useState('');
    const [CardNumber, setCardNumber] = useState('');
    const [CVV, setCVV] = useState('');
    const [DateOfExpiry, setDateOfExpiry] = useState('');

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/savepaymentmethod/user/${id}`)
            .then((response) => {
                setPaymentMethod(response.data.PaymentMethod);
                setCardNumber(response.data.CardNumber);
                setCVV(response.data.CVV);
                setDateOfExpiry(response.data.DateOfExpiry);
                setLoading(false);

            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred');
                console.log(error);
            });

    }, [])

    const handleEditPaymentMethod = () => {
        const data = {
            PaymentMethod,
            CardNumber,
            CVV,
            DateOfExpiry,
        };
        setLoading(true);

        axios.put(`http://localhost:5555/savepaymentmethod/user/${id}`, data).then(() => {
            setLoading(false);
            alert('Changes saved');
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
            
            <h1 className='text-orange-500 font-bold'>Edit Payment Method</h1>
            {/* <hr class="w-200px mx-auto border-t-2 border-gray-300 my-4"/> */}

            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>

                <div className='my-4'>
                    <label className='text-x1 mr-4 text-gray-500'>PaymentMethod</label>
                    <input
                        type='text'
                        value={PaymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-x1 mr-4 text-gray-500'>CardNumber</label>
                    <input
                        type='text'
                        value={CardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-x1 mr-4 text-gray-500'>CVV</label>
                    <input
                        type='text'
                        value={CVV}
                        onChange={(e) => setCVV(e.target.value)}
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-x1 mr-4 text-gray-500'>DateOfExpiry</label>
                    <input
                        type='text'
                        value={DateOfExpiry}
                        onChange={(e) => setDateOfExpiry(e.target.value)}
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
                </div>
                <button className='bg-orange-500 hover:bg-orange-600 text-black border border-black hover:border-black px-4 py-2 rounded-full' onClick={handleEditPaymentMethod}>Save Changes</button>
            </div>
        </div>
        </div>
    )
}

export default EditPaymentMethod