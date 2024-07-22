import { useDispatch, useSelector } from 'react-redux';
import { newGoal } from '@/app/state/goals/goalSlice';
import { RootState } from '../../state/store'
import { CloseCircle } from 'iconsax-react'
import { useState } from 'react';



export default function Newgoal(){
    const isVisible = useSelector( (state: RootState) => state.goal.new )
    const dispatch = useDispatch()
    const [ formData, setFormdata ] = useState({})   
    
    function handleChange(event){
        setFormdata( { ...formData, [event.target.name]: event.target.value } )
    }
    
    async function handleSubmit(event) {
        event.prevault()

        try {
            const data = await fetch('/api/getGoals', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)

            })  
            console.log(data)          
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <div className={`notification ${ isVisible? 'visible': 'invisible' } rounded-sm shadow-lg p-12 z-30 flex flex-col w-4/12 bg-white absolute top-1/2 -translate-y-1/2`}>
            <CloseCircle onClick={ () => dispatch( newGoal()) } className='ms-auto hover:text-red-500'/>
            <form onSubmit= { handleSubmit }>
                <div className="formgroup flex flex-col w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Goal:</label>
                    <input onChange={ handleChange } name='name' type="text" className='font-light text-sm text-gray-500 placeholder-gray-500 py-4 px-4 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Type Goal' />
                </div>

                <div className="formgroup flex flex-col w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Description:</label>
                    <input onChange={ handleChange } name='description' type="text" className='font-light text-sm text-gray-500 placeholder-gray-500 py-4 px-4 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Add goal description' />
                </div>

                <div className="formgroup flex flex-col w-1/2">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Due Date:</label>
                    <input onChange={ handleChange } name='due_date' type="text" className='font-light text-sm text-gray-500 placeholder-gray-500 py-4 px-4 outline-0 border focus:border-gray-400 rounded-sm' placeholder='15/11/2023' />
                </div>

                <input type='submit' className='bg-pes rounded-md text-white w-full py-4 mt-6' value={'Set Goal'} />
            </form>
        </div>
    )
}