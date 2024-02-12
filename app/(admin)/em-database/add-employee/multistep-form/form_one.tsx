'use client'

import { ArrowLeft } from "iconsax-react"
import { useDispatch } from 'react-redux';
import { roleCreatedView } from '@/app/state/rolecreated/roleCreatedSlice';

export default function Formone(){
   const dispatch = useDispatch()

   return(
      <div className='flex flex-col'>
         <div className='(crt-nav) w-full h-[4rem] flex justify-between'>
            <h1 className="my-auto mx-6 font-semibold text-xl text-gray-600">Add an Employee</h1>
         </div>
         <div className="bg-gray-50 h-[3rem] flex justify-between">
            <h1 className="my-auto mx-6 font-semibold">Employee Details</h1>
            <h1 className="my-auto mx-6 font-semibold">1/3</h1>
         </div>
         <div className='flex pt-4'>
            <div className="w-1/2 mx-8">
               <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>{`Employee's Full Name:`}</label>
                    <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder="Enter the Employee's first name and last name" />
                </div>

                <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Current Home Address:</label>
                    <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='' />
                </div>
                <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Faculty/College:</label>
                    <select className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Select a faculty'>
                        <option value="">FSS</option>
                    </select>
                </div>
            </div>

            <div className="w-1/2 mx-8">
               <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>{`Employee's Email Address:`}</label>
                    <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder="Enter the Employee's email address" />
                </div>

                <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Functional G.S.M:</label>
                    <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='' />
                </div>

                <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='font-bold my-2 text-sm'>Department:</label>
                    <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Select a Department' />
                </div>
            </div>
         </div>

         <div className="w-[95%] mx-auto flex justify-between">
            <div className="formgroup flex flex-col">
               <label htmlFor=""className='font-bold my-2 text-sm'>{`Employee's Email Address:`}</label>
               <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder="Enter the Employee's email address" />
            </div>

            <div className="formgroup flex flex-col">
               <label htmlFor=""className='font-bold my-2 text-sm'>Functional G.S.M:</label>
               <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='' />
            </div>

            <div className="formgroup flex flex-col">
               <label htmlFor=""className='font-bold my-2 text-sm'>Department:</label>
               <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Select a Department' />
            </div>

            <div className="formgroup flex flex-col">
               <label htmlFor=""className='font-bold my-2 text-sm'>Department:</label>
               <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Select a Department' />
            </div>
         </div>

         <div className="w-[80%] ms-8 me-auto mb-4 flex justify-between">
            <div className="formgroup flex flex-col">
               <label htmlFor=""className='font-bold my-2 text-sm'>{`Employee's Email Address:`}</label>
               <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder="Enter the Employee's email address" />
            </div>

            <div className="formgroup flex flex-col">
               <label htmlFor=""className='font-bold my-2 text-sm'>Functional G.S.M:</label>
               <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='' />
            </div>

            <div className="formgroup flex flex-col">
               <label htmlFor=""className='font-bold my-2 text-sm'>Department:</label>
               <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Select a Department' />
            </div>
         </div>

         <div>

         </div>
      </div>
   )
}