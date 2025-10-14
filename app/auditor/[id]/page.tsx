"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuditorQuestions({ params }: { params: { id: string } }) {
  const router = useRouter();
  const email = params.id; // Extracted email
  const [responses, setResponses] = useState<string[]>(Array(12).fill("")); // updated to match 12 questions
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    gsm: "",
    address: "",
    dob: "",
    image: "",
  });

  const handleResponseChange = (index: number, value: string) => {
    const updated = [...responses];
    updated[index] = value;
    setResponses(updated);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ check all required fields are filled
  const isFormComplete =
    formData.name.trim() !== "" &&
    formData.gsm.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.dob.trim() !== "" &&
    responses.every((r) => r.trim() !== "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auditor-responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, responses, ...formData }),
      });

      if (response.ok) {
        setMessage("✅ Submitted successfully! Awaiting admin approval.");
        router.push("/thank-you");
      } else {
        setMessage("❌ Failed to submit.");
      }
    } catch (error) {
      setMessage("⚠️ An error occurred while submitting.");
    }
  };

  const questions = [
    "Will you be validating the input data for the current Appraisal and evaluation period?",
    "Will you be validating the entire process based on accountability and fair judgment?",
    "Will your validating of the process be based on Guided Standard which you will make available at the end of the process?",
    "Will exceptions be raised for conflicts detected in the system?",
    "Will your roles as an invited external auditor be independent?",
    "Are you ready to suggest workable frameworks where you deem it fit?",
    "Do you accept that your Management letter at the end of the process be made available to the management?",
    "Where awards are applicable for motivation purposes as suggested by the system software, will you validate to ensure that there isn’t marginalization or nepotism?",
    "Are you welcome to open criticism?",
    "Will you be executing on proxy this exercise you are called on to do?",
    "Will this exercise you are called on to do be done remotely?",
    "If invited again in the future, will you accept the invitation even if you were openly criticized?",
  ];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-2xl shadow-md bg-white text-pes">
      <h1 className="text-2xl font-semibold mb-6">Auditor Registration</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Personal Information</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => handleFormChange("name", e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="GSM"
            value={formData.gsm}
            onChange={(e) => handleFormChange("gsm", e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => handleFormChange("address", e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            type="date"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={(e) => handleFormChange("dob", e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Yes/No Questions */}
        <div className="space-y-4 mt-6">
          <h2 className="text-lg font-semibold">Audit Questions</h2>

          {questions.map((question, index) => (
            <div key={index} className="space-y-2">
              <label className="block font-medium">
                {index + 1}. {question}
              </label>
              <select
                value={responses[index]}
                onChange={(e) => handleResponseChange(index, e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Select an answer</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={!isFormComplete}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium transition ${
            isFormComplete
              ? "bg-pes hover:opacity-90 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed opacity-60"
          }`}
        >
          Submit
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-sm font-medium ${
            message.includes("✅")
              ? "text-green-600"
              : message.includes("❌")
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
