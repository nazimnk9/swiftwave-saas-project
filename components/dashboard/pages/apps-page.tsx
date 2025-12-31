"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { Skeleton } from "@/components/ui/skeleton"

interface AppFeature {
  id: number
  uid: string
  created_at: string
  updated_at: string
  name: string
  code: string
  description: string
  type: string
  status: string
  is_purchased: boolean
}

interface AppFeatureResponse {
  count: number
  next: string | null
  previous: string | null
  results: AppFeature[]
}

// Configuration for static assets (images, buttons) mapped by keywords in the app name
const APP_ASSET_CONFIG = [
  {
    keywords: ["whatsapp", "what's app"],
    id: "ai-what's-app-recruiter", // ID used for modal content lookup
    logoJobAdder: "/images/JobAdder.jpg",
    logoBullhorn: "/images/Bullhornconnector.jpg",
    buttons: ["Purchase", "Configure", "Report"],
    hasMore: true,
  },
  {
    keywords: ["sms"],
    id: "ai-sms-recruiter", // ID used for modal content lookup
    logoJobAdder: "/images/JobAdder.jpg",
    logoBullhorn: "/images/Bullhornconnector.jpg",
    buttons: ["Purchase", "Configure", "Report"],
    hasMore: true,
  },
  {
    keywords: ["phone", "call"],
    id: "phone-call-recruiter",
    logoJobAdder: "/images/JobAdder.jpg",
    logoBullhorn: "/images/Bullhornconnector.jpg",
    buttons: ["Purchase", "Configure", "Report"],
    hasMore: true,
  },
  {
    keywords: ["cv", "formatter"],
    id: "cv-formatter",
    logoJobAdder: "/images/JobAdder.jpg",
    logoBullhorn: "/images/Bullhornconnector.jpg",
    buttons: ["Purchase", "Configure", "Report"],
    hasMore: true,
  },
  {
    keywords: ["gdpr"],
    id: "gdpr-compliance",
    logoJobAdder: "/images/JobAdder.jpg",
    logoBullhorn: "/images/Bullhornconnector.jpg",
    buttons: ["Purchase", "Configure", "Report"],
    hasMore: true,
  },
  {
    keywords: ["awr"],
    id: "awr-compliance",
    logoJobAdder: "/images/JobAdder.jpg",
    logoBullhorn: "/images/Bullhornconnector.jpg",
    buttons: ["Purchase"],
    hasMore: true,
  },
]

const appDetails = {
  "ai-what's-app-recruiter": {
    title: "Ai What's app recruiter",
    about: [
      "This app can automate recruitment process on JobAdder.",
      "This App will check new live job applications, place a phone call to the applicant's phone or mobile number to start questionnaires by having automated call conversations. The interview questions will be build based on the job post details.",
      "You will choose common mandatory questions which will be asked in every interview at first. Answers to these questions must be positive to continue the interview.",
    ],
    setup: [
      "Purchase a phone number from our platform or choose a phone number from the purchased phone number list.",
      "Configure to edit the settings of this App automation.",
      "Finally your AI WhatsApp Recruiter app is live!",
    ],
  },
  "ai-sms-recruiter": {
    title: "Ai SMS recruiter",
    about: [
      "This app can automate recruitment process on JobAdder.",
      "This App will check new live job applications, place a phone call to the applicant's phone or mobile number to start questionnaires by having automated call conversations. The interview questions will be build based on the job post details.",
      "You will choose common mandatory questions which will be asked in every interview at first. Answers to these questions must be positive to continue the interview.",
    ],
    setup: [
      "Purchase a phone number from our platform or choose a phone number from the purchased phone number list.",
      "Configure to edit the settings of this App automation.",
      "Finally your AI WhatsApp Recruiter app is live!",
    ],
  },
  "phone-call-recruiter": {
    title: "AI Phone Call Recruiter",
    about: [
      "This app can automate recruitment process on JobAdder.",
      "This App will check new live job applications, place a phone call to the applicant's phone or mobile number to start questionnaires by having automated call conversations. The interview questions will be build based on the job post details.",
      "You will choose common mandatory questions which will be asked in every interview at first. Answers to these questions must be positive to continue the interview.",
    ],
    setup: [
      "Purchase a phone number from our platform or choose a phone number from the purchased phone number list.",
      "Configure to edit the settings of this App automation.",
      "Finally your AI Phone Call Recruiter app is live!",
    ],
  },
  "cv-formatter": {
    title: "AI CV Formatter",
    about: [
      "This app can automate recruitment process on JobAdder.",
      "This App will check new live job applications, place a phone call to the applicant's phone or mobile number to start questionnaires by having automated call conversations. The interview questions will be build based on the job post details.",
      "You will choose common mandatory questions which will be asked in every interview at first. Answers to these questions must be positive to continue the interview.",
    ],
    setup: [
      "Purchase a phone number from our platform or choose a phone number from the purchased phone number list.",
      "Configure to edit the settings of this App automation.",
      "Finally your AI CV Formatter app is live!",
    ],
  },
  "gdpr-compliance": {
    title: "AI GDPR Compliance Assistant",
    about: [
      "This app can automate recruitment process on JobAdder.",
      "This App will check new live job applications, place a phone call to the applicant's phone or mobile number to start questionnaires by having automated call conversations. The interview questions will be build based on the job post details.",
      "You will choose common mandatory questions which will be asked in every interview at first. Answers to these questions must be positive to continue the interview.",
    ],
    setup: [
      "Purchase a phone number from our platform or choose a phone number from the purchased phone number list.",
      "Configure to edit the settings of this App automation.",
      "Finally your AI GDPR Compliance Assistant app is live!",
    ],
  },
  "awr-compliance": {
    title: "AWR Compliance Assistant",
    about: [
      "This app can automate recruitment process on JobAdder.",
      "This App will check new live job applications, place a phone call to the applicant's phone or mobile number to start questionnaires by having automated call conversations. The interview questions will be build based on the job post details.",
      "You will choose common mandatory questions which will be asked in every interview at first. Answers to these questions must be positive to continue the interview.",
    ],
    setup: [
      "Purchase a phone number from our platform or choose a phone number from the purchased phone number list.",
      "Configure to edit the settings of this App automation.",
      "Finally your AWR Compliance Assistant app is live!",
    ],
  },
}

export default function AppsPage() {
  const [selectedFeature, setSelectedFeature] = useState<AppFeature | null>(null)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [features, setFeatures] = useState<AppFeature[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [skeletonCount, setSkeletonCount] = useState(5)

  const router = useRouter()

  useEffect(() => {
    fetchFeatures()
  }, [])

  const fetchFeatures = async () => {
    try {
      setIsLoading(true)
      const authToken = localStorage.getItem("authToken")

      const response = await axios.get<AppFeatureResponse>(`${BASE_URL}/subscription/features/`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      if (response.data.count) {
        setSkeletonCount(response.data.count)
      }
      setFeatures(response.data.results)
      setIsLoading(false)
    } catch (err) {
      console.error("Error fetching features:", err)
      setError("Failed to load apps")
      setIsLoading(false)
    }
  }

  const handlePurchaseClick = (feature: AppFeature) => {
    setSelectedFeature(feature)
    setIsPurchaseModalOpen(true)
  }

  const handleConfigureClick = (feature: AppFeature) => {
    router.push(`/dashboard/configure/${feature.uid}`)
  }

  const handleReportClick = (feature: AppFeature) => {
    router.push(`/dashboard/report/${feature.uid}`)
  }

  const handleClosePurchaseModal = () => {
    setIsPurchaseModalOpen(false)
    setSelectedFeature(null)
  }

  const handleContinue = () => {
    if (selectedFeature?.uid) {
      handleClosePurchaseModal()
      router.push(`/dashboard/pricing-plan/${selectedFeature.uid}`)
    }
  }

  // Helper to find matching assets
  const getAssetConfig = (name: string) => {
    const normalize = (str: string) => str.toLowerCase()
    const normalizedName = normalize(name)

    return APP_ASSET_CONFIG.find(config =>
      config.keywords.some(keyword => normalizedName.includes(keyword))
    )
  }

  const config = selectedFeature ? getAssetConfig(selectedFeature.name) : null
  const staticId = config?.id
  const currentAppDetails = staticId ? appDetails[staticId as keyof typeof appDetails] : null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Apps</h1>
        <p className="text-muted-foreground">Select an AI module to purchase or configure automation services.</p>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && (
          Array.from({ length: skeletonCount }).map((_, index) => ( // Dynamic from API count
            <Card key={index} className="pt-4 pb-0 flex flex-col border-2">
              <div className="flex items-center gap-2 bg-background border-b-2 pb-4 pl-6">
                <Skeleton className="h-15 w-15 rounded-md" />
                <Skeleton className="h-15 w-15 rounded-md" />
              </div>
              <div className="p-2 px-6 py-4 flex flex-col gap-4 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-6 w-10" />
                </div>
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </Card>
          ))
        )}
        {error && <p className="text-destructive">{error}</p>}
        {!isLoading && !error && features.map((feature) => {
          const config = getAssetConfig(feature.name)
          const staticId = config?.id // Use static ID for modal lookup and button logic

          return (
            <Card key={feature.id} className="pt-4 pb-0 flex flex-col shadow-lg hover:shadow-lg hover:scale-105 transition-all duration-300 border-2">
              {/* Logo Section */}
              <div className="flex items-center gap-2 bg-background border-b-2 pb-4 pl-6">
                {config?.logoJobAdder && (
                  <div className="relative w-15 h-15 border rounded-md dark:border-white">
                    <Image src={config.logoJobAdder || "/placeholder.svg"} alt="JobAdder" fill className="object-contain p-1" />
                  </div>
                )}
                {config?.logoBullhorn && (
                  <div className="relative w-15 h-15 border rounded-md dark:border-white">
                    <Image src={config.logoBullhorn || "/placeholder.svg"} alt="Bullhorn" fill className="object-contain p-1" />
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="px-6 py-4 flex flex-col gap-4 flex-1">
                {/* Title and More Link */}
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-foreground">{feature.name}</h3>
                  {config?.hasMore && (
                    <Link href="#" className="text-sm text-primary underline hover:underline">
                      More
                    </Link>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground flex-1">{feature.description}</p>

                {/* Action Buttons */}
                <div className={`flex gap-2 flex-wrap pb-1 ${config?.buttons && config.buttons.length === 1 ? "justify-center" : ""}`}>
                  {config?.buttons?.map((buttonLabel, idx) => {
                    // Hide "Purchase" button if the app is already purchased
                    if (buttonLabel === "Purchase" && feature.is_purchased) {
                      return null
                    }

                    return (
                      <Button
                        style={{ cursor: "pointer" }}
                        key={idx}
                        variant={idx === 0 ? "default" : "outline"}
                        className={
                          idx === 0
                            ? `bg-primary hover:bg-primary/90 ${config.buttons.length === 1 ? "w-3/4" : ""}`
                            : ""
                        }
                        onClick={() => {
                          if (buttonLabel === "Purchase") {
                            handlePurchaseClick(feature)
                          } else if (buttonLabel === "Configure") {
                            handleConfigureClick(feature)
                          } else if (buttonLabel === "Report") {
                            handleReportClick(feature)
                          }
                        }}
                      >
                        {buttonLabel}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
      {/* Purchase Modal */}
      <Dialog open={isPurchaseModalOpen} onOpenChange={setIsPurchaseModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] min-w-[45vw] overflow-y-auto p-0">
          {/* Custom Header with Close Button */}
          <div className="flex items-center justify-between p-2 border-b">
            <h2 className="text-xl font-semibold text-foreground">{currentAppDetails?.title} – Purchase</h2>
            <button
              onClick={handleClosePurchaseModal}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="h-5 w-5 cursor-pointer" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-2 space-y-6">
            {/* About this App Section */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">About this App</h3>
              <ul className="space-y-2 list-disc list-outside ml-5">
                {currentAppDetails?.about.map((item, idx) => (
                  <li key={idx} className="text-sm text-foreground leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Setup the App Section */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Setup the App</h3>
              <ul className="space-y-2 list-disc list-outside ml-5">
                {currentAppDetails?.setup.map((item, idx) => (
                  <li key={idx} className="text-sm text-foreground leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t">
            <Button variant="outline" onClick={handleClosePurchaseModal} className="cursor-pointer">
              Close
            </Button>
            <Button onClick={handleContinue} className="bg-primary hover:bg-primary/90 cursor-pointer">
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
