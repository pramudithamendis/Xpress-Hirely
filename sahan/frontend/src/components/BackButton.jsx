import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { IoArrowBackCircleSharp } from "react-icons/io5";

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination}
        className='rounded-lg w-fit'
      >
        <IoArrowBackCircleSharp  className='text-2xl' />
      </Link>
    </div>
  );
};

export default BackButton;
