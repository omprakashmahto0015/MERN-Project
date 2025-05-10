"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ItemCard from "@/components/ItemCard"
import { allItems } from "@/data/allItems"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad",
  "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
  "Chandigarh", "Bhopal", "Indore", "Nagpur", "Surat",
  "Kochi", "Goa", "Dehradun", "Vadodara",
]

export default function LocationBasedItems() {
  const [userCity, setUserCity] = useState<string | null>(null)
  const [nearbyItems, setNearbyItems] = useState<typeof allItems>(allItems.slice(0, 4))
  const [error, setError] = useState<string | null>(null)
  const [usingLiveLocation, setUsingLiveLocation] = useState(false)

  const handleCityChange = (city: string) => {
    setUserCity(city)
    setUsingLiveLocation(false)
    setError(null)
    
    const filteredItems = allItems.filter((item) => item.city === city)
    
    setNearbyItems(filteredItems.length > 0 ? filteredItems.slice(0, 4) : [])
  }

  const handleLiveLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUsingLiveLocation(true)
          setUserCity(null)
          setError(null)

          // Instead of slicing arbitrarily, we can simulate filtering items based on a general location.
          const suggestedItems = allItems.filter((item) =>
            ["Mumbai", "Delhi", "Bangalore", "Chennai"].includes(item.city)
          ).slice(0, 4)

          setNearbyItems(suggestedItems.length > 0 ? suggestedItems : allItems.slice(0, 4))
        },
        (error) => {
          console.error("Error getting location:", error)
          setError("Unable to retrieve your location. Please try again or select a city manually.")
        },
      )
    } else {
      setError("Geolocation is not supported by your browser.")
    }
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Items Near You</h2>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-4 flex space-x-4">
        <Select onValueChange={handleCityChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select your city" />
          </SelectTrigger>
          <SelectContent>
            {indianCities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleLiveLocation}>Use My Location</Button>
      </div>

      {usingLiveLocation ? (
        <p className="mb-4">Showing items based on your approximate location.</p>
      ) : userCity ? (
        <p className="mb-4">Showing items in {userCity}.</p>
      ) : (
        <p className="mb-4">Please select a city or use your location to find nearby items.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {nearbyItems.length > 0 ? (
          nearbyItems.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <p className="text-gray-500">No items available in this location.</p>
        )}
      </div>
    </section>
  )
}
