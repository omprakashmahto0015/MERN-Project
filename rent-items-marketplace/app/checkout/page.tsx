"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import EMICalculator from "@/components/EMICalculator";
import { QRCodeCanvas } from "qrcode.react";
 // ✅ added QR code

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

  const { cartItems, clearCart } = useCart();
  const router = useRouter();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      console.log("Order placed:", formData);
      setStep(4);
      clearCart();
      setTimeout(() => {
        router.push("/");
      }, 10000);
    }
  };

  const subtotal = cartItems.reduce(
    (sum: number, item: { price: number; days: number }) => sum + item.price * item.days,
    0
  );
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {step < 4 && (
        <div className="flex justify-between mb-8">
          <div className={`step ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>1. Shipping</div>
          <div className={`step ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>2. Payment</div>
          <div className={`step ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>3. Confirmation</div>
        </div>
      )}

      {step < 4 ? (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
              </div>
            </>
          )}

          {/* Step 2: Payment */}
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

              {/* Debit Card */}
              {formData.paymentMethod === "debitCard" && (
                <>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} required />
                  </div>
                </>
              )}

              {/* UPI */}
              {formData.paymentMethod === "upi" && (
                <div className="space-y-4">
                  {/* Manual UPI ID */}
                  <div>
                    <Label htmlFor="upiId">Enter UPI ID</Label>
                    <Input
                      id="upiId"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      placeholder="example@upi"
                      required
                    />
                  </div>

                  {/* QR Code */}
                  <div>
                    <Label>Or Scan QR to Pay</Label>
                    <div className="flex flex-col items-center border p-4 rounded-md">
                      <QRCodeCanvas
                        value={`upi://pay?pa=${formData.upiId || "rentease@oksbi"}&pn=${formData.name || "RentEase"}&am=${total.toFixed(2)}&cu=INR`}
                        size={180}
                      />
                      <p className="text-sm text-gray-600 mt-2">Scan this QR in your UPI app</p>
                    </div>
                  </div>
                </div>
              )}

              {/* EMI */}
              {formData.paymentMethod === "emi" && (
                <>
                  <div>
                    <Label htmlFor="emiMonths">EMI Duration</Label>
                    <Select
                      name="emiMonths"
                      value={formData.emiMonths}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, emiMonths: value }))}
                    >
                      <SelectTrigger id="emiMonths">
                        <SelectValue placeholder="Select EMI duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 month</SelectItem>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.emiMonths && (
                    <EMICalculator total={total} months={Number(formData.emiMonths)} />
                  )}
                </>
              )}
            </>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Address:</strong> {formData.address}, {formData.city}, {formData.country}</p>
              <p><strong>Payment Method:</strong> {formData.paymentMethod}</p>
              {formData.paymentMethod === "debitCard" && (
                <p><strong>Card Number:</strong> **** **** **** {formData.cardNumber.slice(-4)}</p>
              )}
              {formData.paymentMethod === "upi" && (
                <p><strong>UPI ID:</strong> {formData.upiId}</p>
              )}
              {formData.paymentMethod === "emi" && (
                <p><strong>EMI Duration:</strong> {formData.emiMonths} months</p>
              )}
              <div className="mt-4">
                <p><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</p>
                <p><strong>Tax (18% GST):</strong> ₹{tax.toFixed(2)}</p>
                <p className="text-xl font-semibold"><strong>Total:</strong> ₹{total.toFixed(2)}</p>
              </div>
            </div>
          )}

          <Button type="submit">{step < 3 ? "Next" : "Place Order"}</Button>
        </form>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h2>
          <p className="text-lg mb-6">Thank you, <strong>{formData.name}</strong>! Your order has been placed successfully.</p>
          <p className="mb-4">A confirmation email has been sent to <strong>{formData.email}</strong>.</p>
          <p className="text-sm text-gray-500">Redirecting you to home in 10 seconds...</p>
        </div>
      )}
    </div>
  );
}
