"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Starter",
    price: "$99",
    period: "/Month",
    interviews: "180 WhatsApp Recruit Interviews",
    description: "For individuals or small teams just getting started with WhatsApp messaging.",
    features: [
      "AI sends automated WhatsApp messages to job applicants",
      "Interview questions generated from your job ad",
      "Fully automated WhatsApp interview process",
      "Pre-application link sent to successful applicants",
      "Auto change Job Application status",
      "Attached ID & qualifications go to your CRM",
      "Option to integrate with AI CV Formatter – saving up to 70% of recruiter admin time",
    ],
    buttonText: "Select Starter",
    buttonVariant: "default" as const,
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$199",
    period: "/Month",
    interviews: "400 WhatsApp Recruit Interviews",
    description: "Ideal for growing businesses that need more messaging power and automation features.",
    features: ["All the features of Starter package, with more interviews"],
    buttonText: "Select Growth",
    buttonVariant: "default" as const,
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    interviews: "",
    description: "Built for high-volume senders that demand performance and advanced support.",
    features: [],
    buttonText: "Request a Call",
    buttonVariant: "default" as const,
    highlighted: false,
  },
]

export default function PricingPlanPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Pricing Plans</h1>
        <p className="text-muted-foreground">Select the plan that fits your needs.</p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingPlans.map((plan, index) => (
          <Card
            key={index}
            className={`p-8 flex flex-col gap-6 hover:shadow-lg transition-shadow ${
              plan.highlighted ? "border-primary border-2" : ""
            }`}
          >
            {/* Plan Name */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">{plan.name}</h2>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold text-foreground">{plan.price}</span>
              {plan.period && <span className="text-xl text-muted-foreground">{plan.period}</span>}
            </div>

            {/* Interviews Count */}
            {plan.interviews && <p className="text-sm text-muted-foreground">{plan.interviews}</p>}

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>

            {/* Features List */}
            {plan.features.length > 0 && (
              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Button */}
            <Button
              variant={plan.buttonVariant}
              size="lg"
              className="w-full bg-[#1e293b] hover:bg-[#1e293b]/90 text-white font-semibold"
            >
              {plan.buttonText}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
