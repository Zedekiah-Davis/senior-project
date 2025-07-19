'use client'
import { useState, useEffect } from 'react'

type FormData = {
  name: string;
  email: string;
  address: string;
  phone: string;
};

export default function RegistrationForm({
  onSubmit,
  loading = false
}: {
  onSubmit: (data: FormData) => void
  loading?: boolean
}) {
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== 'undefined') {
      const savedFormData = sessionStorage.getItem('registrationFormData');
      return savedFormData ? JSON.parse(savedFormData) : {
        name: '',
        email: '',
        address: '',
        phone: ''
      };
    }
    return {
      name: '',
      email: '',
      address: '',
      phone: ''
    };
  });

  useEffect(() => {
    sessionStorage.setItem('registrationFormData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.removeItem('registrationFormData');
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="address" className="block mb-1 font-medium">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block mb-1 font-medium">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Processing...' : 'Continue to Payment'}
      </button>
    </form>
  )
}