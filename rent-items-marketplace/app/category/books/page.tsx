import CategoryPage from "@/components/CategoryPage"

const books = [
  {
    id: 101,
    name: "Classic Literature Collection",
    image: "/category/books/Literature.jpg",
    price: 375,
    description:
      "A curated collection of timeless literary masterpieces, featuring works from renowned authors across different eras.",
    securityDeposit: 1000,
    category: "Books",
    city: "Delhi",
  },
  {
    id: 102,
    name: "Science Fiction Anthology",
    image: "/category/books/Science Fiction.jpg",
    price: 450,
    description:
      "Explore futuristic worlds with this comprehensive sci-fi collection. Includes works from both classic and contemporary science fiction authors.",
    securityDeposit: 1200,
    category: "Books",
    city: "Mumbai",
  },
  {
    id: 103,
    name: "Cookbook Bundle",
    image: "/category/books/Cookbook.jpg",
    price: 600,
    description:
      "A set of bestselling cookbooks for various cuisines. From Italian to Japanese, these books will help you explore global flavors in your own kitchen.",
    securityDeposit: 1500,
    category: "Books",
    city: "Bangalore",
  },
  {
    id: 104,
    name: "Self-Help Library",
    image: "/category/books/Self-Help Library.jpg",
    price: 525,
    description:
      "Improve your life with this collection of self-help books. Covers topics like personal development, productivity, and mindfulness.",
    securityDeposit: 1300,
    category: "Books",
    city: "Hyderabad",
  },
  {
    id: 105,
    name: "Children's Storybook Set",
    image: "/category/books/Storybook.jpg",
    price: 300,
    description:
      "Enchanting stories for young readers. This set includes beautifully illustrated books suitable for various age groups.",
    securityDeposit: 800,
    category: "Books",
    city: "Chennai",
  },
  {
    id: 106,
    name: "History Book Collection",
    image: "/category/books/History Book.jpg",
    price: 450,
    description:
      "Dive into the past with these engaging history books. Covers various periods and civilizations from ancient times to modern history.",
    securityDeposit: 1100,
    category: "Books",
    city: "Kolkata",
  },
  {
    id: 107,
    name: "Mystery Novel Series",
    image: "/category/books/Mystery Novel.jpg",
    price: 375,
    description:
      "A thrilling set of mystery novels to keep you guessing. Includes bestsellers from renowned mystery authors.",
    securityDeposit: 900,
    category: "Books",
    city: "Pune",
  },
  {
    id: 108,
    name: "Art and Photography Books",
    image: "/category/books/Art and Photography.jpg",
    price: 675,
    description:
      "Stunning visual books showcasing art and photography from around the world. Perfect for art enthusiasts and coffee table displays.",
    securityDeposit: 1700,
    category: "Books",
    city: "Ahmedabad",
  },
  {
    id: 109,
    name: "Business and Finance Library",
    image: "/category/books/Business and Finance Library.jpg",
    price: 600,
    description:
      "Essential reads for entrepreneurs and finance enthusiasts. Covers topics like management, investing, and business strategy.",
    securityDeposit: 1500,
    category: "Books",
    city: "Jaipur",
  },
  {
    id: 110,
    name: "Travel Guide Collection",
    image: "/category/books/Travel Guide Collection.jpg",
    price: 450,
    description:
      "Comprehensive travel guides for popular destinations. Includes maps, local tips, and recommended itineraries.",
    securityDeposit: 1100,
    category: "Books",
    city: "Lucknow",
  },
]

export default function BooksCategory() {
  return <CategoryPage categoryName="Books" items={books} />
}
