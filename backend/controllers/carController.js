// controllers/carController.js
// const Car = require("../models/Car");
import {Car} from '../models/Car.js'
import nodemailer from "nodemailer";
// const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "prashandev77@gmail.com", // Your Gmail email address
    pass: "bbuf vsxh scfa eklq", // Your Gmail password or an app-specific password if you have 2-step verification enabled
  },
});

// Get all cars
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all pending requests
export const getPendingRequests = async (req, res) => {
  try {
    const pendingRequests = await Car.find({ status: "pending" });
    res.json(pendingRequests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCar = async (req, res) => {
  const {VIN} = req.body;

  console.log(req.body);
   // If the VIN and owner's email are unique, proceed with creating the car

   const {
    owner_Name,
    owner_ID,
    owner_Email,
    brand,
    type,
    model,
    year,
    features,
    fuel_consumption,
    color,
    company,
  } = req.body;

  try {
    // Check if a car with the same VIN already exists
    const existingCar = await Car.findOne({ VIN });

    if (existingCar) {
        return res.status(400).json({ message: 'A car with the provided VIN already exists.' });
    }

    // Check if the user already has a car with the same email
    const existingUserCar = await Car.findOne({ owner_ID });

    if (existingUserCar) {
        // If the user already has a car, return a greeting message
        return res.status(200).json({ message: 'Welcome back! You already have a car registered with us.' });
    }

   
    const fuelPricePerLiter = 150; // Example fuel price per liter
    let pricePerKilometer = (
      (100 / fuel_consumption) *
      fuelPricePerLiter
    ).toFixed(2); // Assuming 100 kilometers for simplicity
    pricePerKilometer = pricePerKilometer.toString();

    pricePerKilometer = pricePerKilometer.toString();

    const car = new Car({
      owner_Name,
      owner_Email,
      owner_ID,
      VIN,
      brand,
      type,
      model,
      year,
      features,
      fuel_consumption,
      color,
      company,
      price_per_km: pricePerKilometer, // Adding price per kilometer to the car object
    });

    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a specific car
export const getCarById = async (req, res) => {
  res.json(res.car);
};

export const updateCar = async (req, res) => {
  const { id } = req.params;
  const { VIN } = req.body;

  try {
    const existingCar = await Car.findOne({ VIN });

    if (existingCar && existingCar._id.toString() !== id) {
      return res
        .status(400)
        .json({ message: "A car with the provided VIN already exists." });
    }

    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    // Update car properties
    car.owner_Email = req.body.owner_Email || car.owner_Email;
    car.owner_ID = req.body.owner_ID || car.owner_ID;
    car.VIN = req.body.VIN || car.VIN;
    car.brand = req.body.brand || car.brand;
    car.type = req.body.type || car.type;
    car.model = req.body.model || car.model;
    car.year = req.body.year || car.year;
    car.features = req.body.features || car.features;
    car.fuel_consumption = req.body.fuel_consumption || car.fuel_consumption;
    car.color = req.body.color || car.color;
    car.company = req.body.company || car.company;

    if (req.body.fuel_consumption) {
      const fuelPricePerLiter = 150; // Example fuel price per liter
      const pricePerKilometer = (
        (100 / req.body.fuel_consumption) *
        fuelPricePerLiter
      ).toFixed(2);
      car.price_per_km = pricePerKilometer;
    }

    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a car
export const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { owner_Email, status } = req.body;

  try {
    const car = await Car.findById(id);
    if (owner_Email) car.owner_Email = owner_Email;
    if (status === "accepted") {
      // Send email to owner when status is updated to 'accepted'
      const mailOptions = {
        from: "prashandev77@gmail.com",
        to: car.owner_Email,
        subject: "Your request has been accepted",
        text: "Your request has been accepted. Thank you for using our service.",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }
    if (status) car.status = status;

    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a car
export const deleteRequest = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    const ownerEmail = deletedCar.owner_Email;

    // Send email to owner notifying the decline
    const mailOptions = {
      from: "prashandev77@gmail.com",
      to: ownerEmail,
      subject: "Your request has been declined",
      text: "Your request has been declined. We apologize for any inconvenience.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// module.exports = {
//   getCars,
//   createCar,
//   getCarById,
//   updateCar,
//   deleteCar,
//   getPendingRequests,
//   updateRequestStatus,
//   deleteRequest,
// };
