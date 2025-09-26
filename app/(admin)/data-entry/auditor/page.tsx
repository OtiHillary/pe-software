"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  org: any;
  dept?: string | number;
}

interface EmployeeScores {
  pesuser_name: string;
  dept: string;
  appraisal?: Record<string, number>;
  performance?: Record<string, number>;
  stress?: Record<string, number>;
  counter_appraisal?: Record<string, number>;
  counter_performance?: Record<string, number>;
  counter_stress?: Record<string, number>;
}

type GroupKey = "appraisal" | "performance" | "stress";

export default function AuditorScoresPage() {
  const [scores, setScores] = useState<EmployeeScores[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedGroup, setSelectedGroup] = useState<GroupKey | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeScores | null>(null);
  const [auditorScores, setAuditorScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("No access token found");
      setLoading(false);
      return;
    }
    const decoded: JWTPayload = jwtDecode(token);
    const org = decoded.org;

    if (!org) {
      setError("No org found in token");
      setLoading(false);
      return;
    }

    fetch(`/api/getAllDataScores?org=${org}`)
      .then((res) => res.json())
      .then((data) => {
        setScores(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch scores");
        setLoading(false);
      });
  }, []);

  function handleAuditorChange(metric: string, value: number) {
    setAuditorScores((prev) => ({ ...prev, [metric]: value }));
  }

  async function handleSubmit() {
    if (!selectedEmployee || !selectedGroup) return;

    const decoded = jwtDecode<JWTPayload>(localStorage.getItem("access_token") || "");
    const org = decoded.org;
    // const dept = decoded.dept;

    const apiEndpoints: Record<GroupKey, string> = {
      appraisal: `/api/saveAppraisal?org=${org}`,
      performance: `/api/savePerformance?org=${org}`,
      stress: `/api/saveStress?org=${org}`,
    };

    const endpoint = apiEndpoints[selectedGroup];

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pesuser_name: selectedEmployee.pesuser_name,
          org,
          isAuditor: true, // 👈 mark as auditor resolution
          ...auditorScores,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed");

      console.log("Auditor scores submitted:", result);
      alert("Auditor scores submitted successfully!");
      setAuditorScores({});
      setSelectedEmployee(null);
    } catch (err) {
      console.error("Error submitting auditor scores:", err);
      alert("Failed to submit auditor scores");
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between">       
        <h1 className="text-xl font-bold mb-4">Auditor Resolution</h1>
        {selectedGroup && !selectedEmployee && (
          <button
            onClick={() => setSelectedGroup(null)}
            className="mb-4 px-3 py-1 bg-gray-200 rounded"
          >
            ← Back
          </button>            
        )}
      </div>

      {/* Step 1: Select Group */}
      {!selectedGroup && (
        <div className="grid grid-cols-3 gap-4">
          {(["appraisal", "performance", "stress"] as GroupKey[]).map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className="p-6 bg-yellow-50 hover:bg-yellow-100 rounded-lg shadow text-lg font-semibold capitalize"
            >
              {g}
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Select Employee */}
      {selectedGroup && !selectedEmployee && (
        <div>
          <h2 className="text-lg font-semibold mb-4 capitalize">
            {selectedGroup} Scores
          </h2>
          <ul className="space-y-3">
            {scores?.map((emp) => {
              const groupScores = emp[selectedGroup];
              if (!groupScores) return null;
              return (
                <li
                  key={emp.pesuser_name}
                  className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedEmployee(emp)}
                >
                  <div>
                    <p className="font-semibold">{emp.pesuser_name}</p>
                    <p className="text-sm text-gray-500">{emp.dept}</p>
                  </div>
                  <span className="text-blue-600 font-medium">Resolve →</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

        {/* Step 3: Auditor Resolution */}
        {selectedGroup && selectedEmployee && (
        <div>
            <button
            onClick={() => setSelectedEmployee(null)}
            className="mb-4 ms-auto px-3 py-1 bg-gray-200 rounded"
            >
            ← Back to {selectedGroup} list
            </button>
            <h2 className="text-lg font-semibold mb-4">
            {selectedEmployee.pesuser_name} ({selectedEmployee.dept})
            </h2>

            {/* Table header */}
            <div className="grid grid-cols-3 font-semibold bg-gray-100 p-2 rounded">
            <span>Employee Score</span>
            <span>HOD Score for employee</span>
            <span>Auditor Resolution</span>
            </div>

            {/* Table rows */}
            <div className="space-y-2 mt-2">
            {Object.entries(selectedEmployee[selectedGroup] || {}).map(([metric, empScore]) => {
                const counterKey = `counter_${selectedGroup}` as keyof EmployeeScores;
                const hodScore = selectedEmployee[counterKey]?.[metric];

                return (
                <div
                    key={metric}
                    className="grid grid-cols-3 items-center border rounded p-2 bg-white shadow-sm"
                >
                    {/* Employee score */}
                    <div>
                    <p className="font-medium capitalize">{metric.replace(/_/g, " ")}</p>
                    <p className="text-green-600 font-bold">{empScore}</p>
                    </div>

                    {/* HOD Counter */}
                    <div>
                    {hodScore !== undefined ? (
                        <p className="text-blue-600 font-bold">{hodScore}</p>
                    ) : (
                        <p className="text-gray-400 italic">N/A</p>
                    )}
                    </div>

                    {/* Auditor input */}
                    <div>
                    <input
                        type="number"
                        placeholder="Resolution"
                        className="border border-gray-400 rounded p-1 w-28"
                        onChange={(e) =>
                        handleAuditorChange(metric, parseInt(e.target.value, 10))
                        }
                    />
                    </div>
                </div>
                );
            })}
            </div>

            <button
            onClick={handleSubmit}
            className="mt-6 px-4 py-2 bg-purple-700 hover:bg-purple-900 text-white rounded shadow"
            >
            Submit Auditor Scores
            </button>
        </div>
        )}
    </div>
  );
}
