'use client'
import Image from 'next/image'
import { SearchNormal, Notification  } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationView } from '@/app/state/notification/notificationSlice';
import { actionView } from "@/app/state/action/actionSlice";
import { RootState } from '@/app/state/store'

export default function Navbar(): JSX.Element{
   const isVisible = useSelector((state: RootState)=> state.notification.visible )
   const dispatch = useDispatch()

   return(
      <div className="nav w-full h-20 bg z-10 sticky">
         <div className="flex shadow-md shadow-gray-100 justify-between bg-white w-full h-full p-5">
            <div className="search relative">
               <SearchNormal className='text-gray-300 absolute top-1/2 left-8 -translate-y-1/2'/>
               <input type='text' name='search' className=' ms-2 py-3 px-16 text-sm border focus:outline-blue-800 rounded-xl' placeholder='Search anything' />
            </div>

            <div className="profile flex my-auto mx-4">
            <div className="notification my-auto mx-2 text-gray-400">
               <Notification onClick ={() => dispatch( notificationView() )} />
            </div>
            <div className="image flex justify-between text-gray-600 hover:underline" onClick ={() => dispatch( actionView() )}>
               <Image src={ '/young oti.PNG' } alt='profile image' width={ 40 } height={ 0 } className='mx-2 rounded-full'/>
               <p className='mx-2 my-auto'>{ 'Otonye Hillary' }</p>
            </div>
            </div>            
         </div>
      </div>
   )
}

