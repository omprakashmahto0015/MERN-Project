"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ItemCard from "@/components/ItemCard";
import { useAuth } from "@/context/AuthContext";

type Item = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  city: string;
  securityDeposit?: number;
};

export default function Profile() {
  const { user } = useAuth();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [userItems, setUserItems] = useState<Item[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // 🆕 State for avatar image
  const [avatarUrl, setAvatarUrl] = useState("/sachin.png");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 🆕 Load avatar from localStorage (if any)
  useEffect(() => {
    try {
      const savedAvatar = localStorage.getItem("profileAvatar");
      if (savedAvatar) {
        setAvatarUrl(savedAvatar);
      }
    } catch (err) {
      console.error("Error loading saved avatar:", err);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found.");
          return;
        }

        const res = await fetch("http://localhost:5000/api/items/listed", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch listed items");
        }

        const data: Item[] = await res.json();
        setUserItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };

    fetchUserItems();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Updated userData", userData);
  };

  // 🆕 Handle avatar click
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // 🆕 Handle avatar change and save to localStorage
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string;
      setAvatarUrl(base64Image);
      try {
        localStorage.setItem("profileAvatar", base64Image);
      } catch (err) {
        console.error("Error saving avatar to localStorage:", err);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Profile</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Manage your personal details and account settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={userData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div
                  className="flex items-center space-x-4 cursor-pointer"
                  onClick={handleAvatarClick}
                >
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>
                      {userData.name.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                  />
                  <div>
                    <h2 className="text-2xl font-semibold">{userData.name}</h2>
                    <p className="text-gray-600">Member since January 2025</p>
                    <p className="text-xs text-blue-600">
                      Click photo to change
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>{userData.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p>{userData.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold">Address</p>
                    <p>{userData.address}</p>
                  </div>
                </div>
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Items Rented:</span> 15
              </p>
              <p>
                <span className="font-semibold">Items Listed:</span>{" "}
                {userItems.length}
              </p>
              <p>
                <span className="font-semibold">Total Earnings:</span> ₹50,000
              </p>
              <p>
                <span className="font-semibold">Account Status:</span>{" "}
                <span className="text-green-600">Active</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Your Items</h2>
        <Tabs defaultValue="listed">
          <TabsList>
            <TabsTrigger value="listed">Listed Items</TabsTrigger>
            <TabsTrigger value="rented">Rented Items</TabsTrigger>
          </TabsList>
          <TabsContent value="listed">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
              {userItems.length > 0 ? (
                userItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))
              ) : (
                <p className="text-gray-600">No items listed yet.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="rented">
            <p className="text-gray-600 mt-4">
              You haven't rented any items yet.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
