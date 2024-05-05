import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import RentSingleCard from "./RentSingleCard";

const RentsCard = ({ rents }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-white rounded-lg shadow-lg">
      {rents.map((item) => (
        <RentSingleCard key={item._id} rent={item} />
      ))}
    </div>
  );
};

export default RentsCard;
