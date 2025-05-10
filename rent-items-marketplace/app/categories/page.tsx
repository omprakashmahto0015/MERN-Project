import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const categories = [
  {
    name: "Books",
    image: "/categories/books.jpg",
    description: "Textbooks, novels, and more",
  },
  {
    name: "Electronics",
    image: "/categories/electronics.jpg",
    description: "Cameras, TVs, and gadgets",
  },
  {
    name: "Furniture",
    image: "/categories/furniture.jpg",
    description: "Chairs, tables, and decor",
  },
  {
    name: "Tools",
    image: "/categories/tools.jpg",
    description: "Power tools and equipment",
  },
  {
    name: "Cameras",
    image: "/categories/cameras.jpg",
    description: "DSLRs, lenses, and accessories",
  },
  {
    name: "Vehicles",
    image: "/categories/vehicles.jpg",
    description: "Cars, bikes, and more",
  },
  {
    name: "Computers",
    image: "/categories/computers.jpg",
    description: "Laptops, desktops, and peripherals",
  },
  {
    name: "Clothing",
    image: "/categories/clothings.jpg",
    description: "Fashion for all occasions",
  },
]

export default function Categories() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <Button asChild>
                <Link href={`/category/${category.name.toLowerCase()}`}>Browse {category.name}</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

