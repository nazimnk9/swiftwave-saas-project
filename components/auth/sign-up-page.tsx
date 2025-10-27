// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Mail, Moon, Sun, User, Phone, Building, MapPin } from "lucide-react"
// import Image from "next/image"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseURL"

// interface SignUpPageProps {
//   onSignUp: (userData: UserData) => void
//   onSignInClick: () => void
//   toggleTheme: () => void
//   isDark: boolean
// }

// export interface UserData {
//   firstName: string
//   lastName: string
//   email: string
//   phone: string
//   company: string
//   position: string
//   country: string
// }

// export default function SignUpPage({ onSignUp, onSignInClick, toggleTheme, isDark }: SignUpPageProps) {
//   const [formData, setFormData] = useState<UserData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     company: "",
//     position: "",
//     country: "",
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     // Validation
//     if (!formData.firstName.trim()) {
//       setError("First name is required")
//       return
//     }
//     if (!formData.lastName.trim()) {
//       setError("Last name is required")
//       return
//     }
//     if (!formData.email) {
//       setError("Email is required")
//       return
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setError("Please enter a valid email")
//       return
//     }
//     if (!formData.phone.trim()) {
//       setError("Phone number is required")
//       return
//     }
//     if (!formData.company.trim()) {
//       setError("Company name is required")
//       return
//     }
//     // if (!formData.position.trim()) {
//     //   setError("Position is required")
//     //   return
//     // }
//     // if (!formData.country.trim()) {
//     //   setError("Country is required")
//     //   return
//     // }

//     setIsLoading(true)
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/register`, {
//         email: formData.email,
//         phone: formData.phone,
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         org_name: formData.company,
//       })

//       console.log("[v0] Registration successful:", response.data)
//       setIsLoading(false)
//       onSignUp(formData)
//     } catch (err) {
//       console.log("[v0] Registration error:", err)
//       setIsLoading(false)
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data?.message || "Registration failed. Please try again.")
//       } else {
//         setError("An error occurred. Please try again.")
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
//       {/* Theme Toggle */}
//       <button
//         onClick={toggleTheme}
//         className="absolute top-4 right-4 p-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors"
//       >
//         {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//       </button>

//       <div className="w-full max-w-2xl">
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
//             <CardTitle className="text-3xl font-bold text-primary">Create Account</CardTitle>
//             <CardDescription className="text-base">Join SwiftWave.AI and start your journey</CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">First Name</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="firstName"
//                       placeholder="John"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Last Name</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="lastName"
//                       placeholder="Doe"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Email Field */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="email"
//                     name="email"
//                     placeholder="you@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div>

//               {/* Phone Field */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Phone Number</label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="tel"
//                     name="phone"
//                     placeholder="+1 (555) 000-0000"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div>

//               {/* Company and Position */}
//               <div className="space-y-2">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Company Name</label>
//                   <div className="relative">
//                     <Building className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="company"
//                       placeholder="Your Company"
//                       value={formData.company}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//                 {/* <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Position</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="position"
//                       placeholder="HR Manager"
//                       value={formData.position}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div> */}
//               </div>

//               {/* Country Field */}
//               {/* <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Country</label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="text"
//                     name="country"
//                     placeholder="United States"
//                     value={formData.country}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div> */}

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
//                     <span className="opacity-70">Creating Account...</span>
//                   </>
//                 ) : (
//                   "Sign up"
//                 )}
//               </Button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-border" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-card text-muted-foreground">Already have an account?</span>
//                 </div>
//               </div>

//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onSignInClick}
//                 disabled={isLoading}
//                 className="w-full h-11 border-2 border-border hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground font-semibold bg-transparent transition-colors"
//               >
//                 Sign In
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <p className="text-center text-sm text-muted-foreground mt-6">
//           By signing up, you agree to our Terms of Service and Privacy Policy
//         </p>
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
// import { Mail, Moon, Sun, User, Phone, Building, MapPin } from "lucide-react"
// import Image from "next/image"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseURL"
// import { useToast } from "@/components/ui/use-toast"
// import { LoaderOverlay } from "./loader-overlay"

// interface SignUpPageProps {
//   onSignUp: (userData: UserData) => void
//   onSignInClick: () => void
//   toggleTheme: () => void
//   isDark: boolean
// }

// export interface UserData {
//   firstName: string
//   lastName: string
//   email: string
//   phone: string
//   company: string
//   position: string
//   country: string
// }

// export default function SignUpPage({ onSignUp, onSignInClick, toggleTheme, isDark }: SignUpPageProps) {
//   const [formData, setFormData] = useState<UserData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     company: "",
//     position: "",
//     country: "",
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const { toast } = useToast()

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     // Validation
//     if (!formData.firstName.trim()) {
//       setError("First name is required")
//       return
//     }
//     if (!formData.lastName.trim()) {
//       setError("Last name is required")
//       return
//     }
//     if (!formData.email) {
//       setError("Email is required")
//       return
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setError("Please enter a valid email")
//       return
//     }
//     if (!formData.phone.trim()) {
//       setError("Phone number is required")
//       return
//     }
//     if (!formData.company.trim()) {
//       setError("Company name is required")
//       return
//     }
//     // if (!formData.position.trim()) {
//     //   setError("Position is required")
//     //   return
//     // }
//     // if (!formData.country.trim()) {
//     //   setError("Country is required")
//     //   return
//     // }

//     setIsLoading(true)
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/register`, {
//         email: formData.email,
//         phone: formData.phone,
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         org_name: formData.company,
//       })

//       console.log("[v0] Registration successful:", response.data)
//       setIsLoading(false)

//       toast({
//         title: "Success",
//         description: "Account created successfully! Check your email for verification link.",
//       })

//       onSignUp(formData)
//     } catch (err) {
//       console.log("[v0] Registration error:", err)
//       setIsLoading(false)

//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.message || "Registration failed. Please try again."
//         setError(errorMessage)
//         toast({
//           title: "Error",
//           description: errorMessage,
//           variant: "destructive",
//         })
//       } else {
//         setError("An error occurred. Please try again.")
//         toast({
//           title: "Error",
//           description: "An error occurred. Please try again.",
//           variant: "destructive",
//         })
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
//       <LoaderOverlay isLoading={isLoading} message="Creating your account..." />

//       {/* Theme Toggle */}
//       <button
//         onClick={toggleTheme}
//         className="absolute top-4 right-4 p-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors"
//       >
//         {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//       </button>

//       <div className="w-full max-w-2xl">
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
//             <CardTitle className="text-3xl font-bold text-primary">Create Account</CardTitle>
//             <CardDescription className="text-base">Join SwiftWave.AI and start your journey</CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">First Name</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="firstName"
//                       placeholder="John"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Last Name</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="lastName"
//                       placeholder="Doe"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Email Field */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="email"
//                     name="email"
//                     placeholder="you@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div>

//               {/* Phone Field */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Phone Number</label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="tel"
//                     name="phone"
//                     placeholder="+1 (555) 000-0000"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div>

//               {/* Company and Position */}
//               <div className="space-y-2">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Company Name</label>
//                   <div className="relative">
//                     <Building className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="company"
//                       placeholder="Your Company"
//                       value={formData.company}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//                 {/* <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Position</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="position"
//                       placeholder="HR Manager"
//                       value={formData.position}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div> */}
//               </div>

//               {/* Country Field */}
//               {/* <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Country</label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="text"
//                     name="country"
//                     placeholder="United States"
//                     value={formData.country}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div> */}

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
//                     <span className="opacity-70">Creating Account...</span>
//                   </>
//                 ) : (
//                   "Sign up"
//                 )}
//               </Button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-border" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-card text-muted-foreground">Already have an account?</span>
//                 </div>
//               </div>

//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onSignInClick}
//                 disabled={isLoading}
//                 className="w-full h-11 border-2 border-border hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground font-semibold bg-transparent transition-colors"
//               >
//                 Sign In
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <p className="text-center text-sm text-muted-foreground mt-6">
//           By signing up, you agree to our Terms of Service and Privacy Policy
//         </p>
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
// import { Mail, Moon, Sun, User, Phone, Building, MapPin } from "lucide-react"
// import Image from "next/image"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "./loader-overlay"
// import { ToastNotification } from "./toast-notification"

// interface SignUpPageProps {
//   onSignUp: (userData: UserData) => void
//   onSignInClick: () => void
//   toggleTheme: () => void
//   isDark: boolean
// }

// export interface UserData {
//   firstName: string
//   lastName: string
//   email: string
//   phone: string
//   company: string
//   position: string
//   country: string
// }

// export default function SignUpPage({ onSignUp, onSignInClick, toggleTheme, isDark }: SignUpPageProps) {
//   const [formData, setFormData] = useState<UserData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     company: "",
//     position: "",
//     country: "",
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     // Validation
//     if (!formData.firstName.trim()) {
//       setError("First name is required")
//       return
//     }
//     if (!formData.lastName.trim()) {
//       setError("Last name is required")
//       return
//     }
//     if (!formData.email) {
//       setError("Email is required")
//       return
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setError("Please enter a valid email")
//       return
//     }
//     if (!formData.phone.trim()) {
//       setError("Phone number is required")
//       return
//     }
//     if (!formData.company.trim()) {
//       setError("Company name is required")
//       return
//     }
//     // if (!formData.position.trim()) {
//     //   setError("Position is required")
//     //   return
//     // }
//     // if (!formData.country.trim()) {
//     //   setError("Country is required")
//     //   return
//     // }

//     setIsLoading(true)
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/register`, {
//         email: formData.email,
//         phone: formData.phone,
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         org_name: formData.company,
//       })

//       console.log("[v0] Registration successful:", response.data)
//       setIsLoading(false)

//       setToast({
//         title: "Success",
//         description: "Account created successfully! Check your email for verification link.",
//         variant: "default",
//       })

//       setTimeout(() => {
//         onSignUp(formData)
//       }, 1500)
//     } catch (err) {
//       console.log("[v0] Registration error:", err)
//       setIsLoading(false)

//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.message || "Registration failed. Please try again."
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
//       <LoaderOverlay isLoading={isLoading} message="Creating your account..." />

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

//       <div className="w-full max-w-2xl">
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
//             <CardTitle className="text-3xl font-bold text-primary">Create Account</CardTitle>
//             <CardDescription className="text-base">Join SwiftWave.AI and start your journey</CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">First Name</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="firstName"
//                       placeholder="John"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Last Name</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="lastName"
//                       placeholder="Doe"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Email Field */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="email"
//                     name="email"
//                     placeholder="you@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div>

//               {/* Phone Field */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Phone Number</label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="tel"
//                     name="phone"
//                     placeholder="+1 (555) 000-0000"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div>

//               {/* Company and Position */}
//               <div className="space-y-2">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Company Name</label>
//                   <div className="relative">
//                     <Building className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="company"
//                       placeholder="Your Company"
//                       value={formData.company}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//                 {/* <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Position</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="position"
//                       placeholder="HR Manager"
//                       value={formData.position}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div> */}
//               </div>

//               {/* Country Field */}
//               {/* <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Country</label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="text"
//                     name="country"
//                     placeholder="United States"
//                     value={formData.country}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div> */}

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
//                     <span className="opacity-70">Creating Account...</span>
//                   </>
//                 ) : (
//                   "Sign up"
//                 )}
//               </Button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-border" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-card text-muted-foreground">Already have an account?</span>
//                 </div>
//               </div>

//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onSignInClick}
//                 disabled={isLoading}
//                 className="w-full h-11 border-2 border-border hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground font-semibold bg-transparent transition-colors"
//               >
//                 Sign In
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <p className="text-center text-sm text-muted-foreground mt-6">
//           By signing up, you agree to our Terms of Service and Privacy Policy
//         </p>
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
// import { Mail, Moon, Sun, User, Phone, Building } from "lucide-react"
// import Image from "next/image"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "./loader-overlay"
// import { ToastNotification } from "./toast-notification"

// interface SignUpPageProps {
//   onSignUp: (userData: UserData) => void
//   onSignInClick: () => void
//   toggleTheme: () => void
//   isDark: boolean
// }

// export interface UserData {
//   firstName: string
//   lastName: string
//   email: string
//   phone: string
//   company: string
// }

// export default function SignUpPage({ onSignUp, onSignInClick, toggleTheme, isDark }: SignUpPageProps) {
//   const [formData, setFormData] = useState<UserData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     company: "",
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     // Validation
//     if (!formData.firstName.trim()) {
//       setError("First name is required")
//       return
//     }
//     if (!formData.lastName.trim()) {
//       setError("Last name is required")
//       return
//     }
//     if (!formData.email) {
//       setError("Email is required")
//       return
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setError("Please enter a valid email")
//       return
//     }
//     if (!formData.phone.trim()) {
//       setError("Phone number is required")
//       return
//     }
//     if (!formData.company.trim()) {
//       setError("Company name is required")
//       return
//     }

//     setIsLoading(true)
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/register`, {
//         email: formData.email,
//         phone: formData.phone,
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         org_name: formData.company,
//       })

//       console.log("[v0] Registration successful:", response.data)
//       setIsLoading(false)

//       setToast({
//         title: "Success",
//         description: "Account created successfully! Check your email for verification link.",
//         variant: "default",
//       })

//       setTimeout(() => {
//         onSignInClick()
//       }, 1500)
//     } catch (err) {
//       console.log("[v0] Registration error:", err)
//       setIsLoading(false)

//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.message || "Registration failed. Please try again."
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
//       <LoaderOverlay isLoading={isLoading} message="Creating your account..." />

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

//       <div className="w-full max-w-2xl">
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
//             <CardTitle className="text-3xl font-bold text-primary">Create Account</CardTitle>
//             <CardDescription className="text-base">Join SwiftWave.AI and start your journey</CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">First Name</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="firstName"
//                       placeholder="John"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Last Name</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="lastName"
//                       placeholder="Doe"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Email Field */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="email"
//                     name="email"
//                     placeholder="you@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div>

//               {/* Phone Field */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Phone Number</label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="tel"
//                     name="phone"
//                     placeholder="+1 (555) 000-0000"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Company Name</label>
//                 <div className="relative">
//                   <Building className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="text"
//                     name="company"
//                     placeholder="Your Company"
//                     value={formData.company}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
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
//                     <span className="opacity-70">Creating Account...</span>
//                   </>
//                 ) : (
//                   "Sign up"
//                 )}
//               </Button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-border" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-card text-muted-foreground">Already have an account?</span>
//                 </div>
//               </div>

//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onSignInClick}
//                 disabled={isLoading}
//                 className="w-full h-11 border-2 border-border hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground font-semibold bg-transparent transition-colors"
//               >
//                 Sign In
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <p className="text-center text-sm text-muted-foreground mt-6">
//           By signing up, you agree to our Terms of Service and Privacy Policy
//         </p>
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
// import { Mail, Moon, Sun, User, Phone, Building } from "lucide-react"
// import Image from "next/image"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "./loader-overlay"
// import { ToastNotification } from "./toast-notification"

// interface SignUpPageProps {
//   onSignUp: (userData: UserData) => void
//   onSignInClick: () => void
//   toggleTheme: () => void
//   isDark: boolean
// }

// export interface UserData {
//   firstName: string
//   lastName: string
//   email: string
//   phone: string
//   company: string
// }

// export default function SignUpPage({ onSignUp, onSignInClick, toggleTheme, isDark }: SignUpPageProps) {
//   const [formData, setFormData] = useState<UserData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     company: "",
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     // Validation
//     if (!formData.firstName.trim()) {
//       setError("First name is required")
//       return
//     }
//     if (!formData.lastName.trim()) {
//       setError("Last name is required")
//       return
//     }
//     if (!formData.email) {
//       setError("Email is required")
//       return
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setError("Please enter a valid email")
//       return
//     }
//     if (!formData.phone.trim()) {
//       setError("Phone number is required")
//       return
//     }
//     if (!formData.company.trim()) {
//       setError("Company name is required")
//       return
//     }

//     setIsLoading(true)
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/register`, {
//         email: formData.email,
//         phone: formData.phone,
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         org_name: formData.company,
//       })

//       console.log("[v0] Registration successful:", response.data)
//       setIsLoading(false)

//       localStorage.setItem("userFirstName", formData.firstName)
//       localStorage.setItem("userLastName", formData.lastName)
//       localStorage.setItem("userEmail", formData.email)
//       localStorage.setItem("userPhone", formData.phone)
//       localStorage.setItem("userCompany", formData.company)

//       setToast({
//         title: "Success",
//         description: "Account created successfully! Check your email for verification link.",
//         variant: "default",
//       })

//       setTimeout(() => {
//         onSignInClick()
//       }, 1500)
//     } catch (err) {
//       console.log("[v0] Registration error:", err)
//       setIsLoading(false)

//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.message || "Registration failed. Please try again."
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
//       <LoaderOverlay isLoading={isLoading} message="Creating your account..." />

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

//       <div className="w-full max-w-2xl">
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
//             <CardTitle className="text-3xl font-bold text-primary">Create Account</CardTitle>
//             <CardDescription className="text-base">Join SwiftWave.AI and start your journey</CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">First Name</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="firstName"
//                       placeholder="John"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Last Name</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="lastName"
//                       placeholder="Doe"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className="pl-10 h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Email Field */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="email"
//                     name="email"
//                     placeholder="you@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div>

//               {/* Phone Field */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Phone Number</label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="tel"
//                     name="phone"
//                     placeholder="+1 (555) 000-0000"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Company Name</label>
//                 <div className="relative">
//                   <Building className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="text"
//                     name="company"
//                     placeholder="Your Company"
//                     value={formData.company}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className="pl-10 h-11 border-2 border-border focus:border-primary"
//                   />
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
//                     <span className="opacity-70">Creating Account...</span>
//                   </>
//                 ) : (
//                   "Sign up"
//                 )}
//               </Button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-border" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-card text-muted-foreground">Already have an account?</span>
//                 </div>
//               </div>

//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onSignInClick}
//                 disabled={isLoading}
//                 className="w-full h-11 border-2 border-border hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground font-semibold bg-transparent transition-colors"
//               >
//                 Sign In
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <p className="text-center text-sm text-muted-foreground mt-6">
//           By signing up, you agree to our Terms of Service and Privacy Policy
//         </p>
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
// import { Mail, Moon, Sun, User, Phone, Building } from "lucide-react"
// import Image from "next/image"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "./loader-overlay"
// import { ToastNotification } from "./toast-notification"

// interface SignUpPageProps {
//   onSignInClick: () => void
//   toggleTheme: () => void
//   isDark: boolean
// }

// export interface UserData {
//   firstName: string
//   lastName: string
//   email: string
//   phone: string
//   company: string
// }

// export default function SignUpPage({ onSignInClick, toggleTheme, isDark }: SignUpPageProps) {
//   const [formData, setFormData] = useState<UserData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     company: "",
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
//   const [generalError, setGeneralError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)
//   const router = useRouter()

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setGeneralError("")
//     setFieldErrors({})

//     // Validation
//     if (!formData.firstName.trim()) {
//       setGeneralError("First name is required")
//       return
//     }
//     if (!formData.lastName.trim()) {
//       setGeneralError("Last name is required")
//       return
//     }
//     if (!formData.email) {
//       setGeneralError("Email is required")
//       return
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setGeneralError("Please enter a valid email")
//       return
//     }
//     if (!formData.phone.trim()) {
//       setGeneralError("Phone number is required")
//       return
//     }
//     if (!formData.company.trim()) {
//       setGeneralError("Company name is required")
//       return
//     }

//     setIsLoading(true)
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/register`, {
//         email: formData.email,
//         phone: formData.phone,
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         org_name: formData.company,
//       })

//       console.log("[v0] Registration successful:", response.data)
//       setIsLoading(false)

//       localStorage.setItem("userFirstName", formData.firstName)
//       localStorage.setItem("userLastName", formData.lastName)
//       localStorage.setItem("userEmail", formData.email)
//       localStorage.setItem("userPhone", formData.phone)
//       localStorage.setItem("userCompany", formData.company)

//       setToast({
//         title: "Success",
//         description: "Account created successfully! Redirecting to sign in...",
//         variant: "default",
//       })

//       setTimeout(() => {
//         router.push("/")
//         onSignInClick()
//       }, 1500)
//     } catch (err) {
//       console.log("[v0] Registration error:", err)
//       setIsLoading(false)

//       if (axios.isAxiosError(err)) {
//         if (err.response?.data && typeof err.response.data === "object") {
//           const errorData = err.response.data as Record<string, string[]>
//           // Check if response contains field-level errors
//           if (errorData.email || errorData.phone || errorData.first_name || errorData.last_name || errorData.org_name) {
//             setFieldErrors({
//               email: errorData.email || [],
//               phone: errorData.phone || [],
//               firstName: errorData.first_name || [],
//               lastName: errorData.last_name || [],
//               company: errorData.org_name || [],
//             })
//             setGeneralError("Please check the form for errors")
//           } else {
//             const errorMessage = err.response?.data?.message || "Registration failed. Please try again."
//             setGeneralError(errorMessage)
//           }
//         } else {
//           const errorMessage = err.response?.data?.message || "Registration failed. Please try again."
//           setGeneralError(errorMessage)
//         }
//         setToast({
//           title: "Error",
//           description: `${generalError}`,
//           variant: "destructive",
//         })
//       } else {
//         setGeneralError("An error occurred. Please try again.")
//         setToast({
//           title: "Error",
//           description: `${generalError}`,
//           variant: "destructive",
//         })
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
//       <LoaderOverlay isLoading={isLoading} message="Creating your account..." />

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

//       <div className="w-full max-w-2xl">
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
//             <CardTitle className="text-3xl font-bold text-primary">Create Account</CardTitle>
//             <CardDescription className="text-base">Join SwiftWave.AI and start your journey</CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">First Name</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="firstName"
//                       placeholder="John"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className={`pl-10 h-11 border-2 ${fieldErrors.firstName ? "border-destructive" : "border-border"} focus:border-primary`}
//                     />
//                   </div>
//                   {fieldErrors.firstName && (
//                     <p className="text-xs text-destructive">{fieldErrors.firstName.join(", ")}</p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Last Name</label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       name="lastName"
//                       placeholder="Doe"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       className={`pl-10 h-11 border-2 ${fieldErrors.lastName ? "border-destructive" : "border-border"} focus:border-primary`}
//                     />
//                   </div>
//                   {fieldErrors.lastName && (
//                     <p className="text-xs text-destructive">{fieldErrors.lastName.join(", ")}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Email Field */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="email"
//                     name="email"
//                     placeholder="you@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className={`pl-10 h-11 border-2 ${fieldErrors.email ? "border-destructive" : "border-border"} focus:border-primary`}
//                   />
//                 </div>
//                 {fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email.join(", ")}</p>}
//               </div>

//               {/* Phone Field */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Phone Number</label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="tel"
//                     name="phone"
//                     placeholder="+1 (555) 000-0000"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className={`pl-10 h-11 border-2 ${fieldErrors.phone ? "border-destructive" : "border-border"} focus:border-primary`}
//                   />
//                 </div>
//                 {fieldErrors.phone && <p className="text-xs text-destructive">{fieldErrors.phone.join(", ")}</p>}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Company Name</label>
//                 <div className="relative">
//                   <Building className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     type="text"
//                     name="company"
//                     placeholder="Your Company"
//                     value={formData.company}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     className={`pl-10 h-11 border-2 ${fieldErrors.company ? "border-destructive" : "border-border"} focus:border-primary`}
//                   />
//                 </div>
//                 {fieldErrors.company && <p className="text-xs text-destructive">{fieldErrors.company.join(", ")}</p>}
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
//                     <span className="opacity-70">Creating Account...</span>
//                   </>
//                 ) : (
//                   "Sign up"
//                 )}
//               </Button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-border" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-card text-muted-foreground">Already have an account?</span>
//                 </div>
//               </div>

//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onSignInClick}
//                 disabled={isLoading}
//                 className="w-full h-11 border-2 border-border hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground font-semibold bg-transparent transition-colors"
//               >
//                 Sign In
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <p className="text-center text-sm text-muted-foreground mt-6">
//           By signing up, you agree to our Terms of Service and Privacy Policy
//         </p>
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
import { Mail, Moon, Sun, User, Phone, Building } from "lucide-react"
import Image from "next/image"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "./loader-overlay"
import { ToastNotification } from "./toast-notification"

interface SignUpPageProps {
  onSignInClick: () => void
  onSignUpSuccess: () => void
  toggleTheme: () => void
  isDark: boolean
}

export interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
}

export default function SignUpPage({ onSignInClick,onSignUpSuccess, toggleTheme, isDark }: SignUpPageProps) {
  const [formData, setFormData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
  })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear field errors when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => {
        const updated = { ...prev }
        delete updated[name as keyof typeof fieldErrors]
        return updated
      })
    }
    if (generalError) {
      setGeneralError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError("")
    setFieldErrors({})

    // Validation
    // if (!formData.firstName.trim()) {
    //   setGeneralError("First name is required")
    //   return
    // }
    // if (!formData.lastName.trim()) {
    //   setGeneralError("Last name is required")
    //   return
    // }
    // if (!formData.email) {
    //   setGeneralError("Email is required")
    //   return
    // }
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    //   setGeneralError("Please enter a valid email")
    //   return
    // }
    // if (!formData.phone.trim()) {
    //   setGeneralError("Phone number is required")
    //   return
    // }
    // if (!formData.company.trim()) {
    //   setGeneralError("Company name is required")
    //   return
    // }

    setIsLoading(true)
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        email: formData.email,
        phone: formData.phone,
        first_name: formData.firstName,
        last_name: formData.lastName,
        org_name: formData.company,
      })

      console.log("[v0] Registration successful:", response.data)
      setIsLoading(false)

      localStorage.setItem("userFirstName", formData.firstName)
      localStorage.setItem("userLastName", formData.lastName)
      localStorage.setItem("userEmail", formData.email)
      localStorage.setItem("userPhone", formData.phone)
      localStorage.setItem("userCompany", formData.company)

      showToast("Success", "Account created successfully! Redirecting to sign in...", "default")

      setTimeout(() => {
        router.push("/")
        onSignUpSuccess()
      }, 1500)
    } catch (err) {
      console.log("[v0] Registration error:", err)
      setIsLoading(false)

      if (axios.isAxiosError(err)) {
        if (err.response?.data && typeof err.response.data === "object") {
          const errorData = err.response.data as Record<string, string[]>
          // Check if response contains field-level errors
          if (errorData.email || errorData.phone || errorData.first_name || errorData.last_name || errorData.org_name) {
            setFieldErrors({
              email: errorData.email || [],
              phone: errorData.phone || [],
              firstName: errorData.first_name || [],
              lastName: errorData.last_name || [],
              company: errorData.org_name || [],
            })
            
            // Set general error for inline display with line breaks
            const errorMessages = []
            if (errorData.email) errorMessages.push(`Email: ${Array.isArray(errorData.email) ? errorData.email.join(", ") : errorData.email}`)
            if (errorData.phone) errorMessages.push(`Phone: ${Array.isArray(errorData.phone) ? errorData.phone.join(", ") : errorData.phone}`)
            if (errorData.first_name) errorMessages.push(`First Name: ${Array.isArray(errorData.first_name) ? errorData.first_name.join(", ") : errorData.first_name}`)
            if (errorData.last_name) errorMessages.push(`Last Name: ${Array.isArray(errorData.last_name) ? errorData.last_name.join(", ") : errorData.last_name}`)
            if (errorData.org_name) errorMessages.push(`Company: ${Array.isArray(errorData.org_name) ? errorData.org_name.join(", ") : errorData.org_name}`)
            setGeneralError(errorMessages.join('\n'))
            
            // Create JSX element for multi-line toast message
            const ErrorMessages = () => (
              <div>
                {errorData.email && (
                  <div>Email: {Array.isArray(errorData.email) ? errorData.email.join(", ") : errorData.email}</div>
                )}
                {errorData.phone && (
                  <div>Phone: {Array.isArray(errorData.phone) ? errorData.phone.join(", ") : errorData.phone}</div>
                )}
                {errorData.first_name && (
                  <div>First Name: {Array.isArray(errorData.first_name) ? errorData.first_name.join(", ") : errorData.first_name}</div>
                )}
                {errorData.last_name && (
                  <div>Last Name: {Array.isArray(errorData.last_name) ? errorData.last_name.join(", ") : errorData.last_name}</div>
                )}
                {errorData.org_name && (
                  <div>Company: {Array.isArray(errorData.org_name) ? errorData.org_name.join(", ") : errorData.org_name}</div>
                )}
              </div>
            )
            
            showToast("Validation Error", <ErrorMessages />, "destructive")
          } else {
            const errorMessage = err.response?.data?.message || "Registration failed. Please try again."
            setGeneralError(errorMessage)
            showToast("Error", errorMessage, "destructive")
          }
        } else {
          const errorMessage = err.response?.data?.message || "Registration failed. Please try again."
          setGeneralError(errorMessage)
          showToast("Error", errorMessage, "destructive")
        }
      } else {
        const errorMessage = "An error occurred. Please try again."
        setGeneralError(errorMessage)
        showToast("Error", errorMessage, "destructive")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <LoaderOverlay isLoading={isLoading} message="Creating your account..." />

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

      <div className="w-full max-w-2xl">
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
            <CardTitle className="text-3xl font-bold text-primary">Create Account</CardTitle>
            <CardDescription className="text-base">Join SwiftWave.AI and start your journey</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`pl-10 h-11 border-2 ${fieldErrors.firstName ? "border-destructive" : "border-border"} focus:border-primary`}
                    />
                  </div>
                  {fieldErrors.firstName && (
                    <p className="text-xs text-destructive">{fieldErrors.firstName.join(", ")}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`pl-10 h-11 border-2 ${fieldErrors.lastName ? "border-destructive" : "border-border"} focus:border-primary`}
                    />
                  </div>
                  {fieldErrors.lastName && (
                    <p className="text-xs text-destructive">{fieldErrors.lastName.join(", ")}</p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`pl-10 h-11 border-2 ${fieldErrors.email ? "border-destructive" : "border-border"} focus:border-primary`}
                  />
                </div>
                {fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email.join(", ")}</p>}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`pl-10 h-11 border-2 ${fieldErrors.phone ? "border-destructive" : "border-border"} focus:border-primary`}
                  />
                </div>
                {fieldErrors.phone && <p className="text-xs text-destructive">{fieldErrors.phone.join(", ")}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Company Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    name="company"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`pl-10 h-11 border-2 ${fieldErrors.company ? "border-destructive" : "border-border"} focus:border-primary`}
                  />
                </div>
                {fieldErrors.company && <p className="text-xs text-destructive">{fieldErrors.company.join(", ")}</p>}
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
                    <span className="opacity-70">Creating Account...</span>
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">Already have an account?</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={onSignInClick}
                disabled={isLoading}
                className="w-full h-11 border-2 border-border hover:bg-muted bg-gradient-to-r from-primary/20 to-primary/20 dark:hover:text-white/50 text-foreground font-semibold bg-transparent transition-colors"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}