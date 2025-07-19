'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import RegistrationForm from '@/app/ui/RegistrationForm';
import  {Header}  from '@/app/ui/header';
import { Footer } from '@/app/ui/footer';

export default function FormPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (formData: {
  name: string
  email: string
  address: string
  phone: string
}) => {
  setIsLoading(true)
  
  try {
    const plan = searchParams.get('plan')
    const amount = searchParams.get('amount') // ← Changed from 'price' to 'amount'
    
    if (!plan || !amount) {
      throw new Error('Missing plan/amount information')
    }

    const registrationData = {
      ...formData,
      plan,
      price: amount // Still call it 'price' internally if needed
    }

    sessionStorage.setItem('userData', JSON.stringify(registrationData))
    router.push(`/registration/checkout?plan=${plan}&amount=${amount}`)
  } catch (error) {
    console.error('Submission failed:', error)
    setIsLoading(false)
  }
}

  return (
    <div>
      <Header />
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Complete Your Registration</h1>
      <p className="mb-8 text-gray-600">
        You're signing up for the <strong>{searchParams.get('plan')}</strong> plan at $
        {searchParams.get('price')}/month
      </p>
      
      <RegistrationForm onSubmit={handleFormSubmit} loading={isLoading} />
    </div>
      <Footer />
    </div>
  )
}