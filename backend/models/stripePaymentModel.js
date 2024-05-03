import mongoose from 'mongoose';

const stripePaymentSchema = mongoose.Schema (
    {
        // PaymentID : {
        //     type : String,
        //     required: true
        // },

        CardNumber : {
            type : String,
            required: true
        },

        CVV : {
            type : String,
            required: true
        },

        DateOfExpiry : {
            type : Date,
            required: true
        },

        Amount : {
            type : Number,
            required: true
        },
    },
    {
        timestamps: true,
    }

);

export const StripePayment = mongoose.model('StripePayment', stripePaymentSchema);
