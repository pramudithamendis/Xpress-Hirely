import React , { useState } from 'react';
import axios from 'axios';
import clientbg from '../../images/clientbg.jpeg';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';

const CreateCardPayment = () => {
    // const [NIC, setNIC] = useState('');
    const [CardHolderName, setCardHolderName] = useState('');
    const [CardNumber, setCardNumber] = useState('');
    const [CVV, setCVV] = useState('');
    const [DateOfExpiry, setDateOfExpiry] = useState('');
    const [Amount, setAmount] = useState('');

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveCardPayment = () => {
        const data = {
        // NIC,
            CardHolderName,
            CardNumber,
            CVV,
            DateOfExpiry,
            Amount,
        };
        setLoading(true);
        axios.post(`http://localhost:5555/cardpayments/user`, data).then(() => {
            setLoading(false);
            alert('Successful');
            navigate('/');
        })
            .catch((error) => {
                setLoading(false); 
                alert('An error occurred');
                console.log(error);
            });

            // window.location.href = '/cardpayments/user/create';    
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{backgroundImage: `url(${clientbg})`}}>

    <BackButton />
        <div className='bg-gray-300 rounded-lg bg-opacity-88 p-4 w-[800px]'>
            
            <h1 className='font-bold'>Please enter your details</h1>
            {/* <hr class="w-200px mx-auto border-t-2 border-gray-300 my-4"/> */}
            <br/>
            
            {loading ? <Spinner /> : ''}

            {/* <label className='text-x1 mr-4 text-black'>NIC</label>
            &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                    <input
                        type='text'
                        value={NIC}
                        pattern = "^[0-9]{12}" required
                        onChange={(e) => setNIC(e.target.value)}
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-[500px]'
                    /><br/><br/> */}
                            
                    <label className='text-x1 mr-4 text-black'>Card Holder Name</label>&ensp;
                    <input
                        type='text'
                        value={CardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-[500px]'
                    /><br/><br/>
                
                    <label className='text-x1 mr-4 text-black'>CardNumber</label>
                    &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                    <input
                        type='text'
                        value={CardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        pattern = "^[0-9]{16}" required
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-[500px]'
                    /><br/><br/>
                
                    <label className='text-x1 mr-4 text-black'>CVV</label>
                    &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&nbsp;
                    <input
                        type='text'
                        value={CVV}
                        onChange={(e) => setCVV(e.target.value)}
                        pattern = "^[0-9]{3}" required
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-[500px]'
                    /><br/><br/>
                              
                    <label className='text-x1 mr-4 text-black'>DateOfExpiry</label>
                    &ensp;&ensp;&ensp;&ensp;&ensp;&nbsp;
                    <input
                        type='date'
                        placeholder="DD/MM/YY"
                        value={DateOfExpiry} required
                        onChange={(e) => setDateOfExpiry(e.target.value)}
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-[500px]'
                    /><br/><br/>
                
                
                    <label className='text-x1 mr-4 text-black'>Amount</label>
                    &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                    <input
                        type='text'
                        value={Amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className='bg-white text-black border border-orange-500 focus:border-orange-500 px-4 py-2 rounded w-[500px]'
                    />
                    <br/><br/>

                    <div className='flex justify-center'>
                <button className='bg-orange-500 hover:bg-orange-600 text-black border border-black hover:border-black px-4 py-2 rounded-full w-[100px] font-bold' onClick={handleSaveCardPayment}>Pay </button></div>
            </div>
        </div>
        
    )
}

export default CreateCardPayment