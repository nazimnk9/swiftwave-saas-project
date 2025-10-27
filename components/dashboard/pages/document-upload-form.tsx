"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Upload, ChevronDown, File } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "@/components/auth/loader-overlay"
import { ToastNotification } from "@/components/auth/toast-notification"

interface DocumentUploadFormProps {
  bundleId: string
  onBack: () => void
  onNext: () => void
}

export function DocumentUploadForm({ bundleId, onBack, onNext }: DocumentUploadFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [toast, setToast] = useState<{
    title: string
    description: string
    variant: "default" | "destructive"
  } | null>(null)

  const [formData, setFormData] = useState({
    document_type: "passport",
    file: null as File | null,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file,
      }))
    }
  }

  const handleDocumentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      document_type: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.file) {
      setError("Please select a file to upload")
      return
    }

    try {
      setIsLoading(true)
      const authToken = localStorage.getItem("authToken")

      if (!authToken) {
        setError("Authentication token not found")
        setIsLoading(false)
        return
      }

      const uploadFormData = new FormData()
      uploadFormData.append("bundle_id", bundleId)
      uploadFormData.append("document_type", formData.document_type)
      uploadFormData.append("file", formData.file)

      const response = await axios.post(`${BASE_URL}/phone_number/documents/upload`, uploadFormData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("[v0] Document uploaded:", response.data)
      setToast({
        title: "Success",
        description: "Document uploaded successfully",
        variant: "default",
      })

      setTimeout(() => {
        onNext()
      }, 1000)
    } catch (err) {
      console.log("[v0] Error uploading document:", err)
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.error || "Failed to upload document"
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

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <LoaderOverlay isLoading={isLoading} message="Uploading document..." />

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
              <h1 className="text-3xl font-bold text-foreground">Document Upload</h1>
              <p className="text-muted-foreground mt-2">Step 2 of 3: Upload required documents</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">1</span>
              <span className="text-muted-foreground">→</span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-semibold">2</span>
              <span className="text-muted-foreground">→</span>
              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">3</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm font-medium">
            {error}
          </div>
        )}

        {/* Form Card */}
        <Card className="border-2 border-border max-w-3xl shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border">
            <CardTitle className="text-2xl">Upload Document</CardTitle>
            <CardDescription>Upload the required document for verification</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Document Type */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Document Type</label>
                <div className="relative">
                  <select
                    value={formData.document_type}
                    onChange={handleDocumentTypeChange}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 appearance-none cursor-pointer font-medium"
                  >
                    <option value="passport">Passport</option>
                    <option value="business_license">Business License</option>
                    <option value="driver_license">Driver License</option>
                    <option value="national_id">National ID</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Document File</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer group">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-input"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <label htmlFor="file-input" className="cursor-pointer block">
                    {formData.file ? (
                      <>
                        <File className="w-10 h-10 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <p className="text-sm font-semibold text-foreground">{formData.file.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3 group-hover:text-primary transition-colors" />
                        <p className="text-sm font-semibold text-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-2">PDF, JPG, PNG, DOC up to 10MB</p>
                      </>
                    )}
                  </label>
                </div>
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
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
