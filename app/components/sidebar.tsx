'use client'

import { usePathname } from 'next/navigation';
import Image from 'next/image'
import { Home3, Setting4, DollarCircle, ProfileCircle, People, Award, Teacher } from 'iconsax-react';
import jwt from 'jsonwebtoken'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Sidebar(): JSX.Element{
   const pathname = usePathname()
   const [user, setUser] = useState({ name: '', role: '' })

   useEffect(() => {
      const access_token = localStorage.getItem('access_token') as string
      const newUser = jwt.decode(access_token, 'oti')
      setUser(newUser);
   }, [])
   

   console.log(pathname.split('/'))

   // roles are: Admin, employee, team-lead 

   const tabs = [
      { key: 1, name: 'Dashboard', icon: <Home3 />, href: '/dashboard', role_access: ['admin', 'employee-ac', 'employee-nac', 'team-lead', 'employee-w'] },
      { key: 4, name: 'Employee Database', icon: <People />, href: '/em-database', role_access: ['admin', 'team-lead'] }, 
      { key: 5, name: 'Goals', icon: <Setting4 />, href: '/goals', role_access: ['admin', 'employee-ac', 'employee-nac', 'team-lead', 'employee-w'] }, 
      { key: 3, name: 'Data Entry', icon: <Home3 />, href: '/data-en', role_access: ['employee-ac', 'employee-nac', 'team-lead', 'employee-w'] }, 
      { key: 6, name: 'Assessment', icon: <Award />, href: '/assessment', role_access: ['admin'] }, 
      { key: 7, name: 'Performance Review', icon: <Teacher />, href: '/performance', role_access: ['admin', 'employee-ac', 'employee-nac', 'team-lead', 'employee-w'] }, 
      { key: 2, name: 'Profile', icon: <ProfileCircle />, href: '/profile', role_access: ['employee-ac', 'employee-nac', 'team-lead', 'employee-w'] },
      { key: 8, name: 'Pricing', icon: <DollarCircle />, href: '/pricing', role_access: ['admin'] },
      { key: 9, name: 'Maintenance Model', icon: <DollarCircle />, href: '/maintenance', role_access: ['employee-ac', 'employee-nac', 'team-lead', 'employee-w'] }
   ]
   
   return(
      <div className=" w-1/5 h-full shadow-sm shadow-gray-50 me-auto relative">
         <div className="bg-white h-screen fixed w-1/5 py-3 flex flex-col justify-start">
            <div className = 'my-4 text-pes text-2xl font-extrabold flex justify-center w-2/4 ms-12 me-auto'>
               <Image src={'/Vector.svg'} alt='PES' width={55} height={55} />
               <p className = 'ms-2 my-auto'>PES</p>
            </div>

            <div className='tabs my-16 flex flex-col justify-between'>
            {
               tabs.map((i) => {
                  const is_active = i.href == pathname || `/${pathname.split('/')[1]}` == i.href
                  return(
                  <Link style={{ display: `${ i.role_access.includes(user?.role)? '': '' }` }} href={ i.href } key={ i.key } className={`${ is_active? 'bg-gray-200 text-pes' : 'bg-transparent text-gray-400'} hover:bg-gray-200 hover:text-pes p-3 ps-8 my-1 text-md flex`}>
                     { i.icon }
                     <p className='mx-3'> { i.name }</p>
                  </Link>
                  )
               })
            }
            </div>            
         </div>
      </div>
   )

}