
import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true 
    },
    idNumber: {
      type: String,
      required: true 
    },
    Address: {
      type: String,
      required: true 
    },
    mobileNumber: {
      type: Number,
      required: true 
    },
    email: {
      type: String,
      required: true 
    },
    PickupDate: {
      type: String,
    },
    PickupTime: {
      type: String,
    },
    DropoffDate: {
      type: String,
      required: true,
    },
    DropoffTime: {
      type: String,
      required: true,
    }
    
  }
);

export const Book = mongoose.model('Book', bookSchema);
