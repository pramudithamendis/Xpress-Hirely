import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../../../../sahan/frontend/src/components/BackButton";
import Spinner from "../../../../sahan/frontend/src/components/Spinner";
import axios from "axios";

const CreateBook = () => {
  const [customerName, setCustomerName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      customerName,
      idNumber,
      address,
      mobileNumber,
      email,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
    };

    setLoading(true);

    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book created successfully", { variant: "success" });
        navigate("/method");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Errorr", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-center font-bold text-black-800 animate-pulse">
        Make Your Booking
      </h1>

      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-orange-400 rounded-xl w-full max-w-[600px] p-10 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-balck-500">Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black-500">ID Number</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black-500">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black-500">Mobile Number</label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black-500">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black-500">Pickup Date</label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black-500">Pickup Time</label>
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black-500">Dropoff Date</label>
          <input
            type="date"
            value={dropoffDate}
            onChange={(e) => setDropoffDate(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-blacks-500">Dropoff Time</label>
          <input
            type="time"
            value={dropoffTime}
            onChange={(e) => setDropoffTime(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black-500 font-bold">
            Total:
          </label>
        </div>

        <button
          className="px-4 py-2 bg-orange-600 rounded-lg text-white font-bold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-none m-8 animate-pulse"
          onClick={handleSaveBook}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
