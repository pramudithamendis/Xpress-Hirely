import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../../sahan/frontend/src/components/BackButton';
import Spinner from '../../../../sahan/frontend/src/components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 font-bold text-center text-gray-800 -700 pb-2'>Booking Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='border border-orange-300 rounded-lg shadow-lg p-6 mx-4 my-6 relative hover:shadow-xl'>
  <div className='my-4 flex items-center'>
    <span className='text-xl mr-4 text-gray-500'>Customer Name:</span>
    <span>{book.Customername}</span>
  </div>
  <div className='my-4 flex items-center'>
    <span className='text-xl mr-4 text-gray-500'>ID Number:</span>
    <span>{book.Idnumber}</span>
  </div>
  <div className='my-4 flex items-center'>
    <span className='text-xl mr-4 text-gray-500'>Address:</span>
    <span>{book.Address}</span>
  </div>
  <div className='my-4 flex items-center'>
    <span className='text-xl mr-4 text-gray-500'>Mobile Number:</span>
    <span>{new Date(book.mobilenumber).toString()}</span>
  </div>
  <div className='my-4 flex items-center'>
    <span className='text-xl mr-4 text-gray-500'>Email:</span>
    <span>{new Date(book.Email).toString()}</span>
  </div>
  <div className='my-4 flex items-center'>
    <span className='text-xl mr-4 text-gray-500'>Pickup Date:</span>
    <span>{new Date(book.pickupdate).toString()}</span>
  </div>
  <div className='my-4 flex items-center'>
    <span className='text-xl mr-4 text-gray-500'>Pickup Time:</span>
    <span>{new Date(book.pickuptime).toString()}</span>
  </div>
  <div className='my-4 flex items-center'>
    <span className='text-xl mr-4 text-gray-500'>Dropoff Date:</span>
    <span>{new Date(book.dropoffdate).toString()}</span>
  </div>
  <div className='my-4 flex items-center'>
    <span className='text-xl mr-4 text-gray-500'>Dropoff Time:</span>
    <span>{new Date(book.dropofftime).toString()}</span>
  </div>
</div>

      )}
    </div>
  );
};

export default ShowBook;