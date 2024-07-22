'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setNotificationView } from '@/app/state/setnotification/setNotificationSlice';
import { Add, SearchNormal1 } from 'iconsax-react'

export default function Employee(){
   const [employees, setEmployees] = useState([])

   function roleColor(role: string){
      if (role == 'admin') return 'red'
      if (role == 'developer') return 'blue'
      if (role == 'team-lead') return 'green'
      if (role == 'UI/UX designer') return 'yellow'
      else return 'gray'
   }

   useEffect( () => {
      async function getEmployees() {
         const data = localStorage.getItem('access_token')
         try {
            const req = await fetch( '/api/getEmployee', 
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json"
               },
               body: JSON.stringify({token: data}) // Converting the data object to a JSON string
            }
            )

            const res = await req.json()
            console.log(res)      
            setEmployees(res)

         } catch (error) {
            console.log(error)
         }      
      }   

      getEmployees()
   }, [])

   return(
      <div className='flex justify-center w-full h-full'>
      <div className='m-4 bg-white w-full h-full'>
         <div className='flex justify-between h-[5rem] w-full'>
            <div className='flex justify-between my-auto mx-4'>
               <label htmlFor="em-search" className='relative h-fit'>
                  <SearchNormal1 className='text-gray-300 absolute top-1/2 left-6 -translate-y-1/2' size={20}/>
                  <input type="text" placeholder='Search for Employee' className='placeholder:text-xs placeholder:text-gray-300  focus:ring-gray-400 focus:border-gray-400 bg-[#fafafa] border-gray-50 h-[2.5rem] ps-16 ' />
               </label>
               <div className='relative mx-4'>
                  {/* <select id="countries" className="bg-[#fafafa] border border-gray-50 text-gray-300 text-xs focus:ring-gray-400 focus:border-gray-400 block w-full h-[2.5rem] px-2">
                     <option value="US" checked>sort by</option>
                     <option value="US">Role</option>
                     <option value="CA">Name</option>
                  </select> */}
               </div>
            </div>

            <div className='flex justify-between my-auto mx-3 text-xs'>
               <a href='/em-database/add-employee' className='flex justify-center bg-pes text-white px-10 py-2 m-4 border h-fit border-pes my-auto text-center'>
                  <span className='my-auto'>Add an Employee</span>
                  <Add size={20} className='my-auto ms-2'/>
               </a>
               <a className='flex border border-pes text-pes px-4 py-2 mx-4 h-fit my-auto'>Bulk Import</a>
            </div>
         </div>

         <div className='w-full text-bold flex flex-col'>
            <div className="rw bg-[#fafafa] h-12 w-full flex text-gray-400">
               <div className='w-[10%] my-auto ms-4'>
                  S/N
               </div>
               <div className='w-[35%] my-auto ms-4'>
                  Name
               </div>
               <div className='w-[30%] my-auto ms-4'>
                  Role
               </div>
               <div className='w-[25%] my-auto ms-4'>
                  Department
               </div>
            </div>

            <div className='flex flex-col justify-between'>
               {
                  (employees.length > 0)?
                     employees?.map((i, key) => {
                        return(
                           <div key={i.id} className="rw h-12 w-full flex my-1 hover:bg-slate-50">
                              <div className='w-[10%] my-auto font-semibold ms-4'>
                                 {key + 1}
                              </div>
                              <div className='w-[35%] my-auto font-semibold ms-4'>
                                 {i.name}
                              </div>
                              <div className={ `w-[30%] my-auto font-semibold ms-4`}>
                                 <p className={` rounded-full w-fit px-4 py-1 bg-${ roleColor( i.role ) }-100 text-${ roleColor( i.role ) }-500`}>
                                    {i.role}
                                 </p>
                              </div>
                              <div className='w-[25%] my-auto font-semibold ms-4'>
                                 {i.department}
                              </div>
                           </div>
                        )
                     })
                  :
                     <>
                        <div className="rw w-full flex text-gray-400 rounded-full animate-pulse"></div>
                        <div className="rw w-full flex text-gray-400 rounded-full animate-pulse"></div>
                        <div className="rw w-full flex text-gray-400 rounded-full animate-pulse"></div>
                        <div className="rw w-full flex text-gray-400 rounded-full animate-pulse"></div>                  
                     </>
               }            
            </div>

         </div>
         <div>

         </div>
      </div>

   </div>
   )
}