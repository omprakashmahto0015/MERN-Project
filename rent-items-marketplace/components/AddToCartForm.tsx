"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/CartContext"

interface Item {
  id: number  // Ensure this matches CartItem's type
  name: string
  price: number
  imageUrl?: string
}

interface AddToCartFormProps {
  item: Item
}

export default function AddToCartForm({ item }: AddToCartFormProps) {
  const [days, setDays] = useState<number>(1)
  const { addToCart } = useCart()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addToCart({ ...item, days })  // No type mismatch now
    console.log(`Added ${item.name} to cart for ${days} days`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="days" className="block text-sm font-medium text-gray-700">
          Number of Days
        </label>
        <Input
          type="number"
          id="days"
          min="1"
          value={days}
          onChange={(e) => setDays(Number(e.target.value) || 1)}
          className="mt-1"
          required
          aria-label="Number of days to rent"
        />
      </div>
      <Button type="submit" className="w-full">
        Add to Cart
      </Button>
    </form>
  )
}
