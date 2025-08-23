"use client";
import { EntrySection, EntryItem } from "../../components/EntrySection";
import { useAppraisalSession } from "../../lib/useAppraisalSession";

const appraisal: EntryItem[] = [
  { label: "Teaching Quality Evaluation",         templateUrl: "/templates/teaching_quality.xlsx",    formId: "teaching-performance"  },
  { label: "Research Paper Quality Evaluation",   templateUrl: "/templates/research_quality.xlsx",    formId: "research-quality" },
  { label: "Administrative Quality",              templateUrl: "/templates/admin_quality.xlsx",       formId: "administrative-quality" },
  { label: "Community Quality",                   templateUrl: "/templates/community_quality.xlsx",   formId: "community-quality" },
  { label: "Other Relevant Information",          templateUrl: "/templates/other_info.xlsx",          formId: "form13" },
];

const performance: EntryItem[] = [
  { label: "Competence",      templateUrl: "/templates/competence.xlsx",   formId: "competence" },
  { label: "Integrity",       templateUrl: "/templates/integrity.xlsx",    formId: "integrity"  },
  { label: "Compatibility",   templateUrl: "/templates/compatibility.xlsx",formId: "compatibility"     },
  { label: "Use of Resources",templateUrl: "/templates/resources.xlsx",    formId: "use-of-resources"  },
];

const stress: EntryItem[] = [
  { label: "Staff Stress Category form",   templateUrl: "/templates/stress_category.xlsx",   formId: "stress-category"   },
  { label: "Stress Theme form",            templateUrl: "/templates/stress_theme.xlsx",      formId: "stress-theme"      },
  { label: "Stress Feeling/Frequency form",templateUrl: "/templates/stress_frequency.xlsx",  formId: "stress-feeling"  },
];

export default function DataEntryPage() {
  const sessionId = useAppraisalSession();

  return (
    <div className="w-full p-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Entry</h1>
        <p className="text-sm text-gray-500">Deadline for Data entry: dd/mm/yyyy</p>
      </div>

      <div className="mb-4 text-xs text-gray-500">
        Session: <span className="font-mono">{sessionId ?? "…"}</span>
      </div>

      <EntrySection title="Appraisal" items={appraisal} />
      <EntrySection title="Performance" items={performance} />
      <EntrySection title="Stress Factor" items={stress} />
    </div>
  );
}
