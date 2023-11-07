import { TickCircle, UserTick } from "iconsax-react"
import Link from "next/link"

export default function Home() {
   return(
      <main className="w-full flex flex-col">
         <div className= "px-12 pt-8 pb-4 ms-6 mt-6 me-6 border-b border-gray-100 bg-white">
            <h1 className="text-xl my-3 font-bold">Pricing</h1>
            <p className="text-sm">Simple pricing. No hidden fees. Advanced features for your company</p>
         </div>

         <div className="px-12 py-6 mx-6 bg-white flex justify-between">
            <div className="price-card bg-white h-112 w-72 border rounded-3xl flex flex-col justify-between p-4">
               <div className="flex flex-col">
                  <div className="bg-blue-100 text-pes rounded-full py-1 px-2 text-center mb-2 font-light text-sm">Current plan</div>

                  <div className="des my-2 pb-4 border-b border-gray-50">
                     <h1 className="text-lg font-bold">Basic</h1>
                     <h1 className="text-5xl text-black">
                        $150
                        <span className="text-gray-300 text-xs font-bold">/year</span>
                     </h1>
                  </div>

                  <ul className="feature pb-4 border-b border-gray-50 font-light text-sm">
                     <li className="flex">
                        <p className="me-4">
                           {String.fromCharCode(10004)} 
                        </p>
                        feature goes here
                     </li>
                     <li className="flex">
                        <p className="me-4">
                           {String.fromCharCode(10004)} 
                        </p> 
                        feature goes here
                     </li>
                     <li className="flex">
                        <p className="me-4">
                           {String.fromCharCode(10004)} 
                        </p> 
                        feature goes here
                     </li>
                  </ul>                       
               </div>

               <div className="button border border-pes rounded-md m-2 p-2 text-pes text-center">Renew plan</div>
            </div>

            <div className="price-card bg-white h-112 w-72 border rounded-3xl flex flex-col justify-between p-4">
               <div className="flex flex-col">
                  <div className="flex flex-col">
                     <div className="opacity-0 bg-blue-100 text-pes rounded-xl py-1 px-2 text-center mb-2">Current plan</div>

                     <div className="des my-2 pb-4 border-b border-gray-50">
                        <h1 className="text-lg font-bold">Standard</h1>
                        <h1 className="text-5xl text-black">
                           $150
                           <span className="text-gray-300 text-xs font-bold">/year</span>
                        </h1>
                     </div>

                     <ul className="feature pb-4 border-b border-gray-50 font-light text-sm">
                        <li className="flex">
                           <p className="me-4">
                              {String.fromCharCode(10004)} 
                           </p>
                           All features in Basic
                        </li>
                        <li className="flex">
                           <p className="me-4">
                              {String.fromCharCode(10004)} 
                           </p> 
                           feature goes here
                        </li>
                        <li className="flex">
                           <p className="me-4">
                              {String.fromCharCode(10004)} 
                           </p> 
                           feature goes here
                        </li>
                        <li className="flex">
                           <p className="me-4">
                              {String.fromCharCode(10004)} 
                           </p> 
                           feature goes here
                        </li>
                     </ul>                  
                  </div>

                  <p className="mt-4 text-sm">
                     Upgrade to the plan to with a one time payment of
                     <span className="text-black font-bold text-lg mx-1">
                        $300
                     </span>
                  </p>
               </div>


               <div className="button border border-pes bg-pes rounded-md m-2 p-2 text-white text-center">Upgrade</div>
            </div>

            <div className="price-card bg-pes h-112 w-72 border rounded-3xl flex flex-col justify-between p-4 text-white">
               <div className="flex flex-col">
                  <div className="flex flex-col">
                     <div className="py-1 px-2 mb-2 flex relative h-8">
                        <div className="bg-white opacity-20 rounded-xl w-full h-full"></div>
                        <p className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-light">Recommended</p>
                     </div>

                     <div className="des my-2 pb-4 border-b border-blue-400">
                        <h1 className="text-lg font-bold">Premium</h1>
                        <h1 className="text-5xl ">
                           $150
                           <span className="text-xs">/year</span>
                        </h1>
                     </div>

                     <ul className="feature pb-4 border-b border-gray-50 font-light text-sm">
                        <li className="flex">
                           <p className="me-4">
                              {String.fromCharCode(10004)} 
                           </p>
                           All features in Standard
                        </li>

                        <li className="flex">
                           <p className="me-4">
                              {String.fromCharCode(10004)} 
                           </p> 
                           feature goes here
                        </li>

                        <li className="flex">
                           <p className="me-4">
                              {String.fromCharCode(10004)} 
                           </p> 
                           feature goes here
                        </li>

                        <li className="flex">
                           <p className="me-4">
                              {String.fromCharCode(10004)} 
                           </p>
                           feature goes here
                        </li>

                        <li className="flex">
                           <p className="me-4">
                              {String.fromCharCode(10004)} 
                           </p> 
                           feature goes here
                        </li>

                        <li className="flex">
                           <p className="me-4">
                              {String.fromCharCode(10004)} 
                           </p> 
                           feature goes here
                        </li>
                     </ul>                      
                  </div>

                  <p className="mt-4 text-sm">
                     Upgrade to the plan to with a one time payment of
                     <span className="font-bold text-lg mx-1">
                        $300
                     </span>
                  </p>
               </div>


               <div className="button bg-white border border-white text-pes rounded-md m-2 p-2 text-center">Upgrade</div>
            </div>
         </div>

         <div className="flex flex-col px-12 p-12 ms-6 mb-6 me-6 bg-white">
            <h1 className="text-xl my-3 font-bold">Other Available Packages</h1>

            <div className="border border-gray-100 rounded-lg px-6 pb-6 flex flex-col">
               <div className="mainte flex justify-between py-4 mb-2 border-b border-gray-100">
                  <h1 className="font-bold my-auto">Maintenance model</h1>
                  <Link href={'#'} className="text-pes text-sm border border-pes rounded-md px-6 py-2 my-auto">
                     Request
                  </Link>
               </div>
               <p className="text-sm">
                  This maintenance model helps by providing the appropriate predictive maintenance intervals rightly due for your equipment(s). Thus, creating room for optimization by increasing the equipment utilization and efficiency as being provided by justly accommodating the benefits of the Just In Time (J-I-T) Inventory Management System method as well as reducing to the barest minimum the loss of resources and availability as a result of wastages etc. This maintenance model can be applied to equipment under the same category of likeness all at once and for multiple equipment use (individually) respectively.
               </p>
            </div>
         </div>
      </main>     
   )
}

