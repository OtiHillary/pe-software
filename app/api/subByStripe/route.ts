// import Stripe from "stripe";
// import { packages } from "../../lib/utils/packages";
// import { NextRequest } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2025-08-27.basil" });

// export async function POST(req: NextRequest): Promise<Response> {
//   try {
//     const { plan } = await req.json();

//     if (!plan || !(plan in packages)) {
//       return new Response(JSON.stringify({ error: "Invalid plan" }), { status: 400 });
//     }
//     const planKey = plan as keyof typeof packages;
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: { name: packages[planKey].name },
//             unit_amount: packages[planKey].price,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
//     });

//     return new Response(JSON.stringify({ url: session.url }), { status: 200 });
//   } catch (err) {
//     const message = err instanceof Error ? err.message : "Unknown error";
//     return new Response(JSON.stringify({ error: message }), { status: 500 });
//   }
// }
export async function POST(){
  
}