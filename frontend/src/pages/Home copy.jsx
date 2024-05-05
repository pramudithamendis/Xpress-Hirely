import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
// import FeedbackCard from '../components/Home/FeedbackCard';
// import FeedbackTable from '../components/Home/FeedbackTable';

import FeedbackCard from '../components/home/FeedbackCard';
import FeedbackTable from '../components/home/FeedbackTable';
// import backgroundImage from '../assets/photo-feed.jpg'

const Home = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showType, setShowType] = useState('card');  // Corrected variable declaration

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
        alert(`Error deleting feedback: ${error.message}`);
        console.log(error);
      });
  };

  return (
    <div style={{
      // backgroundImage: `url(${backgroundImage})`,
      height: '100vh', 
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} className='p-4'>
      <div className='flex justify-center items-center gap-x-4 my-4'>
        <button
          className='bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card View
        </button>
        <button
          className='bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table View
        </button>
      </div>
      <div className='flex flex-col justify-center mb-4'>
        <br></br>
        <h1 className='text-3xl text-center text-white'><b>Feedback List</b></h1>
        <Link to='/feedbacks/add' className='flex justify-center items-center'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : feedbacks.length > 0 ? (
        showType === 'card' ? <FeedbackCard feedbacks={feedbacks} handleDelete={handleDelete} /> : <FeedbackTable feedbacks={feedbacks} handleDelete={handleDelete} />
      ) : (
        <p className='text-center'>No feedbacks available.</p>
      )}
    </div>
  );
};

export default Home;
