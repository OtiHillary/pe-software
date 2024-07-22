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

async function changeGoal() {
    
}

export default function Editgoal(){
    const isVisible = useSelector( (state: RootState) => state.goal.edit.visible )
    const data: goal = useSelector( (state: RootState) => state.goal.edit.data )
    const [isDisabled, setIsDisabled] = useState(true)
    const [ formData, setFormData ] = useState(data)
    const [optimisticData, setOptimisticData] = useOptimistic(formData);
    const dispatch = useDispatch()

    function handleEdit() {
        setIsDisabled( prevState => !prevState )
    }

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
            dispatch( editGoal({}))
            dispatch( successView())

            console.log('Success:', responseData); 

        } catch (error) {
            console.error('Error:', error); 
        }
    }

    function handleSubit() {

    }

    useEffect(() => {
        setFormData(data)
    }, [])
    
    return (
        <div className={`notification ${ isVisible? 'visible': 'invisible' } rounded-sm shadow-lg p-12 z-30 flex flex-col w-4/12 bg-white absolute top-1/2 -translate-y-1/2`}>
            <CloseCircle onClick={ () => { dispatch( editGoal({})); handleEdit() }} className='ms-auto hover:text-red-500'/>
            <div>
                <div className="formgroup flex flex-col w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Goal:</label>
                    <input type='text' name='name' className='font-light text-sm text-gray-500 py-4 px-4' value={ formData.name } onChange={ handleChange }/>
                </div>

                <div className="formgroup flex flex-col w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Description:</label>
                    <input type='text' name='description' className='font-light text-sm text-gray-500 py-4 px-4' value={ formData.description } onChange={ handleChange }/>
                </div>

                <div className="formgroup flex flex-col w-1/2">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Due Date:</label>
                    <input type='date' name='status' className='font-light text-sm text-gray-500 py-4 px-4' value={ (formData.due_date).toString().split('T')[0] } onChange={ handleChange }/>
                </div>

                <div className="actions flex">
                    <button style={{ display: isDisabled? '' : 'none' }} className='bg-pes rounded-md text-white w-7/12 py-4 mt-6 me-2' onClick={ handleEdit }>Edit</button>
                    <button style={{ display: isDisabled? 'none' : '' }} className='bg-pes rounded-md text-white w-7/12 py-4 mt-6 me-2' onClick={ handleSubmit }>Done</button>
                    <button className='bg-red-500 rounded-md text-white w-4/12 py-4 mt-6' onClick={ () => dispatch(deleteGoal()) } >Delete</button>
                </div>

            </div>
        </div>
    )
}