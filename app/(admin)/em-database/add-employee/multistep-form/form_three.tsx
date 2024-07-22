'use client'

import { ArrowLeft } from "iconsax-react"
import { useDispatch } from 'react-redux';
import { useFormstate } from "../useFormstate";
import { roleCreatedView } from '@/app/state/rolecreated/roleCreatedSlice';

export default function Formthree(){
   const dispatch = useDispatch()

   return(
      <>
         <div className="w-full">
            <p className="my-2 mx-8">{ `You are currently viewing the pre-set Reporting Hierarchy for the`} employee’s role. {`Click 'Edit Reporting Hierarchy' to customize the structure according to your organization's needs.` }</p>
         </div>
         
      </>
   )
}