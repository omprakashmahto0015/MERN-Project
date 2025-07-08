"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function Cart() {
  const { cartItems, removeFromCart, updateCartItemDays } = useCart()

  const handleUpdateDays = (id: number, days: number) => {
    updateCartItemDays(id, days)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.days, 0)
  const tax = subtotal * 0.18 // Assuming 18% GST
  const total = subtotal + tax

  return (
    (<div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="rounded-md"
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: "cover"
                    }} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}/day</p>
                  <div className="flex items-center mt-2">
                    <label htmlFor={`days-${item.id}`} className="mr-2">
                      Days:
                    </label>
                    <Input
                      type="number"
                      id={`days-${item.id}`}
                      value={item.days}
                      onChange={(e) => handleUpdateDays(item.id, Number.parseInt(e.target.value))}
                      className="w-20"
                      min="1"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{item.price * item.days}</p>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="mt-2">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18% GST)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </div>)
  );
}

