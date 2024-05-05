import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import clientbg from '../../images/clientbg.jpeg';
import Spinner from '../../components/Spinner';
import jsPDF from 'jspdf';

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

    const handleGenerateReport = (stripepayment) => {
        const doc = new jsPDF();
    
        doc.setFontSize(18);
        doc.text(`Payment Details for ID: ${stripepayment._id}`, 20, 20);
    
        let currentY = 35;
        doc.setFontSize(12);
    
        doc.text(`Card Number: ${stripepayment.CardNumber}`, 20, currentY);
        currentY += 8;
        doc.text(`CVV: ${stripepayment.CVV}`, 20, currentY);
        currentY += 8;
        doc.text(`Amount: ${stripepayment.Amount}`, 20, currentY);
        currentY += 8;
        doc.text(`Date Of Expiry: ${stripepayment.DateOfExpiry}`, 20, currentY);
    
        
        doc.setFontSize(10);
        doc.text(
          `Report generated on: ${new Date().toLocaleString()}`,
          20,
          doc.internal.pageSize.height - 15
        );
    
        doc.save(`stripe_payment_report_${stripepayment._id}.pdf`);
      };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{backgroundImage: `url(${clientbg})`}}>
             
                <div className='bg-gray-300 rounded-lg bg-opacity-88 p-4'>
                <h1 className='text-orange-500 font-bold'>Stripe Payment Details</h1><br/>
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
                    <br/>
                    <button className="bg-orange-500 hover:bg-orange-600 text-black border border-black hover:border-black px-4 py-2 rounded-full" onClick={() => handleGenerateReport(stripepayment)}>Generate Payment Report</button>

                </div>
                
        </div>
    )
}

export default ShowStripePayment