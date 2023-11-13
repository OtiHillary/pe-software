import './globals.css'
import type { Metadata } from 'next'
import { Inter, Montserrat, Lato } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from './state/store'

const inter = Inter( {subsets: ['latin'] })
const montserrat = Montserrat( {subsets: ['latin'] })
const lato = Lato( 
  {
    weight: ['100', '300', '400', '700', '900'],
    subsets: ['latin']
   }
  )

export const metadata: Metadata = {
  title: 'PES | Sign In',
  description: 'Performance Appraisal Software',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={ store }>
      <html lang="en">
          <body className={ lato.className + ' bg-gray-10 flex flex-row relative justify-center max-w-screen h-screen' }>
            {children}          
          </body>        
      </html>
    </Provider>
  )
}