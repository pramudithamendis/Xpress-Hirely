import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const RecordsTable = ({ records }) => {
  return (
    <table className='w-full border-separate border-spacing-2 bg-white bg-opacity-70 rounded-lg'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Maintain Type</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>VehicleID</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Date</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Milage</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Description</th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={record._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {record.Maintaintype}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {record.VehicleID}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {record.Date}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {record.Milage}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {record.Description}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/records/details/${record._id}`}>
                      <BsInfoCircle className='text-2x1 text-green-800' />
                    </Link>
                    <Link to={`/records/edit/${record._id}`}>
                      <AiOutlineEdit className='text-2x1 text-yellow-600' />
                    </Link>
                    <Link to={`/records/delete/${record._id}`}>
                      <MdOutlineDelete className='text-2x1 text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  )
}

export default RecordsTable