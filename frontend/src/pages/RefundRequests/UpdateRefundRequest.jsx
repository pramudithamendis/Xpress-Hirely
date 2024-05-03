import React, { useState, useEffect } from 'react';
import axios from 'axios';
import adminbg from '../../images/adminbg.jpg';

import { useNavigate, useParams } from 'react-router-dom';

const UpdateRefundRequest = () => {
    const [PaymentID, setPaymentID] = useState('');
    const [BookingID, setBookingID] = useState('');
    const [Email, setEmail] = useState('');
    const [Reason_for_Request, setReason_for_Request] = useState('');
    const [Status, setStatus] = useState('');
    const [Date, setDate] = useState('');
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/refundrequests/admin/${id}`)
            .then((response) => {
                setPaymentID(response.data.PaymentID);
                setBookingID(response.data.BookingID);
                setEmail(response.data.Email);
                setReason_for_Request(response.data.Reason_for_Request);
                setStatus(response.data.Status);
                setDate(response.data.Date);
                
                setLoading(false);

            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred');
                console.log(error);
            });

    }, [])

    const handleEditRefundRequest = () => {
        const data = {
            PaymentID,
            BookingID,
            Email,
            Reason_for_Request,
            Status,
            Date,
        };
        setLoading(true);

        axios.put(`http://localhost:5555/refundrequests/admin/${id}`, data).then(() => {
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

        <div className='bg-gray-300 rounded-lg bg-opacity-88 p-4 w-[600px]'>
            
            <h1 className='text-orange-500 font-bold'>Edit Refund Request Details</h1><br/>

            {/* {loading ? <Spinner /> : ''} */}
            
                    <label className='text-x1 mr-4 text-gray-500'>PaymentID</label>
                    <input
                        type='text'
                        value={PaymentID}
                        readOnly
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
                
                    <label className='text-x1 mr-4 text-gray-500'>BookingID</label>
                    <input
                        type='text'
                        value={BookingID}
                        readOnly
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
                
                    <label className='text-x1 mr-4 text-gray-500'>Email</label>
                    <input
                        type='text'
                        value={Email}
                        readOnly
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
                
                    <label className='text-x1 mr-4 text-gray-500'>Reason_for_Request</label>
                    <input
                        type='text'
                        value={Reason_for_Request}
                        readOnly
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
               
                    <label className='text-x1 mr-4 text-gray-500'>Status</label>
                    <input
                        type='text'
                        value={Status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
                
                    <label className='text-x1 mr-4 text-gray-500'>Date</label>
                    <input
                        type='text'
                        value={Date}
                        readOnly
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
              <br/><br/>

              <div className="flex justify-center">
                <button className='bg-orange-500 hover:bg-orange-600 text-black border border-black hover:border-black px-4 py-2 rounded-full' onClick={handleEditRefundRequest}>Save Changes</button></div>
            </div>
       
        </div>
    )
}

export default UpdateRefundRequest