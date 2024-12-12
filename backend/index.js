import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import chatRoutes from './Routes/chatRoutes.js'
import vehicleRoutes from './Routes/vehicleRoutes.js'
import adminRoutes from './Routes/adminRoutes.js'
import cors from 'cors';
import authRouter from './Routes/authRoute.js'

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request,response)=>{
    console.log(request);
    return response.status(234).send('Welcome');
})

app.use('/chat', chatRoutes);
app.use('/vehicle', vehicleRoutes);
app.use('/admin', adminRoutes);

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

    //2)ROUTE
app.use('/api/auth', authRouter)

//4)GLOBAL ERROR HANDLER
app.use((err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});