'use client'

import React, { useEffect, useState } from 'react'
import { Add, SearchNormal1 } from 'iconsax-react'

export default function Roles(){
   const [ roles, setRoles ] = useState([])

   useEffect(() => {
      async function getRoles() {
         const data = localStorage.getItem('access_token')
         try {
            const req = await fetch('/api/getRoles', {
               method: "POST",
               headers: {
               "Content-Type": "appliation/json"
               },
               body: JSON.stringify({ token: data })
            })

            const res = await req.json()
            console.log(res)      
            setRoles(res)  

         } catch (error) {
            console.log(error)
         }
      }
      getRoles()
   }, [])

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
            <div className='flex flex-col justify-between'>
               {
                  (roles.length > 0)?
                     roles?.map((i, key) => {
                        return(
                           <div key={i.id} className="rw h-12 w-full flex my-1 hover:bg-slate-50">
                              <div className='w-[10%] my-auto font-semibold ms-4'>
                                 {key + 1}
                              </div>
                              <div className='w-[35%] my-auto font-semibold ms-4'>
                                 {i.name}
                              </div>
                              <div className={ `w-[30%] my-auto font-semibold ms-4`}>
                                 <p className={` rounded-full w-fit px-4 py-1`}>
                                    { `${i.assigned} ${ (i.assigned > 1) ? 'users' : ' user' }` }
                                 </p>
                              </div>
                           </div>
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
   )
}