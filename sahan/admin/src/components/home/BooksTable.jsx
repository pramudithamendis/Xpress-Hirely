import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Number </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Mobile Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:hidden">Mobile Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:hidden">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dropoff Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dropoff Time</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {books.map((book, index) => (
            <tr key={book._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{book.customerName}</td>
              <td className="px-6 py-4 whitespace-nowrap sm:hidden">{book.idNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap sm:hidden">{book.Address}</td>
              <td className="px-6 py-4 whitespace-nowrap sm:hidden">{book.mobileNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.PickupDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.PickupTime}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.DropoffDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.DropoffTime}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex justify-center space-x-2">
                  <Link to={`/books/details/${book._id}`} className="text-orange-600 hover:text-green-900">
                    <BsInfoCircle className="w-6 h-6" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} className="text-orange-600 hover:text-yellow-900">
                    <AiOutlineEdit className="w-6 h-6" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} className="text-red-600 hover:text-red-900">
                    <MdOutlineDelete className="w-6 h-6" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;