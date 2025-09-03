// /app/appraisal/staff-development/page.tsx
'use client'
import { useState } from 'react'
import { jwtDecode } from "jwt-decode";

type JWTPayload = {
  name?: string;
  role?: string;
  org?: number;
};

type UserData = { id: string; name: string }

const staffDevCriteria = [
  { id: 'training', name: 'Training & Workshops Attended', maxScore: 25 },
  { id: 'certifications', name: 'Certifications Obtained', maxScore: 25 },
  { id: 'seminars', name: 'Seminars / Conferences Attended', maxScore: 25 },
  { id: 'self_learning', name: 'Self-Directed Learning & Improvement', maxScore: 25 },
]

export default function StaffDevelopmentAssessment() {
  const [scores, setScores] = useState<Record<string, number>>({})

  const handleUpdate = (id: string, val: number) => {
    const crit = staffDevCriteria.find(c => c.id === id)
    setScores(prev => ({
      ...prev,
      [id]: Math.min(Math.max(val, 0), crit?.maxScore ?? 0),
    }))
  }

  const calculateTotal = () =>
    staffDevCriteria.reduce((t, c) => t + (scores[c.id] || 0), 0)

  const save = async () => {
    const token = localStorage.getItem("access_token")
    const user: JWTPayload = jwtDecode(token || "");
    console.log(user?.name)

    try {
      await fetch('/api/saveAppraisal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pesuser_name: user.name,
          payload: 'staff_development_evaluation',
          staff_development_evaluation: calculateTotal(),
        }),
      })
      alert('Staff Development Assessment saved ✅')
    } catch {
      alert('Error saving assessment ❌')
    }
  }

  return (
    <div className="w-full p-12 space-y-6">
      <h1 className="text-2xl font-bold">Staff Development & Training Assessment</h1>
      <p className="text-gray-600">Evaluation of training, certifications, and professional growth</p>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-yellow-100">
            <th className="p-2 border">Criterion</th>
            <th className="p-2 border">Max</th>
            <th className="p-2 border">Score</th>
          </tr>
        </thead>
        <tbody>
          {staffDevCriteria.map(c => (
            <tr key={c.id}>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2 text-center">{c.maxScore}</td>
              <td className="border p-2 text-center">
                <input
                  type="number"
                  min={0}
                  max={c.maxScore}
                  value={scores[c.id] || ''}
                  onChange={e => handleUpdate(c.id, parseFloat(e.target.value))}
                  className="w-20 border rounded text-center"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="font-semibold">Total Score: {calculateTotal()}</div>

      <button onClick={save} className="bg-pes text-white px-6 py-2 rounded">
        Save Assessment
      </button>
    </div>
  )
}
