import ItemCard from "@/components/ItemCard"

interface Item {
  id: number
  name: string
  image: string
  price: number
  description: string
  securityDeposit: number 
  category: string 
  city: string;
}

interface CategoryPageProps {
  categoryName: string
  items: Item[]
}

export default function CategoryPage({ categoryName, items }: CategoryPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg text-center">No items available in this category.</p>
      )}
    </div>
  )
}
