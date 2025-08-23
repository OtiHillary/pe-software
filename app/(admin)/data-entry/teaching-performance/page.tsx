// /app/appraisal/teaching-performance/page.tsx
'use client'
import { useEffect, useState } from 'react'

type UserData = { id: string; name: string }

const teachingCriteria = [
    { id: 'attendance', name: 'Attendance', maxScore: 8 },
    { id: 'punctuality', name: 'Punctuality', maxScore: 8 },
    { id: 'clarity', name: 'Clarity of presentation', maxScore: 20 },
    { id: 'lecture_plan', name: 'Implementation of lecture plan', maxScore: 15 },
    { id: 'continuous_assessment', name: 'Implementation of continuous assessment plan', maxScore: 15 },
    { id: 'quality_lectures', name: 'Quality, currency and depth of lectures', maxScore: 20 },
    { id: 'text_relevance', name: 'Relevance and adequacy of text and reference books', maxScore: 5 },
    { id: 'classroom_order', name: 'Maintenance of classroom order', maxScore: 5 },
    { id: 'student_response', name: 'Response to student\'s questions', maxScore: 4 }
];


export default function TeachingPerformanceAssessment() {
  const [users, setUsers] = useState<UserData[]>([])
  const [userOption, setUserOption] = useState<string | null>(null)
  const [scores, setScores] = useState<Record<string, number>>({})

  useEffect(() => {
    const userToken = localStorage.getItem('access_token') || '{}'
    async function fetchUsers() {
      const res = await fetch('/api/getUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: userToken }),
      })
      if (res.ok) setUsers(await res.json())
    }
    fetchUsers()
  }, [])

  const handleUpdate = (id: string, val: number) => {
    const crit = teachingCriteria.find(c => c.id === id)
    setScores(prev => ({
      ...prev,
      [id]: Math.min(Math.max(val, 0), crit?.maxScore ?? 0),
    }))
  }

  const calculateTotal = () =>
    teachingCriteria.reduce((t, c) => t + (scores[c.id] || 0), 0)

  const save = async () => {
    if (!userOption) return alert('Please select a user')
    try {
      await fetch('/api/saveAppraisal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pesuser_name: userOption,
          payload: 'teaching_quality_evaluation',
          teaching_quality_evaluation: calculateTotal(),
        }),
      })
      alert('Teaching Performance Assessment saved ✅')
    } catch {
      alert('Error saving assessment ❌')
    }
  }

  return (
    <div className="w-full p-12 space-y-6">
      <h1 className="text-2xl font-bold">Teaching Performance Assessment</h1>
      <p className="text-gray-600">Assess teaching across multiple criteria</p>

      <div>
        <label className="block mb-2">Select User:</label>
        <select
          className="p-2 border rounded"
          value={userOption ?? ''}
          onChange={e => setUserOption(e.target.value)}
        >
          <option value="">-- No user selected --</option>
          {users.map(u => (
            <option key={u.id} value={u.name}>{u.name}</option>
          ))}
        </select>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-purple-100">
            <th className="p-2 border">Criterion</th>
            <th className="p-2 border">Max</th>
            <th className="p-2 border">Score</th>
          </tr>
        </thead>
        <tbody>
          {teachingCriteria.map(c => (
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
