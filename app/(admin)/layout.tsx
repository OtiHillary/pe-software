import '.././globals.css'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import type { Metadata } from 'next'
import { Inter, Montserrat, Lato } from 'next/font/google'
import { CloseCircle } from 'iconsax-react'

const inter = Inter( {subsets: ['latin'] })
const montserrat = Montserrat( {subsets: ['latin'] })
const lato = Lato( 
  {
    weight: ['100', '300', '400', '700', '900'],
    subsets: ['latin']
   }
  )

export const metadata: Metadata = {
  title: 'PES',
  description: 'Performance Appraisal Software',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ lato.className + ' bg-gray-10 flex flex-row relative justify-center w-screen' }>
        {/* <div className = "notification rounded-sm shadow-lg p-12 z-20 flex flex-col fixed w-screen h-screen bg-black opacity-10">
        </div>

        <div className='logout rounded-sm shadow-lg bg-white w-96 h-108 p-2 pt-1 z-30 flex flex-col absolute top-24 right-8'>
          <div className="flex justify-between m-2 mx-4 ">
            <p>Notifications</p> 
            <CloseCircle className='hover:text-red-400'/> 
          </div>
          <div className="content bg-slate-50 rounded-md h-1/2 p-3 mx-4 mb-4 flex flex-col text-sm">
            <h1 className="mb-1 font-bold">The heading of the notification</h1>
            <p>This is the actual content of the notification it ia meant to educate you on the state of affairs of the company</p>
          </div>
          <div className="content bg-slate-50 rounded-md h-1/2 p-3 mx-4 mb-4 flex flex-col text-sm">
            <h1 className="mb-1 font-bold">The heading of the notification</h1>
            <p>This is the actual content of the notification it ia meant to educate you on the state of affairs of the company</p>
          </div>
        </div> */}

        <Sidebar />
        <div className="flex flex-col w-4/5">
          <Navbar />
          {children}          
        </div>

      </body>
    </html>
  )
}