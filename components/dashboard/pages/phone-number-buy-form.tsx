// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ArrowRight, ArrowLeft, Plus, ChevronDown } from "lucide-react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { BundleCreateModal } from "./bundle-create-modal"
// import { AddressCreateModal } from "./address-create-modal"
// import { DocumentUploadForm } from "./document-upload-form"
// import { FinalBundleSubmission } from "./final-bundle-submission"
// import { useRouter } from "next/navigation"

// type Step = "phone-form" | "document-upload" | "final-submission"

// interface PhoneFormData {
//   phone_number: string
//   area_code: string
//   country: string
//   bundle_id: string
//   address_id: string
// }

// interface Bundle {
//   id: string
//   friendly_name: string
// }

// interface Address {
//   id: string
//   customer_name: string
// }

// export function PhoneNumberBuyForm() {
//   const [currentStep, setCurrentStep] = useState<Step>("phone-form")
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)
//   const [showBundleModal, setShowBundleModal] = useState(false)
//   const [showAddressModal, setShowAddressModal] = useState(false)
//   const [bundles, setBundles] = useState<Bundle[]>([])
//   const [addresses, setAddresses] = useState<Address[]>([])
//   const router = useRouter()

//   const [formData, setFormData] = useState<PhoneFormData>({
//     phone_number: "",
//     area_code: "",
//     country: "US",
//     bundle_id: "",
//     address_id: "",
//   })

//   const [documentData, setDocumentData] = useState({
//     bundle_id: "",
//     document_type: "",
//     file: null as File | null,
//   })

//   const handlePhoneFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handlePhoneFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     if (!formData.bundle_id || !formData.address_id) {
//       setError("Please select both Bundle and Address")
//       return
//     }

//     try {
//       setIsLoading(true)
//       const authToken = localStorage.getItem("authToken")

//       if (!authToken) {
//         setError("Authentication token not found")
//         setIsLoading(false)
//         return
//       }

//       const response = await axios.post(
//         `${BASE_URL}/phone_number/buy`,
//         {
//           phone_number: formData.phone_number || undefined,
//           area_code: formData.area_code || undefined,
//           country: formData.country,
//           bundle_id: formData.bundle_id,
//           address_id: formData.address_id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         },
//       )

//       console.log("[v0] Phone number form submitted:", response.data)
//       setDocumentData((prev) => ({
//         ...prev,
//         bundle_id: formData.bundle_id,
//       }))
//       setCurrentStep("document-upload")
//       setToast({
//         title: "Success",
//         description: "Phone number form submitted successfully",
//         variant: "default",
//       })
//     } catch (err) {
//       console.log("[v0] Error submitting phone form:", err)
//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.error || "Failed to submit phone form"
//         setError(errorMessage)
//         setToast({
//           title: "Error",
//           description: errorMessage,
//           variant: "destructive",
//         })
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleBundleCreated = (bundle: Bundle) => {
//     setBundles((prev) => [...prev, bundle])
//     setFormData((prev) => ({
//       ...prev,
//       bundle_id: bundle.id,
//     }))
//     setShowBundleModal(false)
//   }

//   const handleAddressCreated = (address: Address) => {
//     setAddresses((prev) => [...prev, address])
//     setFormData((prev) => ({
//       ...prev,
//       address_id: address.id,
//     }))
//     setShowAddressModal(false)
//   }

//   const handleCancel = () => {
//     router.back()
//   }

//   if (currentStep === "document-upload") {
//     return (
//       <DocumentUploadForm
//         bundleId={documentData.bundle_id}
//         onBack={() => setCurrentStep("phone-form")}
//         onNext={() => setCurrentStep("final-submission")}
//       />
//     )
//   }

//   if (currentStep === "final-submission") {
//     return (
//       <FinalBundleSubmission
//         bundleId={documentData.bundle_id}
//         phoneFormData={formData}
//         onBack={() => setCurrentStep("document-upload")}
//       />
//     )
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

//       <div className="p-4 md:p-8 space-y-8">
//         {/* Header with Progress */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-foreground">Buy Phone Number</h1>
//               <p className="text-muted-foreground mt-2">Step 1 of 3: Enter phone number details</p>
//             </div>
//             <div className="flex items-center gap-2 text-sm">
//               <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-semibold">1</span>
//               <span className="text-muted-foreground">→</span>
//               <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">2</span>
//               <span className="text-muted-foreground">→</span>
//               <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">3</span>
//             </div>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm font-medium">
//             {error}
//           </div>
//         )}

//         {/* Form Card */}
//         <Card className="border-2 border-border max-w-3xl shadow-lg">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border">
//             <CardTitle className="text-2xl">Phone Number Details</CardTitle>
//             <CardDescription>Provide the details for your new phone number</CardDescription>
//           </CardHeader>
//           <CardContent className="pt-8">
//             <form onSubmit={handlePhoneFormSubmit} className="space-y-8">
//               {/* Grid Layout for Form Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Phone Number Field */}
//                 <div className="md:col-span-1">
//                   <label className="block text-sm font-semibold text-foreground mb-3">Phone Number</label>
//                   <div className="relative">
//                     <Input
//                       type="tel"
//                       name="phone_number"
//                       placeholder="+14155551234"
//                       value={formData.phone_number}
//                       onChange={handlePhoneFormChange}
//                       className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 transition-all duration-200 bg-background"
//                     />
//                   </div>
//                   <p className="text-xs text-muted-foreground mt-2">Optional: Specify a specific number</p>
//                 </div>

//                 {/* Area Code Field */}
//                 <div className="md:col-span-1">
//                   <label className="block text-sm font-semibold text-foreground mb-3">Area Code</label>
//                   <div className="relative">
//                     <Input
//                       type="text"
//                       name="area_code"
//                       placeholder="415"
//                       value={formData.area_code}
//                       onChange={handlePhoneFormChange}
//                       className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 transition-all duration-200 bg-background"
//                     />
//                   </div>
//                   <p className="text-xs text-muted-foreground mt-2">Optional: Search by area code</p>
//                 </div>
//               </div>

//               {/* Country Field */}
//               <div>
//                 <label className="block text-sm font-semibold text-foreground mb-3">Country</label>
//                 <div className="relative">
//                   <select
//                     name="country"
//                     value={formData.country}
//                     onChange={handlePhoneFormChange}
//                     className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 appearance-none cursor-pointer font-medium"
//                   >
//                     <option value="US">United States</option>
//                     <option value="CA">Canada</option>
//                     <option value="GB">United Kingdom</option>
//                     <option value="AU">Australia</option>
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
//                 </div>
//               </div>

//               {/* Bundle Select */}
//               <div>
//                 <div className="flex items-center justify-between mb-3">
//                   <label className="block text-sm font-semibold text-foreground">Bundle *</label>
//                   <button
//                     type="button"
//                     onClick={() => setShowBundleModal(true)}
//                     className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Create Bundle
//                   </button>
//                 </div>
//                 <div className="relative">
//                   <select
//                     name="bundle_id"
//                     value={formData.bundle_id}
//                     onChange={handlePhoneFormChange}
//                     className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 appearance-none cursor-pointer font-medium"
//                   >
//                     <option value="">Select a bundle</option>
//                     {bundles.map((bundle) => (
//                       <option key={bundle.id} value={bundle.id}>
//                         {bundle.friendly_name}
//                       </option>
//                     ))}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
//                 </div>
//               </div>

//               {/* Address Select */}
//               <div>
//                 <div className="flex items-center justify-between mb-3">
//                   <label className="block text-sm font-semibold text-foreground">Address *</label>
//                   <button
//                     type="button"
//                     onClick={() => setShowAddressModal(true)}
//                     className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Create Address
//                   </button>
//                 </div>
//                 <div className="relative">
//                   <select
//                     name="address_id"
//                     value={formData.address_id}
//                     onChange={handlePhoneFormChange}
//                     className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 appearance-none cursor-pointer font-medium"
//                   >
//                     <option value="">Select an address</option>
//                     {addresses.map((address) => (
//                       <option key={address.id} value={address.id}>
//                         {address.customer_name}
//                       </option>
//                     ))}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-3 pt-6 border-t border-border">
//                 <Button
//                   type="button"
//                   onClick={handleCancel}
//                   variant="outline"
//                   className="flex-1 border-2 border-border hover:bg-muted bg-transparent text-foreground font-semibold transition-all duration-200"
//                 >
//                   <ArrowLeft className="w-4 h-4 mr-2" />
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   disabled={isLoading}
//                   className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
//                 >
//                   Next
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Modals */}
//       {showBundleModal && (
//         <BundleCreateModal onClose={() => setShowBundleModal(false)} onBundleCreated={handleBundleCreated} />
//       )}

//       {showAddressModal && (
//         <AddressCreateModal onClose={() => setShowAddressModal(false)} onAddressCreated={handleAddressCreated} />
//       )}
//     </div>
//   )
// }


// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ArrowRight, ArrowLeft, Plus, ChevronDown } from "lucide-react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { BundleCreateModal } from "./bundle-create-modal"
// import { AddressCreateModal } from "./address-create-modal"
// import { DocumentUploadForm } from "./document-upload-form"
// import { FinalBundleSubmission } from "./final-bundle-submission"
// import { useRouter } from "next/navigation"

// type Step = "phone-form" | "document-upload" | "final-submission"

// interface PhoneFormData {
//   phone_number: string
//   area_code: string
//   country: string
//   bundle_id: string
//   address_id: string
// }

// interface Bundle {
//   id: string
//   friendly_name: string
// }

// interface Address {
//   id: string
//   customer_name: string
// }

// export function PhoneNumberBuyForm() {
//   const [currentStep, setCurrentStep] = useState<Step>("phone-form")
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)
//   const [showBundleModal, setShowBundleModal] = useState(false)
//   const [showAddressModal, setShowAddressModal] = useState(false)
//   const [bundles, setBundles] = useState<Bundle[]>([])
//   const [addresses, setAddresses] = useState<Address[]>([])
//   const router = useRouter()

//   const [formData, setFormData] = useState<PhoneFormData>({
//     phone_number: "",
//     area_code: "",
//     country: "US",
//     bundle_id: "",
//     address_id: "",
//   })

//   const [documentData, setDocumentData] = useState({
//     bundle_id: "",
//     document_type: "",
//     file: null as File | null,
//   })

//   const handlePhoneFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handlePhoneFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     if (!formData.bundle_id || !formData.address_id) {
//       setError("Please select both Bundle and Address")
//       return
//     }

//     try {
//       setIsLoading(true)
//       const authToken = localStorage.getItem("authToken")

//       if (!authToken) {
//         setError("Authentication token not found")
//         setIsLoading(false)
//         return
//       }

//       const response = await axios.post(
//         `${BASE_URL}/phone_number/buy`,
//         {
//           phone_number: formData.phone_number || undefined,
//           area_code: formData.area_code || undefined,
//           country: formData.country,
//           bundle_id: formData.bundle_id,
//           address_id: formData.address_id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         },
//       )

//       console.log("[v0] Phone number form submitted:", response.data)
//       setDocumentData((prev) => ({
//         ...prev,
//         bundle_id: formData.bundle_id,
//       }))
//       setCurrentStep("document-upload")
//       setToast({
//         title: "Success",
//         description: "Phone number form submitted successfully",
//         variant: "default",
//       })
//     } catch (err) {
//       console.log("[v0] Error submitting phone form:", err)
//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.error || "Failed to submit phone form"
//         setError(errorMessage)
//         setToast({
//           title: "Error",
//           description: errorMessage,
//           variant: "destructive",
//         })
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleBundleCreated = (bundle: Bundle) => {
//     setBundles((prev) => [...prev, bundle])
//     setFormData((prev) => ({
//       ...prev,
//       bundle_id: bundle.id,
//     }))
//     setShowBundleModal(false)
//   }

//   const handleAddressCreated = (address: Address) => {
//     setAddresses((prev) => [...prev, address])
//     setFormData((prev) => ({
//       ...prev,
//       address_id: address.id,
//     }))
//     setShowAddressModal(false)
//   }

//   const handleCancel = () => {
//     router.back()
//   }

//   if (currentStep === "document-upload") {
//     return (
//       <DocumentUploadForm
//         bundleId={documentData.bundle_id}
//         onBack={() => setCurrentStep("phone-form")}
//         onNext={() => setCurrentStep("final-submission")}
//       />
//     )
//   }

//   if (currentStep === "final-submission") {
//     return (
//       <FinalBundleSubmission
//         bundleId={documentData.bundle_id}
//         phoneFormData={formData}
//         onBack={() => setCurrentStep("document-upload")}
//       />
//     )
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

//       <div className="p-4 md:p-8 space-y-8">
//         {/* Header with Progress */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-foreground">Buy Phone Number</h1>
//               <p className="text-muted-foreground mt-2">Step 1 of 3: Enter phone number details</p>
//             </div>
//             <div className="flex items-center gap-2 text-sm">
//               <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-semibold">1</span>
//               <span className="text-muted-foreground">→</span>
//               <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">2</span>
//               <span className="text-muted-foreground">→</span>
//               <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">3</span>
//             </div>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm font-medium">
//             {error}
//           </div>
//         )}

//         <div className="flex justify-center">
//           {/* Form Card */}
//           <Card className="border-2 border-border w-full max-w-2xl shadow-lg">
//             <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border p-6">
//               <CardTitle className="text-2xl">Phone Number Details</CardTitle>
//               <CardDescription>Provide the details for your new phone number</CardDescription>
//             </CardHeader>
//             <CardContent className="pt-8 bg-background/80 rounded-b-lg">
//               <form onSubmit={handlePhoneFormSubmit} className="space-y-8">
//                 {/* Grid Layout for Form Fields */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Phone Number Field */}
//                   <div className="md:col-span-1">
//                     <label className="block text-sm font-semibold text-foreground mb-3">Phone Number</label>
//                     <div className="relative">
//                       <Input
//                         type="tel"
//                         name="phone_number"
//                         placeholder="+14155551234"
//                         value={formData.phone_number}
//                         onChange={handlePhoneFormChange}
//                         className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 transition-all duration-200 bg-background"
//                       />
//                     </div>
//                     <p className="text-xs text-muted-foreground mt-2">Optional: Specify a specific number</p>
//                   </div>

//                   {/* Area Code Field */}
//                   <div className="md:col-span-1">
//                     <label className="block text-sm font-semibold text-foreground mb-3">Area Code</label>
//                     <div className="relative">
//                       <Input
//                         type="text"
//                         name="area_code"
//                         placeholder="415"
//                         value={formData.area_code}
//                         onChange={handlePhoneFormChange}
//                         className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 transition-all duration-200 bg-background"
//                       />
//                     </div>
//                     <p className="text-xs text-muted-foreground mt-2">Optional: Search by area code</p>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-foreground mb-3">Country</label>
//                   <div className="relative">
//                     <Input
//                       type="text"
//                       name="country"
//                       placeholder="US"
//                       value={formData.country}
//                       onChange={handlePhoneFormChange}
//                       className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 transition-all duration-200 bg-background"
//                     />
//                   </div>
//                   <p className="text-xs text-muted-foreground mt-2">Enter country code (e.g., US, CA, GB)</p>
//                 </div>

//                 {/* Bundle Select */}
//                 <div>
//                   <div className="flex items-center justify-between mb-3">
//                     <label className="block text-sm font-semibold text-foreground">Bundle *</label>
//                     <button
//                       type="button"
//                       onClick={() => setShowBundleModal(true)}
//                       className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
//                     >
//                       <Plus className="w-4 h-4" />
//                       Create Bundle
//                     </button>
//                   </div>
//                   <div className="relative">
//                     <select
//                       name="bundle_id"
//                       value={formData.bundle_id}
//                       onChange={handlePhoneFormChange}
//                       className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 appearance-none cursor-pointer font-medium"
//                     >
//                       <option value="">Select a bundle</option>
//                       {bundles.map((bundle) => (
//                         <option key={bundle.id} value={bundle.id}>
//                           {bundle.friendly_name}
//                         </option>
//                       ))}
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
//                   </div>
//                 </div>

//                 {/* Address Select */}
//                 <div>
//                   <div className="flex items-center justify-between mb-3">
//                     <label className="block text-sm font-semibold text-foreground">Address *</label>
//                     <button
//                       type="button"
//                       onClick={() => setShowAddressModal(true)}
//                       className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
//                     >
//                       <Plus className="w-4 h-4" />
//                       Create Address
//                     </button>
//                   </div>
//                   <div className="relative">
//                     <select
//                       name="address_id"
//                       value={formData.address_id}
//                       onChange={handlePhoneFormChange}
//                       className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 appearance-none cursor-pointer font-medium"
//                     >
//                       <option value="">Select an address</option>
//                       {addresses.map((address) => (
//                         <option key={address.id} value={address.id}>
//                           {address.customer_name}
//                         </option>
//                       ))}
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex gap-3 pt-6 border-t border-border">
//                   <Button
//                     type="button"
//                     onClick={handleCancel}
//                     variant="outline"
//                     className="flex-1 border-2 border-border hover:bg-muted bg-gradient-to-r from-primary/20 to-primary/20 dark:hover:text-white/50 text-foreground font-semibold transition-all duration-200"
//                   >
//                     <ArrowLeft className="w-4 h-4 mr-2" />
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     disabled={isLoading}
//                     className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
//                   >
//                     Next
//                     <ArrowRight className="w-4 h-4 ml-2" />
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Modals */}
//       {showBundleModal && (
//         <BundleCreateModal onClose={() => setShowBundleModal(false)} onBundleCreated={handleBundleCreated} />
//       )}

//       {showAddressModal && (
//         <AddressCreateModal onClose={() => setShowAddressModal(false)} onAddressCreated={handleAddressCreated} />
//       )}
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft, Plus, ChevronDown } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "@/components/auth/loader-overlay"
import { ToastNotification } from "@/components/auth/toast-notification"
import { BundleCreateModal } from "./bundle-create-modal"
import { AddressCreateModal } from "./address-create-modal"
import { DocumentUploadForm } from "./document-upload-form"
import { FinalBundleSubmission } from "./final-bundle-submission"
import { useRouter } from "next/navigation"

type Step = "phone-form" | "document-upload" | "final-submission"

interface PhoneFormData {
  phone_number: string
  area_code: string
  country: string
  bundle_id: string
  address_id: string
}

interface Bundle {
  id: string
  friendly_name: string
}

interface Address {
  id: string
  customer_name: string
  street: string
  city: string
  postal_code: string
}

export function PhoneNumberBuyForm() {
  const [currentStep, setCurrentStep] = useState<Step>("phone-form")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState("")
  const [toast, setToast] = useState<{
    title: string
    description: string
    variant: "default" | "destructive"
  } | null>(null)
  const [showBundleModal, setShowBundleModal] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [bundles, setBundles] = useState<Bundle[]>([])
  const [addresses, setAddresses] = useState<Address[]>([])
  const router = useRouter()

  const [formData, setFormData] = useState<PhoneFormData>({
    phone_number: "",
    area_code: "",
    country: "US",
    bundle_id: "",
    address_id: "",
  })

  const [documentData, setDocumentData] = useState({
    bundle_id: "",
    document_type: "",
    file: null as File | null,
  })

  useEffect(() => {
    fetchBundlesAndAddresses()
  }, [])

  const fetchBundlesAndAddresses = async () => {
    try {
      setIsFetching(true)
      const authToken = localStorage.getItem("authToken")

      if (!authToken) {
        setError("Authentication token not found")
        setIsFetching(false)
        return
      }

      const bundlesResponse = await axios.get(`${BASE_URL}/phone_number/bundles`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      console.log("[v0] Bundles fetched:", bundlesResponse.data)
      setBundles(bundlesResponse.data.results || [])

      const addressesResponse = await axios.get(`${BASE_URL}/phone_number/addresses`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      console.log("[v0] Addresses fetched:", addressesResponse.data)
      setAddresses(addressesResponse.data.results || [])
    } catch (err) {
      console.log("[v0] Error fetching bundles/addresses:", err)
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.error || "Failed to fetch data"
        setError(errorMessage)
      }
    } finally {
      setIsFetching(false)
    }
  }

  const handlePhoneFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePhoneFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.bundle_id || !formData.address_id) {
      setError("Please select both Bundle and Address")
      return
    }

    try {
      setIsLoading(true)
      const authToken = localStorage.getItem("authToken")

      if (!authToken) {
        setError("Authentication token not found")
        setIsLoading(false)
        return
      }

      const response = await axios.post(
        `${BASE_URL}/phone_number/buy`,
        {
          phone_number: formData.phone_number || undefined,
          area_code: formData.area_code || undefined,
          country: formData.country,
          bundle_id: formData.bundle_id,
          address_id: formData.address_id,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )

      console.log("[v0] Phone number form submitted:", response.data)
      setDocumentData((prev) => ({
        ...prev,
        bundle_id: formData.bundle_id,
      }))
      setCurrentStep("document-upload")
      setToast({
        title: "Success",
        description: "Phone number form submitted successfully",
        variant: "default",
      })
    } catch (err) {
      console.log("[v0] Error submitting phone form:", err)
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.error || "Failed to submit phone form"
        setError(errorMessage)
        setToast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleBundleCreated = (bundle: Bundle) => {
    setBundles((prev) => [...prev, bundle])
    setFormData((prev) => ({
      ...prev,
      bundle_id: bundle.id,
    }))
    setShowBundleModal(false)
    fetchBundlesAndAddresses()
  }

  const handleAddressCreated = (address: Address) => {
    setAddresses((prev) => [...prev, address])
    setFormData((prev) => ({
      ...prev,
      address_id: address.id,
    }))
    setShowAddressModal(false)
    fetchBundlesAndAddresses()
  }

  const handleCancel = () => {
    router.back()
  }

  if (currentStep === "document-upload") {
    return (
      <DocumentUploadForm
        bundleId={documentData.bundle_id}
        onBack={() => setCurrentStep("phone-form")}
        onNext={() => setCurrentStep("final-submission")}
      />
    )
  }

  if (currentStep === "final-submission") {
    return (
      <FinalBundleSubmission
        bundleId={documentData.bundle_id}
        phoneFormData={formData}
        onBack={() => setCurrentStep("document-upload")}
      />
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <LoaderOverlay isLoading={isLoading || isFetching} message={isFetching ? "Loading data..." : "Processing..."} />

      {toast && (
        <ToastNotification
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}

      <div className="p-4 md:p-8 space-y-8">
        {/* Header with Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Buy Phone Number</h1>
              <p className="text-muted-foreground mt-2">Step 1 of 3: Enter phone number details</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-semibold">1</span>
              <span className="text-muted-foreground">→</span>
              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">2</span>
              <span className="text-muted-foreground">→</span>
              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">3</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm font-medium">
            {error}
          </div>
        )}

        <div className="flex justify-center">
          {/* Form Card */}
          <Card className="border-2 border-border w-full max-w-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border p-6">
              <CardTitle className="text-2xl">Phone Number Details</CardTitle>
              <CardDescription>Provide the details for your new phone number</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 bg-background">
              <form onSubmit={handlePhoneFormSubmit} className="space-y-8">
                {/* Grid Layout for Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number Field */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-semibold text-foreground mb-3">Phone Number</label>
                    <div className="relative">
                      <Input
                        type="tel"
                        name="phone_number"
                        placeholder="+14155551234"
                        value={formData.phone_number}
                        onChange={handlePhoneFormChange}
                        className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 transition-all duration-200 bg-background"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Optional: Specify a specific number</p>
                  </div>

                  {/* Area Code Field */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-semibold text-foreground mb-3">Area Code</label>
                    <div className="relative">
                      <Input
                        type="text"
                        name="area_code"
                        placeholder="415"
                        value={formData.area_code}
                        onChange={handlePhoneFormChange}
                        className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 transition-all duration-200 bg-background"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Optional: Search by area code</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Country</label>
                  <div className="relative">
                    <Input
                      type="text"
                      name="country"
                      placeholder="US"
                      value={formData.country}
                      onChange={handlePhoneFormChange}
                      className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 transition-all duration-200 bg-background"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Enter country code (e.g., US, CA, GB)</p>
                </div>

                {/* Bundle Select */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-foreground">Bundle *</label>
                    <button
                      type="button"
                      onClick={() => setShowBundleModal(true)}
                      className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      Create Bundle
                    </button>
                  </div>
                  <div className="relative">
                    <select
                      name="bundle_id"
                      value={formData.bundle_id}
                      onChange={handlePhoneFormChange}
                      className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 appearance-none cursor-pointer font-medium"
                    >
                      <option value="">Select a bundle</option>
                      {bundles.map((bundle) => (
                        <option key={bundle.id} value={bundle.id}>
                          {bundle.friendly_name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* Address Select */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-foreground">Address *</label>
                    <button
                      type="button"
                      onClick={() => setShowAddressModal(true)}
                      className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      Create Address
                    </button>
                  </div>
                  <div className="relative">
                    <select
                      name="address_id"
                      value={formData.address_id}
                      onChange={handlePhoneFormChange}
                      className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 appearance-none cursor-pointer font-medium"
                    >
                      <option value="">Select an address</option>
                      {addresses.map((address) => (
                        <option key={address.id} value={address.id}>
                          {address.street}, {address.city}-{address.postal_code}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button
                    type="button"
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1 border-2 border-border hover:bg-muted bg-gradient-to-r from-primary/20 to-primary/20 dark:hover:text-white/50 text-foreground font-semibold transition-all duration-200"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {showBundleModal && (
        <BundleCreateModal onClose={() => setShowBundleModal(false)} onBundleCreated={handleBundleCreated} />
      )}

      {showAddressModal && (
        <AddressCreateModal onClose={() => setShowAddressModal(false)} onAddressCreated={handleAddressCreated} />
      )}
    </div>
  )
}

