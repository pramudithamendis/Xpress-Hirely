import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddOffer = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const validateForm = () => {
    let errors = [];
    if (!name.trim()) errors.push("Name");
    if (!description.trim()) errors.push("Description");
    if (!details.trim()) errors.push("Details");
    if (errors.length > 0) {
      enqueueSnackbar(`Please fill out the following fields: ${errors.join(", ")}`, { variant: 'warning' });
      return false;
    }
    return true;
  };

  const handleSaveOffer = () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    axios.post('http://localhost:5555/offers', { name, description, details })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Offer added successfully!', { variant: 'success' });
        navigate('/offers/home');
      })
      .catch(error => {
        setLoading(false);
        const message = error.response?.data?.message || 'Error adding offer';
        enqueueSnackbar(message, { variant: 'error' });
        enqueueSnackbar('error', { variant: 'success' });
        setError(message);
        console.error('Error adding offer:', error);
      });
  };

  return (
    <div className='p-4 bg-cover' style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}>
      <BackButton />
      <div className='flex flex-col items-center'>
        
        <h1 className='text-3xl my-4 text-center'><b>Add New Offer</b></h1>
        {loading ? <Spinner /> : null}
        <div className='flex flex-col border-2 border-orange-500 rounded-xl w-[600px] p-4'>
          {error && <p className="text-red-500">{error}</p>}
          <InputField label="Name" value={name} onChange={setName} />
          <InputField label="Description" value={description} onChange={setDescription} />
          <InputField label="Details" value={details} onChange={setDetails} />
          <button className='p-2 bg-orange-400 m-8' onClick={handleSaveOffer}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <div className='my-4'>
      <label className='text-xl mr-4 text-black'>{label}</label><label className='text-xl mr-4 text-red-600'>*</label>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='border-2 border-orange-500 px-4 py-2 w-full'
      />
    </div>
  );
}

export default AddOffer;
