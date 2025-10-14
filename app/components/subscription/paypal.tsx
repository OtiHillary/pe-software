// export default function PayPalCheckoutButton({ plan }: { plan: string }) {
//   return (
//     <PayPalButtons
//       style={{ layout: "vertical" }}
//       createOrder={async () => {
//         const res = await fetch("/api/subByPaypal", {
//           method: "POST",
//           body: JSON.stringify({ plan }),
//           headers: { "Content-Type": "application/json" },
//         });
//         const order = await res.json();
//         return order.id;
//       }}
//       onApprove={async (data) => {
//         const res = await fetch("/api/captureByPaypal", {
//           method: "POST",
//           body: JSON.stringify({ orderID: data.orderID }),
//           headers: { "Content-Type": "application/json" },
//         });

//         const capture = await res.json();
//         alert("Payment approved ✅\n" + JSON.stringify(capture, null, 2));
//       }}
//     />
//   );
// }

// e.g. SubscriptionButton.tsx
"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { jwtDecode } from "jwt-decode";

export default function SubscriptionButton({ plan }: { plan: string }) {
  return (
    <PayPalButtons
      style={{ layout: "vertical", label: "subscribe" }}
      createSubscription={async (data, actions) => {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Not authenticated");
      type MyJwtPayload = { userID: string, name: string };
      let decoded = jwtDecode<MyJwtPayload>(token);
      console.log("the decoded", decoded)
      let { userID, name } = decoded;

        const res = await fetch("/api/subByPaypal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan, userID, name }),
        });
        const sub = await res.json();
        if (sub.error) {
          throw new Error(sub.error);
        }
        // PayPal JS SDK expects actions.subscription.create from client
        // But instead you can return sub.id so PayPal picks up the subscription
        // If you want, you could also provide a direct JS-SDK create with plan_id
        console.log("the sub", sub)
        return sub.paypal.id;
      }}
      onApprove={async (data, actions) => {
        // subscription approved
        // data.subscriptionID has the subscription id
        // store this with your backend if needed, or finalise UX
        alert("Subscription successful ✅\nID: " + data.subscriptionID);
      }}
      onError={(err) => {
        console.error("PayPal subscription error:", err);
        alert("Subscription could not be completed.");
      }}
    />
  );
}
