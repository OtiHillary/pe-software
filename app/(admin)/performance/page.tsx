export default function Home(){
   return (
      <div className='flex flex-col m-8 bg-white'>
         <div className='nav flex justify-between bg-white h-[4rem] w-full text-md border border-slate-50'>
            <h1 className="text-2xl m-3 font-bold">Performance review</h1>
         </div>
         
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
   )
}