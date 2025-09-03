// /app/appraisal/research-quality/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";

type JWTPayload = {
  name?: string;
  role?: string;
  org?: number;
};

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
  const [scores, setScores] = useState<Record<string, number>>({})


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
    const token = localStorage.getItem("access_token")
    const user: JWTPayload = jwtDecode(token || "");
    console.log(user?.name)
 
    try {
      await fetch('/api/saveAppraisal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pesuser_name: user.name,
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
