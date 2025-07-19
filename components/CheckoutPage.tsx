'use client';
import React, { useEffect, useState } from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/app/lib/convertToSubcurrency";
import { Button } from "@/app/ui/button";
import { useRouter } from "next/navigation";

interface UserData {
    name: string;
    email: string;
    address: string;
    phone: string;
    plan: string;
    price: number;
    planName?: string;
}

const CheckoutPage = () => {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        // Retrieve user data from session storage
        const storedData = sessionStorage.getItem('userData');
        if (!storedData) {
            router.push('/registration'); // Redirect if no data
            return;
        }
        setUserData(JSON.parse(storedData));
    }, [router]);

    useEffect(() => {
        if (!userData?.price) return;

        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                amount: convertToSubcurrency(userData.price),
                customer_email: userData.email,
                metadata: {
                    plan: userData.plan,
                    name: userData.name
                }
            }), 
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => {
            console.error("Error creating payment intent:", error);
            setErrorMessage("Failed to initialize payment");
        });
    }, [userData]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements || !userData) {
            setLoading(false);
            return;
        }

        const {error: submitError} = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/registration/success`,
                receipt_email: userData.email,
            },
        });

        if (error) {
            setErrorMessage(error.message);
        }
        setLoading(false);
    };

    if (!clientSecret || !stripe || !elements || !userData) {
        return (
            <div className="flex items-center justify-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            {clientSecret && <PaymentElement />}

            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

            <div className="mb-4">
                <h3 className="font-bold">Order Summary</h3>
                <p>{userData.planName || userData.plan} Plan: ${userData.price.toFixed(2)}</p>
            </div>

            <button 
                disabled={!stripe || loading} 
                className="btn btn-primary w-full disabled:opacity-50 disabled:animate-pulse"
            >
                {!loading ? `Pay $${userData.price.toFixed(2)}` : "Processing..."}
            </button>
        </form>
    );
};

export default CheckoutPage;