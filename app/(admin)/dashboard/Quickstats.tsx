'use client'

import { People, Award, Timer } from 'iconsax-react';
import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken'

export default function Quickstats() {
    const [quickStats, setQuickStats] = useState< number[] | null[]>([null, null, null])

    function convert(num: number){
        let temp = num.toString();
        if(num < 100)while(temp.length < 3) temp = "0" + temp;
        return temp;
    }

    useEffect(() => {
        const access_token = localStorage.getItem('access_token') as string
        const temp_user = jwt.decode(access_token, 'oti');

        async function getStatData(){
            try {
                const req = await fetch('/api/getStatData', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ user: temp_user?.name })
                })

                const res = await req.json()
                setQuickStats(res)

            } catch (error) {
                console.error(error)
            }
        }

        getStatData()
     }, [])

    return(
        <div className="(Stats)-- flex flex-wrap justify-between m-6">
            <div className="stat_1 shadow-custom shadow-gray-100 flex justify-between text-white rounded-md h-40 p-8 w-3_4 min-w-[220px] bg-pes">
                <div className='flex flex-col justify-center'>
                    <p className='m-1 text-sm'>Number of Employees:</p>
                    <p className='m-1 text-4xl font-bold' >
                        { 
                            quickStats[0]?
                                <>
                                    {
                                        convert( quickStats[0] )
                                    }
                                </>
                            :
                            <p>Loading...</p>
                        }
                    </p>
                    <p className='m-1 text-xs underline'>View All</p>
                </div>
                <People size={ 64 } className='text-gray-400 font-bold mb-auto' />
            </div>

            <div className="stat_2 shadow-custom shadow-gray-100 flex justify-between rounded-md h-40 p-8 w-3_4 min-w-[220px] bg-white">
                <div className='flex flex-col justify-center'>
                    <p className='m-1 text-sm'>Completed Appraisals:</p>
                    <p className='m-1 text-4xl font-bold text-black' >
                        { 
                            quickStats[1]?
                                <>
                                    {
                                        convert( quickStats[1] )
                                    }
                                </>
                            :
                            <p>Loading...</p>
                        }                    
                    </p>
                    <a className='m-1 text-xs underline text-pes'>View All</a>
                </div>
                <Award size={ 64 } className='text-gray-100 font-bold mb-auto' />
            </div>

            <div className="stat_3 shadow-custom shadow-gray-100 flex justify-between rounded-md h-40 p-8 w-3_4 min-w-[220px] bg-white">
                <div className='flex flex-col justify-center'>
                    <p className='m-1 text-sm'>Pending Assesments:</p>
                    <p className='m-1 text-4xl font-bold text-black' >
                       { 
                        quickStats[2]?
                            <>
                                {
                                    convert( quickStats[2] )
                                }
                            </>
                        :
                           <p>Loading...</p>
                        }
                    </p>
                    <a className='m-1 text-xs underline text-pes'>View All</a>
                </div>
                <Timer size={ 64 } className='text-gray-100 font-bold mb-auto' />
            </div>
        </div>
    )
}