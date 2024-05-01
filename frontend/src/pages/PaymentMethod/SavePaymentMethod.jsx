import React , { useEffect,useState } from 'react';
import axios from 'axios';
import clientbg from '../../images/clientbg.jpeg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SavePaymentMethod = () => {
    const [PaymentMethod, setPaymentMethod] = useState('');
    const [CardNumber, setCardNumber] = useState('');
    const [CVV, setCVV] = useState('');
    const [DateOfExpiry, setDateOfExpiry] = useState('');
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSavePaymentMethod = () => {
        const data = {
            PaymentMethod,
            CardNumber,
            CVV,
            DateOfExpiry,
        };
        setLoading(true);
        axios.post(`http://localhost:5555/savepaymentmethod/user`, data).then(() => {
            setLoading(false);
            navigate('/user');
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
            
            <h1 className='text-3x1 my-4'>Select the method you prefer to save.</h1>
            <hr class="w-200px mx-auto border-t-2 border-gray-300 my-4"/>

            {loading ? <Spinner /> : ''}
            
            <form onSubmit={handleSavePaymentMethod}>
                
            <label className="inline-flex items-center mr-4">
          <input type="radio" className="form-radio" name="PaymentMethod" value="Cash" onChange={(e) => setPaymentMethod(e.target.value)}/>
          <span className="ml-2">Cash</span>
        </label>

        <label className="inline-flex items-center mr-4">
          <input type="radio" className="form-radio" name="PaymentMethod" value="Card" onChange={(e) => setPaymentMethod(e.target.value)}/>
          <span className="ml-2">Card</span>
        </label>

        <label className="inline-flex items-center mr-4">
          <input type="radio" className="form-radio" name="PaymentMethod" value="Stripe" onChange={(e) => setPaymentMethod(e.target.value)}/>
          <span className="ml-2">Pay via Stripe</span>
        </label><br/><br/>
                
                    <label className='text-x1 mr-4 text-gray-500'>CardNumber</label>
                    <input
                        type='text'
                        value={CardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
                
                    <label className='text-x1 mr-4 text-gray-500'>CVV</label>
                    <input
                        type='text'
                        value={CVV}
                        onChange={(e) => setCVV(e.target.value)}
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    />
                
                    <label className='text-x1 mr-4 text-gray-500'>DateOfExpiry</label>
                    <input
                        type='text'
                        value={DateOfExpiry}
                        onChange={(e) => setDateOfExpiry(e.target.value)}
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-full'
                    /><br/><br/>

                
                <button className='bg-orange-500 hover:bg-orange-600 text-black border border-black hover:border-black px-4 py-2 rounded-full' onClick={handleSavePaymentMethod}>Save </button>
                </form>
            </div>
        </div>
    )
}

export default SavePaymentMethod