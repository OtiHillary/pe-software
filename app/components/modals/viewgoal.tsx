'use client'

import { useDispatch, useSelector } from 'react-redux';
import { unviewGoal, editGoal, deleteGoal } from '@/app/state/goals/goalSlice';
import { RootState } from '@/app/state/store'
import { CloseCircle } from 'iconsax-react'
import { useEffect, useOptimistic, useRef, useState } from 'react';
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


export default function Viewgoal(){
    const isVisible = useSelector( (state: RootState) => state.goal.view )
    const data: goal = useSelector( (state: RootState) => state.goal.data )
    const goalData = useRef({})
    const dispatch = useDispatch()

    function handleEdit(){
        dispatch( unviewGoal() )
        dispatch( editGoal() )
    }

    async function handleDelete(){
        dispatch( deleteGoal())
        // const req = await fetch('/api/removeGoal')
        console.log('goal removed');
    }
    useEffect(() => {
        goalData.current = data
    }, [])
    
    return (
        <div className={`(viewGoal) ${ isVisible? 'visible': 'invisible' } rounded-sm shadow-lg p-12 z-30 flex flex-col w-4/12 bg-white absolute top-1/2 -translate-y-1/2`}>
            <CloseCircle onClick={ () => dispatch(unviewGoal()) } className='ms-auto hover:text-red-500'/>
            <div>
                <div className="formgroup flex flex-col w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Goal:</label>
                    <p className='font-light text-sm text-gray-500 py-4 px-4' >{ data?.name }</p>
                </div>

                <div className="formgroup flex flex-col w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Description:</label>
                    <p className='font-light text-sm text-gray-500 py-4 px-4' >{ data?.description } </p>
                </div>

                <div className="formgroup flex flex-col w-1/2">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Due Date:</label>
                    <p className='font-light text-sm text-gray-500 py-4 px-4' >{ (data?.due_date).toString().split('T')[0] }</p>
                </div>

                <div className="actions flex">
                    <button className='bg-pes rounded-md text-white w-7/12 py-4 mt-6 me-2' onClick={ handleEdit }>Edit</button>
                    <button className='bg-red-500 rounded-md text-white w-4/12 py-4 mt-6' onClick={ handleDelete } >Delete</button>
                </div>

            </div>
        </div>
    )
}