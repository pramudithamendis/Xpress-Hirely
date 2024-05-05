import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import "./FirstPage.css";
const AddFeedback = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [details, setDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const validateForm = () => {
        let errors = [];
        if (!name.trim()) errors.push("Name");
        if (!email.trim()) {
            errors.push("Email is required");
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
            errors.push("Email is invalid");
        }
        if (!details.trim()) errors.push("Details");
        if (errors.length > 0) {
            enqueueSnackbar(`Please correct the following: ${errors.join(", ")}`, { variant: 'warning' });
            return false;
        }
        return true;
    };

    const handleSaveFeedback = async () => {
        if (!validateForm() || loading) {
            return;
        }
        setLoading(true);

        try {
            await axios.post('http://localhost:5555/feedbacks', { name, email, details });
            enqueueSnackbar('Feedback added successfully!', { variant: 'success' });
            navigate('/feedbacks/addUser'); // Make sure this route is correct
        } catch (error) {
            const message = error.response?.data?.message || 'Error adding Feedback';
            enqueueSnackbar(message, { variant: 'error' });
            console.error('Error adding feedback:', error);
        } finally {
            setLoading(false);
            navigate('/feedbacks'); // Navigate to a default or home route after process
        }
    };

    return (
        <div className='p-4 bg-cover' style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}>
            <BackButton />
            <div className='flex flex-col items-center'>
                <h1 className='text-3xl my-4 text-center'><b>Add New Feedback</b></h1>
                {loading ? <Spinner /> : null}
                <div className='flex flex-col border-2 border-orange-500 rounded-xl w-[600px] p-4 bg-slate-100'>
                    <InputField label="Name" value={name} onChange={setName} />
                    <InputField label="Email" value={email} onChange={setEmail} />
                    <InputField label="Details" value={details} onChange={setDetails} />
                    <button className='p-2 bg-orange-400 m-8' onClick={handleSaveFeedback} disabled={loading}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

function InputField({ label, value, onChange }) {
    return (
        <div className='my-4'>
            <label className='text-xl mr-4 text-black'>{label}</label>
            <input
                type='text'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className='border-2 border-orange-500 px-4 py-2 w-full'
            />
        </div>
    );
}

export default AddFeedback;
