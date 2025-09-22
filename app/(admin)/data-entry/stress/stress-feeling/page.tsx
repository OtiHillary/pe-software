"use client";
import { useState } from "react";
import Form6 from "./_compoonents/form6"; // your existing Form6 component
import Form7 from "./_compoonents/form7"; // your existing Form7 component


export default function MultiStepStressForm() {
  const [step, setStep] = useState(1);
  const [form6Data, setForm6Data] = useState<any>(null);
  const [form7Data, setForm7Data] = useState<any>(null);

  const nextStep = () => setStep((s) => Math.min(s + 1, 2));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleFinalSubmit = async () => {
    try {
      const payload = {
        type: "stress_assessment",
        form6: form6Data,
        form7: form7Data,
      };

      await fetch("/api/saveStressAssessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      alert("All forms saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving stress assessment");
    }
  };

  return (
    <div className="w-full p-8">

      {/* conditional rendering */}
      {step === 1 && <Form6 onSave={(data) => setForm6Data(data)} />}
      {step === 2 && <Form7 onSave={(data) => setForm7Data(data)} />}

      {/* navigation buttons */}
      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Back
          </button>
        )}
        {step < 2 && (
          <button
            onClick={nextStep}
            className="px-6 py-2 rounded text-white bg-purple-600 hover:bg-purple-700"
          >
            Next
          </button>
        )}
        {step === 2 && (
          <button
            onClick={handleFinalSubmit}
            className="px-6 py-2 rounded text-white bg-green-600 hover:bg-green-700"
          >
            Submit All
          </button>
        )}
      </div>
    </div>
  );
}
