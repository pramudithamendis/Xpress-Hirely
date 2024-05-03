import { Link } from 'react-router-dom';
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { BsCalendarDate } from "react-icons/bs";
import { IoSpeedometerOutline } from "react-icons/io5";
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const RecordsCard = ({ records }) => {

    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-white bg-opacity-70 rounded-lg'>
            {records.map((record, index) => (
                <div
                    key={record._id}
                    className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-x1'
                >
                    <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
                        {record.VehicleID}
                    </h2>
                    <h4 className='my-2 text-gray-500'>{index + 1}</h4>
                    <div className='flex justify-start items-center gap-x-2'>
                        <HiOutlineWrenchScrewdriver className='text-red-300 text-2x1' />
                        <h2 className='my-1'>{record.Maintaintype}</h2>
                    </div>
                    <div className='flex justify-start items-center gap-x-2'>
                        <BsCalendarDate className='text-red-300 text-2x1' />
                        <h2 className='my-1'>{record.Date}</h2>
                    </div>
                    <div className='flex justify-start items-center gap-x-2'>
                        <IoSpeedometerOutline className='text-red-300 text-2x1' />
                        <h2 className='my-1'>{record.Milage}</h2>
                    </div>
                    <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                        <Link to={`/records/details/${record._id}`}>
                            <BsInfoCircle className='text-2x1 text-green-600 hover:text-black' />
                        </Link>
                        <Link to={`/records/edit/${record._id}`}>
                            <AiOutlineEdit className='text-2x1 text-yellow-800 hover:text-black' />
                        </Link>
                        <Link to={`/records/delete/${record._id}`}>
                            <MdOutlineDelete className='text-2x1 text-red-600 hover:text-black' />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecordsCard