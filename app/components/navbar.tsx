'use client'
import Image from 'next/image'
import { SearchNormal, Notification  } from 'iconsax-react';

export default function Navbar(): JSX.Element{

   return(
      <div className="nav w-full h-48 bg-pes relative">
         <div className="flex shadow-md shadow-gray-100 justify-between bg-white w-4/5 p-5 fixed">
            <div className="search relative">
               <SearchNormal className='text-gray-300 absolute top-1/2 left-8 -translate-y-1/2'/>
               <input type='text' name='search' className=' ms-2 py-3 px-16 text-sm border focus:outline-blue-800 rounded-xl' placeholder='Search anything' />
            </div>

            <div className="profile flex my-auto mx-4">
            <div className="notification my-auto mx-2 text-gray-400">
               <Notification />
            </div>
            <div className="image flex justify-between text-gray-600">
               <Image src={ '/young oti.PNG' } alt='profile image' width={ 40 } height={ 0 } className='mx-2 rounded-full'/>
               <p className='mx-2 my-auto'>{ 'Otonye Hillary' }</p>
            </div>
            </div>            
         </div>

      </div>
   )
}

