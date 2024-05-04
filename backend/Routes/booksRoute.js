
import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
  // console.log(request.body)
  try {
    // if (
  // !request.body.customerName ||
  // !request.body.idNumber ||
  // !request.body.Address||
  // !request.body.mobileNumber ||
  // !request.body.email ||
  // !request.body.pickupDate||
  // !request.body.pickupTime ||
  // !request.body.dropoffDate ||
  // !request.body.dropoffTime
    // ) {
      // console.log("error here")
      // return response.status(400).send({
        // message: 'Error',
      // });
    // }
    const newBook = {
      customerName: request.body.customerName,
      idNumber: request.body.idNumber,
      Address: request.body.address,
      mobileNumber: request.body.mobileNumber,
      email: request.body.email,
      PickupDate: request.body.pickupDate,
      PickupTime: request.body.pickupTime,
      DropoffDate: request.body.dropoffDate,
      DropoffTime: request.body.dropoffTime,
    };
    console.log(newBook)
    const book = await Book.create(newBook);
    console.log(book)
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.customerName ||
  !request.body.idNumber ||
  !request.body.Address||
  !request.body.mobileNumber ||
  !request.body.email ||
  !request.body.PickupDate||
  !request.body.PickupTime ||
  !request.body.DropoffDate ||
  !request.body.DropoffTime
    ) {
      return response.status(400).send({
        message: 'Error',
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Booking not found' });
    }

    return response.status(200).send({ message: 'Booking updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Booking not found' });
    }

    return response.status(200).send({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;