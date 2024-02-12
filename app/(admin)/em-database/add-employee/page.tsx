// MainForm.js
"use client";

import { useState } from 'react'
import Formone from './multistep-form/form_one'

export default function MainForm (){
    const [data, setData] = useState({
        name: "",
        email: "",
        dob: "",
        gender: "male",
        address: "",
    })

    const handleChange = (event) => {
        // const { name, value } = event.target;
        // setData({
        //     ...data,
        //     [name]: value,
        // });
    };


    const [activeTab, setActiveTab] = useState(0)

    const formElements = [
        <Formone key={0} data={data} handleChange={handleChange} />,
    ]

    return (
        <div className='bg-white m-4'>
            <div>
                {
                    formElements[activeTab]
                }
            </div>
            {/* <div className='flex flex-wrap gap-x-6 mx-auto'>
                <button
                    disabled = {activeTab === 0 ? "disabled" : ""}
                    onClick = {() => setActiveTab(prev => prev - 1)}
                    className = {`px-4 py-2 rounded-xl bg-blue-600 text-white ${activeTab === 0 ? "opacity-50 bg-slate-600" : "opacity-100"}`}>
                    Back
                </button>
                <button
                    disabled = {activeTab === formElements.length - 1 ? "disabled" : ""}
                    onClick = {() => setActiveTab(prev => prev + 1)}
                    className = {`px-4 py-2 rounded-xl bg-blue-600 text-white ${activeTab === formElements.length - 1 ? "opacity-50 bg-slate-600" : "opacity-100"}`}>Next</button>
                {
                    activeTab === formElements.length - 1 ? <button className='px-4 py-2 rounded-xl bg-blue-600 text-white' onClick={() => console.log(data)}>Submit</button> : null
                }
            </div> */}
        </div>
    )
}