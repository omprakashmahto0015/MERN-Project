"use client"

import { useParams } from "next/navigation"
import ItemChat from "@/components/ItemChat"

export default function ItemChatPage() {
  const params = useParams()
  const id = params?.id as string // ✅ tell TypeScript it's a string

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <ItemChat
        itemId={Number(id)}
        currentUser="User1" // Replace with logged-in user later
        itemName="Classic Literature Collection" // TODO: fetch dynamically
        city="Mumbai" // TODO: fetch dynamically
      />
    </div>
  )
}

