'use client'

import { InfoCircle, Logout } from "iconsax-react"
import Link from "next/link"
import { useSelector } from 'react-redux';
import { RootState } from '@/app/state/store'
import { useRouter } from "next/navigation";

export default function Action(){
  const isVisible = useSelector((state: RootState)=> state.action.visible )
  const router = useRouter()

  function handleLogout(){
    localStorage.removeItem('access_token')
    router.push('/')
  }

  return (
    <div className = {`${ isVisible? 'visible' : 'invisible' } logout rounded-sm shadow-lg bg-white py-8 z-10 flex flex-col absolute top-24 right-8`}>
      <Link href={`/`} className='flex py-2 px-2 justify-start ps-8 pe-20 hover:bg-gray-100'>
        <InfoCircle className='me-2'/>
        Get help
      </Link>

      <div onClick={ handleLogout } className='text-red-500 flex py-2 px-2 justify-start ps-8 pe-20 hover:bg-gray-100'>
        <Logout className='me-2'/>
        logout
      </div>
    </div>
  )
}