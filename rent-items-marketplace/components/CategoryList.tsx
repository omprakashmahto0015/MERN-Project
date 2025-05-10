import Link from "next/link"
import { Book, Tv, Sofa, Wrench, Camera, Car, Laptop, Shirt, MoreHorizontal } from "lucide-react"

const categories = [
  { name: "Books", icon: Book },
  { name: "Electronics", icon: Tv },
  { name: "Furniture", icon: Sofa },
  { name: "Tools", icon: Wrench },
  { name: "Cameras", icon: Camera },
  { name: "Vehicles", icon: Car },
  { name: "Computers", icon: Laptop },
  { name: "Clothing", icon: Shirt },
  { name: "Other", icon: MoreHorizontal },
]

export default function CategoryList() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            href={`/category/${category.name.toLowerCase()}`}
            key={category.name}
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-blue-50 transition-colors"
          >
            <category.icon className="w-12 h-12 mb-2 text-blue-600" />
            <span className="text-center">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

