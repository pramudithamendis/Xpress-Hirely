import mongoose from 'mongoose';

const cashPaymentSchema = mongoose.Schema (
    {
        // PaymentID : {
        //     type : String,
        //     required: true
        // },

        ReceiptNo : {
            type : String,
            required: true
        },

        PaymentDate : {
            type : Date,
            required: true
        },

        Amount : {
            type : Number,
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

export const CashPayment = mongoose.model('CashPayment', cashPaymentSchema);
