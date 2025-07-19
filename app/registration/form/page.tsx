'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Store in sessionStorage temporarily
    sessionStorage.setItem('userData', JSON.stringify({
      ...formData,
      plan: searchParams.get('plan'),
      price: searchParams.get('price')
    }))

    // Redirect to Stripe checkout
    router.push('/register/checkout')
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Proceed to Payment</button>
    </form>
  )
}