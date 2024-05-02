import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const editRecord = () => {
  const [Maintaintype, setMaintaintype] = useState('');
  const [VehicleID, setVehicleID] = useState('');
  const [Date, setDate] = useState('');
  const [Milage, setMilage] = useState('');
  const [Description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/records/${id}`)
    .then((response) => {
      setMaintaintype(response.data.Maintaintype);
      setVehicleID(response.data.VehicleID);
      setDate(response.data.Date);
      setMilage(response.data.Milage);
      setDescription(response.data.Description);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      alert('An error happened. Please check console');
      console.log(error);
    });
  }, [])
  const handleEditRecord = () => {
    const data = {
      Maintaintype,
      VehicleID,
      Date,
      Milage,
      Description,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/records/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Record Edited Successfully!', { variant: 'success' });
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
      <h1 className='text-3xl my-4'>Edit Record</h1>
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
          <label className='text-xl mr-4 text-gray-500'>Milage</label>
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
        <button className='p-2 bg-orange-500 m-8' onClick={handleEditRecord}>
          Update Record
        </button>
      </div>
    </div>
  )
}

export default editRecord