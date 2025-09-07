"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { date } from "yup";

type JWTPayload = {
  name?: string;
  role?: string;
  org?: number;
};

const feelings = [
  "Anger Towards Others (-)",
  "Depressive States (-)",
  "Anxiety Anticipatory (-)",
  "Physical Feelings (-)",
  "Self-Blame (-)",
];

export default function Form7() {
  const [values, setValues] = useState<Record<string, Record<string, number>>>({});
  const [maxScores, setMaxScores] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  // Fetch stress scores from backend
useEffect(() => {
  const fetchScores = async () => {
    try {
      const res = await fetch("/api/getStressScores");
      const info = await res.json();
      console.log(info.data)
      
      // backend now gives the object directly
      const numericScores: Record<string, number> = Object.fromEntries(
        Object.entries(info.data).map(([key, val]) => [key, Number(val) || 0])
      );

      setMaxScores(numericScores);  
      setLoading(false);
    } catch (err) {
      console.error("Error fetching scores:", err);
      setLoading(false);
    }
  };

  fetchScores();
}, []);

const categories = [
  { key: "organizational", label: "Organization (-)" },
  { key: "student", label: "Student (-)" },
  { key: "administrative", label: "Administrative (-)" },
  { key: "teacher", label: "Teacher (-)" },
  { key: "parents", label: "Parent (-)" },
  { key: "occupational", label: "Occupational (-)" },
  { key: "personal", label: "Personal (-)" },
  { key: "academic_program", label: "Academic Program (-)" },
  { key: "negative_public_attitude", label: "Negative Public Attitude (-)" },
  { key: "misc", label: "Miscellaneous (-)" },
];


  const handleChange = (cat: string, feel: string, val: number) => {
    setValues((prev) => ({
      ...prev,
      [cat]: {
        ...prev[cat],
        [feel]: val,
      },
    }));
  };

// row total: sum of all feelings for a category key
const getRowTotal = (catKey: string) =>
  feelings.reduce((sum, f) => sum + (values[catKey]?.[f] || 0), 0);

// column total: sum of a single feeling across all categories
const getColTotal = (feel: string) =>
  categories.reduce((sum, c) => sum + (values[c.key]?.[feel] || 0), 0);

// grand total: sum of all row totals
const getGrandTotal = () =>
  categories.reduce((sum, c) => sum + getRowTotal(c.key), 0);


  const totalElements = categories.length * feelings.length;
  const ratio = totalElements > 0 ? getGrandTotal() / totalElements : 0;

const saveForm7 = async () => {
  try {
    const payload = {
      type: "stress_feelings_frequencies",
      data: values, // stays keyed by category.key + feeling
      totals: {
        rowTotals: categories.map((c) => ({
          key: c.key,
          label: c.label,
          total: getRowTotal(c.key),
        })),
        colTotals: feelings.map((f) => ({
          feeling: f,
          total: getColTotal(f),
        })),
        grandTotal: getGrandTotal(),
        ratio: ratio.toFixed(4),
      },
    };

    await fetch("/api/saveStress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Form 7 saved successfully!");
  } catch (err) {
    console.error(err);
    alert("Error saving Form 7");
  }
};


  if (loading) return <p className="p-12">Loading stress scores...</p>;

  return (
    <div className="w-full p-12">
      <h2 className="text-2xl font-bold mb-4">Form 7: Stress Feelings / Frequencies</h2>
      <p className="text-gray-600 mb-6">
        Select frequency values per category × feeling. Max values are limited by your stress
        scores.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-purple-200">
              <th className="border p-2">Stress Category / Freq</th>
              {feelings.map((feel) => (
                <th key={feel} className="border p-2">
                  {feel}
                </th>
              ))}
              <th className="border p-2">Row Total</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.key}>
                <td>{cat.label}</td>
                {feelings.map((feel) => {
                  const max = maxScores[cat.key] ?? 0;
                  return (
                    <td key={feel}>
                      <select
                        value={values[cat.key]?.[feel] ?? ""}
                        onChange={(e) =>
                          handleChange(cat.key, feel, parseInt(e.target.value) || 0)
                        }
                      >
                        <option value="">--</option>
                        {Array.from({ length: max + 1 }, (_, i) => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </select>
                    </td>
                  );
                })}
              </tr>
            ))}


            <tr className="bg-purple-100 font-bold">
              <td className="border p-2">Column Totals (∑)</td>
              {feelings.map((feel) => (
                <td key={feel} className="border p-2 text-center">
                  {getColTotal(feel)}
                </td>
              ))}
              <td className="border p-2 text-center">{getGrandTotal()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-gray-700">
        <p>
          <strong>Ratio (∑xi / ∑all elements):</strong> {ratio.toFixed(4)}
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
