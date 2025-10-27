"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Copy } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "@/components/auth/loader-overlay"
import { ToastNotification } from "@/components/auth/toast-notification"
import { useRouter } from "next/navigation"

interface PhoneFormData {
  phone_number: string
  area_code: string
  country: string
  bundle_id: string
  address_id: string
}

interface FinalBundleSubmissionProps {
  bundleId: string
  phoneFormData: PhoneFormData
  onBack: () => void
}

export function FinalBundleSubmission({ bundleId, phoneFormData, onBack }: FinalBundleSubmissionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [toast, setToast] = useState<{
    title: string
    description: string
    variant: "default" | "destructive"
  } | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      setIsLoading(true)
      const authToken = localStorage.getItem("authToken")

      if (!authToken) {
        setError("Authentication token not found")
        setIsLoading(false)
        return
      }

      const response = await axios.post(
        `${BASE_URL}/phone_number/bundles/submit`,
        {
          bundle_id: bundleId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )

      console.log("[v0] Bundle submitted:", response.data)
      setToast({
        title: "Success",
        description: "Phone number bundle submitted successfully",
        variant: "default",
      })

      setIsSubmitted(true)
      setTimeout(() => {
        router.push("/dashboard/settings")
      }, 2000)
    } catch (err) {
      console.log("[v0] Error submitting bundle:", err)
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.error || "Failed to submit bundle"
        setError(errorMessage)
        setToast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex-1 overflow-y-auto bg-background flex items-center justify-center p-4">
        <Card className="border-2 border-border max-w-md text-center shadow-2xl">
          <CardContent className="p-8">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
                <CheckCircle className="w-16 h-16 text-green-500 relative" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Submission Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your phone number bundle has been submitted successfully. You will be redirected shortly.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <LoaderOverlay isLoading={isLoading} message="Submitting bundle..." />

      {toast && (
        <ToastNotification
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}

      <div className="p-4 md:p-8 space-y-8">
        {/* Header with Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Final Bundle Submission</h1>
              <p className="text-muted-foreground mt-2">Step 3 of 3: Review and submit your bundle</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">1</span>
              <span className="text-muted-foreground">→</span>
              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">2</span>
              <span className="text-muted-foreground">→</span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-semibold">3</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm font-medium">
            {error}
          </div>
        )}

        {/* Summary Card */}
        <Card className="border-2 border-border max-w-3xl shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border">
            <CardTitle className="text-2xl">Bundle Summary</CardTitle>
            <CardDescription>Review your phone number bundle details</CardDescription>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            {/* Phone Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground text-lg">Phone Number Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg border border-border">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Phone Number</p>
                  <p className="text-sm font-medium text-foreground">{phoneFormData.phone_number || "Not specified"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Area Code</p>
                  <p className="text-sm font-medium text-foreground">{phoneFormData.area_code || "Not specified"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Country</p>
                  <p className="text-sm font-medium text-foreground">{phoneFormData.country}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Bundle ID</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground font-mono">{bundleId.substring(0, 12)}...</p>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground text-lg">Address Details</h3>
              <div className="p-6 bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg border border-border space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Address ID</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground font-mono">
                      {phoneFormData.address_id.substring(0, 12)}...
                    </p>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Info */}
            <div className="p-4 bg-primary/10 border-2 border-primary/30 rounded-lg">
              <p className="text-sm text-foreground font-medium">
                By clicking Submit, you confirm that all information is accurate and complete. Your bundle will be
                submitted for verification.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-6 border-t border-border">
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="flex-1 border-2 border-border hover:bg-muted bg-transparent text-foreground font-semibold transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? "Submitting..." : "Submit Bundle"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
