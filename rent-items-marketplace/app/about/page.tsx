import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About RentEase</h1>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            At RentEase, we believe in the power of sharing economy. Our mission is to create a platform where people
            can easily rent items they need and make money from items they own. We're committed to fostering a community
            of trust, sustainability, and convenience.
          </p>
          <p>
            Whether you're looking to try out a new hobby, need equipment for a short-term project, or want to make some
            extra income from your unused items, RentEase is here to connect you with the right people and
            opportunities.
          </p>
        </div>
        <div className="relative h-64 md:h-full">
        <Image src="/mic.jpg" fill style={{ objectFit: "cover" }} alt="Microphone" />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="mb-4">
          RentEase was founded in 2025 by a group of friends who realized how many items in their homes were sitting
          unused most of the time. They thought, "What if we could share these items with others who need them
          temporarily?" This simple idea grew into the platform you see today.
        </p>
        <p>
          Since our launch, we've helped thousands of people access the items they need without the burden of ownership,
          while also helping item owners earn extra income. Our community continues to grow, and we're excited about the
          future of collaborative consumption.
        </p>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Trust and Safety: We prioritize the security of our users and their items.</li>
          <li>Sustainability: By promoting sharing, we reduce waste and overconsumption.</li>
          <li>Community: We foster connections and mutual benefit among our users.</li>
          <li>Innovation: We continuously improve our platform to meet user needs.</li>
          <li>Accessibility: We strive to make a wide range of items available to everyone.</li>
        </ul>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
        <p className="mb-6">
          Whether you're looking to rent, list items, or both, we'd love to have you as part of the RentEase community.
        </p>
        <Button asChild>
          <Link href="/signup">Sign Up Now</Link>
        </Button>
      </div>
    </div>
  )
}

