// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Routes
router.get('/', carController.getCars);
router.post('/', carController.createCar);
router.get('/:id', carController.getCarById);
router.patch('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);
router.get('/pending', carController.getPendingRequests);
router.patch('/request/:id', carController.updateRequestStatus);
router.delete('/request/:id', carController.deleteRequest);

// module.exports = router;

export default router;
