import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About RentEase</h3>
            <p className="text-sm">
              RentEase is your go-to platform for renting anything, anytime. Join our community of renters and owners
              today!
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-blue-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-blue-600">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/electronics" className="hover:text-blue-600">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/category/furniture" className="hover:text-blue-600">
                  Furniture
                </Link>
              </li>
              <li>
                <Link href="/category/books" className="hover:text-blue-600">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/category/tools" className="hover:text-blue-600">
                  Tools
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <Facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <Twitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <Instagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <Linkedin />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2025 RentEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

