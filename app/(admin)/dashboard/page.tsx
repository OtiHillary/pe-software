'use client'
import React, { useState } from 'react'
import { People, Award, Timer, ArrowUp, ArrowDown, CloudPlus  } from 'iconsax-react';

export default function Home() {
  const is_logged_in = !false;
  const [ performanceView, setPerformanceView ] = useState('employee')

  const goals = [
    { name: 'Sales Growth' , status: 70 , daysLeft: 5 },
    { name: 'Developement' , status: 'Not started', daysLeft: 12 },
    { name: 'Developement' , status: 'Not started', daysLeft: 12 },
    { name: 'Databases' , status: 'Not started', daysLeft: 12 },
    { name: 'Customer Satisfaction' , status: 12, daysLeft: 11 },
    { name: 'Customer Satisfction' , status: 15, daysLeft: 20 },
  ]
  const good = [
    { name: 'Asade Mayowa' , dept: 'Sales and Marketing' , yield: 80 },
    { name: 'Olwagbade david' , dept: 'Sales and Marketing' , yield: 75 },
    { name: 'Iduate Edwin' , dept: 'Sales and Marketing' , yield: 50 },
    { name: 'John Smith' , dept: 'Sales and Marketing' , yield: 15 },
  ]
  const bad = [
    { name: 'Otonye Edwin' , dept: 'Inventory' , yield: 10 },
    { name: 'Olwagbade david' , dept: 'Logistics' , yield: 11 },
  ]
  const performance = { good, bad }

  function colorGrade( num: any ): string{
    if( typeof(num) == 'number' ){
      return (num < 50)? 'red' : 'green';       
    }
    else if ( typeof(num) == 'string' ) return 'yellow'
    return ''
  }

  return(
    <main className="w-full flex flex-col">
        <div className="(Stats)-- flex justify-between m-6">
          <div className="stat_1 shadow-custom shadow-gray-100 flex justify-between text-white rounded-md h-40 p-8 w-3_4 bg-pes">
            <div className='flex flex-col justify-center'>
              <p className='m-1 text-sm'>Number of Employees:</p>
              <p className='m-1 text-4xl font-bold' >120</p>
              <p className='m-1 text-xs underline'>View All</p>
            </div>
            <People size={ 64 } className='text-gray-400 font-bold mb-auto' />
          </div>

          <div className="stat_2 shadow-custom shadow-gray-100 flex justify-between rounded-md h-40 p-8 w-3_4 bg-white">
            <div className='flex flex-col justify-center'>
              <p className='m-1 text-sm'>Completed Appraisals:</p>
              <p className='m-1 text-4xl font-bold text-black' >024</p>
              <a className='m-1 text-xs underline text-pes'>View All</a>
            </div>
            <Award size={ 64 } className='text-gray-100 font-bold mb-auto' />
          </div>

          <div className="stat_3 shadow-custom shadow-gray-100 flex justify-between rounded-md h-40 p-8 w-3_4 bg-white">
          <div className='flex flex-col justify-center'>
              <p className='m-1 text-sm'>Pending Assesments:</p>
              <p className='m-1 text-4xl font-bold text-black' >067</p>
              <a className='m-1 text-xs underline text-pes'>View All</a>
            </div>
            <Timer size={ 64 } className='text-gray-100 font-bold mb-auto' />
          </div>
        </div>

        <div className="(Goals and Insights)-- flex justify-between mx-6 mb-6">
          <div className="w-4_5 shadow-md shadow-gray-100 p-4 bg-white">
            <div className='flex justify-between w-full p-4'>
              <p className='text-3xl text-black my-auto'>Goals</p>
              <p className='text-md font-light my-auto text-pes'>
                Set new Goal
                <CloudPlus className='mx-2 font-thin' />
              </p>                
            </div>

            <div className= 'text-white flex justify-between w-full py-4'>
              <div className = 'bg-orng flex flex-col justify-between p-4 rounded-md text-center w-4_5'>
                <p className='font-light'>Active Goals Set</p>
                <p className='text-4xl font-semibold'>00</p>
              </div>

                <div className='bg-grn flex flex-col justify-between p-4 rounded-md text-center w-4_5'>
                  <p className='font-light'>Goals Completed</p>
                  <p className='text-4xl font-semibold'>00</p>
                </div>
            </div>

            <p className='text-xl text-black my-auto p-4'>Active Goal Metrics</p>

            <div className='metrics flex flex-col justify-normal p-4 py-1'>
                {
                  goals.map((i, key) => {
                    return(
                      <>
                        <div key={ key } className='goal-metrics w-full flex justify-between my-4 text-sm'>
                          <p>{ i.name }</p>
                          <p className={ ` text-${ colorGrade(i.status) }-500 ` }> { typeof( i.status ) == 'string'? `${ i.status }` : `${ i.status }% Completed` } </p>
                          <p className={ ` text-${ colorGrade(i.daysLeft) }-500 ` }>{ `${ i.daysLeft } days left` }</p>        
                        </div>
                        <hr />                          
                      </>
                    )
                  })                    
                }
            </div>

          </div>

          <div className="w-1/2 shadow-md shadow-gray-100 p-4 bg-white">
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

            <p className='text-xl text-black  my-auto px-4 py-1'>Overperforming Employees</p>

            <div className='flex flex-col p-4'>
                {
                  performance.good.map((i, key) => {
                    return(
                      <>
                        <div key={ key } className='  goal-metrics w-full flex justify-between my-4 text-sm'>
                          <p>{ i.name }</p>
                          <p> { i.dept } </p>
                          <p className={ ` text-green-500` }>
                            <ArrowUp className='mb-auto mx-1 font-thin' />
                            { `${ i.yield }%` }
                          </p>        
                        </div>
                        <hr />                          
                      </>
                    )
                  })                    
                }  
            </div>

            <p className='text-xl text-black  my-auto px-4 py-1'>Underperforming Employees</p>
            
            <div className="flex flex-col p-4">
                {
                  performance.bad.map((i, key) => {
                    return(
                      <>
                        <div key={ key } className='goal-metrics w-full flex justify-between my-4 text-sm'>
                          <p>{ i.name }</p>
                          <p> { i.dept } </p>
                          <p className={ ` text-red-500` }>
                            <ArrowDown className='mt-auto mx-1 font-thin' />
                            { `${ i.yield }%` }
                          </p>        
                        </div>
                        <hr />                          
                      </>
                    )
                  })                    
                }
            </div>
          </div>
        </div>
    </main>     
  )
}