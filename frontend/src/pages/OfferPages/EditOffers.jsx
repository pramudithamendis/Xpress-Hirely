import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import {useSnackbar} from 'notistack'

const EditOffers = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');  // New state for details
  const [vehicleType, setVehicleType] = useState('');  // New state for vehicle type
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/offers/${id}`)
      .then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
        setDetails(response.data.details);  // Setting state for details
        setVehicleType(response.data.vehicle_type);  // Setting state for vehicle type
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      });
  }, [id]);  // Dependency array includes id

  const handleEditOffer = () => {
    const data = {
      name,
      description,
      details,  // Include details in the update
      
    };
    setLoading(true);

    axios.put(`http://localhost:5555/offers/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar ('Offer Edited Successfully', {variant: 'success'}); // 
        navigate('/offers/home');
      })
      .catch(error => {
        setLoading(false);
        alert(`Error editing offers: ${error.message}`);
        enqueueSnackbar('Error', {variant : 'error'});
        console.log(error);
      });
  };

  return (
    <div className='p-4 bg-cover' style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}>
      <BackButton />
      <div className='flex flex-col items-center'>
        
        <h1 className='text-3xl my-4 text-center'><b>Edit Offer</b></h1>
        {loading ? <Spinner /> : (
          <div className='flex flex-col border-2 border-orange-500 rounded-xl w-[600px] p-4 bg-slate-100'>
            <div className='my-4'>
              <label className='text-xl mr-4 text-black'>Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='border-2 border-orange-500 px-4 py-2 w-full'
              />
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-black'>Description</label>
              <input
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='border-2 border-orange-500 px-4 py-2 w-full'
              />
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-black'>Details</label>
              <input
                type='text'
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className='border-2 border-orange-500 px-4 py-2 w-full'
              />
            </div>

           

            <button className='p-2 bg-orange-500 m-8' onClick={handleEditOffer}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditOffers;
