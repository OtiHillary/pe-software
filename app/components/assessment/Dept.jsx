
export default function Dept ({ data, key }){
   return(
      <div key={key} className={`flex justify-between p-6 my-2 mx-4 border rounded-md bg-white`} >
         <div className="flex flex-col my-auto">
            <p className='font-semibold text-md'>{data.dept} department</p>
            <p className='text-gray-300 text-sm'>{data.total_unique_users} data entries recorded</p>
         </div>

         <a 
            className='text-pes border border-pes rounded-md py-3 px-8 hover:text-white hover:bg-pes transition-all' 
            href={`/evaluation?dept=${data.dept}`}
         >
            Assess Employees
         </a>
      </div>      
   )
}