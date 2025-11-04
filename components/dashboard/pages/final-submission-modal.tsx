// "use client"
// import { useState } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { CheckCircle, AlertCircle } from "lucide-react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"

// interface FinalSubmissionModalProps {
//   onClose: () => void
// }

// export function FinalSubmissionModal({ onClose }: FinalSubmissionModalProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const bundleData = JSON.parse(localStorage.getItem("bundleData") || "{}")
//   const endUserData = JSON.parse(localStorage.getItem("endUserData") || "{}")
//   const addressData = JSON.parse(localStorage.getItem("addressData") || "{}")

//   const handleSubmit = async () => {
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

//       // Step 1: Create Bundle (if not already created)
//       const bundleId = bundleData.id

//       // Step 2: Create End User
//       const endUserResponse = await axios.post(
//         `${BASE_URL}/phone_number/end-users/create`,
//         {
//           ...endUserData,
//           bundle_id: bundleId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         },
//       )

//       console.log("[v0] End user created:", endUserResponse.data)

//       // Step 3: Create Address
//       const addressResponse = await axios.post(
//         `${BASE_URL}/phone_number/addresses/create`,
//         {
//           ...addressData,
//           bundle_id: bundleId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         },
//       )

//       console.log("[v0] Address created:", addressResponse.data)

//       setToast({
//         title: "Success",
//         description: "All information submitted successfully!",
//         variant: "default",
//       })

//       // Clear local storage
//       localStorage.removeItem("bundleData")
//       localStorage.removeItem("endUserData")
//       localStorage.removeItem("addressData")

//       setTimeout(() => {
//         onClose()
//       }, 2000)
//     } catch (err) {
//       console.log("[v0] Error submitting:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to submit information",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <>
//       <LoaderOverlay isLoading={isLoading} message="Submitting information..." />

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
//             <DialogTitle>Review & Submit</DialogTitle>
//           </DialogHeader>

//           <div className="space-y-4">
//             {/* Bundle Information */}
//             <Card className="p-4 bg-primary/5 border-primary/20">
//               <div className="flex items-start gap-3">
//                 <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-foreground">Bundle Information</h3>
//                   <p className="text-sm text-muted-foreground">{bundleData.friendly_name}</p>
//                   <p className="text-xs text-muted-foreground">
//                     {bundleData.iso_country} • {bundleData.number_type}
//                   </p>
//                 </div>
//               </div>
//             </Card>

//             {/* End User Information */}
//             <Card className="p-4 bg-primary/5 border-primary/20">
//               <div className="flex items-start gap-3">
//                 <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-foreground">End User Information</h3>
//                   <div className="mt-2 space-y-1 text-sm">
//                     <p className="text-muted-foreground">
//                       <span className="font-medium text-foreground">Name:</span> {endUserData.first_name}{" "}
//                       {endUserData.last_name}
//                     </p>
//                     <p className="text-muted-foreground">
//                       <span className="font-medium text-foreground">Email:</span> {endUserData.email}
//                     </p>
//                     <p className="text-muted-foreground">
//                       <span className="font-medium text-foreground">Phone:</span> {endUserData.phone_number}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             {/* Address Information */}
//             <Card className="p-4 bg-primary/5 border-primary/20">
//               <div className="flex items-start gap-3">
//                 <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-foreground">Address Information</h3>
//                   <div className="mt-2 space-y-1 text-sm text-muted-foreground">
//                     <p>{addressData.customer_name}</p>
//                     <p>{addressData.street}</p>
//                     <p>
//                       {addressData.city}, {addressData.region} {addressData.postal_code}
//                     </p>
//                     <p>{addressData.iso_country}</p>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             {/* Important Note */}
//             <Card className="p-4 bg-amber-50 border-amber-200">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-amber-900">Important</h3>
//                   <p className="text-sm text-amber-800 mt-1">
//                     Please review all information carefully before submitting. Once submitted, the information cannot be
//                     changed.
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-2 pt-4 border-t">
//             <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
//               Back
//             </Button>
//             <Button onClick={handleSubmit} className="flex-1">
//               Submit
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { useRouter } from "next/navigation"

// interface FinalSubmissionModalProps {
//   phoneNumber: string
//   bundleId: string
//   countryCode: string
//   onBack: () => void
// }

// interface BundleData {
//   friendly_name: string
//   iso_country: string
//   number_type: string
//   email: string
// }

// interface EndUserData {
//   friendly_name: string
//   business_name: string
//   business_registration_number: string
//   business_registration_identifier: string
//   business_website: string
//   first_name: string
//   last_name: string
//   email: string
//   phone_number: string
// }

// interface AddressData {
//   customer_name: string
//   street: string
//   city: string
//   region: string
//   postal_code: string
//   iso_country: string
// }

// export function FinalSubmissionModal({ phoneNumber, bundleId, countryCode, onBack }: FinalSubmissionModalProps) {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [bundleData, setBundleData] = useState<BundleData | null>(null)
//   const [endUserData, setEndUserData] = useState<EndUserData | null>(null)
//   const [addressData, setAddressData] = useState<AddressData | null>(null)
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const authToken = localStorage.getItem("authToken")

//   useEffect(() => {
//     const bundle = localStorage.getItem("bundleFormData")
//     const endUser = localStorage.getItem("endUserFormData")
//     const address = localStorage.getItem("addressFormData")

//     if (bundle) setBundleData(JSON.parse(bundle))
//     if (endUser) setEndUserData(JSON.parse(endUser))
//     if (address) setAddressData(JSON.parse(address))
//   }, [])

//   const handleBack = () => {
//     onBack()
//   }

//   const handleSubmit = async () => {
//     if (!bundleData || !endUserData || !addressData) {
//       setToast({
//         title: "Error",
//         description: "Missing required data",
//         variant: "destructive",
//       })
//       return
//     }

//     try {
//       setIsLoading(true)

//       // Create bundle
//       const bundleResponse = await axios.post(`${BASE_URL}/phone_number/bundles/create`, bundleData, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })

//       const bundleSid = bundleResponse.data.bundle.id

//       // Create end user
//       await axios.post(
//         `${BASE_URL}/phone_number/end-users/create`,
//         {
//           ...endUserData,
//           bundle_id: bundleSid,
//         },
//         {
//           headers: { Authorization: `Bearer ${authToken}` },
//         },
//       )

//       // Create address
//       await axios.post(
//         `${BASE_URL}/phone_number/addresses/create`,
//         {
//           ...addressData,
//           bundle_id: bundleSid,
//         },
//         {
//           headers: { Authorization: `Bearer ${authToken}` },
//         },
//       )

//       // Clear localStorage
//       localStorage.removeItem("bundleFormData")
//       localStorage.removeItem("endUserFormData")
//       localStorage.removeItem("addressFormData")

//       setToast({
//         title: "Success",
//         description: "Phone number purchase completed successfully",
//         variant: "default",
//       })

//       setTimeout(() => {
//         router.push("/dashboard")
//       }, 2000)
//     } catch (err) {
//       console.log("[v0] Error submitting:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to complete purchase",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <LoaderOverlay isLoading={isLoading} message="Submitting..." />

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
//           <h1 className="text-3xl font-bold text-foreground">Review & Submit</h1>
//         </div>

//         {/* Bundle Information */}
//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>Bundle Information</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {bundleData && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Friendly Name</p>
//                   <p className="font-semibold">{bundleData.friendly_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Country</p>
//                   <p className="font-semibold">{bundleData.iso_country}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Number Type</p>
//                   <p className="font-semibold">{bundleData.number_type}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Email</p>
//                   <p className="font-semibold">{bundleData.email}</p>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* End User Information */}
//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>End User Information</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {endUserData && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-muted-foreground">First Name</p>
//                   <p className="font-semibold">{endUserData.first_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Last Name</p>
//                   <p className="font-semibold">{endUserData.last_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Email</p>
//                   <p className="font-semibold">{endUserData.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Phone Number</p>
//                   <p className="font-semibold">{endUserData.phone_number}</p>
//                 </div>
//                 <div className="md:col-span-2">
//                   <p className="text-sm text-muted-foreground">Business Name</p>
//                   <p className="font-semibold">{endUserData.business_name}</p>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Address Information */}
//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>Address Information</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {addressData && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Customer Name</p>
//                   <p className="font-semibold">{addressData.customer_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">City</p>
//                   <p className="font-semibold">{addressData.city}</p>
//                 </div>
//                 <div className="md:col-span-2">
//                   <p className="text-sm text-muted-foreground">Street</p>
//                   <p className="font-semibold">{addressData.street}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Region</p>
//                   <p className="font-semibold">{addressData.region}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Postal Code</p>
//                   <p className="font-semibold">{addressData.postal_code}</p>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         <div className="flex gap-2">
//           <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
//             Back
//           </Button>
//           <Button onClick={handleSubmit} className="flex-1" disabled={isLoading}>
//             Submit Purchase
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { useRouter } from "next/navigation"

// interface FinalSubmissionModalProps {
//   phoneNumber: string
//   bundleId: string
//   countryCode: string
//   onBack: () => void
// }

// interface BundleData {
//   friendly_name: string
//   iso_country: string
//   number_type: string
//   email: string
// }

// interface EndUserData {
//   friendly_name: string
//   business_name: string
//   business_registration_number: string
//   business_registration_identifier: string
//   business_website: string
//   first_name: string
//   last_name: string
//   email: string
//   phone_number: string
// }

// interface AddressData {
//   customer_name: string
//   street: string
//   city: string
//   region: string
//   postal_code: string
//   iso_country: string
// }

// export function FinalSubmissionModal({ phoneNumber, bundleId, countryCode, onBack }: FinalSubmissionModalProps) {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [bundleData, setBundleData] = useState<BundleData | null>(null)
//   const [endUserData, setEndUserData] = useState<EndUserData | null>(null)
//   const [addressData, setAddressData] = useState<AddressData | null>(null)
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const authToken = localStorage.getItem("authToken")

//   useEffect(() => {
//     const bundle = localStorage.getItem("bundleFormData")
//     const endUser = localStorage.getItem("endUserFormData")
//     const address = localStorage.getItem("addressFormData")

//     if (bundle) setBundleData(JSON.parse(bundle))
//     if (endUser) setEndUserData(JSON.parse(endUser))
//     if (address) setAddressData(JSON.parse(address))
//   }, [])

//   const handleBack = () => {
//     onBack()
//   }

//   const handleSubmit = async () => {
//     if (!bundleData || !endUserData || !addressData) {
//       setToast({
//         title: "Error",
//         description: "Missing required data",
//         variant: "destructive",
//       })
//       return
//     }

//     try {
//       setIsLoading(true)

//       // Create bundle
//       const bundleResponse = await axios.post(`${BASE_URL}/phone_number/bundles/create`, bundleData, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })

//       const bundleSid = bundleResponse.data.bundle.id

//       // Create end user
//       await axios.post(
//         `${BASE_URL}/phone_number/end-users/create`,
//         {
//           ...endUserData,
//           bundle_id: bundleSid,
//         },
//         {
//           headers: { Authorization: `Bearer ${authToken}` },
//         },
//       )

//       // Create address
//       await axios.post(
//         `${BASE_URL}/phone_number/addresses/create`,
//         {
//           ...addressData,
//           bundle_id: bundleSid,
//         },
//         {
//           headers: { Authorization: `Bearer ${authToken}` },
//         },
//       )

//       // Clear localStorage
//       localStorage.removeItem("bundleFormData")
//       localStorage.removeItem("endUserFormData")
//       localStorage.removeItem("addressFormData")

//       setToast({
//         title: "Success",
//         description: "Phone number purchase completed successfully",
//         variant: "default",
//       })

//       setTimeout(() => {
//         router.push("/dashboard")
//       }, 2000)
//     } catch (err) {
//       console.log("[v0] Error submitting:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to complete purchase",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <LoaderOverlay isLoading={isLoading} message="Submitting..." />

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
//           <h1 className="text-3xl font-bold text-foreground">Review & Submit</h1>
//         </div>

//         {/* Bundle Information */}
//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>Bundle Information</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {bundleData ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Friendly Name</p>
//                   <p className="font-semibold text-base">{bundleData.friendly_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Country</p>
//                   <p className="font-semibold text-base">{bundleData.iso_country}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Number Type</p>
//                   <p className="font-semibold text-base">{bundleData.number_type}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Email</p>
//                   <p className="font-semibold text-base">{bundleData.email}</p>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-muted-foreground">No bundle data available</p>
//             )}
//           </CardContent>
//         </Card>

//         {/* End User Information */}
//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>End User Information</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {endUserData ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Friendly Name</p>
//                   <p className="font-semibold text-base">{endUserData.friendly_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">First Name</p>
//                   <p className="font-semibold text-base">{endUserData.first_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Last Name</p>
//                   <p className="font-semibold text-base">{endUserData.last_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Email</p>
//                   <p className="font-semibold text-base">{endUserData.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
//                   <p className="font-semibold text-base">{endUserData.phone_number}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Business Name</p>
//                   <p className="font-semibold text-base">{endUserData.business_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Business Registration Number</p>
//                   <p className="font-semibold text-base">{endUserData.business_registration_number}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Business Registration Identifier</p>
//                   <p className="font-semibold text-base">{endUserData.business_registration_identifier}</p>
//                 </div>
//                 <div className="md:col-span-2">
//                   <p className="text-sm text-muted-foreground mb-1">Business Website</p>
//                   <p className="font-semibold text-base">{endUserData.business_website}</p>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-muted-foreground">No end user data available</p>
//             )}
//           </CardContent>
//         </Card>

//         {/* Address Information */}
//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>Address Information</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {addressData ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Customer Name</p>
//                   <p className="font-semibold text-base">{addressData.customer_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Country Code</p>
//                   <p className="font-semibold text-base">{addressData.iso_country}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">City</p>
//                   <p className="font-semibold text-base">{addressData.city}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Region</p>
//                   <p className="font-semibold text-base">{addressData.region}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Postal Code</p>
//                   <p className="font-semibold text-base">{addressData.postal_code}</p>
//                 </div>
//                 <div className="md:col-span-2">
//                   <p className="text-sm text-muted-foreground mb-1">Street</p>
//                   <p className="font-semibold text-base">{addressData.street}</p>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-muted-foreground">No address data available</p>
//             )}
//           </CardContent>
//         </Card>

//         <div className="flex gap-2">
//           <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
//             Back
//           </Button>
//           <Button onClick={handleSubmit} className="flex-1" disabled={isLoading}>
//             Submit Purchase
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { useRouter } from "next/navigation"

// interface FinalSubmissionModalProps {
//   phoneNumber: string
//   bundleId: string
//   countryCode: string
//   onBack: () => void
// }

// interface BundleData {
//   friendly_name: string
//   iso_country: string
//   number_type: string
//   email: string
// }

// interface EndUserData {
//   friendly_name: string
//   business_name: string
//   business_registration_number: string
//   business_registration_identifier: string
//   business_website: string
//   first_name: string
//   last_name: string
//   email: string
//   phone_number: string
// }

// interface AddressData {
//   customer_name: string
//   street: string
//   city: string
//   region: string
//   postal_code: string
//   iso_country: string
// }

// export function FinalSubmissionModal({ phoneNumber, bundleId, countryCode, onBack }: FinalSubmissionModalProps) {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [bundleData, setBundleData] = useState<BundleData | null>(null)
//   const [endUserData, setEndUserData] = useState<EndUserData | null>(null)
//   const [addressData, setAddressData] = useState<AddressData | null>(null)
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const authToken = localStorage.getItem("authToken")

//   useEffect(() => {
//     const bundle = localStorage.getItem("bundleFormData")
//     const endUser = localStorage.getItem("endUserFormData")
//     const address = localStorage.getItem("addressFormData")

//     if (bundle) setBundleData(JSON.parse(bundle))
//     if (endUser) setEndUserData(JSON.parse(endUser))
//     if (address) setAddressData(JSON.parse(address))
//   }, [])

//   const handleBack = () => {
//     onBack()
//   }

//   const handleSubmit = async () => {
//     setToast({
//       title: "Success",
//       description: "Review complete. Returning to main form.",
//       variant: "default",
//     })

//     setTimeout(() => {
//       onBack()
//     }, 1500)
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
//           <h1 className="text-3xl font-bold text-foreground">Review & Submit</h1>
//         </div>

//         {/* Bundle Information */}
//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>Bundle Information</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {bundleData ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Friendly Name</p>
//                   <p className="font-semibold text-base">{bundleData.friendly_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Country</p>
//                   <p className="font-semibold text-base">{bundleData.iso_country}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Number Type</p>
//                   <p className="font-semibold text-base">{bundleData.number_type}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Email</p>
//                   <p className="font-semibold text-base">{bundleData.email}</p>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-muted-foreground">No bundle data available</p>
//             )}
//           </CardContent>
//         </Card>

//         {/* End User Information */}
//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>End User Information</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {endUserData ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Friendly Name</p>
//                   <p className="font-semibold text-base">{endUserData.friendly_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">First Name</p>
//                   <p className="font-semibold text-base">{endUserData.first_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Last Name</p>
//                   <p className="font-semibold text-base">{endUserData.last_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Email</p>
//                   <p className="font-semibold text-base">{endUserData.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
//                   <p className="font-semibold text-base">{endUserData.phone_number}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Business Name</p>
//                   <p className="font-semibold text-base">{endUserData.business_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Business Registration Number</p>
//                   <p className="font-semibold text-base">{endUserData.business_registration_number}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Business Registration Identifier</p>
//                   <p className="font-semibold text-base">{endUserData.business_registration_identifier}</p>
//                 </div>
//                 <div className="md:col-span-2">
//                   <p className="text-sm text-muted-foreground mb-1">Business Website</p>
//                   <p className="font-semibold text-base">{endUserData.business_website}</p>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-muted-foreground">No end user data available</p>
//             )}
//           </CardContent>
//         </Card>

//         {/* Address Information */}
//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>Address Information</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {addressData ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Customer Name</p>
//                   <p className="font-semibold text-base">{addressData.customer_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Country Code</p>
//                   <p className="font-semibold text-base">{addressData.iso_country}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">City</p>
//                   <p className="font-semibold text-base">{addressData.city}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Region</p>
//                   <p className="font-semibold text-base">{addressData.region}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Postal Code</p>
//                   <p className="font-semibold text-base">{addressData.postal_code}</p>
//                 </div>
//                 <div className="md:col-span-2">
//                   <p className="text-sm text-muted-foreground mb-1">Street</p>
//                   <p className="font-semibold text-base">{addressData.street}</p>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-muted-foreground">No address data available</p>
//             )}
//           </CardContent>
//         </Card>

//         <div className="flex gap-2">
//           <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
//             Back
//           </Button>
//           <Button onClick={handleSubmit} className="flex-1" disabled={isLoading}>
//             Submit
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { useRouter } from "next/navigation"

// interface FinalSubmissionModalProps {
//   phoneNumber: string
//   bundleId: string
//   countryCode: string
//   onBack: () => void
// }

// interface BundleData {
//   friendly_name: string
//   iso_country: string
//   number_type: string
//   email: string
// }

// interface EndUserData {
//   friendly_name: string
//   business_name: string
//   business_registration_number: string
//   business_registration_identifier: string
//   business_website: string
//   first_name: string
//   last_name: string
//   email: string
//   phone_number: string
// }

// interface AddressData {
//   customer_name: string
//   street: string
//   city: string
//   region: string
//   postal_code: string
//   iso_country: string
// }

// export function FinalSubmissionModal({ phoneNumber, bundleId, countryCode, onBack }: FinalSubmissionModalProps) {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [bundleData, setBundleData] = useState<BundleData | null>(null)
//   const [endUserData, setEndUserData] = useState<EndUserData | null>(null)
//   const [addressData, setAddressData] = useState<AddressData | null>(null)
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const authToken = localStorage.getItem("authToken")

//   useEffect(() => {
//     const bundle = localStorage.getItem("bundleFormData")
//     const endUser = localStorage.getItem("endUserFormData")
//     const address = localStorage.getItem("addressFormData")

//     if (bundle) setBundleData(JSON.parse(bundle))
//     if (endUser) setEndUserData(JSON.parse(endUser))
//     if (address) setAddressData(JSON.parse(address))
//   }, [])

//   const handleBack = () => {
//     onBack()
//   }

//   const handleSubmit = async () => {
//     if (!bundleData || !endUserData || !addressData) {
//       setToast({
//         title: "Error",
//         description: "Missing required data",
//         variant: "destructive",
//       })
//       return
//     }

//     try {
//       setIsLoading(true)

//       // Create bundle
//       const bundleResponse = await axios.post(`${BASE_URL}/phone_number/bundles/create`, bundleData, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })

//       const bundleSid = bundleResponse.data.bundle.id

//       // Create end user
//       await axios.post(
//         `${BASE_URL}/phone_number/end-users/create`,
//         {
//           ...endUserData,
//           bundle_id: bundleSid,
//         },
//         {
//           headers: { Authorization: `Bearer ${authToken}` },
//         },
//       )

//       // Create address
//       await axios.post(
//         `${BASE_URL}/phone_number/addresses/create`,
//         {
//           ...addressData,
//           bundle_id: bundleSid,
//         },
//         {
//           headers: { Authorization: `Bearer ${authToken}` },
//         },
//       )

//       localStorage.removeItem("bundleFormData")
//       localStorage.removeItem("endUserFormData")
//       localStorage.removeItem("addressFormData")

//       setToast({
//         title: "Success",
//         description: "All information submitted successfully",
//         variant: "default",
//       })

//       setTimeout(() => {
//         onBack()
//       }, 1500)
//     } catch (err) {
//       console.log("[v0] Error submitting:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to submit information",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <LoaderOverlay isLoading={isLoading} message="Submitting..." />

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
//           <h1 className="text-3xl font-bold text-foreground">Review & Submit</h1>
//         </div>

//         {/* Bundle Information */}
//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>Bundle Information</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {bundleData ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Friendly Name</p>
//                   <p className="font-semibold text-base">{bundleData.friendly_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Country</p>
//                   <p className="font-semibold text-base">{bundleData.iso_country}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Number Type</p>
//                   <p className="font-semibold text-base">{bundleData.number_type}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Email</p>
//                   <p className="font-semibold text-base">{bundleData.email}</p>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-muted-foreground">No bundle data available</p>
//             )}
//           </CardContent>
//         </Card>

//         {/* End User Information */}
//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>End User Information</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {endUserData ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Friendly Name</p>
//                   <p className="font-semibold text-base">{endUserData.friendly_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">First Name</p>
//                   <p className="font-semibold text-base">{endUserData.first_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Last Name</p>
//                   <p className="font-semibold text-base">{endUserData.last_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Email</p>
//                   <p className="font-semibold text-base">{endUserData.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
//                   <p className="font-semibold text-base">{endUserData.phone_number}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Business Name</p>
//                   <p className="font-semibold text-base">{endUserData.business_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Business Registration Number</p>
//                   <p className="font-semibold text-base">{endUserData.business_registration_number}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Business Registration Identifier</p>
//                   <p className="font-semibold text-base">{endUserData.business_registration_identifier}</p>
//                 </div>
//                 <div className="md:col-span-2">
//                   <p className="text-sm text-muted-foreground mb-1">Business Website</p>
//                   <p className="font-semibold text-base">{endUserData.business_website}</p>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-muted-foreground">No end user data available</p>
//             )}
//           </CardContent>
//         </Card>

//         {/* Address Information */}
//         <Card className="border-2 border-border">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//             <CardTitle>Address Information</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {addressData ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Customer Name</p>
//                   <p className="font-semibold text-base">{addressData.customer_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Country Code</p>
//                   <p className="font-semibold text-base">{addressData.iso_country}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">City</p>
//                   <p className="font-semibold text-base">{addressData.city}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Region</p>
//                   <p className="font-semibold text-base">{addressData.region}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Postal Code</p>
//                   <p className="font-semibold text-base">{addressData.postal_code}</p>
//                 </div>
//                 <div className="md:col-span-2">
//                   <p className="text-sm text-muted-foreground mb-1">Street</p>
//                   <p className="font-semibold text-base">{addressData.street}</p>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-muted-foreground">No address data available</p>
//             )}
//           </CardContent>
//         </Card>

//         <div className="flex gap-2">
//           <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
//             Back
//           </Button>
//           <Button onClick={handleSubmit} className="flex-1" disabled={isLoading}>
//             Submit Purchase
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
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "@/components/auth/loader-overlay"
import { ToastNotification } from "@/components/auth/toast-notification"

interface FinalSubmissionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack: () => void
  onSuccess: (bundleData: any) => void
}

interface BundleData {
  bundle: any
  endUser: any
  address: any
}

export function FinalSubmissionModal({ open, onOpenChange, onBack, onSuccess }: FinalSubmissionModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [toast, setToast] = useState<any>(null)
  const [bundleData, setBundleData] = useState<BundleData>({ bundle: {}, endUser: {}, address: {} })
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsHydrated(true)
      if (open) {
        const bundle = localStorage.getItem("bundleData") ? JSON.parse(localStorage.getItem("bundleData") || "{}") : {}
        const endUser = localStorage.getItem("endUserData")
          ? JSON.parse(localStorage.getItem("endUserData") || "{}")
          : {}
        const address = localStorage.getItem("addressData")
          ? JSON.parse(localStorage.getItem("addressData") || "{}")
          : {}
        setBundleData({ bundle, endUser, address })
      }
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      setIsLoading(true)
      const authToken = localStorage.getItem("authToken")

      if (!authToken) {
        setError("Authentication token not found")
        return
      }

      const { bundle, endUser, address } = bundleData

      // Validate data
      if (!bundle.friendly_name || !bundle.country_code || !bundle.number_type || !bundle.email) {
        setError("Bundle data is incomplete")
        return
      }

      if (
        !endUser.friendly_name ||
        !endUser.first_name ||
        !endUser.last_name ||
        !endUser.email ||
        !endUser.phone_number
      ) {
        setError("End user data is incomplete")
        return
      }

      if (!address.customer_name || !address.street || !address.city || !address.iso_country) {
        setError("Address data is incomplete")
        return
      }

      // Create Bundle
      const bundleResponse = await axios.post(
        `${BASE_URL}/phone_number/bundles/create`,
        {
          friendly_name: bundle.friendly_name,
          iso_country: bundle.country_code,
          number_type: bundle.number_type,
          email: bundle.email,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      )

      const bundleId = bundleResponse.data.bundle.id

      // Create End User
      await axios.post(
        `${BASE_URL}/phone_number/end-users/create`,
        {
          friendly_name: endUser.friendly_name,
          business_name: endUser.business_name,
          business_registration_number: endUser.business_registration_number,
          business_registration_identifier: endUser.business_registration_identifier,
          business_website: endUser.business_website,
          first_name: endUser.first_name,
          last_name: endUser.last_name,
          email: endUser.email,
          phone_number: endUser.phone_number,
          bundle_id: bundleId,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      )

      // Create Address
      await axios.post(
        `${BASE_URL}/phone_number/addresses/create`,
        {
          customer_name: address.customer_name,
          street: address.street,
          city: address.city,
          region: address.region,
          postal_code: address.postal_code,
          iso_country: address.iso_country,
          bundle_id: bundleId,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      )

      if (typeof window !== "undefined") {
        localStorage.removeItem("bundleData")
        localStorage.removeItem("endUserData")
        localStorage.removeItem("addressData")
      }

      setToast({
        title: "Success",
        description: "Bundle created successfully",
        variant: "default",
      })

      onSuccess({ id: bundleId, ...bundle })
    } catch (err) {
      console.log("[v0] Error submitting bundle:", err)
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.error || "Failed to create bundle"
        setError(errorMessage)
      } else {
        setError("An error occurred while creating the bundle")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!isHydrated) {
    return null
  }

  const { bundle, endUser, address } = bundleData

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" showCloseButton={false}>
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
          <DialogTitle className="text-2xl">Review & Submit</DialogTitle>
          <DialogDescription>Verify all information before submission</DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Bundle Info */}
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-3">Bundle Information</h3>
            <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-2">
              <p>
                <span className="font-medium">Name:</span> {bundle.friendly_name}
              </p>
              <p>
                <span className="font-medium">Country:</span> {bundle.country_code}
              </p>
              <p>
                <span className="font-medium">Number Type:</span> {bundle.number_type}
              </p>
              <p>
                <span className="font-medium">Email:</span> {bundle.email}
              </p>
            </div>
          </div>

          {/* End User Info */}
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-3">End User Information</h3>
            <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-2">
              <p>
                <span className="font-medium">Friendly Name:</span> {endUser.friendly_name}
              </p>
              <p>
                <span className="font-medium">Business:</span> {endUser.business_name}
              </p>
              <p>
                <span className="font-medium">Name:</span> {endUser.first_name} {endUser.last_name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {endUser.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {endUser.phone_number}
              </p>
            </div>
          </div>

          {/* Address Info */}
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-3">Address Information</h3>
            <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-2">
              <p>
                <span className="font-medium">Customer:</span> {address.customer_name}
              </p>
              <p>
                <span className="font-medium">Street:</span> {address.street}
              </p>
              <p>
                <span className="font-medium">City:</span> {address.city}
              </p>
              <p>
                <span className="font-medium">Country:</span> {address.iso_country}
              </p>
              <p>
                <span className="font-medium">Postal:</span> {address.postal_code}
              </p>
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
              onClick={handleSubmit}
              disabled={isLoading}
              className="cursor-pointer flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
