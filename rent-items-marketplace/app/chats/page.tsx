import ChatList from "@/components/ChatList"

export default function ChatsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Chats</h1>
      <ChatList />
    </div>
  )
}

