import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ShowFeedback = () => {
    const [feedback, setFeedback] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5555/feedbacks/${id}`);
                setFeedback(data);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };
        fetchFeedback();
    }, [id]);

    const handleDownloadReport = () => {
        if (!feedback) return;

        // Create report content
        const reportContent = 
            `Feedback Details:\n\n` +
            `Name: ${feedback.name}\n` +
            `Email: ${feedback.email}\n` +
            `Feedback: ${feedback.details}`;

        // Create a Blob from the data
        const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
        
        // Create a link to download the blob
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "FeedbackReport.txt"; // File name for download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    if (!feedback) return <p>Loading...</p>;

    return (
        <div>
            <h1>Feedback Details</h1>
            <p>Name: {feedback.name}</p>
            <p>Email: {feedback.email}</p>
            <p>Feedback: {feedback.details}</p>
            <button onClick={handleDownloadReport} style={{ marginTop: '20px' }}>
                Download Report
            </button>
        </div>
    );
};

export default ShowFeedback;
