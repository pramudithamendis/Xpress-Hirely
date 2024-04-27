import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import chatRoutes from './Routes/chatRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import vehicleRoutes from './Routes/vehicleRoutes.js'
import adminRoutes from './Routes/adminRoutes.js'
import rentHisRoute from './routes/rentHisRoute.js';
import cardPaymentsRoute from './routes/cardPaymentsRoute.js';
import cashPaymentsRoute from './routes/cashPaymentsRoute.js';
import paymentMethodRoute from './routes/paymentMethodRoute.js';
import refundRequestsRoute from './routes/refundRequestsRoute.js';
import stripePaymentsRoute from './routes/stripePaymentsRoute.js';
import sgMail from '@sendgrid/mail';
import fs from 'fs';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request,response)=>{
    console.log(request);
    return response.status(234).send('Welcome');
})
//Customer support - Pramuditha
app.use('/chat', chatRoutes);
app.use('/user', userRoutes)
app.use('/vehicle', vehicleRoutes);
app.use('/admin', adminRoutes);
//Rental History-vihara
app.use('/rents', rentHisRoute);
//Payment management - Piyara
app.use('/cardpayments',cardPaymentsRoute);
app.use('/cashpayments',cashPaymentsRoute);
app.use('/savepaymentmethod',paymentMethodRoute);
app.use('/refundrequests',refundRequestsRoute);
app.use('/stripepayments',stripePaymentsRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('DB connected');
        app.listen(PORT, ()=>{
            console.log(`App is listening to port ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    })