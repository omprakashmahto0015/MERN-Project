"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Notification from "@/components/Notification"
import { useCart } from "@/context/CartContext"
import ItemDetailsModal from "@/components/ItemDetailsModal"

interface ItemCardProps {
  item: {
    id: number
    name: string
    image: string
    price: number
    description: string
    category: string
    city: string
    securityDeposit?: number // Ensure it's optional to prevent TypeScript errors
  }
}

export default function ItemCard({ item }: ItemCardProps) {
  const [showNotification, setShowNotification] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({ ...item, days: 1 })
    setShowNotification(true)
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <Image
          src={item.image || "/placeholder.svg?height=200&width=200"}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-2">₹{item.price}/day</p>
        <p className="text-sm text-gray-500 mb-2">Location: {item.city}</p>
        <div className="flex space-x-2">
          <Button onClick={() => setShowDetails(true)} className="flex-1">
            View Details
          </Button>
          <Button onClick={handleAddToCart} variant="outline" className="flex-1">
            Add to Cart
          </Button>
        </div>
      </div>
      {showNotification && (
        <Notification message={`${item.name} added to cart!`} onClose={() => setShowNotification(false)} />
      )}
      <ItemDetailsModal 
        item={{ ...item, securityDeposit: item.securityDeposit ?? 0 }} // Ensure securityDeposit is always present
        isOpen={showDetails} 
        onClose={() => setShowDetails(false)} 
      />
    </div>
  )
}
