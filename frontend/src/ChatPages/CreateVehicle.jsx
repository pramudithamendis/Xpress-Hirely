import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import BackButtonP from "../components/BackButtonP";
import { useLocation } from "react-router-dom";

const CreateVehicle = () => {
  const [vehiclenumber, setvehiclenumber] = useState("");
  const [vehiclename, setvehiclename] = useState("");

  const [loading, setL] = useState(false);
  const navigate = useNavigate();

  const [user, setU] = useState(localStorage.getItem("user"));

  const CreateF = () => {
    const data = {
      vehiclenumber,
      vehiclename,
    };
    setL(true);
    axios
      .post("http://localhost:5555/vehicle/create", data)
      .then((response) => {
        console.log(response);
        navigate("/vehicle/vehiclecreate");
      })
      .catch((error) => {
        setL(false);
      });
  };

  return (
    <div className="Create_parent">
      {/* <div className='Create_parent_leftpanel phonescreen'><BackButton /></div> */}
      <div className="Create_parent_middlepanel">
        <div>{user}</div>
        <input
          className="Create_parent_middlepanel_title"
          type="text"
          placeholder="vehicle number"
          value={vehiclenumber}
          onChange={(e) => {
            setvehiclenumber(e.target.value);
          }}
        />
        <input
          className="Create_parent_middlepanel_vehicle"
          type="text"
          placeholder="vehiclename"
          value={vehiclename}
          onChange={(e) => {
            setvehiclename(e.target.value);
          }}
        />

        <button className="Create_parent_middlepanel_button" onClick={CreateF}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateVehicle;
