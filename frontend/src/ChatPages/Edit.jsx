import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Edit.css";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import BackButtonP from "../components/BackButtonP";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [vehicle, setV] = useState("VAn");
  const [issue, setI] = useState("Good");
  const [loading, setL] = useState(false);
  const [s, setS] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    setL(true);
    axios
      .get(`http://localhost:5555/chat/getchat/${id}`)
      .then((response) => {
        console.log(response);
        setL(false);
        setTitle(response.data.title);
        setV(response.data.vehicle);
        setI(response.data.issue);
      })
      .catch((error) => {
        console.log(error);
        setL(false);
      });
  }, []);

  const EditF = () => {
    const data = {
      title,
      vehicle,
      issue,
    };
    setL(true);
    axios
      .put(`http://localhost:5555/chat/edit/${id}`, data)
      .then((response) => {
        console.log(response);
        navigate("/chat/chats");
      })
      .catch((error) => {
        setL(false);
      });
  };

  return (
    <div className="Edit_parent">
      <div className="Edit_parent_leftpanel phonescreen">
        <BackButtonP />
      </div>
      <div className="Edit_parent_middlepanel">
        Issue title
        <input
          className="Edit_parent_middlepanel_title"
          type="text"
          placeholder="Title of the issue"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        Vehicle number
        <input
          className="Edit_parent_middlepanel_vehicle"
          type="text"
          placeholder="Vehicle number"
          value={vehicle}
          onChange={(e) => {
            setV(e.target.value);
          }}
          disabled
        />
        Issue detail
        <input
          className="Edit_parent_middlepanel_issue"
          type="text"
          placeholder="Type your issue here"
          value={issue}
          onChange={(e) => {
            setI(e.target.value);
          }}
        />
        <button className="Edit_parent_middlepanel_button" onClick={EditF}>
          Edit
        </button>
        <div className="Edit_parent_middlepanel_operations">
          <Link className="delete" to={`/chat/delete/${id}`}>
            <MdOutlineDelete className="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Edit;
