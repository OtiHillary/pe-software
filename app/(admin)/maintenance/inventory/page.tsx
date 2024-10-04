'use client'
import { useEffect, useState } from "react"
import jwt, { JwtPayload } from "jsonwebtoken";

export default function Home() {
    const [inventory, setInventory] = useState([])
    useEffect(()=>{
        const access_token = localStorage.getItem('access_token') as any
        const tokenData = jwt.decode(access_token, 'oti')

        async function fetchInventory() {
            const data = await fetch('/api/getInventory', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tokenData)

            })
            const InventoryData = await data.json()
            setInventory(InventoryData)          
        }
        fetchInventory()
    }, [])
    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <i className="fas fa-arrow-left text-xl mr-2"></i>
                    <h1 className="text-2xl font-semibold">Inventory Sheet</h1>
                </div>
                <input 
                    type="text" 
                    placeholder="Search any tool or facility" 
                    className="border rounded-full px-4 py-2 w-1/3"
                />
            </div>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2 text-left">Identification Symbol</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Description of Facility</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Location</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Facility Register ID No</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Priority Rating</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        inventory.map((index, key) => (
                            <tr key={key}>
                                <td className="border border-gray-200 px-4 py-2">{ index.identification_symbol }</td>
                                <td className="border border-gray-200 px-4 py-2">{ index.description_of_facility }</td>
                                <td className="border border-gray-200 px-4 py-2">{ index.location }</td>
                                <td className="border border-gray-200 px-4 py-2">{ index.facility_register_id_no }</td>
                                <td className="border border-gray-200 px-4 py-2">{ index.type }</td>
                                <td className="border border-gray-200 px-4 py-2">{ index.priority_rating }</td>
                                <td className="border border-gray-200 px-4 py-2">{ index.remarks }</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}