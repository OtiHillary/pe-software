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
                  <div className="flex flex-col">
                     <p className='font-semibold text-md'>{data.dept} department</p>
                     <p className='text-gray-300 text-sm'>{data.entries} data entries recorded</p>
                  </div>

                  <p className={`${data.completed? 'text-green-500': 'text-red-500'} my-auto`}>{data.info}</p>



                  <a role='button' className='text-pes border border-pes rounded-md py-3 px-8 hover:text-white hover:bg-pes transition-all' onClick={ () => setExpand(!expand) }>
                     View Results
                  </a>
               </div> 
               {
                  expand?
                  <div className=''>
                     <hr className='flex w-[95%] mx-auto'/>
                     <ul className='px-6 py-3'>
                        {
                           data.assess.map((i, key) => {
                              return(
                                 <li key={key} className='flex justify-between w-4/12'>
                                    <span>
                                       {i.name}
                                    </span>
                                    
                                    <span>
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
                  <div className="flex flex-col">
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