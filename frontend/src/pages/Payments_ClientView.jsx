import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import clientbg from '../images/clientbg.jpeg';

import CardPaymentsTable from './CardPayments/CardPaymentsTable';
import CashPaymentsTable from './CashPayments/CashPaymentsTable';
import PaymentMethodTable from './PaymentMethod/PaymentMethodTable';
import StripePaymentsTable from './StripePayments/StripePaymentsTable';

const Payments_ClientView = () => {

    const [cardpayments, setCardPayments] = useState([]);
    const [cashpayments, setCashPayments] = useState([]);
    const [stripepayments, setStripePayments] = useState([]);
    const [paymentmethods, setPaymentMethods] = useState([]);

    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/cardpayments/user`)
            .then((response) => {
                setCardPayments(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/cashpayments/user`)
            .then((response) => {
                setCashPayments(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/stripepayments/user`)
            .then((response) => {
                setStripePayments(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/savepaymentmethod/user`)
            .then((response) => {
                setPaymentMethods(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col h-screen justify-center items-center h-screen  bg-cover bg-center" style={{backgroundImage: `url(${clientbg})`}}>

            <div >

            <button className='bg-white text-black border border-orange-500 hover:bg-orange-500 hover:text-black focus:bg-orange-500 focus:text-black active:bg-orange-500 active:text-black px-4 py-2 rounded-lg' onClick={() => setShowType('CardPaymentsTable')}>
                Card
            </button>&ensp;&ensp;
            <button className='bg-white text-black border border-orange-500 hover:bg-orange-500 hover:text-black focus:bg-orange-500 focus:text-black active:bg-orange-500 active:text-black px-4 py-2 rounded-lg' onClick={() => setShowType('CashPaymentsTable')}>
                Cash
            </button>&ensp;&ensp;
            <button className='bg-white text-black border border-orange-500 hover:bg-orange-500 hover:text-black focus:bg-orange-500 focus:text-black active:bg-orange-500 active:text-black px-4 py-2 rounded-lg' onClick={() => setShowType('StripePaymentsTable')}>
                Stripe
            </button>&ensp;&ensp;

            <button className='bg-white text-black border border-orange-500 hover:bg-orange-500 hover:text-black focus:bg-orange-500 focus:text-black active:bg-orange-500 active:text-black px-4 py-2 rounded-lg' onClick={() => setShowType('PaymentMethodTable')}>
            PaymentMethod
            </button>
            </div>


            {loading ? <Spinner /> : showType === 'CardPaymentsTable' ? (<CardPaymentsTable cardpayments={cardpayments} />) :
            showType === 'CashPaymentsTable' ? (<CashPaymentsTable cashpayments={cashpayments} />) :
            showType === 'PaymentMethodTable' ? (<PaymentMethodTable paymentmethods={paymentmethods} />) :
            showType === 'StripePaymentsTable' ? (<StripePaymentsTable stripepayments={stripepayments} />) :
            null
            }
        <br/>

                <div > 
                <Link to='/refundrequests/user/create'>
                <button className='bg-white text-black border border-orange-500 hover:bg-orange-500 hover:text-black focus:bg-orange-500 focus:text-black active:bg-orange-500 active:text-black px-4 py-2 rounded-lg' >Create refund request</button>
                </Link>
                &ensp;&ensp;
                <Link to='/savepaymentmethod/user/create'>
                <button className='bg-white text-black border border-orange-500 hover:bg-orange-500 hover:text-black focus:bg-orange-500 focus:text-black active:bg-orange-500 active:text-black px-4 py-2 rounded-lg' >Save Method Details</button>
                </Link></div>

                <br/>
            
        </div>
    )
}

export default Payments_ClientView