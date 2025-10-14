'use client'

import React, { useEffect, useState } from 'react'
import { Add, SearchNormal1 } from 'iconsax-react'
import Link from 'next/link'

type User = {
  id: number
  name: string
  email: string
  password: string
  gsm: string
  role: string
  address: string
  faculty_college: string
  dob: string
  doa: string
  poa: string
  doc: string
  post: string
  dopp: string
  level: string
  image: string
  org: string
  dept: string
}

export default function Employee() {
  const [employees, setEmployees] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [assigning, setAssigning] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  function roleColor(role: string) {
    if (role === 'admin') return 'blue'
    if (role === 'auditor') return 'yellow'
    if (role === 'hod') return 'green'
    if (role === 'lecturer') return 'purple'
    if (role === 'industrial-engineer') return 'red'
    return 'gray'
  }

  useEffect(() => {
    async function getEmployees() {
      setLoading(true)
      try {
        const token = localStorage.getItem('access_token')
        const req = await fetch('/api/getEmployee', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })
        const res = await req.json()
        setEmployees(res)
      } catch (error) {
        console.error('Error fetching employees:', error)
        alert('Failed to fetch employees ❌')
      } finally {
        setLoading(false)
      }
    }

    getEmployees()
  }, [])

  const handleAssign = async () => {
    if (!selectedUserId) {
      alert('Please select a Unit Head first ⚠️')
      return
    }

    const selectedUser = employees.find((u) => u.id === selectedUserId)
    if (!selectedUser) {
      alert('Selected employee not found ❌')
      return
    }

    setAssigning(true)
    try {
      const token = localStorage.getItem('access_token')
      const res = await fetch('/api/assign-hod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: selectedUser.email,
          org: selectedUser.org || 'University of Lagos',
          dept: selectedUser.dept,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to assign HOD ❌')

      alert(`✅ ${data.message}`)
      setSelectedUserId(null)
    } catch (err) {
      console.error(err)
      alert(err instanceof Error ? err.message : 'Error assigning HOD ❌')
    } finally {
      setAssigning(false)
    }
  }

  return (
    <div className="flex justify-center w-full h-full">
      <div className="m-4 bg-white w-full h-full">
        {/* Header */}
        <div className="flex justify-between h-[5rem] max-md:py-2 max-md:h-fit w-full flex-row max-md:flex-col max-md:gap-2">
          {/* <div className="flex justify-between my-auto mx-4">
            <label htmlFor="em-search" className="relative h-fit max-md:w-full bg-white">
              <SearchNormal1 className="text-gray-300 absolute top-1/2 left-6 -translate-y-1/2" size={20} />
              <input
                type="text"
                placeholder="Search for Employee"
                className="placeholder:text-xs placeholder:text-gray-300 max-md:w-full focus:ring-gray-400 focus:border-gray-400 bg-[#fafafa] border-gray-50 h-[2.5rem] ps-16 "
              />
            </label>
          </div> */}

          <div className="flex items-center gap-3 mx-4 text-xs">
            <a
              href="/em-database/add-employee"
              className="flex justify-center bg-pes text-white px-10 py-2 m-2 border h-fit border-pes my-auto text-center"
            >
              <span className="my-auto">Add an Employee</span>
              <Add size={20} className="my-auto ms-2" />
            </a>

            <a
              href="/em-database/add-auditor"
              className="flex justify-center bg-blue-600 text-white px-10 py-2 m-2 border h-fit border-pes my-auto text-center"
            >
              <span className="my-auto">Add an External Auditor</span>
              <Add size={20} className="my-auto ms-2" />
            </a>

            {/* Input and Assign */}
            <div className="flex items-center gap-2">
              <select
                value={selectedUserId ?? ''}
                onChange={(e) => setSelectedUserId(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pes"
              >
                <option value="">Select Unit Head</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} — {emp.role}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAssign}
                disabled={assigning}
                className={`flex border border-pes text-pes px-4 py-2 rounded hover:bg-gray-50 ${
                  assigning ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {assigning ? 'Assigning...' : 'Assign Dept Admin'}
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full text-bold flex flex-col">
          <div className="rw bg-[#fafafa] h-12 w-full flex text-gray-400">
            <div className="w-[10%] my-auto ms-4">S/N</div>
            <div className="w-[35%] my-auto ms-4">Name</div>
            <div className="w-[30%] my-auto ms-4">Role</div>
            <div className="w-[25%] my-auto ms-4">Dept</div>
          </div>

          <div className="flex flex-col justify-between">
            {loading ? (
              <div className="flex flex-col w-full">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rw h-12 my-1 w-full flex bg-gray-100 rounded-md animate-pulse"></div>
                ))}
              </div>
            ) : employees.length > 0 ? (
              employees.map((i, key) => (
                <Link
                  href={`/em-database/${i.id}`}
                  key={i.id}
                  className="rw h-12 w-full flex my-1 hover:bg-slate-50"
                >
                  <div className="w-[10%] my-auto font-semibold ms-4">{key + 1}</div>
                  <div className="w-[35%] my-auto font-semibold ms-4 flex flex-col">
                    {i.name}
                    <span className="font-thin text-xs">{i.email}</span>
                  </div>
                  <div className={`w-[30%] my-auto font-semibold ms-4`}>
                    <p
                      className={`rounded-full w-fit px-4 py-1 bg-${roleColor(
                        i.role
                      )}-100 text-${roleColor(i.role)}-500`}
                    >
                      {i.role}
                    </p>
                  </div>
                  <div className="w-[25%] my-auto font-semibold ms-4">{i.dept}</div>
                </Link>
              ))
            ) : (
              <div className="p-3 text-gray-400 text-sm text-center">No employees found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
