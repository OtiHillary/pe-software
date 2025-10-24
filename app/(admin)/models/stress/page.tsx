"use client";

import React, { useState, useEffect } from "react";
import { Calculator, BarChart3, Play, Save } from "lucide-react";
import { mean, variance } from "mathjs";
import jwt from "jsonwebtoken";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";

// Gaussian function generator
const generateNormalCurve = (mean: number, sd: number, n = 100) => {
  const data = [];
  const min = mean - 4 * sd;
  const max = mean + 4 * sd;
  const step = (max - min) / n;
  for (let x = min; x <= max; x += step) {
    const y =
      (1 / (sd * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((x - mean) / sd, 2));
    data.push({ x: Number(x.toFixed(2)), y });
  }
  return data;
};

// ====== Types ======
interface StressEntry {
  id: number;
  pesuser_name: string;
  org: string;
  dept: string;
  stress_theme: number;
  stress_feeling_frequency: number;
}

interface ANOVAResult {
  ssto: number;
  sstr: number;
  sse: number;
  fStatistic: number;
  criticalValue: number;
  conclusion: string;
  dfBetween: number;
  dfWithin: number;
  msBetween: number;
  msWithin: number;
}

interface GroupedData {
  [group: string]: number[];
}

// ====== Helper: ANOVA Function ======
const computeANOVA = (groups: GroupedData): ANOVAResult => {
  const allValues = Object.values(groups).flat();
  const overallMean = mean(allValues);
  const n = allValues.length;
  const k = Object.keys(groups).length;

  const ssto = allValues.reduce((sum, v) => sum + Math.pow(v - overallMean, 2), 0);
  let sstr = 0;
  Object.keys(groups).forEach((g) => {
    const groupMean = mean(groups[g]);
    sstr += groups[g].length * Math.pow(groupMean - overallMean, 2);
  });
  const sse = ssto - sstr;
  const dfBetween = k - 1;
  const dfWithin = n - k;
  const msBetween = sstr / dfBetween;
  const msWithin = sse / dfWithin;
  const fStatistic = msBetween / msWithin;
  const criticalValue = getCriticalValue(dfBetween, dfWithin);

  const conclusion =
    fStatistic > criticalValue
      ? "Reject H₀ — significant differences between groups."
      : "Accept H₀ — no significant difference between groups.";

  return {
    ssto,
    sstr,
    sse,
    fStatistic,
    criticalValue,
    conclusion,
    dfBetween,
    dfWithin,
    msBetween,
    msWithin,
  };
};

// ====== Helper: F-Critical Table ======
const getCriticalValue = (df1: number, df2: number): number => {
  const fTable: { [key: string]: number } = {
    "1,10": 4.96,
    "1,20": 4.35,
    "2,10": 4.10,
    "2,20": 3.49,
    "3,10": 3.71,
    "3,20": 3.10,
    "4,10": 3.48,
    "4,20": 2.87,
  };
  const key = `${df1},${Math.min(Math.max(Math.round(df2 / 10) * 10, 10), 20)}`;
  return fTable[key] || 2.89;
};

// ✅ Save Function
const saveAnovaResult = async (
  result: ANOVAResult,
  groupBy: "dept" | "stress_theme",
  allValues: number[]
) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const decoded: any = jwt.decode(access_token as string);

    const payload = {
      org: decoded?.org || "Unknown Org",
      group_by: groupBy,
      ssto: result.ssto,
      sstr: result.sstr,
      sse: result.sse,
      f_statistic: result.fStatistic,
      critical_value: result.criticalValue,
      conclusion: result.conclusion,
      df_between: result.dfBetween,
      df_within: result.dfWithin,
      ms_between: result.msBetween,
      ms_within: result.msWithin,
      mean: mean(allValues),
      // std_dev: Math.sqrt(variance(allValues)),
      std_dev: Math.sqrt(Number(variance(allValues))),
    };

    const res = await fetch("/api/stress-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to save result");

    alert("✅ Stress result saved successfully!");
    console.log("Saved:", data.data);
  } catch (error) {
    console.error("❌ Error saving ANOVA result:", error);
    alert("❌ Failed to save ANOVA result.");
  }
};

export default function StressAnalysisTool() {
  const [activeTab, setActiveTab] = useState<"analysis" | "results">("analysis");
  const [stressData, setStressData] = useState<StressEntry[]>([]);
  const [anovaResult, setAnovaResult] = useState<ANOVAResult | null>(null);
  const [groupBy, setGroupBy] = useState<"dept" | "stress_theme">("dept");

  useEffect(() => {
    async function fetchStressData() {
      const access_token = localStorage.getItem("access_token");
      const decoded: any = jwt.decode(access_token as string);

      try {
        const res = await fetch("/api/stress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ org: decoded?.org }),
        });
        const data = await res.json();
        setStressData(data);
      } catch (err) {
        console.error("Error fetching stress data:", err);
      }
    }
    fetchStressData();
  }, []);

  const runANOVA = () => {
    if (!stressData.length) return;

    const grouped: GroupedData = {};
    const allValues: number[] = [];

    stressData.forEach((entry) => {
      const key = groupBy === "dept" ? entry.dept : `Category-${entry.stress_theme}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(entry.stress_feeling_frequency);
      allValues.push(entry.stress_feeling_frequency);
    });

    const result = computeANOVA(grouped);
    setAnovaResult(result);
    setActiveTab("results");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Stress Evaluation</h1>
            <p className="text-gray-600">
              Statistical computation of stress ANOVA
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {[
            { id: "analysis", label: "Analysis", icon: Calculator },
            { id: "results", label: "Results", icon: BarChart3 },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === id
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Analysis */}
        {activeTab === "analysis" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Data Summary</h2>
              <button
                onClick={runANOVA}
                disabled={!stressData.length}
                className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Play className="w-4 h-4" />
                Run ANOVA
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-2">
              Total entries loaded: <strong>{stressData.length}</strong>
            </p>

            {!stressData.length && (
              <div className="text-gray-500 text-center py-8">
                No stress data found.
              </div>
            )}

            {stressData.length > 0 && (
              <div className="overflow-x-auto mt-4">
                <table className="w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border px-4 py-2 text-left">Name</th>
                      <th className="border px-4 py-2 text-left">Dept</th>
                      <th className="border px-4 py-2 text-left">Theme</th>
                      <th className="border px-4 py-2 text-left">Feeling</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stressData.slice(0, 20).map((s) => (
                      <tr key={s.id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{s.pesuser_name}</td>
                        <td className="border px-4 py-2">{s.dept}</td>
                        <td className="border px-4 py-2">{s.stress_theme}</td>
                        <td className="border px-4 py-2">
                          {s.stress_feeling_frequency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {activeTab === "results" && anovaResult && (
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
                ANOVA Results
              </h2>

              {/* ✅ Save Results Button */}
              <button
                onClick={() =>
                  saveAnovaResult(
                    anovaResult,
                    groupBy,
                    stressData.map((s) => s.stress_feeling_frequency)
                  )
                }
                className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <Save className="w-4 h-4" />
                Save Results
              </button>
            </div>

            {/* Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Sum of Squares</h3>
                <p>SSTO: {anovaResult.ssto.toFixed(4)}</p>
                <p>SSTR: {anovaResult.sstr.toFixed(4)}</p>
                <p>SSE: {anovaResult.sse.toFixed(4)}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Test Statistics</h3>
                <p>F = {anovaResult.fStatistic.toFixed(4)}</p>
                <p>F₀.₀₅ = {anovaResult.criticalValue.toFixed(4)}</p>
                <p>
                  df = ({anovaResult.dfBetween}, {anovaResult.dfWithin})
                </p>
              </div>
            </div>

            {/* Bell Curve */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Stress Graph
              </h3>
              <StressBellCurveChart
                data={stressData.map((s) => s.stress_feeling_frequency)}
              />
            </div>

            {/* Conclusion */}
            <div
              className={`p-4 rounded-lg ${
                anovaResult.fStatistic > anovaResult.criticalValue
                  ? "bg-red-50 border-l-4 border-red-400"
                  : "bg-green-50 border-l-4 border-green-400"
              }`}
            >
              <h3
                className={`font-semibold mb-2 ${
                  anovaResult.fStatistic > anovaResult.criticalValue
                    ? "text-red-700"
                    : "text-green-700"
                }`}
              >
                Conclusion
              </h3>
              <p>{anovaResult.conclusion}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ===== Bell Curve Component =====
const StressBellCurveChart = ({ data }: { data: number[] }) => {
  if (!data || data.length === 0) return null;
  const m = mean(data);
  const v = variance(data);
  const sd = Math.sqrt(Number(v));
  // const sd = Math.sqrt(v);
  const curveData = generateNormalCurve(m, sd);

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={curveData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="x"
            label={{
              value: "Stress Score",
              position: "insideBottom", 
              dy: 10,
            }}
          />
          <YAxis hide domain={[0, "auto"]} />
          <Tooltip formatter={(value: number) => value.toFixed(4)} />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#4f46e5"
            dot={false}
            strokeWidth={2}
          />
          <ReferenceArea
            x1={m - sd}
            x2={m + sd}
            fill="#93c5fd"
            fillOpacity={0.3}
            label={{ value: "±1σ", position: "insideTop" }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-3 text-sm text-gray-600">
        <p>
          Mean Stress Score: <strong>{m.toFixed(2)}</strong>
        </p>
        <p>
          Standard Deviation: <strong>{sd.toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
};
