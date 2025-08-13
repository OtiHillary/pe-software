"use client";

import { useState } from "react";

export default function NonAcademicAppraisalPage() {
  const [open, setOpen] = useState(true);

  const [metrics, setMetrics] = useState({
    output: 0,
    quality: 0,
    efficiency: 0,
    attendance: 0,
    teamwork: 0,
  });

  const [weights, setWeights] = useState({
    output: 0.3,
    quality: 0.25,
    efficiency: 0.2,
    attendance: 0.15,
    teamwork: 0.1,
  });

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

  const calculateScore = () => {
    const total =
      metrics.output * weights.output +
      metrics.quality * weights.quality +
      metrics.efficiency * weights.efficiency +
      metrics.attendance * weights.attendance +
      metrics.teamwork * weights.teamwork;

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

  const renderNumberInput = (
    label: string,
    value: number,
    onChange: (v: number) => void
  ) => (
    <label className="block mb-3">
      <span className="block text-sm font-medium mb-1">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full border rounded p-2"
      />
    </label>
  );

  return (
    <div className="w-full mx-auto p-6">
      <div className="border rounded">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left px-4 py-3 bg-gray-100 font-semibold"
        >
          23. Appraisal of Non-Academic Staff
        </button>
        {open && (
          <div className="p-4 space-y-6">
            <div>
              <a
                href="https://example.com/non-academic-appraisal-table.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                View Non-Academic Staff Appraisal Table
              </a>
            </div>

            {/* Performance Metrics */}
            <div>
              <h3 className="font-semibold mb-2">Performance Metrics</h3>
              {renderNumberInput("Output Quantity", metrics.output, (v) =>
                setMetrics({ ...metrics, output: v })
              )}
              {renderNumberInput("Quality of Work", metrics.quality, (v) =>
                setMetrics({ ...metrics, quality: v })
              )}
              {renderNumberInput("Efficiency", metrics.efficiency, (v) =>
                setMetrics({ ...metrics, efficiency: v })
              )}
              {renderNumberInput("Attendance", metrics.attendance, (v) =>
                setMetrics({ ...metrics, attendance: v })
              )}
              {renderNumberInput("Teamwork", metrics.teamwork, (v) =>
                setMetrics({ ...metrics, teamwork: v })
              )}
            </div>

            {/* Weights */}
            <div>
              <h3 className="font-semibold mb-2">Weights</h3>
              {renderNumberInput("Weight: Output Quantity", weights.output, (v) =>
                setWeights({ ...weights, output: v })
              )}
              {renderNumberInput("Weight: Quality of Work", weights.quality, (v) =>
                setWeights({ ...weights, quality: v })
              )}
              {renderNumberInput("Weight: Efficiency", weights.efficiency, (v) =>
                setWeights({ ...weights, efficiency: v })
              )}
              {renderNumberInput("Weight: Attendance", weights.attendance, (v) =>
                setWeights({ ...weights, attendance: v })
              )}
              {renderNumberInput("Weight: Teamwork", weights.teamwork, (v) =>
                setWeights({ ...weights, teamwork: v })
              )}
            </div>

            {/* Thresholds */}
            <div>
              <h3 className="font-semibold mb-2">Rating Thresholds</h3>
              {renderNumberInput("Excellent ≥", thresholds.excellent, (v) =>
                setThresholds({ ...thresholds, excellent: v })
              )}
              {renderNumberInput("Good ≥", thresholds.good, (v) =>
                setThresholds({ ...thresholds, good: v })
              )}
              {renderNumberInput("Average ≥", thresholds.average, (v) =>
                setThresholds({ ...thresholds, average: v })
              )}
            </div>

            {/* Calculate */}
            <div>
              <button
                onClick={calculateScore}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Calculate Appraisal
              </button>
            </div>

            {/* Result */}
            {result && (
              <div
                className={`p-4 rounded mt-4 font-semibold ${result.color}`}
              >
                Score: {result.score.toFixed(2)} — {result.rating}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
