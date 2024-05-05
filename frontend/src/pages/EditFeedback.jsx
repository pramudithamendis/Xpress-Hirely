import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import {useSnackbar} from 'notistack'
import "./FirstPage.css";
const EditFeedback = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [details, setDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/feedbacks/${id}`)
          .then((response) => {
            setName(response.data.name);
            setEmail(response.data.email);
            setDetails(response.data.details);  // Setting state for details
            
            setLoading(false);
          })
          .catch((error) => {
            console.error('Failed to fetch data:', error);
            setLoading(false);
          });
      }, [id]);

      const handleEditFeedback = () => {
        const data = {
          name,
          email,
          details,  // Include details in the update
          
        };
        setLoading(true);
    
        axios.put(`http://localhost:5555/feedbacks/${id}`, data)
          .then(() => {
            setLoading(false);
            enqueueSnackbar ('feedback Edited Successfully', {variant: 'success'}); // 
            navigate('/feedbacks/home');
          })
          .catch(error => {
            setLoading(false);
            alert(`Error editing feedback: ${error.message}`);
            enqueueSnackbar('Error', {variant : 'error'});
            console.log(error);
          });
      };

      return (
        <div className='p-4 bg-cover' style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}>
          <BackButton />
          <div className='flex flex-col items-center'>
            
            <h1 className='text-3xl my-4 text-center'><b>Edit Feedback</b></h1>
            {loading ? <Spinner /> : (
              <div className='flex flex-col border-2 border-orange-500 rounded-xl w-[600px] p-4'>
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
                  <label className='text-xl mr-4 text-black'>Email</label>
                  <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border-2 border-orange-500 px-4 py-2 w-full'
                  />
                </div>
    
                <div className='my-4'>
                  <label className='text-xl mr-4 text-black'>feedback</label>
                  <input
                    type='text'
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className='border-2 border-orange-500 px-4 py-2 w-full'
                  />
                </div>
    
               
    
                <button className='p-2 bg-orange-500 m-8' onClick={handleEditFeedback}>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

export default EditFeedback;
