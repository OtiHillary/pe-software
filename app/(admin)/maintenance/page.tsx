'use client'
import { useState } from "react"

export default function Home(){
    const [toolView, setToolView] = useState(false)

    return (
        <div className="p-8 relative">
            <div style={{ display: toolView? '': 'none' }} className="absolute z-10 mx-auto bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Add Tools Or Facilities (Inventory)</h2>
                    <div onClick={ () => setToolView( prev => !prev ) }  className="cursor-pointer">X</div>
                </div>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">Description of Facility:</label>
                            <input type="text" placeholder="Enter the description of the facility" className="w-full p-2 border border-gray-300 rounded"/>
                        </div>
                        <div>
                            <label className="block text-gray-700">Identification Symbol:</label>
                            <input type="text" placeholder="Enter the ID symbol of the facility" className="w-full p-2 border border-gray-300 rounded"/>
                        </div>
                        <div>
                            <label className="block text-gray-700">Location:</label>
                            <input type="text" placeholder="Enter the location of the facility" className="w-full p-2 border border-gray-300 rounded"/>
                        </div>
                        <div>
                            <label className="block text-gray-700">Facility Register ID Number:</label>
                            <input type="text" placeholder="Enter the Facility Register ID Number" className="w-full p-2 border border-gray-300 rounded"/>
                        </div>
                        <div>
                            <label className="block text-gray-700">Type:</label>
                            <input type="text" placeholder="Enter the Facility Type" className="w-full p-2 border border-gray-300 rounded"/>
                        </div>
                        <div>
                            <label className="block text-gray-700">Priority Rating: <a href="#" className="text-blue-600">what does this mean?</a></label>
                            <select className="w-full p-2 border border-gray-300 rounded">
                                <option>Select the priority rating</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700">Remarks:</label>
                            <input type="text" placeholder="Enter remarks" className="w-full p-2 border border-gray-300 rounded"/>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="bg-blue-900 text-white px-6 py-2 rounded">Save Changes</button>
                    </div>
                </form>
            </div>

            <h1 className="text-2xl font-semibold mb-4">Tools & Facilities</h1>
            <div className="flex items-center mb-4">
                <div className="relative flex-grow">
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input 
                        type="text" 
                        placeholder="Search any tool or facility" 
                        className="pl-10 pr-4 py-2 border rounded w-full"
                    />
                </div>
                <button onClick={ () => setToolView( prev => !prev ) } className="ml-4 px-4 py-2 bg-white border border-pes text-pes rounded">
                    + Add Tools or Facilities
                </button>
                <a href="/maintenance/inventory" className="ml-4 px-4 py-2 bg-blue-900 text-white rounded">
                    View Inventory Sheet
                </a>
            </div>

            <div className="space-y-2">
                <a href={ `maintenance/Electric Motor` } className="flex justify-between items-center p-4 bg-gray-100 rounded">
                    <span>Electric Motor</span>
                </a>
                <a href={ `` } className="flex justify-between items-center p-4 bg-gray-100 rounded">
                    <span>Diesel Engine</span>
                </a>
                <a href={ `` } className="flex justify-between items-center p-4 bg-gray-100 rounded">
                    <span>Electric Motor</span>
                </a>
                <a href={ `` } className="flex justify-between items-center p-4 bg-gray-100 rounded">
                    <span>Diesel Engine</span>
                </a>
            </div>
        </div>
    )
}