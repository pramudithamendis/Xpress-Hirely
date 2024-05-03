import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import OfferCard from '../components/Home/OfferCard';
import OfferTable from '../components/Home/OfferTable';

const Home = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showType, setShowType] = useState('card');  // Corrected variable declaration

  useEffect(() => {
    axios.get('http://localhost:5555/offers')
      .then(response => {
        setOffers(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching offers:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    axios.delete(`http://localhost:5555/offers/${id}`)
      .then(() => {
        setLoading(false);
        setOffers(prevOffers => prevOffers.filter(offer => offer._id !== id));
      })
      .catch(error => {
        setLoading(false);
        alert(`Error deleting offer: ${error.message}`);
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
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
      <div className='flex justify-between '>
        <h1 className='text-3xl text-center'>Offers List</h1>
        <Link to='/offers/add'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : offers.length > 0 ? (
        showType === 'card' ? <OfferCard offers={offers} handleDelete={handleDelete} /> : <OfferTable offers={offers} handleDelete={handleDelete} />
      ) : (
        <p>No offers available.</p>
      )}
    </div>
  );
};

export default Home;
