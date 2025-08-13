"use client";

import { useState } from "react";

export default function AchievementCriteriaPage() {
  const [open, setOpen] = useState(true);

  const [criteria, setCriteria] = useState([
    { name: "Competence", weight: 0.25, subItems: [{ label: "Sub-item 1", score: 0 }] },
    { name: "Integrity", weight: 0.25, subItems: [{ label: "Sub-item 1", score: 0 }] },
    { name: "Compatibility", weight: 0.25, subItems: [{ label: "Sub-item 1", score: 0 }] },
    { name: "Use of Resources", weight: 0.25, subItems: [{ label: "Sub-item 1", score: 0 }] },
  ]);

  const [thresholds, setThresholds] = useState({
    excellent: 80,
    good: 65,
    average: 50,
  });

  const [result, setResult] = useState<{
    score: number;
    rating: string;
    color: string;
  } | null>(null);

  const updateCriterion = (index: number, field: string, value: any) => {
    const updated = [...criteria];
    (updated as any)[index][field] = value;
    setCriteria(updated);
  };

  const updateSubItem = (cIndex: number, sIndex: number, field: string, value: any) => {
    const updated = [...criteria];
    (updated as any)[cIndex].subItems[sIndex][field] = value;
    setCriteria(updated);
  };

  const addSubItem = (cIndex: number) => {
    const updated = [...criteria];
    (updated as any)[cIndex].subItems.push({ label: "New Sub-item", score: 0 });
    setCriteria(updated);
  };

  const removeSubItem = (cIndex: number, sIndex: number) => {
    const updated = [...criteria];
    (updated as any)[cIndex].subItems.splice(sIndex, 1);
    setCriteria(updated);
  };

  const calculateScore = () => {
    let total = 0;
    criteria.forEach((criterion) => {
      const subtotal = criterion.subItems.reduce((sum, s) => sum + s.score, 0);
      total += subtotal * criterion.weight;
    });

    let rating = "";
    let color = "";

    if (total >= thresholds.excellent) {
      rating = "Excellent";
      color = "bg-green-500 text-white";
    } else if (total >= thresholds.good) {
      rating = "Good";
      color = "bg-blue-500 text-white";
    } else if (total >= thresholds.average) {
      rating = "Average";
      color = "bg-yellow-400 text-black";
    } else {
      rating = "Needs Improvement";
      color = "bg-red-500 text-white";
    }

    setResult({ score: total, rating, color });
  };

  return (
    <div className="w-full p-12">
      <div className="border rounded">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left px-4 py-3 bg-gray-100 font-semibold"
        >
          24. Achievement Criteria Performance Measurement
        </button>
        {open && (
          <div className="p-4 space-y-6">
            {/* Placeholder PDF Link */}
            <div>
              <a
                href="https://example.com/achievement-criteria-table.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-pes text-white rounded hover:opacity-90"
              >
                View Achievement Criteria Measurement Table
              </a>
            </div>

            {/* Criteria Inputs */}
            {criteria.map((criterion, cIndex) => (
              <div key={cIndex} className="border p-4 rounded space-y-4">
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    value={criterion.name}
                    onChange={(e) => updateCriterion(cIndex, "name", e.target.value)}
                    className="border rounded p-2 flex-1"
                  />
                  <input
                    type="number"
                    value={criterion.weight}
                    onChange={(e) => updateCriterion(cIndex, "weight", Number(e.target.value))}
                    className="border rounded p-2 w-28"
                    step="0.01"
                  />
                  <span className="text-sm text-gray-600">Weight</span>
                </div>

                {/* Sub-items */}
                <div className="space-y-3">
                  {criterion.subItems.map((sub, sIndex) => (
                    <div key={sIndex} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={sub.label}
                        onChange={(e) => updateSubItem(cIndex, sIndex, "label", e.target.value)}
                        className="border rounded p-2 flex-1"
                      />
                      <input
                        type="number"
                        value={sub.score}
                        onChange={(e) => updateSubItem(cIndex, sIndex, "score", Number(e.target.value))}
                        className="border rounded p-2 w-28"
                        step="0.01"
                      />
                      <button
                        onClick={() => removeSubItem(cIndex, sIndex)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:opacity-90"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => addSubItem(cIndex)}
                  className="px-4 py-2 bg-pes text-white rounded hover:opacity-90"
                >
                  + Add Sub-item
                </button>

                {/* Criterion subtotal */}
                <div className="mt-2 text-sm text-gray-700">
                  Subtotal:{" "}
                  {criterion.subItems.reduce((sum, s) => sum + s.score, 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-700">
                  Weighted:{" "}
                  {(
                    criterion.subItems.reduce((sum, s) => sum + s.score, 0) *
                    criterion.weight
                  ).toFixed(2)}
                </div>
              </div>
            ))}

            {/* Thresholds */}
            <div>
              <h3 className="font-semibold mb-2">Rating Thresholds</h3>
              {["excellent", "good", "average"].map((key) => (
                <label key={key} className="block mb-3">
                  <span className="block text-sm font-medium mb-1 capitalize">
                    {key} ≥
                  </span>
                  <input
                    type="number"
                    value={(thresholds as any)[key]}
                    onChange={(e) =>
                      setThresholds({ ...thresholds, [key]: Number(e.target.value) })
                    }
                    className="w-full border rounded p-2"
                  />
                </label>
              ))}
            </div>

            {/* Calculate */}
            <div>
              <button
                onClick={calculateScore}
                className="px-4 py-2 bg-pes text-white rounded hover:opacity-90"
              >
                Calculate Performance
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className={`p-4 rounded mt-4 font-semibold ${result.color}`}>
                Total Score: {result.score.toFixed(2)} — {result.rating}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
