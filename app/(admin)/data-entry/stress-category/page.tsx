"use client";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

type JWTPayload = {
  name?: string;
  role?: string;
  org?: number;
};

type StressItem = {
  label: string;
  weight: number; // extracted from formula
};

type StressCategory = {
  category: string;
  items: StressItem[];
};

const stressData: StressCategory[] = [
  {
    category: "Organizational",
    items: [
      { label: "Time", weight: 116 },
      { label: "Paper Work", weight: 99 },
      { label: "Lack of Materials", weight: 34 },
      { label: "Extra Duties", weight: 32 },
      { label: "Physical Plant", weight: 19 },
      { label: "Meetings", weight: 15 },
      { label: "Class Size", weight: 15 },
      { label: "Poor Scheduling", weight: 13 },
      { label: "Interruptions", weight: 13 },
      { label: "Travels", weight: 12 },
      { label: "Conflicting demand", weight: 11 },
      { label: "Athletics", weight: 4 },
    ],
  },
  {
    category: "Student",
    items: [
      { label: "Student Discipline", weight: 97 },
      { label: "Student Apathy", weight: 38 },
      { label: "Low Student Achievement", weight: 37 },
      { label: "Student Absences", weight: 3 },
    ],
  },
  {
    category: "Administrative",
    items: [
      { label: "Unclear Expectations", weight: 27 },
      { label: "Lack of Knowledge or Expertise", weight: 25 },
      { label: "Lack of Support (Backing, Recognition)", weight: 24 },
      { label: "Inconsistency", weight: 17 },
      { label: "Unreasonable Expectations", weight: 14 },
      { label: "Poor Evaluation Procedures", weight: 12 },
      { label: "Indecisiveness", weight: 10 },
      { label: "Lack of Opportunities for Input", weight: 10 },
      { label: "Failure to Provide Resources", weight: 7 },
      { label: "Lack of Follow-Through", weight: 6 },
      { label: "Harassment", weight: 5 },
      { label: "Favoritism", weight: 5 },
      { label: "Miscellaneous", weight: 4 },
    ],
  },
  {
    category: "Teacher",
    items: [
      { label: "Conflict or Lack of Cooperation", weight: 59 },
      { label: "Incompetence or Irresponsibility", weight: 21 },
      { label: "Negative Attitude", weight: 7 },
      { label: "Lack of Communication", weight: 5 },
    ],
  },
  {
    category: "Parents",
    items: [
      { label: "Interference", weight: 24 },
      { label: "Nonsupport or Apathy", weight: 15 },
      { label: "Lack of Communication & Understanding", weight: 11 },
    ],
  },
  {
    category: "Occupational",
    items: [
      { label: "Lack of Professional Growth", weight: 12 },
      { label: "Low Salary", weight: 9 },
      { label: "Lack of Advancement", weight: 5 },
      { label: "Job Insecurity", weight: 4 },
    ],
  },
  {
    category: "Personal",
    items: [
      { label: "Professional/Personal Conflict", weight: 12 },
      { label: "Conflict With Personal Values", weight: 10 },
      { label: "Miscellaneous", weight: 4 },
    ],
  },
  {
    category: "Academic Program",
    items: [
      { label: "Repetition", weight: 7 },
      { label: "Unrealistic Goals", weight: 7 },
      { label: "Low Standards", weight: 5 },
      { label: "Responsibility to Grade Students", weight: 4 },
    ],
  },
  {
    category: "Negative Public Attitude",
    items: [{ label: "Negative Public Attitude", weight: 9 }],
  },
  {
    category: "Miscellaneous",
    items: [{ label: "Miscellaneous", weight: 27 }],
  },
];

export default function StressForm5() {
  const [values, setValues] = useState<Record<string, number>>({});

  const handleChange = (key: string, val: number) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  // Compute weighted totals
  const categoryTotals: Record<string, number> = {};
  let grandTotal = 0;

  stressData.forEach((group) => {
    let subtotal = 0;
    group.items.forEach((item) => {
      const val = values[`${group.category}-${item.label}`] || 0;
      subtotal += (val * item.weight) / 10;
    });
    categoryTotals[group.category] = subtotal;
    grandTotal += subtotal;
  });

  const percentages: Record<string, number> = {};
  Object.keys(categoryTotals).forEach((cat) => {
    percentages[cat] = grandTotal > 0 ? (categoryTotals[cat] / grandTotal) * 100 : 0;
  });

    // Group rollups
  let stressFactor =
    (categoryTotals["Organizational"] || 0) +
    (categoryTotals["Student"] || 0) +
    (categoryTotals["Administrative"] || 0) +
    (categoryTotals["Negative Public Attitude"] || 0);

  let pressureFactor =
    (categoryTotals["Teacher"] || 0) +
    (categoryTotals["Parents"] || 0) +
    (categoryTotals["Occupational"] || 0) +
    (categoryTotals["Academic Program"] || 0);

  let conflict = categoryTotals["Personal"] || 0;

  // Split Miscellaneous (3:2:1)
  const miscVal = categoryTotals["Miscellaneous"] || 0;
  stressFactor += (miscVal * 3) / 6;
  pressureFactor += (miscVal * 2) / 6;
  conflict += (miscVal * 1) / 6;

  const handleSubmit = async () => {
    await fetch("/api/saveStressCategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryTotals,
        percentages,
        groupedTotals: { stressFactor, pressureFactor, conflict },
        grandTotal,
      }),
    });
    alert("Stress category totals submitted successfully!");
  };


  return (
    <div className="w-full p-12">
      <h1 className="text-2xl font-bold mb-6">Form 5: Setting the Stress Category/Staff</h1>

      {stressData.map((group, idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{group.category}</h2>
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Item</th>
                {Array.from({ length: 10 }, (_, i) => (
                  <th key={i} className="border px-2 py-1 text-center">{i + 1}</th>
                ))}
                <th className="border px-2 py-1">Weight</th>
              </tr>
            </thead>
            <tbody>
              {group.items.map((item, j) => (
                <tr key={j}>
                  <td className="border px-2 py-1">{item.label}</td>
                  {Array.from({ length: 10 }, (_, i) => (
                    <td key={i} className="border px-2 py-1 text-center">
                      <input
                        type="radio"
                        name={`${group.category}-${item.label}`}
                        value={i + 1}
                        onChange={(e) =>
                          handleChange(`${group.category}-${item.label}`, parseInt(e.target.value))
                        }
                      />
                    </td>
                  ))}
                  <td className="border px-2 py-1 text-center">{item.weight}</td>
                </tr>
              ))}
              <tr className="bg-gray-200 font-semibold">
                <td className="border px-2 py-1 text-right" colSpan={11}>
                  Subtotal
                </td>
                <td className="border px-2 py-1 text-center">
                  {categoryTotals[group.category].toFixed(2)} ({percentages[group.category].toFixed(1)}%)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold">
          Grand Total: {grandTotal.toFixed(2)}
        </h2>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-pes text-white px-4 py-2 rounded"
      >
        Submit Totals
      </button>
    </div>
  );
}
