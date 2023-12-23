import { useDispatch, useSelector } from 'react-redux';
import { editGoal, deleteGoal } from '@/app/state/goals/goalSlice';
import { RootState } from '@/app/state/store'
import { CloseCircle } from 'iconsax-react'

type goal = {
    name: string;
    status: any;
    description: string;
    daysLeft: any
}

async function changeGoal() {
    
}

export default function Editgoal(){
    const isVisible = useSelector( (state: RootState) => state.goal.edit.visible )
    const data: goal | {} = useSelector( (state: RootState) => state.goal.edit.data.payload )
    // console.log(`your data is${ data }`)
    const dispatch = useDispatch()

    return (
        <div className={`notification ${ isVisible? 'visible': 'invisible' } rounded-sm shadow-lg p-12 z-30 flex flex-col w-4/12 bg-white absolute top-1/2 -translate-y-1/2`}>
            <CloseCircle onClick={ () => dispatch( editGoal({})) } className='ms-auto hover:text-red-500'/>
            <div>
                <div className="formgroup flex flex-col w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Goal:</label>
                    <p className='font-light text-sm text-gray-500 py-4 px-4'>{ data?.name }</p>
                </div>

                <div className="formgroup flex flex-col w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Description:</label>
                    <p className='font-light text-sm text-gray-500 py-4 px-4'>{ data?.description }</p>
                </div>

                <div className="formgroup flex flex-col w-1/2">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Due Date:</label>
                    <p className='font-light text-sm text-gray-500 py-4 px-4' >{ data?.status }</p>
                </div>

                <div className="actions flex">
                    <button className='bg-pes rounded-md text-white w-7/12 py-4 mt-6 me-2'>Edit</button>
                    <button className='bg-red-500 rounded-md text-white w-4/12 py-4 mt-6' onClick={ () => dispatch( deleteGoal()) } >Delete</button>
                </div>

            </div>
        </div>
    )
}