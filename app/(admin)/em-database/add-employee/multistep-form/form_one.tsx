'use client'

import { ArrowLeft } from "iconsax-react"
import { useDispatch } from 'react-redux';
import { roleCreatedView } from '@/app/state/rolecreated/roleCreatedSlice';

export default function Formone(){
   const dispatch = useDispatch()

   return(
      <div className='flex flex-col'>
         <div className='flex pt-4'>
            <div className="w-1/2 mx-8">
               <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='my-2 text-sm'>{`Employee's Full Name:`}</label>
                    <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder="Enter the Employee's first name and last name" />
                </div>

                <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='my-2 text-sm'>Current Home Address:</label>
                    <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='' />
                </div>
                <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='my-2 text-sm'>Faculty/College:</label>
                    <select className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Select a faculty'>
                        <option value="">FSS</option>
                    </select>
                </div>
            </div>

            <div className="w-1/2 mx-8">
               <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='my-2 text-sm'>{`Employee's Email Address:`}</label>
                    <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder="Enter the Employee's email address" />
                </div>

                <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='my-2 text-sm'>Functional G.S.M:</label>
                    <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='' />
                </div>

                <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='my-2 text-sm'>Department:</label>
                    <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Select a Department' />
                </div>
            </div>
         </div>

         <div className="w-[95%] mx-auto flex justify-between">
            <div className="formgroup flex flex-col">
               <label htmlFor=""className='my-2 text-sm'>{`Employee's Email Address:`}</label>
               <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder="Enter the Employee's email address" />
            </div>

            <div className="formgroup flex flex-col">
               <label htmlFor=""className='my-2 text-sm'>Functional G.S.M:</label>
               <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='' />
            </div>

            <div className="formgroup flex flex-col">
               <label htmlFor=""className='my-2 text-sm'>Department:</label>
               <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Select a Department' />
            </div>

            <div className="formgroup flex flex-col">
               <label htmlFor=""className='my-2 text-sm'>Department:</label>
               <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Select a Department' />
            </div>
         </div>

         <div className="w-[80%] ms-8 me-auto mb-4 flex justify-between">
            <div className="formgroup flex flex-col">
               <label htmlFor="" className='my-2 text-sm'>{`Employee's Email Address:`}</label>
               <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder="Enter the Employee's email address" />
            </div>

            <div className="formgroup flex flex-col">
               <label htmlFor=""className='my-2 text-sm'>Functional G.S.M:</label>
               <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='' />
            </div>

            <div className="formgroup flex flex-col">
               <label htmlFor=""className='my-2 text-sm'>Department:</label>
               <input type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Select a Department' />
            </div>
         </div>

         <div className="w-[50%] ms-8 me-auto mb-4 flex flex-col">
            <p className='text-sm text-pes my-3'>Academic & Professional Qualifications held: <span className="text-gray-300">{` (certificates must be attached)`}</span></p>
            <div className="flex flex-col bg-gray-50 rounded-xs p-4">
               <div className="flex justify-between m-2">
                  <input id="title" type="text" placeholder="Title or Qualification" className="font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm" />

                  <select name="year" id="year" placeholder="Year Obtained" defaultValue={`Year Obtained`} className="font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm">
                     <option value="" className="text-gray-300">Year Obtained</option>
                  </select>
               </div>
               <div className="flex justify-between m-2">
                  <label htmlFor="file" className="w-[80%] my-auto">
                     <div className="flex justify-end bg-white rounded-sm w-11/12 relative">
                        <p className="m-auto text-sm text-gray-300">Choose File to Upload</p>
                        <div className="bg-gray-100 rounded-sm px-5 py-3 text-sm text-gray-500">Browse Files</div>
                     </div>
                     <input type="file" name="file" id="file" className="invisible absolute"/>
                  </label>

                  <button className="border border-pes rounded-sm text-pes py-2 px-6">Save</button>
               </div>
            </div>
         </div>
      </div>
   )
}