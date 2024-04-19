import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const RentsTable = ({ rents }) => {
  return (
    <table className="w-full border-separate border-spacing-2 bg-white rounded-lg shadow-lg">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Name</th>
          <th className="border border-slate-600 rounded-md">Vehicle</th>
          <th className="border border-slate-600 rounded-md">Rent Date</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Return Date
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Mileage
          </th>
          <th className="border border-slate-600 rounded-md">Rental Charges</th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {rents.map((rent, index) => (
          <tr key={rent._id} className="h-8">
            <td className="border border-slate-700 rounded-md  text-center">
              {index + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {rent.name}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {rent.vehicle}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {rent.rentDate}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {rent.returnDate}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {rent.mileage} km
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              Rs. {rent.amount}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/rents/detailsHis/${rent._id}`}>
                  <BsInfoCircle className="text-2xl text-green-800" />
                </Link>
                <Link to={`/rents/editHis/${rent._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>
                <Link to={`/rents/deleteHis/${rent._id}`}>
                  <MdOutlineDelete className="text-2xl text-red-600" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RentsTable;
