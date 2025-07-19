// components/PlanCard.tsx
'use client'; // Add this since we'll use client-side features
import React from 'react';
import { useRouter } from 'next/navigation';

interface PlanCardProps {
  plan: {
    id: string;
    name: string;
    price: number;
    borderColor: string;
    titleColor: string;
    buttonStyle: string;
    features: string[];
    hoverEffect?: string;
  };
}

export const PlanCard = ({ plan }: PlanCardProps) => {
  const router = useRouter();

  const handleSelectPlan = () => {
    // Store the plan data in sessionStorage
    sessionStorage.setItem('selectedPlan', JSON.stringify({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      features: plan.features
    }));
    
    // Navigate to the registration form
    router.push('/registration/form');
  };

  return (
    <div 
      className={`card bg-base-100 flex-1 shadow-lg border-2 ${plan.borderColor} min-w-[300px] max-w-md ${plan.hoverEffect || ''}`}
    >
      <div className="card-body">
        <h2 className={`card-title ${plan.titleColor}`}>{plan.name}</h2>
        <p className="text-2xl font-bold mb-4">${plan.price.toFixed(2)}/month</p>
        <ul className="space-y-2 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">✔️</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="card-actions justify-center">
          <button
            onClick={handleSelectPlan}
            className={`btn ${plan.buttonStyle}`}
          >
            Select {plan.name} (${plan.price}/mo)
          </button>
        </div>
      </div>
    </div>
  );
};