import ItemCard from "@/components/ItemCard"


const featuredItems = [
  {
    id: 1,
    name: "Vintage Bicycle",
    image: "/featureditems/Vintage Bicycle.jpg",
    price: 100,
    description: "A classic bicycle in great condition.",
    securityDeposit: 500,
    category: "Vehicles",
    city: "Mumbai",
  },
  {
    id: 2,
    name: "Professional Camera",
    image: "/featureditems/Professional Camera.jpg",
    price: 500,
    description: "High-quality camera for professional photography.",
    securityDeposit: 1500,
    category: "Electronics",
    city: "Delhi", 
  },
  {
    id: 3,
    name: "Cozy Armchair",
    image: "/featureditems/Cozy Armchair.jpg",
    price: 1125,
    description: "A comfortable armchair to relax in.",
    securityDeposit: 2000,
    category: "Furniture",
    city: "Bangalore",
  },
  {
    id: 4,
    name: "Electric Guitar",
    image: "/featureditems/Electric Guitar.jpg",
    price: 1500,
    description: "A premium electric guitar for music lovers.",
    securityDeposit: 3000,
    category: "Musical Instruments",
    city: "Kolkata",
  },
]

export default function FeaturedItems() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Featured Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featuredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
