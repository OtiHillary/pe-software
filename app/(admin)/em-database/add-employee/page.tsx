"use client";

import Formone from './multistep-form/form_one'
import { useMultistepForm } from './useMultistep'; 
import Formtwo from './multistep-form/form_two';
import Formthree from './multistep-form/form_three';
import { useState } from "react"
import jwt from 'jsonwebtoken'
import { useDispatch } from 'react-redux';
import { successView } from '@/app/state/success/successSlice';
import { useRouter } from 'next/navigation';


export default function MainForm (){
    const [ formdata, setFormdata ] = useState<Record<string, any>>({})
    const router = useRouter()
    const dispatch = useDispatch()
    const formElements = [
        { 
            element: <Formone key={0} formdata={formdata} setFormdata={setFormdata}/>, 
            title: "Employee Details"
        },
        {
            element: <Formtwo key={1} formdata={formdata} setFormdata={setFormdata}/>,
            title: "Permission Settings",
        },
        {
            element: <Formthree key={2}/>,
            title: "Reporting Heirachy",
        }
    ]
    const { steps, step, stepIndex, next, back } = useMultistepForm(formElements)

    async function handleSubmit(event: { preventDefault: () => void; }){
        event.preventDefault()
        const token = localStorage.getItem('access_token');
        const user = token ? jwt.decode(token) : null;
        const orgName = typeof user === 'object' && user !== null && 'name' in user ? (user as any).name : undefined;
        const data = { ...(formdata || {}), org: orgName }
        console.log('formdata is: ', formdata, 'data is:', data)

        try {
            const req = await fetch( '/api/addEmployee', 
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data) // Converting the data object to a JSON string
              }
            )
            let res = await req.json()
        
            if(res.status == 200){              
              console.log(res.message)
              dispatch(successView())
              router.push('/em-database')
            }

            if (res.status == 500) {
                // setMessage({  visibility: 'visible', text: 'login failed, check details', color: 'red' })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={ handleSubmit } className='flex flex-col bg-white m-4'>
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
                <a type='button' className="btn rounded-sm py-2 px-8 border mx-8 border-pes text-pes cursor-pointer" onClick={ back }>Previous</a>
                <a type='button' style={{ display: (stepIndex+1 == steps.length)? 'none' : '' }} className=" cursor-pointer btn rounded-sm py-2 px-16 mx-8 border border-pes bg-pes text-white" onClick={ next }>Next</a>
                <input type='submit' style={{ display: (stepIndex+1 == steps.length)? '' : 'none' }} className="btn rounded-sm py-2 px-16 mx-8 border border-pes bg-pes text-white" value={'Finish'}/>
            </div>
        </form>
    )
}