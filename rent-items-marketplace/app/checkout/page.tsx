"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import EMICalculator from "@/components/EMICalculator";

export default function Checkout() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
    emiMonths: "",
  });
  const { cartItems } = useCart();

  // Type-safe handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Type-safe handleSubmit function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log("Order placed:", formData);
      // Here you would typically send the data to your backend
    }
  };

  const subtotal = cartItems.reduce((sum: number, item: { price: number; days: number }) => sum + item.price * item.days, 0);
  const tax = subtotal * 0.18; // Assuming 18% GST
  const total = subtotal + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="flex justify-between mb-8">
        <div className={`step ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>1. Shipping</div>
        <div className={`step ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>2. Payment</div>
        <div className={`step ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>3. Confirmation</div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        {step === 1 && (
          <>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div>
              <Label>Payment Method</Label>
              <RadioGroup
                name="paymentMethod"
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debitCard" id="debitCard" />
                  <Label htmlFor="debitCard">Debit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi">UPI</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cashOnDelivery" id="cashOnDelivery" />
                  <Label htmlFor="cashOnDelivery">Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="emi" id="emi" />
                  <Label htmlFor="emi">EMI</Label>
                </div>
              </RadioGroup>
            </div>
            {formData.paymentMethod === "debitCard" && (
              <>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input type="text" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} required />
                </div>
              </>
            )}
            {formData.paymentMethod === "upi" && (
              <div>
                <Label htmlFor="upiId">UPI ID</Label>
                <Input type="text" id="upiId" name="upiId" value={formData.upiId} onChange={handleChange} required />
              </div>
            )}
            {formData.paymentMethod === "emi" && (
              <>
                <div>
                  <Label htmlFor="emiMonths">EMI Duration</Label>
                  <Select
                    name="emiMonths"
                    value={formData.emiMonths}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, emiMonths: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select EMI duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 week</SelectItem>
                      <SelectItem value="1">1 months</SelectItem>
                      <SelectItem value="2">2 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <EMICalculator total={total} months={Number(formData.emiMonths)} />
              </>
            )}
          </>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Address:</strong> {formData.address}, {formData.city}, {formData.country}</p>
            <p><strong>Payment Method:</strong> {formData.paymentMethod}</p>
            {formData.paymentMethod === "debitCard" && <p><strong>Card Number:</strong> **** **** **** {formData.cardNumber.slice(-4)}</p>}
            {formData.paymentMethod === "upi" && <p><strong>UPI ID:</strong> {formData.upiId}</p>}
            {formData.paymentMethod === "emi" && <p><strong>EMI Duration:</strong> {formData.emiMonths} months</p>}
            <div className="mt-4">
              <p><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</p>
              <p><strong>Tax (18% GST):</strong> ₹{tax.toFixed(2)}</p>
              <p className="text-xl font-semibold"><strong>Total:</strong> ₹{total.toFixed(2)}</p>
            </div>
          </div>
        )}
        <Button type="submit">{step < 3 ? "Next" : "Place Order"}</Button>
      </form>
    </div>
  );
}
