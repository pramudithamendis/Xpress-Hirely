import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import clientbg from '../../images/clientbg.jpeg';
import Spinner from '../../components/Spinner';
import jsPDF from 'jspdf';

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

    const handleGenerateReport = (cashpayment) => {
        const doc = new jsPDF();
    
        doc.setFontSize(18);
        doc.text(`Payment Details for ID: ${cashpayment._id}`, 20, 20);
    
        let currentY = 35;
        doc.setFontSize(12);
    
        doc.text(`ReceiptNo: ${cashpayment.ReceiptNo}`, 20, currentY);
        currentY += 8;
        doc.text(`Status: ${cashpayment.Status}`, 20, currentY);
        currentY += 8;
        doc.text(`Amount: ${cashpayment.Amount}`, 20, currentY);
        currentY += 8;
        doc.text(`PaymentDate: ${cashpayment.PaymentDate}`, 20, currentY);
    
        
        doc.setFontSize(10);
        doc.text(
          `Report generated on: ${new Date().toLocaleString()}`,
          20,
          doc.internal.pageSize.height - 15
        );
    
        doc.save(`cash_payment_report_${cashpayment._id}.pdf`);
      };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{backgroundImage: `url(${clientbg})`}}>

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
                        <span className='text-x1 mr-4 text-gray-500'>PaymentDate</span>
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
                <button className="bg-orange-500 hover:bg-orange-600 text-black border border-black hover:border-black px-4 py-2 rounded-full" onClick={() => handleGenerateReport(cashpayment)}>Generate Payment Report</button>

        </div>
        
        </div>
    )
}

export default ShowCashPayment