import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import FeedbackCardUser from '../components/home/FeedbackCardUser';
import FeedbackTable from '../components/home/FeedbackTable';



const FirstPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showType, setShowType] = useState('card');

  useEffect(() => {
    axios.get('http://localhost:5555/feedbacks')
      .then(response => {
        setFeedbacks(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching feedback:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    axios.delete(`http://localhost:5555/feedbacks/${id}`)
      .then(() => {
        setLoading(false);
        setFeedbacks(prevFeedbacks => prevFeedbacks.filter(feedback => feedback._id !== id));
      })
      .catch(error => {
        setLoading(false);
        console.error(`Error deleting feedback: ${error.message}`);
      });
  };

  return (
    <div  style={{
      // backgroundImage: `url(${backgroundImage})`,
      height: '100vh', 
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex-1'></div>
        <h1 className='text-4xl text-center flex-1 text-cyan-50 '><b>Feedback</b></h1>
        <Link to='/feedbacks/addUser' className='flex-1 text-right'>
          <button className='bg-red-500 py-2 px-4 rounded'>Add Feedback</button>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : feedbacks.length > 0 ? (
        showType === 'card' ? <FeedbackCardUser feedbacks={feedbacks} handleDelete={handleDelete} /> : <FeedbackTable feedbacks={feedbacks} handleDelete={handleDelete} />
      ) : (
        <p className='text-center'>No Feedbacks available.</p>
      )}
    </div>
  );
};

export default FirstPage;
