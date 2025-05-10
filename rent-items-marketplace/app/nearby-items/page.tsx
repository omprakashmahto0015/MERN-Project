"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ItemCard from "@/components/ItemCard"
import { allItems } from "@/data/allItems"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const indianCities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Bhopal",
  "Indore",
  "Nagpur",
  "Surat",
  "Kochi",
  "Goa",
  "Dehradun",
  "Vadodara",
]

export default function NearbyItems() {
  const [userCity, setUserCity] = useState<string | null>(null)
  const [nearbyItems, setNearbyItems] = useState(allItems)
  const [error, setError] = useState<string | null>(null)
  const [usingLiveLocation, setUsingLiveLocation] = useState(false)

  const handleCityChange = (city: string) => {
    setUserCity(city)
    setUsingLiveLocation(false)
    setError(null)
    const filteredItems = allItems.filter((item) => item.city === city)
    setNearbyItems(filteredItems)
  }

  const handleLiveLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUsingLiveLocation(true)
          setUserCity(null)
          setError(null)
          setNearbyItems(allItems) // Show all items across India
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Items Near You</h1>
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
        <p className="mb-4">Showing items across India based on your location</p>
      ) : userCity ? (
        <p className="mb-4">Showing items in {userCity}</p>
      ) : (
        <p className="mb-4">Please select your city or use your location to see available items.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {nearbyItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      {nearbyItems.length === 0 && <p className="text-center text-gray-600 mt-8">No items found in this location.</p>}
    </div>
  )
}

