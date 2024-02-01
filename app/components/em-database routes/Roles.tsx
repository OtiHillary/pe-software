'use client'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setNotificationView } from '@/app/state/setnotification/setNotificationSlice';
import { Add, SearchNormal1 } from 'iconsax-react'

export default function Roles(){
   return(
      <div className='flex justify-center w-full h-full'>
         <div className='m-4 bg-white w-full h-full'>
            <div className='flex justify-between h-[5rem] w-full'>
               <div className='flex justify-between my-auto mx-4'>
                  <label htmlFor="em-search" className='relative h-fit'>
                     <SearchNormal1 className='text-gray-300 absolute top-1/2 left-6 -translate-y-1/2' size={20}/>
                     <input type="text" placeholder='Search for Role' className='placeholder:text-xs placeholder:text-gray-300  focus:ring-gray-400 focus:border-gray-400 bg-[#fafafa] border-gray-50 h-[2.5rem] ps-16 ' />
                  </label>
               </div>

               <div className='flex justify-between my-auto mx-3 text-xs'>
                  <a href='/em-database/create-role' className='flex justify-center bg-pes text-white px-10 py-2 m-4 border h-fit border-pes my-auto text-center'>
                     <span className='my-auto'>Create Role</span>
                     <Add size={20} className='my-auto ms-2'/>
                  </a>
               </div>
            </div>

            <div className='bg-[#fafafa] h-12 w-full text-bold flex'>
               <div className="rw w-full flex text-gray-400">
                  <div className='w-[10%] my-auto ms-4'>
                     S/N
                  </div>
                  <div className='w-[25%] my-auto ms-4'>
                     Name
                  </div>
                  <div className='w-[25%] my-auto ms-4'>
                     Role
                  </div>
                  <div className='w-[40%] my-auto ms-4'>
                     Department
                  </div>
               </div>

            </div>
            <div></div>
         </div>
      </div>
   )
}