'use client'

import { ArrowLeft } from "iconsax-react"
import { useDispatch } from 'react-redux';
import { roleCreatedView } from '@/app/state/rolecreated/roleCreatedSlice';

export default function Formtwo(){
   const dispatch = useDispatch()

   return(
      <>
         <div className="w-full">
            <p className="my-2 mx-8">{ `You are currently viewing the pre-set Reporting Hierarchy for the employee’s role. Click 'Edit Reporting Hierarchy' to customize the structure according to your organization's needs.` }</p>
         </div>

         <div className="grid grid-cols-2 m-4">
            <div className="border-b border-e p-4 flex flex-col">
               <label className="flex">
                  <input type="checkbox" className="h-6 w-6 mt-1 me-3" />
                  <span className="w-10/12">
                     <h1 className="text-lg">Manage User Roles</h1>
                     <p>Create, Edit, and Delete User roles.</p>
                  </span>
               </label>
            </div>

            <div className="border-b border-e p-4 flex flex-col">
               <label className="flex">
                  <input type="checkbox" className="h-6 w-6 mt-1 me-3" />
                  <span className="w-10/12">
                     <h1 className="text-lg">Access Employee Data</h1>
                     <p>View and edit the details of employees.</p>
                  </span>
               </label>
               <div className="flex ms-8 my-2 text-gray-400 text-sm font-extralight">
                  <label className="flex me-4">
                     <input type="checkbox" className="me-1" />
                     <span>All Employees</span>
                  </label>     
                  <label className="flex me-4">
                     <input type="checkbox" className="me-1" />
                     <span>Subordinates</span>
                  </label>     
                  <label className="flex me-4">
                     <input type="checkbox" className="me-1" />
                     <span>Selected Employees</span>
                  </label>     
               </div>
            </div>

            <div className="border-b border-e p-4 flex flex-col">
               <label className="flex">
                  <input type="checkbox" className="h-6 w-6 mt-1 me-3" />
                  <span className="w-10/12">
                     <h1 className="text-lg">Define Performance Metrics</h1>
                     <p>View and edit the Performance Metrics of employees.</p>
                  </span>
               </label>
               <div className="flex ms-8 my-2 text-gray-400 text-sm font-extralight">
                  <label className="flex me-4">
                     <input type="checkbox" className="me-1" />
                     <span>All Employees</span>
                  </label>     
                  <label className="flex me-4">
                     <input type="checkbox" className="me-1" />
                     <span>Subordinates</span>
                  </label>     
                  <label className="flex me-4">
                     <input type="checkbox" className="me-1" />
                     <span>Selected Employees</span>
                  </label>     
               </div>
            </div>

            <div className="border-b border-e p-4 flex flex-col">
               <label className="flex">
                  <input type="checkbox" className="h-6 w-6 mt-1 me-3" />
                  <span className="w-10/12">
                     <h1 className="text-lg">Access Reporting Hierarchy</h1>
                     <p>Define and modify the organizational reporting structure. Assigning managers to employees and creating teams</p>
                  </span>
               </label>
            </div>

            <div className="border-b border-e p-4 flex flex-col">
               <label className="flex">
                  <input type="checkbox" className="h-6 w-6 mt-1 me-3" />
                  <span className="w-10/12">
                     <h1 className="text-lg">Manage Performance Reviews</h1>
                     <p>Schedule, modify or cancel performance review meetings for any employee</p>
                  </span>
               </label>
               <div className="flex ms-8 my-2 text-gray-400 text-sm font-extralight">
                  <label className="flex me-4">
                     <input type="checkbox" className="me-1" />
                     <span>All Employees</span>
                  </label>     
                  <label className="flex me-4">
                     <input type="checkbox" className="me-1" />
                     <span>Subordinates</span>
                  </label>     
                  <label className="flex me-4">
                     <input type="checkbox" className="me-1" />
                     <span>Selected Employees</span>
                  </label>     
               </div>
            </div>
         </div>

         <div>
            <a href='/' className="text-pes mx-8 mb-8">Edit Persimssion Settings</a>
         </div>
      </>
   )
}