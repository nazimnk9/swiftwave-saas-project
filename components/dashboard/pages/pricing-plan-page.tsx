"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { X, ArrowLeft } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next"

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
}

interface PricingPlanResponse {
  count: number
  next: string | null
  previous: string | null
  results: PricingPlan[]
}

// Static fallback for features list since API doesn't provide them yet
// This preserves the look of the cards even without bullet points from API
const DEFAULT_FEATURES_LIST = [
  // This part is tricky as we don't know what to put here dynamically.
  // For now, we might leave it empty or generic.
]

interface PricingPlanPageProps {
  featureUid?: string
}

export default function PricingPlanPage({ featureUid }: PricingPlanPageProps) {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [error, setError] = useState("")
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
      // user requested: ${BASE_URL}/subscription/plan/{uid}
      // Assuming {uid} refers to the featureUid passed in.
      // API structure: ${BASE_URL}/subscription/plan/${featureUid}

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

  const handleSelectPlan = async (planUid: string) => {
    try {
      setIsPurchasing(true)
      const authToken = getCookie("authToken")

      await axios.post(
        `${BASE_URL}/subscription/`,
        { plan_feature_uid: planUid },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      )

      router.push("/dashboard/apps")
    } catch (err) {
      console.error("Error purchasing plan:", err)
      setError("Failed to purchase plan. Please try again.")
      setIsPurchasing(false)
    }
  }

  if (featureUid && isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Pricing Plans</h1>
          <p className="text-muted-foreground">Select the plan that fits your needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="p-8 flex flex-col gap-6">
              <div>
                <Skeleton className="h-8 w-1/2 mb-1" />
              </div>
              <div className="flex items-baseline gap-1">
                <Skeleton className="h-12 w-24" />
              </div>
              <Skeleton className="h-4 w-1/3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="mt-auto">
                <Skeleton className="h-12 w-full" />
              </div>
            </Card>
          ))}
        </div>
        <Button
          variant="ghost"
          className="text-primary bg-primary/30 hover:bg-black hover:text-white mt-12 cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>
      </div>
    )
  }

  if (featureUid && error) {
    return <div className="p-8 text-destructive">{error}</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Pricing Plans</h1>
        <p className="text-muted-foreground">Select the plan that fits your needs.</p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.length > 0 ? (
          plans.map((plan, index) => (
            <Card
              key={plan.id}
              className="p-8 flex flex-col gap-6 hover:shadow-lg transition-shadow"
            >
              {/* Plan Name */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">{plan.name}</h2>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-foreground">${parseFloat(plan.price).toFixed(0)}</span>
                {/* Period - API doesn't seem to have period, defaulting or omitting */}
                {/* <span className="text-xl text-muted-foreground">/Month</span> */}
              </div>

              {/* Limit/Interviews Count */}
              {plan.limit && <p className="text-sm text-muted-foreground">{plan.limit} Interviews</p>}

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>

              {/* Features List - API doesn't provide bullet points, rendering empty lists or standard placeholder if requested? Use empty for now to follow "do not show static data" rule strictly for fetched content */}

              {/* Button */}
              <div className="mt-auto">
                <Button
                  size="lg"
                  className="w-full bg-[#1e293b] hover:bg-[#1e293b]/90 text-white font-semibold cursor-pointer"
                  // onClick={() => handleSelectPlan(plan.uid)}
                  onClick={() => router.push(`/dashboard/payment/${plan.uid}`)}
                  disabled={isPurchasing}
                >
                  {isPurchasing ? "Processing..." : `Select ${plan.name}`}
                </Button>
              </div>
            </Card>
          ))
        ) : (
          // Fallback or empty state if no plans found
          !isLoading && <p>No plans available for this feature.</p>
        )}
      </div>
      <Button
        variant="ghost"
        className="text-primary bg-primary/30 hover:bg-black hover:text-white mt-12 cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </Button>
    </div>
  )
}
