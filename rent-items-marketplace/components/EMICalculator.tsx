"use client"

import { useState, useEffect } from "react"

interface EMICalculatorProps {
  total: number
  months: number
}

export default function EMICalculator({ total, months }: EMICalculatorProps) {
  const [emi, setEmi] = useState(0)

  useEffect(() => {
    if (total && months) {
      // Simple EMI calculation (without interest for demonstration)
      const calculatedEmi = total / months
      setEmi(calculatedEmi)
    }
  }, [total, months])

  if (!months) {
    return null
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">EMI Details</h3>
      <p>Total Amount: ₹{total.toFixed(2)}</p>
      <p>EMI Duration: {months} months</p>
      <p>Monthly EMI: ₹{emi.toFixed(2)}</p>
      <p className="text-sm text-gray-500">
        Note: This is a simple EMI calculation without interest for demonstration purposes.
      </p>
    </div>
  )
}

