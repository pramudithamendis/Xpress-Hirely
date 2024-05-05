import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton'; // Assuming this is correct
import Spinner from '../components/Spinner'; // Assuming this is correct

const ShowFeedback = () => {
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state
    const { id } = useParams();

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5555/feedbacks/${id}`);
                setFeedback(data);
                setLoading(false); // Set loading to false upon data retrieval
            } catch (error) {
                console.error('Error fetching feedback:', error);
                setLoading(false); // Ensure loading is set to false on error too
            }
        };
        fetchFeedback();
    }, [id]);

    const handleDownloadReport = () => {
        if (!feedback) return;

        const reportContent = 
            `Feedback Details:\n\n` +
            `Name: ${feedback.name}\n` +
            `Email: ${feedback.email}\n` +
            `Feedback: ${feedback.details}`;

        const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "FeedbackReport.txt"; // Filename for download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    if (loading) return <Spinner />; // Show spinner while loading

    if (!feedback) return <p>Loading failed or no data found.</p>;

    return (
        <div className='p-4'>
          <BackButton backPath='/' />
          <div className='flex flex-col items-center'>
            <h1 className='text-3xl my-4'><b>Feedback Details</b></h1>
            <div className='flex flex-col border-2 border-orange-400 rounded-xl w-fit p-4'>
              <div className='my-4'>
                <span className='text-xl m-4 text-gray-500'>Id :</span>
                <span>{feedback._id}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl m-4 text-gray-500'>Name :</span>
                <span>{feedback.name}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl m-4 text-gray-500'>Email :</span>
                <span>{feedback.email}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl m-4 text-gray-500'>Feedback :</span>
                <span>{feedback.details}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl m-4 text-gray-500'>Create Time :</span>
                <span>{new Date(feedback.createdAt).toString()}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl m-4 text-gray-500'>Last Updated Time :</span>
                <span>{new Date(feedback.updatedAt).toString()}</span>
              </div>
            </div>
            <button onClick={handleDownloadReport} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Download Report
            </button>
          </div>
        </div>
    );
}

export default ShowFeedback;
