'use client'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

type JWTPayload = {
  name?: string
  role?: string
  org?: number
}

/* ---------------- Criteria Definitions ---------------- */
const adminCriteria = [
  { id: 'training', name: 'Training & Workshops Attended', maxScore: 25 },
  { id: 'certifications', name: 'Certifications Obtained', maxScore: 25 },
  { id: 'seminars', name: 'Seminars / Conferences Attended', maxScore: 25 },
  { id: 'self_learning', name: 'Self-Directed Learning & Improvement', maxScore: 25 },
]

const teachingCriteria = [
  { id: 'lecture_plan_eval', name: 'Lecture plan', maxScore: 8 },
  { id: 'cap_implementation', name: 'Continuous Assessment plan (CAP) implementation', maxScore: 8 },
  { id: 'subject_breadth', name: 'Subject Breadth coverage of examination questions', maxScore: 10 },
  { id: 'subject_depth', name: 'Subject Depth Coverage of examination question', maxScore: 8 },
  { id: 'grading_scheme', name: 'Examination grading Scheme', maxScore: 8 },
  { id: 'fairness_egs', name: 'Fairness in Application of EGS', maxScore: 5 },
  { id: 'recommended_text', name: 'Recommended text and Reference (Relevance and Adequacy)', maxScore: 10 },
  { id: 'general_quality', name: 'General Quality', maxScore: 3 }
]

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
]

const teachingStudentCriteria = [
  { id: 'attendance', name: 'Attendance', maxScore: 8 },
  { id: 'punctuality', name: 'Punctuality', maxScore: 8 },
  { id: 'clarity', name: 'Clarity of presentation', maxScore: 20 },
  { id: 'lecture_plan', name: 'Implementation of lecture plan', maxScore: 15 },
  { id: 'continuous_assessment', name: 'Implementation of continuous assessment plan', maxScore: 15 },
  { id: 'quality_lectures', name: 'Quality, currency and depth of lectures', maxScore: 20 },
  { id: 'text_relevance', name: 'Relevance and adequacy of text and reference books', maxScore: 5 },
  { id: 'classroom_order', name: 'Maintenance of classroom order', maxScore: 5 },
  { id: 'student_response', name: 'Response to student\'s questions', maxScore: 4 }
]

const communityCriteria = [
  { id: 'attendance', name: 'Attendance', maxScore: 8 },
  { id: 'punctuality', name: 'Punctuality', maxScore: 8 },
  { id: 'clarity', name: 'Clarity of presentation', maxScore: 20 },
  { id: 'lecture_plan', name: 'Implementation of lecture plan', maxScore: 15 },
  { id: 'continuous_assessment', name: 'Implementation of continuous assessment plan', maxScore: 15 },
  { id: 'quality_lectures', name: 'Quality, currency and depth of lectures', maxScore: 20 },
  { id: 'text_relevance', name: 'Relevance and adequacy of text and reference books', maxScore: 5 },
  { id: 'classroom_order', name: 'Maintenance of classroom order', maxScore: 5 },
  { id: 'student_response', name: 'Response to student\'s questions', maxScore: 4 }
]

/* ---------------- Utility Component ---------------- */
function CriteriaForm({
  title,
  criteria,
  scores,
  setScores,
}: {
  title: string
  criteria: { id: string; name: string; maxScore: number }[]
  scores: Record<string, number>
  setScores: (val: Record<string, number>) => void
}) {
  const handleUpdate = (id: string, val: number) => {
    const crit = criteria.find((c) => c.id === id)
    setScores({
      ...scores,
      [id]: Math.min(Math.max(val, 0), crit?.maxScore ?? 0),
    })
  }

  const total = criteria.reduce((t, c) => t + (scores[c.id] || 0), 0)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Criterion</th>
            <th className="border p-2">Max</th>
            <th className="border p-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((c) => (
            <tr key={c.id}>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2 text-center">{c.maxScore}</td>
              <td className="border p-2 text-center">
                <select
                  value={scores[c.id] || ''}
                  onChange={(e) => handleUpdate(c.id, parseInt(e.target.value))}
                  className="w-24 border rounded text-center"
                >
                  <option value="">--</option>
                  {Array.from({ length: c.maxScore + 1 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className="font-semibold">Total Score: {total}</div>
    </div>
  )
}

function CriteriaFormPrint({
  title,
  criteria,
  scores,
}:{
  title: string
  criteria: { id: string; name: string; maxScore: number }[]
  scores: Record<string, number>
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border">
            <th className="border p-2">Criterion</th>
            <th className="border p-2">Max</th>
            <th className="border p-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((c) => (
            <tr key={c.id}>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2 text-center">{c.maxScore}</td>
              <td className="border p-2 text-center">{scores[c.id] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ---------------- Step Form Component ---------------- */
export default function AppraisalStep() {
  const [step, setStep] = useState(0)

  const [adminScores, setAdminScores] = useState<Record<string, number>>({})
  const [studentTeachingScores, setStudentTeachingScores] = useState<Record<string, number>>({})
  const [researchScores, setResearchScores] = useState<Record<string, number>>({})
  const [teachingScores, setTeachingScores] = useState<Record<string, number>>({})
  const [communityScores, setCommunityScores] = useState<Record<string, number>>({})

  const steps = [
    {
      title: 'Administrative Quality',
      form: (
        <CriteriaForm
          title="Administrative Quality Assessment"
          criteria={adminCriteria}
          scores={adminScores}
          setScores={setAdminScores}
        />
      ),
    },
    {
      title: 'Teaching Quality(Students)',
      form: (
        <CriteriaFormPrint
          title="Teaching Quality Assessment(Students)"
          criteria={teachingStudentCriteria}
          scores={studentTeachingScores}
        />
      ),
    },
        {
      title: 'Teaching Quality(Peers)',
      form: (
        <CriteriaForm
          title="Teaching Quality Assessment"
          criteria={teachingCriteria}
          scores={teachingScores}
          setScores={setTeachingScores}
        />
      ),
    },
    {
      title: 'Research Quality',
      form: (
        <CriteriaForm
          title="Research Quality Assessment"
          criteria={researchCriteria}
          scores={researchScores}
          setScores={setResearchScores}
        />
      ),
    },
    // {
    //   title: 'Community Quality',
    //   form: (
    //     <CriteriaForm
    //       title="Community Quality Assessment"
    //       criteria={communityCriteria} // you’ll need to define this
    //       scores={communityScores}
    //       setScores={setCommunityScores}
    //     />
    //   ),
    // }
  ]

  const handleFinalSubmit = async () => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      alert('No token found ❌')
      return
    }

    const user: JWTPayload = jwtDecode(token)

    // Sum each section’s scores
    const adminTotal = Object.values(adminScores).reduce((a, b) => a + b, 0)
    const communityTotal = Object.values(communityScores).reduce((a, b) => a + b, 0)
    const researchTotal = Object.values(researchScores).reduce((a, b) => a + b, 0)
    const teachingTotal = Object.values(teachingScores).reduce((a, b) => a + b, 0)

    const payload = {
      pesuser_name: user.name,
      org: user.org,
      administrative_quality_evaluation: adminTotal,
      community_quality_evaluation: communityTotal,
      research_quality_evaluation: researchTotal,
      teaching_quality_evaluation: teachingTotal,
      // teaching_quality_evaluation: teachingTotal,
    }

    try {
      const res = await fetch('/api/saveAppraisal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Error saving appraisal ❌')

      alert('Appraisal submitted successfully ✅')
    } catch (err) {
      console.error(err)
      alert('Error submitting appraisal ❌')
    }
  }

  return (
    <div className="w-full mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">Appraisal Data Entry</h1>
      <div>{steps[step].form}</div>

      <div className="flex justify-between pt-6">
        <button
          disabled={step === 0}
          onClick={() => setStep(prev => prev - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep(prev => prev + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleFinalSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit All
          </button>
        )}
      </div>
    </div>
  )
}
