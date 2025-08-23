"use client";
import { useState } from "react";

export type EntryItem = {
  label: string;
  templateUrl: string;
  formId: string;
};

export function EntrySection({ title, items }: { title: string; items: EntryItem[] }) {
  const [open, setOpen] = useState(false);

  const go = (formId: string) => {
    const session = localStorage.getItem("appraisal_session_id") ?? "";
    const qs = session ? `?session=${encodeURIComponent(session)}` : "";
    window.location.href = `/data-entry/${formId}${qs}`;
  };

  return (
    <div className="bg-white rounded-md shadow mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4"
      >
        <span className="text-lg font-semibold">{title}</span>
        <span className="text-sm">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="px-4 pb-3">
          {items.map((it, i) => (
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
  );
}
