import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import FeaturedItems from "@/components/FeaturedItems"
import CategoryList from "@/components/CategoryList"
import LocationBasedItems from "@/components/LocationBasedItems"

export default function Home() {
  return (
    (<div className="space-y-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to RentEase</h1>
        <p className="text-xl mb-6">Rent anything, anytime. List your items and earn!</p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/items">Browse Items</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/list-item">List Your Item</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/nearby-items">Find Nearby Items</Link>
          </Button>
        </div>
      </section>
      <section className="relative h-[400px] rounded-lg overflow-hidden">
      <div className="relative w-full h-[500px]">
  <Image
    src="/mic.jpg"
    alt="Mic"
    fill
    className="object-cover"
  />
</div>

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-white text-4xl font-bold">Discover Amazing Rentals</h2>
        </div>
      </section>
      <LocationBasedItems />
      <FeaturedItems />
      <CategoryList />
    </div>)
  );
}

