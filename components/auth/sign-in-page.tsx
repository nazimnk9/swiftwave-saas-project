// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Mail, Lock, Eye, EyeOff, Moon, Sun } from "lucide-react"
// import Image from "next/image"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "./loader-overlay"
// import { ToastNotification } from "./toast-notification"

// interface SignInPageProps {
//   onSignIn: () => void
//   onSignUpClick: () => void
//   toggleTheme: () => void
//   isDark: boolean
// }

// export default function SignInPage({ onSignIn, onSignUpClick, toggleTheme, isDark }: SignInPageProps) {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
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

//     if (!email || !password) {
//       setError("Email and password are required")
//       return
//     }

//     setIsLoading(true)
//     try {
//       const response = await axios.post(`${BASE_URL}/token`, {
//         email: email,
//         password: password,
//       })

//       console.log("[v0] Sign in successful:", response.data)
//       setIsLoading(false)

//       setToast({
//         title: "Success",
//         description: "You have been signed in successfully!",
//         variant: "default",
//       })

//       setTimeout(() => {
//         onSignIn()
//       }, 1500)
//     } catch (err) {
//       console.log("[v0] Sign in error:", err)
//       setIsLoading(false)

//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.message || "Sign in failed. Please try again."
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
//      //onSignIn()
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
//       <LoaderOverlay isLoading={isLoading} message="Signing in..." />

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
//             <CardTitle className="text-3xl font-bold text-primary">Welcome Back</CardTitle>
//             <CardDescription className="text-base">Sign in to your SwiftWave.AI account</CardDescription>
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
//                     onChange={(e) => setEmail(e.target.value)}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-medium text-foreground">Password</label>
//                   <button type="button" className="text-sm text-primary hover:text-primary/80 font-medium">
//                     Forgot?
//                   </button>
//                 </div>
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

//               {error && (
//                 <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
//                   {error}
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
//                     <span className="opacity-70">Signing In...</span>
//                   </>
//                 ) : (
//                   "Sign In"
//                 )}
//               </Button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-border" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-card text-muted-foreground">Don't have an account?</span>
//                 </div>
//               </div>

//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onSignUpClick}
//                 disabled={isLoading}
//                 className="w-full h-11 border-2 border-border hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground font-semibold bg-transparent transition-colors"
//               >
//                 Create Account
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <p className="text-center text-sm text-muted-foreground mt-6">Protected by enterprise-grade security</p>
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
// import { Mail, Lock, Eye, EyeOff, Moon, Sun } from "lucide-react"
// import Image from "next/image"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "./loader-overlay"
// import { ToastNotification } from "./toast-notification"

// interface SignInPageProps {
//   onSignIn: () => void
//   onSignUpClick: () => void
//   toggleTheme: () => void
//   isDark: boolean
// }

// export default function SignInPage({ onSignIn, onSignUpClick, toggleTheme, isDark }: SignInPageProps) {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
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

//     if (!email || !password) {
//       setError("Email and password are required")
//       return
//     }

//     setIsLoading(true)
//     try {
//       const response = await axios.post(`${BASE_URL}/token`, {
//         email: email,
//         password: password,
//       })

//       console.log("[v0] Sign in successful:", response.data)

//       const accessToken = response.data.access
//       localStorage.setItem("authToken", accessToken)
//       localStorage.setItem("userEmail", email)
//       localStorage.setItem("userPassword", password)

//       setIsLoading(false)

//       setToast({
//         title: "Success",
//         description: "You have been signed in successfully!",
//         variant: "default",
//       })

//       setTimeout(() => {
//         onSignIn()
//       }, 1500)
//     } catch (err) {
//       console.log("[v0] Sign in error:", err)
//       setIsLoading(false)

//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.message || "Sign in failed. Please try again."
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
//       <LoaderOverlay isLoading={isLoading} message="Signing in..." />

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
//             <CardTitle className="text-3xl font-bold text-primary">Welcome Back</CardTitle>
//             <CardDescription className="text-base">Sign in to your SwiftWave.AI account</CardDescription>
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
//                     onChange={(e) => setEmail(e.target.value)}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-medium text-foreground">Password</label>
//                   <button type="button" className="text-sm text-primary hover:text-primary/80 font-medium">
//                     Forgot?
//                   </button>
//                 </div>
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

//               {error && (
//                 <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
//                   {error}
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
//                     <span className="opacity-70">Signing In...</span>
//                   </>
//                 ) : (
//                   "Sign In"
//                 )}
//               </Button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-border" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-card text-muted-foreground">Don't have an account?</span>
//                 </div>
//               </div>

//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onSignUpClick}
//                 disabled={isLoading}
//                 className="w-full h-11 border-2 border-border hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground font-semibold bg-transparent transition-colors"
//               >
//                 Create Account
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <p className="text-center text-sm text-muted-foreground mt-6">Protected by enterprise-grade security</p>
//       </div>
//     </div>
//   )
// }


// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Mail, Lock, Eye, EyeOff, Moon, Sun } from "lucide-react"
// import Image from "next/image"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "./loader-overlay"
// import { ToastNotification } from "./toast-notification"

// interface SignInPageProps {
//    //onSignIn: () => void
//   onSignUpClick: () => void
//   toggleTheme: () => void
//   isDark: boolean
// }

// export default function SignInPage({onSignUpClick, toggleTheme, isDark }: SignInPageProps) {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
//   const [generalError, setGeneralError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setGeneralError("")
//     setFieldErrors({})

//     // if (!email || !password) {
//     //   setGeneralError("Email and password are required")
//     //   return
//     // }

//     setIsLoading(true)
//     try {
//       const response = await axios.post(`${BASE_URL}/token`, {
//         email: email,
//         password: password,
//       })

//       console.log("[v0] Sign in successful:", response.data)

//       const accessToken = response.data.access
//       localStorage.setItem("authToken", accessToken)
//       localStorage.setItem("userEmail", email)
//       localStorage.setItem("userPassword", password)

//       setIsLoading(false)

//       setToast({
//         title: "Success",
//         description: "You have been signed in successfully!",
//         variant: "default",
//       })

//       setTimeout(() => {
//         router.push("/dashboard")
//       }, 1500)
//     } catch (err) {
//       console.log("[v0] Sign in error:", err)
//       setIsLoading(false)

//       if (axios.isAxiosError(err)) {
//         if (err.response?.data && typeof err.response.data === "object") {
//           const errorData = err.response.data as Record<string, string[] | string>
//           // Check if response contains field-level errors
//           if (errorData.email || errorData.password) {
//             setFieldErrors({
//               email: Array.isArray(errorData.email) ? errorData.email : [],
//               password: Array.isArray(errorData.password) ? errorData.password : [],
//             })
//             setGeneralError("Please check the form for errors")
//           } else if (errorData.detail) {
//             // Handle detail error message (e.g., "No active account found with the given credentials")
//             setGeneralError(
//               typeof errorData.detail === "string" ? errorData.detail : "Sign in failed. Please try again.",
//             )
//           } else {
//             const errorMessage = err.response?.data?.message || "Sign in failed. Please try again."
//             setGeneralError(errorMessage)
//           }
//         } else {
//           const errorMessage = err.response?.data?.message || "Sign in failed. Please try again."
//           setGeneralError(errorMessage)
//         }
//         setToast({
//           title: "Error",
//           description: generalError,
//           variant: "destructive",
//         })
//       } else {
//         setGeneralError("An error occurred. Please try again.")
//         setToast({
//           title: "Error",
//           description: generalError,
//           variant: "destructive",
//         })
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
//       <LoaderOverlay isLoading={isLoading} message="Signing in..." />

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
//             <CardTitle className="text-3xl font-bold text-primary">Welcome Back</CardTitle>
//             <CardDescription className="text-base">Sign in to your SwiftWave.AI account</CardDescription>
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
//                       if (fieldErrors.email) {
//                         setFieldErrors((prev) => {
//                           const updated = { ...prev }
//                           delete updated.email
//                           return updated
//                         })
//                       }
//                     }}
                    
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 {fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email.join(", ")}</p>}
//               </div>

//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-medium text-foreground">Password</label>
//                   <button type="button" className="text-sm text-primary hover:text-primary/80 font-medium">
//                     Forgot?
//                   </button>
//                 </div>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => {
//                       setPassword(e.target.value)
//                       if (fieldErrors.password) {
//                         setFieldErrors((prev) => {
//                           const updated = { ...prev }
//                           delete updated.password
//                           return updated
//                         })
//                       }
//                     }}
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
//                 {fieldErrors.password && <p className="text-xs text-destructive">{fieldErrors.password.join(", ")}</p>}
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
//                     <span className="opacity-70">Signing In...</span>
//                   </>
//                 ) : (
//                   "Sign In"
//                 )}
//               </Button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-border" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-card text-muted-foreground">Don't have an account?</span>
//                 </div>
//               </div>

//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onSignUpClick}
//                 disabled={isLoading}
//                 className="w-full h-11 border-2 border-border hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground font-semibold bg-transparent transition-colors"
//               >
//                 Create Account
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <p className="text-center text-sm text-muted-foreground mt-6">Protected by enterprise-grade security</p>
//       </div>
//     </div>
//   )
// }


// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Mail, Lock, Eye, EyeOff, Moon, Sun } from "lucide-react"
// import Image from "next/image"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "./loader-overlay"
// import { ToastNotification } from "./toast-notification"

// interface SignInPageProps {
//   onSignUpClick: () => void
//   toggleTheme: () => void
//   isDark: boolean
// }

// export default function SignInPage({ onSignUpClick, toggleTheme, isDark }: SignInPageProps) {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)
//   const router = useRouter()

//   const showToast = (title: string, description: string, variant: "default" | "destructive" = "default") => {
//     setToast({
//       title,
//       description,
//       variant,
//     })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setFieldErrors({})

//     setIsLoading(true)
//     try {
//       const response = await axios.post(`${BASE_URL}/token`, {
//         email: email,
//         password: password,
//       })

//       console.log("[v0] Sign in successful:", response.data)

//       const accessToken = response.data.access
//       localStorage.setItem("authToken", accessToken)
//       localStorage.setItem("userEmail", email)
//       localStorage.setItem("userPassword", password)

//       setIsLoading(false)

//       showToast("Success", "You have been signed in successfully!", "default")

//       setTimeout(() => {
//         router.push("/dashboard")
//       }, 1500)
//     } catch (err) {
//       console.log("[v0] Sign in error:", err)
//       setIsLoading(false)

//       if (axios.isAxiosError(err)) {
//         if (err.response?.data && typeof err.response.data === "object") {
//           const errorData = err.response.data as Record<string, string[] | string>
          
//           // Check if response contains field-level errors
//           if (errorData.email || errorData.password) {
//             setFieldErrors({
//               email: Array.isArray(errorData.email) ? errorData.email : [],
//               password: Array.isArray(errorData.password) ? errorData.password : [],
//             })
            
//             // Show field errors in toast with line breaks
//             const errorMessages = []
//             if (errorData.email) errorMessages.push(`Email: ${Array.isArray(errorData.email) ? errorData.email.join(", ") : errorData.email}`)
//             if (errorData.password) errorMessages.push(`Password: ${Array.isArray(errorData.password) ? errorData.password.join(", ") : errorData.password}`)
            
//             showToast("Validation Error", errorMessages.join("\n"), "destructive")
//           } else if (errorData.detail) {
//             // Handle detail error message
//             const errorMessage = typeof errorData.detail === "string" ? errorData.detail : "Sign in failed. Please try again."
//             showToast("Error", errorMessage, "destructive")
//           } else {
//             // Handle other error formats
//             const errorMessage = err.response?.data?.message || "Sign in failed. Please try again."
//             showToast("Error", errorMessage, "destructive")
//           }
//         } else {
//           // Handle non-object response data
//           const errorMessage = err.response?.data?.message || "Sign in failed. Please try again."
//           showToast("Error", errorMessage, "destructive")
//         }
//       } else {
//         // Handle non-Axios errors
//         showToast("Error", "An unexpected error occurred. Please try again.", "destructive")
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
//       <LoaderOverlay isLoading={isLoading} message="Signing in..." />

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
//             <CardTitle className="text-3xl font-bold text-primary">Welcome Back</CardTitle>
//             <CardDescription className="text-base">Sign in to your SwiftWave.AI account</CardDescription>
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
//                       if (fieldErrors.email) {
//                         setFieldErrors((prev) => {
//                           const updated = { ...prev }
//                           delete updated.email
//                           return updated
//                         })
//                       }
//                     }}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 {fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email.join(", ")}</p>}
//               </div>

//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-medium text-foreground">Password</label>
//                   <button type="button" className="text-sm text-primary hover:text-primary/80 font-medium">
//                     Forgot?
//                   </button>
//                 </div>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => {
//                       setPassword(e.target.value)
//                       if (fieldErrors.password) {
//                         setFieldErrors((prev) => {
//                           const updated = { ...prev }
//                           delete updated.password
//                           return updated
//                         })
//                       }
//                     }}
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
//                 {fieldErrors.password && <p className="text-xs text-destructive">{fieldErrors.password.join(", ")}</p>}
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base relative"
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-lg" />
//                     <span className="opacity-70">Signing In...</span>
//                   </>
//                 ) : (
//                   "Sign In"
//                 )}
//               </Button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-border" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-card text-muted-foreground">Don't have an account?</span>
//                 </div>
//               </div>

//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onSignUpClick}
//                 disabled={isLoading}
//                 className="w-full h-11 border-2 border-border hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground font-semibold bg-transparent transition-colors"
//               >
//                 Create Account
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <p className="text-center text-sm text-muted-foreground mt-6">Protected by enterprise-grade security</p>
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
import { Mail, Lock, Eye, EyeOff, Moon, Sun } from "lucide-react"
import Image from "next/image"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "./loader-overlay"
import { ToastNotification } from "./toast-notification"
import { setCookie } from 'cookies-next'; // or use document.cookie

interface SignInPageProps {
  onSignUpClick: () => void
  onForgotClick: () => void
  toggleTheme: () => void
  isDark: boolean
}

export default function SignInPage({ onSignUpClick,onForgotClick, toggleTheme, isDark }: SignInPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [generalError, setGeneralError] = useState("")
  const [toast, setToast] = useState<{
    title: string
    description: string | React.ReactNode
    variant: "default" | "destructive"
  } | null>(null)
  const router = useRouter()

  const showToast = (title: string, description: string | React.ReactNode, variant: "default" | "destructive" = "default") => {
    setToast({
      title,
      description,
      variant,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFieldErrors({})
    setGeneralError("")

    setIsLoading(true)
    try {
      const response = await axios.post(`${BASE_URL}/token`, {
        email: email,
        password: password,
      })

      console.log("[v0] Sign in successful:", response.data)

      const accessToken = response.data.access
      // Set cookie instead of localStorage
    document.cookie = `authToken=${accessToken}; path=/; max-age=86400; SameSite=Lax`
    document.cookie = `userEmail=${encodeURIComponent(email)}; path=/; max-age=86400; SameSite=Lax`
      localStorage.setItem("authToken", accessToken)
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userPassword", password)

      setIsLoading(false)

      showToast("Success", "You have been signed in successfully!", "default")

      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (err) {
      console.log("[v0] Sign in error:", err)
      setIsLoading(false)

      if (axios.isAxiosError(err)) {
        if (err.response?.data && typeof err.response.data === "object") {
          const errorData = err.response.data as Record<string, string[] | string>
          
          // Check if response contains field-level errors
          if (errorData.email || errorData.password) {
            setFieldErrors({
              email: Array.isArray(errorData.email) ? errorData.email : [],
              password: Array.isArray(errorData.password) ? errorData.password : [],
            })
            
            // Set general error for inline display
            const errorMessages = []
            if (errorData.email) errorMessages.push(`Email: ${Array.isArray(errorData.email) ? errorData.email.join(", ") : errorData.email}`)
            if (errorData.password) errorMessages.push(`Password: ${Array.isArray(errorData.password) ? errorData.password.join(", ") : errorData.password}`)
            setGeneralError(errorMessages.join('\n'))
            
            // Create JSX element for multi-line toast message
            const ErrorMessages = () => (
              <div>
                {errorData.email && (
                  <div>Email: {Array.isArray(errorData.email) ? errorData.email.join(", ") : errorData.email}</div>
                )}
                {errorData.password && (
                  <div>Password: {Array.isArray(errorData.password) ? errorData.password.join(", ") : errorData.password}</div>
                )}
              </div>
            )
            
            showToast("Validation Error", <ErrorMessages />, "destructive")
          } else if (errorData.detail) {
            // Handle detail error message
            const errorMessage = typeof errorData.detail === "string" ? errorData.detail : "Sign in failed. Please try again."
            setGeneralError(errorMessage)
            showToast("Error", errorMessage, "destructive")
          } else {
            // Handle other error formats
            const errorMessage = err.response?.data?.message || "Sign in failed. Please try again."
            setGeneralError(errorMessage)
            showToast("Error", errorMessage, "destructive")
          }
        } else {
          // Handle non-object response data
          const errorMessage = err.response?.data?.message || "Sign in failed. Please try again."
          setGeneralError(errorMessage)
          showToast("Error", errorMessage, "destructive")
        }
      } else {
        // Handle non-Axios errors
        const errorMessage = "An unexpected error occurred. Please try again."
        setGeneralError(errorMessage)
        showToast("Error", errorMessage, "destructive")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <LoaderOverlay isLoading={isLoading} message="Signing in..." />

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
            <Image
              src="/logo.png"
              alt="SwiftWave.AI Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <Card className="border-2 border-border shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold text-primary">Welcome Back</CardTitle>
            <CardDescription className="text-base">Sign in to your SwiftWave.AI account</CardDescription>
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
                      if (fieldErrors.email) {
                        setFieldErrors((prev) => {
                          const updated = { ...prev }
                          delete updated.email
                          return updated
                        })
                      }
                      if (generalError) {
                        setGeneralError("")
                      }
                    }}
                    disabled={isLoading}
                    className="pl-10 h-11 border-2 border-border focus:border-primary"
                  />
                </div>
                {fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email.join(", ")}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <button
                    type="button"
                    onClick={onForgotClick}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (fieldErrors.password) {
                        setFieldErrors((prev) => {
                          const updated = { ...prev }
                          delete updated.password
                          return updated
                        })
                      }
                      if (generalError) {
                        setGeneralError("")
                      }
                    }}
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
                {fieldErrors.password && <p className="text-xs text-destructive">{fieldErrors.password.join(", ")}</p>}
              </div>

              {generalError && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm whitespace-pre-line">
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
                    <span className="opacity-70">Signing In...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">Don't have an account?</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={onSignUpClick}
                disabled={isLoading}
                className="w-full h-11 border-2 border-border hover:bg-muted bg-gradient-to-r from-primary/20 to-primary/20 dark:hover:text-white/50 text-foreground font-semibold bg-transparent transition-colors"
              >
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">Protected by enterprise-grade security</p>
      </div>
    </div>
  )
}