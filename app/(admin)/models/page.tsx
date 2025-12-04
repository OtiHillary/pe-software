"use client";

import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";

export default function ModelsPage() {
  const router = useRouter();
  console.log(jwtDecode(localStorage.getItem("access_token") || ""));
  const { productCategory, productPlan } = jwtDecode(localStorage.getItem("access_token") || "")

  const planConfigs: Record<string, any> = {
    "public": 
      {
        "basic": [
          "Personnel Utilization",
          "Productivity Index",
          "Student Teacher",
          "Staff Number",
          "Stress",
        ],

       "standard": [
          "Personnel Utilization",
          "Productivity Index",
          "Student Teacher",
          "Staff number",
          "Stress",
          "Appraisal",
        ],

        "premium": [
          "Personnel Utilization",
          "Productivity Index",
          "Student Teacher",
          "Staff number",
          "Stress",
          "Appraisal",
          "Organization Structure",
          "Performance",
          "Motivation",
        ],
      },

    "company":
    {
      "basic": [
        "Staff Number",
        "Stress",
        "Appraisal",
      ],

      "standard": [
        "Staff Number",
        "Stress",
        "Appraisal",
        "Organization Structure",
        "Performance",
        "Motivation"
      ],
      
      "premium": [
        "Staff Number",
        "Stress",
        "Appraisal",
        "Organization Structure",
        "Performance",
        "Motivation",
        "Personnel Utilization",
        "Productivity Index",
        "Redundancy Index",
      ]
    },

    "academic":
      {
        "basic": [
          "Student Teacher",
          "Stress",
          "Appraisal",
          "Non-Academic Appraisal",
          "Motivation",
          "Maintenance model"
        ],

        "standard": [
          "Student Teacher",
          "Stress",
          "Appraisal",
          "Non-Academic Appraisal",
          "Motivation",
          "Maintenance model",
          "Organization Structure",
          "Performance"
        ],

        "premium": [
          "Student Teacher",
          "Stress",
          "Appraisal",
          "Non-Academic Appraisal",
          "Motivation",
          "Maintenance model",
          "Organization Structure",
          "Performance",
          "Personnel Utilization",
          "Productivity Index",
          "Student Teacher",
          "Staff Number",
          "Redundancy Index",
        ]
      }
  };

  const routesAlt: Record<string, string> = {
    "Performance" : "/models/performance",
    "Appraisal" : "/models/appraisal",
    "Motivation" : "/models/motivation",
    "Stress" : "/models/stress",
    "Non-Academic Appraisal" : "/models/non-academic-appraisal",
    "Organization Structure" : "/models/org-structure",
    "Personnel Redundancy" : "/models/personnel-redundancy",
    "Personnel Utilization" : "/models/personnel-utilization",
    "Productivity Index" : "/models/productivity-index",
    "Redundancy Index" : "/models/redundancy-index",
    "Staff Number" : "/models/staff-number",
    "Student Teacher" : "/models/student-teacher",
    "Utility Index" : "/models/utility-index",
  };
  
  const filteredRoutes = planConfigs[productCategory][productPlan]

  return (
    <div>
      <h1>Models</h1>
      <div className="flex flex-wrap gap-4 mt-1">
        {filteredRoutes.map((route: string, index: number) => (
          <button
            className="bg-pes w-fit"
            key={index}
            onClick={() => router.push(routesAlt[route])}
            style={{
              display: "block",
              padding: "10px 20px",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {route}
          </button>
        ))}
      </div>
    </div>
  );
}