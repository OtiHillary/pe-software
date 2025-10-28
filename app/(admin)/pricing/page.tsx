"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import Subscriptionbutton from "../../components/subscription/paypal";
import PaystackButton from "@/app/components/subscription/paystackButton";
import PayPalProviderWrapper from "../../components/subscription/paypalWrapper";
import { packages } from "../../lib/utils/packages";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [email, setEmail] = useState("")

  useEffect(() => {
   let token = localStorage.getItem("access_token") as string
   let decoded = jwtDecode(token)
   setEmail(decoded?.email)

    const fetchSubscription = async () => {
      try {
        const res = await fetch(`/api/subscriptions/active?email=user@example.com`);
        const data = await res.json();
        if (data.active) setActivePlan(data.plan?.toLowerCase());
      } catch (err) {
        console.error("Failed to fetch subscription:", err);
      }
    };
    fetchSubscription();
  }, []);

  const renderPlan = (
    planKey: "basic" | "standard" | "premium",
    color?: string
  ) => {
    const isActive = activePlan === planKey;
    const plan = packages[planKey];
    const disabledStyle = isActive ? "opacity-60 pointer-events-none" : "";
    const label = isActive ? "Current Plan" : "Subscribe";

    return (
      <div
        className={`price-card ${color ? color : "bg-white"} ${
          color ? "text-white" : ""
        } h-112 w-72 border rounded-3xl flex flex-col justify-between p-4 ${disabledStyle}`}
      >
        <div className="flex flex-col">
          <div
            className={`${
              isActive ? "bg-blue-100 text-pes" : "opacity-0"
            } rounded-full py-1 px-2 text-center mb-2 font-light text-sm`}
          >
            {isActive ? "Current plan" : ""}
          </div>

          <div
            className={`des my-2 pb-4 ${
              color ? "border-b border-blue-400" : "border-b border-gray-50"
            }`}
          >
            <h1 className="text-lg font-bold capitalize">{planKey}</h1>
            <h1 className="text-5xl">
              {plan ? `$${(plan.price / 100).toFixed(0)}` : "-"}
              <span className="text-gray-300 text-xs font-bold">/year</span>
            </h1>
          </div>

          <ul
            className={`feature pb-4 ${
              color ? "border-b border-blue-400" : "border-b border-gray-50"
            } font-light text-sm`}
          >
            <li className="flex">
              <p className="me-4">{String.fromCharCode(10004)}</p> Feature 1
            </li>
            <li className="flex">
              <p className="me-4">{String.fromCharCode(10004)}</p> Feature 2
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-4 gap-2">
          <Suspense fallback={<button className="border-pes bg-white rounded-lg p-4">Loading...</button>}>
            <Subscriptionbutton plan={planKey} disabled={isActive} />
          </Suspense>

          <PaystackButton
            email={"user@example.com"}
            planCode={
              planKey === "basic"
                ? "PLN_w4hf2tk7k3mu66a"
                : planKey === "standard"
                ? "PLN_pl6nmfsedqvm0oa"
                : "PLN_bquiv8u3t2otwuh"
            }
            label={label}
            disabled={isActive}
          />
        </div>
      </div>
    );
  };

  return (
    <PayPalProviderWrapper>
      <main className="w-full flex flex-col">
        {/* Header */}
        <div className="px-12 pt-8 pb-4 ms-6 mt-6 me-6 border-b border-gray-100 bg-white">
          <h1 className="text-2xl my-3 font-bold">Pricing</h1>
          <p className="text-sm">
            Simple pricing. No hidden fees. Advanced features for your company.
          </p>
        </div>

        {/* Cards */}
        <div className="px-8 py-8 mx-6 bg-white flex justify-center flex-wrap gap-14">
          {renderPlan("basic")}
          {renderPlan("standard")}
          {renderPlan("premium", "bg-my")}
        </div>

        {/* Other Packages */}
        <div className="flex flex-col px-12 p-12 ms-6 mb-6 me-6 bg-white">
          <h1 className="text-xl my-3 font-bold">Other Available Packages</h1>
          <div className="border border-gray-100 rounded-lg px-6 pb-6 flex flex-col">
            <div className="mainte flex justify-between py-4 mb-2 border-b border-gray-100">
              <h1 className="font-bold my-auto">Maintenance model</h1>
              <Link
                href={"#"}
                className="text-pes text-sm border border-pes rounded-md px-6 py-2 my-auto"
              >
                Request
              </Link>
            </div>
            <p className="text-sm">
              This maintenance model helps by providing predictive maintenance intervals for your equipment(s) to optimize efficiency and reduce wastage.
            </p>
          </div>
        </div>
      </main>
    </PayPalProviderWrapper>
  );
}
