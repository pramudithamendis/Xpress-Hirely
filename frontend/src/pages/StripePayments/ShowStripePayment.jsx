import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import clientbg from '../../images/clientbg.jpeg';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const ShowStripePayment = () => {
    const [stripepayment, setStripePayment] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/stripepayments/user/${id}`).then((response) => {
            setStripePayment(response.data);
            setLoading(false);
        })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, [])

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{backgroundImage: `url(${clientbg})`}}>
             <BackButton /><br/>
            <h1 className='text-orange-500 font-bold'>Stripe Payment Details</h1><br/><br/>

            {/* <hr class="w-200px mx-auto border-t-2 border-gray-300 my-4"/> */}

            {/* {loading ? (
                <Spinner />
            ) : ( */}
                <div className='bg-gray-300 rounded-lg bg-opacity-88 p-4'>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>PaymentID</span>
                        <span>{stripepayment._id}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>CardNumber</span>
                        <span>{stripepayment.CardNumber}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>CVV</span>
                        <span>{stripepayment.CVV}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>DateOfExpiry</span>
                        <span>{stripepayment.DateOfExpiry}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>Amount</span>
                        <span>{stripepayment.Amount}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>Date</span>
                        <span>{new Date(stripepayment.createdAt).toString()}</span>
                    </div>
                </div>
            {/* )} */}
        </div>
    )
}

export default ShowStripePayment