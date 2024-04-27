import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import clientbg from '../../images/clientbg.jpeg';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const ShowCashPayment = () => {
    const [cashpayment, setCashPayment] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/cashpayments/user/${id}`).then((response) => {
            setCashPayment(response.data);
            setLoading(false);
        })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, [])

    return (
        <div className="flex items-center h-screen bg-cover bg-center" style={{backgroundImage: `url(${clientbg})`}}>

    <BackButton />
        <div className='bg-gray-300 rounded-lg bg-opacity-88 p-4'>
           
            <h1 className='text-orange-500 font-bold'>Cash Payment Details</h1>
            {/* <hr class="w-200px mx-auto border-t-2 border-gray-300 my-4"/> */}

            {/* {loading ? (
                <Spinner />
            ) : ( */}
                <div className='flex flex-col border-sky-400 rounded-x1 w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>PaymentID</span>
                        <span>{cashpayment._id}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>ReceiptNo</span>
                        <span>{cashpayment.ReceiptNo}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>Date</span>
                        <span>{new Date(cashpayment.createdAt).toString()}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>Status</span>
                        <span>{cashpayment.Status}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>Amount</span>
                        <span>{cashpayment.Amount}</span>
                    </div>

                </div>
            {/* )} */}
        </div>
        </div>
    )
}

export default ShowCashPayment