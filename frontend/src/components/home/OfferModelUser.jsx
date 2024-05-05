import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import jsPDF from 'jspdf';

const OfferModelUser = ({ offer, onClose }) => {
    const downloadPdf = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Offer Details Report', 105, 25, null, null, 'center');

        doc.setFontSize(12);
        doc.text(`Name: ${offer.name}`, 20, 50);
        doc.text(`Description: ${offer.description}`, 20, 65);
        doc.text(`Details: ${offer.details}`, 20, 80);

        // Save the PDF
        doc.save('offer-details-report.pdf');
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center'
            onClick={onClose}
        >
            <div
                className='w-[600px] max-w-full h-[400px] bg-orange-400 rounded-xl p-4 flex flex-col relative'
                onClick={(event) => event.stopPropagation()} // Prevent click inside the modal from closing it
            >
                <AiOutlineClose
                    className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <h1 className='text-center text-red-600'><b>Details</b></h1>
                <p className='text-center'>______________________________________________________________________________________</p>
                <br />
               
                <p className='text-center'>{offer.details}</p>
                <button onClick={downloadPdf} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                    Download Report
                </button>
            </div>
        </div>
    );
}

export default OfferModelUser;
