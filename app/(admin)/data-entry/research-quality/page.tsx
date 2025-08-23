// /app/appraisal/research-quality/page.tsx
'use client'
import { useEffect, useState } from 'react'

type UserData = { id: string; name: string }

// Form 11 Data Structure
const researchCriteria = [
    { id: 'problem_definition', name: 'Problem definition or scheme', maxScore: 5 },
    { id: 'literature_understanding', name: 'Understanding of previous work (use of literature)', maxScore: 10 },
    { id: 'background_validity', name: 'Validity of background principles/concepts', maxScore: 12 },
    { id: 'interpretation', name: 'Interpretation of resulting information/model', maxScore: 8 },
    { id: 'data_analysis', name: 'Validity of data gathering/analysis or Analytical approach', maxScore: 20 },
    { id: 'objectives_attainment', name: 'Attainment of objectives or contribution to knowledge', maxScore: 25 },
    { id: 'application_findings', name: 'Application of findings', maxScore: 7 },
    { id: 'report_clarity', name: 'Clarity of report including use of tables, Charts, figures', maxScore: 8 },
    { id: 'references', name: 'References (relevance, adequacy etc)', maxScore: 5 }
];

export default function ResearchQualityAssessment() {
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
    const crit = researchCriteria.find(c => c.id === id)
    setScores(prev => ({
      ...prev,
      [id]: Math.min(Math.max(val, 0), crit?.maxScore ?? 0),
    }))
  }

  const calculateTotal = () =>
    researchCriteria.reduce((t, c) => t + (scores[c.id] || 0), 0)

  const save = async () => {
    if (!userOption) return alert('Please select a user')
    try {
      await fetch('/api/saveAppraisal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pesuser_name: userOption,
          payload: 'research_quality_evaluation',
          research_quality_evaluation: calculateTotal(),
        }),
      })
      alert('Research Quality Assessment saved ✅')
    } catch {
      alert('Error saving assessment ❌')
    }
  }

  return (
    <div className="w-full p-12 space-y-6">
      <h1 className="text-2xl font-bold">Research Quality Assessment</h1>
      <p className="text-gray-600">Assessment by External/Peer Reviewers</p>

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
          <tr className="bg-pink-100">
            <th className="p-2 border">Criterion</th>
            <th className="p-2 border">Max</th>
            <th className="p-2 border">Score</th>
          </tr>
        </thead>
        <tbody>
          {researchCriteria.map(c => (
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
