"use client";

import { useRouter } from "next/navigation";

export default function ModelsPage() {
  const router = useRouter();

  // Define the routes in the folder
  const routes = [
    // { name: "Achievement Criteria", path: "/models/achievement-criteria" },
    // { name: "Appraisal", path: "/models/appraisal" },
    // { name: "Motivation", path: "/models/motivation" },
    { name: "Non-Academic Appraisal", path: "/models/non-academic-appraisal" },
    { name: "Org Structure", path: "/models/org-structure" },
    { name: "Personnel Redundancy", path: "/models/personnel-redundancy" },
    { name: "Personnel Utilization", path: "/models/personnel-utilization" },
    { name: "Productivity Index", path: "/models/productivity-index" },
    { name: "Redundancy Index", path: "/models/redundancy-index" },
    { name: "Staff Number", path: "/models/staff-number" },
    { name: "Student Teacher", path: "/models/student-teacher" },
    { name: "Utility Index", path: "/models/utility-index" },
  ];

  return (
    <div>
      <h1>Models</h1>
      <div className="flex flex-wrap gap-4 mt-1">
        {routes.map((route, index) => (
          <button
            className="bg-pes w-fit"
            key={index}
            onClick={() => router.push(route.path)}
            style={{
              display: "block",
              padding: "10px 20px",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {route.name}
          </button>
        ))}
      </div>
    </div>
  );
}