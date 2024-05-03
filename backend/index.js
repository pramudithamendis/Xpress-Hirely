
import express from "express";
import mongoose from "mongoose";

import cardPaymentsRoute from './routes/cardPaymentsRoute.js';
import cashPaymentsRoute from './routes/cashPaymentsRoute.js';
import paymentMethodRoute from './routes/paymentMethodRoute.js';
import refundRequestsRoute from './routes/refundRequestsRoute.js';
import stripePaymentsRoute from './routes/stripePaymentsRoute.js';
import sgMail from '@sendgrid/mail';
import fs from 'fs';


import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { PORT, mongoDBURL } from './config.js';
import chatRoutes from './routes/chatRoutes.js';
import userRoutes from './routes/userRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import rentHisRoute from './routes/rentHisRoute.js';
import authRouter from './routes/authRoute.js';
import LicenseRepository from './controllers/LicenseRepository.js';
import InsuranceRepository from './controllers/InsuranceRepository.js';

import recordsRoute from './routes/recordsRoute.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Adjust according to your front-end origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
app.use('/uploads', express.static('uploads'));

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Routes
app.get('/', (req, res) => res.status(200).send('Welcome'));
app.use('/chat', chatRoutes);
app.use('/user', userRoutes);
app.use('/vehicle', vehicleRoutes);
app.use('/admin', adminRoutes);
app.use('/rents', rentHisRoute);
// <<<<<<< piyaraCRUD
//Payment management - Piyara
app.use('/cardpayments',cardPaymentsRoute);
app.use('/cashpayments',cashPaymentsRoute);
app.use('/savepaymentmethod',paymentMethodRoute);
app.use('/refundrequests',refundRequestsRoute);
app.use('/stripepayments',stripePaymentsRoute);
// =======
app.use('/api/auth', authRouter);

//Vehicle Maintenance - sachith
app.use('/records', recordsRoute);


// MongoDB connection
mongoose.connect(mongoDBURL || process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT || process.env.PORT, () => {
        console.log(`Server running on port ${PORT || process.env.PORT}`);
    });
})
.catch(err => console.log('MongoDB connection error:', err));

// Scheduled tasks
cron.schedule('0 7 * * *', async () => {
    console.log('Running daily tasks at 7:00 AM...');
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Handle license expirations
    const licenses = await LicenseRepository.getAllLicenses();
    licenses.forEach(async (license) => {
        const endDate = new Date(license.endDate);
        endDate.setHours(0, 0, 0, 0);
        if (Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24)) <= 7) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: license.email,
                subject: 'License Expiry Reminder',
                text: `Hello, your license will expire on ${endDate.toDateString()}. Please renew it promptly.`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error while sending mail:', error);
                } else {
                    console.log('Mail sent:', info.response);
                }
            });
        }
    });

    // Handle insurance expirations
    const insurances = await InsuranceRepository.getAllInsurances();
    insurances.forEach(async (insurance) => {
        const endDate = new Date(insurance.endDate);
        endDate.setHours(0, 0, 0, 0);
        if (Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24)) <= 7) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: insurance.email,
                subject: 'Insurance Expiry Reminder',
                text: `Hello, your insurance will expire on ${endDate.toDateString()}. Please renew it promptly.`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error while sending mail:', error);
                } else {
                    console.log('Mail sent:', info.response);
                }
            });
        }
    });
});


// License API routes
app.post('/licenses', upload.single('uploadLicense'), async (req, res) => {
    try {
        const newLicense = await LicenseRepository.addLicense({
            vehicleNo: req.body.vehicleNo,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            uploadLicense: req.file ? req.file.path : null,
            email: req.body.email,
            notes: req.body.notes
        });
        res.status(201).send(newLicense);
    } catch (error) {
        console.error('Error when adding insurance:', error);
        res.status(500).send({ message: 'Failed to add insurance', error: error.message || error });
    }
});

app.get('/licenses', async (req, res) => {
    try {
        const licenses = await LicenseRepository.getAllLicenses();
        res.send(licenses);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch licenses', error });
        res.status(500).send({ message: 'Failed to add insurance', error: error.message || error });
    }
});

app.put('/licenses/:id', async (req, res) => {
    try {
        const updatedLicense = await LicenseRepository.updateLicense(req.params.id, req.body);
        res.send(updatedLicense);
    } catch (error) {
        res.status(500).send({ message: 'Failed to update license', error });
        res.status(500).send({ message: 'Failed to add insurance', error: error.message || error });
    }
});

app.delete('/licenses/:id', async (req, res) => {
    try {
        const deletedLicense = await LicenseRepository.deleteLicense(req.params.id);
        res.send(deletedLicense);
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete license', error });
        res.status(500).send({ message: 'Failed to add insurance', error: error.message || error });
    }
});
//>>>>>>> development-main

// Insurance API routes (similar structure to the license routes)
app.post('/insurances', upload.single('uploadInsurance'), async (req, res) => {
    try {
        const newInsurance = await InsuranceRepository.addInsurance({
            // include all required fields
            insuranceNumber: req.body.insuranceNumber,
            vehicleNo: req.body.vehiclenumber,
            insuranceProvider: req.body.insuranceProvider,
            policyNumber: req.body.policyNumber,
            policyType: req.body.policyType,
            coverageDetails: req.body.coverageDetails,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            premiumAmount: req.body.premiumAmount,
            contactInformation: req.body.contactInformation,
            uploadInsurance: req.file ? req.file.path : null, // Assuming file is optional
            email: req.body.email,
        });
        res.status(201).send(newInsurance);
    } catch (error) {
        console.error('Error when adding insurance:', error);
        res.status(500).send({ message: 'Failed to add insurance', error: error.message || error });
    }
});

app.get('/insurances', async (req, res) => {
    try {
        const insurances = await InsuranceRepository.getAllInsurances();
        res.send(insurances);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch insurances', error });
        res.status(500).send({ message: 'Failed to add insurance', error: error.message || error });
    }
});

app.put('/insurances/:id', async (req, res) => {
    try {
        const updatedInsurance = await InsuranceRepository.updateInsurance(req.params.id, req.body);
        res.send(updatedInsurance);
    } catch (error) {
        res.status(500).send({ message: 'Failed to update insurance', error });
        res.status(500).send({ message: 'Failed to add insurance', error: error.message || error });
    }
});

app.delete('/insurances/:id', async (req, res) => {
    try {
        const deletedInsurance = await InsuranceRepository.deleteInsurance(req.params.id);
        res.send(deletedInsurance);
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete insurance', error });
        res.status(500).send({ message: 'Failed to add insurance', error: error.message || error });
    }
});
