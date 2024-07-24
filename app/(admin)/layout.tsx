'use client'

import '.././globals.css'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import Dimmer from '../components/dimmer'
import Action from '../components/modals/action'
import Newgoal from '../components/modals/newgoal'
import Editgoal from '../components/modals/editgoal'
// import Notification from '../components/modals/notification'
import { Inter, Montserrat, Lato } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from '../state/store'
import Deletegoal from '../components/modals/deletegoal'
// import SetNotification from '../components/modals/setnotification'
import NotificationSent from '../components/modals/notification_sent'
import RoleCreated from '../components/modals/role_created'
import Success from '../components/modals/success'

const lato = Lato( 
  {
    weight: ['100', '300', '400', '700', '900'],
    subsets: ['latin']
   }
  )

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <Provider store={ store }>
      <html lang="en">
        <body className={ lato.className + 'bg-gray-10 flex flex-row relative justify-center w-screen' }>
          <Dimmer />
          {/* <Notification /> */}
          {/* <SetNotification /> */}
          <Success />
          <Action />
          <Newgoal/>
          <Editgoal/>
          <Deletegoal/>
          <NotificationSent/>
          <RoleCreated />

          <Sidebar />
          <div className="flex flex-col w-4/5">
            <Navbar />
            {children}          
          </div>
        </body>
      </html>      
    </Provider>
  )
}