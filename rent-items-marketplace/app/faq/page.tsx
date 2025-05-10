"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How does RentEase work?",
    answer:
      "RentEase is a platform that connects people who want to rent items with those who have items to rent out. You can browse available items, make a rental request, and arrange for pickup or delivery. If you have items to rent out, you can list them on our platform and set your own rental prices and terms.",
  },
  {
    question: "Is it safe to rent items from strangers?",
    answer:
      "We take safety seriously at RentEase. We have a user rating system, secure payment processing, and insurance options for high-value items. We also encourage users to meet in safe, public places for item exchanges when possible. However, we always recommend using your best judgment and following safety precautions when meeting with others.",
  },
  {
    question: "What if an item I rent gets damaged?",
    answer:
      "In case of damage, we have a resolution process in place. We encourage renters and owners to document the condition of items before and after the rental period. If damage occurs, the renter may be responsible for repair or replacement costs. We recommend discussing any concerns with the item owner first, and our support team is available to help mediate if needed.",
  },
  {
    question: "How do I list an item for rent?",
    answer:
      "To list an item, log into your account and click on 'List Your Item'. You'll need to provide details about the item, set a rental price, and upload clear photos. Be sure to describe the item's condition and any special instructions for its use. Once submitted, our team will review your listing and it should be live within 24 hours.",
  },
  {
    question: "How does payment work?",
    answer:
      "When you rent an item, you'll pay through our secure payment system. The funds are held until 24 hours after the rental period begins, at which point they're released to the item owner. This gives you time to ensure the item is as described. For item owners, payments are typically processed within 3-5 business days after the rental period ends.",
  },
  {
    question: "What if I need to cancel a rental?",
    answer:
      "Our cancellation policy depends on how far in advance you cancel. Cancellations made more than 48 hours before the rental period starts usually receive a full refund. Cancellations within 48 hours may be subject to a partial refund or no refund, depending on the item owner's policy. We encourage you to communicate with the other party if you need to cancel.",
  },
  {
    question: "Is there a minimum or maximum rental period?",
    answer:
      "Rental periods can vary depending on the item and the owner's preferences. Some items may have a minimum rental period (e.g., 1 day), while others might have a maximum (e.g., 30 days). These details will be specified in the item listing. If you need a custom rental period, you can always message the item owner to discuss options.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null)
    } else {
      setOpenIndex(index)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              className="flex justify-between items-center w-full p-4 text-left bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => toggleQuestion(index)}
            >
              <span className="font-semibold">{faq.question}</span>
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

