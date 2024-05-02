import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const createRecords = () => {
  const [Maintaintype, setMaintaintype] = useState('');
  const [VehicleID, setVehicleID] = useState('');
  const [Date, setDate] = useState('');
  const [Milage, setMilage] = useState('');
  const [Description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveRecord = () => {
    const data = {
      Maintaintype,
      VehicleID,
      Date,
      Milage,
      Description,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/records', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Record Added Sucessfully !', { variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happened. Please check console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Record</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto bg-white bg-opacity-70 rounded-lg'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Maintain Type</label>
          <input
            type='text'
            value={Maintaintype}
            onChange={(e) => setMaintaintype(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>VehicleID</label>
          <input
            type='text'
            value={VehicleID}
            onChange={(e) => setVehicleID(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Date</label>
          <input
            type='text'
            value={Date}
            onChange={(e) => setDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Milage in miles</label>
          <input
            type='number'
            value={Milage}
            onChange={(e) => setMilage(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <input
            type='text'
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-orange-500 m-8' onClick={handleSaveRecord}>
          Save Record
        </button>


      </div>
    </div>
  )
}

export default createRecords