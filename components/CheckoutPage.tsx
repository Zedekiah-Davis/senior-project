'use client';
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(undefined);

    if (!stripe || !elements) return;

    try {
      // 1. Get user data from session storage
      const userData = sessionStorage.getItem('userData');
      if (!userData) throw new Error('Missing user information');
      
      const { name, email, address, phone } = JSON.parse(userData);

      // 2. Submit payment to Stripe with billing details
      const { error: submitError } = await elements.submit();
      if (submitError) throw submitError;

      // 3. Confirm payment with billing details
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/registration/success`,
          receipt_email: email,
          payment_method_data: {
            billing_details: {
              name,
              email,
              phone,
              address: {
                line1: address,
                country: 'US' // Add appropriate country if needed
              }
            }
          }
        },
      });

      if (error) throw error;

    } catch (error) {
      console.error('Checkout failed:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Payment processing failed'
      );
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement 
        options={{
          fields: {
            billingDetails: {
              name: 'never',  // We'll provide this in confirmPayment
              email: 'never', // We'll provide this in confirmPayment
              phone: 'auto',  // Optional: can collect or provide
              address: 'auto' // Optional: can collect or provide
            }
          }
        }} 
      />
      
      {errorMessage && (
        <div className="p-4 text-red-500 bg-red-50 rounded-md">
          {errorMessage}
        </div>
      )}

      <button
        disabled={!stripe || loading}
        className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Complete Payment'}
      </button>
    </form>
  );
};

export default CheckoutPage;