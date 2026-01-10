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

// This function simulates a geocoding API call.
// In a real application, you would use a service like Google Maps Geocoding API,
// OpenStreetMap's Nominatim, or similar services to convert coordinates to a city name.
const getCityFromCoordinates = (latitude: number, longitude: number) => {
  // We'll use a simple, hardcoded check for a specific city for demonstration purposes.
  // This is a placeholder and should be replaced with real geocoding logic.
  if (latitude >= 12.9 && latitude <= 13.1 && longitude >= 77.5 && longitude <= 77.7) {
    return "Bangalore";
  }
  if (latitude >= 19.0 && latitude <= 19.2 && longitude >= 72.8 && longitude <= 73.0) {
    return "Mumbai";
  }
  if (latitude >= 28.6 && latitude <= 28.7 && longitude >= 77.1 && longitude <= 77.3) {
    return "Delhi";
  }
  if (latitude >= 17.3 && latitude <= 17.5 && longitude >= 78.4 && longitude <= 78.6) {
    return "Hyderabad";
  }
  // Return a default city if no match is found
  return "Pune";
}

export default function NearbyItems() {
  const [userCity, setUserCity] = useState<string | null>(null)
  const [nearbyItems, setNearbyItems] = useState(allItems)
  const [error, setError] = useState<string | null>(null)
  const [usingLiveLocation, setUsingLiveLocation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCityChange = (city: string) => {
    setUserCity(city)
    setUsingLiveLocation(false)
    setError(null)
    const filteredItems = allItems.filter((item) => item.city === city)
    setNearbyItems(filteredItems)
  }

  const handleLiveLocation = () => {
    setIsLoading(true);
    setUsingLiveLocation(true);
    setError(null);
    setUserCity(null);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const cityFromCoords = getCityFromCoordinates(latitude, longitude);

          if (cityFromCoords) {
            const filteredItems = allItems.filter((item) => item.city === cityFromCoords);
            setUserCity(cityFromCoords);
            setNearbyItems(filteredItems);
          } else {
            setError("Could not determine your city from your location.");
            setNearbyItems([]);
          }
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          let errorMessage = "Unable to retrieve your location. Please check your browser permissions and network connection.";

          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access was denied. Please allow location permissions in your browser settings to continue.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Your location information is currently unavailable. Please check your network and try again.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get your location has timed out.";
              break;
          }

          setError(errorMessage);
          setIsLoading(false);
          setNearbyItems([]);
        },
      )
    } else {
      setError("Geolocation is not supported by your browser.");
      setIsLoading(false);
      setNearbyItems([]);
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
        <Select onValueChange={handleCityChange} value={userCity || ""} disabled={isLoading}>
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
        <Button onClick={handleLiveLocation} disabled={isLoading}>
          {isLoading ? "Fetching Location..." : "Use My Location"}
        </Button>
      </div>
      {isLoading ? (
        <p className="mb-4">Fetching your location and nearby items...</p>
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
      {nearbyItems.length === 0 && !isLoading && (
        <p className="text-center text-gray-600 mt-8">
          No items found in this location.
        </p>
      )}
    </div>
  )
}