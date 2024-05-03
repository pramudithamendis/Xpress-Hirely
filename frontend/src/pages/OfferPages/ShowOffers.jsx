import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const ShowOffers = () => {

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/offers/${id}`)
      .then((response) => {
        setOffers(response.data);
        setLoading(false);
      })

      .catch(error => {
        console.error("Error fetching offers:", error);
        setLoading(false);
      });
  }, []);

  return (

    <div className='p-4'>
      <BackButton />
      <div className='flex flex-col items-center'><h1 className='text-3xl my-4'><b>Offer Details</b></h1></div>

      {loading ? (

        <Spinner />

      ) : (

        <div className='flex flex-col items-center'>
          <div className='flex flex-col border-2 border-orange-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl m-4 text-gray-500 '>Id :</span>
              <span>{offers._id}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl m-4 text-gray-500 '>Name :</span>
              <span>{offers.name}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl m-4 text-gray-500 '>Description :</span>
              <span>{offers.description}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl m-4 text-gray-500 '>Details :</span>
              <span>{offers.details}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl m-4 text-gray-500 '>Create Time :</span>
              <span>{new Date(offers.createdAt).toString()}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl m-4 text-gray-500 '>Last Updated Time : </span>
              <span>{new Date(offers.updatedAt).toString()}</span>
            </div>




          </div>
        </div>

      )}
    </div>


  )
}

export default ShowOffers;
