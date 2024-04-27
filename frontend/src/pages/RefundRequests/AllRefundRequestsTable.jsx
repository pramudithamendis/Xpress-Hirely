import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const AllRefundRequestsTable = ({ refundrequests }) => {
    return (
    <div>
    <h3 className="text-orange-500 font-bold">All refund requests</h3><br/>
        <table className='bg-gray-300 bg-opacity-88 border-collapse border border-black'>
        <thead>
            <tr>
            <th className='border border-black px-4 py-2 text-center'>Date</th>
                <th className='border border-black px-4 py-2 text-center'>BookingID</th>
                <th className='border border-black px-4 py-2 text-center'>Email</th>
                <th className='border border-black px-4 py-2 text-center'>Reason_for_Request</th>
                <th className='border border-black px-4 py-2 text-center'>Status</th>
                <th className='border border-black px-4 py-2 text-center'>PaymentID</th>
            </tr>

        </thead>
        <tbody>
            {refundrequests.map((refundrequest, index) => (
                <tr key={refundrequest._id} className='h-8'>

                <td className='border border-black px-4 py-2 text-center'>
                    {refundrequest.Date}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {refundrequest.BookingID}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {refundrequest.Email}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {refundrequest.Reason_for_Request}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {refundrequest.Status}
                </td>
                <td className='border border-black px-4 py-2 text-center'>
                    {refundrequest.PaymentID}
                
                    {/* <Link to={`/refundrequests/admin/details/${refundrequest._id}`}>
                        <BsInfoCircle className='text-2x1 text-green-800' />
                    </Link>  */}
                    <Link to={`/refundrequests/admin/edit/${refundrequest._id}`}>
                    <button className="bg-orange-500 hover:bg-orange-600 text-black hover:text-black font-bold py-2 px-4 rounded">Edit</button>
                    </Link>
                
                </td> 

                </tr>
            ))}
        </tbody>

    </table>
    </div>
    )

}

export default AllRefundRequestsTable