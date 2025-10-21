"use client";

import { useState } from "react";
import { EntrySection } from "../../components/EntrySection";
import { jwtDecode } from "jwt-decode";
// Enable dynamic rendering for this page
export const dynamic = "force-dynamic";

const stress = [
  { label: "Staff Stress Category form",   templateUrl: "/templates/stress_category.xlsx",   formId: "/stress/stress-category"   },
  { label: "Stress Theme/Feeling/Frequency form",            templateUrl: "/templates/stress_theme.xlsx",      formId: "/stress/stress-feeling"      },
];

export default function DataEntryPage() {
  const [open, setOpen] = useState(false);

  const go = (formId: string) => {
    window.location.href = `/data-entry/${formId}`;
  };
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const user = token ? jwtDecode<any>(token) : null;

  return (
    <div className="w-full p-12">
      {
        user?.role === "auditor"?
          <EntrySection to={'/data-entry/auditor'} title={'Staff data entries(Auditor)'} />
        :
          <>
            <EntrySection to={'/data-entry/appraisal'} title={'Appraisal'} />
            <EntrySection to={'/data-entry/performance'} title={'Performance'} />

            {/* Stress section */}
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
          </>
      }


      {
        user?.role === "hod"?
        <>
          <EntrySection to={'/data-entry/employee'} title={'Staff data entries'} />
          <EntrySection to={'/data-entry/students'} title={'Student data entries'} />        
        </>

        :
        <></>
      }
    </div>
  );
}
