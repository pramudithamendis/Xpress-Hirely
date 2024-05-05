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
      <h1 className='text-3xl my-4 font-bold text-center text-gray-800 b-4  pb-2'>Booking Details</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className='border border-orange-300 rounded-lg shadow-lg p-6 mx-4 my-6 relative hover:shadow-xl bg-white opacity-80'>


          <h2 className='font-bold text-lg text-gray-800 mb-4'>
    Hello, {book.customerName}!
  </h2>
  <div className='my-4 flex items-center'>
  <span className='text-xl mr-4 text-black-500 font-bold'>
Pickup Date:</span>
    <span>{new Date(book.PickupDate).toString()}</span>
  </div>
  <div className='my-4 flex items-center'>
  <span className='text-xl mr-4 text-black-500 font-bold'>Pickup Time:</span>
  <span>{new Date(book.PickupTime).toLocaleTimeString()}</span>
</div>

  <div className='my-4 flex items-center'>
  <span className='text-xl mr-4 text-black-500 font-bold'>Dropoff Date:</span>
    <span>{new Date(book.DropoffDate).toString()}</span>
  </div>
  <div className='my-4 flex items-center'>
  <span className='text-xl mr-4 text-black-500 font-bold'>Dropoff Time:</span>
    <span>{new Date(book.DropoffTime).toString()}</span>
  </div>
  <div className='my-4 flex items-center'>
  <span className='text-xl mr-4 text-black-500 font-bold'>Total:</span>
    <span>{new Date(book.DropoffTime).toString()}</span>
  </div>
</div>

      )}
    </div>
  );
};

export default ShowBook;