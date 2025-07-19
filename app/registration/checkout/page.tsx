'use client';

import { Footer } from "../../ui/footer";
import { Header } from "../../ui/header";
import { Elements, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "../../lib/convertToSubcurrency";
import CheckoutPage from "../../../components/CheckoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined in .env.local");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Page() {
  const amount = 49.99; 
  return (
    <main>
      <Header />
      <Elements stripe={stripePromise} options={{
        mode: "payment",
        amount: convertToSubcurrency(amount), // Convert to subcurrency
        currency: "usd",
      }}>
        <CheckoutPage amount={amount} />
      </Elements>
      <Footer />
    </main>
  );
}