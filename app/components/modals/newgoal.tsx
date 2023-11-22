import { useDispatch, useSelector } from 'react-redux';
import { newGoal } from '@/app/state/goals/goalSlice';
import { RootState } from '../../state/store'
import { CloseCircle } from 'iconsax-react'

async function setGoal() {
    
}

export default function Newgoal(){
    const isVisible = useSelector( (state: RootState) => state.goal.new )
    const dispatch = useDispatch()

    return (
        <div className={`notification ${ isVisible? 'visible': 'invisible' } rounded-sm shadow-lg p-12 z-30 flex flex-col w-4/12 bg-white absolute top-1/2 -translate-y-1/2`}>
            <CloseCircle onClick={ () => dispatch( newGoal()) } className='ms-auto hover:text-red-500'/>
            <form>
                <div className="formgroup flex flex-col w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Goal:</label>
                    <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-500 py-4 px-4 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Sales Growth' />
                </div>

                <div className="formgroup flex flex-col w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Description:</label>
                    <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-500 py-4 px-4 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Achieve a 15% increase in sales revenue by the end of the quarter' />
                </div>

                <div className="formgroup flex flex-col w-1/2">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Due Date:</label>
                    <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-500 py-4 px-4 outline-0 border focus:border-gray-400 rounded-sm' placeholder='15/11/2023' />
                </div>

                <button className='bg-pes rounded-md text-white w-full py-4 mt-6'>Set Goal</button>
            </form>
        </div>
    )
}