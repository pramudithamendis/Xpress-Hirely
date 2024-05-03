import express from 'express';
import cors from 'cors';
import { RefundRequest } from '../models/refundRequestModel.js';
import sgMail from '@sendgrid/mail';
import fs from 'fs';
// import sendRefundEmail from '../index.js';

const router = express.Router();

//Route to save a new refund request - client view
router.post('/user', async (request, response) => {
    try {
        if (
            !request.body.BookingID ||
            !request.body.PaymentID ||
            !request.body.Email ||
            !request.body.Reason_for_Request ||
            !request.body.Date ||
            !request.body.Status
            ) {
                return response.status(400).send({
                    message: 'Send all fields',
                });
            }
            const newRefundRequest = {
                BookingID: request.body.BookingID,
                PaymentID: request.body.PaymentID,
                Email: request.body.Email,
                Reason_for_Request: request.body.Reason_for_Request,
                Date: new Date(),
                Status: 'Pending',
            };

            const refundrequest = await RefundRequest.create(newRefundRequest);
            return response.status(201).send(refundrequest);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
    
});

//Route to get all refund requests - admin view
router.get('/admin', async (request, response) => {
    try {
        const refund_requests = await RefundRequest.find({});

        return response.status(200).json({
            count: refund_requests.length,
            data: refund_requests
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to update refund request details - admin view
router.put('/admin/:id', async (request, response) => {
    try {
            const { Status } = request.body;

            if (!Status) {
                return response.status(400).send({
                  message: 'Send Status field',
                });
              }
          
              const { id } = request.params;
          
              const result = await RefundRequest.findByIdAndUpdate(id, { Status });
          
              if (!result) {
                return response.status(404).json({ message: 'Refund request not found' });
              }
          
              return response.status(200).send({ message: 'Refund request updated successfully' });
            } catch (error) {
              console.log(error.message);
              response.status(500).send({ message: error.message });
            }
    });

//Route to get one refund request by id - admin view
router.get('/admin/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const refundRequest = await RefundRequest.findById(id);

        return response.status(200).json(refundRequest);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;  

// Read refund template
// const refundTemplate = fs.readFileSync('D:/OTHER/sliit/Y2S2/ITP Project/Rent-A-Car_MERNSTACK/backend/templates/ReceivedRequest.html' , 'utf8');

// function handleRefundRequest(req, res) {

//     const recipientEmail = req.body.Email;
//     sendRefundEmail(recipientEmail, refundTemplate);
// }

// exports.handleRefundRequest = handleRefundRequest;
// export { handleRefundRequest };