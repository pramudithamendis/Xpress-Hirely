import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import jsPDF from "jspdf";

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
  const handleGenerateReport = (rent) => {
    const doc = new jsPDF();

    // Report Header
    doc.setFontSize(18);
    doc.text(`Rent Details for ID: ${rent._id}`, 20, 20);

    // Rent Data
    let currentY = 35; // Start below the header
    doc.setFontSize(12);

    doc.text(`Name: ${rent.name}`, 20, currentY);
    currentY += 8;
    doc.text(`Vehicle Model: ${rent.vehicle}`, 20, currentY);
    currentY += 8;
    doc.text(`Rent Date: ${rent.rentDate}`, 20, currentY);
    currentY += 8;
    doc.text(`Rent Date: ${rent.renturnDate}`, 20, currentY);
    currentY += 8;
    doc.text(`Rent Date: ${rent.mileage}`, 20, currentY);
    currentY += 8;
    doc.text(`Rent Amount: ${rent.amount}`, 20, currentY);
    currentY += 8;
    doc.text(`Create Time: ${rent.createdAt}`, 20, currentY);
    currentY += 8;
    doc.text(`Last Update Time: ${rent.updatedAt}`, 20, currentY);

    // Footer
    doc.setFontSize(10);
    doc.text(
      `Report generated on: ${new Date().toLocaleString()}`,
      20,
      doc.internal.pageSize.height - 15
    );

    doc.save(`rent_report_${rent._id}.pdf`);
  };

  return (
    <div className="px-20 py-8">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-4">Show Rent</h1>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => handleGenerateReport(rent)}
        >
          Generate Report
        </button>
      </div>

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
