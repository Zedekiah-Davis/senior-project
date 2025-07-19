// app/registration/success/page.tsx
'use client';

import { Header } from "@/app/ui/header";
import { Footer } from "@/app/ui/footer";
import { useEffect, useState } from "react";
import { Button } from "@/app/ui/button";
import { useRouter } from "next/navigation";

interface UserData {
  name: string;
  email: string;
  plan: string;
  price: number;
  planName?: string;
}

export default function SuccessPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve user data from session storage
    const storedData = sessionStorage.getItem('userData');
    if (!storedData) {
      router.push('/registration');
      return;
    }

    const parsedData = JSON.parse(storedData) as UserData;
    setUserData(parsedData);
    setIsLoading(false);

    // Clear session storage after displaying the data
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('selectedPlan');
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No purchase data found. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-500 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase, {userData.name}!
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="font-semibold text-lg mb-2">Order Details</h2>
            <p className="text-gray-700">
              <span className="font-medium">Plan:</span> {userData.planName || userData.plan}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Amount Paid:</span> ${userData.price.toFixed(2)}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}