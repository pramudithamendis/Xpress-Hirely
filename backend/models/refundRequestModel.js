import mongoose from 'mongoose';

const refundRequestSchema = mongoose.Schema (
    {
        BookingID : {
            type : String,
            required: true
        },

        PaymentID : {
            type : String,
            required: true
        },

        Email : {
            type : String,
            required: true
        },
    
        Reason_for_Request  : {
            type : String,
            required: true
        },

        Date : {
            type : Date,
            required: true
        },

        Status : {
            type : String,
            required: true
        },
    },
    {
        timestamps: true,
    }

);

export const RefundRequest = mongoose.model('RefundRequest', refundRequestSchema);
