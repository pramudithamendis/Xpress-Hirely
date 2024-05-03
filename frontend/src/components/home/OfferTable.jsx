import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';

const OfferTable = ({ offers }) => {
  return (
    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
        <tr>
          <th scope="col" className='py-3 px-6'>Name</th>
          <th scope="col" className='py-3 px-6'>Description</th>
          <th scope="col" className='py-3 px-6'>Details</th>
          <th scope="col" className='py-3 px-6'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {offers.map((offer) => (
          <tr key={offer._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td className='py-4 px-6'>{offer.name}</td>
            <td className='py-4 px-6'>{offer.description}</td>
            <td className='py-4 px-6'>{offer.details}</td>
            <td className='py-4 px-6'>
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
  );
};

export default OfferTable;
