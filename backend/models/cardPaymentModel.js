import mongoose from 'mongoose';

const cardPaymentSchema = mongoose.Schema (
    {
        // PaymentID : {
        //     type : String,
        //     required: true
        // },

        // NIC : {
        //     type : String,
        //     required: true
        // },

        CardHolderName : {
            type : String,
            required: true
        },

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

export const CardPayment = mongoose.model('CardPayment', cardPaymentSchema);
