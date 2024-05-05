import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../../../sahan/frontend/src/components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../../../../sahan/frontend/src/components/home/BooksTable';
import BooksCard from '../../../../sahan/frontend/src/components/home/BooksCard';
// import { BeatLoader } from 'react-spinners';
import { HiOutlinePlusCircle } from "react-icons/hi";
// import mainhome from './mainhome';


const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    
    <div className='p-4'>
      <div className='flex justify-between items-center'>
      <h1 className='text-4xl font-bold text-center text-gray-800 mt-8 mb-6'>All Booking Details</h1>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-orange-400 hover:bg-orange-500 px-4 py-2 focus:px-7 py-2 rounded-md text-white font-semibold shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-0'
          onClick={() => setShowType('table')}
        >
          Table View
        </button>
        <button
          className='bg-orange-400 hover:bg-orange-500 px-4 py-2 focus:px-7 py-2 rounded-md text-white font-semibold shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-0'
          onClick={() => setShowType('card')}
        >
          Card View
        </button>
      </div>
      </div>
      <br />
      <br />
      
      
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;