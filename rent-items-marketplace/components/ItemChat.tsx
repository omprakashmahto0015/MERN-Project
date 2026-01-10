"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

interface ItemChatProps {
  itemId: number;
  currentUser: string;
  itemName: string;
  city: string;
}

export default function ItemChat({
  itemId,
  currentUser,
  itemName,
  city,
}: ItemChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch chat history from backend
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/chats/${itemId}`
        );
        if (!res.ok) return; // no chat yet
        const data = await res.json();
        if (data && data.messages) setMessages(data.messages);
      } catch (err) {
        console.error("❌ Error fetching chat:", err);
      }
    };

    fetchChat();
  }, [itemId]);

  // ✅ Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chats`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            itemId,
            sender: currentUser,
            content: newMessage,
            itemName,
            city,
          }),
        }
      );

      const data = await res.json();
      if (data && data.messages) {
        setMessages(data.messages); // update chat with new message
      }

      setNewMessage("");
    } catch (err) {
      console.error("❌ Error sending message:", err);
    }
  };

  return (
    <div className="flex flex-col h-[400px]">
      {/* Header */}
      <div className="bg-gray-100 p-3 rounded-t-lg">
        <h3 className="font-semibold">{itemName}</h3>
        <p className="text-sm text-gray-600">{city}</p>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-grow p-4 border-x border-b rounded-b-lg overflow-y-auto">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              message.sender === currentUser ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg max-w-xs ${
                message.sender === currentUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <p className="font-semibold">{message.sender}</p>
              <p>{message.content}</p>
              <p className="text-xs opacity-75">
                {new Date(message.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Input box */}
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
  );
}
