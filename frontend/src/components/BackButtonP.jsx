import React from "react";
import { Link } from "react-router-dom";

const BackButtonP = () => {
  return (
    <div>
      <Link to={`/chat/chats`}>My Chats</Link>
    </div>
  );
};

export default BackButtonP;
