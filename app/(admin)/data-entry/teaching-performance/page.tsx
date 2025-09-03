// /app/appraisal/teaching-performance/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";

type JWTPayload = {
  name?: string;
  role?: string;
  org?: number;
};

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
  const [scores, setScores] = useState<Record<string, number>>({})

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
    const token = localStorage.getItem("access_token")
    const user: JWTPayload = jwtDecode(token || "");
    console.log(user?.name)

    try {
      const res = await fetch("/api/saveAppraisal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pesuser_name: user.name,
          payload: "teaching_quality_evaluation",
          teaching_quality_evaluation: calculateTotal(),
        }),
      });

      if (!res.ok) {
        // Try to get error details from API
        let errorMsg = "Error saving assessment ❌";
        try {
          const errorData = await res.json();
          if (errorData?.message) errorMsg = errorData.message;
        } catch {
          /* ignore JSON parse error */
        }
        throw new Error(errorMsg);
      }

      const data = await res.json();
      console.log("Save success:", data);

      alert("Teaching Performance Assessment saved ✅");
    } catch (err) {
      console.error("Save failed:", err);
      alert(err instanceof Error ? err.message : "Unexpected error ❌");
    }
  }


  return (
    <div className="w-full p-12 space-y-6">
      <h1 className="text-2xl font-bold">Teaching Performance Assessment</h1>
      <p className="text-gray-600">Assess teaching across multiple criteria</p>

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
