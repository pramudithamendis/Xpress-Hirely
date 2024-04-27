import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import clientbg from '../../images/clientbg.jpeg';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const ShowRefundRequest = () => {
    const [refundrequest, setRefundRequest] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/refundrequests/admin/${id}`).then((response) => {
            setRefundRequest(response.data);
            setLoading(false);
        })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, [id])

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{backgroundImage: `url(${clientbg})`}}>
            <BackButton />
        <div className='bg-gray-300 rounded-lg bg-opacity-88 p-4'>
            
            <h1 className='text-orange-500 font-bold'>Show Refund Request</h1>

            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-sky-400 rounded-x1 w-fit p-4'>
                    {/* <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>RequestID</span>
                        <span>{refundrequest._id}</span>
                    </div> */}
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>PaymentID</span>
                        <span>{refundrequest.PaymentID}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>BookingID</span>
                        <span>{refundrequest.BookingID}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>Email</span>
                        <span>{refundRequest.Email}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>Reason_for_Request</span>
                        <span>{refundrequest.Reason_for_Request}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>Status</span>
                        <span>{refundrequest.Status}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>Date</span>
                        <span>{new Date(refundrequest.createdAt).toString()}</span>
                    </div>

                </div>
            )}
        </div>
        </div>
    )
}

export default ShowRefundRequest