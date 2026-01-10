"use client";
import OwnerChatList from "@/components/OwnerChatList";

export default function OwnerChatsPage() {
  return (
    <div>
      <OwnerChatList ownerId="Owner" />
      {/* Replace "Owner" with the logged-in owner’s userId */}
    </div>
  );
}
