import React , { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import clientbg from '../../images/clientbg.jpeg';
import Spinner from '../../components/Spinner';

const CreateRequestRefund = () => {
    const [BookingID, setBookingID] = useState('');
    const [PaymentID, setPaymentID] = useState('');
    const [Email, setEmail] = useState('');
    const [Reason_for_Request, setReason_for_Request] = useState('');
    const [Date, setDate] = useState('');
    const [Status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRequestRefund = () => {
        const data = {
            BookingID,
            PaymentID,
            Email,
            Reason_for_Request,
            Date,
            Status
        };
        setLoading(true);
        axios.post(`http://localhost:5555/refundrequests/user`, data).then(() => {
            setLoading(false);
            // setDate('');
            // setStatus('Pending');
            alert('Successful');
            navigate('/');
        })
        .catch((error) => {
            setLoading(false); 
            alert('An error occurred');
            console.log(error);
        });
};

return (
    <div className="h-screen bg-cover bg-center items-center flex justify-center" style={{backgroundImage: `url(${clientbg})`}}>
<br/>
    <div className='bg-gray-300 rounded-lg bg-opacity-88 p-4 w-[800px] justify-center'>
        
    <h1 className='font-bold'>Fill this form to request for a refund.</h1><br/>

    {/* <hr class="w-200px mx-auto border-t-2 border-gray-300 my-4"/> */}

    {loading ? <Spinner /> : ''}

        <label className='text-x1 mr-4 text-black'>BookingID</label>
        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        <input
                type='text'
                value={BookingID}
                onChange={(e) => setBookingID(e.target.value)}
                className='border border-yellow-500 rounded-lg p-2 w-[600px]'/><br/><br/>
        
        <label className='text-x1 mr-4 text-black'>PaymentID</label>
        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        <input
                type='text'
                value={PaymentID}
                onChange={(e) => setPaymentID(e.target.value)}
                className='border border-yellow-500 rounded-lg p-2 w-[600px]'/><br/><br/>
        
        <label className='text-x1 mr-4 text-black'>Email</label>
        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        <input
                type='email'
                value={Email}
                // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" 
                onChange={(e) => setEmail(e.target.value)}
                className='border border-yellow-500 rounded-lg p-2 w-[600px]'/><br/><br/>
        
        <label className='text-x1 mr-4 text-black'>Reason_for_Request</label>
        <input
                type='text'
                value={Reason_for_Request}
                onChange={(e) => {setReason_for_Request(e.target.value);
                    setDate(new Date().toISOString().slice(0, 10));
                    setStatus('Pending'); }}
                className='border border-yellow-500 rounded-lg p-2 w-[600px]'/><br/><br/>

        <button className='bg-orange-500 hover:bg-orange-600 text-black border border-black hover:border-black px-4 py-2 rounded-full' onClick={handleRequestRefund}>Submit Request</button>
    </div>
    </div>
    )
}

export default CreateRequestRefund