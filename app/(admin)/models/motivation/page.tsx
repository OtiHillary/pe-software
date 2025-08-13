"use client";

import { useState } from "react";

interface SubItem {
  label: string;
  score: number;
}

interface Category {
  name: string;
  weight: number;
  subItems: SubItem[];
  open: boolean;
}

export default function StaffMotivationPage() {
  const [open, setOpen] = useState(true);

  const [categories, setCategories] = useState<Category[]>([
    { name: "Job Satisfaction", weight: 0.2, subItems: [{ label: "Sub-item 1", score: 0 }], open: false },
    { name: "Work Environment", weight: 0.15, subItems: [{ label: "Sub-item 1", score: 0 }], open: false },
    { name: "Rewards & Incentives", weight: 0.15, subItems: [{ label: "Sub-item 1", score: 0 }], open: false },
    { name: "Opportunities for Growth", weight: 0.15, subItems: [{ label: "Sub-item 1", score: 0 }], open: false },
    { name: "Leadership Quality", weight: 0.2, subItems: [{ label: "Sub-item 1", score: 0 }], open: false },
    { name: "Communication Effectiveness", weight: 0.15, subItems: [{ label: "Sub-item 1", score: 0 }], open: false },
  ]);

  const [thresholds, setThresholds] = useState({
    high: 80,
    moderate: 60,
  });

  const [result, setResult] = useState<{
    score: number;
    rating: string;
    color: string;
  } | null>(null);

  const updateCategory = (index: number, field: keyof Category, value: any) => {
    const updated = [...categories];
    (updated as any)[index][field] = value;
    setCategories(updated);
  };

  const updateSubItem = (cIndex: number, sIndex: number, field: keyof SubItem, value: any) => {
    const updated = [...categories];
    (updated as any)[cIndex].subItems[sIndex][field] = value;
    setCategories(updated);
  };

  const addSubItem = (cIndex: number) => {
    const updated = [...categories];
    updated[cIndex].subItems.push({ label: "New Sub-item", score: 0 });
    setCategories(updated);
  };

  const removeSubItem = (cIndex: number, sIndex: number) => {
    const updated = [...categories];
    updated[cIndex].subItems.splice(sIndex, 1);
    setCategories(updated);
  };

  const calculateScore = () => {
    let total = 0;
    categories.forEach((cat) => {
      const subtotal = cat.subItems.reduce((sum, s) => sum + s.score, 0);
      total += subtotal * cat.weight;
    });

    let rating = "";
    let color = "";

    if (total >= thresholds.high) {
      rating = "High Motivation";
      color = "bg-green-500 text-white";
    } else if (total >= thresholds.moderate) {
      rating = "Moderate Motivation";
      color = "bg-yellow-400 text-black";
    } else {
      rating = "Low Motivation";
      color = "bg-red-500 text-white";
    }

    setResult({ score: total, rating, color });
  };

  return (
    <div className="w-full p-12">
      <div className="border rounded">
        {/* Main Collapsible */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left px-4 py-3 bg-gray-100 font-semibold"
        >
          26. Staff Motivation
        </button>

        {open && (
          <div className="p-4 space-y-6">
            {/* Placeholder PDF Link */}
            <div>
              <a
                href="https://example.com/staff-motivation-table.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-pes text-white rounded hover:opacity-90"
              >
                View Staff Motivation Table
              </a>
            </div>

            {/* Categories */}
            {categories.map((cat, cIndex) => {
              const subtotal = cat.subItems.reduce((sum, s) => sum + s.score, 0);
              const weighted = subtotal * cat.weight;

              return (
                <div key={cIndex} className="border rounded">
                  {/* Category Header */}
                  <button
                    onClick={() => updateCategory(cIndex, "open", !cat.open)}
                    className="w-full text-left px-4 py-2 bg-gray-50 border-b font-medium"
                  >
                    {cat.name} (Weight: {cat.weight})
                  </button>

                  {/* Category Content */}
                  {cat.open && (
                    <div className="p-4 space-y-4">
                      {/* Editable name & weight */}
                      <div className="flex gap-4 items-center">
                        <input
                          type="text"
                          value={cat.name}
                          onChange={(e) => updateCategory(cIndex, "name", e.target.value)}
                          className="border rounded p-2 flex-1"
                        />
                        <input
                          type="number"
                          step="0.01"
                          value={cat.weight}
                          onChange={(e) =>
                            updateCategory(cIndex, "weight", Number(e.target.value))
                          }
                          className="border rounded p-2 w-28"
                        />
                        <span className="text-sm text-gray-600">Weight</span>
                      </div>

                      {/* Sub-items */}
                      {cat.subItems.map((sub, sIndex) => (
                        <div key={sIndex} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={sub.label}
                            onChange={(e) =>
                              updateSubItem(cIndex, sIndex, "label", e.target.value)
                            }
                            className="border rounded p-2 flex-1"
                          />
                          <input
                            type="number"
                            step="0.01"
                            value={sub.score}
                            onChange={(e) =>
                              updateSubItem(cIndex, sIndex, "score", Number(e.target.value))
                            }
                            className="border rounded p-2 w-28"
                          />
                          <button
                            onClick={() => removeSubItem(cIndex, sIndex)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:opacity-90"
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                      {/* Add sub-item button */}
                      <button
                        onClick={() => addSubItem(cIndex)}
                        className="px-4 py-2 bg-pes text-white rounded hover:opacity-90"
                      >
                        + Add Sub-item
                      </button>

                      {/* Totals */}
                      <div className="text-sm text-gray-700">
                        Subtotal: {subtotal.toFixed(2)} | Weighted: {weighted.toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thresholds */}
            <div>
              <h3 className="font-semibold mb-2">Motivation Thresholds</h3>
              <label className="block mb-3">
                <span className="block text-sm font-medium">High ≥</span>
                <input
                  type="number"
                  value={thresholds.high}
                  onChange={(e) =>
                    setThresholds({ ...thresholds, high: Number(e.target.value) })
                  }
                  className="w-full border rounded p-2"
                />
              </label>
              <label className="block mb-3">
                <span className="block text-sm font-medium">Moderate ≥</span>
                <input
                  type="number"
                  value={thresholds.moderate}
                  onChange={(e) =>
                    setThresholds({ ...thresholds, moderate: Number(e.target.value) })
                  }
                  className="w-full border rounded p-2"
                />
              </label>
            </div>

            {/* Calculate Button */}
            <div>
              <button
                onClick={calculateScore}
                className="px-4 py-2 bg-pes text-white rounded hover:opacity-90"
              >
                Calculate Motivation Score
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
