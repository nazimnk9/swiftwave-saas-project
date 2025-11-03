// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { AddressModal } from "./address-modal"

// interface Bundle {
//   id: string
//   friendly_name: string
//   iso_country: string
// }

// interface PhoneNumber {
//   phone_number: string
// }

// interface EndUserModalProps {
//   bundle: Bundle
//   phoneNumber: PhoneNumber
//   onClose: () => void
// }

// export function EndUserModal({ bundle, phoneNumber, onClose }: EndUserModalProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [showAddressModal, setShowAddressModal] = useState(false)
//   const [formData, setFormData] = useState({
//     friendly_name: "",
//     business_name: "",
//     business_registration_number: "",
//     business_registration_identifier: "",
//     business_website: "",
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone_number: "",
//   })

//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleNext = async () => {
//     if (
//       !formData.friendly_name ||
//       !formData.first_name ||
//       !formData.last_name ||
//       !formData.email ||
//       !formData.phone_number
//     ) {
//       setToast({
//         title: "Error",
//         description: "Please fill in all required fields",
//         variant: "destructive",
//       })
//       return
//     }

//     try {
//       setIsLoading(true)

//       // Save to local storage
//       localStorage.setItem("endUserData", JSON.stringify(formData))

//       setToast({
//         title: "Success",
//         description: "End user information saved",
//         variant: "default",
//       })

//       // Move to address modal
//       setShowAddressModal(true)
//     } catch (err) {
//       console.log("[v0] Error:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to save information",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <>
//       <LoaderOverlay isLoading={isLoading} message="Saving information..." />

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
//             <DialogTitle>End User Information</DialogTitle>
//           </DialogHeader>

//           <div className="space-y-4">
//             {/* Friendly Name */}
//             <div className="space-y-2">
//               <Label htmlFor="friendly_name">Friendly Name *</Label>
//               <Input
//                 id="friendly_name"
//                 name="friendly_name"
//                 placeholder="e.g., John's Business"
//                 value={formData.friendly_name}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Business Information */}
//             <div className="space-y-4 pt-2 border-t">
//               <h3 className="font-semibold">Business Information</h3>

//               <div className="space-y-2">
//                 <Label htmlFor="business_name">Business Name</Label>
//                 <Input
//                   id="business_name"
//                   name="business_name"
//                   placeholder="Your business name"
//                   value={formData.business_name}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="business_registration_number">Registration Number</Label>
//                 <Input
//                   id="business_registration_number"
//                   name="business_registration_number"
//                   placeholder="12-3456789"
//                   value={formData.business_registration_number}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="business_registration_identifier">Registration Identifier</Label>
//                 <Input
//                   id="business_registration_identifier"
//                   name="business_registration_identifier"
//                   placeholder="e.g., UK:CRN"
//                   value={formData.business_registration_identifier}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="business_website">Website</Label>
//                 <Input
//                   id="business_website"
//                   name="business_website"
//                   placeholder="https://example.com"
//                   value={formData.business_website}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Personal Information */}
//             <div className="space-y-4 pt-2 border-t">
//               <h3 className="font-semibold">Personal Information</h3>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="first_name">First Name *</Label>
//                   <Input
//                     id="first_name"
//                     name="first_name"
//                     placeholder="John"
//                     value={formData.first_name}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="last_name">Last Name *</Label>
//                   <Input
//                     id="last_name"
//                     name="last_name"
//                     placeholder="Doe"
//                     value={formData.last_name}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email *</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="john@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="phone_number">Phone Number *</Label>
//                 <Input
//                   id="phone_number"
//                   name="phone_number"
//                   placeholder="+1234567890"
//                   value={formData.phone_number}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-2 pt-4 border-t">
//             <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
//               Cancel
//             </Button>
//             <Button onClick={handleNext} className="flex-1">
//               Next: Address
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {showAddressModal && (
//         <AddressModal
//           bundle={bundle}
//           onClose={() => {
//             setShowAddressModal(false)
//             onClose()
//           }}
//         />
//       )}
//     </>
//   )
// }


// "use client"

// import type React from "react"

// import type { ReactElement } from "react"
// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { X } from "lucide-react"
// import { ToastNotification } from "@/components/auth/toast-notification"

// interface EndUserModalProps {
//   onClose: () => void
//   onBack: () => void
//   onNext: (data: any) => void
// }

// export function EndUserModal({ onClose, onBack, onNext }: EndUserModalProps): ReactElement {
//   const [error, setError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const [formData, setFormData] = useState({
//     friendly_name: "",
//     business_name: "",
//     business_registration_number: "",
//     business_registration_identifier: "",
//     business_website: "",
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone_number: "",
//   })

//   const saved = window.localStorage.getItem("endUserData")
//   if (saved) {
//     setFormData(JSON.parse(saved))
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     const updated = {
//       ...formData,
//       [name]: value,
//     }
//     setFormData(updated)
//     window.localStorage.setItem("endUserData", JSON.stringify(updated))
//   }

//   const handleNext = () => {
//     setError("")

//     const requiredFields = [
//       "friendly_name",
//       "business_name",
//       "business_registration_number",
//       "business_registration_identifier",
//       "business_website",
//       "first_name",
//       "last_name",
//       "email",
//       "phone_number",
//     ]

//     if (requiredFields.some((field) => !formData[field as keyof typeof formData])) {
//       setError("Please fill in all required fields")
//       return
//     }

//     setToast({
//       title: "Success",
//       description: "End user information saved",
//       variant: "default",
//     })

//     setTimeout(() => {
//       onNext(formData)
//     }, 500)
//   }

//   const handleCancel = () => {
//     window.localStorage.removeItem("endUserData")
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
//             <CardTitle className="text-xl">End User Information</CardTitle>
//             <CardDescription className="mt-1">Step 2: End User Details</CardDescription>
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
//             {/* Friendly Name */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Friendly Name *</label>
//               <Input
//                 type="text"
//                 name="friendly_name"
//                 placeholder="Goni Corp"
//                 value={formData.friendly_name}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* Business Name */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Business Name *</label>
//               <Input
//                 type="text"
//                 name="business_name"
//                 placeholder="Acme Corporation LLC"
//                 value={formData.business_name}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* Business Registration Number */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Business Registration Number *</label>
//               <Input
//                 type="text"
//                 name="business_registration_number"
//                 placeholder="12-3456789"
//                 value={formData.business_registration_number}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* Business Registration Identifier */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">
//                 Business Registration Identifier *
//               </label>
//               <Input
//                 type="text"
//                 name="business_registration_identifier"
//                 placeholder="UK:CRN"
//                 value={formData.business_registration_identifier}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* Business Website */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Business Website *</label>
//               <Input
//                 type="url"
//                 name="business_website"
//                 placeholder="https://acmecorp.com"
//                 value={formData.business_website}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* First Name */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">First Name *</label>
//               <Input
//                 type="text"
//                 name="first_name"
//                 placeholder="Osman"
//                 value={formData.first_name}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* Last Name */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Last Name *</label>
//               <Input
//                 type="text"
//                 name="last_name"
//                 placeholder="Goni"
//                 value={formData.last_name}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
//               <Input
//                 type="email"
//                 name="email"
//                 placeholder="osmangoni255@gmail.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* Phone Number */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Phone Number *</label>
//               <Input
//                 type="tel"
//                 name="phone_number"
//                 placeholder="+8801815553036"
//                 value={formData.phone_number}
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
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ArrowLeft } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"

// interface EndUserModalProps {
//   bundleCountry: string
//   onBack: () => void
//   onNext: () => void
// }

// export function EndUserModal({ bundleCountry, onBack, onNext }: EndUserModalProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     friendly_name: "",
//     business_name: "",
//     business_registration_number: "",
//     business_registration_identifier: "",
//     business_website: "",
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone_number: "",
//   })
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   useEffect(() => {
//     const savedData = localStorage.getItem("endUserFormData")
//     if (savedData) {
//       setFormData(JSON.parse(savedData))
//     }
//   }, [])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     const updatedData = { ...formData, [name]: value }
//     setFormData(updatedData)
//     localStorage.setItem("endUserFormData", JSON.stringify(updatedData))
//   }

//   const handleNext = () => {
//     if (!formData.email || !formData.first_name || !formData.last_name) {
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
//     localStorage.removeItem("endUserFormData")
//     onBack()
//   }

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
//           <h1 className="text-3xl font-bold text-foreground">End User Information</h1>
//         </div>

//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>Business Information</CardTitle>
//             <CardDescription>Enter your business details</CardDescription>
//           </CardHeader>
//           <CardContent className="pt-6 space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Friendly Name *</label>
//                 <Input
//                   name="friendly_name"
//                   placeholder="Business Friendly Name"
//                   value={formData.friendly_name}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Business Name *</label>
//                 <Input
//                   name="business_name"
//                   placeholder="Official Business Name"
//                   value={formData.business_name}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Registration Number</label>
//                 <Input
//                   name="business_registration_number"
//                   placeholder="Tax ID or Registration Number"
//                   value={formData.business_registration_number}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Registration Identifier</label>
//                 <Input
//                   name="business_registration_identifier"
//                   placeholder="e.g., UK:CRN"
//                   value={formData.business_registration_identifier}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Business Website</label>
//                 <Input
//                   name="business_website"
//                   placeholder="https://example.com"
//                   value={formData.business_website}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>Personal Information</CardTitle>
//             <CardDescription>Enter contact person details</CardDescription>
//           </CardHeader>
//           <CardContent className="pt-6 space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">First Name *</label>
//                 <Input
//                   name="first_name"
//                   placeholder="First Name"
//                   value={formData.first_name}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Last Name *</label>
//                 <Input
//                   name="last_name"
//                   placeholder="Last Name"
//                   value={formData.last_name}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Email *</label>
//                 <Input
//                   name="email"
//                   type="email"
//                   placeholder="email@example.com"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Phone Number</label>
//                 <Input
//                   name="phone_number"
//                   placeholder="+1234567890"
//                   value={formData.phone_number}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="flex gap-2">
//           <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
//             Back
//           </Button>
//           <Button onClick={handleNext} className="flex-1" disabled={isLoading}>
//             Next: Address Details
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ArrowLeft } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"

// interface EndUserModalProps {
//   bundleCountry: string
//   onBack: () => void
//   onNext: () => void
// }

// export function EndUserModal({ bundleCountry, onBack, onNext }: EndUserModalProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     friendly_name: "",
//     business_name: "",
//     business_registration_number: "",
//     business_registration_identifier: "",
//     business_website: "",
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone_number: "",
//   })
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   useEffect(() => {
//     const savedData = localStorage.getItem("endUserFormData")
//     if (savedData) {
//       setFormData(JSON.parse(savedData))
//     }
//   }, [])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     const updatedData = { ...formData, [name]: value }
//     setFormData(updatedData)
//     localStorage.setItem("endUserFormData", JSON.stringify(updatedData))
//   }

//   const handleNext = () => {
//     if (!formData.email || !formData.first_name || !formData.last_name) {
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
//     onBack()
//   }

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
//           <h1 className="text-3xl font-bold text-foreground">End User Information</h1>
//         </div>

//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>Business Information</CardTitle>
//             <CardDescription>Enter your business details</CardDescription>
//           </CardHeader>
//           <CardContent className="pt-6 space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Friendly Name *</label>
//                 <Input
//                   name="friendly_name"
//                   placeholder="Business Friendly Name"
//                   value={formData.friendly_name}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Business Name *</label>
//                 <Input
//                   name="business_name"
//                   placeholder="Official Business Name"
//                   value={formData.business_name}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Registration Number</label>
//                 <Input
//                   name="business_registration_number"
//                   placeholder="Tax ID or Registration Number"
//                   value={formData.business_registration_number}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Registration Identifier</label>
//                 <Input
//                   name="business_registration_identifier"
//                   placeholder="e.g., UK:CRN"
//                   value={formData.business_registration_identifier}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Business Website</label>
//                 <Input
//                   name="business_website"
//                   placeholder="https://example.com"
//                   value={formData.business_website}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>Personal Information</CardTitle>
//             <CardDescription>Enter contact person details</CardDescription>
//           </CardHeader>
//           <CardContent className="pt-6 space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">First Name *</label>
//                 <Input
//                   name="first_name"
//                   placeholder="First Name"
//                   value={formData.first_name}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Last Name *</label>
//                 <Input
//                   name="last_name"
//                   placeholder="Last Name"
//                   value={formData.last_name}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Email *</label>
//                 <Input
//                   name="email"
//                   type="email"
//                   placeholder="email@example.com"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Phone Number</label>
//                 <Input
//                   name="phone_number"
//                   placeholder="+1234567890"
//                   value={formData.phone_number}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="flex gap-2">
//           <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
//             Back
//           </Button>
//           <Button onClick={handleNext} className="flex-1" disabled={isLoading}>
//             Next: Address Details
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
import { ArrowLeft, ArrowRight } from "lucide-react"

interface EndUserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack: () => void
  onNext: (userData: any) => void
}

export function EndUserModal({ open, onOpenChange, onBack, onNext }: EndUserModalProps) {
  const [error, setError] = useState("")
  const [isHydrated, setIsHydrated] = useState(false)
  const [formData, setFormData] = useState({
    friendly_name: "",
    business_name: "",
    business_registration_number: "",
    business_registration_identifier: "",
    business_website: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsHydrated(true)
      if (open) {
        const savedData = localStorage.getItem("endUserData")
        if (savedData) {
          setFormData(JSON.parse(savedData))
        }
      }
    }
  }, [open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)
    if (typeof window !== "undefined") {
      localStorage.setItem("endUserData", JSON.stringify(updatedData))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (
      !formData.friendly_name ||
      !formData.business_name ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.phone_number
    ) {
      setError("Please fill in all required fields")
      return
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("endUserData", JSON.stringify(formData))
    }
    onNext(formData)
  }

  const handleCancel = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("endUserData")
    }
    setFormData({
      friendly_name: "",
      business_name: "",
      business_registration_number: "",
      business_registration_identifier: "",
      business_website: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    })
    setError("")
    onOpenChange(false)
  }

  if (!isHydrated) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-2xl">End User Information</DialogTitle>
          <DialogDescription>Step 2 of 3: Provide end user details</DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Friendly Name *</label>
              <Input
                placeholder="e.g., Osman Goni"
                name="friendly_name"
                value={formData.friendly_name}
                onChange={handleChange}
                className="border-2 border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Business Name *</label>
              <Input
                placeholder="e.g., Acme Corporation"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                className="border-2 border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Registration Number</label>
              <Input
                placeholder="e.g., 12-3456789"
                name="business_registration_number"
                value={formData.business_registration_number}
                onChange={handleChange}
                className="border-2 border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Registration Identifier</label>
              <Input
                placeholder="e.g., UK:CRN"
                name="business_registration_identifier"
                value={formData.business_registration_identifier}
                onChange={handleChange}
                className="border-2 border-border"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-foreground mb-2">Business Website</label>
              <Input
                placeholder="e.g., https://acmecorp.com"
                name="business_website"
                value={formData.business_website}
                onChange={handleChange}
                className="border-2 border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">First Name *</label>
              <Input
                placeholder="e.g., Osman"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="border-2 border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Last Name *</label>
              <Input
                placeholder="e.g., Goni"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="border-2 border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
              <Input
                type="email"
                placeholder="your@email.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border-2 border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Phone Number *</label>
              <Input
                placeholder="+8801815553036"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="border-2 border-border"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-3 pt-6 border-t border-border">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="flex-1 border-2 border-border bg-gradient-to-r from-primary/20 to-primary/20 dark:hover:text-white/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
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
