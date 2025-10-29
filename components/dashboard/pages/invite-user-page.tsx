"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, ArrowLeft } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "@/components/auth/loader-overlay"
import { ToastNotification } from "@/components/auth/toast-notification"
import Link from "next/link"

export function InviteUserPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})
  const [toast, setToast] = useState<{ title: string; description: string; variant: "default" | "destructive" } | null>(
    null,
  )

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    // Clear error when user starts typing
    if (errors.email) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.email
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})

    try {
      setIsLoading(true)
      const authToken = localStorage.getItem("authToken")

      if (!authToken) {
        setToast({ title: "Error", description: "Authentication token not found", variant: "destructive" })
        return
      }

      const response = await axios.post(
        `${BASE_URL}/organizations/invite/`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )

      setToast({ title: "Success", description: "Invitation sent successfully", variant: "default" })
      setEmail("")
    } catch (error: any) {
      console.error("Error sending invitation:", error)

      // Handle validation errors from API response
      if (error.response?.data) {
        setErrors(error.response.data)
        const errorMessages = Object.entries(error.response.data)
          .map(([key, value]: [string, any]) => {
            if (Array.isArray(value)) {
              return value.join(", ")
            }
            return String(value)
          })
          .join("; ")
        setToast({ title: "Error", description: errorMessages || "Failed to send invitation", variant: "destructive" })
      } else {
        setToast({ title: "Error", description: "Failed to send invitation", variant: "destructive" })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 overflow-auto relative">
      <LoaderOverlay isLoading={isLoading} message={isLoading ? "Sending invitation..." : "Processing..."} />
      {toast && (
        <ToastNotification
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}

      <div className="p-8 space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/invite-list">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Mail className="w-8 h-8" />
              Invite User
            </h1>
            <p className="text-foreground/60 mt-1">Send an invitation to a new user</p>
          </div>
        </div>

        {/* Invite Form */}
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Send Invitation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isLoading}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <div className="text-sm text-red-500 space-y-1">
                    {errors.email.map((error, idx) => (
                      <p key={idx}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !email.trim()}>
                {isLoading ? "Sending..." : "Send Invitation"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
