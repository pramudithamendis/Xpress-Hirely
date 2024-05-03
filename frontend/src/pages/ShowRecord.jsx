import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowRecord = () => {
  const [record, setRecord] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5555/records/${id}`)
    .then((response) => {
      setRecord(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }, [])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Record</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-*1 w-fit p-4 bg-white bg-opacity-70 rounded-lg'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Record Id</span>
            <span>{record._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Maintenance Type</span>
            <span>{record.Maintaintype}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Vehicle Id</span>
            <span>{record.VehicleID}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Date</span>
            <span>{record.Date}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Milage</span>
            <span>{record.Milage}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Description</span>
            <span>{record.Description}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(record.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(record.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowRecord