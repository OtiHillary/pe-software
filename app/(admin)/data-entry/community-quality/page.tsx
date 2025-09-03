// /app/appraisal/community-service/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";

type JWTPayload = {
  name?: string;
  role?: string;
  org?: number;
};

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
  const [scores, setScores] = useState<Record<string, number>>({})

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
    const token = localStorage.getItem("access_token")
    const user: JWTPayload = jwtDecode(token || "");
    console.log(user?.name)

    try {
      await fetch('/api/saveAppraisal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pesuser_name: user.name,
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
