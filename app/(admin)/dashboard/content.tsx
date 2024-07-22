'use client'

import { People, Award, Timer, ArrowRight, Add } from 'iconsax-react';
import jwt from 'jsonwebtoken'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Goalchunk from '@/app/components/goals/goalChunk';
import Performance from '@/app/components/performance/performanceChunk'
import ProfileChunk from '@/app/components/Profilechunk';

export default function Dashboard() {
   const [performanceView, setPerformanceView] = useState('employee')
   const [user, setUser] = useState({name: '', role: ''})

   useEffect(() => {
      const access_token = localStorage.getItem('access_token') as string
      const temp_user = jwt.decode(access_token, 'oti');
      console.log('the user role is:', temp_user?.role)

      setUser(temp_user)
   }, [])


   return(
      <main className="w-full flex flex-col bg-gray-50">
         {
            user?.role == 'admin'?
               <div className="(Stats)-- flex flex-wrap justify-between m-6">
                  <div className="stat_1 shadow-custom shadow-gray-100 flex justify-between text-white rounded-md h-40 p-8 w-3_4 min-w-[220px] bg-pes">
                     <div className='flex flex-col justify-center'>
                        <p className='m-1 text-sm'>Number of Employees:</p>
                        <p className='m-1 text-4xl font-bold' >{ 120 }</p>
                        <p className='m-1 text-xs underline'>View All</p>
                     </div>
                     <People size={ 64 } className='text-gray-400 font-bold mb-auto' />
                  </div>

                  <div className="stat_2 shadow-custom shadow-gray-100 flex justify-between rounded-md h-40 p-8 w-3_4 min-w-[220px] bg-white">
                     <div className='flex flex-col justify-center'>
                        <p className='m-1 text-sm'>Completed Appraisals:</p>
                        <p className='m-1 text-4xl font-bold text-black' >024</p>
                        <a className='m-1 text-xs underline text-pes'>View All</a>
                     </div>
                     <Award size={ 64 } className='text-gray-100 font-bold mb-auto' />
                  </div>

                  <div className="stat_3 shadow-custom shadow-gray-100 flex justify-between rounded-md h-40 p-8 w-3_4 min-w-[220px] bg-white">
                  <div className='flex flex-col justify-center'>
                        <p className='m-1 text-sm'>Pending Assesments:</p>
                        <p className='m-1 text-4xl font-bold text-black' >067</p>
                        <a className='m-1 text-xs underline text-pes'>View All</a>
                     </div>
                     <Timer size={ 64 } className='text-gray-100 font-bold mb-auto' />
                  </div>
               </div>
            :
               <div className='flex flex-col m-8 p-8 bg-white'>
                  <ProfileChunk />            
               </div>

         }

         <div className="(Goals and Insights)-- flex justify-between mx-6 mb-6">
            <div className="(left_panel)-- w-4_5 flex flex-col">
               <div className="w-full shadow-md shadow-gray-100 p-4 bg-white">
                  <div className='flex justify-between w-full p-4'>
                     <p className='text-3xl text-black my-auto'>Goals</p>
                     <a href={'/goals'} className='text-md font-light my-auto text-pes flex'>
                        Set new Goal
                        <Add className='mx-2 font-thin' />
                     </a>                
                  </div>

                  <div className= 'text-white flex justify-between w-full py-4'>
                     <div className = 'bg-orng flex flex-col justify-between p-4 rounded-md text-center w-4_5'>
                        <p className='font-light'>Active Goals Set</p>
                        <p className='text-4xl font-semibold'>{ `00` }</p>
                     </div>

                     <div className='bg-grn flex flex-col justify-between p-4 rounded-md text-center w-4_5'>
                        <p className='font-light'>Goals Completed</p>
                        <p className='text-4xl font-semibold'>{ `00` }</p>
                     </div>
                  </div>

                  <p className='text-xl text-black my-auto p-4'>Active Goal Metrics</p>
                  <Goalchunk />
                  <div className="viewgoals flex justify-end my-4">
                     <Link href={`/goals`} className='bg-pes rounded-md py-2 px-4 text-white flex'>View Goals <ArrowRight className='ms-2 text-sm'/> </Link>
                  </div>
               </div>
            </div>

            <div className="(right_panel)-- w-1/2">
               <div className="w-full shadow-md shadow-gray-100 p-4 bg-white">
                  <div className='flex justify-start w-full'>
                  <p className='text-3xl text-black my-auto p-4'>Performance Insights</p>
                  </div>

                  <div className='flex flex-col justify-center relative mx-4 my-2'>
                  <div className="flex justify-start w-3/12">
                     <p className={`me-4  py-4 ${ (performanceView == 'employee') ? 'text-pes' : '' }`} onClick={ () => { setPerformanceView('employee') } }>Employees</p>
                     <p className={`me-4  py-4 ${ (performanceView == 'team') ? 'text-pes' : '' }`} onClick={ () => { setPerformanceView('team') } }>Teams</p>
                  </div>

                  <div className={`line w-20 bg-pes h-1 absolute bottom-0 ${ (performanceView == 'employee') ? 'left-0' : 'left-20' } transition-all rounded-full`}></div>
                  <div className="line w-full bg-slate-100 h-1"></div>
                  </div>

                  <Performance />
               </div>
            </div>
         </div>
      </main> 
   )
}