import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import RecordsTable from '../components/home/RecordsTable';
import RecordsCard from '../components/home/RecordsCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  useState(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/records')
      .then((response) => {
        setRecords(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        console.log(error);
        setLoading(false);
      });
  }, [])

  useEffect(() => {
    // Filter data every time rents or the searchTerm changes
    const filteredData = records.filter((item) => {
      return (
        item.VehicleID.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredRecords(filteredData);
  }, [records, searchTerm]);

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table View
        </button>
        <button
          className='bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card View
        </button>

      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Records List</h1>
        <Link to='/records/create'>
          <h3 className='bg-white bg-opacity-20'>Add a New Record</h3>
          <MdOutlineAddBox className='text-orange-500 text-4xl' />
        </Link>
        <SearchBar onSearchChange={handleSearchChange} />{" "}
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <RecordsTable records={filteredRecords} />
      ) : (
        <RecordsCard records={filteredRecords} />
      )}
    </div>
  );
};

export default Home