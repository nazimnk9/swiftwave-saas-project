// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Search } from "lucide-react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"

// interface Country {
//   country: string
//   country_code: string
// }

// interface CreateBundleModalProps {
//   countryCode: string
//   onBundleCreated: (bundle: any) => void
//   onClose: () => void
// }

// const NUMBER_TYPES = ["local", "national", "mobile", "toll-free"]

// export function CreateBundleModal({ countryCode, onBundleCreated, onClose }: CreateBundleModalProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [isFetching, setIsFetching] = useState(false)
//   const [countries, setCountries] = useState<Country[]>([])
//   const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
//   const [countrySearch, setCountrySearch] = useState("")
//   const [showCountryDropdown, setShowCountryDropdown] = useState(false)

//   const [formData, setFormData] = useState({
//     friendly_name: "",
//     iso_country: countryCode,
//     number_type: "local",
//     email: "",
//   })

//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   useEffect(() => {
//     fetchCountries()
//   }, [])

//   const fetchCountries = async () => {
//     try {
//       setIsFetching(true)
//       const authToken = localStorage.getItem("authToken")

//       if (!authToken) return

//       const response = await axios.get(`${BASE_URL}/phone_number/countries`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })

//       console.log("[v0] Countries fetched:", response.data)
//       setCountries(response.data.countries || [])
//       setFilteredCountries(response.data.countries || [])
//     } catch (err) {
//       console.log("[v0] Error fetching countries:", err)
//     } finally {
//       setIsFetching(false)
//     }
//   }

//   const handleCountrySearch = (value: string) => {
//     setCountrySearch(value)
//     if (!value.trim()) {
//       setFilteredCountries(countries)
//     } else {
//       const filtered = countries.filter(
//         (c) =>
//           c.country.toLowerCase().includes(value.toLowerCase()) ||
//           c.country_code.toLowerCase().includes(value.toLowerCase()),
//       )
//       setFilteredCountries(filtered)
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = async () => {
//     if (!formData.friendly_name || !formData.email || !formData.iso_country) {
//       setToast({
//         title: "Error",
//         description: "Please fill in all required fields",
//         variant: "destructive",
//       })
//       return
//     }

//     try {
//       setIsLoading(true)
//       const authToken = localStorage.getItem("authToken")

//       if (!authToken) {
//         setToast({
//           title: "Error",
//           description: "Authentication token not found",
//           variant: "destructive",
//         })
//         return
//       }

//       const response = await axios.post(
//         `${BASE_URL}/phone_number/bundles/create`,
//         {
//           friendly_name: formData.friendly_name,
//           iso_country: formData.iso_country,
//           number_type: formData.number_type,
//           email: formData.email,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         },
//       )

//       console.log("[v0] Bundle created:", response.data)

//       // Save to local storage
//       const bundleData = {
//         id: response.data.bundle?.id || response.data.id,
//         friendly_name: formData.friendly_name,
//         iso_country: formData.iso_country,
//         number_type: formData.number_type,
//         email: formData.email,
//         bundle_sid: response.data.bundle?.bundle_sid || response.data.bundle_sid,
//       }

//       localStorage.setItem("bundleData", JSON.stringify(bundleData))

//       setToast({
//         title: "Success",
//         description: "Bundle created successfully",
//         variant: "default",
//       })

//       onBundleCreated(bundleData)
//     } catch (err) {
//       console.log("[v0] Error creating bundle:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to create bundle",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <>
//       <LoaderOverlay isLoading={isLoading || isFetching} message={isFetching ? "Loading..." : "Creating bundle..."} />

//       {toast && (
//         <ToastNotification
//           title={toast.title}
//           description={toast.description}
//           variant={toast.variant}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <Dialog open={true} onOpenChange={onClose}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Create New Bundle</DialogTitle>
//           </DialogHeader>

//           <div className="space-y-4">
//             {/* Friendly Name */}
//             <div className="space-y-2">
//               <Label htmlFor="friendly_name">Friendly Name *</Label>
//               <Input
//                 id="friendly_name"
//                 name="friendly_name"
//                 placeholder="e.g., My Business Bundle"
//                 value={formData.friendly_name}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Country Select with Search */}
//             <div className="space-y-2">
//               <Label htmlFor="iso_country">Country *</Label>
//               <div className="relative">
//                 <Input
//                   placeholder="Search countries..."
//                   value={countrySearch}
//                   onChange={(e) => handleCountrySearch(e.target.value)}
//                   onFocus={() => setShowCountryDropdown(true)}
//                   className="pl-10"
//                 />
//                 <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />

//                 {showCountryDropdown && (
//                   <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
//                     {filteredCountries.map((country) => (
//                       <button
//                         key={country.country_code}
//                         onClick={() => {
//                           handleSelectChange("iso_country", country.country_code)
//                           setCountrySearch("")
//                           setShowCountryDropdown(false)
//                         }}
//                         className="w-full text-left px-4 py-2 hover:bg-primary/10 transition-colors border-b last:border-0"
//                       >
//                         <p className="font-medium">{country.country}</p>
//                         <p className="text-xs text-muted-foreground">{country.country_code}</p>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <p className="text-xs text-muted-foreground">Selected: {formData.iso_country}</p>
//             </div>

//             {/* Number Type */}
//             <div className="space-y-2">
//               <Label htmlFor="number_type">Number Type *</Label>
//               <Select value={formData.number_type} onValueChange={(value) => handleSelectChange("number_type", value)}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {NUMBER_TYPES.map((type) => (
//                     <SelectItem key={type} value={type}>
//                       {type.charAt(0).toUpperCase() + type.slice(1)}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Email */}
//             <div className="space-y-2">
//               <Label htmlFor="email">Email *</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="your@email.com"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-2 pt-4 border-t">
//             <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
//               Cancel
//             </Button>
//             <Button onClick={handleSubmit} className="flex-1">
//               Create Bundle
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }


// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { X, ChevronDown } from "lucide-react"
// import { ToastNotification } from "@/components/auth/toast-notification"

// interface CreateBundleModalProps {
//   onClose: () => void
//   onNext: (data: any) => void
//   selectedCountry?: string
//   selectedCountryCode?: string
// }

// interface Country {
//   country: string
//   country_code: string
// }

// export function CreateBundleModal({
//   onClose,
//   onNext,
//   selectedCountry = "",
//   selectedCountryCode = "",
// }: CreateBundleModalProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)
//   const [countries, setCountries] = useState<Country[]>([])
//   const [countrySearch, setCountrySearch] = useState("")
//   const [showCountryDropdown, setShowCountryDropdown] = useState(false)

//   const [formData, setFormData] = useState({
//     friendly_name: "",
//     country_code: selectedCountryCode || "",
//     number_type: "local",
//     email: "",
//   })

//   useEffect(() => {
//     fetchCountries()
//   }, [])

//   useEffect(() => {
//     if (selectedCountryCode) {
//       setFormData((prev) => ({
//         ...prev,
//         country_code: selectedCountryCode,
//       }))
//     }
//   }, [selectedCountryCode])

//   const fetchCountries = async () => {
//     try {
//       const authToken = localStorage.getItem("authToken")
//       if (!authToken) return

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/phone_number/countries`,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         },
//       )

//       if (response.ok) {
//         const data = await response.json()
//         setCountries(data.countries || [])
//       }
//     } catch (err) {
//       console.log("[v0] Error fetching countries:", err)
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleCountrySelect = (code: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       country_code: code,
//     }))
//     setCountrySearch("")
//     setShowCountryDropdown(false)
//   }

//   const filteredCountries = countries.filter(
//     (c) =>
//       c.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
//       c.country_code.toLowerCase().includes(countrySearch.toLowerCase()),
//   )

//   const handleNext = () => {
//     setError("")

//     if (!formData.friendly_name || !formData.country_code || !formData.email) {
//       setError("Please fill in all required fields")
//       return
//     }

//     const bundleData = {
//       friendly_name: formData.friendly_name,
//       country_code: formData.country_code,
//       number_type: formData.number_type,
//       email: formData.email,
//     }
//     localStorage.setItem("bundleCreateData", JSON.stringify(bundleData))

//     setToast({
//       title: "Success",
//       description: "Bundle information saved",
//       variant: "default",
//     })

//     setTimeout(() => {
//       onNext(bundleData)
//     }, 500)
//   }

//   const handleCancel = () => {
//     localStorage.removeItem("bundleCreateData")
//     onClose()
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//       {toast && (
//         <ToastNotification
//           title={toast.title}
//           description={toast.description}
//           variant={toast.variant}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <Card className="w-full max-w-md border-2 border-border shadow-2xl">
//         <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border flex flex-row items-center justify-between space-y-0 p-6">
//           <div>
//             <CardTitle className="text-xl">Create Bundle</CardTitle>
//             <CardDescription className="mt-1">Step 1: Bundle Information</CardDescription>
//           </div>
//           <button
//             onClick={handleCancel}
//             className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-muted rounded-lg p-1"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </CardHeader>

//         <CardContent className="pt-6 bg-background">
//           {error && (
//             <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm mb-4 font-medium">
//               {error}
//             </div>
//           )}

//           <div className="space-y-5">
//             {/* Friendly Name */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Friendly Name *</label>
//               <Input
//                 type="text"
//                 name="friendly_name"
//                 placeholder="US Business Bundle"
//                 value={formData.friendly_name}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* Country Code */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Country *</label>
//               <div className="relative">
//                 <Input
//                   type="text"
//                   placeholder="Search country..."
//                   value={countrySearch}
//                   onChange={(e) => setCountrySearch(e.target.value)}
//                   onFocus={() => setShowCountryDropdown(true)}
//                   className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//                 />

//                 {showCountryDropdown && (
//                   <div className="absolute top-full left-0 right-0 mt-2 max-h-40 overflow-y-auto bg-background border-2 border-border rounded-lg shadow-lg z-50">
//                     {filteredCountries.length > 0 ? (
//                       filteredCountries.map((country) => (
//                         <button
//                           key={country.country_code}
//                           type="button"
//                           onClick={() => handleCountrySelect(country.country_code)}
//                           className="w-full px-4 py-2 text-left hover:bg-primary/10 border-b border-border last:border-b-0 transition-colors text-sm"
//                         >
//                           <p className="font-medium text-foreground">{country.country}</p>
//                           <p className="text-xs text-muted-foreground">{country.country_code}</p>
//                         </button>
//                       ))
//                     ) : (
//                       <div className="px-4 py-2 text-sm text-muted-foreground">No countries found</div>
//                     )}
//                   </div>
//                 )}
//               </div>
//               {formData.country_code && (
//                 <p className="text-xs text-muted-foreground mt-2">Selected: {formData.country_code}</p>
//               )}
//             </div>

//             {/* Number Type */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Number Type *</label>
//               <div className="relative">
//                 <select
//                   name="number_type"
//                   value={formData.number_type}
//                   onChange={handleChange}
//                   className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background appearance-none cursor-pointer"
//                 >
//                   <option value="local">Local</option>
//                   <option value="national">National</option>
//                   <option value="mobile">Mobile</option>
//                   <option value="toll-free">Toll-Free</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
//               <Input
//                 type="email"
//                 name="email"
//                 placeholder="customer@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-3 pt-4 border-t border-border">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={handleCancel}
//                 className="flex-1 border-2 border-border hover:bg-muted bg-transparent text-foreground font-semibold transition-all duration-200"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="button"
//                 onClick={handleNext}
//                 disabled={isLoading}
//                 className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
//               >
//                 {isLoading ? "Loading..." : "Next"}
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCookie } from "cookies-next"

// interface CreateBundleModalProps {
//   isOpen: boolean
//   countryCode: string
//   onClose: () => void
//   onBundleCreated: () => void
// }

// interface Country {
//   country: string
//   country_code: string
// }

// export function CreateBundleModal({ isOpen, countryCode, onClose, onBundleCreated }: CreateBundleModalProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [countries, setCountries] = useState<Country[]>([])
//   const [countrySearch, setCountrySearch] = useState("")
//   const [formData, setFormData] = useState({
//     friendly_name: "",
//     iso_country: countryCode,
//     number_type: "local",
//     email: "",
//   })
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const authToken = localStorage.getItem("authToken")

//   useEffect(() => {
//     if (isOpen) {
//       fetchCountries()
//       setFormData((prev) => ({
//         ...prev,
//         iso_country: countryCode || "",
//       }))
//     }
//   }, [isOpen, countryCode])

//   const fetchCountries = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/phone_number/countries`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setCountries(response.data.countries || [])
//     } catch (err) {
//       console.log("[v0] Error fetching countries:", err)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Save to localStorage
//     localStorage.setItem("bundleFormData", JSON.stringify(formData))

//     try {
//       setIsLoading(true)
//       const response = await axios.post(`${BASE_URL}/phone_number/bundles/create`, formData, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })

//       console.log("[v0] Bundle created:", response.data)
//       localStorage.removeItem("bundleFormData")
//       setToast({
//         title: "Success",
//         description: "Bundle created successfully",
//         variant: "default",
//       })
//       onBundleCreated()
//     } catch (err) {
//       console.log("[v0] Error creating bundle:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to create bundle",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleCancel = () => {
//     localStorage.removeItem("bundleFormData")
//     setFormData({
//       friendly_name: "",
//       iso_country: countryCode,
//       number_type: "local",
//       email: "",
//     })
//     onClose()
//   }

//   const filteredCountries = countries.filter((c) => c.country.toLowerCase().includes(countrySearch.toLowerCase()))

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-md">
//         <LoaderOverlay isLoading={isLoading} message="Creating bundle..." />

//         {toast && (
//           <ToastNotification
//             title={toast.title}
//             description={toast.description}
//             variant={toast.variant}
//             onClose={() => setToast(null)}
//           />
//         )}

//         <DialogHeader>
//           <DialogTitle>Create New Bundle</DialogTitle>
//           <DialogDescription>Fill in the details to create a new phone number bundle</DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <label className="text-sm font-semibold">Friendly Name</label>
//             <Input
//               placeholder="e.g., My Business Bundle"
//               value={formData.friendly_name}
//               onChange={(e) => {
//                 setFormData((prev) => ({ ...prev, friendly_name: e.target.value }))
//                 localStorage.setItem("bundleFormData", JSON.stringify(formData))
//               }}
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold">Country</label>
//             <Select
//               value={formData.iso_country}
//               onValueChange={(value) => {
//                 setFormData((prev) => ({ ...prev, iso_country: value }))
//                 localStorage.setItem("bundleFormData", JSON.stringify(formData))
//               }}
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent className="max-h-64">
//                 <div className="p-2">
//                   <Input
//                     placeholder="Search countries..."
//                     value={countrySearch}
//                     onChange={(e) => setCountrySearch(e.target.value)}
//                     className="mb-2"
//                   />
//                 </div>
//                 {filteredCountries.map((country) => (
//                   <SelectItem key={country.country_code} value={country.country_code}>
//                     {country.country} ({country.country_code})
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold">Number Type</label>
//             <Select
//               value={formData.number_type}
//               onValueChange={(value) => {
//                 setFormData((prev) => ({ ...prev, number_type: value }))
//                 localStorage.setItem("bundleFormData", JSON.stringify(formData))
//               }}
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="local">Local</SelectItem>
//                 <SelectItem value="national">National</SelectItem>
//                 <SelectItem value="mobile">Mobile</SelectItem>
//                 <SelectItem value="toll-free">Toll-Free</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold">Email</label>
//             <Input
//               type="email"
//               placeholder="your@email.com"
//               value={formData.email}
//               onChange={(e) => {
//                 setFormData((prev) => ({ ...prev, email: e.target.value }))
//                 localStorage.setItem("bundleFormData", JSON.stringify(formData))
//               }}
//               required
//             />
//           </div>

//           <div className="flex gap-2 pt-4">
//             <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
//               Cancel
//             </Button>
//             <Button type="submit" className="flex-1" disabled={isLoading}>
//               Create Bundle
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// interface CreateBundleModalProps {
//   isOpen: boolean
//   countryCode: string
//   onClose: () => void
//   onBundleCreated: () => void
// }

// interface Country {
//   country: string
//   country_code: string
// }

// export function CreateBundleModal({ isOpen, countryCode, onClose, onBundleCreated }: CreateBundleModalProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [countries, setCountries] = useState<Country[]>([])
//   const [countrySearch, setCountrySearch] = useState("")
//   const [formData, setFormData] = useState({
//     friendly_name: "",
//     iso_country: countryCode,
//     number_type: "local",
//     email: "",
//   })
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const authToken = localStorage.getItem("authToken")

//   useEffect(() => {
//     if (isOpen) {
//       fetchCountries()
//       setFormData((prev) => ({
//         ...prev,
//         iso_country: countryCode || "",
//       }))
//     }
//   }, [isOpen, countryCode])

//   const fetchCountries = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/phone_number/countries`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setCountries(response.data.countries || [])
//     } catch (err) {
//       console.log("[v0] Error fetching countries:", err)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Save to localStorage
//     localStorage.setItem("bundleFormData", JSON.stringify(formData))

//     setToast({
//       title: "Success",
//       description: "Bundle data saved successfully",
//       variant: "default",
//     })

//     // Call the onBundleCreated callback to proceed to next step
//     setTimeout(() => {
//       onBundleCreated()
//     }, 1000)
//   }

//   const handleCancel = () => {
//     localStorage.removeItem("bundleFormData")
//     setFormData({
//       friendly_name: "",
//       iso_country: countryCode,
//       number_type: "local",
//       email: "",
//     })
//     setCountrySearch("")
//     onClose()
//   }

//   const filteredCountries = countries.filter((c) => c.country.toLowerCase().includes(countrySearch.toLowerCase()))

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-md">
//         <LoaderOverlay isLoading={isLoading} message="Processing..." />

//         {toast && (
//           <ToastNotification
//             title={toast.title}
//             description={toast.description}
//             variant={toast.variant}
//             onClose={() => setToast(null)}
//           />
//         )}

//         <DialogHeader>
//           <DialogTitle>Create New Bundle</DialogTitle>
//           <DialogDescription>Fill in the details to create a new phone number bundle</DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <label className="text-sm font-semibold">Friendly Name</label>
//             <Input
//               placeholder="e.g., My Business Bundle"
//               value={formData.friendly_name}
//               onChange={(e) => {
//                 setFormData((prev) => ({ ...prev, friendly_name: e.target.value }))
//                 localStorage.setItem("bundleFormData", JSON.stringify(formData))
//               }}
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold">Country</label>
//             <Select
//               value={formData.iso_country}
//               onValueChange={(value) => {
//                 setFormData((prev) => ({ ...prev, iso_country: value }))
//                 localStorage.setItem("bundleFormData", JSON.stringify(formData))
//               }}
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent className="max-h-64">
//                 <div className="p-2">
//                   <Input
//                     placeholder="Search countries..."
//                     value={countrySearch}
//                     onChange={(e) => setCountrySearch(e.target.value)}
//                     className="mb-2"
//                   />
//                 </div>
//                 {filteredCountries.map((country) => (
//                   <SelectItem key={country.country_code} value={country.country_code}>
//                     {country.country} ({country.country_code})
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold">Number Type</label>
//             <Select
//               value={formData.number_type}
//               onValueChange={(value) => {
//                 setFormData((prev) => ({ ...prev, number_type: value }))
//                 localStorage.setItem("bundleFormData", JSON.stringify(formData))
//               }}
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="local">Local</SelectItem>
//                 <SelectItem value="national">National</SelectItem>
//                 <SelectItem value="mobile">Mobile</SelectItem>
//                 <SelectItem value="toll-free">Toll-Free</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold">Email</label>
//             <Input
//               type="email"
//               placeholder="your@email.com"
//               value={formData.email}
//               onChange={(e) => {
//                 setFormData((prev) => ({ ...prev, email: e.target.value }))
//                 localStorage.setItem("bundleFormData", JSON.stringify(formData))
//               }}
//               required
//             />
//           </div>

//           <div className="flex gap-2 pt-4">
//             <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
//               Cancel
//             </Button>
//             <Button type="submit" className="flex-1" disabled={isLoading}>
//               Next
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// interface CreateBundleModalProps {
//   isOpen: boolean
//   countryCode: string
//   onClose: () => void
//   onBundleCreated: () => void
// }

// interface Country {
//   country: string
//   country_code: string
// }

// export function CreateBundleModal({ isOpen, countryCode, onClose, onBundleCreated }: CreateBundleModalProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [countries, setCountries] = useState<Country[]>([])
//   const [countrySearch, setCountrySearch] = useState("")
//   const [formData, setFormData] = useState({
//     friendly_name: "",
//     iso_country: countryCode,
//     number_type: "local",
//     email: "",
//   })
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const authToken = localStorage.getItem("authToken")

//   useEffect(() => {
//     if (isOpen) {
//       fetchCountries()
//       setFormData((prev) => ({
//         ...prev,
//         iso_country: countryCode || "",
//       }))
//     }
//   }, [isOpen, countryCode])

//   const fetchCountries = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/phone_number/countries`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setCountries(response.data.countries || [])
//     } catch (err) {
//       console.log("[v0] Error fetching countries:", err)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Save to localStorage
//     localStorage.setItem("bundleFormData", JSON.stringify(formData))

//     setToast({
//       title: "Success",
//       description: "Bundle data saved successfully",
//       variant: "default",
//     })

//     setTimeout(() => {
//       onBundleCreated()
//     }, 500)
//   }

//   const handleCancel = () => {
//     localStorage.removeItem("bundleFormData")
//     setFormData({
//       friendly_name: "",
//       iso_country: countryCode,
//       number_type: "local",
//       email: "",
//     })
//     setCountrySearch("")
//     onClose()
//   }

//   const filteredCountries = countries.filter((c) => c.country.toLowerCase().includes(countrySearch.toLowerCase()))

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-md">
//         <LoaderOverlay isLoading={isLoading} message="Processing..." />

//         {toast && (
//           <ToastNotification
//             title={toast.title}
//             description={toast.description}
//             variant={toast.variant}
//             onClose={() => setToast(null)}
//           />
//         )}

//         <DialogHeader>
//           <DialogTitle>Create New Bundle</DialogTitle>
//           <DialogDescription>Fill in the details to create a new phone number bundle</DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <label className="text-sm font-semibold">Friendly Name</label>
//             <Input
//               placeholder="e.g., My Business Bundle"
//               value={formData.friendly_name}
//               onChange={(e) => {
//                 setFormData((prev) => ({ ...prev, friendly_name: e.target.value }))
//                 localStorage.setItem("bundleFormData", JSON.stringify(formData))
//               }}
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold">Country</label>
//             <Select
//               value={formData.iso_country}
//               onValueChange={(value) => {
//                 setFormData((prev) => ({ ...prev, iso_country: value }))
//                 localStorage.setItem("bundleFormData", JSON.stringify(formData))
//               }}
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent className="max-h-64">
//                 <div className="p-2">
//                   <Input
//                     placeholder="Search countries..."
//                     value={countrySearch}
//                     onChange={(e) => setCountrySearch(e.target.value)}
//                     className="mb-2"
//                   />
//                 </div>
//                 {filteredCountries.map((country) => (
//                   <SelectItem key={country.country_code} value={country.country_code}>
//                     {country.country} ({country.country_code})
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold">Number Type</label>
//             <Select
//               value={formData.number_type}
//               onValueChange={(value) => {
//                 setFormData((prev) => ({ ...prev, number_type: value }))
//                 localStorage.setItem("bundleFormData", JSON.stringify(formData))
//               }}
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="local">Local</SelectItem>
//                 <SelectItem value="national">National</SelectItem>
//                 <SelectItem value="mobile">Mobile</SelectItem>
//                 <SelectItem value="toll-free">Toll-Free</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold">Email</label>
//             <Input
//               type="email"
//               placeholder="your@email.com"
//               value={formData.email}
//               onChange={(e) => {
//                 setFormData((prev) => ({ ...prev, email: e.target.value }))
//                 localStorage.setItem("bundleFormData", JSON.stringify(formData))
//               }}
//               required
//             />
//           </div>

//           <div className="flex gap-2 pt-4">
//             <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
//               Cancel
//             </Button>
//             <Button type="submit" className="flex-1" disabled={isLoading}>
//               Next
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "@/components/auth/loader-overlay"
import { ToastNotification } from "@/components/auth/toast-notification"

interface CreateBundleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNext: (bundleData: any) => void
  selectedCountryCode?: string
}

interface Country {
  country: string
  country_code: string
}

export function CreateBundleModal({ open, onOpenChange, onNext, selectedCountryCode }: CreateBundleModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [countries, setCountries] = useState<Country[]>([])
  const [error, setError] = useState("")
  const [toast, setToast] = useState<any>(null)
  const [countrySearch, setCountrySearch] = useState("")
  const [showCountriesDropdown, setShowCountriesDropdown] = useState(false)

  const [formData, setFormData] = useState({
    friendly_name: "",
    country_code: selectedCountryCode || "",
    number_type: "local",
    email: "",
  })

  useEffect(() => {
    if (selectedCountryCode) {
      setFormData((prev) => ({
        ...prev,
        country_code: selectedCountryCode,
      }))
    }
  }, [selectedCountryCode])

  useEffect(() => {
    if (open && typeof window !== "undefined") {
      fetchCountries()
    }
  }, [open])

  const fetchCountries = async () => {
    try {
      const authToken = getCookie("authToken")
      const response = await axios.get(`${BASE_URL}/phone_number/countries`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      if (response.data.countries) {
        setCountries(response.data.countries)
      }
    } catch (err) {
      console.log("[v0] Error fetching countries:", err)
      setError("Failed to load countries")
    }
  }

  const handleCountrySearch = (search: string) => {
    setCountrySearch(search)
  }

  const filteredCountries = countries.filter(
    (country) =>
      country.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
      country.country_code.toLowerCase().includes(countrySearch.toLowerCase()),
  )

  const handleSelectCountry = (countryCode: string) => {
    setFormData((prev) => ({
      ...prev,
      country_code: countryCode,
    }))
    setShowCountriesDropdown(false)
    setCountrySearch("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.friendly_name || !formData.country_code || !formData.email) {
      setError("Please fill in all required fields")
      return
    }

    const bundleData = {
      friendly_name: formData.friendly_name,
      country_code: formData.country_code,
      number_type: formData.number_type,
      email: formData.email,
    }

    localStorage.setItem("bundleData", JSON.stringify(bundleData))
    onNext(bundleData)
  }

  const handleCancel = () => {
    setFormData({
      friendly_name: "",
      country_code: selectedCountryCode || "",
      number_type: "local",
      email: "",
    })
    setCountrySearch("")
    setError("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" showCloseButton={false}>
        <LoaderOverlay isLoading={isLoading} />
        {toast && (
          <ToastNotification
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            onClose={() => setToast(null)}
          />
        )}

        <DialogHeader>
          <DialogTitle className="text-2xl">Create Bundle</DialogTitle>
          <DialogDescription>Step 1 of 3: Bundle Information</DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Friendly Name */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Friendly Name *</label>
            <Input
              placeholder="e.g., UK Business Bundle"
              value={formData.friendly_name}
              onChange={(e) => setFormData((prev) => ({ ...prev, friendly_name: e.target.value }))}
              className="border-2 border-border"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Country *</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCountriesDropdown(!showCountriesDropdown)}
                className="cursor-pointer w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground text-left flex items-center justify-between hover:border-primary focus:border-primary transition-all"
              >
                <span>
                  {formData.country_code
                    ? `${formData.country_code} - ${countries.find((c) => c.country_code === formData.country_code)?.country}`
                    : "Select Country"}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform ${showCountriesDropdown ? "rotate-180" : ""}`} />
              </button>

              {showCountriesDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border-2 border-border rounded-lg shadow-lg z-50 max-h-64 overflow-hidden flex flex-col">
                  <div className="p-2 border-b border-border">
                    <Input
                      placeholder="Search countries..."
                      value={countrySearch}
                      onChange={(e) => handleCountrySearch(e.target.value)}
                      className="border border-border"
                    />
                  </div>
                  <div className="overflow-y-auto">
                    {filteredCountries.map((country) => (
                      <button
                        key={country.country_code}
                        type="button"
                        onClick={() => handleSelectCountry(country.country_code)}
                        className="cursor-pointer w-full px-4 py-3 text-left hover:bg-primary/10 text-foreground flex items-center justify-between border-b border-border/50 last:border-b-0"
                      >
                        <span>{country.country}</span>
                        <span className="text-xs font-semibold text-primary">{country.country_code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Number Type */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Number Type *</label>
            <div className="relative">
              <select
                value={formData.number_type}
                onChange={(e) => setFormData((prev) => ({ ...prev, number_type: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground appearance-none cursor-pointer font-medium"
              >
                <option value="local">Local</option>
                <option value="national">National</option>
                <option value="mobile">Mobile</option>
                <option value="toll-free">Toll-Free</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="border-2 border-border"
            />
          </div>

          {/* Buttons */}
          <DialogFooter className="flex gap-3 pt-6 border-t border-border">
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              className="cursor-pointer flex-1 border-2 border-border bg-gradient-to-r from-primary/20 to-primary/20 dark:hover:text-white/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Next
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
