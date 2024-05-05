import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/BackButton.jsx';

const ShowOffers = () => {
  const [offers, setOffers] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/offers/${id}`)
      .then((response) => {
        setOffers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching offers:", error);
        setLoading(false);
      });
  }, [id]);  // Added dependency on `id`

  const downloadReport = () => {
    const filename = `offer_${offers._id}.csv`;
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Id,Name,Description,Details,CreateTime,LastUpdatedTime\n"; // header row
    csvContent += `${offers._id},${offers.name},${offers.description.replace(/,/g, ';')},${offers.details.replace(/,/g, ';')},${new Date(offers.createdAt).toISOString()},${new Date(offers.updatedAt).toISOString()}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='p-4'>
      <BackButton />
      <div className='flex flex-col items-center'><h1 className='text-3xl my-4'><b>Offer Details</b></h1></div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col items-center '>
          <div className='flex flex-col border-2 border-black-400 rounded-xl w-fit p-4 bg-orange-300'>
            <div className='my-4'>
              <span className='text-xl m-4 '>Id :</span>
              <span>{offers._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl m-4 '>Name :</span>
              <span>{offers.name}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl m-4 '>Description :</span>
              <span>{offers.description}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl m-4 '>Details :</span>
              <span>{offers.details}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl m-4 '>Create Time :</span>
              <span>{new Date(offers.createdAt).toString()}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl m-4 '>Last Updated Time :</span>
              <span>{new Date(offers.updatedAt).toString()}</span>
            </div>
          </div>
          <button onClick={downloadReport} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Download Report
          </button>
        </div>
      )}
    </div>
  );
}

export default ShowOffers;
