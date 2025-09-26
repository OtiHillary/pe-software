'use client'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import CriteriaForm from './criteria/form'

type JWTPayload = {
  name?: string
  role?: string
  org?: number
}

/* ---- Criteria definitions (use your original weights) ---- */
const competenceCriteria = [
  { name: 'Hardwork (quantity)', percentage: 55 },
  { name: 'Quality of work', percentage: 10 },
  { name: 'Initiative', percentage: 60 },
  { name: 'Expertise', percentage: 30 },
  { name: 'Supervision', percentage: 40 },
  { name: 'Reporting', percentage: 20 },
  { name: 'Work Planning', percentage: 30 },
  { name: 'Creativity', percentage: 60 },
]

const integrityCriteria = [
  { name: 'Leadership', percentage: 100 },
  { name: 'Dedication', percentage: 70 },
  { name: 'Honesty', percentage: 60 },
  { name: 'Self-discipline', percentage: 40 },
  { name: 'Responsibility', percentage: 40 },
  { name: 'Reliability', percentage: 40 },
  { name: 'Punctuality', percentage: 30 },
  { name: 'Regularity or Absenteeism', percentage: 30 },
]

const compatibilityCriteria = [
  { name: 'Team work', percentage: 80 },
  { name: 'Contributions to the immediate community', percentage: 20 },
  { name: 'Hospitality', percentage: 20 },
  { name: 'Special contributions to section/branch', percentage: 20 },
  { name: 'Relation to customer', percentage: 10 },
]

const resourceCriteria = [
  { name: 'Use of resources', percentage: 400 },
]

/* ---- Helpers ---- */
function weightedTotal(criteria: { percentage: number }[], ratings: Record<number, number>) {
  return criteria.reduce((sum, c, i) => {
    const r = ratings[i] ?? 1 // default rating = 1 like your originals
    return sum + (r / 10) * c.percentage
  }, 0)
}

/* ---- Main Component ---- */
export default function PerformanceStep() {
  const [step, setStep] = useState(0)

  // ratings are maps: index -> rating (1..10)
  const [competenceRatings, setCompetenceRatings] = useState<Record<number, number>>({})
  const [integrityRatings, setIntegrityRatings] = useState<Record<number, number>>({})
  const [compatibilityRatings, setCompatibilityRatings] = useState<Record<number, number>>({})
  const [resourceRatings, setResourceRatings] = useState<Record<number, number>>({})

  const steps = [
    {
      title: 'Competence',
      form: (
        <CriteriaForm
          title="Competence"
          criteria={competenceCriteria}
          ratings={competenceRatings}
          setRatings={setCompetenceRatings}
        />
      ),
    },
    {
      title: 'Integrity',
      form: (
        <CriteriaForm
          title="Integrity"
          criteria={integrityCriteria}
          ratings={integrityRatings}
          setRatings={setIntegrityRatings}
        />
      ),
    },
    {
      title: 'Compatibility',
      form: (
        <CriteriaForm
          title="Compatibility"
          criteria={compatibilityCriteria}
          ratings={compatibilityRatings}
          setRatings={setCompatibilityRatings}
        />
      ),
    },
    {
      title: 'Use of Resources',
      form: (
        <CriteriaForm
          title="Use of Resources"
          criteria={resourceCriteria}
          ratings={resourceRatings}
          setRatings={setResourceRatings}
        />
      ),
    },
  ]

  const handleFinalSubmit = async () => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      alert('No token found ❌')
      return
    }

    const user: JWTPayload = jwtDecode(token)

    // exact keys like your previous components & endpoint
    const bodyContent = {
      pesuser_name: user.name,
      org: user.org,
      payload: {
        competence: Number(weightedTotal(competenceCriteria, competenceRatings).toFixed(2)),
        integrity: Number(weightedTotal(integrityCriteria, integrityRatings).toFixed(2)),
        compatibility: Number(weightedTotal(compatibilityCriteria, compatibilityRatings).toFixed(2)),
        use_of_resources: Number(weightedTotal(resourceCriteria, resourceRatings).toFixed(2)),
      }
    }

    try {
      const res = await fetch('/api/savePerformance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyContent),
      })

      if (!res.ok) {
        let msg = 'Error saving performance ❌'
        try {
          const data = await res.json()
          if (data?.message) msg = data.message
        } catch {}
        throw new Error(msg)
      }

      alert('Performance submitted successfully ✅')
    } catch (err) {
      console.error(err)
      alert(err instanceof Error ? err.message : 'Error submitting performance ❌')
    }
  }

  return (
    <div className="w-full mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">Performance data entry</h1>

      {/* Step content */}
      <div>{steps[step].form}</div>

      {/* Controls */}
      <div className="flex justify-between pt-6">
        <button
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
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
