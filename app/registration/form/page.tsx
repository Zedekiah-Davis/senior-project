'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import RegistrationForm from '@/app/ui/RegistrationForm';
import { Header } from '@/app/ui/header';
import { Footer } from '@/app/ui/footer';

export default function FormPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string;
    name: string;
    price: number;
  } | null>(null)

  // Load plan data from sessionStorage on component mount
  useEffect(() => {
    const planData = sessionStorage.getItem('selectedPlan')
    if (!planData) {
      // Redirect to plans page if no plan selected
      router.push('/registration')
      return
    }
    setSelectedPlan(JSON.parse(planData))
  }, [router])

  const handleFormSubmit = async (formData: {
    name: string
    email: string
    address: string
    phone: string
  }) => {
    setIsLoading(true)
    
    try {
      if (!selectedPlan) {
        throw new Error('No membership plan selected')
      }

      // Combine form data with plan details
      const registrationData = {
        ...formData,
        plan: selectedPlan.id,
        price: selectedPlan.price,
        planName: selectedPlan.name // Storing name for reference
      }

      // Store complete registration data
      sessionStorage.setItem('userData', JSON.stringify(registrationData))
      
      // Redirect to checkout (no URL params needed)
      router.push('/registration/checkout')
    } catch (error) {
      console.error('Submission failed:', error)
      setIsLoading(false)
      // Optional: Show error to user
      alert('Please select a plan first')
    }
  }

  if (!selectedPlan) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Complete Your Registration</h1>
        <p className="mb-8 text-gray-600">
          You're signing up for the <strong>{selectedPlan.name}</strong> plan at $
          {selectedPlan.price.toFixed(2)}/month
        </p>
        
        <RegistrationForm onSubmit={handleFormSubmit} loading={isLoading} />
      </div>
      <Footer />
    </div>
  )
}