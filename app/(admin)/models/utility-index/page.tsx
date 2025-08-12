'use client'
import React, { useState, useEffect } from "react";

interface UserData {
  id: string;
  name: string;
  dept: string;
  role: 'academic' | 'non-academic' | 'hod' | 'dean' | 'personnel';
  hasSubmitted: boolean;
}

export default function Home() {
    const [data, setData] = useState<{ used: number, given: number }>({
        used: 0,
        given: 0
    });
    const [result, setResult] = useState<number | null>(null);
    const [users, setUsers] = useState<UserData[]>([]);
    const [userOption, setUserOption] = useState<UserData | null>(null);
    const [save, setSave] = useState(false)

    function util_index() {
        setResult(data.used / data.given);
        setSave(true)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: parseFloat(value)
        }));
    }

    function handleSubmit() {
        console.log('lets save')
        // Here you can handle the form submission, e.g., save the data to a database
        fetch('/api/addPersonnelIndex', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
                    user_id: userOption?.id,
                    dept: userOption?.dept,
                    payload: "utility",
                    utility: result
                })
            })
            .catch(err => console.error('Error saving data:', err))
            .finally(() => {
                setSave(false);
                setResult(null);
            });

        console.log('Form submitted:', data);
    }

    useEffect(() => {
        const userToken = localStorage.getItem('access_token') || '{}';
        async function fetchUsers() {
            const response = await fetch('/api/getUsers', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: userToken }),
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        }

        fetchUsers();
    }, []);

    return (
        <form className="flex flex-col m-4">
            <h1 className="font-bold text-3xl my-6">Utilization index</h1>

            <div className='p-1 mb-2'>
                <label htmlFor="user" className='flex'>
                <p className='my-auto'>Select User:</p>
                <select name="" id="user" className='m-2 p-2 rounded-md border' onChange={(e) => { setUserOption(JSON.parse(e.target.value)) }} required>
                    <option value="">No user selected</option>

                    {users?.map(user => (
                    <option key={user.id} value={JSON.stringify(user)}>
                        {user.name}
                    </option>
                    ))}
                </select>
                </label>           
            </div>

            <div className="flex m-4">
                <label htmlFor="" className="flex flex-col w-72">
                    Used hours
                    <input onChange={handleChange} name="used" required className="border me-6 mb-3 px-16 py-2 rounded" type="number"  value={data.used}/>
                </label>

                <label htmlFor="" className="flex flex-col w-72">
                    Given hours
                    <input onChange={handleChange} name="given" required className="border me-6 mb-3 px-16 py-2 rounded" type="number"  value={data.given}/>
                </label>                
            </div>

            <p className="text-green-500">{ result? 'successful': '' }</p>

            <div className="flex mx-4">
                <a className="bg-pes cursor-pointer w-fit my-3 me-2 rounded text-white px-32 py-3" onClick={util_index}>Evaluate</a>
                <button className="bg-pes disabled:bg-gray-400 w-fit my-3 me-2 rounded text-white px-32 py-3" onClick={handleSubmit} disabled = { save? false: true }>Save</button>
            </div>

        </form>
    )
}