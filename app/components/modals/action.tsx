import { InfoCircle, Logout } from "iconsax-react"
import Link from "next/link"

export default function Action(){
  return (
    <div className = "logout rounded-sm shadow-lg bg-white px-6 py-8 z-20 flex flex-col absolute top-24 right-8">
      <Link href={`/`} className='flex py-2 px-2 justify-start w-52'>
        <InfoCircle className='me-2'/>
        Get help
      </Link>

      <Link href={`/`} className='text-red-500 flex py-2 px-2 justify-start w-52'>
        <Logout className='me-2'/>
        logout
      </Link>
    </div>
  )
}