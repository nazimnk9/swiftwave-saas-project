// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Search } from "lucide-react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { FinalSubmissionModal } from "./final-submission-modal"

// interface Country {
//   country: string
//   country_code: string
// }

// interface Bundle {
//   id: string
//   iso_country: string
// }

// interface AddressModalProps {
//   bundle: Bundle
//   onClose: () => void
// }

// export function AddressModal({ bundle, onClose }: AddressModalProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [isFetching, setIsFetching] = useState(false)
//   const [countries, setCountries] = useState<Country[]>([])
//   const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
//   const [countrySearch, setCountrySearch] = useState("")
//   const [showCountryDropdown, setShowCountryDropdown] = useState(false)
//   const [showFinalModal, setShowFinalModal] = useState(false)

//   const [formData, setFormData] = useState({
//     customer_name: "",
//     street: "",
//     city: "",
//     region: "",
//     postal_code: "",
//     iso_country: bundle.iso_country,
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

//   const handleNext = () => {
//     if (
//       !formData.customer_name ||
//       !formData.street ||
//       !formData.city ||
//       !formData.postal_code ||
//       !formData.iso_country
//     ) {
//       setToast({
//         title: "Error",
//         description: "Please fill in all required fields",
//         variant: "destructive",
//       })
//       return
//     }

//     // Save to local storage
//     localStorage.setItem("addressData", JSON.stringify(formData))

//     setToast({
//       title: "Success",
//       description: "Address information saved",
//       variant: "default",
//     })

//     // Move to final submission
//     setShowFinalModal(true)
//   }

//   return (
//     <>
//       <LoaderOverlay isLoading={isLoading || isFetching} message={isFetching ? "Loading..." : "Processing..."} />

//       {toast && (
//         <ToastNotification
//           title={toast.title}
//           description={toast.description}
//           variant={toast.variant}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <Dialog open={true} onOpenChange={onClose}>
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Address Information</DialogTitle>
//           </DialogHeader>

//           <div className="space-y-4">
//             {/* Customer Name */}
//             <div className="space-y-2">
//               <Label htmlFor="customer_name">Customer Name *</Label>
//               <Input
//                 id="customer_name"
//                 name="customer_name"
//                 placeholder="Steven Peddie"
//                 value={formData.customer_name}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Street */}
//             <div className="space-y-2">
//               <Label htmlFor="street">Street Address *</Label>
//               <Input
//                 id="street"
//                 name="street"
//                 placeholder="123 Main Street"
//                 value={formData.street}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* City */}
//             <div className="space-y-2">
//               <Label htmlFor="city">City *</Label>
//               <Input id="city" name="city" placeholder="New York" value={formData.city} onChange={handleChange} />
//             </div>

//             {/* Region */}
//             <div className="space-y-2">
//               <Label htmlFor="region">State/Region</Label>
//               <Input id="region" name="region" placeholder="NY" value={formData.region} onChange={handleChange} />
//             </div>

//             {/* Postal Code */}
//             <div className="space-y-2">
//               <Label htmlFor="postal_code">Postal Code *</Label>
//               <Input
//                 id="postal_code"
//                 name="postal_code"
//                 placeholder="10001"
//                 value={formData.postal_code}
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
//                           setFormData((prev) => ({
//                             ...prev,
//                             iso_country: country.country_code,
//                           }))
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
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-2 pt-4 border-t">
//             <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
//               Back
//             </Button>
//             <Button onClick={handleNext} className="flex-1">
//               Next: Review
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {showFinalModal && (
//         <FinalSubmissionModal
//           onClose={() => {
//             setShowFinalModal(false)
//             onClose()
//           }}
//         />
//       )}
//     </>
//   )
// }


// "use client"

// import React, { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { X } from "lucide-react"
// import { ToastNotification } from "@/components/auth/toast-notification"

// interface AddressModalProps {
//   onClose: () => void
//   onBack: () => void
//   onNext: (data: any) => void
// }

// export function AddressModal({ onClose, onBack, onNext }: AddressModalProps) {
//   const [error, setError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const [formData, setFormData] = useState({
//     customer_name: "",
//     street: "",
//     street2: "",
//     city: "",
//     state: "",
//     postal_code: "",
//     country: "",
//   })

//   React.useEffect(() => {
//     const saved = localStorage.getItem("addressData")
//     if (saved) {
//       setFormData(JSON.parse(saved))
//     }
//   }, [])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     const updated = {
//       ...formData,
//       [name]: value,
//     }
//     setFormData(updated)
//     localStorage.setItem("addressData", JSON.stringify(updated))
//   }

//   const handleNext = () => {
//     setError("")

//     const requiredFields = ["customer_name", "street", "city", "state", "postal_code", "country"]

//     if (requiredFields.some((field) => !formData[field as keyof typeof formData])) {
//       setError("Please fill in all required fields")
//       return
//     }

//     setToast({
//       title: "Success",
//       description: "Address information saved",
//       variant: "default",
//     })

//     setTimeout(() => {
//       onNext(formData)
//     }, 500)
//   }

//   const handleCancel = () => {
//     localStorage.removeItem("addressData")
//     onClose()
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
//       {toast && (
//         <ToastNotification
//           title={toast.title}
//           description={toast.description}
//           variant={toast.variant}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <Card className="w-full max-w-md border-2 border-border shadow-2xl my-8">
//         <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border flex flex-row items-center justify-between space-y-0 p-6 sticky top-0">
//           <div>
//             <CardTitle className="text-xl">Address Information</CardTitle>
//             <CardDescription className="mt-1">Step 3: Business Address</CardDescription>
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

//           <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
//             {/* Customer Name */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Customer Name *</label>
//               <Input
//                 type="text"
//                 name="customer_name"
//                 placeholder="Steven Peddie"
//                 value={formData.customer_name}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* Street */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Street *</label>
//               <Input
//                 type="text"
//                 name="street"
//                 placeholder="123 Main Street"
//                 value={formData.street}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* Street 2 */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Street 2 (Optional)</label>
//               <Input
//                 type="text"
//                 name="street2"
//                 placeholder="Apt, Suite, etc."
//                 value={formData.street2}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* City */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">City *</label>
//               <Input
//                 type="text"
//                 name="city"
//                 placeholder="San Francisco"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* State */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">State/Region *</label>
//               <Input
//                 type="text"
//                 name="state"
//                 placeholder="CA"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* Postal Code */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Postal Code *</label>
//               <Input
//                 type="text"
//                 name="postal_code"
//                 placeholder="94102"
//                 value={formData.postal_code}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* Country */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Country *</label>
//               <Input
//                 type="text"
//                 name="country"
//                 placeholder="United States"
//                 value={formData.country}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-4 border-t border-border mt-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onBack}
//               className="flex-1 border-2 border-border hover:bg-muted bg-transparent text-foreground font-semibold transition-all duration-200"
//             >
//               Back
//             </Button>
//             <Button
//               type="button"
//               onClick={handleNext}
//               className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
//             >
//               Next
//             </Button>
//           </div>

//           {/* Cancel Button */}
//           <Button
//             type="button"
//             onClick={handleCancel}
//             variant="outline"
//             className="w-full mt-2 border-2 border-border hover:bg-muted bg-transparent text-foreground font-semibold transition-all duration-200"
//           >
//             Cancel
//           </Button>
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
// import { ArrowLeft } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// interface AddressModalProps {
//   bundleCountry: string
//   onBack: () => void
//   onNext: () => void
// }

// interface Country {
//   country: string
//   country_code: string
// }

// export function AddressModal({ bundleCountry, onBack, onNext }: AddressModalProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [countries, setCountries] = useState<Country[]>([])
//   const [countrySearch, setCountrySearch] = useState("")
//   const [formData, setFormData] = useState({
//     customer_name: "",
//     street: "",
//     city: "",
//     region: "",
//     postal_code: "",
//     iso_country: bundleCountry,
//   })
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const authToken = localStorage.getItem("authToken")

//   useEffect(() => {
//     const savedData = localStorage.getItem("addressFormData")
//     if (savedData) {
//       setFormData(JSON.parse(savedData))
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         iso_country: bundleCountry,
//       }))
//     }
//     fetchCountries()
//   }, [bundleCountry])

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

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     const updatedData = { ...formData, [name]: value }
//     setFormData(updatedData)
//     localStorage.setItem("addressFormData", JSON.stringify(updatedData))
//   }

//   const handleCountryChange = (value: string) => {
//     const updatedData = { ...formData, iso_country: value }
//     setFormData(updatedData)
//     localStorage.setItem("addressFormData", JSON.stringify(updatedData))
//   }

//   const handleNext = () => {
//     if (!formData.customer_name || !formData.street || !formData.city || !formData.postal_code) {
//       setToast({
//         title: "Error",
//         description: "Please fill in all required fields",
//         variant: "destructive",
//       })
//       return
//     }
//     onNext()
//   }

//   const handleBack = () => {
//     localStorage.removeItem("addressFormData")
//     onBack()
//   }

//   const filteredCountries = countries.filter((c) => c.country.toLowerCase().includes(countrySearch.toLowerCase()))

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <LoaderOverlay isLoading={isLoading} message="Processing..." />

//       {toast && (
//         <ToastNotification
//           title={toast.title}
//           description={toast.description}
//           variant={toast.variant}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
//         <div className="flex items-center gap-2">
//           <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </Button>
//           <h1 className="text-3xl font-bold text-foreground">Address Information</h1>
//         </div>

//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>Service Address</CardTitle>
//             <CardDescription>Enter your service address details</CardDescription>
//           </CardHeader>
//           <CardContent className="pt-6 space-y-4">
//             <div className="space-y-2">
//               <label className="text-sm font-semibold">Customer Name *</label>
//               <Input
//                 name="customer_name"
//                 placeholder="Full Name"
//                 value={formData.customer_name}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-semibold">Street Address *</label>
//               <Input
//                 name="street"
//                 placeholder="Street and building number"
//                 value={formData.street}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">City *</label>
//                 <Input name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Region/State</label>
//                 <Input
//                   name="region"
//                   placeholder="State or Region"
//                   value={formData.region}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Postal Code *</label>
//                 <Input
//                   name="postal_code"
//                   placeholder="ZIP/Postal Code"
//                   value={formData.postal_code}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Country</label>
//                 <Select value={formData.iso_country} onValueChange={handleCountryChange}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent className="max-h-64">
//                     <div className="p-2">
//                       <Input
//                         placeholder="Search countries..."
//                         value={countrySearch}
//                         onChange={(e) => setCountrySearch(e.target.value)}
//                         className="mb-2"
//                       />
//                     </div>
//                     {filteredCountries.map((country) => (
//                       <SelectItem key={country.country_code} value={country.country_code}>
//                         {country.country} ({country.country_code})
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="flex gap-2">
//           <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
//             Back
//           </Button>
//           <Button onClick={handleNext} className="flex-1" disabled={isLoading}>
//             Next: Review & Submit
//           </Button>
//         </div>
//       </div>
//     </div>
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
import { ChevronDown, ArrowLeft, ArrowRight } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { getCookie } from "cookies-next"

interface AddressModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack: () => void
  onNext: (addressData: any) => void
  selectedCountryCode?: string
}

interface Country {
  country: string
  country_code: string
}

export function AddressModal({ open, onOpenChange, onBack, onNext, selectedCountryCode }: AddressModalProps) {
  const [error, setError] = useState("")
  const [countries, setCountries] = useState<Country[]>([])
  const [countrySearch, setCountrySearch] = useState("")
  const [showCountriesDropdown, setShowCountriesDropdown] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  const [formData, setFormData] = useState({
    customer_name: "",
    street: "",
    city: "",
    region: "",
    postal_code: "",
    iso_country: selectedCountryCode || "",
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsHydrated(true)
      if (open) {
        const savedData = localStorage.getItem("addressData")
        if (savedData) {
          setFormData(JSON.parse(savedData))
        } else if (selectedCountryCode) {
          setFormData((prev) => ({
            ...prev,
            iso_country: selectedCountryCode,
          }))
        }
      }
    }
  }, [open, selectedCountryCode])

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
    const updatedData = { ...formData, iso_country: countryCode }
    setFormData(updatedData)
    if (typeof window !== "undefined") {
      localStorage.setItem("addressData", JSON.stringify(updatedData))
    }
    setShowCountriesDropdown(false)
    setCountrySearch("")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)
    if (typeof window !== "undefined") {
      localStorage.setItem("addressData", JSON.stringify(updatedData))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (
      !formData.customer_name ||
      !formData.street ||
      !formData.city ||
      !formData.postal_code ||
      !formData.iso_country
    ) {
      setError("Please fill in all required fields")
      return
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("addressData", JSON.stringify(formData))
    }
    onNext(formData)
  }

  const handleCancel = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("addressData")
    }
    setFormData({
      customer_name: "",
      street: "",
      city: "",
      region: "",
      postal_code: "",
      iso_country: selectedCountryCode || "",
    })
    setError("")
    onOpenChange(false)
  }

  if (!isHydrated) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Address Information</DialogTitle>
          <DialogDescription>Step 3 of 3: Provide address details</DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Customer Name *</label>
            <Input
              placeholder="e.g., Steven Peddie"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              className="border-2 border-border"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Street *</label>
            <Input
              placeholder="e.g., Herkimer House Mill Road"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="border-2 border-border"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">City *</label>
              <Input
                placeholder="e.g., Linlithgow"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="border-2 border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Region</label>
              <Input
                placeholder="e.g., West Lothian, Scotland"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="border-2 border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Postal Code *</label>
              <Input
                placeholder="e.g., EH49 7SF"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                className="border-2 border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Country *</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCountriesDropdown(!showCountriesDropdown)}
                  className="cursor-pointer w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground text-left flex items-center justify-between hover:border-primary"
                >
                  <span>
                    {formData.iso_country
                      ? `${formData.iso_country} - ${countries.find((c) => c.country_code === formData.iso_country)?.country}`
                      : "Select"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${showCountriesDropdown ? "rotate-180" : ""}`}
                  />
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
                          className="cursor-pointer w-full px-4 py-3 text-left hover:bg-primary/10 text-foreground flex items-center justify-between border-b border-border/50"
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
          </div>

          <DialogFooter className="flex gap-3 pt-6 border-t border-border">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="cursor-pointer flex-1 border-2 border-border bg-gradient-to-r from-primary/20 to-primary/20 dark:hover:text-white/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              className="cursor-pointer flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
