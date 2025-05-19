"use client"

import Image from 'next/image'
import { SearchNormal, Notification  } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationView } from '@/app/state/notification/notificationSlice';
import { actionView } from "@/app/state/action/actionSlice";
import jwt from 'jsonwebtoken'
import { RootState } from '@/app/state/store'
import { useEffect, useState } from 'react';


export default function Navbar(): JSX.Element{
   const dispatch = useDispatch()
   const [user, setUser] = useState<jwt.JwtPayload | string | null>(null)

   useEffect(() =>{
      const access_token = localStorage.getItem('access_token') as string
      const user = jwt.decode(access_token);
      // console.log(access_token)

      setUser(user)
   }, [])

   return(
      <div className="nav w-full h-20 bg z-10 sticky">
         <div className="flex justify-between bg-white w-full h-full p-5">
            <div className="search relative h-fit">
               <SearchNormal className='text-gray-300 absolute top-1/2 left-8 -translate-y-1/2'/>
               <input type='text' name='search' className=' ms-2 py-3 px-16 text-sm border focus:outline-blue-800 rounded-xl' placeholder='Search anything' />
            </div>

            <div className="profile flex my-auto mx-4">
            {/* <div className="notification my-auto mx-2 text-gray-400">
               <Notification onClick ={() => dispatch( notificationView() )} />
            </div> */}
            <div className="image flex justify-between text-gray-600 hover:underline" onClick ={() => dispatch( actionView() )}>
               <Image src={ /* user.image = null? '/young oti.PNG' : user.image */ '/young oti.PNG' } alt='profile image' width={ 40 } height={ 0 } className='mx-2 rounded-full'/>
               <p className='mx-2 my-auto cursor-pointer'>
                  { typeof user === 'object' && user !== null && 'name' in user ? user.name as string : '' }
               </p>
            </div>
            </div>            
         </div>
      </div>
   )
}

