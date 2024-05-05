import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const CardPaymentsTable = ({ cardpayments }) => {
    return (
        <div>
        <h3 className="text-orange-500 font-bold">Your transactions</h3>

        <table className="bg-gray-300 bg-opacity-88 border-collapse border border-black">
        <thead>
            <tr>
            {/* <th className='border border-black px-4 py-2 text-center'>NIC</th> */}
                <th className='border border-black px-4 py-2 text-center'>PaymentID</th>
                <th className='border border-black px-4 py-2 text-center'>CardHolderName</th>
                <th className='border border-black px-4 py-2 text-center'>CardNumber</th>
                <th className='border border-black px-4 py-2 text-center'>CVV</th>
                <th className='border border-black px-4 py-2 text-center'>DateOfExpiry</th>
                <th className='border border-black px-4 py-2 text-center'>Amount</th>

            </tr>

        </thead>
        <tbody>
            {cardpayments.map((cardpayment, index) => (
                <tr key={cardpayment._id} className='h-8'>

                {/* <td className='border border-black px-4 py-2 text-center'>
                    {cardpayment.NIC}
                </td> */}
                <td className='border border-black px-4 py-2 text-center'>
                    {cardpayment._id}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {cardpayment.CardHolderName}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {cardpayment.CardNumber}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {cardpayment.CVV}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {cardpayment.DateOfExpiry}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {cardpayment.Amount}
                </td>

                <td className='border border-black px-4 py-2 text-center'>
                <div className='flex justify-center gap-x-4'>
                    <Link to={`/cardpayments/user/details/${cardpayment._id}`}>
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

export default CardPaymentsTable