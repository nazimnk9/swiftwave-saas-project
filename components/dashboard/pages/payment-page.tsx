"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { useRouter } from "next/navigation"
import { X, ArrowLeft } from "lucide-react"

interface PaymentPageProps {
  planUid?: string
}

export default function PaymentPage({ planUid }: PaymentPageProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    billingAddress: "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!planUid) {
      console.error("No plan UID provided")
      return
    }

    try {
      setLoading(true)
      const authToken = localStorage.getItem("authToken")
      await axios.post(
        `${BASE_URL}/subscription/`,
        { plan_feature_uid: planUid },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )

      router.push("/dashboard/apps")
    } catch (error) {
      console.error("Error purchasing subscription:", error)
      // You might want to show an error message here
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e293b] dark:text-white mb-2">Payment Details</h1>
          <p className="text-muted-foreground">Enter your payment information to complete the purchase.</p>
        </div>

        <Card className="p-8 shadow-sm border-none rounded-xl">
          <form className="space-y-6" onSubmit={handlePurchase}>
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-[#1e293b] dark:text-white">
                Full Name
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                className="h-11 border-gray-200 focus:ring-primary"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-[#1e293b] dark:text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-11 border-gray-200 focus:ring-primary"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-sm font-medium text-[#1e293b] dark:text-white">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                className="h-11 border-gray-200"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry" className="text-sm font-medium text-[#1e293b] dark:text-white">
                  Expiry
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  className="h-11 border-gray-200"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-sm font-medium text-[#1e293b] dark:text-white">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="CVV"
                  className="h-11 border-gray-200"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingAddress" className="text-sm font-medium text-[#1e293b] dark:text-white">
                Billing Address
              </Label>
              <Input
                id="billingAddress"
                placeholder="Enter your billing address"
                className="h-11 border-gray-200"
                value={formData.billingAddress}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex flex-row gap-4 ">
              <Button
                type="submit"
                className="w-1/2 h-12 bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold text-base mt-4 transition-colors cursor-pointer"
                disabled={loading}
              >
                {loading ? "Processing..." : "Purchase Now"}
              </Button>
              <Button
                variant="ghost"
                className="w-60 h-12 text-primary bg-primary/30 hover:bg-black hover:text-white mt-4 cursor-pointer"
                onClick={() => router.back()}
              >
                {/* <ArrowLeft className="h-5 w-5 mr-2" /> */}
                Back
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
