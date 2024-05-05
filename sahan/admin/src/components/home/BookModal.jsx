import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { MdAccountCircle } from 'react-icons/md';

import { FaMobile } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdOutlineStart } from "react-icons/md";
import { MdOutlineRestartAlt } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[300px] max-w-full h-[320px] bg-white rounded-xl p-4 flex flex-col relative'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-orange-600 cursor-pointer'
          onClick={onClose}
        />
        <h2 className='w-fit px-4 py-1 bg-orange-300 rounded-lg'>
          {book.customerName}
        </h2>
        <br />
        <div className='flex justify-start items-center gap-x-2'>
          <MdAccountCircle className='text-black-300 text-2xl' />
          <h2 className='my-1'>{book.idNumber}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <IoLocation className='text-black-300 text-2xl' />
          <h2 className='my-1'>{book.Address}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <FaMobile className='text-black-300 text-2xl' />
          <h2 className='my-1'>{book.mobileNumber}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <HiOutlineMail className='text-black-300 text-2xl' />
          <h2 className='my-1'>{book.email}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <MdOutlineStart className='text-black-300 text-2xl' />
          <h2 className='my-1'>{book.pickupDate}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <IoTime className='text-black-300 text-2xl' />
          <h2 className='my-1'>{book.pickupTime}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <MdOutlineRestartAlt className='text-black-300 text-2xl' />
          <h2 className='my-1'>{book.dropoffDate}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <IoTime className='text-black-300 text-2xl' />
          <h2 className='my-1'>{book.dropoffTime}</h2>
        </div>
         <br />
        
      </div>
    </div>
  );
};

export default BookModal;
