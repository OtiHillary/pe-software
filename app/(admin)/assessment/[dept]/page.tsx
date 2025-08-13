'use client';

import { useEffect, useState } from "react";

export default function Page({ params }: { params: { dept: string } }) {
    const [data, setData] = useState([]);
    const dept = params.dept;

    function assessEmployee() {
        // Function to handle employee assessment logic
        console.log("Assessing employee in department:", dept);
    }
    
    useEffect(() => { 
      fetch(`/api/getDataEntryByDept?dept=${encodeURIComponent(dept)}`)
      .then(response => response.json())
      .then(data => {
            console.log('data', data)
            setData(data);
      })
      .catch(error => console.log('error:', error))
   }, [dept])

    return (
        <>
        {
            data?.map((item: { dept: string; pesuser_name: string }, index: number) => {
                return (
                    <div  className={`flex justify-between p-6 my-2 mx-4 border rounded-md bg-white`} >
                        <div className="flex flex-col my-auto">
                            <p className='font-semibold text-md'>{item.pesuser_name}</p>
                            <p className='text-gray-300 text-sm'> {item.dept}</p>
                        </div>

                        <a 
                            className='text-pes border border-pes rounded-md py-3 px-8 hover:text-white hover:bg-pes transition-all' 
                        >
                            Assess Employee
                        </a>
                    </div>                    
                )
            })
        }        
        </>

  
    );
}