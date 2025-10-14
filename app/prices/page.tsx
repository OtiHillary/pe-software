"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SubscriptionPage() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string | null>(null);
  const [plans, setPlans] = useState<any[]>([]);

  const type = searchParams.get("type") || "academic-staff"; // default

  // 🔹 All plan configurations by organization type
  const planConfigs: Record<string, any[]> = {
    "public-civil-service": [
      {
        name: "BASIC",
        features: [
          "Personnel Utilization Index",
          "Productivity Index",
          "Required Organization Staff (Operational Level)",
          "Prediction of Organization Staff (Methods 1 & 2)",
          "Management Staff Level",
          "Stress Model (Basic)",
        ],
      },
      {
        name: "STANDARD",
        features: [
          "All BASIC features",
          "Prediction of Staff (Methods 1, 2 & 3)",
          "Staff Stress Factor Index",
          "Stress Time-Pressure & Conflict Index",
          "Stress Feeling Frequencies Value",
          "Organization Staff Appraisal",
          "Unit Head Overloading",
        ],
      },
      {
        name: "PREMIUM",
        features: [
          "All STANDARD features",
          "Boss Valuable Lost Man-hour (Underloading)",
          "Organization Structure Sizing",
          "Organization Redundancy & Real % Redundancy",
          "Achievement Criteria (Academic & Non-Academic)",
          "Staff Motivation",
          "Maintenance Model (On Demand)",
        ],
      },
    ],

    "company": [
    {
      name: "BASIC",
      features: [
        "Determination of the required Organization staff for operational level",
        "Determination of the Number of management staff level",
        "Determination of Organization’s Staff STRESS factor index",
        "Determination of Stress Feeling Frequencies value",
        "Determination of Organization’s Staff Appraisal",
        "Maintenance model: On demand"
      ]
    },
    {
      name: "STANDARD",
      features: [
        "All BASIC features",
        "Determination of Boss valuable lost man-hour due to work under loading",
        "Determination of the size of an organization structure",
        "Determining Unit Head Overloading",
        "Achievement criteria performance measurement for Non-Academic Staff",
        "Staff motivation"
      ]
    },
    {
      name: "PREMIUM",
      features: [
        "All STANDARD features",
        "Determination of personnel utilization index",
        "Determination of productivity index",
        "Prediction of Organization staff Number required: By method 1, 2 & 3",
        "Determination of Organization’s Staff STRESS all round model",
        "Determination of Organization’s Staff STRESS, Time-Pressure index",
        "Determination of Organization’s Staff STRESS, Conflict index",
        "Determination of Organization’s Redundancy",
        "Determination of Real Percentage redundancy",
        "Achievement criteria performance measurement for Academic Staff"
      ]
    }
    ],

    "academic-staff": [
      {
        name: "BASIC",
        features: [
          "Determination of Student-Teacher Ratio (K*) Method II",
          "Determination of Academic Staff STRESS factor index",
          "Determination of Non-Academic Staff STRESS factor index",
          "Determination of Non-Academic Staff STRESS, Conflict index",
          "Determination of Academic Staff Appraisal",
          "Determination of Non-Academic Staff Appraisal",
          "Staff motivation",
          "Maintenance model: On demand"
        ]
      },
      {
        name: "STANDARD",
        features: [
          "All BASIC features",
          "Determination of Non-Academic Staff STRESS, Time-Pressure index",
          "Determination of Boss valuable lost man-hour due to work under loading",
          "Determination of the size of an organization structure: Two methods available",
          "Achievement criteria performance measurement for Non-Academic Staff"
        ]
      },
      {
        name: "PREMIUM",
        features: [
          "All STANDARD features",
          "Determination of personnel utilization index",
          "Determination of productivity index",
          "Determination of Student-Teacher Ratio (K*) Method I",
          "Determination of the required Institutions Non-academic staff operational level",
          "Prediction Model for Academic staff Number required",
          "Prediction Model for Non-Academic staff Number required: By method I & II",
          "Determination of the Numbers of Academic staff",
          "Determination of the Number of management staff level",
          "Determination of Academic Staff STRESS all round model",
          "Determination of Academic Staff STRESS, Time-Pressure index",
          "Determination of Academic Staff STRESS, Conflict index",
          "Determination of Stress Feeling Frequencies value",
          "Determining Unit Head Overloading",
          "Determination of Institution’s Redundancy",
          "Determination of Real Percentage redundancy",
          "Achievement criteria performance measurement for Academic Staff"
        ]
      }
    ]
  };

  // 🔹 Load plans dynamically based on query param
  useEffect(() => {
    setPlans(planConfigs[type] || []);
  }, [type]);

  const handleSubscribe = async (plan: string) => {
    setSelected(plan);
    localStorage.setItem("selectedPlan", plan);
    localStorage.setItem("organizationType", type);
    window.location.href = "/signup";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <h1 className="text-center text-3xl font-bold mb-4 text-pes">
        Choose Your PES Subscription Plan
      </h1>
      <p className="text-center text-gray-500 mb-10 capitalize">
        Subscription for: <strong>{type.replace(/-/g, " ")}</strong>
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col justify-between border rounded-2xl p-6 shadow-sm transition-all hover:shadow-lg ${
              selected === plan.name ? "border-pes" : "border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4 text-center text-pes">
              {plan.name}
            </h2>
            <ul className="space-y-2 mb-6 text-sm text-gray-700">
              {plan.features.map((f: string, i: number) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-600 font-bold mr-2">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.name)}
              className="w-full py-2 px-4 bg-pes text-white rounded-lg hover:opacity-90"
            >
              {selected === plan.name ? "Selected ✓" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-8 text-gray-500 text-sm">
        You’ll choose your organization and create your account next.
      </div>
    </div>
  );
}
