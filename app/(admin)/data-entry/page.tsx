"use client";
import { useState } from "react";
import { EntrySection } from "../../components/EntrySection";


const stress = [
  { label: "Staff Stress Category form",   templateUrl: "/templates/stress_category.xlsx",   formId: "/stress/stress-category"   },
  { label: "Stress Theme form",            templateUrl: "/templates/stress_theme.xlsx",      formId: "/stress/stress-theme"      },
  { label: "Stress Feeling/Frequency form",templateUrl: "/templates/stress_frequency.xlsx",  formId: "/stress/stress-feeling"  },
];

export default function DataEntryPage() {
  const [open, setOpen] = useState(false);

  const go = (formId: string) => {
    const session = localStorage.getItem("appraisal_session_id") ?? "";
    const qs = session ? `?session=${encodeURIComponent(session)}` : "";
    window.location.href = `/data-entry/${formId}${qs}`;
  };

  return (
    <div className="w-full p-12">

      <EntrySection to={'/data-entry/appraisal'} title={'Appraisal'} />
      <EntrySection to={'/data-entry/performance'} title={'Performance'} />

      {/* <EntrySection title="Stress Factor" /> */}
      <div className="bg-white rounded-md shadow mb-4">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center p-4"
        >
          <span className="text-lg font-semibold">Stress</span>
          <span className="text-sm">{open ? "v" : ">"}</span>
        </button>

        {open && (
          <div className="px-4 pb-3">
            {stress.map((it, i) => (
              <div key={`${it.formId}-${i}`} className="flex justify-between items-center py-2 border-t">
                <span className="text-sm">{it.label}</span>
                <div className="flex gap-4">
                  <a
                    href={it.templateUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600"
                  >
                    Download Template
                  </a>
                  <button
                    className="bg-pes text-white px-4 py-1 rounded"
                    onClick={() => go(it.formId)}
                  >
                    Start Data Entry
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
