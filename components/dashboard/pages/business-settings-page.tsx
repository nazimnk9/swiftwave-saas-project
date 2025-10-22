// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { Zap } from "lucide-react"

// export function BusinessSettingsPage() {
//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <div className="p-4 md:p-8 space-y-8">
//         {/* Header */}
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Business Settings</h1>
//           <p className="text-muted-foreground mt-2">Manage your business integrations and settings</p>
//         </div>

//         {/* JobAdder Integration Card */}
//         <Card className="border-2 border-border hover:shadow-lg transition-shadow">
//           <CardHeader>
//             <div className="flex items-start justify-between">
//               <div className="flex items-start gap-3">
//                 <div className="p-2 bg-primary/10 rounded-lg">
//                   <Zap className="w-6 h-6 text-primary" />
//                 </div>
//                 <div>
//                   <CardTitle>JobAdder Integration</CardTitle>
//                   <CardDescription className="mt-2">
//                     Connect your JobAdder CRM account to enable automation features.
//                   </CardDescription>
//                 </div>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <Link
//               href="https://id.jobadder.com/connect/authorize?response_type=code&client_id=vdcmxl3ipmyupaybeylbr2ojiy&scope=read_jobad%20read_jobapplication%20write_jobapplication&redirect_uri=https://chatbot.rd1.co.uk/jobs&state=temp_state"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2">
//                 <Zap className="w-4 h-4" />
//                 Integrate JobAdder Account
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Zap } from "lucide-react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"

// interface Platform {
//   id: number
//   name: string
//   slug: string
//   description: string
//   base_url: string | null
//   client_id: string
//   auth_type: string
//   logo: string | null
//   status: string
// }

// interface PlatformResponse {
//   count: number
//   next: string | null
//   previous: string | null
//   results: Platform[]
// }

// export function BusinessSettingsPage() {
//   const [platforms, setPlatforms] = useState<Platform[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   useEffect(() => {
//     fetchPlatforms()
//   }, [])

//   const fetchPlatforms = async () => {
//     try {
//       setIsLoading(true)
//       const authToken = localStorage.getItem("authToken")

//       if (!authToken) {
//         setError("Authentication token not found. Please sign in again.")
//         setIsLoading(false)
//         return
//       }

//       const response = await axios.get<PlatformResponse>(`${BASE_URL}/organizations/platform/`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })

//       console.log("[v0] Platforms fetched:", response.data)
//       setPlatforms(response.data.results)
//       setIsLoading(false)
//     } catch (err) {
//       console.log("[v0] Error fetching platforms:", err)
//       setIsLoading(false)

//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.message || "Failed to fetch platforms"
//         setError(errorMessage)
//         setToast({
//           title: "Error",
//           description: errorMessage,
//           variant: "destructive",
//         })
//       } else {
//         setError("An error occurred while fetching platforms")
//         setToast({
//           title: "Error",
//           description: "An error occurred while fetching platforms",
//           variant: "destructive",
//         })
//       }
//     }
//   }

//   const handleIntegrate = (platform: Platform) => {
//     try {
//       const redirectUri = `${window.location.origin}/dashboard/business-settings`
//       const oauthUrl = `https://id.jobadder.com/connect/authorize?response_type=code&client_id=${platform.client_id}&scope=read_jobad%20read_jobapplication%20write_jobapplication&redirect_uri=${redirectUri}&state=temp_state`

//       console.log("[v0] Redirecting to OAuth URL:", oauthUrl)

//       sessionStorage.setItem("platformSlug", platform.slug)
//       sessionStorage.setItem("redirectUri", redirectUri)

//       // Redirect to JobAdder OAuth page
//       window.location.href = oauthUrl
//     } catch (err) {
//       console.log("[v0] Error initiating integration:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to initiate integration",
//         variant: "destructive",
//       })
//     }
//   }

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <LoaderOverlay isLoading={isLoading} message="Loading integrations..." />

//       {toast && (
//         <ToastNotification
//           title={toast.title}
//           description={toast.description}
//           variant={toast.variant}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <div className="p-4 md:p-8 space-y-8">
//         {/* Header */}
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Business Settings</h1>
//           <p className="text-muted-foreground mt-2">Manage your business integrations and settings</p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">{error}</div>
//         )}

//         {/* Integration Cards */}
//         <div className="space-y-4">
//           {platforms.length === 0 && !isLoading && (
//             <div className="text-center py-8 text-muted-foreground">No integrations available at the moment.</div>
//           )}

//           {platforms.map((platform) => (
//             <Card key={platform.id} className="border-2 border-border hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start gap-3">
//                     <div className="p-2 bg-primary/10 rounded-lg">
//                       <Zap className="w-6 h-6 text-primary" />
//                     </div>
//                     <div>
//                       <CardTitle>{platform.name} Integration</CardTitle>
//                       <CardDescription className="mt-2">
//                         {platform.description || `Connect your ${platform.name} account to enable automation features.`}
//                       </CardDescription>
//                       <div className="mt-2 text-xs text-muted-foreground">
//                         <span className="inline-block px-2 py-1 bg-muted rounded">Status: {platform.status}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <Button
//                   onClick={() => handleIntegrate(platform)}
//                   className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
//                 >
//                   <Zap className="w-4 h-4" />
//                   Integrate {platform.name} Account
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "@/components/auth/loader-overlay"
import { ToastNotification } from "@/components/auth/toast-notification"

interface Platform {
  id: number
  name: string
  slug: string
  description: string
  base_url: string | null
  client_id: string
  auth_type: string
  logo: string | null
  status: string
  redirect_uri: string
  scope: string
  response_type: string
  state: string
}

interface PlatformResponse {
  count: number
  next: string | null
  previous: string | null
  results: Platform[]
}

export function BusinessSettingsPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [toast, setToast] = useState<{
    title: string
    description: string
    variant: "default" | "destructive"
  } | null>(null)
  const [isIntegrating, setIsIntegrating] = useState(false)

  useEffect(() => {
    fetchPlatforms()
    checkOAuthCallback()
  }, [])

  const fetchPlatforms = async () => {
    try {
      setIsLoading(true)
      const authToken = localStorage.getItem("authToken")

      if (!authToken) {
        setError("Authentication token not found. Please sign in again.")
        setIsLoading(false)
        return
      }

      const response = await axios.get<PlatformResponse>(`${BASE_URL}/organizations/platform/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      console.log("[v0] Platforms fetched:", response.data)
      setPlatforms(response.data.results)
      setIsLoading(false)
    } catch (err) {
      console.log("[v0] Error fetching platforms:", err)
      setIsLoading(false)

      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || "Failed to fetch platforms"
        setError(errorMessage)
        setToast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      } else {
        setError("An error occurred while fetching platforms")
        setToast({
          title: "Error",
          description: "An error occurred while fetching platforms",
          variant: "destructive",
        })
      }
    }
  }

  const checkOAuthCallback = async () => {
    try {
      const params = new URLSearchParams(window.location.search)
      const code = params.get("code")
      const state = params.get("state")

      if (code) {
        console.log("[v0] OAuth callback detected with code:", code)
        setIsIntegrating(true)

        const authToken = localStorage.getItem("authToken")
        const platformSlug = sessionStorage.getItem("platformSlug")
        const redirectUri = sessionStorage.getItem("redirectUri")

        if (!authToken || !platformSlug || !redirectUri) {
          console.log("[v0] Missing required session data for OAuth callback")
          setIsIntegrating(false)
          return
        }

        // Post the authorization code to backend
        const response = await axios.post(
          `${BASE_URL}/organizations/platform/connect/`,
          {
            code: code,
            redirect_uri: redirectUri,
            platform_slug: platformSlug,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        )

        console.log("[v0] OAuth integration successful:", response.data)

        setToast({
          title: "Success",
          description: `Successfully integrated ${platformSlug}!`,
          variant: "default",
        })

        // Clear session storage
        sessionStorage.removeItem("platformSlug")
        sessionStorage.removeItem("redirectUri")

        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname)

        // Refresh platforms list
        await fetchPlatforms()
        setIsIntegrating(false)
      }
    } catch (err) {
      console.log("[v0] Error handling OAuth callback:", err)
      setIsIntegrating(false)

      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || "Failed to complete integration"
        setToast({
          title: "Integration Error",
          description: errorMessage,
          variant: "destructive",
        })
      } else {
        setToast({
          title: "Integration Error",
          description: "An error occurred while completing the integration",
          variant: "destructive",
        })
      }
    }
  }

  const handleIntegrate = (platform: Platform) => {
    try {
      console.log("[v0] Starting integration for platform:", platform.name)

      const oauthUrl = `${platform.base_url || "https://id.jobadder.com"}/connect/authorize?response_type=${encodeURIComponent(platform.response_type)}&client_id=${encodeURIComponent(platform.client_id)}&scope=${encodeURIComponent(platform.scope)}&redirect_uri=${encodeURIComponent(platform.redirect_uri)}&state=${encodeURIComponent(platform.state)}`

      console.log("[v0] Redirecting to OAuth URL:", oauthUrl)

      // Store platform info in session for callback handling
      sessionStorage.setItem("platformSlug", platform.slug)
      sessionStorage.setItem("redirectUri", platform.redirect_uri)

      // Redirect to OAuth provider
      window.location.href = oauthUrl
    } catch (err) {
      console.log("[v0] Error initiating integration:", err)
      setToast({
        title: "Error",
        description: "Failed to initiate integration",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <LoaderOverlay
        isLoading={isLoading || isIntegrating}
        message={isIntegrating ? "Completing integration..." : "Loading integrations..."}
      />

      {toast && (
        <ToastNotification
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}

      <div className="p-4 md:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Business Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your business integrations and settings</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">{error}</div>
        )}

        {/* Integration Cards */}
        <div className="space-y-4">
          {platforms.length === 0 && !isLoading && (
            <div className="text-center py-8 text-muted-foreground">No integrations available at the moment.</div>
          )}

          {platforms.map((platform) => (
            <Card key={platform.id} className="border-2 border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{platform.name} Integration</CardTitle>
                      <CardDescription className="mt-2">
                        {platform.description || `Connect your ${platform.name} account to enable automation features.`}
                      </CardDescription>
                      <div className="mt-2 text-xs text-muted-foreground">
                        <span className="inline-block px-2 py-1 bg-muted rounded">Status: {platform.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => handleIntegrate(platform)}
                  disabled={isIntegrating}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Integrate {platform.name} Account
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
