import Link from "next/link"
import { ShoppingCart, User } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          RentEase
        </Link>
        <div className="flex items-center space-x-4">
          <input type="search" placeholder="Search items..." className="px-4 py-2 rounded-full text-black" />
          <Link href="/cart" className="hover:text-blue-200">
            <ShoppingCart />
          </Link>
          <Link href="/profile" className="hover:text-blue-200">
            <User />
          </Link>
        </div>
      </div>
    </nav>
  )
}

