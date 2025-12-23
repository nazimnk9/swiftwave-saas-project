"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation" // Import useRouter for navigation

const apps = [
    {
        id: "whatsapp-recruiter",
        title: "AI WhatsApp Recruiter",
        description: "Automate candidate outreach via WhatsApp messaging for faster engagement.",
        logoJobAdder: "/images/jobadder.png",
        logoBullhorn: "/images/bullhornconnector.png",
        buttons: ["Purchase", "Configure", "Report"],
        hasMore: true,
    },
    {
        id: "phone-call-recruiter",
        title: "AI Phone Call Recruiter",
        description: "Conduct personalised phone interviews with AI-driven voice calls.",
        logoJobAdder: "/images/jobadder.png",
        logoBullhorn: "/images/bullhornconnector.png",
        buttons: ["Purchase", "Configure"],
        hasMore: true,
    },
    {
        id: "cv-formatter",
        title: "AI CV Formatter",
        description: "Automatically format candidate CVs to match your preferred style and layout.",
        logoBullhorn: "/images/bullhornconnector.png",
        buttons: ["Purchase"],
        hasMore: true,
    },
    {
        id: "gdpr-compliance",
        title: "AI GDPR Compliance Assistant",
        description: "Ensure candidate data processing adheres to strict GDPR requirements.",
        logoJobAdder: "/images/jobadder.png",
        buttons: ["Purchase"],
        hasMore: true,
    },
    {
        id: "awr-compliance",
        title: "AWR Compliance Assistant",
        description: "Stay compliant with Agency Workers Regulations across your recruitment processes.",
        logoJobAdder: "/images/jobadder.png",
        logoBullhorn: "/images/bullhornconnector.png",
        buttons: ["Purchase"],
        hasMore: true,
    },
]

const appDetails = {
  "whatsapp-recruiter": {
    title: "AI WhatsApp Recruiter",
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
    const [selectedApp, setSelectedApp] = useState<string | null>(null)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const router = useRouter()

  const handlePurchaseClick = (appId: string) => {
    setSelectedApp(appId)
    setIsPurchaseModalOpen(true)
  }

  const handleConfigureClick = () => {
    router.push("/dashboard/configure")
  }

  const handleClosePurchaseModal = () => {
    setIsPurchaseModalOpen(false)
    setSelectedApp(null)
  }

  const handleContinue = () => {
    handleClosePurchaseModal()
    router.push("/dashboard/pricing-plan") // Navigate to pricing plan page instead of just logging
  }

  const currentAppDetails = selectedApp ? appDetails[selectedApp as keyof typeof appDetails] : null
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Apps</h1>
                <p className="text-muted-foreground">Select an AI module to purchase or configure automation services.</p>
            </div>

            {/* Apps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app) => (
                    <Card key={app.id} className="pt-4 pb-0 flex flex-col hover:shadow-lg transition-shadow">
                        {/* Logo Section */}
                        <div className="flex items-center gap-2 bg-background border-b-2 pb-4 pl-2">
                            {app.logoJobAdder && (
                                <div className="relative w-15 h-15 border rounded-md">
                                    <Image src={app.logoJobAdder || "/placeholder.svg"} alt="JobAdder" fill className="object-contain p-1" />
                                </div>
                            )}
                            {app.logoBullhorn && (
                                <div className="relative w-15 h-15 border rounded-md">
                                    <Image src={app.logoBullhorn || "/placeholder.svg"} alt="Bullhorn" fill className="object-contain p-1" />
                                </div>
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="p-2 flex flex-col gap-4 flex-1">
                            {/* Title and More Link */}
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg font-semibold text-foreground">{app.title}</h3>
                                {app.hasMore && (
                                    <Link href="#" className="text-sm text-primary underline hover:underline">
                                        More
                                    </Link>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground flex-1">{app.description}</p>

                            {/* Action Buttons */}
                            {/* Action Buttons */}
                            <div className={`flex gap-2 flex-wrap pb-1 ${app.buttons.length === 1 ? "justify-center" : ""}`}>
                                {app.buttons.map((buttonLabel, idx) => (
                                    <Button
                                        key={idx}
                                        variant={idx === 0 ? "default" : "outline"}
                                        className={
                                            idx === 0
                                                ? `bg-primary hover:bg-primary/90 ${app.buttons.length === 1 ? "w-3/4" : ""}`
                                                : ""
                                        }
                                        onClick={() => {
                    if (buttonLabel === "Purchase") {
                      handlePurchaseClick(app.id)
                    } else if (buttonLabel === "Configure") {
                      handleConfigureClick()
                    }
                  }}
                                    >
                                        {buttonLabel}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </Card>
                ))}
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
              <X className="h-5 w-5" />
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
            <Button variant="outline" onClick={handleClosePurchaseModal}>
              Close
            </Button>
            <Button onClick={handleContinue} className="bg-primary hover:bg-primary/90">
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
        </div>
    )
}
