import '../.././globals.css'
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
  title: 'PES | Sign Up',
  description: 'Sign up for this programme',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ lato.className + ' bg-gray-10 flex flex-row relative justify-center max-w-screen h-screen' }>
        {children}          
      </body>
    </html>
  )
}