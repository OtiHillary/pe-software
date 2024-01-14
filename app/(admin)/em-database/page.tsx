'use client'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setNotificationView } from '@/app/state/setnotification/setNotificationSlice';
import { Add, SearchNormal1 } from 'iconsax-react'

export default function Database(){
   const [ databaseView, setDatabaseView ] = useState('employee')

   return(
      <div className='flex flex-col h-full w-full'>
         <div className='nav flex justify-start bg-white h-[4rem] w-full text-gray-300 text-md'>
            <ul className='flex mx-16 my-auto w-[30%] justify-between'>
               <li className={`border-2 border-transparent ${ (databaseView == 'employee') ? 'text-blue-800 border-b-blue-800' : '' }`} onClick={ () => { setDatabaseView('employee') } }>Employees</li>
               <li className={`border-2 border-transparent ${ (databaseView == 'roles') ? 'text-blue-800 border-b-blue-800' : '' }`} onClick={ () => { setDatabaseView('roles') } }>Roles and Permissions</li>
            </ul>
         </div>
         <div className='flex justify-center w-full h-full'>
            <div className='m-4 bg-white w-full h-full'>
               <div className='flex justify-between h-[5rem] w-full border'>
                  <div className='flex justify-between my-auto mx-4'>
                     <label htmlFor="em-search" className='relative h-fit'>
                        <SearchNormal1 className='text-gray-300 absolute top-1/2 left-6 -translate-y-1/2' size={20}/>
                        <input type="text" placeholder='Search for Employee' className='placeholder:text-xs placeholder:text-gray-300  focus:ring-gray-400 focus:border-gray-400 bg-[#fafafa] border-gray-50 h-[2.5rem] ps-16 ' />
                     </label>
                     <div className='relative mx-4'>
                        <select id="countries" className="bg-[#fafafa] border border-gray-50 text-gray-300 text-xs focus:ring-gray-400 focus:border-gray-400 block w-full h-[2.5rem] px-2">
                           <option selected>Sort By</option>
                           <option value="US">United States</option>
                           <option value="CA">Canada</option>
                        </select>
                     </div>
                  </div>

                  <div className='flex justify-between my-auto mx-3 text-xs'>
                     <a className='flex justify-center bg-pes text-white px-10 py-2 m-4 border h-fit border-pes my-auto text-center'>
                        <span className='my-auto'>Add an Employee</span>
                        <Add size={20} className='my-auto ms-2'/>
                     </a>
                     <a className='flex border border-pes text-pes px-4 py-2 mx-4 h-fit my-auto'>Bulk Import</a>
                  </div>
               </div>
               <div></div>
               <div></div>
            </div>

         </div>
      </div>
   )
}