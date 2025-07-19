'use client';

import { Footer } from "../../ui/footer";
import { Header } from "../../ui/header";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "../../lib/convertToSubcurrency";
import CheckoutPage from "../../../components/CheckoutPage";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined in .env.local");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Page() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the complete user data from sessionStorage
    const userData = sessionStorage.getItem('userData');
    if (!userData) {
      router.push('/registration'); // Redirect if no data
      return;
    }

    const parsedData = JSON.parse(userData);
    const amount = Number(parsedData.price);

    // Create payment intent with the amount
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        amount: convertToSubcurrency(amount),
        currency: "usd"
      }), 
    })
    .then((res) => res.json())
    .then((data) => setClientSecret(data.clientSecret))
    .catch((error) => {
      console.error("Error creating payment intent:", error);
      router.push('/registration');
    });
  }, [router]);

  if (!clientSecret) {
    return (
      <main>
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <Elements 
        stripe={stripePromise} 
        options={{
          clientSecret,
          appearance: {
            theme: 'stripe',
          },
        }}
      >
        <CheckoutPage /> {/* Removed amount prop */}
      </Elements>
      <Footer />
    </main>
  );
}