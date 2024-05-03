import mongoose from 'mongoose';

const paymentMethodSchema = mongoose.Schema (
    {
        PaymentMethod : {
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

    },
    {
        timestamps: true,
    }

);

export const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);