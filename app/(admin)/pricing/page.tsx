"use client";
import Link from "next/link";
import Subscriptionbutton from "../../components/subscription/paypal";
import PayPalProviderWrapper from "../../components/subscription/paypalWrapper";
import PaystackButton from "@/app/components/subscription/paystackButton";
import { packages } from "../../lib/utils/packages";
import { Suspense } from "react";

export default function Home() {
  return (
   <PayPalProviderWrapper >
      <main className="w-full flex flex-col">
      {/* Header */}
      <div className="px-12 pt-8 pb-4 ms-6 mt-6 me-6 border-b border-gray-100 bg-white">
         <h1 className="text-2xl my-3 font-bold">Pricing</h1>
         <p className="text-sm">Simple pricing. No hidden fees. Advanced features for your company</p>
      </div>

      {/* Cards */}
      <div className="px-8 py-8 mx-6 bg-white flex justify-center flex-wrap gap-14">
         {/* Basic Plan */}
         <div className="price-card bg-white h-112 w-72 border rounded-3xl flex flex-col justify-between p-4">
            <div className="flex flex-col">
            <div className="bg-blue-100 text-pes rounded-full py-1 px-2 text-center mb-2 font-light text-sm">
               Current plan
            </div>
            <div className="des my-2 pb-4 border-b border-gray-50">
               <h1 className="text-lg font-bold">Basic</h1>
               <h1 className="text-5xl text-black">
                  {packages.basic ? `$${(packages.basic.price / 100).toFixed(0)}` : "-"}
                  <span className="text-gray-300 text-xs font-bold">/year</span>
               </h1>
            </div>
            <ul className="feature pb-4 border-b border-gray-50 font-light text-sm">
               <li className="flex">
                  <p className="me-4">{String.fromCharCode(10004)}</p> feature goes here
               </li>
            </ul>
            </div>

            {/* PayPal Button */}
            <div className="flex flex-col">
               <Suspense fallback={<button className="border-pes bg-white rounded-lg p-4">Loading...</button>}>
                  <Subscriptionbutton plan="basic" />
               </Suspense>

               <PaystackButton
                  email={"user@example.com"}               
                  planCode="PLN_w4hf2tk7k3mu66a"          
                  label="Subscribe"
               />
            </div>
         </div>

         {/* Standard Plan */}
         <div className="price-card bg-white h-112 w-72 border rounded-3xl flex flex-col justify-between p-4">
            <div className="flex flex-col">
            <div className="opacity-0 bg-blue-100 text-pes rounded-xl py-1 px-2 text-center mb-2">Current plan</div>
            <div className="des my-2 pb-4 border-b border-gray-50">
               <h1 className="text-lg font-bold">Standard</h1>
               <h1 className="text-5xl text-black">
                  {packages.standard ? `$${(packages.standard.price / 100).toFixed(0)}` : "-"}
                  <span className="text-gray-300 text-xs font-bold">/year</span>
               </h1>
            </div>
            <ul className="feature pb-4 border-b border-gray-50 font-light text-sm">
               <li className="flex">
                  <p className="me-4">{String.fromCharCode(10004)}</p> All features in Basic
               </li>
               <li className="flex">
                  <p className="me-4">{String.fromCharCode(10004)}</p> feature goes here
               </li>
            </ul>
            <p className="mt-4 text-sm">
               Upgrade with one time payment of <span className="text-black font-bold text-lg mx-1">$300</span>
            </p>
            </div>

            {/* PayPal Button */}
            <div className="">
               <Suspense fallback={<button className="border-pes bg-white rounded-lg p-4">Loading...</button>}>
                  <Subscriptionbutton plan="standard" />
               </Suspense>

               <PaystackButton
                  email={"user@example.com"}               
                  planCode="PLN_pl6nmfsedqvm0oa"          
                  label="Subscribe"
               />
            </div>
         </div>

         {/* Premium Plan */}
         <div className="price-card bg-my bg-center h-112 w-72 border rounded-3xl flex flex-col justify-between p-4 text-white">
            <div className="flex flex-col">
            <div className="py-1 px-2 mb-2 flex relative h-8">
               <div className="bg-white opacity-20 rounded-xl w-full h-full"></div>
               <p className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-light">
                  Recommended
               </p>
            </div>
            <div className="des my-2 pb-4 border-b border-blue-400">
               <h1 className="text-lg font-bold">Premium</h1>
               <h1 className="text-5xl ">{packages.premium ? `$${(packages.premium.price / 100).toFixed(0)}` : "-"}<span className="text-xs">/year</span></h1>
            </div>
            <ul className="feature pb-4 border-b border-gray-50 font-light text-sm">
               <li className="flex">
                  <p className="me-4">{String.fromCharCode(10004)}</p> All features in Standard
               </li>
               <li className="flex">
                  <p className="me-4">{String.fromCharCode(10004)}</p> feature goes here
               </li>
            </ul>
            <p className="mt-4 text-sm">
               Upgrade with one time payment of <span className="font-bold text-lg mx-1">$300</span>
            </p>
            </div>

            {/* Buttons Button */}
            <div className="">
               <Suspense fallback={<button className="border-pes bg-white rounded-lg p-4">Loading...</button>}>
                  <Subscriptionbutton plan="premium" />
               </Suspense>

               <PaystackButton
                  email={"user@example.com"}               
                  planCode="PLN_bquiv8u3t2otwuh"          
                  label="Subscribe"
               />
            </div>
         </div>
      </div>

      {/* Other Packages */}
      <div className="flex flex-col px-12 p-12 ms-6 mb-6 me-6 bg-white">
         <h1 className="text-xl my-3 font-bold">Other Available Packages</h1>
         <div className="border border-gray-100 rounded-lg px-6 pb-6 flex flex-col">
            <div className="mainte flex justify-between py-4 mb-2 border-b border-gray-100">
            <h1 className="font-bold my-auto">Maintenance model</h1>
            <Link href={"#"} className="text-pes text-sm border border-pes rounded-md px-6 py-2 my-auto">
               Request
            </Link>
            </div>
            <p className="text-sm">
               This maintenance model helps by providing the appropriate predictive maintenance intervals rightly due for your equipment(s). Thus, creating room for optimization by increasing the equipment utilization and efficiency as being provided by justly accommodating the benefits of the Just In Time (J-I-T) Inventory Management System method as well as reducing to the barest minimum the loss of resources and availability as a result of wastages etc. This maintenance model can be applied to equipment under the same category of likeness all at once and for multiple equipment use (individually) respectively.
            </p>
         </div>
      </div>
      </main>
   </PayPalProviderWrapper>
  );
}


