import mongoose from 'mongoose';

const feedbackSchema = mongoose.Schema({


    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    details: {
        type: String,
        required: true
    },

}, {
    timestamps: true,
});

export const feedbacks = mongoose.model('Feedbacks', feedbackSchema);
