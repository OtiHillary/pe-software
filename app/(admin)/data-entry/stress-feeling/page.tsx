"use client";
import { useState } from "react";

const categories = [
  "Organization (-)",
  "Student (-)",
  "Administrative (-)",
  "Teacher (-)",
  "Parent (-)",
  "Occupational (-)",
  "Personal (-)",
  "Academic Program (-)",
  "Negative Public Attitude (-)",
  "Miscellaneous (-)"
];

const feelings = [
  "Anger Towards Others (-)",
  "Depressive States (-)",
  "Anxiety Anticipatory (-)",
  "Physical Feelings (-)",
  "Self-Blame (-)"
];

export default function Form7() {
  const [values, setValues] = useState<Record<string, Record<string, number>>>({});

  const handleChange = (cat: string, feel: string, val: number) => {
    setValues(prev => ({
      ...prev,
      [cat]: {
        ...prev[cat],
        [feel]: val
      }
    }));
  };

  // row, col, grand totals
  const getRowTotal = (cat: string) =>
    feelings.reduce((sum, f) => sum + (values[cat]?.[f] || 0), 0);

  const getColTotal = (feel: string) =>
    categories.reduce((sum, c) => sum + (values[c]?.[feel] || 0), 0);

  const getGrandTotal = () =>
    categories.reduce((sum, c) => sum + getRowTotal(c), 0);

  // ratio calculation (like PDF ∑xi / ∑all elements)
  // here ∑xi = grand total, denominator can be another reference value
  // but for now we normalize against number of filled cells
  const totalElements = categories.length * feelings.length;
  const ratio = totalElements > 0 ? getGrandTotal() / totalElements : 0;

  const saveForm7 = async () => {
    try {
      const payload = {
        type: "stress_feelings_frequencies",
        data: values,
        totals: {
          rowTotals: categories.map(c => ({ category: c, total: getRowTotal(c) })),
          colTotals: feelings.map(f => ({ feeling: f, total: getColTotal(f) })),
          grandTotal: getGrandTotal(),
          ratio: ratio.toFixed(4) // keep 4 dp like 1.6453
        }
      };

      await fetch("/api/saveStress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      alert("Form 7 saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving Form 7");
    }
  };

  return (
    <div className="w-full p-12">
      <h2 className="text-2xl font-bold mb-4">Form 7: Stress Feelings / Frequencies</h2>
      <p className="text-gray-600 mb-6">
        Enter frequency values per category × feeling. Use <strong>0</strong> if not applicable.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-purple-200">
              <th className="border p-2">Stress Category / Freq</th>
              {feelings.map(feel => (
                <th key={feel} className="border p-2">{feel}</th>
              ))}
              <th className="border p-2">Row Total</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat}>
                <td className="border p-2 font-medium">{cat}</td>
                {feelings.map(feel => (
                  <td key={feel} className="border p-2">
                    <input
                      type="number"
                      min={0}
                      className="w-20 border rounded p-1 text-center"
                      value={values[cat]?.[feel] ?? ""}
                      onChange={e =>
                        handleChange(cat, feel, parseFloat(e.target.value) || 0)
                      }
                    />
                  </td>
                ))}
                <td className="border p-2 text-center font-semibold bg-gray-100">
                  {getRowTotal(cat)}
                </td>
              </tr>
            ))}

            {/* Totals row */}
            <tr className="bg-purple-100 font-bold">
              <td className="border p-2">Column Totals (∑)</td>
              {feelings.map(feel => (
                <td key={feel} className="border p-2 text-center">
                  {getColTotal(feel)}
                </td>
              ))}
              <td className="border p-2 text-center">{getGrandTotal()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Ratio Display */}
      <div className="mt-4 text-gray-700">
        <p>
          <strong>Ratio (∑xi / ∑all elements):</strong>{" "}
          {ratio.toFixed(4)}
        </p>
      </div>

      <button
        onClick={saveForm7}
        className="mt-6 px-6 py-2 rounded text-white bg-pes"
      >
        Save Form 7
      </button>
    </div>
  );
}
