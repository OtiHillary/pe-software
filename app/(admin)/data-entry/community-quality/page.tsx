// /app/appraisal/community-service/page.tsx
'use client'
import { useEffect, useState } from 'react'

type UserData = { id: string; name: string }

  // Form 10 Data Structure
const communityCriteria = [
    { id: 'lecture_plan_eval', name: 'Lecture plan', maxScore: 8 },
    { id: 'cap_implementation', name: 'Continuous Assessment plan (CAP) implementation', maxScore: 8 },
    { id: 'subject_breadth', name: 'Subject Breadth coverage of examination questions', maxScore: 10 },
    { id: 'subject_depth', name: 'Subject Depth Coverage of examination question', maxScore: 8 },
    { id: 'grading_scheme', name: 'Examination grading Scheme', maxScore: 8 },
    { id: 'fairness_egs', name: 'Fairness in Application of EGS', maxScore: 5 },
    { id: 'recommended_text', name: 'Recommended text and Reference (Relevance and Adequacy)', maxScore: 10 },
    { id: 'general_quality', name: 'General Quality', maxScore: 3 }
];

export default function CommunityServiceAssessment() {
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
    const crit = communityCriteria.find(c => c.id === id)
    setScores(prev => ({
      ...prev,
      [id]: Math.min(Math.max(val, 0), crit?.maxScore ?? 0),
    }))
  }

  const calculateTotal = () =>
    communityCriteria.reduce((t, c) => t + (scores[c.id] || 0), 0)

  const save = async () => {
    if (!userOption) return alert('Please select a user')
    try {
      await fetch('/api/saveAppraisal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pesuser_name: userOption,
          payload: 'community_service_evaluation',
          community_service_evaluation: calculateTotal(),
        }),
      })
      alert('Community Service Assessment saved ✅')
    } catch {
      alert('Error saving assessment ❌')
    }
  }

  return (
    <div className="w-full p-12 space-y-6">
      <h1 className="text-2xl font-bold">Community Service Assessment</h1>
      <p className="text-gray-600">Assessment of participation in community and institutional service</p>

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
          <tr className="bg-green-100">
            <th className="p-2 border">Criterion</th>
            <th className="p-2 border">Max</th>
            <th className="p-2 border">Score</th>
          </tr>
        </thead>
        <tbody>
          {communityCriteria.map(c => (
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
