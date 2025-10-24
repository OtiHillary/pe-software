"use client";
import { useState } from "react";

interface PaystackButtonProps {
  email: string;
  planCode: string;
  label?: string;
}

export default function PaystackButton({ email, planCode, label }: PaystackButtonProps) {
  const [loading, setLoading] = useState(false);

  const subscribeWithPaystack = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/paystack/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, planCode }),
      });

      const data = await response.json();

      if (data.authorization_url) {
        // Redirect user to Paystack's checkout
        window.location.href = data.authorization_url;
      } else {
        alert("Subscription initialization failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Paystack subscription error:", err);
      alert("Something went wrong starting your payment. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={subscribeWithPaystack}
      disabled={loading}
      className={`w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition ${
        loading ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Redirecting..." : label || "Pay with Paystack"}
    </button>
  );
}
