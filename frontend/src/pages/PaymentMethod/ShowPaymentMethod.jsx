import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import clientbg from '../../images/clientbg.jpeg';
import Spinner from '../../components/Spinner';

const ShowPaymentMethod  = () => {
    const [paymentmethod, setPaymentMethod ] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/savepaymentmethod/user/${id}`).then((response) => {
            setPaymentMethod(response.data);
            setLoading(false);
        })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, [])

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{backgroundImage: `url(${clientbg})`}}>

{loading ? (
                <Spinner />
            ) : (
        <div className='bg-gray-300 rounded-lg bg-opacity-88 p-4 w-[600px]'>
            
            <h1 className='text-orange-500 font-bold'>Payment Method Details</h1>
            {/* <hr class="w-200px mx-auto border-t-2 border-gray-300 my-4"/> */}

            
                {/* <div className='flex flex-col w-fit bg-white text-black border border-orange-500 px-4 py-2 rounded'> */}
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>PaymentMethod </span>
                        <span>{paymentmethod.PaymentMethod }</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>CardNumber</span>
                        <span>{paymentmethod.CardNumber}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>CVV</span>
                        <span>{paymentmethod.CVV}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>DateOfExpiry</span>
                        <span>{paymentmethod.DateOfExpiry}</span>
                    </div>
                </div>
            )}
        
        </div>
    )
}

export default ShowPaymentMethod 