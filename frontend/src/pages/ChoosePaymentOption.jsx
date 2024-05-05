import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import clientbg from '../images/clientbg.jpeg';

import pay_card from '../images/pay_card.jpg';
import pay_cash from '../images/pay_cash.jpg';
import pay_stripe from '../images/pay_stripe.png';

const ChoosePaymentOption = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const paymentOption = document.querySelector('input[name="payment"]:checked').value;
      
        switch (paymentOption) {
          case 'cash':
            window.location.href = '/cashpayments/user/create';
            break;
          case 'card':
            window.location.href = '/cardpayments/user/create';
            break;
          case 'stripe':
            window.location.href = '/stripepayments/user/create';
            break;
          default:
            break;
        }
      };

    return (
     
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{backgroundImage: `url(${clientbg})`}}>

            <div className='bg-gray-300 rounded-lg bg-opacity-88 p-4'>
                <h1 className='font-bold'>Available payment methods</h1><br/>

                {/* <hr className='w-200px mx-auto border-t-2 border-gray-300 my-4'/> */}

                <div className="flex">
        <div className="bg-white text-black border border-orange-500 px-4 py-2 rounded w-[200px] h-[150px]">
        <img src={pay_card} className="w-[40px] h-[40px]" />
        <p className="mt-2"><b>Pay with card</b><br/>
        Enter your card details to submit a payment.</p></div>&ensp;&ensp;

      <div className="bg-white text-black border border-orange-500 px-4 py-2 rounded w-[200px] h-[150px]">
        <img src={pay_cash} className="w-[40px] h-[40px]" />
        <p className="mt-2"><b>Pay with cash</b><br/>
       Make a deposit to our account.</p></div>&ensp;&ensp;

      <div className="bg-white text-black border border-orange-500 px-4 py-2 rounded w-[200px] h-[150px]">
        <img src={pay_stripe} className="w-[40px] h-[40px]" />
        <p className="mt-2"><b>Pay via stripe</b><br/>
        Make a secure payment via stripe.</p></div><br/>&ensp;&ensp;

        </div>
        <br/>
                <h1 className='font-bold'>Select the method you prefer.</h1><br/>
                
                {/* <hr class="w-200px mx-auto border-t-2 border-gray-300 my-4"/> */}

      <form onSubmit={handleSubmit} className="w-full flex ">
        <label className="inline-flex items-center mr-4">
          <input type="radio" className="form-radio" name="payment" value="cash" />
          <span className="ml-2">Cash</span>
        </label>

        <label className="inline-flex items-center mr-4">
          <input type="radio" className="form-radio" name="payment" value="card" />
          <span className="ml-2">Card</span>
        </label>

        <label className="inline-flex items-center mr-4">
          <input type="radio" className="form-radio" name="payment" value="stripe" />
          <span className="ml-2">Pay via Stripe</span>
        </label>
        <br/>

        <button type="submit" className="bg-orange-500 hover:bg-orange-600 w-[80px] text-black border border-black hover:border-black px-4 py-2 rounded-full ">Next</button><br/><br/>
      </form>
    </div>  
            
    </div>
    )
}

export default ChoosePaymentOption