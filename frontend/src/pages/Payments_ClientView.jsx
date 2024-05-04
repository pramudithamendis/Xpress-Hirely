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

    const [searchInput, setSearchInput] = useState("");
    const [filteredCardPayments, setFilteredCardPayments] = useState([]);
    const [filteredCashPayments, setFilteredCashPayments] = useState([]);
    const [filteredStripePayments, setFilteredStripePayments] = useState([]);
    const [filteredRefundRequests, setFilteredRefundRequests] = useState([]);

    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('');

    useEffect(() => {
        const filteredData = cardpayments.filter(item => {
            return item.Amount.toString().includes(searchInput);
        });
        setFilteredCardPayments(filteredData);
    }, [cardpayments, searchInput]);

    useEffect(() => {
        const filteredData = cashpayments.filter(item => {
            return item.ReceiptNo.toString().includes(searchInput) ||
        item.Amount.toString().includes(searchInput) ||
        item.Status.toString().includes(searchInput);
        });
        setFilteredCashPayments(filteredData);
    }, [cashpayments, searchInput]);

    useEffect(() => {
        const filteredData = stripepayments.filter(item => {
            return item.Amount.toString().includes(searchInput); 
        });
        setFilteredStripePayments(filteredData);
    }, [stripepayments, searchInput]);

    const handleSearchChange = (newSearchTerm) => {
        setSearchInput(newSearchTerm);
      };

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


            {loading ? <Spinner /> : showType === 'CardPaymentsTable' ? (<CardPaymentsTable cardpayments={filteredCardPayments} />) :
            showType === 'CashPaymentsTable' ? (<CashPaymentsTable cashpayments={filteredCashPayments} />) :
            showType === 'PaymentMethodTable' ? (<PaymentMethodTable paymentmethods={filteredRefundRequests} />) :
            showType === 'StripePaymentsTable' ? (<StripePaymentsTable stripepayments={filteredStripePayments} />) :
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