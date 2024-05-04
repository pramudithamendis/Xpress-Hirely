import React, { useState } from "react";
import BackButtonV from "../components/BackButtonV";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import bgRentHis from "../images/bgRentHis.jpg";

const DeleteRentHisPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteRent = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/rents/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Rent Deleted successfully", { variant: "success" });
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
      <div className="px-20 py-4">
        <BackButtonV />
        <h1 className="text-3xl my-4">Delete Rent</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto bg-white bg-opacity-60">
          <h3 className="text-2xl">
            Are You Sure You want to delete this rent?
          </h3>

          <button
            className="p-4 bg-red-600 text-white m-8 w-full"
            onClick={handleDeleteRent}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRentHisPage;
