// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Lock, Eye, EyeOff, Moon, Sun } from "lucide-react"
// import Image from "next/image"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "./loader-overlay"
// import { ToastNotification } from "./toast-notification"

// interface PasswordSetupPageProps {
//   email: string
//   onComplete: () => void
//   toggleTheme: () => void
//   isDark: boolean
//   token?: string
// }

// export default function PasswordSetupPage({ email, onComplete, toggleTheme, isDark, token }: PasswordSetupPageProps) {
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     if (!password || !confirmPassword) {
//       setError("Both password fields are required")
//       return
//     }

//     if (password.length < 8) {
//       setError("Password must be at least 8 characters")
//       return
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match")
//       return
//     }

//     setIsLoading(true)
//     try {
//       if (token) {
//         const response = await axios.put(`${BASE_URL}/auth/verify/${token}`, {
//           password: password,
//         })
//         console.log("[v0] Password verification successful:", response.data)
//       }
//       setIsLoading(false)

//       setToast({
//         title: "Success",
//         description: "Your password has been set successfully! Registration is complete.",
//         variant: "default",
//       })

//       setTimeout(() => {
//         onComplete()
//       }, 1500)
//     } catch (err) {
//       console.log("[v0] Password verification error:", err)
//       setIsLoading(false)

//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.message || "Password setup failed. Please try again."
//         setError(errorMessage)
//         setToast({
//           title: "Error",
//           description: errorMessage,
//           variant: "destructive",
//         })
//       } else {
//         setError("An error occurred. Please try again.")
//         setToast({
//           title: "Error",
//           description: "An error occurred. Please try again.",
//           variant: "destructive",
//         })
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
//       <LoaderOverlay isLoading={isLoading} message="Completing registration..." />

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
//             <Image
//               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-amAg8THqjWHBmPKqbcD6xZh8k5ZJlf.png"
//               alt="SwiftWave.AI Logo"
//               fill
//               className="object-contain"
//             />
//           </div>
//         </div>

//         <Card className="border-2 border-border shadow-lg">
//           <CardHeader className="space-y-2 text-center">
//             <CardTitle className="text-3xl font-bold text-primary">Set Your Password</CardTitle>
//             <CardDescription className="text-base">Secure your account with a strong password</CardDescription>
//             <p className="text-sm text-muted-foreground mt-2">{email}</p>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     disabled={isLoading}
//                     className="pl-10 pr-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Confirm Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm your password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     disabled={isLoading}
//                     className="pl-10 pr-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               {error && (
//                 <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
//                   {error}
//                 </div>
//               )}

//               <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
//                 <p className="font-medium mb-2">Password requirements:</p>
//                 <ul className="space-y-1 text-xs">
//                   <li>✓ At least 8 characters</li>
//                   <li>✓ Mix of uppercase and lowercase</li>
//                   <li>✓ Include numbers and symbols</li>
//                 </ul>
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base relative"
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-lg" />
//                     <span className="opacity-70">Completing Registration...</span>
//                   </>
//                 ) : (
//                   "Complete Registration"
//                 )}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Lock, Eye, EyeOff, Moon, Sun } from "lucide-react"
// import Image from "next/image"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "./loader-overlay"
// import { ToastNotification } from "./toast-notification"

// interface PasswordSetupPageProps {
//   email: string
//   onComplete: () => void
//   toggleTheme: () => void
//   isDark: boolean
//   token?: string
// }

// export default function PasswordSetupPage({ email, onComplete, toggleTheme, isDark, token }: PasswordSetupPageProps) {
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     if (!password || !confirmPassword) {
//       setError("Both password fields are required")
//       return
//     }

//     if (password.length < 8) {
//       setError("Password must be at least 8 characters")
//       return
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match")
//       return
//     }

//     setIsLoading(true)
//     try {
//       if (token) {
//         const response = await axios.put(`${BASE_URL}/auth/verify/${token}`, {
//           password: password,
//         })
//         console.log("[v0] Password verification successful:", response.data)
//       }
//       setIsLoading(false)

//       setToast({
//         title: "Success",
//         description: "Your password has been set successfully! Registration is complete.",
//         variant: "default",
//       })

//       setTimeout(() => {
//         onComplete()
//       }, 1500)
//     } catch (err) {
//       console.log("[v0] Password verification error:", err)
//       setIsLoading(false)

//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.message || "Password setup failed. Please try again."
//         setError(errorMessage)
//         setToast({
//           title: "Error",
//           description: errorMessage,
//           variant: "destructive",
//         })
//       } else {
//         setError("An error occurred. Please try again.")
//         setToast({
//           title: "Error",
//           description: "An error occurred. Please try again.",
//           variant: "destructive",
//         })
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
//       <LoaderOverlay isLoading={isLoading} message="Completing registration..." />

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
//             <Image
//               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-amAg8THqjWHBmPKqbcD6xZh8k5ZJlf.png"
//               alt="SwiftWave.AI Logo"
//               fill
//               className="object-contain"
//             />
//           </div>
//         </div>

//         <Card className="border-2 border-border shadow-lg">
//           <CardHeader className="space-y-2 text-center">
//             <CardTitle className="text-3xl font-bold text-primary">Set Your Password</CardTitle>
//             <CardDescription className="text-base">Secure your account with a strong password</CardDescription>
//             <p className="text-sm text-muted-foreground mt-2">{email}</p>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     disabled={isLoading}
//                     className="pl-10 pr-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Confirm Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm your password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     disabled={isLoading}
//                     className="pl-10 pr-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               {error && (
//                 <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
//                   {error}
//                 </div>
//               )}

//               <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
//                 <p className="font-medium mb-2">Password requirements:</p>
//                 <ul className="space-y-1 text-xs">
//                   <li>✓ At least 8 characters</li>
//                   <li>✓ Mix of uppercase and lowercase</li>
//                   <li>✓ Include numbers and symbols</li>
//                 </ul>
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base relative"
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-lg" />
//                     <span className="opacity-70">Completing Registration...</span>
//                   </>
//                 ) : (
//                   "Complete Registration"
//                 )}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Eye, EyeOff, Moon, Sun } from "lucide-react"
import Image from "next/image"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "./loader-overlay"
import { ToastNotification } from "./toast-notification"

interface PasswordSetupPageProps {
  email: string
  toggleTheme: () => void
  isDark: boolean
  token?: string
}

export default function PasswordSetupPage({ email, toggleTheme, isDark, token }: PasswordSetupPageProps) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [toast, setToast] = useState<{
    title: string
    description: string
    variant: "default" | "destructive"
  } | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // if (!password || !confirmPassword) {
    //   setError("Both password fields are required")
    //   return
    // }

    // if (password.length < 8) {
    //   setError("Password must be at least 8 characters")
    //   return
    // }

    // if (password !== confirmPassword) {
    //   setError("Passwords do not match")
    //   return
    // }

    setIsLoading(true)
    try {
      if (token) {
        const response = await axios.put(`${BASE_URL}/auth/verify/${token}`, {
          password: password,
        })
        console.log("[v0] Password verification successful:", response.data)
      }
      setIsLoading(false)

      setToast({
        title: "Success",
        description: "Your password has been set successfully! Redirecting to sign in...",
        variant: "default",
      })

      setTimeout(() => {
        router.push("/")
      }, 1500)
    } catch (err) {
      console.log("[v0] Password verification error:", err)
      setIsLoading(false)

      if (axios.isAxiosError(err)) {
        if (err.response?.data && typeof err.response.data === "object") {
          const errorData = err.response.data as Record<string, string>
          // Handle detail error message (e.g., "User is already active or token is not valid")
          if (errorData.detail) {
            setError(errorData.detail)
          } else {
            const errorMessage = err.response?.data?.message || "Password setup failed. Please try again."
            setError(errorMessage)
          }
        } else {
          const errorMessage = err.response?.data?.message || "Password setup failed. Please try again."
          setError(errorMessage)
        }
        setToast({
          title: "Error",
          description: error || "Password setup failed",
          variant: "destructive",
        })
      } else {
        setError("An error occurred. Please try again.")
        setToast({
          title: "Error",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <LoaderOverlay isLoading={isLoading} message="Completing registration..." />

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
            <CardTitle className="text-3xl font-bold text-primary">Set Your Password</CardTitle>
            <CardDescription className="text-base">Secure your account with a strong password</CardDescription>
            <p className="text-sm text-muted-foreground mt-2">{email}</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="pl-10 pr-10 h-11 border-2 border-border focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    className="pl-10 pr-10 h-11 border-2 border-border focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                  {error}
                </div>
              )}

              <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
                <p className="font-medium mb-2">Password requirements:</p>
                <ul className="space-y-1 text-xs">
                  <li>✓ At least 8 characters</li>
                  <li>✓ Mix of uppercase and lowercase</li>
                  <li>✓ Include numbers and symbols</li>
                </ul>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-primary/50 hover:bg-primary/70 text-primary-foreground font-semibold text-base relative"
              >
                {isLoading ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-lg" />
                    <span className="opacity-70">Completing Registration...</span>
                  </>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}