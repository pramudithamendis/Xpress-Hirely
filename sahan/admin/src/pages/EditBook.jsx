import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [customerName, setCustomerName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setCustomerName(response.data.customerName);
      setIdNumber(response.data.idNumber)
      setAddress(response.data.address)
      setMobileNumber(response.data.mobileNumber);
      setEmail(response.data.email)
      setPickupDate(response.data.pickupDate)
      setPickupTime(response.data.pickupTime);
      setDropoffDate(response.data.dropoffDate)
      setDropoffTime(response.data.dropoffTime)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])
  
  const handleEditBook = () => {
    const data = {
      customerName,
      idNumber,
      address,
      mobileNumber,
      email,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Booking Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center font-bold text-black-800 '>Edit Bookings - Admin</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-orange-400 rounded-xl w-full max-w-[600px] p-10 mx-auto'>
      <div className='my-4'>
          <label className='text-xl mr-4 text-black-500'>Name</label>
          <input
            type='text'
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-500'>ID Number</label>
          <input
            type='text'
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-500'>Address</label>
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-500'>Mobile Number</label>
          <input
            type='text'
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-500'>Email</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-500'>Pickup Date</label>
          <input
            type='text'
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-500'>Pickup Time</label>
          <input
            type='text'
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-500'>Dropoff Date</label>
          <input
            type='text'
            value={dropoffDate}
            onChange={(e) => setDropoffDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-500'>Dropoff Time</label>
          <input
            type='text'
            value={dropoffTime}
            onChange={(e) => setDropoffTime(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500'
          />
        </div>
        <button className='px-4 py-2 bg-orange-600 rounded-lg text-white font-bold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-none m-8 ' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook