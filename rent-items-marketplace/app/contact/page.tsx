"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubjectChange = (value: string) => {
    setFormData((prevState) => ({ ...prevState, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("idle")

    // Here you would typically send the form data to your backend
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Form submitted:", formData)
      setFormStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormStatus("error")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">
            We're here to help and answer any question you might have. We look forward to hearing from you!
          </p>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> support@rentease.com
            </p>
            <p>
              <strong>Phone:</strong> +91 9876543210
            </p>
            <p>
              <strong>Address:</strong> Parul University
            </p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p>Saturday: 10:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Select name="subject" onValueChange={handleSubjectChange} value={formData.subject}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="support">Technical Support</SelectItem>
                <SelectItem value="billing">Billing Question</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              aria-required="true"
            />
          </div>
          <Button type="submit" disabled={formStatus === "success"}>
            Send Message
          </Button>

          {formStatus === "success" && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="mr-2" />
              <span>Thank you for your message. We will get back to you soon!</span>
            </div>
          )}
          {formStatus === "error" && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="mr-2" />
              <span>An error occurred. Please try again later.</span>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

