import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import clientbg from '../../images/clientbg.jpeg';
import Spinner from '../../components/Spinner';
import jsPDF from 'jspdf';

const ShowCardPayment = () => {
    const [cardpayment, setCardPayment] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/cardpayments/user/${id}`).then((response) => {
            setCardPayment(response.data);
            setLoading(false);
        })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, [])

    const handleGenerateReport = (cardpayment) => {
        const doc = new jsPDF();
    
        doc.setFontSize(18);
        doc.text(`Payment Details for ID: ${cardpayment._id}`, 20, 20);
    
        let currentY = 35;
        doc.setFontSize(12);
    
        doc.text(`Card Holder Name: ${cardpayment.CardHolderName}`, 20, currentY);
        currentY += 8;
        doc.text(`Card Number: ${cardpayment.CardNumber}`, 20, currentY);
        currentY += 8;
        doc.text(`CVV: ${cardpayment.CVV}`, 20, currentY);
        currentY += 8;
        doc.text(`Amount: ${cardpayment.Amount}`, 20, currentY);
        currentY += 8;
        doc.text(`Date Of Expiry: ${cardpayment.DateOfExpiry}`, 20, currentY);
    
        
        doc.setFontSize(10);
        doc.text(
          `Report generated on: ${new Date().toLocaleString()}`,
          20,
          doc.internal.pageSize.height - 15
        );
    
        doc.save(`card_payment_report_${cardpayment._id}.pdf`);
      };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{backgroundImage: `url(${clientbg})`}}>
           
        <div className ='bg-white text-black border border-orange-500 px-4 py-2'>
           
            <h1 className='text-orange-500 font-bold'>Card Payment Details</h1>
            {/* <hr class="w-200px mx-auto border-t-2 border-gray-300 my-4"/> */}

            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-sky-400 rounded-x1 w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>PaymentID</span>
                        <span>{cardpayment._id}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>CardHolderName</span>
                        <span>{cardpayment.CardHolderName}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>CardNumber</span>
                        <span>{cardpayment.CardNumber}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>CVV</span>
                        <span>{cardpayment.CVV}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>DateOfExpiry</span>
                        <span>{cardpayment.DateOfExpiry}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>Amount</span>
                        <span>{cardpayment.Amount}</span>
                    </div>
                    <div>
                        <span className='text-x1 mr-4 text-gray-500'>Date</span>
                        <span>{new Date(cardpayment.createdAt).toString()}</span>
                    </div>
                    
                </div>
             )} 
             <button className="bg-orange-500 hover:bg-orange-600 text-black border border-black hover:border-black px-4 py-2 rounded-full " onClick={() => handleGenerateReport(cardpayment)}>Generate Payment Report</button>
        </div>
             <br/><br/><br/><br/>
        
        </div>
    )
}

export default ShowCardPayment