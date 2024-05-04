import React , { useState } from 'react';
import axios from 'axios';
import clientbg from '../../images/clientbg.jpeg';
import pay_card from '../../images/pay_card.jpg';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const CreateStripePayment = () => {
    // const [PaymentID, setPaymentID] = useState('');
    const [CardNumber, setCardNumber] = useState('');
    const [CVV, setCVV] = useState('');
    const [DateOfExpiry, setDateOfExpiry] = useState('');
    const [Amount, setAmount] = useState(100); // default amount in cents 
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState('');

    const handleSaveStripePayment = async() => { //default - without async
        const data = {
            // PaymentID,
            CardNumber,
            CVV,
            DateOfExpiry,
            Amount,
        };

        //stripe - start
    //     const response = await axios.post('/user', { Amount });
    // const { clientSecret } = response.data;
    // setClientSecret(clientSecret);
    
    //     const { error } = await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: elements.getElement(CardElement),
    //     },
    //   });
        //stripe - end

        setLoading(true);
        axios.post(`http://localhost:5555/stripepayments/user`, data).then(() => {
            setLoading(false);
            alert('Successful');
            navigate('/user');

            const { clientSecret } = response.data;
            setClientSecret(clientSecret);
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
         
            <h1 className='font-bold my-4'>Pay with stripe</h1>
            {/* <hr class="w-200px mx-auto border-t-2 border-gray-300 my-4"/> */}

            {loading ? <Spinner /> : ''}
                
                    <input
                        type='text'
                        placeholder="Card Number"
                        value={CardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                <br/><br/>
                    <input
                        type='date'
                        placeholder="Expiry Date"
                        value={DateOfExpiry}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDateOfExpiry(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-200'
                    />
                    &ensp;
                    <input
                        type='text'
                        placeholder="CVV"
                        value={CVV}
                        onChange={(e) => setCVV(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-200'
                    />
               <br/><br/>
                {/* <input
                        type='number'
                        value={Amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />*/}

                <button className='bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg' onClick={handleSaveStripePayment}>Pay </button>
            </div>
        </div>
        
    )
}

export default CreateStripePayment