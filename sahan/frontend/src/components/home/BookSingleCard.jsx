import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border border-gray-300 rounded-lg shadow-lg p-6 mx-4 my-6 relative hover:shadow-xl'>
  <h2 className='font-bold text-lg text-gray-800 mb-4'>
    Hello, {book.customerName}!
  </h2>
  <hr className="border-gray-400 mb-4"/>
  <div className='my-2'>
    <span className='text-gray-600'>Pickup Date:</span>
    <span className='ml-2'>{book.PickupDate}</span>
  </div>
  <div className='my-2'>
    <span className='text-gray-600'>Pickup Time:</span>
    <span className='ml-2'>{book.PickupTime}</span>
  </div>
  <div className='my-2'>
    <span className='text-gray-600'>DropOff Date:</span>
    <span className='ml-2'>{book.DropoffDate}</span>
  </div>
  <div className='my-2'>
    <span className='text-gray-600'>DropOff Time:</span>
    <span className='ml-2'>{book.DropoffTime}</span>
  </div>
  <div className='flex justify-between items-center mt-6'>
    <BiShow
      className='text-orange-600 hover:text-blue-600 cursor-pointer'
      onClick={() => setShowModal(true)}
    />
    <Link to={`/books/details/${book._id}`}>
      <BsInfoCircle className='text-orange-600 hover:text-green-600' />
    </Link>
    <Link to={`/books/edit/${book._id}`}>
      <AiOutlineEdit className='text-orange-600 hover:text-yellow-400' />
    </Link>
    <Link to={`/books/delete/${book._id}`}>
      <MdOutlineDelete className='text-orange-600 hover:text-red-400' />
    </Link>
  </div>
  {showModal && (
    <BookModal book={book} onClose={() => setShowModal(false)} />
  )}
</div>

  );
};

export default BookSingleCard;
