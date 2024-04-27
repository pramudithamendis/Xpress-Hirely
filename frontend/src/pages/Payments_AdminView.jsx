import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import adminbg from '../images/adminbg.jpg';
import SearchBar from './SearchBar';

import AllCardPaymentsTable from './CardPayments/AllCardPaymentsTable';
import AllCashPaymentsTable from './CashPayments/AllCashPaymentsTable';
import AllRefundRequestsTable from './RefundRequests/AllRefundRequestsTable';
import AllStripePaymentsTable from './StripePayments/AllStripePaymentsTable';

const Payments_AdminView = () => {

    const [cardpayments, setAllCardPayments] = useState([]);
    const [cashpayments, setAllCashPayments] = useState([]);
    const [stripepayments, setAllStripePayments] = useState([]);
    const [refundrequests, setAllRefundRequests] = useState([]);

    const [searchInput, setSearchInput] = useState("");
    const [filteredPayments, setFilteredPayments] = useState([]);

    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        const filteredData = cardpayments.filter(item => {
            return item.CardHolderName.toString().includes(searchInput);
        });
        setFilteredPayments(filteredData);
    }, [cardpayments, searchInput]);

    const handleSearchChange = (newSearchTerm) => {
        setSearchInput(newSearchTerm);
      };

    useEffect(() => {

        setLoading(true);
        axios
            .get(`http://localhost:5555/cardpayments/admin`)
            .then((response) => {
                setAllCardPayments(response.data.data);
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
            .get(`http://localhost:5555/cashpayments/admin`)
            .then((response) => {
                setAllCashPayments(response.data.data);
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
            .get(`http://localhost:5555/stripepayments/admin`)
            .then((response) => {
                setAllStripePayments(response.data.data);
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
            .get(`http://localhost:5555/refundrequests/admin`)
            .then((response) => {
                setAllRefundRequests(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        
            <div className="flex flex-col h-screen justify-center items-center h-screen  bg-cover bg-center" style={{backgroundImage: `url(${adminbg})`}}>
            <div className='mt-10 mb-10'>

            <button className='bg-white text-black border border-orange-500 hover:bg-orange-500 hover:text-black focus:bg-orange-500 focus:text-black active:bg-orange-500 active:text-black px-4 py-2 rounded-lg' onClick={() => setShowType('AllCardPaymentsTable')}>
                Card
            </button>&ensp;&ensp;
            <button className='bg-white text-black border border-orange-500 hover:bg-orange-500 hover:text-black focus:bg-orange-500 focus:text-black active:bg-orange-500 active:text-black px-4 py-2 rounded-lg' onClick={() => setShowType('AllCashPaymentsTable')}>
                Cash
            </button>&ensp;&ensp;
            <button className='bg-white text-black border border-orange-500 hover:bg-orange-500 hover:text-black focus:bg-orange-500 focus:text-black active:bg-orange-500 active:text-black px-4 py-2 rounded-lg' onClick={() => setShowType('AllRefundRequestsTable')}>
                Refund
            </button>&ensp;&ensp;
            <button className='bg-white text-black border border-orange-500 hover:bg-orange-500 hover:text-black focus:bg-orange-500 focus:text-black active:bg-orange-500 active:text-black px-4 py-2 rounded-lg' onClick={() => setShowType('AllStripePaymentsTable')}>
                Stripe
            </button><br/><br/>
            <SearchBar onSearchChange={handleSearchChange} />
        </div>
        
            {loading ? <Spinner /> : showType === 'AllCardPaymentsTable' ? (<AllCardPaymentsTable cardpayments={filteredPayments} />) :
            showType === 'AllCashPaymentsTable' ? (<AllCashPaymentsTable cashpayments={cashpayments} />) :
            showType === 'AllRefundRequestsTable' ? (<AllRefundRequestsTable refundrequests={refundrequests} />) :
            showType === 'AllStripePaymentsTable' ? (<AllStripePaymentsTable stripepayments={stripepayments} />) :
            null
        }
        
        </div>
    )
}

export default Payments_AdminView