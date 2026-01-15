"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ArrowLeft, Check, X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next"
import { cn } from "@/lib/utils"

interface PricingPlanFeature {
  id: number
  uid: string
  created_at: string
  updated_at: string
  name: string
  code: string
  description: string
  type: string
  status: string
}

interface PricingPlan {
  id: number
  feature: PricingPlanFeature
  uid: string
  created_at: string
  updated_at: string
  limit: number
  name: string
  description: string
  price: string
  status: string
  des_list: string[]
  usage_fee_included: boolean
}

interface PricingPlanResponse {
  count: number
  next: string | null
  previous: string | null
  results: PricingPlan[]
}

interface PricingPlanPageProps {
  featureUid?: string
}

export default function PricingPlanPage({ featureUid }: PricingPlanPageProps) {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [error, setError] = useState("")
  // Track selected plan by UID. By default null or arguably the middle one? 
  // User didn't specify default, so we start with none or optional logic.
  // We'll let user select by clicking.
  const [selectedPlanUid, setSelectedPlanUid] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    if (featureUid) {
      fetchPlans()
    }
  }, [featureUid])

  const fetchPlans = async () => {
    try {
      setIsLoading(true)
      const authToken = getCookie("authToken")
      const response = await axios.get<PricingPlanResponse>(`${BASE_URL}/subscription/plan/${featureUid}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      setPlans(response.data.results)
      setIsLoading(false)
    } catch (err) {
      console.error("Error fetching plans:", err)
      setError("Failed to load pricing plans")
      setIsLoading(false)
    }
  }

  const handleSelectPlan = (planUid: string) => {
    setSelectedPlanUid(planUid)
  }

  const handleProceedToPayment = async (planUid: string) => {
    // If not selected, select it first?
    if (selectedPlanUid !== planUid) setSelectedPlanUid(planUid)

    // Then navigate
    router.push(`/dashboard/payment/${planUid}`)
  }

  // --- Design Tokens (as constants for readability or just direct usage) ---
  // Background: #FFFFFF
  // Surface: #FFFFFF
  // Surface Alt: #F7F9FC
  // Border: #E6E9EF
  // Divider: #EEF1F5
  // Text Primary: #111827
  // Text Secondary: #4B5563
  // Text Muted: #6B7280
  // AI Blue Main: #2EA8FF
  // AI Blue Deep: #147BFF
  // AI Blue Soft: #EAF6FF

  // Shadows
  const shadowDefault = "shadow-[0_8px_22px_rgba(16,24,40,0.08)]"
  const shadowHover = "hover:shadow-[0_12px_28px_rgba(16,24,40,0.10)]"
  const shadowActive = "shadow-[0_14px_34px_rgba(16,24,40,0.12)]"



  if (featureUid && isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-[#111827] mb-4">Pricing Plans</h1>
            <p className="text-[#6B7280] text-lg">Select the plan that fits your needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-2xl p-8 border border-[#E6E9EF] bg-white h-[600px] flex flex-col">
                <Skeleton className="h-10 w-1/2 mb-4" />
                <Skeleton className="h-16 w-3/4 mb-8" />
                <div className="space-y-4 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-12 w-full mt-8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (featureUid && error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF]">
        <div className="p-8 text-red-500 bg-[#F7F9FC] rounded-lg border border-[#E6E9EF]">
          {error}
        </div>
        <Button
          variant="ghost"
          className="mt-4 text-[#4B5563]"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#111827] mb-4 tracking-tight">Pricing Plans</h1>
          <p className="text-lg text-[#6B7280]">Select the best plan for your recruitment needs.</p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => {
            const isSelected = selectedPlanUid === plan.uid

            return (
              <div
                key={plan.uid}
                onClick={() => handleSelectPlan(plan.uid)}
                className={cn(
                  // Base structural styles
                  "relative rounded-2xl p-8 flex flex-col transition-all duration-300 cursor-pointer group bg-white",
                  // Borders
                  "border",
                  isSelected ? "border-[rgba(46,168,255,0.55)]" : "border-[#E6E9EF] hover:border-[rgba(46,168,255,0.55)]",
                  // Background
                  isSelected ? "bg-gradient-to-b from-[#FFFFFF] to-[#EAF6FF]" : "bg-[#FFFFFF] hover:bg-gradient-to-b hover:from-[#FFFFFF] hover:to-[#EAF6FF]",
                  // Shadows - Enhanced with Inset and Stronger Outer Glow
                  isSelected
                    ? "shadow-[0_0_0_6px_rgba(46,168,255,0.5),0_20px_40px_rgba(46,168,255,0.6),inset_0_0_60px_rgba(46,168,255,0.2)]"
                    : "shadow-[0_16px_25px_rgba(46,168,255,0.5)] hover:shadow-[0_0_0_6px_rgba(46,168,255,0.5),0_0_40px_rgba(46,168,255,0.6),inset_0_0_60px_rgba(46,168,255,0.2)]",
                  // Layout
                  "h-full"
                )}

              //
              >
                {/* Floor Reflection / Glow Effect (Behind/Below card) - Refined Light Beam */}
                <div className={cn(
                  "absolute -bottom-16 inset-x-0 mx-auto w-[120%] -translate-x-[10%] h-24 z-[-1] transition-all duration-500",
                  "bg-[radial-gradient(ellipse_at_center,_rgba(120,200,255,0.7)_0%,_rgba(46,168,255,0.3)_30%,_rgba(46,168,255,0)_70%)] blur-2xl",
                  isSelected ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                )} />

                {/* Blue Top Accent (Glow/Light beam) - Refined Glassy Look */}
                <div className={cn(
                  "absolute top-0 inset-x-0 h-5.5 rounded-t-2xl z-10 transition-all duration-300",
                  "bg-gradient-to-r from-[#2EA8FF] via-[#80D0FF] to-[#2EA8FF]", // Lighter center for "shine"
                  "shadow-[0_2px_15px_rgba(46,168,255,0.5)]", // Glow downwards
                  isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}>
                  {/* Inner highlight for extra glass/tube effect */}
                  <div className="absolute inset-x-0 top-[1px] h-[1px] bg-white/40 blur-[1px]" />
                </div>

                {/* Plan Content */}
                <div className="mb-6 text-center">
                  <h3 className="text-2xl font-bold text-[#111827] mb-2">{plan.name}</h3>
                  {/* <p className="text-[#6B7280] text-sm h-10 flex items-center justify-center">
                    
                    {plan.description || "For teams getting started"}
                  </p> */}
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-[#EEF1F5] mb-6" />

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={cn(
                      "text-5xl font-bold transition-colors duration-300",
                      isSelected ? "text-[#147BFF]" : "text-[#111827] group-hover:text-[#147BFF]" // "price accent can flip to #147BFF"
                    )}>
                      ${parseFloat(plan.price).toFixed(0)}
                    </span>
                    <span className="text-[#6B7280] font-medium">/month</span>
                  </div>
                  {!plan.usage_fee_included && (
                    <p className="text-xs text-[#6B7280] mt-2 font-medium">+ Usage fee will have extra cost</p>
                  )}
                  <div className="w-full h-[1px] bg-[#EEF1F5] mt-4" />
                </div>

                {/* Features */}
                <div className="space-y-4 flex-1 mb-8">
                  {/* Features from API des_list */}
                  {(plan.des_list || []).map((feature, idx, arr) => (
                    <div key={idx}>
                      <div className="flex items-start gap-3">
                        {/* Bullet */}
                        <div className={cn(
                          "mt-1 w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-300",
                          "bg-[#2EA8FF]"
                        )} />
                        <span className="text-[#4B5563] text-sm">{feature}</span>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="w-full h-[1px] bg-[#EEF1F5] mt-4" />
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation() // Prevent double trigger if clicking button also selects card
                    handleProceedToPayment(plan.uid)
                  }}
                  className={cn(
                    "w-full py-6 text-base font-semibold shadow-none transition-all duration-200",
                    // Default state
                    isSelected ? "bg-[#147BFF] text-white hover:bg-[#147BFF]/90" : "bg-[#111827] text-white hover:bg-[#0B1220]",
                    // Active/Selected modifications if any specific button states needed beyond hover
                    isSelected && "ring-2 ring-[rgba(46,168,255,0.75)] ring-offset-2"
                  )}
                >
                  {isPurchasing && selectedPlanUid === plan.uid ? "Processing..." : "Get Started"}
                </Button>

              </div>
            )
          })}

          {/* Static Enterprise Card */}
          <div
            onClick={() => handleSelectPlan("enterprise-plan")}
            className={cn(
              "relative rounded-2xl p-8 flex flex-col transition-all duration-300 cursor-pointer group bg-white",
              "border",
              selectedPlanUid === "enterprise-plan" ? "border-[rgba(46,168,255,0.55)]" : "border-[#E6E9EF] hover:border-[rgba(46,168,255,0.55)]",
              selectedPlanUid === "enterprise-plan" ? "bg-gradient-to-b from-[#FFFFFF] to-[#EAF6FF]" : "bg-[#FFFFFF] hover:bg-gradient-to-b hover:from-[#FFFFFF] hover:to-[#EAF6FF]",
              selectedPlanUid === "enterprise-plan"
                ? "shadow-[0_0_0_6px_rgba(46,168,255,0.5),0_20px_40px_rgba(46,168,255,0.6),inset_0_0_60px_rgba(46,168,255,0.2)]"
                : "shadow-[0_16px_25px_rgba(46,168,255,0.5)] hover:shadow-[0_0_0_6px_rgba(46,168,255,0.5),0_0_40px_rgba(46,168,255,0.6),inset_0_0_60px_rgba(46,168,255,0.2)]",
              "h-full"
            )}
          >
            {/* Floor Reflection */}
            <div className={cn(
              "absolute -bottom-16 inset-x-0 mx-auto w-[120%] -translate-x-[10%] h-24 z-[-1] transition-all duration-500",
              "bg-[radial-gradient(ellipse_at_center,_rgba(120,200,255,0.7)_0%,_rgba(46,168,255,0.3)_30%,_rgba(46,168,255,0)_70%)] blur-2xl",
              selectedPlanUid === "enterprise-plan" ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
            )} />

            {/* Blue Top Accent */}
            <div className={cn(
              "absolute top-0 inset-x-0 h-5.5 rounded-t-2xl z-10 transition-all duration-300",
              "bg-gradient-to-r from-[#2EA8FF] via-[#80D0FF] to-[#2EA8FF]",
              "shadow-[0_2px_15px_rgba(46,168,255,0.5)]",
              selectedPlanUid === "enterprise-plan" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}>
              <div className="absolute inset-x-0 top-[1px] h-[1px] bg-white/40 blur-[1px]" />
            </div>

            {/* Plan Content */}
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-[#111827] mb-2">Enterprise</h3>
            </div>

            <div className="w-full h-[1px] bg-[#EEF1F5] mb-6" />

            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-1">
                <span className={cn(
                  "text-4xl font-bold transition-colors duration-300",
                  selectedPlanUid === "enterprise-plan" ? "text-[#147BFF]" : "text-[#111827] group-hover:text-[#147BFF]"
                )}>
                  Custom Price
                </span>
              </div>
              <div className="w-full h-[1px] bg-[#EEF1F5] mt-4" />
            </div>

            {/* Features */}
            {/* <div className="space-y-4 flex-1 mb-8">
              {[
                "Custom Volume",
                "Dedicated Infrastructure",
                "SLA Support",
                "Priority Assistance"
              ].map((feature, idx, arr) => (
                <div key={idx}>
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "mt-1 w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-300",
                      "bg-[#2EA8FF]"
                    )} />
                    <span className="text-[#4B5563] text-sm">{feature}</span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="w-full h-[1px] bg-[#EEF1F5] mt-4" />
                  )}
                </div>
              ))}
            </div> */}

            {/* CTA Button */}
            <Button
              onClick={(e) => {
                e.stopPropagation()
                handleSelectPlan("enterprise-plan")
              }}
              className={cn(
                "w-full py-6 text-base font-semibold shadow-none transition-all duration-200 mt-auto",
                selectedPlanUid === "enterprise-plan" ? "bg-[#147BFF] text-white hover:bg-[#147BFF]/90" : "bg-[#111827] text-white hover:bg-[#0B1220]",
                selectedPlanUid === "enterprise-plan" && "ring-2 ring-[rgba(46,168,255,0.75)] ring-offset-2"
              )}
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-12 flex justify-center">
          <Button
            variant="ghost"
            className="text-[#4B5563] hover:text-[#111827] hover:bg-[#F7F9FC]"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}
