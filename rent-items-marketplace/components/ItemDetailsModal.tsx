import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import AddToCartForm from "@/components/AddToCartForm"
import ItemChat from "@/components/ItemChat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ItemDetailsModalProps {
  item: {
    id: number
    name: string
    description: string
    image: string
    price: number
    securityDeposit: number
    category: string
    city: string
  }
  isOpen: boolean
  onClose: () => void
}

export default function ItemDetailsModal({ item, isOpen, onClose }: ItemDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>Category: {item.category}</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <div className="grid gap-4 py-4">
              <div className="relative h-[200px] w-full">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-sm text-gray-500">Location: {item.city}</p>
              <div className="flex justify-between items-center">
                <p className="font-semibold">₹{item.price}/day</p>
                <p className="text-sm text-gray-500">Security Deposit: ₹{item.securityDeposit}</p>
              </div>
              <AddToCartForm item={item} />
            </div>
          </TabsContent>
          <TabsContent value="chat">
            <ItemChat 
              itemId={item.id} 
              currentUser="CurrentUser" 
              itemName={item.name} 
              city={item.city} 
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
