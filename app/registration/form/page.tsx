'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function FormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    sessionStorage.setItem('userData', JSON.stringify({
      ...formData,
      plan: searchParams.get('plan'),
      price: searchParams.get('price')
    }))

    router.push('/register/checkout')
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Proceed to Payment</button>
    </form>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormContent />
    </Suspense>
  )
}