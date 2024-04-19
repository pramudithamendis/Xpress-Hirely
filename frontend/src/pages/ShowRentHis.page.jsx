import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowRentHisPage = () => {
  const [rent, setRentHis] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/rents/${id}`)
      .then((response) => {
        setRentHis(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="px-20 py-8">
      <BackButton />
      <h1 className="text-3xl my-4">Show Rent</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 bg-white">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">No</span>
            <span>{rent._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Name</span>
            <span>{rent.name}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Vehicle Model</span>
            <span>{rent.vehicle}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Rent Date</span>
            <span>{rent.rentDate}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Return Date</span>
            <span>{rent.returnDate}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Mileage </span>
            <span>{rent.mileage} km</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Rental Charges</span>
            <span>Rs {rent.amount}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(rent.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(rent.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowRentHisPage;
