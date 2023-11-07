export default function Home() {
   return(
      <main className="w-full flex flex-col">
         <div className= "px-12 pt-8 ms-6 mt-6 me-6 border-b bg-white">
            <h1 className="font-bold">Pricing</h1>
            <p className="">Simple pricing. No hidden fees. Advanced features for your company</p>
         </div>

         <div className="px-12 py-2 mx-6 bg-white flex justify-between">
            <div className="price-card bg-white h-100 w-72 border rounded-3xl flex flex-col justify-between p-4">
               <div className="flex flex-col">
                  <div className="bg-blue-100 text-pes rounded-xl py-1 px-2 text-center mb-2">Current plan</div>

                  <div className="des my-2">
                     <h1 className="text-lg">Basic</h1>
                     <h1 className="text-5xl text-black">
                        $150
                        <span className="text-gray-300 text-xs font-bold">/year</span>
                     </h1>
                  </div>

                  <div className="feature">
                     <li>feature goes here</li>
                     <li>feature goes here</li>
                     <li>feature goes here</li>
                  </div>                  
               </div>

               <div className="button border border-pes rounded-md m-2 p-2 text-pes text-center">Renew plan</div>
            </div>

            <div className="price-card bg-white h-100 w-72 border rounded-3xl flex flex-col justify-between p-4">
               <div className="flex flex-col">
                  <div className="des my-2">
                     <h1 className="text-lg">Basic</h1>
                     <h1 className="text-5xl text-black">
                        $200
                        <span className="text-gray-300 text-xs font-bold">/year</span>
                     </h1>
                  </div>

                  <div className="feature">
                     <li>feature goes here</li>
                     <li>feature goes here</li>
                     <li>feature goes here</li>
                  </div>                  
               </div>

               <div className="button border border-pes rounded-md m-2 p-2 text-pes text-center">Renew plan</div>
            </div>

            <div className="price-card bg-pes h-100 w-72 border rounded-3xl flex flex-col justify-between p-4 text-white">
               <div className="flex flex-col">
                  <div className="bg-white text-white opacity-30 rounded-xl py-1 px-2 text-center mb-2">Current plan</div>

                  <div className="des my-2">
                     <h1 className="text-lg">Basic</h1>
                     <h1 className="text-5xl ">
                        $150
                        <span className="text-xs">/year</span>
                     </h1>
                  </div>

                  <div className="feature">
                     <li>feature goes here</li>
                     <li>feature goes here</li>
                     <li>feature goes here</li>
                  </div>                  
               </div>

               <div className="button bg-white border border-white text-pes rounded-md m-2 p-2 text-center">Renew plan</div>
            </div>
         </div>

         <div className=""></div>
      </main>     
   )
}

