import React, { useState, useEffect } from "react";
import BackButtonV from "../components/BackButtonV";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateRentHisPage = () => {
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [rentDate, setRentDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [mileage, setMileage] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({}); // State for error messages

  useEffect(() => {
    // Whenever dates change, re-validate
    validateDates();
  }, [rentDate, returnDate]);

  const handleSaveRent = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      // Send data to backend (including validated dates)
      const data = {
        name,
        vehicle,
        rentDate,
        returnDate,
        mileage,
        amount,
      };
      setLoading(true);
      axios
        .post("http://localhost:5555/rents", data)
        .then(() => {
          setLoading(false);
          enqueueSnackbar("Rent Added successfully", { variant: "success" });
          navigate("/rentHome");
        })
        .catch((error) => {
          setLoading(false);
          // alert('An error happened. Please Chack console');
          enqueueSnackbar("Error", { variant: "error" });
          console.log(error);
        });
    } else {
      alert("Return date must be after rent date");
    }
  };
  const validateDates = () => {
    const newErrors = {};
    if (!rentDate) {
      newErrors.rentDate = "Please select a rent date";
    }
    if (!returnDate) {
      newErrors.returnDate = "Please select a return date";
    } else if (new Date(rentDate) >= new Date(returnDate)) {
      newErrors.returnDate = "Return date must be after rent date";
    }

    setErrors(newErrors);
  };

  return (
    <div className="px-20 p-8">
      <BackButtonV />
      <h1 className="text-3xl my-4">Create Rent</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto bg-white bg-opacity-60 rounded-lg shadow-lg">
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Vehicle Model</label>
          <input
            type="text"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Rent Date</label>
          <input
            type="date"
            value={rentDate}
            onChange={(e) => setRentDate(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
          {errors.rentDate && (
            <p className="error-message">{errors.rentDate}</p>
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Return Date</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Mileage(km)</label>
          <input
            type="number"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Rental Charges(Rs)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>

        <button className="p-2 bg-orange-500 m-8" onClick={handleSaveRent}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateRentHisPage;
