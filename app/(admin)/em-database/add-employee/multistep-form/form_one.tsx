'use client'

type FormProps = {
   formdata: Record<string, any>;
   setFormdata: (data: Record<string, any>) => void;
};

export default function Formone({ formdata, setFormdata }: FormProps){

   return(
      <div className='flex flex-col'>
         <div className='flex pt-4'>
            <div className="w-1/2 mx-8">
               <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='my-2 text-sm'>{`Employee's Full Name:`}</label>
                    <input name="name" onChange={ (event) => setFormdata({...formdata, [event?.target.name]: event.target.value }) } type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder="Enter the Employee's first name and last name" />
                </div>

                <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='my-2 text-sm'>Current Home Address:</label>
                    <input name="address" onChange={ (event) => setFormdata({...formdata, [event?.target.name]: event.target.value }) } type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Home address' />
                </div>
                <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='my-2 text-sm'>Faculty/College:</label>
                    <input name="faculty_college" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Select a faculty'/>
                </div>
            </div>

            <div className="w-1/2 mx-8">
               <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor="" className='my-2 text-sm'>{`Employee's Email Address:`}</label>
                    <input name="email" onChange={ (event) => setFormdata({...formdata, [event?.target.name]: event.target.value }) } type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder="Enter the Employee's email address" />
                </div>

                <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor="" className='my-2 text-sm'>Functional G.S.M:</label>
                    <input name="gsm" onChange={ (event) => setFormdata({...formdata, [event?.target.name]: event.target.value }) } type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='gsm' />
                </div>

                <div className="formgroup flex flex-col my-2 w-full">
                    <label htmlFor=""className='my-2 text-sm'>Department:</label>
                    <input  name="dept" onChange={ (event) => setFormdata({...formdata, [event?.target.name]: event.target.value }) } type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Select a Department' />
                </div>
            </div>
         </div>

         <div className="w-[95%] mx-auto flex justify-between">
            <div className="formgroup flex flex-col">
               <label htmlFor="" className='my-2 text-sm'>{`Date of birth:`}</label>
               <input name="dob" onChange={ (event) => setFormdata({...formdata, [event?.target.name]: event.target.value }) } type="date" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder="Enter the Employee's dob" />
            </div>

            <div className="formgroup flex flex-col">
               <label htmlFor=""className='my-2 text-sm'>Date of first appointment:</label>
               <input name="doa" onChange={ (event) => setFormdata({...formdata, [event?.target.name]: event.target.value }) } type="date" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Date of first appointment' />
            </div>

            <div className="formgroup flex flex-col">
               <label htmlFor=""className='my-2 text-sm'>Post/grade of first appointment:</label>
               <input name="post" onChange={ (event) => setFormdata({...formdata, [event?.target.name]: event.target.value }) } type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Post of first appointment' />
            </div>

            <div className="formgroup flex flex-col">
               <label htmlFor=""className='my-2 text-sm'>Date of confirmation:</label>
               <input name='doc' onChange={ (event) => setFormdata({...formdata, [event?.target.name]: event.target.value }) } type="date" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Date of appointment' />
            </div>
         </div>

         <div className="w-[80%] ms-8 me-auto mb-4 flex justify-between">
            <div className="formgroup flex flex-col">
               <label htmlFor="" className='my-2 text-sm'>Present post:</label>
               <input name="role" onChange={ (event) => setFormdata({...formdata, [event?.target.name]: event.target.value }) } type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder="Present post" />
            </div>

            <div className="formgroup flex flex-col">
               <label htmlFor=""className='my-2 text-sm'>Date appointed to present post:</label>
               <input name="dopp" onChange={ (event) => setFormdata({...formdata, [event?.target.name]: event.target.value }) } type="date" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='' />
            </div>

            <div className="formgroup flex flex-col">
               <label htmlFor=""className='my-2 text-sm'>Current level:</label>
               <input name="level" onChange={ (event) => setFormdata({...formdata, [event?.target.name]: event.target.value }) } type="text" className='font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm' placeholder='Current level' />
            </div>
         </div>

         <div className="w-[50%] ms-8 me-auto mb-4 flex flex-col">
            <p className='text-sm text-pes my-3'>Academic & Professional Qualifications held: <span className="text-gray-300">{` (certificates must be attached)`}</span></p>
            <div className="flex flex-col bg-gray-50 rounded-xs p-4">
               <div className="flex justify-between m-2">
                  <input onChange={ (event) => setFormdata({...formdata, [event?.target.name]: event.target.value }) } id="title" type="text" placeholder="Title or Qualification" className="font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm" />

                  <select name="year" id="year" placeholder="Year Obtained" defaultValue={`Year Obtained`} className="font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border focus:border-gray-400 rounded-sm">
                     <option value="" className="text-gray-300">Year Obtained</option>
                  </select>
               </div>
               <div className="flex justify-between m-2">
                  <label htmlFor="file" className="w-[80%] my-auto">
                     <div className="flex justify-end bg-white rounded-sm w-11/12 relative">
                        <p className="m-auto text-sm text-gray-300">Choose File to Upload</p>
                        <div className="bg-gray-100 rounded-sm px-5 py-3 text-sm text-gray-500">Browse Files</div>
                     </div>
                     <input onChange={ (event) => setFormdata({...formdata, [event?.target.name]: event.target.value }) } type="file" name="file" id="file" className="invisible absolute"/>
                  </label>

                  <button className="border border-pes rounded-sm text-pes py-2 px-6">Save</button>
               </div>
            </div>
         </div>
      </div>
   )
}