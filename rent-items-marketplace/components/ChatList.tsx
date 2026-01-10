"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

interface Chat {
  _id: string
  itemId: string
  itemName: string
  city: string
  participants: string[]
  messages: {
    sender: string
    content: string
    timestamp: string
  }[]
}

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // for now hardcoding user, later use logged-in user id
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chats/user/CurrentUser`)
        const data = await res.json()
        setChats(data)
      } catch (error) {
        console.error("❌ Error fetching chats:", error)
      }
    }
    fetchChats()
  }, [])

  const filteredChats = chats.filter(
    (chat) =>
      chat.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <Input
        type="search"
        placeholder="Search chats..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="space-y-2">
        {filteredChats.map((chat) => {
          const lastMessage = chat.messages[chat.messages.length - 1]
          return (
            <Link
              key={chat._id}
              href={`/items/${chat.itemId}/chat`}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>{chat.itemName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-medium truncate">{chat.itemName}</h3>
                  {lastMessage && <span className="text-xs text-gray-500">
                    {new Date(lastMessage.timestamp).toLocaleString()}
                  </span>}
                </div>
                <p className="text-xs text-gray-400 truncate">{lastMessage?.content || "No messages yet"}</p>
              </div>
              <div className="text-xs text-gray-500">{chat.city}</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

