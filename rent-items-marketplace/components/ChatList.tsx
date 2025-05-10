"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

interface Chat {
  id: string
  itemName: string
  lastMessage: string
  timestamp: string
  city: string
  otherUser: {
    name: string
    avatar: string
  }
}

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const mockChats: Chat[] = [
      {
        id: "1",
        itemName: "4K Smart TV",
        lastMessage: "Is it still available?",
        timestamp: "2 hours ago",
        city: "Mumbai",
        otherUser: {
          name: "Rahul Sharma",
          avatar: "/placeholder.svg?height=40&width=40&text=RS",
        },
      },
      {
        id: "2",
        itemName: "Mountain Bike",
        lastMessage: "Can I pick it up tomorrow?",
        timestamp: "1 day ago",
        city: "Delhi",
        otherUser: {
          name: "Priya Patel",
          avatar: "/placeholder.svg?height=40&width=40&text=PP",
        },
      },
      {
        id: "3",
        itemName: "DSLR Camera",
        lastMessage: "Thanks for renting!",
        timestamp: "3 days ago",
        city: "Bangalore",
        otherUser: {
          name: "Amit Kumar",
          avatar: "/placeholder.svg?height=40&width=40&text=AK",
        },
      },
    ]
    setChats(mockChats)
  }, [])

  const filteredChats = chats.filter(
    (chat) =>
      chat.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.otherUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.city.toLowerCase().includes(searchTerm.toLowerCase()),
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
        {filteredChats.map((chat) => (
          <Link
            key={chat.id}
            href={`/chats/${chat.id}`}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Avatar>
              <AvatarImage src={chat.otherUser.avatar} alt={chat.otherUser.name} />
              <AvatarFallback>
                {chat.otherUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-medium truncate">{chat.otherUser.name}</h3>
                <span className="text-xs text-gray-500">{chat.timestamp}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{chat.itemName}</p>
              <p className="text-xs text-gray-400 truncate">{chat.lastMessage}</p>
            </div>
            <div className="text-xs text-gray-500">{chat.city}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

