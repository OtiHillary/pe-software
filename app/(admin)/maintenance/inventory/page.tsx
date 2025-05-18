'use client'
import { useEffect, useState } from "react"
import jwt, { JwtPayload } from "jsonwebtoken";
import { ArrowLeft } from "iconsax-react";

type InventoryItem = {
    identification_symbol: string;
    description_of_facility: string;
    location: string;
    facility_register_id_no: string;
    type: string;
    priority_rating: string;
    remarks: string;
};

export default function Home() {
    const [inventory, setInventory] = useState<InventoryItem[]>([])

    useEffect(()=>{
        const access_token = localStorage.getItem('access_token') as any
        const tokenData = jwt.decode(access_token)
        // console.log("token data is", tokenData);
        

        async function fetchInventory() {
            const data = await fetch('/api/getInventory', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tokenData)

            })
            const InventoryData = await data.json()
            console.log(InventoryData);
            setInventory(InventoryData)          
        }
        
        fetchInventory()
    }, [])

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <a href="/maintenance">
                        <ArrowLeft className="me-4"/>
                    </a>
                    <h1 className="text-2xl font-semibold">Inventory Sheet</h1>
                </div>
                {/* <input 
                    type="text" 
                    placeholder="Search any tool or facility" 
                    className="border rounded-full px-4 py-2 w-1/3"
                /> */}
            </div>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                    { 
                        inventory.map((item, key) => (
                            <tr key={key}>
                                <td className="border border-gray-200 px-4 py-2">{ item.identification_symbol }</td>
                                <td className="border border-gray-200 px-4 py-2">{ item.description_of_facility }</td>
                                <td className="border border-gray-200 px-4 py-2">{ item.location }</td>
                                <td className="border border-gray-200 px-4 py-2">{ item.facility_register_id_no }</td>
                                <td className="border border-gray-200 px-4 py-2">{ item.type }</td>
                                <td className="border border-gray-200 px-4 py-2">{ item.priority_rating }</td>
                                <td className="border border-gray-200 px-4 py-2">{ item.remarks }</td>
                            </tr>
                        ))
                    }
                        {/* <td className="border border-gray-200 px-4 py-2">{ index.identification_symbol }</td>
                        <td className="border border-gray-200 px-4 py-2">{ index.description_of_facility }</td>
                        <td className="border border-gray-200 px-4 py-2">{ index.location }</td>
                        <td className="border border-gray-200 px-4 py-2">{ index.facility_register_id_no }</td>
                        <td className="border border-gray-200 px-4 py-2">{ index.type }</td>
                        <td className="border border-gray-200 px-4 py-2">{ index.priority_rating }</td>
                        <td className="border border-gray-200 px-4 py-2">{ index.remarks }</td> */}
                    </tr>
                </thead>
            </table>
        </div>
    )
}