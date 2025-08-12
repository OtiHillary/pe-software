"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function UnitHeadOverloadingPage() {
  const searchParams = useSearchParams();

  const [actualHours, setActualHours] = useState<number | "">("");
  const [numSubs, setNumSubs] = useState<number | "">("");
  const [extraComplexity, setExtraComplexity] = useState<number | "">("");
  const [optimalHours, setOptimalHours] = useState<number | "">("");
  const [optimalK, setOptimalK] = useState<number | "">("");

  const [result, setResult] = useState<null | {
    CF: number;
    OR: number;
    status: string;
  }>(null);

  useEffect(() => {
    const kParam = searchParams.get("Kstar");
    const hParam = searchParams.get("Hstar");
    if (kParam && !isNaN(Number(kParam))) {
      setOptimalK(Number(kParam));
    }
    if (hParam && !isNaN(Number(hParam))) {
      setOptimalHours(Number(hParam));
    }
  }, [searchParams]);

  const isFormValid = () => {
    return (
      actualHours !== "" &&
      numSubs !== "" &&
      extraComplexity !== "" &&
      optimalHours !== "" &&
      Number(numSubs) > 0 &&
      Number(optimalHours) > 0
    );
  };

  const calculate = () => {
    const CF =
      1 + Number(extraComplexity) / Number(numSubs);
    const OR =
      (Number(actualHours) * CF) / Number(optimalHours);

    let status = "";
    if (OR > 1.05) status = "Overloaded";
    else if (OR < 0.95) status = "Underloaded";
    else status = "Optimal";

    setResult({ CF, OR, status });
  };

  const numberInput = (
    label: string,
    value: number | "",
    setValue: (val: number | "") => void,
    opts: { min?: number; step?: number } = {}
  ) => (
    <label className="block">
      <div className="text-sm font-medium">{label}</div>
      <input
        type="number"
        value={value}
        min={opts.min}
        step={opts.step}
        onChange={(e) =>
          setValue(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
      />
    </label>
  );

  return (
    <div className="w-full p-8 mx-auto">
      <a className="me-3 hover:underline hover:text-pes" href="/models/personnel-utilization">Back</a>

      <h1 className="text-2xl font-bold mb-4">
        Model 14 — Unit Head Overloading
      </h1>
      <p className="text-gray-600 mb-6">
        Calculates Overload Ratio (OR).
        Uses optional K* and H*.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {numberInput(
          "Actual supervisory hours/week",
          actualHours,
          setActualHours,
          { min: 0, step: 0.1 }
        )}
        {numberInput(
          "Number of subordinates",
          numSubs,
          setNumSubs,
          { min: 1, step: 1 }
        )}
        {numberInput(
          "Total extra complexity weight",
          extraComplexity,
          setExtraComplexity,
          { min: 0, step: 0.1 }
        )}
        {numberInput(
          "Optimal supervisory hours (from H* if provided)",
          optimalHours,
          setOptimalHours,
          { min: 0, step: 0.1 }
        )}
        {numberInput(
          "Optimal K (from K* if provided)",
          optimalK,
          setOptimalK,
          { min: 0, step: 1 }
        )}
      </div>

      <button
        onClick={calculate}
        disabled={!isFormValid()}
        className={`px-4 py-2 rounded text-white ${
          isFormValid()
            ? "bg-pes hover:bg-blue-900"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Calculate
      </button>

      {result && (
        <div className="bg-white p-4 rounded shadow mt-6">
          <h2 className="text-lg font-semibold mb-2">Results</h2>
          <p>
            <strong>Complexity Factor (CF):</strong>{" "}
            {result.CF.toFixed(3)}
          </p>
          <p>
            <strong>Overload Ratio (OR):</strong>{" "}
            {result.OR.toFixed(3)}
          </p>
          <p
            className={`font-semibold ${
              result.status === "Optimal"
                ? "text-green-600"
                : result.status === "Overloaded"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            Status: {result.status}
          </p>
        </div>
      )}
    </div>
  );
}
