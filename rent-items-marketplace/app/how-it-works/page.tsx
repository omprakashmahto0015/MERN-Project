import { Search, CreditCard, Truck, ThumbsUp } from "lucide-react"

const steps = [
  {
    title: "Find What You Need",
    description:
      "Browse our wide selection of items available for rent. Use our search and filter options to find exactly what you're looking for.",
    icon: Search,
  },
  {
    title: "Book and Pay",
    description:
      "Select your rental dates and proceed to checkout. Our secure payment system ensures your transaction is safe and easy.",
    icon: CreditCard,
  },
  {
    title: "Receive Your Item",
    description: "The owner will arrange delivery or pickup of the item. Make sure to inspect the item upon receipt.",
    icon: Truck,
  },
  {
    title: "Enjoy and Return",
    description:
      "Use your rented item for the duration of your booking. Return the item in the same condition you received it.",
    icon: ThumbsUp,
  },
]

export default function HowItWorks() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">How It Works</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4">
              <step.icon className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 bg-gray-100 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">For Item Owners</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>List your item with detailed descriptions and high-quality photos.</li>
          <li>Set your rental price and availability.</li>
          <li>Respond to rental requests and coordinate with renters.</li>
          <li>Meet the renter or arrange for item delivery.</li>
          <li>Receive payment securely through our platform.</li>
        </ol>
      </div>
    </div>
  )
}

