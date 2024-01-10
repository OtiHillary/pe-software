import { useState } from 'react';

export default function Dept ({ data, key }){
   const [loading, setLoading] = useState(false)
   const [loaded, setLoaded] = useState(false)
   const [expand, setExpand] = useState(false)

   function assess(){
      setLoading(!loading)

      setTimeout(() => {
         setLoading(!loading)
         setLoaded(true)
      }, 2000);
   }

   return(
         <>
         {
            loaded?
            <div className='flex flex-col border rounded-md bg-white my-2 mx-4'>
               <div key={key} className={`flex justify-between p-6`} >
                  <div className="flex flex-col my-auto">
                     <p className='font-semibold text-md'>{data.dept} department</p>
                     <p className='text-gray-300 text-sm'>{data.entries} data entries recorded</p>
                  </div>

                  <p className={`${data.completed? 'text-green-500': 'text-red-500'} my-auto`}>{data.info}</p>

                  {
                     data.completed?
                     <div className='flex flex-col'>
                        <a role='button' className='flex justify-center text-white bg-pes border border-pes rounded-md py-3 px-8 mb-1 w-[212px] hover:bg-pes transition-all' >
                           Share
                        </a>
                        <a role='button' className='flex justify-center text-pes border border-pes rounded-md py-3 px-8 mt-1 w-[212px] hover:text-white hover:bg-pes transition-all' >
                           View Result
                        </a>                        
                     </div>
                     :
                        <a role='button' className='text-pes border border-pes rounded-md py-3 px-8 hover:text-white hover:bg-pes transition-all' onClick={ () => setExpand(!expand) }>
                           Request Data Review
                        </a>
                  }


               </div> 
               {
                  expand?
                  <div className=''>
                     <hr className='flex w-[95%] mx-auto'/>
                     <ul className='px-6 py-3'>
                        {
                           data.assess.map((i, key) => {
                              return (
                                <li key={key} className='flex justify-between w-5/12 my-3'>
                                  <span className='flex'>
                                    <span className='relative h-10 w-10 my-auto mx-3'>
                                       <div className='absolute h-[0.6rem] w-[0.6rem] bg-green-500 rounded-full bottom-[4%] right-[5%]'></div>
                                       <img src='young oti.PNG' className='rounded-full w-10 h-10'/>
                                    </span>
                            
                                    <span className='flex flex-col my-auto'>
                                      {i.name}
                                      <span className="text-xs text-gray-300">
                                          {i.team}
                                      </span>
                                    </span>
                                  </span>
                            
                                  <span className="text-yellow-500 text-sm bg-yellow-100 rounded-full px-4 my-1 flex flex-col justify-center">
                                    {i.role}
                                  </span>
                                </li>
                              )
                            })
                            
                        }                        
                     </ul>
                  </div>
                  :
                  <></>
               }           
            </div>

            :
               <div key={key} className={`flex justify-between p-6 my-2 mx-4 border rounded-md bg-white`} >
                  <div className="flex flex-col my-auto">
                     <p className='font-semibold text-md'>{data.dept} department</p>
                     <p className='text-gray-300 text-sm'>{data.entries} data entries recorded</p>
                  </div>

                  {
                  loading?
                  <div className='flex justify-center w-[180px] py-1'>
                     <img src={`/loading.svg`} className='animate-spin' width={40}/>                              
                  </div>
                  :
                     <a role='button' className='text-pes border border-pes rounded-md py-3 px-8 hover:text-white hover:bg-pes transition-all' onClick={ () => assess() }>
                        Assess Employees
                     </a>
                  }
               </div>      
         }         
         </>
           

   )
}