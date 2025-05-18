'use client'
import { ArrowLeft } from 'iconsax-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type user = {
    id:number
    name: string
    email: string 
    password: string
    gsm: string
    role: string
    address: string
    faculty_college: string
    dob: string
    doa: string
    poa : string
    doc : string
    post : string
    dopp: string
    level: string
    image : string
    org : string
}
const init = {
    id: 0,
    name: '',
    email: '', 
    password: '',
    gsm: '',
    role: '',
    address: '',
    faculty_college: '',
    dob: '',
    doa: '',
    poa : '',
    doc : '',
    post : '',
    dopp: '',
    level: '',
    image : '',
    org : '',
}


export default function Page({ params }: { params: { user: string } }){
    const access_token = localStorage.getItem('access_token') as string
    const [ expanded, setExpanded ] = useState(false)
    const [ databaseView, setDatabaseView ] = useState('profile')
    const [user, setUser] = useState<user>(init)
    const ImageFallback = () => <div className='w-40 h-40 rounded-md animate-pulse bg-gray-200'></div>
    const TextFallback = () => <><div className='w-60 h-3 my-1 rounded-full animate-pulse bg-gray-200'></div><div className='w-40 h-3 my-1 rounded-full animate-pulse bg-gray-200'></div></>
 
    useEffect( () => {
        async function fetchUser(){
           const data = await fetch('/api/getUserProfile', 
              {
                 method: "POST",
                 headers: {
                    "Content-Type": "application/json"
                 },
                 body: JSON.stringify({ user: params.user, token: access_token }) // Converting the data object to a JSON string
              }
           )
           let res = data.json()
           setUser(await res)
        }
        fetchUser()
    }, [access_token])



    return(
        <main className="w-full flex flex-col border bg-gray-50">
            <div className='nav flex justify-between bg-white h-[4rem] w-full text-gray-300 text-md border border-slate-50'>
                <ul className='flex mx-16 my-auto w-[30%] justify-between'>
                    <Link href={ `/em-database` }><ArrowLeft className='hover:text-pes'/></Link>
                    <li className={`border-2 cursor-pointer rounded-sm border-transparent ${ (databaseView == 'profile') ? 'text-blue-800 border-b-blue-800' : '' }`} onClick={ () => { setDatabaseView('profile') } }>Employee Profile</li>
                    <li className={`border-2 cursor-pointer rounded-sm border-transparent ${ (databaseView == 'performance') ? 'text-blue-800 border-b-blue-800' : '' }`} onClick={ () => { setDatabaseView('performance') } }>Performance Analysis</li>
                </ul>

                <div className='bg-red-100 cursor-pointer hover:bg-red-200 text-red-700 font-semibold px-12 py-2 h-fit w-fit mx-4 my-auto rounded-sm'>
                    Delete
                </div>
            </div>

            {
                databaseView == 'profile' ?
                    <div className='flex flex-col m-8 p-8 bg-white'>                
                        <div className="bg-gray-50 h-[3rem] flex justify-between">
                            <h1 className="my-auto mx-6 font-semibold">Employee details</h1>
                        </div>  
                        
                        <div className="details my-2">
                            <div className='(initial) flex justify-between'>
                                <div className='flex justify-between py-2'>
                                <div className='w-40 h-40 me-8'>
                                    {
                                        user?
                                            <img src={ `/${user.image}` } alt="profile-img" className='w-40 h-40'/>                   
                                        :
                                            <ImageFallback />
                                    }
                                </div>

                                <div className='flex flex-col'>
                                    <div className='my-2 flex flex-col'>
                                        {
                                            user?
                                            <>
                                                <p className='text-gray-400'>Name:</p>
                                                <p className='font-semibold text-lg'>{user.name}</p>                         
                                            </>
                    
                                            :
                                            <TextFallback/>                        
                                        }
                                    </div>

                                    <div className='my-2 flex flex-col'>
                                        {
                                            user?
                                            <>
                                            <p className='text-gray-400'>Functional GSM:</p>
                                            <p className='font-semibold text-lg'>{user.gsm}</p>                      
                                            </>
                                            
                                            :
                                            <TextFallback/>
                                        }
                                    </div>

                                    <div className='my-2 flex flex-col'>
                                        {
                                            user?
                                            <>
                                                <p className='text-gray-400'>Current home address:</p>
                                                <p className='font-semibold text-lg'>{user.address}</p>                            
                                            </>
                                            :
                                            <TextFallback />
                                        }
                                    </div>
                                </div>
                                </div>

                                <div className='flex flex-col min-w-[30rem] py-2 px-4'>
                                <div className='my-2 flex flex-col'>
                                    {
                                        user?
                                            <>
                                            <p className='text-gray-400'>Email:</p>
                                            <p className='font-semibold text-lg'>{user.email}</p>                             
                                            </>
                                        :
                                        <TextFallback />
                                    } 
                                </div>

                                <div className='my-2 flex flex-col'>
                                    {
                                        user?
                                            <>
                                            <p className='text-gray-400'>Present role:</p>
                                            <p className='font-semibold text-lg'>{user.role}</p>                           
                                            </>
                                        :
                                        <TextFallback />
                                    }
                                </div>

                                <div className='my-2 flex flex-col'>
                                    {
                                        user?
                                            <>
                                            <p className='text-gray-400'>Faculty/college:</p>
                                            <p className='font-semibold text-lg'>{user.faculty_college}</p>                             
                                            </>
                                        :
                                        <TextFallback />
                                    }
                                    
                                </div>

                                {/* <div className='my-2 flex flex-col'>
                                    <p className='text-gray-400'>Faculty/college:</p>
                                    <p className='font-semibold text-lg'>{}</p>
                                </div> */}
                                </div>
                            </div>

                            <div style={{ display: `${ expanded? '' : 'none' }` }}  className='(see more) flex flex-col justify-between'>
                                <div className='flex justify-between w-9/12'>
                                <div className='my-2 flex flex-col'>
                                    {
                                        user?
                                            <>
                                            <p className='text-gray-400'>Date of Birth:</p>
                                            <p className='font-semibold text-lg'>{user.dob?.toString().split('T')[0]}</p>                           
                                            </>
                                        :
                                        <TextFallback />
                                    }
                                </div>

                                <div className='my-2 flex flex-col'>
                                    {
                                        user?
                                            <>
                                            <p className='text-gray-400'>date of first Appointment:</p>
                                            <p className='font-semibold text-lg'>{user.doa?.toString().split('T')[0]}</p>                           
                                            </>
                                        :
                                        <TextFallback />
                                    }
                                </div>

                                <div className='my-2 flex flex-col'>
                                    {
                                        user?
                                            <>
                                            <p className='text-gray-400'>Post/grade of first appointment:</p>
                                            <p className='font-semibold text-lg'>{user.poa}</p>                           
                                            </>
                                        :
                                        <TextFallback />
                                    }

                                </div>

                                <div className='my-2 flex flex-col'>
                                    {
                                        user?
                                            <>
                                            <p className='text-gray-400'>Date of confirmation:</p>
                                            <p className='font-semibold text-lg'>{user.doc?.toString().split('T')[0]}</p>                        
                                            </>
                                        :
                                        <TextFallback />
                                    }
                                </div>
                                </div>

                                <div className='flex justify-between w-9/12'>
                                <div className='my-2 flex flex-col'>
                                    {
                                        user?
                                            <>
                                            <p className='text-gray-400'>Present Post:</p>
                                            <p className='font-semibold text-lg'>{user.post}</p>                        
                                            </>
                                        :
                                        <TextFallback />
                                    }
                                </div>

                                <div className='my-2 flex flex-col'>
                                    {
                                        user?
                                            <>
                                            <p className='text-gray-400'>Date appointed to present post:</p>
                                            <p className='font-semibold text-lg'>{user.dopp?.toString().split('T')[0]}</p>                        
                                            </>
                                        :
                                        <TextFallback />
                                    }
                                </div>

                                <div className='my-2 flex flex-col'>
                                    {
                                        user?
                                            <>
                                            <p className='text-gray-400'>Current Level/Step:</p>
                                            <p className='font-semibold text-lg'>{user.level}</p>                        
                                            </>
                                        :
                                        <TextFallback />
                                    }
                                </div>
                                </div>
                                
                                <div className='flex justify-between w-9/12'>
                                <div className='my-2 flex flex-col'>
                                    <p className='text-gray-400'>Academic certification:</p>
                                    <div>
                                        {
                                            // TODO - render certification here
                                        }
                                    </div>
                                </div>

                                </div>
                            </div>

                            <div className='flex justify-end'>
                                <p style={{ display: `${ expanded? 'none' : '' }` }} className={` text-blue-900 cursor-pointer hover:text-blue-950 underline text-md font-medium`} onClick={ () => setExpanded( prevState => !prevState ) }>See more</p>
                                <p style={{ display: `${ expanded? '' : 'none' }` }} className={`${ expanded? '' : 'none' } text-blue-900 cursor-pointer hover:text-blue-950 underline text-md font-medium`} onClick={ () => setExpanded( prevState => !prevState ) }>See less</p>
                            </div>
                        </div>

                        <div className="flex border">
                            <div className="border-r w-1/2">
                            <div className="bg-gray-50 border-b h-[3rem] flex">
                                <h1 className="my-auto mx-4 font-semibold">Reporting Hierachy</h1>
                            </div>
                            
                            <p className='p-4'>The 'Reporting Hierarchy' section shows the existing reporting structure for this employee. This hierarchy has been set according to their role and reporting relationships within the organization.</p>

                            <form className=" placeholder-slate-200 m-4">
                                <label htmlFor="description" className="flex">
                                    Reporting to:
                                    <input disabled type="text" className='border outline-1 outline-gray-200 rounded-[0.25rem] mt-1 font-thin px-4 py-2 pb-16' id="description" placeholder="Provide a brief description outlining the role's key responsibilities and purpose." />
                                </label>
                            </form>
                            </div>

                            <div className="w-1/2">
                            <div className="bg-gray-50 border-b h-[3rem] flex">
                                <h1 className="my-auto mx-4 font-semibold">Permission Settings</h1>
                            </div>

                            <form className=" placeholder-slate-300">
                                <div className='border-b p-4'>
                                    <p>The 'Permission Settings' section displays the current access and responsibilities assigned to this employee. These settings have been configured based on their role and responsibilities within the organization.</p>
                                </div>

                                <div className="border-b p-4">
                                    <label className="flex">
                                        <input disabled type="checkbox" checked className="h-6 w-6 mt-1 me-3" />
                                        <span className="w-10/12">
                                        <h1 className="text-lg">Manage User Roles</h1>
                                        <p>Create, edit, and delete user roles, defining their specific permissions and responsibilities.</p>
                                        </span>
                                    </label>
                                </div>

                                <div className="border-b p-4 flex flex-col">
                                    <label className="flex">
                                        <input disabled type="checkbox" checked className="h-6 w-6 mt-1 me-3" />
                                        <span className="w-10/12">
                                        <h1 className="text-lg">Access Employee Data</h1>
                                        <p>View and edit the details of employees.</p>
                                        </span>
                                    </label>
                                    <div className="flex ms-8 my-2 text-gray-400 text-sm font-extralight">
                                        <label className="flex me-4">
                                        <input disabled type="checkbox" className="me-1" />
                                        <span>All Employees</span>
                                        </label>     
                                        <label className="flex me-4">
                                        <input disabled type="checkbox" checked className="me-1" />
                                        <span>Subordinates</span>
                                        </label>     
                                        <label className="flex me-4">
                                        <input disabled type="checkbox" className="me-1" />
                                        <span>Selected Employees</span>
                                        </label>     
                                    </div>
                                </div>

                                <div className="border-b p-4 flex flex-col">
                                    <label className="flex">
                                        <input type="checkbox" checked className="h-6 w-6 mt-1 me-3" />
                                        <span className="w-10/12">
                                        <h1 className="text-lg">Define Performance Metrics</h1>
                                        <p>View and edit the performance metrics of employees.</p>
                                        </span>
                                    </label>
                                    <div className="flex ms-8 my-2 text-gray-400 text-sm font-extralight">
                                        <label className="flex me-4">
                                        <input type="checkbox" className="me-1" />
                                        <span>All Employees</span>
                                        </label>     
                                        <label className="flex me-4">
                                        <input type="checkbox" checked className="me-1" />
                                        <span>Subordinates</span>
                                        </label>     
                                        <label className="flex me-4">
                                        <input type="checkbox" className="me-1" />
                                        <span>Selected Employees</span>
                                        </label>     
                                    </div>
                                </div>

                                <div className="border-b p-4 flex flex-col">
                                    <label className="flex">
                                        <input type="checkbox" checked className="h-6 w-6 mt-1 me-3" />
                                        <span className="w-10/12">
                                        <h1 className="text-lg">Access Reporting Hierachy</h1>
                                        <p>Define and modify the organizational reporting structure, assigning managers to employees and creating teams.</p>
                                        </span>
                                    </label>
                                </div>

                                <div className="border-b p-4 flex flex-col">
                                    <label className="flex">
                                        <input type="checkbox" checked className="h-6 w-6 mt-1 me-3" />
                                        <span className="w-10/12">
                                        <h1 className="text-lg">Manage Performance Reviews</h1>
                                        <p>Schedule, modify, or cancel performance review meetings for any employee.</p>
                                        </span>
                                    </label>
                                    <div className="flex ms-8 my-2 text-gray-400 text-sm font-extralight">
                                        <label className="flex me-4">
                                        <input type="checkbox" className="me-1" />
                                        <span>All Employees</span>
                                        </label>     
                                        <label className="flex me-4">
                                        <input type="checkbox" checked className="me-1" />
                                        <span>Subordinates</span>
                                        </label>     
                                        <label className="flex me-4">
                                        <input type="checkbox" className="me-1" />
                                        <span>Selected Employees</span>
                                        </label>     
                                    </div>
                                </div>

                            </form>
                            </div>
                        </div>            
                    </div>            
                :
                    <div className='flex flex-col mx-8 bg-white'>
                        <div className="bg-gray-50 h-[3rem] flex justify-between">
                            <h1 className="my-auto mx-6 font-semibold">Last Assessment Result</h1>
                        </div>  

                        <div className='bg-white p-4'>
                            <div className='flex justify-between my-3'>
                                <p className='w-6/12 font-semibold text-lg'>Appraisal</p>
                                <p className='w-3/12 text-red-500'>210</p>
                                <p className='w-3/12 text-red-500'>fair</p>
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-semibold my-3 text-lg'>Performance</p>
                                <div className='flex justify-between py-3 border-b border-[#cfcfcf1a]'>
                                    <p className='w-6/12'>Competence</p>
                                    <p className='w-3/12 text-yellow-500'>65%</p>
                                    <p className='w-3/12 text-yellow-500'>4th class(Good)</p>
                                </div>
                                <div className='flex justify-between py-3 border-b border-[#cfcfcf1a]'>
                                    <p className='w-6/12'>Integrity</p>
                                    <p className='w-3/12 text-green-500'>89%</p>
                                    <p className='w-3/12 text-green-500'>2nd class(Excellent)</p>
                                </div>
                                <div className='flex justify-between py-3 border-b border-[#cfcfcf1a]'>
                                    <p className='w-6/12'>Compatibility</p>
                                    <p className='w-3/12 text-red-500'>24%</p>
                                    <p className='w-3/12 text-red-500'>6th class(Poor)</p>
                                </div>
                                <div className='flex justify-between py-3 border-b border-[#cfcfcf1a]'>
                                    <p className='w-6/12'>Use of resources</p>
                                    <p className='w-3/12 text-red-500'>24%</p>
                                    <p className='w-3/12 text-red-500'>6th class(Poor)</p>
                                </div>
                            </div>

                            <div>
                                <p className='font-semibold my-3 text-lg'>Stress Factor</p>

                                <div className='flex justify-between py-3 border-b border-[#cfcfcf1a]'>
                                    <p className='w-6/12'>Stress level</p>
                                    <p className='w-3/12 text-yellow-500'>65%</p>
                                    <p className='w-3/12 text-yellow-500'>4th class(Good)</p>
                                </div>
                                <div className='flex justify-between py-3 border-b border-[#cfcfcf1a]'>
                                    <p className='w-6/12'>Time Pressure Stress level</p>
                                    <p className='w-3/12 text-green-500'>89%</p>
                                    <p className='w-3/12 text-green-500'>2nd class(Excellent)</p>
                                </div>
                                <div className='flex justify-between py-3 border-b border-[#cfcfcf1a]'>
                                    <p className='w-6/12'>Conflict Stress Level</p>
                                    <p className='w-3/12 text-red-500'>24%</p>
                                    <p className='w-3/12 text-red-500'>6th class(Poor)</p>
                                </div>
                                <div className='flex justify-between py-3 border-b border-[#cfcfcf1a]'>
                                    <p className='w-6/12'>Total stress frequency</p>
                                    <p className='w-3/12 text-red-500'>24%</p>
                                    <p className='w-3/12 text-red-500'>6th class(Poor)</p>
                                </div>
                                <div className='flex justify-between py-3 border-b border-[#cfcfcf1a]'>
                                    <p className='w-6/12'>Major feelings based on stress category</p>
                                    <p className='w-3/12 text-red-500'>24%</p>
                                    <p className='w-3/12 text-red-500'>6th class(Poor)</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 h-[3rem] flex justify-between">
                            <h1 className="my-auto mx-6 font-semibold">Acheivements</h1>
                        </div>  


                        <div className='bg-white p-4 min-h-[10rem]'>
                        </div>
                    </div> 
            }
        </main>     
     )
}