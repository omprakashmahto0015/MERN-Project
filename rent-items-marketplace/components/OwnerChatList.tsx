"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Chat {
  _id: string;
  itemId: number;
  itemName: string;
  city: string;
  messages: { sender: string; content: string; timestamp: string }[];
  participants: string[];
}

export default function OwnerChatList({ ownerId }: { ownerId: string }) {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/chats/owner/${ownerId}`
        );
        if (!res.ok) {
          console.error("❌ Failed to fetch owner chats");
          return;
        }
        const data = await res.json();
        setChats(data);
      } catch (err) {
        console.error("❌ Error fetching owner chats:", err);
      }
    };

    fetchChats();
  }, [ownerId]);

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Customer Enquiries</h2>
      {chats.length === 0 ? (
        <p className="text-gray-600">No enquiries yet.</p>
      ) : (
        <ul className="divide-y">
          {chats.map((chat) => {
            const lastMsg = chat.messages[chat.messages.length - 1];
            const customer = chat.participants.find((p) => p !== ownerId) || "Customer";

            return (
              <li
                key={chat._id}
                className="p-3 hover:bg-gray-100 rounded-lg transition"
              >
                <Link href={`/items/${chat.itemId}/chat`}>
                  <div>
                    <h3 className="font-semibold">{chat.itemName}</h3>
                    <p className="text-sm text-gray-600">{chat.city}</p>
                    {lastMsg && (
                      <p className="text-sm mt-1">
                        <span className="font-medium">{customer}: </span>
                        {lastMsg.content}
                        <span className="block text-xs text-gray-500">
                          {new Date(lastMsg.timestamp).toLocaleString()}
                        </span>
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

