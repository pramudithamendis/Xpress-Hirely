import React, { useState, useEffect } from "react";
import BackButtonV from "../components/BackButtonV";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import bgRentHis from "../images/bgRentHis.jpg";

const EditRentHisPage = () => {
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [rentDate, setRentDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [mileage, setMileage] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/rents/${id}`)
      .then((response) => {
        setName(response.data.name);
        setVehicle(response.data.vehicle);
        setRentDate(response.data.rentDate);
        setReturnDate(response.data.returnDate);
        setMileage(response.data.mileage);
        setAmount(response.data.amount);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  }, []);

  const handleEditRent = () => {
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
      .put(`http://localhost:5555/rents/${id}`, data)
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
  };
  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgRentHis})`,
      }}
    >
      <div className="px-20 py-8">
        <BackButtonV />
        <h1 className="text-3xl my-4">Edit Rent</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto bg-white bg-opacity-60">
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
            <label className="text-xl mr-4 text-black">
              Rental Charges(Rs)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2  w-full "
            />
          </div>

          <button
            className="p-2 bg-orange-500 m-8 rounded"
            onClick={handleEditRent}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRentHisPage;
