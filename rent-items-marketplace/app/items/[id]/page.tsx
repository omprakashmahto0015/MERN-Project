"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import AddToCartForm from "@/components/AddToCartForm"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Define the type for an Item
interface Item {
  id: number
  name: string
  description: string
  image: string
  price: number
  securityDeposit: number
  category: string
}

// This would typically come from an API or database
const allItems = [
  // Books
  {
    id: 101,
    name: "Classic Literature Collection",
    description:
      "A curated collection of timeless literary masterpieces, featuring works from renowned authors across different eras.",
    image: "/placeholder.svg?height=600&width=800&text=Classic+Literature",
    price: 375,
    securityDeposit: 1000,
    category: "Books",
  },
  {
    id: 102,
    name: "Science Fiction Anthology",
    description:
      "Explore futuristic worlds with this comprehensive sci-fi collection. Includes works from both classic and contemporary science fiction authors.",
    image: "/placeholder.svg?height=600&width=800&text=Sci-Fi+Anthology",
    price: 450,
    securityDeposit: 1200,
    category: "Books",
  },
  // Electronics
  {
    id: 201,
    name: "4K Smart TV",
    description:
      "Ultra HD smart TV with streaming capabilities. Enjoy your favorite shows and movies in stunning 4K resolution.",
    image: "/placeholder.svg?height=600&width=800&text=4K+Smart+TV",
    price: 3000,
    securityDeposit: 10000,
    category: "Electronics",
  },
  {
    id: 202,
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium wireless headphones with active noise cancellation for immersive audio experience.",
    image: "/placeholder.svg?height=600&width=800&text=Headphones",
    price: 1500,
    securityDeposit: 5000,
    category: "Electronics",
  },
  // Furniture
  {
    id: 301,
    name: "Comfortable Sofa",
    description:
      "Plush three-seater sofa perfect for your living room. Features high-quality upholstery and ergonomic design for maximum comfort.",
    image: "/placeholder.svg?height=600&width=800&text=Comfortable+Sofa",
    price: 2250,
    securityDeposit: 7500,
    category: "Furniture",
  },
  {
    id: 302,
    name: "Dining Table Set",
    description: "Elegant dining table with six chairs, perfect for family dinners or entertaining guests.",
    image: "/placeholder.svg?height=600&width=800&text=Dining+Set",
    price: 3000,
    securityDeposit: 10000,
    category: "Furniture",
  },
  // Tools
  {
    id: 401,
    name: "Power Drill",
    description: "High-performance power drill for various projects. Includes multiple drill bits and a carrying case.",
    image: "/placeholder.svg?height=600&width=800&text=Power+Drill",
    price: 1500,
    securityDeposit: 5000,
    category: "Tools",
  },
  {
    id: 402,
    name: "Pressure Washer",
    description:
      "Powerful pressure washer for outdoor cleaning tasks. Ideal for cleaning decks, driveways, and vehicles.",
    image: "/placeholder.svg?height=600&width=800&text=Pressure+Washer",
    price: 2500,
    securityDeposit: 8000,
    category: "Tools",
  },
  // Cameras
  {
    id: 501,
    name: "DSLR Camera",
    description:
      "Professional-grade DSLR camera for high-quality photography. Includes multiple lenses and accessories.",
    image: "/placeholder.svg?height=600&width=800&text=DSLR+Camera",
    price: 4000,
    securityDeposit: 15000,
    category: "Cameras",
  },
  {
    id: 502,
    name: "Action Camera",
    description: "Rugged action camera for capturing adventures and sports activities. Waterproof and shockproof.",
    image: "/placeholder.svg?height=600&width=800&text=Action+Camera",
    price: 2000,
    securityDeposit: 7000,
    category: "Cameras",
  },
  // Vehicles
  {
    id: 601,
    name: "Mountain Bike",
    description:
      "High-performance mountain bike for off-road adventures. Features suspension and durable construction.",
    image: "/placeholder.svg?height=600&width=800&text=Mountain+Bike",
    price: 1800,
    securityDeposit: 6000,
    category: "Vehicles",
  },
  {
    id: 602,
    name: "Electric Scooter",
    description: "Eco-friendly electric scooter for urban commuting. Foldable design for easy storage and transport.",
    image: "/placeholder.svg?height=600&width=800&text=Electric+Scooter",
    price: 1500,
    securityDeposit: 5000,
    category: "Vehicles",
  },
  // Computers
  {
    id: 701,
    name: "Gaming Laptop",
    description: "High-performance gaming laptop with dedicated graphics card and high refresh rate display.",
    image: "/placeholder.svg?height=600&width=800&text=Gaming+Laptop",
    price: 5000,
    securityDeposit: 20000,
    category: "Computers",
  },
  {
    id: 702,
    name: "Desktop Workstation",
    description: "Powerful desktop workstation for professional tasks such as video editing and 3D rendering.",
    image: "/placeholder.svg?height=600&width=800&text=Desktop+Workstation",
    price: 6000,
    securityDeposit: 25000,
    category: "Computers",
  },
  // Clothing
  {
    id: 801,
    name: "Formal Suit",
    description: "Elegant formal suit for special occasions. Includes jacket and trousers.",
    image: "/placeholder.svg?height=600&width=800&text=Formal+Suit",
    price: 3000,
    securityDeposit: 10000,
    category: "Clothing",
  },
  {
    id: 802,
    name: "Designer Gown",
    description: "Stunning designer gown for formal events and galas. Available in various sizes.",
    image: "/placeholder.svg?height=600&width=800&text=Designer+Gown",
    price: 5000,
    securityDeposit: 20000,
    category: "Clothing",
  },
  // Other
  {
    id: 901,
    name: "Karaoke Machine",
    description: "Professional karaoke system for parties and events. Includes microphones and a vast song library.",
    image: "/placeholder.svg?height=600&width=800&text=Karaoke+Machine",
    price: 2000,
    securityDeposit: 7000,
    category: "Other",
  },
  {
    id: 902,
    name: "Telescope",
    description: "High-powered telescope for stargazing and astronomy enthusiasts. Includes tripod and carrying case.",
    image: "/placeholder.svg?height=600&width=800&text=Telescope",
    price: 3500,
    securityDeposit: 12000,
    category: "Other",
  },
]

export default function ItemDetail() {
  const { id } = useParams() as { id: string };

  const [item, setItem] = useState<Item | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null); // Allow error to be a string or null


  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        const foundItem = allItems.find((item) => item.id === Number.parseInt(id));
        if (foundItem) {
          setItem(foundItem);
        } else {
          throw new Error("Item not found");
        }
      } catch (err: unknown) { 
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchItem();
  }, [id]);
  

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <Skeleton className="h-[400px] md:h-[600px] w-full" />
              <div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-8 w-1/4 mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Item not found</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
          <CardDescription>Category: {item.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[400px] md:h-[600px]">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-xl font-semibold mb-2">₹{item.price}/day</p>
              <p className="text-gray-600 mb-4">Security Deposit: ₹{item.securityDeposit}</p>
              <AddToCartForm item={item} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

