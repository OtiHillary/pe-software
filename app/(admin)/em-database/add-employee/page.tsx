"use client";

import { useState } from "react";
import { useMultistepForm } from "./useMultistep";

import Formone from "./multistep-form/form_one";
import Formtwo from "./multistep-form/form_two";
import Formthree from "./multistep-form/form_three";

export default function MainForm() {
  const [formdata, setFormdata] = useState({});
  const [stepValid, setStepValid] = useState(false); // 🔥 key addition

  function updateFields(fields) {
    setFormdata(prev => ({ ...prev, ...fields }));
  }

  const steps = [
    <Formone formdata={formdata} updateFields={updateFields} setStepValid={setStepValid} />,
    <Formtwo formdata={formdata} updateFields={updateFields} setStepValid={setStepValid} />,
    <Formthree formdata={formdata} updateFields={updateFields} setStepValid={setStepValid} />,
  ];

  const {
    step,
    steps: stepList,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    back,
    next
  } = useMultistepForm(steps);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isLastStep) return next();

    console.log("Submitting:", formdata);

    fetch("/api/addEmployee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          // reroute to employee database page
          window.location.href = "/admin/em-database";
        } else {
          // Handle errors
          alert("error");
        }
      });

  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col bg-white m-4">
      <div className="w-full h-[4rem] flex justify-between">
        <h1 className="my-auto mx-6 font-semibold text-xl">Add an Employee</h1>
      </div>

      <div className="bg-gray-50 h-[3rem] flex justify-between">
        <h1 className="my-auto mx-6 font-semibold">
          Step {currentStepIndex + 1}
        </h1>
        <h1 className="my-auto mx-6 font-semibold">
          {currentStepIndex + 1} / {stepList.length}
        </h1>
      </div>

      {step}

      <div className="w-full my-4 flex justify-between">
        {!isFirstStep && (
          <button
            type="button"
            className="btn rounded-sm py-2 px-8 border mx-8 border-pes text-pes"
            onClick={back}
          >
            Previous
          </button>
        )}

        <button
          type="submit"
          disabled={!stepValid}               // 🔥 disable logic
          className={`btn rounded-sm py-2 px-16 mx-8 border border-pes text-white ms-auto
            ${stepValid ? "bg-pes" : "bg-gray-400 cursor-not-allowed"}`}
        >
          {isLastStep ? "Finish" : "Next"}
        </button>
      </div>
    </form>
  );
}
