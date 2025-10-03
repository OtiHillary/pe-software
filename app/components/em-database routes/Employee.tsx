'use client'

import React, { useEffect, useState } from 'react'
// import { setNotificationView } from '@/app/state/setnotification/setNotificationSlice';
import { Add, SearchNormal1 } from 'iconsax-react'
import Link from 'next/link';

type user = {
   id:number
   name: string
   email: string 
   password: string
   gsm: string
   role: string
   address: string
   faculty_college: string
   dob: string
   doa: string
   poa : string
   doc : string
   post : string
   dopp: string
   level: string
   image : string
   org : string
   department: string
 }

export default function Employee(){
   const [employees, setEmployees] = useState<user[]>([])

   function roleColor(role: string){
      if (role == 'admin') return 'red'
      if (role == 'developer') return 'blue'
      if (role == 'hod') return 'green'
      if (role == 'UI/UX designer') return 'yellow'
      else return 'gray'
   }

   useEffect( () => {
      console.log('employee number is',employees.length)
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
            <div className='flex justify-between h-[5rem] max-md:py-2 max-md:h-fit w-full flex-row max-md:flex-col max-md:gap-2'>
               <div className='flex justify-between my-auto mx-4'>
                  <label htmlFor="em-search" className='relative h-fit max-md:w-full bg-white'>
                     <SearchNormal1 className='text-gray-300 absolute top-1/2 left-6 -translate-y-1/2' size={20}/>
                     <input type="text" placeholder='Search for Employee' className='placeholder:text-xs placeholder:text-gray-300 max-md:w-full focus:ring-gray-400 focus:border-gray-400 bg-[#fafafa] border-gray-50 h-[2.5rem] ps-16 ' />
                  </label>
                  <div className='relative mx-0'>
                     {/* <select id="countries" className="bg-[#fafafa] border border-gray-50 text-gray-300 text-xs focus:ring-gray-400 focus:border-gray-400 block w-full h-[2.5rem] px-2">
                        <option value="US" checked>sort by</option>
                        <option value="US">Role</option>
                        <option value="CA">Name</option>
                     </select> */}
                  </div>
               </div>

               <div className='flex justify-between my-auto mx-0 text-xs'>
                  <a href='/em-database/add-employee' className='flex justify-center bg-pes text-white px-10 py-2 m-2 border h-fit border-pes my-auto text-center'>
                     <span className='my-auto'>Add an Employee</span>
                     <Add size={20} className='my-auto ms-2'/>
                  </a>
                  
                  <a href='/em-database/add-auditor' className='flex justify-center bg-blue-600 text-white px-10 py-2 m-2 border h-fit border-pes my-auto text-center'>
                     <span className='my-auto'>Add an External Auditor</span>
                     <Add size={20} className='my-auto ms-2'/>
                  </a>
                  
                  <a className='flex border border-pes text-pes px-4 py-2 mx-2 h-fit my-auto'>Bulk Import</a>
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
                              <Link href={ `/em-database/${ i.id }` } key={i.id} className="rw h-12 w-full flex my-1 hover:bg-slate-50">
                                 <div className='w-[10%] my-auto font-semibold ms-4'>
                                    {key + 1}
                                 </div>
                                 <div className='w-[35%] my-auto font-semibold ms-4 flex flex-col'>
                                    {i.name}
                                    <span className='font-thin text-xs'>
                                       { i.email }
                                    </span>
                                 </div>
                                 <div className={ `w-[30%] my-auto font-semibold ms-4`}>
                                    <p className={` rounded-full w-fit px-4 py-1 bg-${ roleColor( i.role ) }-100 text-${ roleColor( i.role ) }-500`}>
                                       {i.role}
                                    </p>
                                 </div>
                                 <div className='w-[25%] my-auto font-semibold ms-4'>
                                    {i.department}
                                 </div>
                              </Link>
                           )
                        })
                     :
                        <div className='flex flex-col w-full'>
                           <div className="rw h-12 my-1 w-full flex bg-gray-100 rounded-md animate-pulse"></div>
                           <div className="rw h-12 my-1 w-full flex bg-gray-100 rounded-md animate-pulse"></div>
                           <div className="rw h-12 my-1 w-full flex bg-gray-100 rounded-md animate-pulse"></div>
                           <div className="rw h-12 my-1 w-full flex bg-gray-100 rounded-md animate-pulse"></div>                  
                        </div>
                  }            
               </div>

            </div>
         </div>
      </div>
   )
}