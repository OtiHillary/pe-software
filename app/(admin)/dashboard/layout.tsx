import '../../globals.css'
import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'
import type { Metadata } from 'next'
import { Inter, Montserrat, Lato } from 'next/font/google'

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
        <Sidebar />
        <div className="flex flex-col w-4/5 relative">
          <Navbar />
          {children}          
        </div>

      </body>
    </html>
  )
}