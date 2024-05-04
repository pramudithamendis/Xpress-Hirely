import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import OfferCardUser from '../../components/home/OfferCardUser';
import OfferTable from '../../components/home/OfferTable';

const FirstPage = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showType, setShowType] = useState('card');

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
        console.error(`Error deleting offer: ${error.message}`);
      });
  };

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4 my-4'>
        
      </div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-3xl'>Offers</h1>
    
      </div>
      {loading ? (
        <Spinner />
      ) : offers.length > 0 ? (
        showType === 'card' ? <OfferCardUser offers={offers} handleDelete={handleDelete} /> : <OfferTable offers={offers} handleDelete={handleDelete} />
      ) : (
        <p className='text-center'>No offers available.</p>
      )}
    </div>
  );
};

export default FirstPage;
