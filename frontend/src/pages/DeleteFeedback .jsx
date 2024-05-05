import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteFeedback = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleDelete = async () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/feedbacks/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('feedback deleted successfully!', { variant: 'success' });
                navigate('/feedbacks/home');
            })

            .catch((error) => {
                setLoading(false);
                alert(`Error editing feedback: ${error.message}`);
                console.log(error);
               
            });
    };

    return (
        <div className='p-4'>
          <div className='flex flex-col '><BackButton /></div>
    
          <h1 className='text-3xl my-4 text-center'><b>Delete Offer</b></h1>
          {loading ? <Spinner /> : ''}
          <div className='flex flex-col items-center border-2 border-orange-500 rounded-xl w-[600px] p-8 mx-auto'>
            <h3 className='text-2xl'>Are You Sure You Want To Delete This ?</h3>
    
            <button
              className='p-4 bg-red-600 text-white m-8 w-full'
              onClick={handleDelete}
            >
              Yes Delete It
            </button>
          </div>
        </div>
      );
    };

export default DeleteFeedback;
