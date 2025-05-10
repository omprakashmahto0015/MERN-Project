"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
}

interface ItemChatProps {
  itemId: number
  currentUser: string
  itemName: string
  city: string
}

export default function ItemChat({ itemId, currentUser, itemName, city }: ItemChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simulated message fetching (Replace with real API/WebSocket in production)
  useEffect(() => {
    const fetchedMessages: Message[] = [
      { id: "1", sender: "User1", content: "Is this item still available?", timestamp: new Date() },
      { id: "2", sender: "Owner", content: "Yes, it is!", timestamp: new Date() },
    ]
    setMessages(fetchedMessages)
  }, [])

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message: Message = {
      id: Date.now().toString(),
      sender: currentUser,
      content: newMessage.trim(),
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")
    // TODO: Send message to backend via API/WebSocket
  }

  return (
    <div className="flex flex-col h-[400px]">
      <div className="bg-gray-100 p-3 rounded-t-lg">
        <h3 className="font-semibold">{itemName}</h3>
        <p className="text-sm text-gray-600">{city}</p>
      </div>
      <ScrollArea className="flex-grow p-4 border-x border-b rounded-b-lg overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`mb-2 ${message.sender === currentUser ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block p-2 rounded-lg max-w-xs ${
                message.sender === currentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              <p className="font-semibold">{message.sender}</p>
              <p>{message.content}</p>
              <p className="text-xs opacity-75">{message.timestamp.toLocaleString()}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <div className="flex p-2 border rounded-b-lg">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
          Send
        </Button>
      </div>
    </div>
  )
}
