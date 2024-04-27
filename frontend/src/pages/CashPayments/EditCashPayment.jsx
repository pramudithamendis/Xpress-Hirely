import React, { useState, useEffect } from 'react';
import axios from 'axios';
import adminbg from '../../images/adminbg.jpg';
import BackButton from '../../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const EditCashPayment = () => {
    // const [PaymentID, setPaymentID] = useState('');
    const [ReceiptNo, setReceiptNo] = useState('');
    const [Status, setStatus] = useState('');
    const [Date, setDate] = useState('');
    const [Amount, setAmount] = useState('');
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/cashpayments/admin/${id}`)
            .then((response) => {
                // setPaymentID(response.data.PaymentID);
                setReceiptNo(response.data.ReceiptNo);
                setStatus(response.data.Status);
                setDate(response.data.Date);
                setAmount(response.data.Amount);
                setLoading(false);

            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred');
                console.log(error);
            });

    }, [id]);

    const handleEditCashPayment = () => {
        const data = {
            // PaymentID,
            ReceiptNo,
            Status,
            Date,
            Amount,
        };
        setLoading(true);

        axios.put(`http://localhost:5555/cashpayments/admin/${id}`, data).then(() => {
            setLoading(false);
            alert('Changes saved');
            navigate('/admin');
        })
            .catch((error) => {
                setLoading(false); 
                alert('An error occurred');
                console.log(error);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{backgroundImage: `url(${adminbg})`}}>
            <BackButton />
            <h1 className='text-orange-500 font-bold'>Edit Cash Payment</h1><br/>
            {/* {loading ? <Spinner /> : ''} */}
            <div className='bg-gray-300 rounded-lg bg-opacity-88 p-4'>

                <div className='my-4'>
                    <label className='text-x1 mr-4 text-gray-500'>PaymentID</label>
                    <input
                        type='text'
                        value={id}
                        readOnly
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-x1 mr-4 text-gray-500'>ReceiptNo</label>
                    <input
                        type='text'
                        value={ReceiptNo}
                        onChange={(e) => setReceiptNo(e.target.value)}
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-x1 mr-4 text-gray-500'>Status</label>
                    <input
                        type='text'
                        value={Status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-x1 mr-4 text-gray-500'>Date</label>
                    <input
                        type='text'
                        value={Date}
                        onChange={(e) => setDate(e.target.value)}
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-x1 mr-4 text-gray-500'>Amount</label>
                    <input
                        type='text'
                        value={Amount}
                        readOnly
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
                </div>
                <button className='bg-orange-500 hover:bg-orange-600 text-black border border-black hover:border-black px-4 py-2 rounded-full' onClick={handleEditCashPayment}>Save Changes</button>
            </div>
        
        </div>
    )
}

export default EditCashPayment