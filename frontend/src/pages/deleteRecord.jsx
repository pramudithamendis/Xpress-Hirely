import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const deleteRecord = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteRecord = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/records/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Record Deleted Successfully!", { variant: "success" });
        navigate("/recordHome");
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happend. Please check console');
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Record</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto bg-white bg-opacity-70 rounded-lg">
        <h3 className="text-2xl">
          Are you Sure You want to Delete this Record?
        </h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteRecord}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default deleteRecord;
