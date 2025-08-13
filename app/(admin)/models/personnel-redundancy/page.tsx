"use client";

import { useState } from "react";

export default function PersonnelRedundancyPage() {
  const [open, setOpen] = useState(true);

  const [actualStaff, setActualStaff] = useState<number>(0);
  const [optimalStaff, setOptimalStaff] = useState<number>(0);

  const [thresholds, setThresholds] = useState({
    low: 10, // PR% below this = Low redundancy
    moderate: 25, // PR% below this but >= low = Moderate redundancy
  });

  const [result, setResult] = useState<{
    pr: number;
    rating: string;
    color: string;
  } | null>(null);

  const calculatePR = () => {
    if (actualStaff <= 0) {
      alert("Actual Staff Strength must be greater than 0");
      return;
    }
    const pr = ((actualStaff - optimalStaff) / actualStaff) * 100;

    let rating = "";
    let color = "";

    if (pr < thresholds.low) {
      rating = "Low Redundancy";
      color = "bg-green-500 text-white";
    } else if (pr < thresholds.moderate) {
      rating = "Moderate Redundancy";
      color = "bg-yellow-400 text-black";
    } else {
      rating = "High Redundancy";
      color = "bg-red-500 text-white";
    }

    setResult({ pr, rating, color });
  };

  return (
    <div className="w-full p-12">
      <div className="border rounded">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left px-4 py-3 bg-gray-100 font-semibold"
        >
          25. Determining Real Percentage Redundancy (PR%)
        </button>
        {open && (
          <div className="p-4 space-y-6">
            {/* Placeholder PDF Link */}
            <div>
              <a
                href="https://example.com/personnel-utilization-table.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-pes text-white rounded hover:opacity-90"
              >
                View Personnel Utilization Table
              </a>
            </div>

            {/* Inputs */}
            <label className="block">
              <span className="block mb-1 font-medium">Actual Staff Strength (A)</span>
              <input
                type="number"
                value={actualStaff}
                onChange={(e) => setActualStaff(Number(e.target.value))}
                className="w-full border rounded p-2"
              />
            </label>

            <label className="block">
              <span className="block mb-1 font-medium">Optimal Staff Strength (O)</span>
              <input
                type="number"
                value={optimalStaff}
                onChange={(e) => setOptimalStaff(Number(e.target.value))}
                className="w-full border rounded p-2"
              />
            </label>

            {/* Thresholds */}
            <div>
              <h3 className="font-semibold mb-2">Redundancy Thresholds</h3>
              <label className="block mb-3">
                <span className="block text-sm font-medium">Low &lt;</span>
                <input
                  type="number"
                  value={thresholds.low}
                  onChange={(e) =>
                    setThresholds({ ...thresholds, low: Number(e.target.value) })
                  }
                  className="w-full border rounded p-2"
                />
              </label>
              <label className="block mb-3">
                <span className="block text-sm font-medium">Moderate &lt;</span>
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
                onClick={calculatePR}
                className="px-4 py-2 bg-pes text-white rounded hover:opacity-90"
              >
                Calculate PR%
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className={`p-4 rounded mt-4 font-semibold ${result.color}`}>
                PR%: {result.pr.toFixed(2)}% — {result.rating}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
