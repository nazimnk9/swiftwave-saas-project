"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "@/components/auth/loader-overlay"
import { ToastNotification } from "@/components/auth/toast-notification"
import { getCookie } from "cookies-next"

interface FinalSubmissionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack: () => void
  onSuccess: (bundleData: any) => void
}

interface BundleData {
  bundle: any
  endUser: any
  address: any
}

export function FinalSubmissionModal({ open, onOpenChange, onBack, onSuccess }: FinalSubmissionModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [toast, setToast] = useState<any>(null)
  const [bundleData, setBundleData] = useState<BundleData>({ bundle: {}, endUser: {}, address: {} })
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsHydrated(true)
      if (open) {
        const bundle = localStorage.getItem("bundleData") ? JSON.parse(localStorage.getItem("bundleData") || "{}") : {}
        const endUser = localStorage.getItem("endUserData")
          ? JSON.parse(localStorage.getItem("endUserData") || "{}")
          : {}
        const address = localStorage.getItem("addressData")
          ? JSON.parse(localStorage.getItem("addressData") || "{}")
          : {}
        setBundleData({ bundle, endUser, address })
      }
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      setIsLoading(true)
      const authToken = getCookie("authToken")

      if (!authToken) {
        setError("Authentication token not found")
        return
      }

      const { bundle, endUser, address } = bundleData

      // Validate data
      if (!bundle.friendly_name || !bundle.country_code || !bundle.number_type || !bundle.email) {
        setError("Bundle data is incomplete")
        return
      }

      if (
        !endUser.friendly_name ||
        !endUser.first_name ||
        !endUser.last_name ||
        !endUser.email ||
        !endUser.phone_number
      ) {
        setError("End user data is incomplete")
        return
      }

      if (!address.customer_name || !address.street || !address.city || !address.iso_country) {
        setError("Address data is incomplete")
        return
      }

      // Create Bundle
      const bundleResponse = await axios.post(
        `${BASE_URL}/phone_number/bundles/create`,
        {
          friendly_name: bundle.friendly_name,
          iso_country: bundle.country_code,
          number_type: bundle.number_type,
          email: bundle.email,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      )

      const bundleId = bundleResponse.data.bundle.id

      // Create End User
      await axios.post(
        `${BASE_URL}/phone_number/end-users/create`,
        {
          friendly_name: endUser.friendly_name,
          business_name: endUser.business_name,
          business_registration_number: endUser.business_registration_number,
          business_registration_identifier: endUser.business_registration_identifier,
          business_website: endUser.business_website,
          first_name: endUser.first_name,
          last_name: endUser.last_name,
          email: endUser.email,
          phone_number: endUser.phone_number,
          bundle_id: bundleId,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      )

      // Create Address
      await axios.post(
        `${BASE_URL}/phone_number/addresses/create`,
        {
          customer_name: address.customer_name,
          street: address.street,
          city: address.city,
          region: address.region,
          postal_code: address.postal_code,
          iso_country: address.iso_country,
          bundle_id: bundleId,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      )

      if (typeof window !== "undefined") {
        localStorage.removeItem("bundleData")
        localStorage.removeItem("endUserData")
        localStorage.removeItem("addressData")
      }

      setToast({
        title: "Success",
        description: "Bundle created successfully",
        variant: "default",
      })

      onSuccess({ id: bundleId, ...bundle })
    } catch (err) {
      console.log("[v0] Error submitting bundle:", err)
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.error || "Failed to create bundle"
        setError(errorMessage)
      } else {
        setError("An error occurred while creating the bundle")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!isHydrated) {
    return null
  }

  const { bundle, endUser, address } = bundleData

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" showCloseButton={false}>
        <LoaderOverlay isLoading={isLoading} />
        {toast && (
          <ToastNotification
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            onClose={() => setToast(null)}
          />
        )}

        <DialogHeader>
          <DialogTitle className="text-2xl">Review & Submit</DialogTitle>
          <DialogDescription>Verify all information before submission</DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Bundle Info */}
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-3">Bundle Information</h3>
            <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-2">
              <p>
                <span className="font-medium">Name:</span> {bundle.friendly_name}
              </p>
              <p>
                <span className="font-medium">Country:</span> {bundle.country_code}
              </p>
              <p>
                <span className="font-medium">Number Type:</span> {bundle.number_type}
              </p>
              <p>
                <span className="font-medium">Email:</span> {bundle.email}
              </p>
            </div>
          </div>

          {/* End User Info */}
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-3">End User Information</h3>
            <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-2">
              <p>
                <span className="font-medium">Friendly Name:</span> {endUser.friendly_name}
              </p>
              <p>
                <span className="font-medium">Business:</span> {endUser.business_name}
              </p>
              <p>
                <span className="font-medium">Name:</span> {endUser.first_name} {endUser.last_name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {endUser.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {endUser.phone_number}
              </p>
            </div>
          </div>

          {/* Address Info */}
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-3">Address Information</h3>
            <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-2">
              <p>
                <span className="font-medium">Customer:</span> {address.customer_name}
              </p>
              <p>
                <span className="font-medium">Street:</span> {address.street}
              </p>
              <p>
                <span className="font-medium">City:</span> {address.city}
              </p>
              <p>
                <span className="font-medium">Country:</span> {address.iso_country}
              </p>
              <p>
                <span className="font-medium">Postal:</span> {address.postal_code}
              </p>
            </div>
          </div>

          <DialogFooter className="flex gap-3 pt-6 border-t border-border">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="cursor-pointer flex-1 border-2 border-border bg-gradient-to-r from-primary/20 to-primary/20 dark:hover:text-white/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="cursor-pointer flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
