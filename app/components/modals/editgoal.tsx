'use client'

import { useDispatch, useSelector } from 'react-redux';
import { editGoal, deleteGoal } from '@/app/state/goals/goalSlice';
import { RootState } from '@/app/state/store'
import { CloseCircle } from 'iconsax-react'
import { useEffect, useOptimistic, useState } from 'react';
import jwt from 'jsonwebtoken'
import { successView } from '@/app/state/success/successSlice';

type goal = {
    name: string
    day_started: string
    description:string
    due_date: string
    id: number
    status: number
    user_id:string
}

export default function Editgoal(){
    const isVisible = useSelector( (state: RootState) => state.goal.edit )
    const data: goal = useSelector( (state: RootState) => state.goal.data )
    const [ formData, setFormData ] = useState({})
    const dispatch = useDispatch()

    function handleChange(event) {
        console.log(formData, event.target.value);
        setFormData({ ...data, [event.target.name]: event.target.value })
    }

    async function handleSubmit() {
        const token = localStorage.getItem('access_token')
        const user = jwt.decode(token, 'oti')

        try {
            const response = await fetch('/api/updateGoals', {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ ...formData, user_id: user})
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error: ${errorData}`);
            }
        
            const responseData = await response.json();
            dispatch( editGoal())
            dispatch( successView())

            console.log('Success:', responseData); 

        } catch (error) {
            console.error('Error:', error); 
        }
    }

    useEffect(() => {
        console.log(data, ' and ', formData)
        setFormData(data)
    }, [])
    
    return (
        <div className={`notification ${ isVisible? 'visible': 'invisible' } rounded-sm shadow-lg p-12 z-30 flex flex-col w-4/12 bg-white absolute top-1/2 -translate-y-1/2`}>
            <CloseCircle onClick={ () => { dispatch( editGoal()) }} className='ms-auto hover:text-red-500'/>
            <div>
                <div className="formgroup flex flex-col w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Goal:</label>
                    <input type='text' name='name' className='font-light text-sm text-gray-500 py-4 px-4 border rounded-md placeholder:text-gray-700' placeholder={ formData.name } onChange={ handleChange }/>
                </div>

                <div className="formgroup flex flex-col w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Description:</label>
                    <input type='text' name='description' className='font-light text-sm text-gray-500 py-4 px-4 border rounded-md placeholder:text-gray-700' placeholder={ formData.description } onChange={ handleChange }/>
                </div>

                <div className="formgroup flex flex-col w-1/2">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Due Date:</label>
                    <input type='date' name='status' className='font-light text-sm text-gray-500 py-4 px-4 border rounded-md placeholder:text-gray-700' value={ new Date(formData.due_date) } onChange={ handleChange }/>
                </div>

                <div className="actions flex">
                    <button className='bg-pes rounded-md text-white w-full py-4 mt-6 me-2' onClick={ handleSubmit }>Done</button>
                </div>

            </div>
        </div>
    )
}