import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';

const OfferTable = ({ offers }) => {
  const downloadCSV = () => {
    const csvRows = [];
    // Headers
    csvRows.push('Name,Description,Details');

    // Loop over the rows
    offers.forEach(offer => {
      csvRows.push(`${offer.name},${offer.description},${offer.details}`);
    });

    // Create blob and download
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'offers.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <button onClick={downloadCSV} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300">
        Download CSV
      </button>
      <table className='w-full mt-4'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='border border-slate-700 rounded-md text-center'>Name</th>
            <th className='border border-slate-700 rounded-md text-center'>Description</th>
            <th className='border border-slate-700 rounded-md text-center'>Details</th>
            <th className='border border-slate-700 rounded-md text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer._id}>
              <td className='border border-slate-700 rounded-md text-center'>{offer.name}</td>
              <td className='border border-slate-700 rounded-md text-center'>{offer.description}</td>
              <td className='border border-slate-700 rounded-md text-center'>{offer.details}</td>
              <td className='border border-slate-700 rounded-md text-center'>
                <Link to={`/offers/show/${offer._id}`} className="mr-2">
                  <BsInfoCircle className='text-2xl text-green-600' />
                </Link>
                <Link to={`/offers/edit/${offer._id}`} className="mr-2">
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/offers/delete/${offer._id}`} className="mr-2">
                  <AiOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OfferTable;
