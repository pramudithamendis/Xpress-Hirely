import { AiOutlineClose } from 'react-icons/ai'
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { BsCalendarDate } from "react-icons/bs";
import { IoSpeedometerOutline } from "react-icons/io5";

const RecordModal = ({ record, onClose }) => {
    return (
        <div className='fixed bg-black bg-opaity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            onClick={onClose}
            >
                <div
                onClick={(event) => event.stopPropagation()}
                className='w-[600px] max-w-full h-[400px] bg-white rounded-x1 p-4 flex flex-col relative'
                >
                    <AiOutlineClose 
                    className='absolute right-6 top-6 text-3x1 text-red-600 cursor-pointer'
                    onClick={onClose}
                    />
                    <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
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
                    <p className='mt-4'>Anything </p>
                    <p className='my-2'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </p>
                </div>
        </div>
    );
};

export default RecordModal