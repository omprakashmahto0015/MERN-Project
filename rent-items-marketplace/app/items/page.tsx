"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

interface Item {
  _id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  securityDeposit: number;
  city: string;
  image: string;
}

const BASE_URL = "http://localhost:5000"; // Change if hosted elsewhere

export default function ListItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart(); // Use Cart Context

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`${BASE_URL}/api/items`);
        if (!response.ok) throw new Error("Failed to fetch items.");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError("Error fetching items. Please try again later.");
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Available Items</h1>

      {loading && <p className="text-gray-500">Loading items...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="text-gray-600">No items available for rent.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg shadow-md bg-white overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg"
          >
            <img
              src={
                item.image.startsWith("http") ? item.image : `${BASE_URL}${item.image}`
              }
              alt={item.name}
              className="w-full h-48 object-cover"
              onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="font-semibold mt-2 text-lg text-blue-600">
                ₹{item.price} / day
              </p>
              <p className="text-gray-500">Location: {item.city}</p>

              {/* Buttons - Side by Side */}
              <div className="flex gap-2 mt-4">
                <button
                  className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                  View Details
                </button>
                <button
                  onClick={() => addToCart({ id: item._id, name: item.name, price: item.price, days: 1 })}
                  className="flex-1 bg-white text-black border px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
