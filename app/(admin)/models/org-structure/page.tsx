"use client";

import { useState } from "react";

export default function OrgStructurePage() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  // ===== Section 17 =====
  const section17Link = "https://example.com/personnel-utilization.pdf";

  // ===== Section 18 =====
  const [section18Numerator, setSection18Numerator] = useState<number[]>([0]);
  const [section18DenominatorA, setSection18DenominatorA] = useState<number[]>([0]);
  const [section18DenominatorB, setSection18DenominatorB] = useState<number[]>([0]);
  const [section18Result, setSection18Result] = useState<number | null>(null);

  const calcSection18 = () => {
    const sumNum = section18Numerator.reduce((a, b) => a + b, 0);
    const sumDenA = section18DenominatorA.reduce((a, b) => a + b, 0);
    const sumDenB = section18DenominatorB.reduce((a, b) => a + b, 0);
    const result = sumDenA && sumDenB ? sumNum / (sumDenA * sumDenB) : 0;
    setSection18Result(result);
  };

  // ===== Section 19 =====
  const [section19Numerator, setSection19Numerator] = useState<number[]>([0]);
  const [section19Denominator, setSection19Denominator] = useState<number[]>([0]);
  const [Z, setZ] = useState<number | "">("");
  const [section19Result, setSection19Result] = useState<number | null>(null);

  const calcSection19 = () => {
    const sumNum = section19Numerator.reduce((a, b) => a + b, 0);
    const sumDen = section19Denominator.reduce((a, b) => a + b, 0);
    const result = sumDen ? (Number(Z) * sumNum) / sumDen : 0;
    setSection19Result(result);
  };

  // ===== Section 20 =====
  const [maxInput, setMaxInput] = useState<number | "">("");
  const [minInput, setMinInput] = useState<number | "">("");
  const [maxResult, setMaxResult] = useState<number | null>(null);
  const [minResult, setMinResult] = useState<number | null>(null);

  const calcMax = () => setMaxResult(Number(maxInput)); // Replace with PDF formula
  const calcMin = () => setMinResult(Number(minInput)); // Replace with PDF formula

  // ===== Section 21 =====
  const [prNumerator, setPrNumerator] = useState<number | "">("");
  const [prDenominator, setPrDenominator] = useState<number | "">("");
  const [prResult, setPrResult] = useState<number | null>(null);

  const calcPR = () => {
    const result =
      Number(prDenominator) !== 0
        ? (Number(prNumerator) / Number(prDenominator)) * 100
        : 0;
    setPrResult(result);
  };

  // ===== Section 22 =====
  const [a, setA] = useState<number | "">("");
  const [b, setB] = useState<number | "">("");
  const [x, setX] = useState<number | "">("");
  const [projResult, setProjResult] = useState<number | null>(null);

  const calcProjection = () => {
    const result = Number(a) + Number(b) * Number(x);
    setProjResult(result);
  };

  // ===== Helpers =====
  const numberInput = (
    label: string,
    value: number | "",
    setValue: (v: number | "") => void,
    opts: { min?: number; step?: number } = {}
  ) => (
    <label className="block mb-2">
      <div className="text-sm font-medium">{label}</div>
      <input
        type="number"
        min={opts.min}
        step={opts.step}
        value={value}
        onChange={(e) =>
          setValue(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="mt-1 block w-full rounded border-gray-300 p-2 shadow-sm"
      />
    </label>
  );

  const dynamicList = (
    label: string,
    list: number[],
    setList: (v: number[]) => void
  ) => (
    <div className="mb-4">
      <div className="font-medium mb-2">{label}</div>
      {list.map((val, idx) => (
        <input
          key={idx}
          type="number"
          value={val}
          onChange={(e) => {
            const newList = [...list];
            newList[idx] = Number(e.target.value);
            setList(newList);
          }}
          className="block w-full mb-2 rounded border-gray-300 p-2 shadow-sm"
        />
      ))}
      <button
        onClick={() => setList([...list, 0])}
        type="button"
        className="px-3 py-1 bg-gray-200 rounded"
      >
        + Add Row
      </button>
    </div>
  );

  const section = (
    key: string,
    title: string,
    children: React.ReactNode
  ) => (
    <div className="border rounded mb-4">
      <button
        onClick={() => setOpenSection(openSection === key ? null : key)}
        className="w-full text-left p-3 bg-gray-100 font-semibold"
      >
        {title}
      </button>
      {openSection === key && <div className="p-4">{children}</div>}
    </div>
  );

  return (
    <div className="w-full mx-auto p-12">
      <h1 className="text-2xl font-bold mb-6">
        Organization Structure Models (17–22)
      </h1>

      {/* Section 17 */}
      {section(
        "s17",
        "17. Determine Organization Size at Supervisory Level",
        <>
          <p className="mb-4">
            In a fair organization, optimal value at the supervisory level is
            from the Personnel Utilization Table:
          </p>
          <a
            href={section17Link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            View Personnel Utilization Table
          </a>
        </>
      )}

      {/* Section 18 */}
      {section(
        "s18",
        "18. Determination of the Size of an Organization Structure",
        <>
          {dynamicList("Numerator terms (Σ...)", section18Numerator, setSection18Numerator)}
          {dynamicList("Denominator part A (Σ...)", section18DenominatorA, setSection18DenominatorA)}
          {dynamicList("Denominator part B (Σ...)", section18DenominatorB, setSection18DenominatorB)}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={calcSection18}
          >
            Calculate
          </button>
          {section18Result !== null && (
            <div className="mt-4 bg-white p-4 rounded shadow">
              <p><strong>Result (S):</strong> {section18Result.toFixed(2)}</p>
            </div>
          )}
        </>
      )}

      {/* Section 19 */}
      {section(
        "s19",
        "19. Shape of an Organization’s Structure",
        <>
          {numberInput("Z — Avg. number of management positions per level", Z, setZ)}
          {dynamicList("Numerator terms (Σ...)", section19Numerator, setSection19Numerator)}
          {dynamicList("Denominator terms (Σ...)", section19Denominator, setSection19Denominator)}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={calcSection19}
          >
            Calculate
          </button>
          {section19Result !== null && (
            <div className="mt-4 bg-white p-4 rounded shadow">
              <p><strong>Shape (E):</strong> {section19Result.toFixed(2)}</p>
            </div>
          )}
        </>
      )}

      {/* Section 20 */}
      {section(
        "s20",
        "20. Organizational Design",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Max (p.68–70)</h3>
              {numberInput("Input for Max formula", maxInput, setMaxInput)}
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={calcMax}
              >
                Calculate Max
              </button>
              {maxResult !== null && (
                <p className="mt-2"><strong>Max:</strong> {maxResult}</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold mb-2">Min (p.74)</h3>
              {numberInput("Input for Min formula", minInput, setMinInput)}
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={calcMin}
              >
                Calculate Min
              </button>
              {minResult !== null && (
                <p className="mt-2"><strong>Min:</strong> {minResult}</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Section 21 */}
      {section(
        "s21",
        "21. Real Percentage Redundancy (PR%)",
        <>
          {numberInput("Numerator", prNumerator, setPrNumerator)}
          {numberInput("Denominator", prDenominator, setPrDenominator)}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={calcPR}
          >
            Calculate
          </button>
          {prResult !== null && (
            <div className="mt-4 bg-white p-4 rounded shadow">
              <p><strong>PR%:</strong> {prResult.toFixed(2)}%</p>
            </div>
          )}
        </>
      )}

      {/* Section 22 */}
      {section(
        "s22",
        "22. Predicting / Projecting Future Personnel Requirements",
        <>
          {numberInput("a — Intercept", a, setA)}
          {numberInput("b — Gradient", b, setB)}
          {numberInput("x — Production/service volume", x, setX)}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={calcProjection}
          >
            Calculate
          </button>
          {projResult !== null && (
            <div className="mt-4 bg-white p-4 rounded shadow">
              <p><strong>Predicted Personnel Requirement:</strong> {projResult.toFixed(2)}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
