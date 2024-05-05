import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const StripePaymentsTable = ({ stripepayments }) => {
    return (
        <div>
        <h3 className="text-orange-500 font-bold">Your transactions</h3>
        <table className='bg-gray-300 bg-opacity-88 border-collapse border border-black'>
        <thead>
            <tr>
                <th className='border border-black px-4 py-2 text-center'>PaymentID</th>
                <th className='border border-black px-4 py-2 text-center'>CardNumber</th>
                <th className='border border-black px-4 py-2 text-center'>CVV</th>
                <th className='border border-black px-4 py-2 text-center'>DateOfExpiry</th>
                <th className='border border-black px-4 py-2 text-center'>Amount</th>

            </tr>

        </thead>
        <tbody>
            {stripepayments.map((stripepayment, index) => (
                <tr key={stripepayment._id} className='h-8'>

                <td className='border border-black px-4 py-2 text-center'>
                    {stripepayment._id}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {stripepayment.CardNumber}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {stripepayment.CVV}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {stripepayment.DateOfExpiry}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {stripepayment.Amount}
                </td>

                 <td className='border border border-slate-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4'>
                    <Link to={`/stripepayments/user/details/${stripepayment._id}`}>
                        <BsInfoCircle className='text-2x1 text-green-800' />
                    </Link>
                </div>
                </td> 

                </tr>
            ))}
        </tbody>

    </table>
    </div>
    )

}

export default StripePaymentsTable