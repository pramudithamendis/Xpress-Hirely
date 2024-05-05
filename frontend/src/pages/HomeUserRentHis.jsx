import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import RentsUserTable from "../components/home/RentsUserTable";
import RentsCard from "../components/home/RentsCard";
import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router-dom";
import bgRentHis from "../images/bgRentHis.jpg";

const HomeUserRentHisPage = () => {
  const [rents, setRentHis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  //for the search function
  const [searchInput, setSearchInput] = useState("");
  const [filteredRents, setFilteredRents] = useState([]);
  const location = useLocation();
  const newRentData = location.state?.newRentData; // Access the data

  const handleSearchChange = (newSearchTerm) => {
    setSearchInput(newSearchTerm);
  };
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
  useEffect(() => {
    // Filter data every time rents or the searchInput changes
    const filteredData = rents.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.vehicle.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.rentDate.toString().includes(searchInput) || // Assuming rentDate is a Date object
        item.mileage?.toString().includes(searchInput) || // Handle optional mileage field
        item.amount.toString().includes(searchInput)
      );
    });
    setFilteredRents(filteredData);
  }, [rents, searchInput]);

  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgRentHis})`,
      }}
    >
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
          <h1 className="text-3xl my-8">Rents List</h1>{" "}
          {/* Title on the left */}
          <div className="flex items-center">
            {" "}
            {/* Wrapper for search bar and add icon */}
            <SearchBar onSearchChange={handleSearchChange} /> {/* Search bar */}
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <RentsUserTable rents={filteredRents} />
        ) : (
          <RentsCard rents={filteredRents} />
        )}
      </div>
    </div>
  );
};

export default HomeUserRentHisPage;
