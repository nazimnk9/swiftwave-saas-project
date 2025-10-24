// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Mail, Moon, Sun, ArrowLeft } from "lucide-react"
// import Image from "next/image"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "./loader-overlay"
// import { ToastNotification } from "./toast-notification"

// interface ForgotPasswordPageProps {
//   onBackClick: () => void
//   toggleTheme: () => void
//   isDark: boolean
// }

// export default function ForgotPasswordPage({ onBackClick, toggleTheme, isDark }: ForgotPasswordPageProps) {
//   const [email, setEmail] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const [generalError, setGeneralError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setGeneralError("")

//     if (!email) {
//       setGeneralError("Email is required")
//       return
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setGeneralError("Please enter a valid email")
//       return
//     }

//     setIsLoading(true)
//     try {
//       // Call forgot password API
//       await axios.post(`${BASE_URL}/auth/forgot-password`, {
//         email: email,
//       })

//       console.log("[v0] Forgot password email sent successfully")
//       setIsLoading(false)
//       setIsSubmitted(true)

//       setToast({
//         title: "Success",
//         description: "Password reset link has been sent to your email",
//         variant: "default",
//       })
//     } catch (err) {
//       console.log("[v0] Forgot password error:", err)
//       setIsLoading(false)

//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.message || "Failed to send reset link. Please try again."
//         setGeneralError(errorMessage)
//       } else {
//         setGeneralError("An error occurred. Please try again.")
//       }

//       setToast({
//         title: "Error",
//         description: "Failed to send reset link",
//         variant: "destructive",
//       })
//     }
//   }

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
//         <LoaderOverlay isLoading={isLoading} message="Sending reset link..." />

//         {toast && (
//           <ToastNotification
//             title={toast.title}
//             description={toast.description}
//             variant={toast.variant}
//             onClose={() => setToast(null)}
//           />
//         )}

//         {/* Theme Toggle */}
//         <button
//           onClick={toggleTheme}
//           className="absolute top-4 right-4 p-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors"
//         >
//           {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//         </button>

//         <div className="w-full max-w-md">
//           {/* Logo */}
//           <div className="flex justify-center mb-12">
//             <div className="relative w-32 h-32">
//               <Image src="/logo.png" alt="SwiftWave.AI Logo" fill className="object-contain" />
//             </div>
//           </div>

//           <Card className="border-2 border-border shadow-lg">
//             <CardHeader className="space-y-2 text-center">
//               <CardTitle className="text-3xl font-bold text-primary">Check Your Email</CardTitle>
//               <CardDescription className="text-base">Password reset link sent</CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-6">
//               <div className="p-4 bg-muted rounded-lg border border-border">
//                 <div className="flex items-center gap-3">
//                   <Mail className="w-5 h-5 text-primary" />
//                   <p className="text-sm font-medium text-foreground break-all">{email}</p>
//                 </div>
//               </div>

//               <div className="space-y-3 text-sm text-muted-foreground">
//                 <p>We've sent a password reset link to your email address.</p>
//                 <p>Click the link in the email to reset your password. The link will expire in 24 hours.</p>
//               </div>

//               <Button
//                 onClick={onBackClick}
//                 className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
//               >
//                 Back to Sign In
//               </Button>
//             </CardContent>
//           </Card>

//           <p className="text-center text-sm text-muted-foreground mt-6">
//             Didn't receive the email? Check your spam folder
//           </p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
//       <LoaderOverlay isLoading={isLoading} message="Sending reset link..." />

//       {toast && (
//         <ToastNotification
//           title={toast.title}
//           description={toast.description}
//           variant={toast.variant}
//           onClose={() => setToast(null)}
//         />
//       )}

//       {/* Theme Toggle */}
//       <button
//         onClick={toggleTheme}
//         className="absolute top-4 right-4 p-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors"
//       >
//         {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//       </button>

//       <div className="w-full max-w-md">
//         {/* Logo */}
//         <div className="flex justify-center mb-12">
//           <div className="relative w-32 h-32">
//             <Image src="/logo.png" alt="SwiftWave.AI Logo" fill className="object-contain" />
//           </div>
//         </div>

//         <Card className="border-2 border-border shadow-lg">
//           <CardHeader className="space-y-2 text-center">
//             <CardTitle className="text-3xl font-bold text-primary">Reset Password</CardTitle>
//             <CardDescription className="text-base">Enter your email to receive a reset link</CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="email"
//                     placeholder="you@example.com"
//                     value={email}
//                     onChange={(e) => {
//                       setEmail(e.target.value)
//                       setGeneralError("")
//                     }}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div>

//               {generalError && (
//                 <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
//                   {generalError}
//                 </div>
//               )}

//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base relative"
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-lg" />
//                     <span className="opacity-70">Sending...</span>
//                   </>
//                 ) : (
//                   "Send Reset Link"
//                 )}
//               </Button>

//               <Button
//                 type="button"
//                 onClick={onBackClick}
//                 disabled={isLoading}
//                 variant="outline"
//                 className="w-full h-11 border-2 border-border hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground font-semibold bg-transparent transition-colors flex items-center justify-center gap-2"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Back to Sign In
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <p className="text-center text-sm text-muted-foreground mt-6">
//           Remember your password?{" "}
//           <button onClick={onBackClick} className="text-primary hover:text-primary/80 font-medium">
//             Sign In
//           </button>
//         </p>
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Moon, Sun, ArrowLeft } from "lucide-react"
import Image from "next/image"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "./loader-overlay"
import { ToastNotification } from "./toast-notification"

interface ForgotPasswordPageProps {
  onBackClick: () => void
  toggleTheme: () => void
  isDark: boolean
}

export default function ForgotPasswordPage({ onBackClick, toggleTheme, isDark }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [generalError, setGeneralError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [toast, setToast] = useState<{
    title: string
    description: string
    variant: "default" | "destructive"
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError("")

    if (!email) {
      setGeneralError("Email is required")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setGeneralError("Please enter a valid email")
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post(`${BASE_URL}/auth/forget_password`, {
        email: email,
      })

      console.log("[v0] Forgot password email sent successfully:", response.data)
      setIsLoading(false)

      const successMsg = response.data?.detail || "Password reset email sent."
      setSuccessMessage(successMsg)
      setIsSubmitted(true)

      setToast({
        title: "Success",
        description: successMsg,
        variant: "default",
      })
    } catch (err) {
      console.log("[v0] Forgot password error:", err)
      setIsLoading(false)

      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.detail || err.response?.data?.message || "Failed to send reset link. Please try again."
        setGeneralError(errorMessage)
        setToast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      } else {
        setGeneralError("An error occurred. Please try again.")
        setToast({
          title: "Error",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <LoaderOverlay isLoading={isLoading} message="Sending reset link..." />

        {toast && (
          <ToastNotification
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            onClose={() => setToast(null)}
          />
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 p-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <div className="relative w-32 h-32">
              <Image src="/logo.png" alt="SwiftWave.AI Logo" fill className="object-contain" />
            </div>
          </div>

          <Card className="border-2 border-border shadow-lg">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold text-primary">Check Your Email</CardTitle>
              <CardDescription className="text-base">Password reset link sent</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <p className="text-sm font-medium text-foreground break-all">{email}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                <p>{successMessage}</p>
                <p>Click the link in the email to reset your password. The link will expire in 24 hours.</p>
              </div>

              <Button
                onClick={onBackClick}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
              >
                Back to Sign In
              </Button>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Didn't receive the email? Check your spam folder
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <LoaderOverlay isLoading={isLoading} message="Sending reset link..." />

      {toast && (
        <ToastNotification
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="relative w-32 h-32">
            <Image src="/logo.png" alt="SwiftWave.AI Logo" fill className="object-contain" />
          </div>
        </div>

        <Card className="border-2 border-border shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold text-primary">Reset Password</CardTitle>
            <CardDescription className="text-base">Enter your email to receive a reset link</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setGeneralError("")
                    }}
                    disabled={isLoading}
                    className="pl-10 h-11 border-2 border-border focus:border-primary"
                  />
                </div>
              </div>

              {generalError && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                  {generalError}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base relative"
              >
                {isLoading ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-lg" />
                    <span className="opacity-70">Sending...</span>
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <Button
                type="button"
                onClick={onBackClick}
                disabled={isLoading}
                variant="outline"
                className="w-full h-11 border-2 border-border hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground font-semibold bg-transparent transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Remember your password?{" "}
          <button onClick={onBackClick} className="text-primary hover:text-primary/80 font-medium">
            Sign In
          </button>
        </p>
      </div>
    </div>
  )
}
