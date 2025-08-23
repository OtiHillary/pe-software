'use client'

import { usePathname } from 'next/navigation';
import Image from 'next/image'
import { 
   Home3,
   Setting4,
   DollarCircle,
   ProfileCircle,
   People,
   Award,
   Teacher,
   Setting3,
   CloseSquare
} from 'iconsax-react';
import jwt from 'jsonwebtoken'
import Link from 'next/link';
import { useEffect, useState } from 'react';

// function MobileSidebar({tabs, user, pathname}: {tabs: any, user: any, pathname: any}): JSX.Element {
//    const [isMenu, setMenu] = useState(false)
//    return (
//       <div className="lg:hidden">
//          <div className={`${isMenu ? 'w-screen' : 'w-auto'} bg-[#ffffff20] h-full shadow-sm shadow-gray-50 me-auto fixed left-2 z-20`}>
//             <div className={`bg-white h-screen fixed w-1/3 py-3 flex flex-col justify-start ${isMenu ? '': 'hidden'}`}>
//                <div className = 'my-4 text-pes text-2xl font-extrabold flex justify-center w-2/4 ms-12 me-auto'>
//                   <Image src={'/Vector.svg'} alt='PES' width={55} height={55} />
//                   <p className = 'ms-2 my-auto'>PES</p>
//                </div>

//                <div className='tabs my-16 flex flex-col justify-between'>
//                {
//                   tabs.map((i) => {
//                      const is_active = i.href == pathname || `/${pathname.split('/')[1]}` == i.href
//                      return(
//                      <Link onClick={() => setMenu(false)} 
//                            href={ i.href } key={ i.key } 
//                            style={{ display: `${ i.role_access.includes(user?.role)? '': '' }` }} 
//                            className={`${ is_active? 'bg-gray-200 text-pes' : 'bg-transparent text-gray-400'} 
//                                        hover:bg-gray-200 hover:text-pes p-3 ps-8 my-1 text-md flex`}
//                         >
//                         { i.icon }
//                         <p className='mx-3'> { i.name }</p>
//                      </Link>
//                      )
//                   })
//                }
//                </div>            
//             </div>
//          </div>
//          <div className={`hover:bg-gray-200 fixed rounded-lg top-[20px] z-20 ${isMenu ? 'right-8' : 'left-8'}`} >
//             <button className={`p-[2px] ${isMenu ? 'hidden' : 'block'}`} onClick={() => setMenu(!isMenu)}>
//                <HambergerMenu size={40} color={"black"} />
//             </button>
//             <button className={`p-[2px] ${isMenu ? 'block' : 'hidden'}`} onClick={() => setMenu(!isMenu)} >
//                <CloseSquare size={40} color={"black"}/>
//             </button>
//          </div>
//       </div>
//    )
// }

export default function Sidebar({is_sidebar_active, handleSideBar}: 
   {is_sidebar_active: boolean, handleSideBar:any}): JSX.Element{
   const pathname = usePathname()
   const [user, setUser] = useState({ name: '', role: '' })

   useEffect(() => {
      const access_token = localStorage.getItem('access_token') as string
      const newUser = jwt.decode(access_token)
      setUser(newUser as { name: string; role: string });

   }, [])
   

   console.log(pathname.split('/'))

   // roles are: Admin, dean, hod 

   const tabs = [
      { key: 1, name: 'Dashboard', icon: <Home3 />, href: '/dashboard', role_access: ['admin', 'employee-ac', 'employee-nac', 'team-lead', 'employee-w'] },
      { key: 4, name: 'Employee Database', icon: <People />, href: '/em-database', role_access: ['admin', 'team-lead'] }, 
      { key: 5, name: 'Goals', icon: <Setting4 />, href: '/goals', role_access: ['admin', 'employee-ac', 'employee-nac', 'team-lead', 'employee-w'] }, 
      { key: 3, name: 'Data Entry', icon: <Home3 />, href: '/data-entry', role_access: ['employee-ac', 'employee-nac', 'team-lead', 'employee-w'] }, 
      { key: 6, name: 'Assessment', icon: <Award />, href: '/assessment', role_access: ['admin'] }, 
      { key: 7, name: 'Performance Review', icon: <Teacher />, href: '/performance', role_access: ['employee-ac', 'employee-nac', 'team-lead', 'employee-w'] }, 
      { key: 2, name: 'Profile', icon: <ProfileCircle />, href: '/profile', role_access: ['employee-ac', 'employee-nac', 'team-lead', 'employee-w'] },
      { key: 8, name: 'Pricing', icon: <DollarCircle />, href: '/pricing', role_access: ['admin'] },
      { key: 9, name: 'Maintenance Model', icon: <Setting3 />, href: '/maintenance', role_access: ['employee-ac', 'employee-nac', 'team-lead', 'employee-w', 'admin'] }
   ]
   
   return (
         <>
            <div className="w-1/5 h-full shadow-sm shadow-gray-50 me-auto max-lg:hidden lg:block z-20">
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
                        <Link style={{ display: `${ i.role_access.includes(user?.role)? '': '' }` }}
                              href={ i.href } key={ i.key } 
                              className={`${ is_active? 'bg-gray-200 text-pes' : 'bg-transparent text-gray-400'} 
                                          hover:bg-gray-200 hover:text-pes p-3 ps-8 my-1 text-md flex`}
                        >
                           { i.icon }
                           <p className='mx-3'> { i.name }</p>
                        </Link>
                        )
                     })
                  }
                   {
                        // tabs
                        //    .filter(i => i.role_access.includes(user?.role?.toLowerCase())) // filter based on role
                        //    .map(i => {
                        //       const is_active = i.href == pathname || `/${pathname.split('/')[1]}` == i.href
                        //       return (
                        //       <Link
                        //          href={ i.href }
                        //          key={ i.key }
                        //          className={`${ is_active ? 'bg-gray-200 text-pes' : 'bg-transparent text-gray-400'} 
                        //                      hover:bg-gray-200 hover:text-pes p-3 ps-8 my-1 text-md flex`}
                        //       >
                        //          { i.icon }
                        //          <p className="mx-3">{ i.name }</p>
                        //       </Link>
                        //       )
                        // })
                     }
                  </div>            
               </div>
            </div>
            <div className="lg:hidden">
               <div className={`${is_sidebar_active ? 'w-screen' : 'w-auto'} bg-[#ffffff20] h-full shadow-sm shadow-gray-50 me-auto fixed left-2 z-20`}>
                  <div className={`bg-white h-screen fixed w-1/3 max-sm:w-2/3 py-3 flex flex-col justify-start ${is_sidebar_active ? '': 'hidden'}`}>
                     <div className = 'my-4 text-pes text-2xl font-extrabold flex justify-center w-2/4 ms-12 me-auto'>
                        <Image src={'/Vector.svg'} alt='PES' width={55} height={55} />
                        <p className = 'ms-2 my-auto'>PES</p>
                     </div>

                     <div className='tabs my-10 max-lg:my-0 flex flex-col justify-between'>
                     {
                        tabs.map((i) => {
                           const is_active = i.href == pathname || `/${pathname.split('/')[1]}` == i.href
                           return(
                           <Link onClick={() => handleSideBar()} 
                                 href={ i.href } key={ i.key } 
                                 style={{ display: `${ i.role_access.includes(user?.role)? '': '' }` }} 
                                 className={`${ is_active? 'bg-gray-200 text-pes' : 'bg-transparent text-gray-400'} 
                                             hover:bg-gray-200 hover:text-pes p-3 ps-8 my-1 text-md flex`}
                              >
                              { i.icon }
                              <p className='mx-3'> { i.name }</p>
                           </Link>
                           )
                        })
                     }
                     </div>            
                  </div>
               </div>
               <div className={`hover:bg-gray-200 bg-white fixed rounded-lg top-[20px] z-20 right-6 ${is_sidebar_active ? '' : 'hidden'}`} >
                  <button className={`p-[2px]`} onClick={() => handleSideBar()} >
                     <CloseSquare size={40} color={"black"}/>
                  </button>
               </div>
            </div>
         </>
      )
}
