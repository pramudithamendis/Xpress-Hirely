import React from 'react';
import { Link } from 'react-router-dom';
// import Header from '../components/Header'; // Import your Header component here
// import Footer from '../components/Footer'; // Import your Footer component here
// import onBording from '../images/Car_Rental.jpg';

const Onboarding = () => {
    return (
        <div>
            {/* Include your Header component here */}
            <Header />
            <div className="container mx-auto flex justify-between items-center py-10">
                {/* Hero Image */}
                <div className="w-1/2">
                    <img src={onBording} alt="Car Rental" className="w-full" />
                </div>
                {/* Explanation about the Service */}
                <div className="w-1/2 px-5">
                    <h1 className="text-3xl font-bold mb-4">Welcome to the Car Rental Service</h1>
                    <p className="text-lg mb-8">
                    Are you a vehicle owner looking to generate extra income? Look no further! At Car Rental Service, we offer a hassle-free way for you to monetize your vehicle. 
                    By partnering with us, you can turn your idle car into a source of passive income. Our platform provides a seamless experience, allowing you to list your vehicle for rent with just a few clicks. 
                    Join our community of vehicle owners today and start earning money by renting out your car to trusted renters.
                    </p>

                    <ul className="list-disc ml-5">
                        <li>Flexible rental options</li>
                        <li>Competitive pricing</li>
                        <li>24/7 customer support</li>
                        {/* Add more list items as needed */}
                    </ul>

                    {/* Request Button */}
                    <Link to="/rent-request" className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg inline-block mt-4">Request</Link>
                </div>
            </div>
            {/* Include your Footer component here */}
            <Footer />
        </div>
    );
};

export default Onboarding;
