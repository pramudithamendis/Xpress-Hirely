import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const CashPaymentsTable = ({ cashpayments }) => {
    return (
<div>
        <h3 className="text-orange-500 font-bold">Your transactions</h3>
        <table className='w-full bg-gray-300 bg-opacity-88 border-collapse border border-black'>
        <thead>
            <tr>
                <th className='border border-black px-4 py-2 text-center'>Date</th>               
                <th className='border border-black px-4 py-2 text-center'>ReceiptNo</th>
                <th className='border border-black px-4 py-2 text-center'>Amount</th>
                <th className='border border-black px-4 py-2 text-center'>Status</th>
                <th className='border border-black px-4 py-2 text-center'>PaymentID</th>
            </tr>

        </thead>
        <tbody>
            {cashpayments.map((cashpayment, index) => (
                <tr key={cashpayment._id} className='h-8'>

                <td className='border border-black px-4 py-2 text-center'>
                    {cashpayment.Date}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {cashpayment.ReceiptNo}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {cashpayment.Amount}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {cashpayment.Status}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {cashpayment._id}
                </td> 

                <td className='border border border-slate-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4'>
                     <Link to={`/cashpayments/user/details/${cashpayment._id}`}>
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

export default CashPaymentsTable