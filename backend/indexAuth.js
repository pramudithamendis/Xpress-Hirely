const mongoDBURL=
'mongodb+srv://liquinzeng:Periwinkle22246714@cluster0.sla6vhg.mongodb.net/user-auth?retryWrites=true&w=majority&appName=Cluster0'

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoute')
const app = express();

//1)MIDDLEWARES
app.use(cors());
app.use(express.json());


//2)ROUTE
app.use('/api/auth', authRouter)

//3)MONGO DB CONNECTION
mongoose
.connect(mongoDBURL)
.then(()=> console.log('Connected to MongoDB!'))
.catch((error)=>console.error('Failed to connect MongoDB:', error))

//4)GLOBAL ERROR HANDLER
app.use((err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

//5)SERVER
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`App is listening to port: ${PORT}`);
});