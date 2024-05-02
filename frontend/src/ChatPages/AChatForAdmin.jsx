import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import "./AChatForAdmin.css";

import BackButtonP from "../components/BackButtonP";

const AChatForAdmin = () => {
  const [loading, setL] = useState(false);
  const [s, setS] = useState({});
  const [r, setR] = useState({});
  const { id } = useParams();
  const [replyloading, setReply] = useState(true);
  useEffect(() => {
    setL(true);
    axios
      .get(`http://localhost:5555/chat/getchat/${id}/reply`)
      .then((response) => {
        // console.log(response);
        setR(response.data);
        setL(false);
        // setReply(false)
        setReply(false);
      })
      .catch((error) => {
        console.log(error);
        setL(false);
        setReply(true);
      });
  }, []);

  useEffect(() => {
    setL(true);
    axios
      .get(`http://localhost:5555/chat/getchat/${id}`)
      .then((response) => {
        console.log(response);
        setS(response.data);
        setL(false);
      })
      .catch((error) => {
        console.log(error);
        setL(false);
      });
  }, []);
  return (
    <div className="AChat_parent">
      <div className="AChat_leftpanel phonescreen">
        <Link to={`/chat/chats/admin`}>Chats</Link>
      </div>

      <div className="AChat_parent_rightpanel">
        <div className="AChat_parent_rightpanel_replybutton">
          <Link to={`/chat/create/admin/${s._id}`}>Reply</Link>
        </div>
      </div>
      <div className="AChat_parent_middlepanel">
        <div className="AChat_parent_middlepanel_title text-black	">
          Title: {s.title}
        </div>
        <hr className="AChat_parent_middlepanel_title_hr" />
        <div className="AChat_parent_middlepanel_vehicle text-black	">
          Vehicle type: {s.vehicle}
        </div>
        <hr className="AChat_parent_middlepanel_vehicle_hr" />
        <div className="AChat_parent_middlepanel_issue text-black	">
          Issue: {s.issue}
        </div>
        <div className="AChat_parent_middlepanel_operations text-black	"></div>
      </div>
      {/* <div className='rightpanel phonescreen'>Side</div> */}

      {replyloading ? (
        <Spinner />
      ) : (
        <div>
          {/* {r.length} */}
          <div className="AChat_reply_Admin">
            {r.map(function (r, i) {
              return <div className="AChat_reply_Admin_each">{r.title}</div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AChatForAdmin;
