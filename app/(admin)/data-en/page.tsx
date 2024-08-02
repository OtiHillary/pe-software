"use client"

import { useState } from "react"
import Data from "./data" 

export default function Page(){
    const dataEntry = [
        {
            title: 'Appraisal',
            section : [ 'Teaching quality evaluation', 'Research Paper Quality Evaluation', 'Administrative Quality ', 'Community Quality ', 'Other Relevant Information' ]
        },
        {
            title: 'Performance',
            section : [ 'Competence', 'Integrity', 'Compatibility', 'Use of Resources' ]
        },
        {
            title: 'Stress factor',
            section : [ 'Staff Stress Category form', 'Stress Theme form', 'Stress Feeling/Frequency form' ]
        }
    ]

    function handleEmployeeAdd() {

    }

    return (
        <div className='flex flex-col m-8 bg-white'>
            <div className='nav flex justify-between bg-white h-[4rem] w-full text-md border border-slate-50'>
                <h1 className="text-2xl m-3 font-bold">Data entry</h1>

                <p className="m-3 my-auto text-blue underline cursor-pointer" onClick={ handleEmployeeAdd }>Data entry for other employees</p>
            </div>

            <div>
                {
                    dataEntry.map((data, key) => {
                        return(
                            <Data data={data} key={key} />
                        )
                    })
                }
            </div>
            
        </div> 
    )
}