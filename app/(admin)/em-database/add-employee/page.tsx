"use client";

import { useState } from 'react'
import Formone from './multistep-form/form_one'
import { useMultistepForm } from './useMultistep'; 
import Formtwo from './multistep-form/form_two';
import Formthree from './multistep-form/form_three';

export default function MainForm (){
    const formElements = [
        { 
            element: <Formone key={0}/>, 
            title: "Employee Details"
        },
        {
            element: <Formtwo key={1}/>,
            title: "Permission Settings",
        },
        {
            element: <Formthree key={2}/>,
            title: "Reporting Heirachy",
        }
    ]
    const { steps, step, stepIndex, next, back } = useMultistepForm(formElements)

    return (
        <div className='flex flex-col bg-white m-4'>
            <div className='(crt-nav) w-full h-[4rem] flex justify-between'>
                <h1 className="my-auto mx-6 font-semibold text-xl text-gray-600">Add an Employee</h1>
            </div>

            <div className="bg-gray-50 h-[3rem] flex justify-between">
                <h1 className="my-auto mx-6 font-semibold">{ step.title }</h1>
                <h1 className="my-auto mx-6 font-semibold">{ stepIndex + 1 } / { steps.length } </h1>
            </div>

            {
                step.element
            }

            <div className="w-full my-4 flex justify-between">
                <a type='button' className="btn rounded-sm py-2 px-8 border mx-8 border-pes text-pes" onClick={ back }>Previous</a>
                <a type='button' className="btn rounded-sm py-2 px-16 mx-8 border border-pes bg-pes text-white" onClick={ next }>Next</a>
            </div>
        </div>
    )
}