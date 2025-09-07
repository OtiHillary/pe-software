'use client'
import React from 'react'

type Criterion = {
  name: string
  percentage: number
}

export default function CriteriaForm({
  title,
  criteria,
  ratings,
  setRatings,
}: {
  title: string
  criteria: Criterion[]
  ratings: Record<number, number> // index -> rating (1..10)
  setRatings: (val: Record<number, number>) => void
}) {
  const handleUpdate = (index: number, val: number) => {
    const clamped = Math.min(Math.max(val, 1), 10)
    setRatings({
      ...ratings,
      [index]: clamped,
    })
  }

  const rowScore = (index: number, percentage: number) => {
    const r = ratings[index] ?? 1
    return (r / 10) * percentage
  }

  const total = criteria.reduce((sum, c, i) => sum + rowScore(i, c.percentage), 0)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Criteria</th>
            <th className="border p-2 text-center">(Rating) 1 → 10</th>
            <th className="border p-2 text-center">Weight (y)</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((c, i) => (
            <tr key={c.name}>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2 text-center">
                <select
                  className="w-20 border rounded text-center"
                  value={ratings[i] ?? 1}
                  onChange={(e) => handleUpdate(i, parseInt(e.target.value))}
                >
                  {Array.from({ length: 10 }, (_, k) => k + 1).map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border p-2 text-center">{c.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="font-semibold">Total: {total.toFixed(2)}</div>
    </div>
  )
}
