import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { MdAccountCircle } from 'react-icons/md';
import { HiArchive } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';
import { FaMobile } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdOutlineStart } from "react-icons/md";
import { MdOutlineRestartAlt } from "react-icons/md";
import { IoTime } from "react-icons/io5";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border-2 border-gray-500 rounded-lg p-4 m-4 relative hover:shadow-xl'>
      <h2 className='absolute top-3 -left--1 px-3 py-1 bg-orange-500 text-white font-semibold rounded-md'>

        {book.customerName}
      </h2>
      <br />
      <br />
      
      <div className='flex justify-start items-center gap-x-2'>
      <MdAccountCircle className='text-black-300 text-2xl' />

        <h2 className='my-1'>{book.customerName}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <HiArchive className='text-black-300 text-2xl' />
        <h2 className='my-1'>{book.idNumber}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <IoLocation  className='text-black-300 text-2xl' />
        <h2 className='my-1'>{book.Address}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <FaMobile  className='text-black-300 text-2xl' />
        <h2 className='my-1'>{book.mobileNumber}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <HiOutlineMail className='text-black-300 text-2xl' />
        <h2 className='my-1'>{book.email}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <MdOutlineStart  className='text-black-300 text-2xl' />
        <h2 className='my-1'>{book.PickupDate}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <IoTime  className='text-black-300 text-2xl' />
        <h2 className='my-1'>{book.PickupTime}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <MdOutlineRestartAlt  className='text-black-300 text-2xl' />
        <h2 className='my-1'>{book.DropoffDate}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <IoTime  className='text-black-300 text-2xl' />
        <h2 className='my-1'>{book.DropoffTime}</h2>
      </div>
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow
          className='text-3xl text-orange-600 hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className='text-2xl text-orange-600 hover:text-black' />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className='text-2xl text-orange-600 hover:text-black' />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className='text-2xl text-orange-600 hover:text-black' />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
