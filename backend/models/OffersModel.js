import mongoose from 'mongoose';

const offerSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: { 
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

export const offers = mongoose.model('Offers', offerSchema);