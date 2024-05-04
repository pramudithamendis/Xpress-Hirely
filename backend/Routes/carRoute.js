// routes/carRoutes.js
// const express = require('express');
import express from 'express'
// const router = express.Router();
// const carController = require('../controllers/carController');
import {getCars,
    createCar,
    getCarById,
    updateCar,
    deleteCar,
    getPendingRequests,
    updateRequestStatus,
    deleteRequest} from '../controllers/carController.js'

    const router = express.Router();
// Routes
router.get('/', getCars);
router.post('/', createCar);
router.get('/:id', getCarById);
router.patch('/:id', updateCar);
router.delete('/:id', deleteCar);
router.get('/pending', getPendingRequests);
router.patch('/request/:id', updateRequestStatus);
router.delete('/request/:id', deleteRequest);

// module.exports = router;
export default router;
