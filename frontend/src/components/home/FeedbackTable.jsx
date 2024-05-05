import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';

const FeedbackTable = ({ feedbacks }) => {
  // Function to convert feedback data to CSV
  const convertToCSV = (data) => {
    const csvRows = [
      ['Name', 'Email', 'Feedback'] // CSV header
    ];
    // Loop over the feedbacks and push data as CSV format
    data.forEach(item => {
      csvRows.push([item.name, item.email, item.details]);
    });
    return csvRows.map(e => e.join(',')).join('\n');
  };

  // Function to handle the download of the CSV
  const downloadCSV = () => {
    const csvData = convertToCSV(feedbacks);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'feedback_report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
      <button 
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={downloadCSV}
      >
        Download Report
      </button>
      <div className="overflow-x-auto">
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-slate-100'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 bg-slate-100'>
            <tr>
              <th scope="col" className='py-1 px-1 w-1'>Name</th>
              <th scope="col" className='py-2 px-4 w-1'>Email</th>
              <th scope="col" className='py-2 px-4 w-1'>Feedback</th>
              <th scope="col" className='py-2 px-4 w-1'>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {feedbacks.map((feedback) => (
              <tr key={feedback._id} className='border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 bg-slate-100'>
                <td className='py-1 px-1'>{feedback.name}</td>
                <td className='py-1 px-1'>{feedback.email}</td>
                <td className='py-1 px-1'>{feedback.details}</td>
                <td className='py-1 px-1'>
                  <Link to={`/feedbacks/show/${feedback._id}`} className="mr-2">
                    <BsInfoCircle className='text-2xl text-green-600 hover:text-green-800' />
                  </Link>
                  <Link to={`/feedbacks/edit/${feedback._id}`} className="mr-2">
                    <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-800' />
                  </Link>
                  <Link to={`/feedbacks/delete/${feedback._id}`} className="mr-2">
                    <AiOutlineDelete className='text-2xl text-red-600 hover:text-red-800' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackTable;
