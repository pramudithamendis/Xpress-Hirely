import React , { useState } from 'react';
import axios from 'axios';
import upload_icon from '../../images/upload_icon.png';
import { useNavigate } from 'react-router-dom';
import clientbg from '../../images/clientbg.jpeg';
import Spinner from '../../components/Spinner';

const CreateCashPayment = () => {
    // const [PaymentID, setPaymentID] = useState('');
    const [ReceiptNo, setReceiptNo] = useState('');
    const [Date, setDate] = useState('');
    const [Status, setStatus] = useState('Pending');
    const [Amount, setAmount] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveCashPayment = () => {
        const data = {
            // PaymentID,
            ReceiptNo,
            Date,
            Status,
            Amount,
        };
        setLoading(true);
        axios.post(`http://localhost:5555/cashpayments/user`, data).then(() => {
            setLoading(false);
            alert('Successful');
            navigate('/user');
        })
            .catch((error) => {
                setLoading(false); 
                alert('An error occurred');
                console.log(error);
            });
        
    };

    const handleFileUpload = (files) => {
       
        setSelectedFile(files[0]);
           
    };

    // const handleFileChange = (event) => {
    //     setSelectedFile(event.target.files[0]);
    //   };

    // const handleSubmit = async () => {
    //     const formData = new FormData();
    //     formData.append('image', selectedFile);

    

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{backgroundImage: `url(${clientbg})`}}>
            <div className="bg-gray-300 rounded-lg bg-opacity-88 p-4 w-[600px]">
            {loading ? <Spinner /> : ''}
          
            <h1>Make a deposit to our account and submit the receipt.</h1>
            
            <br/>

            <p>Name : Xpress Hirely<br/>A/C No : 1234123412341234<br/>Bank : BOC<br/>Branch : Moratuwa</p><br/>

            <img src={upload_icon} alt="Upload Icon" className="w-10 h-10 mr-4" />Upload<br/>

            <input type="file" accept=".jpg, .png" className="absolute opacity-0 cursor-pointer" 
            onChange={(e) => {
                    handleFileUpload(e.target.files);
                    setReceiptNo('Pending');
                    setDate('');
                    setAmount(0);
                    setStatus('Pending');
            }}
            />

  <button className='bg-white hover:bg-orange-600 text-black py-2 px-4 rounded-lg border border-orange-500 hover:border-orange-600'>
    Choose files (.jpg, .png)
  </button>
  {selectedFile && <span className="ml-2">{selectedFile.name}</span>} <br/><br/>

    {/* <label className='text-x1 mr-4 text-black'>Receipt No</label>
        &ensp;&ensp;&nbsp;
        <input
                type='text'
                value={ReceiptNo}
                onChange={(e) => {setReceiptNo(e.target.value); setAmount(0); setStatus('Pending');}}
                className='border border-yellow-500 rounded-lg p-2 w-[250px]'/><br/><br/>

        <label className='text-x1 mr-4 text-black'>Payment Date</label>
        
        <input
                type='date'
                value={Date}
                onChange={(e) => setDate(e.target.value)}
                className='border border-yellow-500 rounded-lg p-2 w-[250px]'/><br/><br/> */}

          <button className='bg-orange-500 hover:bg-orange-600 text-black border-2 font-bold border-black hover:border-black px-4 py-2 rounded-full mx-auto block w-[200px]' onClick={handleSaveCashPayment}>Submit Payment</button><br/>
            </div>
        </div>
    )
}

export default CreateCashPayment