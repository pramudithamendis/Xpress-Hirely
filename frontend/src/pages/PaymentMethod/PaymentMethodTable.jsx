import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import clientbg from '../../images/clientbg.jpeg';

const PaymentMethodTable = ({ paymentmethods }) => {
    return (
        <div>
            <br/>
        <table className="bg-gray-300 bg-opacity-88 border-collapse border border-black">
        <thead>
            <tr>
                <th className='border border-black px-4 py-2 text-center'>PaymentMethod</th>
                <th className='border border-black px-4 py-2 text-center'>CardNumber</th>
                <th className='border border-black px-4 py-2 text-center'>CVV</th>
                <th className='border border-black px-4 py-2 text-center'>DateOfExpiry</th>
            </tr>

        </thead>
        <tbody>
            {paymentmethods.map((paymentmethod, index) => (
                <tr key={paymentmethod._id} className='h-8'>

                <td className='border border-black px-4 py-2 text-center'>
                    {paymentmethod.PaymentMethod}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {paymentmethod.CardNumber}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {paymentmethod.CVV}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {paymentmethod.DateOfExpiry}
                </td>

                <td className='border border-black px-4 py-2 text-center'>
                <div className='flex justify-center gap-x-4'>
                    <Link to={`/savepaymentmethod/user/details/${paymentmethod._id}`}>
                        <BsInfoCircle className='text-2x1 text-green-800' />
                    </Link>
                    <Link to={`/savepaymentmethod/user/edit/${paymentmethod._id}`}>
                        <button className="bg-orange-500 hover:bg-orange-600 text-black hover:text-black font-bold py-2 px-4 rounded">Edit</button>
                    </Link>
                    <Link to={`/savepaymentmethod/user/delete/${paymentmethod._id}`}>
                    <button className="bg-red-500 bg-opacity-80 hover:bg-red-600 text-black px-4 py-2 rounded-full">Delete</button>
                    </Link>
                </div>
                </td>
                </tr>
            ))}
        </tbody>
    </table>  </div>
    )
}

export default PaymentMethodTable