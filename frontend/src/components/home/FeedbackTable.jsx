import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';

const FeedbackTable = ({ feedbacks }) => {
  return (
    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
        <tr>
          <th scope="col" className='py-3 px-6'>Name</th>
          <th scope="col" className='py-3 px-6'>Email</th>
          <th scope="col" className='py-3 px-6'>Feedback</th>
          <th scope="col" className='py-3 px-6'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {feedbacks.map((feedback) => (
          <tr key={feedback._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td className='py-4 px-6'>{feedback.name}</td>
            <td className='py-4 px-6'>{feedback.email}</td>
            <td className='py-4 px-6'>{feedback.details}</td>
            <td className='py-4 px-6'>
              <Link to={`/feedbacks/show/${feedback._id}`} className="mr-2">
                <BsInfoCircle className='text-2xl text-green-600' />
              </Link>
              <Link to={`/feedbacks/edit/${feedback._id}`} className="mr-2">
                <AiOutlineEdit className='text-2xl text-yellow-600' />
              </Link>
              <Link to={`/feedbacks/delete/${feedback._id}`} className="mr-2">
                <AiOutlineDelete className='text-2xl text-red-600' />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FeedbackTable;
