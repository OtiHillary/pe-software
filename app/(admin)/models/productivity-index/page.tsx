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
    const [data, setData] = useState<{ output: number, input: number }>({
        output: 0,
        input: 0
    });
    const [result, setResult] = useState<number | null>(null);
    const [users, setUsers] = useState<UserData[]>([]);
    const [userOption, setUserOption] = useState<UserData | null>(null);
    const [save, setSave] = useState(false)

    function prod_index() {
        setResult(data.output / data.input);
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
                    payload: "productivity",
                    productivity: result
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
            <h1 className="font-bold text-3xl my-6">Productivity index</h1>

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
                    Output resources(uninflated)
                    <input onChange={handleChange} name="output" required className="border me-6 mb-3 px-16 py-2 rounded" type="number" value={data.output}/>
                </label>

                <label htmlFor="" className="flex flex-col w-72">
                    Input resources(uninflated)
                    <input onChange={handleChange} name="input" required className="border me-6 mb-3 px-16 py-2 rounded" type="number" value={data.input} />
                </label>
            </div>

            <p className="text-green-500">{ result? 'successful': '' }</p>

            <div className="flex mx-4">
                <a className="bg-pes cursor-pointer w-fit my-3 me-2 rounded text-white px-32 py-3" onClick={prod_index}>Evaluate</a>
                <button className="bg-pes disabled:bg-gray-400 w-fit my-3 me-2 rounded text-white px-32 py-3" onClick={handleSubmit} disabled = { save? false: true }>Save</button>
            </div>

        </form>
    )
}