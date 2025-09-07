"use client";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

type JWTPayload = {
  name?: string;
  role?: string;
  org?: number;
};

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

const themes = [
  "Control of Time",
  "Inference with Instruction",
  "Overload Qualitative",
  "Overload Quantitative",
  "Under-load Qualitative",
  "Under-load Quantitative",
  "General Performance",
  "Threat to Self",
  "Precipitate Change"
];

// mapping your category labels -> DB column names
const categoryMap: Record<string, string> = {
  "Organization (-)": "organizational",
  "Student (-)": "student",
  "Administrative (-)": "administrative",
  "Teacher (-)": "teacher",
  "Parent (-)": "parents",
  "Occupational (-)": "occupational",
  "Personal (-)": "personal",
  "Academic Program (-)": "academic_program",
  "Negative Public Attitude (-)": "negative_public_attitude",
  "Miscellaneous (-)": "misc"
};

export default function Form6() {
  const [values, setValues] = useState<Record<string, Record<string, number>>>(
    {}
  );

  const handleChange = (cat: string, theme: string, val: number) => {
    setValues((prev) => ({
      ...prev,
      [cat]: {
        ...prev[cat],
        [theme]: val
      }
    }));
  };

  // totals
  const getRowTotal = (cat: string) =>
    themes.reduce((sum, t) => sum + (values[cat]?.[t] || 0), 0);

  const getColTotal = (theme: string) =>
    categories.reduce((sum, c) => sum + (values[c]?.[theme] || 0), 0);

  const getGrandTotal = () =>
    categories.reduce((sum, c) => sum + getRowTotal(c), 0);

  // percentages (per theme)
  const grandTotal = getGrandTotal();
  const getColPercent = (theme: string) =>
    grandTotal > 0
      ? ((getColTotal(theme) / grandTotal) * 100).toFixed(2)
      : "0.00";

  const saveForm6 = async () => {
    try {
      // decode user from token
      const token = localStorage.getItem("token");
      const decoded = token ? (jwtDecode(token) as JWTPayload) : {};

      // map row totals into scores object for backend
      const scores: Record<string, number> = {};
      categories.forEach((cat) => {
        const dbField = categoryMap[cat];
        scores[dbField] = getRowTotal(cat);
      });

      const payload = {
        user_name: decoded.name || "anonymous",
        dept: decoded.role || "unknown",
        scores
      };

      await fetch("/api/saveStressScore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      alert("Form 6 saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving Form 6");
    }
  };

  return (
    <div className="w-full p-12">
      <h2 className="text-2xl font-bold mb-4">
        Form 6: Stress Themes Category Values
      </h2>
      <p className="text-gray-600 mb-6">
        Enter values for each stress theme per category. Use{" "}
        <strong>0</strong> where not applicable.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-purple-200">
              <th className="border p-2">Stress Category</th>
              {themes.map((t) => (
                <th key={t} className="border p-2">
                  {t}
                </th>
              ))}
              <th className="border p-2">Row Total</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat}>
                <td className="border p-2 font-medium">{cat}</td>
                {themes.map((theme) => (
                  <td key={theme} className="border p-2">
                    <input
                      type="number"
                      min={0}
                      className="w-20 border rounded p-1 text-center"
                      value={values[cat]?.[theme] ?? ""}
                      onChange={(e) =>
                        handleChange(cat, theme, parseFloat(e.target.value) || 0)
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
              {themes.map((theme) => (
                <td key={theme} className="border p-2 text-center">
                  {getColTotal(theme)}
                </td>
              ))}
              <td className="border p-2 text-center">{grandTotal}</td>
            </tr>

            {/* Percentages row */}
            <tr className="bg-yellow-100 font-bold">
              <td className="border p-2">% of Total</td>
              {themes.map((theme) => (
                <td key={theme} className="border p-2 text-center">
                  {getColPercent(theme)}%
                </td>
              ))}
              <td className="border p-2 text-center">100%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={saveForm6}
        className="mt-6 px-6 py-2 rounded text-white bg-pes"
      >
        Save Form 6
      </button>
    </div>
  );
}
