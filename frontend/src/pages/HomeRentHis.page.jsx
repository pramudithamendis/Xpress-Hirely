import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import RentsTable from "../components/home/RentsTable";
import RentsCard from "../components/home/RentsCard";

const HomeRentHisPage = () => {
  const [rents, setRentHis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/rents")
      .then((response) => {
        setRentHis(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="px-40 py-16">
      <div className="flex justify-center mt-4">
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg w-fit mr-4"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg w-fit mr-4"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Rents List</h1>
        <Link to="/rents/createHis">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <RentsTable rents={rents} />
      ) : (
        <RentsCard rents={rents} />
      )}
    </div>
  );
};

export default HomeRentHisPage;
