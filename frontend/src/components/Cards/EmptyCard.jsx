import { GiScrollQuill } from "react-icons/gi";
import { MdOutlineSearchOff } from "react-icons/md";
import { FaRegCalendarXmark } from "react-icons/fa6";

const EmptyCard = ({ filterType, message }) => {
    return (
        <div className='flex flex-col items-center justify-center mt-20'>
            <span className='w-24 h-24 rounded-full bg-cyan-100 flex items-center justify-center'>
                {filterType === "search" && <MdOutlineSearchOff size={36} className='text-cyan-600' />}
                {filterType === "date" && <FaRegCalendarXmark size={36} className='text-cyan-600' />}
                {filterType === "default" && <GiScrollQuill size={36} className='text-cyan-600' />}
            </span>

            <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>
                {message}
            </p>
        </div>
    )
}

export default EmptyCard
