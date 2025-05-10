"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FormDataState {
  name: string;
  description: string;
  category: string;
  price: string;
  securityDeposit: string;
  city: string;
  image: File | null;
}

export default function ListItem() {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    description: "",
    category: "",
    price: "",
    securityDeposit: "",
    city: "",
    image: null,
  });

  // ✅ Handle text & textarea changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // ✅ Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevState) => ({ ...prevState, image: file }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataObj = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        if (key === "image" && value instanceof File) {
          formDataObj.append(key, value);
        } else {
          formDataObj.append(key, value as string);
        }
      }
    });

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataObj,
      });

      if (res.ok) {
        alert("Item listed successfully!");
        setFormData({
          name: "",
          description: "",
          category: "",
          price: "",
          securityDeposit: "",
          city: "",
          image: null,
        });
      } else {
        alert("Failed to list item");
      }
    } catch (error) {
      console.error("Error listing item:", error);
      alert("Error listing item");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">List Your Item</h1>
      <Card>
        <CardHeader>
          <CardTitle>Item Details</CardTitle>
          <CardDescription>Provide information about the item you want to list for rent</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Item Name</Label>
                <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prevState) => ({ ...prevState, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="tools">Tools</SelectItem>
                    <SelectItem value="vehicles">Vehicles</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={4} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price per Day (₹)</Label>
                <Input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" />
              </div>
              <div>
                <Label htmlFor="securityDeposit">Security Deposit (₹)</Label>
                <Input type="number" id="securityDeposit" name="securityDeposit" value={formData.securityDeposit} onChange={handleChange} required min="0" step="0.01" />
              </div>
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required placeholder="Enter your city" />
            </div>
            <div>
              <Label htmlFor="image">Item Image</Label>
              <Input type="file" id="image" name="image" onChange={handleImageChange} accept="image/*" required />
            </div>
            <Button type="submit">List Item</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
