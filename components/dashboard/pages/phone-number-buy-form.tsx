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


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
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
//   street: string
//   city: string
//   postal_code: string
// }

// export function PhoneNumberBuyForm() {
//   const [currentStep, setCurrentStep] = useState<Step>("phone-form")
//   const [isLoading, setIsLoading] = useState(false)
//   const [isFetching, setIsFetching] = useState(true)
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

//   useEffect(() => {
//     fetchBundlesAndAddresses()
//   }, [])

//   const fetchBundlesAndAddresses = async () => {
//     try {
//       setIsFetching(true)
//       const authToken = localStorage.getItem("authToken")

//       if (!authToken) {
//         setError("Authentication token not found")
//         setIsFetching(false)
//         return
//       }

//       const bundlesResponse = await axios.get(`${BASE_URL}/phone_number/bundles`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })

//       console.log("[v0] Bundles fetched:", bundlesResponse.data)
//       setBundles(bundlesResponse.data.results || [])

//       const addressesResponse = await axios.get(`${BASE_URL}/phone_number/addresses`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })

//       console.log("[v0] Addresses fetched:", addressesResponse.data)
//       setAddresses(addressesResponse.data.results || [])
//     } catch (err) {
//       console.log("[v0] Error fetching bundles/addresses:", err)
//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.error || "Failed to fetch data"
//         setError(errorMessage)
//       }
//     } finally {
//       setIsFetching(false)
//     }
//   }

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

//     // if (!formData.bundle_id || !formData.address_id) {
//     //   setError("Please select both Bundle and Address")
//     //   return
//     // }

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
//     fetchBundlesAndAddresses()
//   }

//   const handleAddressCreated = (address: Address) => {
//     setAddresses((prev) => [...prev, address])
//     setFormData((prev) => ({
//       ...prev,
//       address_id: address.id,
//     }))
//     setShowAddressModal(false)
//     fetchBundlesAndAddresses()
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
//       <LoaderOverlay isLoading={isLoading || isFetching} message={isFetching ? "Loading data..." : "Processing..."} />

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
//             <CardContent className="pt-8 bg-background">
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
//                           {address.street}, {address.city}-{address.postal_code}
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

// "use client"
// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ArrowLeft, ChevronDown, Search, Plus } from "lucide-react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { BundleSelectModal } from "./bundle-select-modal"
// import { useRouter } from "next/navigation"

// interface Country {
//   country: string
//   country_code: string
//   beta: boolean
// }

// interface PhoneNumber {
//   phone_number: string
//   friendly_name: string
//   iso_country: string
//   locality: string
//   region: string
//   latitude: string
//   longitude: string
//   capabilities: {
//     voice: boolean
//     SMS: boolean
//     MMS: boolean
//   }
// }

// export function PhoneNumberBuyForm() {
//   const router = useRouter()
//   const [step, setStep] = useState<"country" | "phone" | "bundle">("country")
//   const [isLoading, setIsLoading] = useState(false)
//   const [isFetching, setIsFetching] = useState(false)
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   // Country selection
//   const [countries, setCountries] = useState<Country[]>([])
//   const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
//   const [countrySearch, setCountrySearch] = useState("")
//   const [selectedCountry, setSelectedCountry] = useState<string>("")
//   const [showCountryDropdown, setShowCountryDropdown] = useState(false)

//   // Phone number selection
//   const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([])
//   const [filteredPhoneNumbers, setFilteredPhoneNumbers] = useState<PhoneNumber[]>([])
//   const [phoneSearch, setPhoneSearch] = useState("")
//   const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<PhoneNumber | null>(null)

//   // Modals
//   const [showBundleModal, setShowBundleModal] = useState(false)

//   useEffect(() => {
//     fetchCountries()
//   }, [])

//   const fetchCountries = async () => {
//     try {
//       setIsFetching(true)
//       const authToken = localStorage.getItem("authToken")

//       if (!authToken) {
//         setToast({
//           title: "Error",
//           description: "Authentication token not found",
//           variant: "destructive",
//         })
//         return
//       }

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
//       setToast({
//         title: "Error",
//         description: "Failed to fetch countries",
//         variant: "destructive",
//       })
//     } finally {
//       setIsFetching(false)
//     }
//   }

//   const handleCountrySearch = async (value: string) => {
//     setCountrySearch(value)

//     if (!value.trim()) {
//       setFilteredCountries(countries)
//       return
//     }

//     try {
//       const authToken = localStorage.getItem("authToken")
//       if (!authToken) return

//       const response = await axios.get(`${BASE_URL}/phone_number/countries?search=${value}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })

//       console.log("[v0] Countries search result:", response.data)
//       setFilteredCountries(response.data.countries || [])
//     } catch (err) {
//       console.log("[v0] Error searching countries:", err)
//     }
//   }

//   const handleCountrySelect = async (countryCode: string) => {
//     setSelectedCountry(countryCode)
//     setShowCountryDropdown(false)
//     setStep("phone")
//     setPhoneNumbers([])
//     setPhoneSearch("")

//     // Fetch phone numbers for selected country
//     try {
//       setIsFetching(true)
//       const authToken = localStorage.getItem("authToken")

//       if (!authToken) return

//       const response = await axios.get(`${BASE_URL}/phone_number/available_phone_numbers?country=${countryCode}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })

//       console.log("[v0] Phone numbers fetched:", response.data)
//       setPhoneNumbers(response.data.phone_numbers || [])
//       setFilteredPhoneNumbers(response.data.phone_numbers || [])
//     } catch (err) {
//       console.log("[v0] Error fetching phone numbers:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to fetch phone numbers",
//         variant: "destructive",
//       })
//     } finally {
//       setIsFetching(false)
//     }
//   }

//   const handlePhoneSearch = async (value: string) => {
//     setPhoneSearch(value)

//     if (!value.trim()) {
//       setFilteredPhoneNumbers(phoneNumbers)
//       return
//     }

//     try {
//       const authToken = localStorage.getItem("authToken")
//       if (!authToken) return

//       const response = await axios.get(
//         `${BASE_URL}/phone_number/available_phone_numbers?country=${selectedCountry}&search=${value}`,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         },
//       )

//       console.log("[v0] Phone numbers search result:", response.data)
//       setFilteredPhoneNumbers(response.data.phone_numbers || [])
//     } catch (err) {
//       console.log("[v0] Error searching phone numbers:", err)
//     }
//   }

//   const handlePhoneSelect = (phone: PhoneNumber) => {
//     setSelectedPhoneNumber(phone)
//     setStep("bundle")
//   }

//   const handleBuyClick = () => {
//     if (selectedPhoneNumber) {
//       setShowBundleModal(true)
//     }
//   }

//   if (step === "country") {
//     return (
//       <div className="flex-1 overflow-y-auto bg-background">
//         <LoaderOverlay isLoading={isLoading || isFetching} message={isFetching ? "Loading data..." : "Processing..."} />

//         {toast && (
//           <ToastNotification
//             title={toast.title}
//             description={toast.description}
//             variant={toast.variant}
//             onClose={() => setToast(null)}
//           />
//         )}

//         <div className="p-4 md:p-8 space-y-8">
//           {/* Header */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-foreground">Buy Phone Number</h1>
//                 <p className="text-muted-foreground mt-2">Step 1 of 3: Select a country</p>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-semibold">1</span>
//                 <span className="text-muted-foreground">→</span>
//                 <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">2</span>
//                 <span className="text-muted-foreground">→</span>
//                 <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">3</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <Card className="border-2 border-border w-full max-w-3xl shadow-lg">
//               <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border p-6">
//                 <CardTitle className="text-2xl">Select Your Country</CardTitle>
//                 <CardDescription>Choose the country where you want to buy a phone number</CardDescription>
//               </CardHeader>
//               <CardContent className="pt-8 bg-background">
//                 {/* Search Box */}
//                 <div className="mb-6 relative">
//                   <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     placeholder="Search countries..."
//                     value={countrySearch}
//                     onChange={(e) => handleCountrySearch(e.target.value)}
//                     onFocus={() => setShowCountryDropdown(true)}
//                     className="pl-10 h-10"
//                   />
//                 </div>

//                 {/* Countries List */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2">
//                   {filteredCountries.map((country) => (
//                     <button
//                       key={country.country_code}
//                       onClick={() => handleCountrySelect(country.country_code)}
//                       className="group relative flex items-center gap-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-left"
//                     >
//                       <div className="flex-1 min-w-0">
//                         <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
//                           {country.country}
//                         </p>
//                         <p className="text-xs text-muted-foreground">{country.country_code}</p>
//                       </div>
//                       <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all transform -rotate-90" />
//                     </button>
//                   ))}
//                 </div>

//                 {/* Cancel Button */}
//                 <div className="mt-6 pt-6 border-t border-border">
//                   <Button
//                     onClick={() => router.back()}
//                     variant="outline"
//                     className="w-full border-2 border-border hover:bg-muted bg-transparent text-foreground font-semibold transition-all duration-200"
//                   >
//                     <ArrowLeft className="w-4 h-4 mr-2" />
//                     Cancel
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (step === "phone") {
//     return (
//       <div className="flex-1 overflow-y-auto bg-background">
//         <LoaderOverlay isLoading={isLoading || isFetching} message={isFetching ? "Loading data..." : "Processing..."} />

//         {toast && (
//           <ToastNotification
//             title={toast.title}
//             description={toast.description}
//             variant={toast.variant}
//             onClose={() => setToast(null)}
//           />
//         )}

//         <div className="p-4 md:p-8 space-y-8">
//           {/* Header */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-foreground">Select Phone Number</h1>
//                 <p className="text-muted-foreground mt-2">Step 2 of 3: Choose a phone number</p>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-semibold">1</span>
//                 <span className="text-muted-foreground">→</span>
//                 <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-semibold">2</span>
//                 <span className="text-muted-foreground">→</span>
//                 <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">3</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <Card className="border-2 border-border w-full max-w-4xl shadow-lg">
//               <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border p-6">
//                 <CardTitle className="text-2xl">Available Phone Numbers</CardTitle>
//                 <CardDescription>
//                   {selectedCountry} - {phoneNumbers.length} numbers available
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="pt-8 bg-background">
//                 {/* Search Box */}
//                 <div className="mb-6 relative">
//                   <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     placeholder="Search phone numbers..."
//                     value={phoneSearch}
//                     onChange={(e) => handlePhoneSearch(e.target.value)}
//                     className="pl-10 h-10"
//                   />
//                 </div>

//                 {/* Phone Numbers List */}
//                 <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
//                   {filteredPhoneNumbers.map((phone) => (
//                     <div
//                       key={phone.phone_number}
//                       className={`p-4 rounded-lg border-2 transition-all ${
//                         selectedPhoneNumber?.phone_number === phone.phone_number
//                           ? "border-primary bg-primary/5"
//                           : "border-border hover:border-primary/50 hover:bg-primary/5"
//                       }`}
//                     >
//                       <div className="flex items-start justify-between gap-4">
//                         <div className="flex-1">
//                           <p className="font-bold text-lg text-foreground">{phone.phone_number}</p>
//                           <p className="text-sm text-muted-foreground">
//                             {phone.locality}, {phone.region}
//                           </p>
//                           <div className="flex gap-2 mt-2 text-xs">
//                             {phone.capabilities.voice && (
//                               <span className="px-2 py-1 bg-primary/10 text-primary rounded">Voice</span>
//                             )}
//                             {phone.capabilities.SMS && (
//                               <span className="px-2 py-1 bg-primary/10 text-primary rounded">SMS</span>
//                             )}
//                             {phone.capabilities.MMS && (
//                               <span className="px-2 py-1 bg-primary/10 text-primary rounded">MMS</span>
//                             )}
//                           </div>
//                         </div>
//                         <Button
//                           onClick={() => handlePhoneSelect(phone)}
//                           variant={selectedPhoneNumber?.phone_number === phone.phone_number ? "default" : "outline"}
//                           className="mt-2"
//                         >
//                           {selectedPhoneNumber?.phone_number === phone.phone_number ? "Selected" : "Select"}
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="mt-6 pt-6 border-t border-border flex gap-3">
//                   <Button
//                     onClick={() => {
//                       setStep("country")
//                       setSelectedPhoneNumber(null)
//                     }}
//                     variant="outline"
//                     className="flex-1 border-2 border-border"
//                   >
//                     <ArrowLeft className="w-4 h-4 mr-2" />
//                     Back
//                   </Button>
//                   <Button onClick={handleBuyClick} disabled={!selectedPhoneNumber} className="flex-1">
//                     Continue to Bundle
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <LoaderOverlay isLoading={isLoading || isFetching} message={isFetching ? "Loading data..." : "Processing..."} />

//       {toast && (
//         <ToastNotification
//           title={toast.title}
//           description={toast.description}
//           variant={toast.variant}
//           onClose={() => setToast(null)}
//         />
//       )}

//       {showBundleModal && selectedPhoneNumber && (
//         <BundleSelectModal
//           phoneNumber={selectedPhoneNumber}
//           countryCode={selectedCountry}
//           onClose={() => setShowBundleModal(false)}
//         />
//       )}

//       <div className="p-4 md:p-8 space-y-8">
//         {/* Header */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-foreground">Select Bundle & Create</h1>
//               <p className="text-muted-foreground mt-2">Step 3 of 3: Choose or create a bundle</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-center">
//           <Card className="border-2 border-border w-full max-w-4xl shadow-lg">
//             <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border p-6">
//               <CardTitle className="text-2xl">Bundle Selection</CardTitle>
//               <CardDescription>Selected: {selectedPhoneNumber?.phone_number}</CardDescription>
//             </CardHeader>
//             <CardContent className="pt-8 bg-background">
//               <div className="text-center space-y-4">
//                 <p className="text-muted-foreground">Click "Create Bundle" to proceed</p>
//                 <Button onClick={() => setShowBundleModal(true)} size="lg">
//                   <Plus className="w-4 h-4 mr-2" />
//                   Create Bundle
//                 </Button>
//               </div>

//               {/* Back Button */}
//               <div className="mt-6 pt-6 border-t border-border">
//                 <Button onClick={() => setStep("phone")} variant="outline" className="w-full border-2 border-border">
//                   <ArrowLeft className="w-4 h-4 mr-2" />
//                   Back
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft, ChevronDown, Search, Loader2 } from "lucide-react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { DocumentUploadForm } from "./document-upload-form"
// import { FinalBundleSubmission } from "./final-bundle-submission"
// import { CreateBundleModal } from "./create-bundle-modal"
// import { EndUserModal } from "./end-user-modal"
// import { AddressModal } from "./address-modal"
// import { useRouter } from "next/navigation"

// type Step =
//   | "country-select"
//   | "phone-select"
//   | "bundle-select"
//   | "create-bundle"
//   | "end-user"
//   | "address"
//   | "document-upload"
//   | "final-submission"

// interface PhoneFormData {
//   phone_number: string
//   area_code: string
//   country: string
//   country_code: string
//   bundle_id: string
//   address_id: string
// }

// interface Country {
//   beta: boolean
//   country: string
//   country_code: string
//   subresource_uris: Record<string, string>
//   uri: string
// }

// interface PhoneNumber {
//   address_requirements: string
//   beta: boolean
//   capabilities: {
//     MMS: boolean
//     SMS: boolean
//     voice: boolean
//   }
//   friendly_name: string
//   iso_country: string
//   lata: string | null
//   latitude: string
//   locality: string
//   longitude: string
//   phone_number: string
//   postal_code: string | null
//   rate_center: string | null
//   region: string
// }

// interface Bundle {
//   id: string
//   friendly_name: string
//   uid?: string
//   bundle_sid?: string
//   status?: string
// }

// interface Address {
//   id: string
//   customer_name: string
//   street: string
//   city: string
//   postal_code: string
// }

// interface ModalState {
//   bundle: boolean
//   endUser: boolean
//   address: boolean
// }

// export function PhoneNumberBuyForm() {
//   const [currentStep, setCurrentStep] = useState<Step>("country-select")
//   const [isLoading, setIsLoading] = useState(false)
//   const [isFetching, setIsFetching] = useState(false)
//   const [error, setError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)
//   const [showBundleModal, setShowBundleModal] = useState(false)
//   const [showAddressModal, setShowAddressModal] = useState(false)
//   const router = useRouter()

//   const [countries, setCountries] = useState<Country[]>([])
//   const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([])
//   const [bundles, setBundles] = useState<Bundle[]>([])
//   const [addresses, setAddresses] = useState<Address[]>([])
//   const [countrySearchQuery, setCountrySearchQuery] = useState("")
//   const [phoneSearchQuery, setPhoneSearchQuery] = useState("")
//   const [showCountriesDropdown, setShowCountriesDropdown] = useState(false)

//   const [formData, setFormData] = useState<PhoneFormData>({
//     phone_number: "",
//     area_code: "",
//     country: "",
//     country_code: "",
//     bundle_id: "",
//     address_id: "",
//   })

//   const [documentData, setDocumentData] = useState({
//     bundle_id: "",
//     document_type: "",
//     file: null as File | null,
//   })

//   const [modalState, setModalState] = useState<ModalState>({
//     bundle: false,
//     endUser: false,
//     address: false,
//   })

//   useEffect(() => {
//     fetchCountries()
//     fetchBundlesAndAddresses()
//   }, [])

//   const fetchCountries = async () => {
//     try {
//       setIsFetching(true)
//       const authToken = localStorage.getItem("authToken")

//       if (!authToken) {
//         setError("Authentication token not found")
//         return
//       }

//       const response = await axios.get(`${BASE_URL}/phone_number/countries`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })

//       console.log("[v0] Countries fetched:", response.data)
//       setCountries(response.data.countries || [])
//     } catch (err) {
//       console.log("[v0] Error fetching countries:", err)
//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.error || "Failed to fetch countries"
//         setError(errorMessage)
//       }
//     } finally {
//       setIsFetching(false)
//     }
//   }

//   const fetchPhoneNumbers = async (countryCode: string) => {
//     try {
//       setIsFetching(true)
//       const authToken = localStorage.getItem("authToken")

//       if (!authToken) {
//         setError("Authentication token not found")
//         return
//       }

//       const params: Record<string, string> = { country: countryCode }
//       if (phoneSearchQuery) {
//         params.search = phoneSearchQuery
//       }

//       const response = await axios.get(`${BASE_URL}/phone_number/available_phone_numbers`, {
//         params,
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })

//       console.log("[v0] Phone numbers fetched:", response.data)
//       setPhoneNumbers(response.data.phone_numbers || [])
//     } catch (err) {
//       console.log("[v0] Error fetching phone numbers:", err)
//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.error || "Failed to fetch phone numbers"
//         setError(errorMessage)
//       }
//     } finally {
//       setIsFetching(false)
//     }
//   }

//   const fetchBundlesAndAddresses = async () => {
//     try {
//       setIsFetching(true)
//       const authToken = localStorage.getItem("authToken")

//       if (!authToken) {
//         setError("Authentication token not found")
//         return
//       }

//       const bundlesResponse = await axios.get(`${BASE_URL}/phone_number/bundles`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })

//       console.log("[v0] Bundles fetched:", bundlesResponse.data)
//       setBundles(bundlesResponse.data.results || [])

//       const addressesResponse = await axios.get(`${BASE_URL}/phone_number/addresses`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })

//       console.log("[v0] Addresses fetched:", addressesResponse.data)
//       setAddresses(addressesResponse.data.results || [])
//     } catch (err) {
//       console.log("[v0] Error fetching bundles/addresses:", err)
//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.error || "Failed to fetch data"
//         setError(errorMessage)
//       }
//     } finally {
//       setIsFetching(false)
//     }
//   }

//   const handleCountrySelect = (country: Country) => {
//     setFormData((prev) => ({
//       ...prev,
//       country: country.country,
//       country_code: country.country_code,
//     }))
//     setCountrySearchQuery("")
//     setShowCountriesDropdown(false)
//     setCurrentStep("phone-select")
//     setPhoneSearchQuery("")
//     fetchPhoneNumbers(country.country_code)
//   }

//   const handlePhoneNumberSelect = (phoneNumber: PhoneNumber) => {
//     setFormData((prev) => ({
//       ...prev,
//       phone_number: phoneNumber.phone_number,
//       area_code: phoneNumber.locality || "",
//     }))
//     setCurrentStep("bundle-select")
//   }

//   const handleBundleSelect = (bundle: Bundle) => {
//     setFormData((prev) => ({
//       ...prev,
//       bundle_id: bundle.id,
//     }))
//     setDocumentData((prev) => ({
//       ...prev,
//       bundle_id: bundle.id,
//     }))
//     setCurrentStep("document-upload")
//   }

//   const handlePhoneSearch = async (query: string) => {
//     setPhoneSearchQuery(query)
//     if (formData.country_code && query.length > 0) {
//       try {
//         setIsFetching(true)
//         const authToken = localStorage.getItem("authToken")

//         if (!authToken) {
//           setError("Authentication token not found")
//           return
//         }

//         const response = await axios.get(`${BASE_URL}/phone_number/available_phone_numbers`, {
//           params: {
//             country: formData.country_code,
//             search: query,
//           },
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         })

//         console.log("[v0] Filtered phone numbers:", response.data)
//         setPhoneNumbers(response.data.phone_numbers || [])
//       } catch (err) {
//         console.log("[v0] Error searching phone numbers:", err)
//       } finally {
//         setIsFetching(false)
//       }
//     } else if (query.length === 0) {
//       fetchPhoneNumbers(formData.country_code)
//     }
//   }

//   const handleCountrySearch = (query: string) => {
//     setCountrySearchQuery(query)
//   }

//   const filteredCountries = countries.filter(
//     (country) =>
//       country.country.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
//       country.country_code.toLowerCase().includes(countrySearchQuery.toLowerCase()),
//   )

//   const handleCancel = () => {
//     router.back()
//   }

//   const handleCreateBundleNext = (bundleData: any) => {
//     setModalState((prev) => ({
//       ...prev,
//       bundle: false,
//       endUser: true,
//     }))
//   }

//   const handleEndUserNext = (endUserData: any) => {
//     setModalState((prev) => ({
//       ...prev,
//       endUser: false,
//       address: true,
//     }))
//   }

//   const handleAddressNext = (addressData: any) => {
//     setModalState((prev) => ({
//       ...prev,
//       address: false,
//     }))
//     setCurrentStep("document-upload")
//   }

//   const handleCloseBundleModal = () => {
//     setModalState((prev) => ({
//       ...prev,
//       bundle: false,
//     }))
//     localStorage.removeItem("bundleCreateData")
//   }

//   const handleCloseAllModals = () => {
//     setModalState({
//       bundle: false,
//       endUser: false,
//       address: false,
//     })
//     localStorage.removeItem("bundleCreateData")
//     localStorage.removeItem("endUserData")
//     localStorage.removeItem("addressData")
//   }

//   if (currentStep === "country-select") {
//     return (
//       <div className="flex-1 overflow-y-auto bg-background">
//         <LoaderOverlay isLoading={isFetching} message="Loading countries..." />

//         {toast && (
//           <ToastNotification
//             title={toast.title}
//             description={toast.description}
//             variant={toast.variant}
//             onClose={() => setToast(null)}
//           />
//         )}

//         <div className="p-4 md:p-8 space-y-8">
//           {/* Header */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-foreground">Buy Phone Number</h1>
//                 <p className="text-muted-foreground mt-2">Step 1 of 4: Select a country</p>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-semibold">1</span>
//                 <span className="text-muted-foreground">→</span>
//                 <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">2</span>
//                 <span className="text-muted-foreground">→</span>
//                 <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">3</span>
//                 <span className="text-muted-foreground">→</span>
//                 <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">4</span>
//               </div>
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm font-medium">
//               {error}
//             </div>
//           )}

//           <div className="flex justify-center">
//             {/* Country Selection Card */}
//             <Card className="border-2 border-border w-full max-w-3xl shadow-lg">
//               <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border p-6">
//                 <CardTitle className="text-2xl">Select Your Country</CardTitle>
//                 <CardDescription>Choose the country where you want to buy a phone number</CardDescription>
//               </CardHeader>
//               <CardContent className="pt-8 bg-background">
//                 {/* Search Input */}
//                 <div className="mb-6 relative">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                     <input
//                       type="text"
//                       placeholder="Search countries by name or code..."
//                       value={countrySearchQuery}
//                       onChange={(e) => handleCountrySearch(e.target.value)}
//                       onFocus={() => setShowCountriesDropdown(true)}
//                       className="w-full pl-10 pr-4 py-3 border-2 border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 font-medium"
//                     />
//                   </div>

//                   {/* Countries Dropdown */}
//                   {showCountriesDropdown && (
//                     <div className="absolute top-full left-0 right-0 mt-2 max-h-64 overflow-y-auto bg-background border-2 border-border rounded-lg shadow-lg z-10">
//                       {filteredCountries.length > 0 ? (
//                         filteredCountries.map((country) => (
//                           <button
//                             key={country.country_code}
//                             onClick={() => handleCountrySelect(country)}
//                             className="w-full px-4 py-3 text-left hover:bg-primary/10 border-b border-border last:border-b-0 transition-colors duration-150 flex items-center justify-between group"
//                           >
//                             <div>
//                               <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
//                                 {country.country}
//                               </p>
//                               <p className="text-xs text-muted-foreground">{country.country_code}</p>
//                             </div>
//                             <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all transform -rotate-90" />
//                           </button>
//                         ))
//                       ) : (
//                         <div className="px-4 py-3 text-muted-foreground text-sm">No countries found</div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Selected Country */}
//                 {formData.country && (
//                   <div className="mb-6 p-4 bg-primary/10 border-2 border-primary/30 rounded-lg">
//                     <p className="text-sm font-semibold text-foreground">
//                       Selected: <span className="text-primary">{formData.country}</span> ({formData.country_code})
//                     </p>
//                   </div>
//                 )}

//                 {/* Cancel Button */}
//                 <div className="pt-6 border-t border-border">
//                   <Button
//                     onClick={handleCancel}
//                     variant="outline"
//                     className="w-full border-2 border-border hover:bg-muted bg-transparent text-foreground font-semibold transition-all duration-200"
//                   >
//                     <ArrowLeft className="w-4 h-4 mr-2" />
//                     Cancel
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (currentStep === "phone-select") {
//     return (
//       <div className="flex-1 overflow-y-auto bg-background">
//         <LoaderOverlay isLoading={isFetching} message="Loading phone numbers..." />

//         {toast && (
//           <ToastNotification
//             title={toast.title}
//             description={toast.description}
//             variant={toast.variant}
//             onClose={() => setToast(null)}
//           />
//         )}

//         <div className="p-4 md:p-8 space-y-8">
//           {/* Header */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-foreground">Select Phone Number</h1>
//                 <p className="text-muted-foreground mt-2">
//                   Step 2 of 4: Choose an available phone number in {formData.country}
//                 </p>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">1</span>
//                 <span className="text-muted-foreground">→</span>
//                 <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-semibold">2</span>
//                 <span className="text-muted-foreground">→</span>
//                 <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">3</span>
//                 <span className="text-muted-foreground">→</span>
//                 <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">4</span>
//               </div>
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm font-medium">
//               {error}
//             </div>
//           )}

//           <div className="flex justify-center">
//             <Card className="border-2 border-border w-full max-w-4xl shadow-lg">
//               <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border p-6">
//                 <CardTitle className="text-2xl">Available Phone Numbers</CardTitle>
//                 <CardDescription>Select a phone number or search for a specific one</CardDescription>
//               </CardHeader>
//               <CardContent className="pt-8 bg-background">
//                 {/* Search Input */}
//                 <div className="mb-6 relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                   <input
//                     type="text"
//                     placeholder="Search by phone number..."
//                     value={phoneSearchQuery}
//                     onChange={(e) => handlePhoneSearch(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border-2 border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 font-medium"
//                   />
//                 </div>

//                 {/* Phone Numbers List */}
//                 <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
//                   {isFetching ? (
//                     <div className="flex items-center justify-center py-8">
//                       <Loader2 className="w-6 h-6 animate-spin text-primary" />
//                     </div>
//                   ) : phoneNumbers.length > 0 ? (
//                     phoneNumbers.map((phone) => (
//                       <div
//                         key={phone.phone_number}
//                         className="p-4 border-2 border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer group"
//                         onClick={() => handlePhoneNumberSelect(phone)}
//                       >
//                         <div className="flex items-start justify-between mb-3">
//                           <div className="flex-1">
//                             <p className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
//                               {phone.friendly_name}
//                             </p>
//                             <p className="text-sm text-muted-foreground mt-1">
//                               {phone.locality}, {phone.region}
//                             </p>
//                           </div>
//                           <Button
//                             type="button"
//                             onClick={(e) => {
//                               e.stopPropagation()
//                               handlePhoneNumberSelect(phone)
//                             }}
//                             className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200"
//                           >
//                             Select
//                           </Button>
//                         </div>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
//                           <div>
//                             <p className="font-semibold text-muted-foreground">Voice</p>
//                             <p className="text-foreground">{phone.capabilities.voice ? "Yes" : "No"}</p>
//                           </div>
//                           <div>
//                             <p className="font-semibold text-muted-foreground">SMS</p>
//                             <p className="text-foreground">{phone.capabilities.SMS ? "Yes" : "No"}</p>
//                           </div>
//                           <div>
//                             <p className="font-semibold text-muted-foreground">MMS</p>
//                             <p className="text-foreground">{phone.capabilities.MMS ? "Yes" : "No"}</p>
//                           </div>
//                           <div>
//                             <p className="font-semibold text-muted-foreground">Country</p>
//                             <p className="text-foreground">{phone.iso_country}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="text-center py-8">
//                       <p className="text-muted-foreground">No phone numbers available</p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Back Button */}
//                 <div className="mt-6 pt-6 border-t border-border">
//                   <Button
//                     onClick={() => setCurrentStep("country-select")}
//                     variant="outline"
//                     className="w-full border-2 border-border hover:bg-muted bg-transparent text-foreground font-semibold transition-all duration-200"
//                   >
//                     <ArrowLeft className="w-4 h-4 mr-2" />
//                     Back to Countries
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (currentStep === "bundle-select") {
//     return (
//       <div className="flex-1 overflow-y-auto bg-background">
//         <LoaderOverlay isLoading={isFetching} message="Loading bundles..." />

//         {toast && (
//           <ToastNotification
//             title={toast.title}
//             description={toast.description}
//             variant={toast.variant}
//             onClose={() => setToast(null)}
//           />
//         )}

//         {modalState.bundle && (
//           <CreateBundleModal
//             onClose={handleCloseBundleModal}
//             onNext={handleCreateBundleNext}
//             selectedCountry={formData.country}
//             selectedCountryCode={formData.country_code}
//           />
//         )}

//         {modalState.endUser && (
//           <EndUserModal
//             onClose={handleCloseAllModals}
//             onBack={() =>
//               setModalState((prev) => ({
//                 ...prev,
//                 endUser: false,
//                 bundle: true,
//               }))
//             }
//             onNext={handleEndUserNext}
//           />
//         )}

//         {modalState.address && (
//           <AddressModal
//             onClose={handleCloseAllModals}
//             onBack={() =>
//               setModalState((prev) => ({
//                 ...prev,
//                 address: false,
//                 endUser: true,
//               }))
//             }
//             onNext={handleAddressNext}
//           />
//         )}

//         <div className="p-4 md:p-8 space-y-8">
//           {/* Header */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-foreground">Select Bundle</h1>
//                 <p className="text-muted-foreground mt-2">
//                   Step 3 of 4: Choose or create a bundle for {formData.phone_number}
//                 </p>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">1</span>
//                 <span className="text-muted-foreground">→</span>
//                 <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">2</span>
//                 <span className="text-muted-foreground">→</span>
//                 <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-semibold">3</span>
//                 <span className="text-muted-foreground">→</span>
//                 <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-semibold">4</span>
//               </div>
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm font-medium">
//               {error}
//             </div>
//           )}

//           <div className="flex justify-center">
//             <Card className="border-2 border-border w-full max-w-3xl shadow-lg">
//               <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border p-6">
//                 <CardTitle className="text-2xl">Available Bundles</CardTitle>
//                 <CardDescription>Select an existing bundle or create a new one</CardDescription>
//               </CardHeader>
//               <CardContent className="pt-8 bg-background space-y-6">
//                 {/* Bundles List */}
//                 <div className="space-y-3">
//                   {bundles.length > 0 ? (
//                     bundles.map((bundle) => (
//                       <button
//                         key={bundle.id}
//                         onClick={() => handleBundleSelect(bundle)}
//                         className="w-full p-4 border-2 border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-left group"
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex-1 min-w-0">
//                             <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
//                               {bundle.friendly_name}
//                             </p>
//                             <p className="text-xs text-muted-foreground mt-1">
//                               Bundle ID: {String(bundle.id).substring(0, 20)}...
//                             </p>
//                           </div>
//                           <div className="text-right">
//                             <span className="px-3 py-1 bg-green-500/20 text-green-700 rounded-full text-xs font-semibold">
//                               Available
//                             </span>
//                           </div>
//                         </div>
//                       </button>
//                     ))
//                   ) : (
//                     <div className="text-center py-8 text-muted-foreground">
//                       No bundles available. Create a new one to proceed.
//                     </div>
//                   )}
//                 </div>

//                 <div className="pt-4 border-t border-border">
//                   <Button
//                     onClick={() =>
//                       setModalState((prev) => ({
//                         ...prev,
//                         bundle: true,
//                       }))
//                     }
//                     className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200"
//                   >
//                     + Create New Bundle
//                   </Button>
//                 </div>

//                 {/* Back Button */}
//                 <Button
//                   onClick={() => setCurrentStep("phone-select")}
//                   variant="outline"
//                   className="w-full border-2 border-border hover:bg-muted bg-transparent text-foreground font-semibold transition-all duration-200"
//                 >
//                   <ArrowLeft className="w-4 h-4 mr-2" />
//                   Back to Phone Numbers
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (currentStep === "document-upload") {
//     return (
//       <DocumentUploadForm
//         bundleId={documentData.bundle_id}
//         onBack={() => setCurrentStep("bundle-select")}
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
// }


// "use client"
// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ArrowLeft } from "lucide-react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { useRouter } from "next/navigation"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { CreateBundleModal } from "./create-bundle-modal"
// import { EndUserModal } from "./end-user-modal"
// import { AddressModal } from "./address-modal"
// import { FinalSubmissionModal } from "./final-submission-modal"

// interface Country {
//   country: string
//   country_code: string
// }

// interface PhoneNumber {
//   phone_number: string
//   friendly_name: string
//   locality: string
//   region: string
//   iso_country: string
// }

// interface Bundle {
//   id: string
//   friendly_name: string
// }

// interface BundleData {
//   friendly_name: string
//   iso_country: string
//   number_type: string
//   email: string
// }

// type WizardStep = "country" | "phone" | "bundle" | "create-bundle" | "end-user" | "address" | "final-submission"

// export function PhoneNumberBuyForm() {
//   const router = useRouter()
//   const [currentStep, setCurrentStep] = useState<WizardStep>("country")
//   const [isLoading, setIsLoading] = useState(false)
//   const [countries, setCountries] = useState<Country[]>([])
//   const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([])
//   const [bundles, setBundles] = useState<Bundle[]>([])
//   const [countrySearch, setCountrySearch] = useState("")
//   const [phoneSearch, setPhoneSearch] = useState("")
//   const [bundleSearch, setBundleSearch] = useState("")
//   const [selectedCountry, setSelectedCountry] = useState("")
//   const [selectedPhone, setSelectedPhone] = useState("")
//   const [selectedBundle, setSelectedBundle] = useState("")
//   const [showCreateBundleModal, setShowCreateBundleModal] = useState(false)
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const authToken = localStorage.getItem("authToken")

//   useEffect(() => {
//     fetchCountries()
//     fetchBundles()
//   }, [])

//   const fetchCountries = async () => {
//     try {
//       setIsLoading(true)
//       const response = await axios.get(`${BASE_URL}/phone_number/countries`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setCountries(response.data.countries || [])
//     } catch (err) {
//       console.log("[v0] Error fetching countries:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to fetch countries",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const fetchPhoneNumbers = async (countryCode: string) => {
//     try {
//       setIsLoading(true)
//       const response = await axios.get(`${BASE_URL}/phone_number/available_phone_numbers?country=${countryCode}`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setPhoneNumbers(response.data.phone_numbers || [])
//       setSelectedPhone("")
//     } catch (err) {
//       console.log("[v0] Error fetching phone numbers:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to fetch phone numbers",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const fetchPhoneNumbersWithSearch = async (countryCode: string, searchTerm: string) => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/phone_number/available_phone_numbers?country=${countryCode}&search=${searchTerm}`,
//         {
//           headers: { Authorization: `Bearer ${authToken}` },
//         },
//       )
//       setPhoneNumbers(response.data.phone_numbers || [])
//     } catch (err) {
//       console.log("[v0] Error fetching phone numbers:", err)
//     }
//   }

//   const fetchBundles = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/phone_number/bundles`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setBundles(response.data.results || response.data || [])
//     } catch (err) {
//       console.log("[v0] Error fetching bundles:", err)
//     }
//   }

//   const handleCountrySelect = (value: string) => {
//     setSelectedCountry(value)
//     setPhoneNumbers([])
//     setSelectedPhone("")
//     setCurrentStep("phone")
//     fetchPhoneNumbers(value)
//   }

//   const handlePhoneSelect = (value: string) => {
//     setSelectedPhone(value)
//     setCurrentStep("bundle")
//   }

//   const handleBundleSelect = (value: string) => {
//     setSelectedBundle(value)
//   }

//   const handleBundleCreated = () => {
//     fetchBundles()
//     setShowCreateBundleModal(false)
//     setToast({
//       title: "Success",
//       description: "Bundle created successfully",
//       variant: "default",
//     })
//   }

//   const handleProceedToEndUser = () => {
//     if (!selectedBundle) {
//       setToast({
//         title: "Error",
//         description: "Please select or create a bundle",
//         variant: "destructive",
//       })
//       return
//     }
//     setCurrentStep("end-user")
//   }

//   const filteredCountries = countries.filter((c) => c.country.toLowerCase().includes(countrySearch.toLowerCase()))

//   const filteredPhoneNumbers = phoneNumbers.filter(
//     (p) =>
//       p.phone_number.toLowerCase().includes(phoneSearch.toLowerCase()) ||
//       p.friendly_name.toLowerCase().includes(phoneSearch.toLowerCase()),
//   )

//   const filteredBundles = bundles.filter((b) => b.friendly_name.toLowerCase().includes(bundleSearch.toLowerCase()))

//   if (currentStep === "end-user") {
//     return (
//       <EndUserModal
//         bundleCountry={selectedCountry}
//         onBack={() => setCurrentStep("bundle")}
//         onNext={() => setCurrentStep("address")}
//       />
//     )
//   }

//   if (currentStep === "address") {
//     return (
//       <AddressModal
//         bundleCountry={selectedCountry}
//         onBack={() => setCurrentStep("end-user")}
//         onNext={() => setCurrentStep("final-submission")}
//       />
//     )
//   }

//   if (currentStep === "final-submission") {
//     return (
//       <FinalSubmissionModal
//         phoneNumber={selectedPhone}
//         bundleId={selectedBundle}
//         countryCode={selectedCountry}
//         onBack={() => setCurrentStep("bundle")}
//       />
//     )
//   }

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <LoaderOverlay isLoading={isLoading} message="Loading data..." />

//       {toast && (
//         <ToastNotification
//           title={toast.title}
//           description={toast.description}
//           variant={toast.variant}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <CreateBundleModal
//         isOpen={showCreateBundleModal}
//         countryCode={selectedCountry}
//         onClose={() => setShowCreateBundleModal(false)}
//         onBundleCreated={handleBundleCreated}
//       />

//       <div className="p-4 md:p-8 space-y-8">
//         {/* Header */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-foreground">Buy Phone Number</h1>
//               <p className="text-muted-foreground mt-2">Select country, phone number, and bundle</p>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-4xl mx-auto space-y-6">
//           {/* Step 1: Country Selection */}
//           <Card className="border-2 border-border">
//             <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//               <CardTitle className="flex items-center gap-2">
//                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
//                   1
//                 </span>
//                 Select Country
//               </CardTitle>
//               <CardDescription>Choose the country code for your phone number</CardDescription>
//             </CardHeader>
//             <CardContent className="pt-6 space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Country Code</label>
//                 <Select value={selectedCountry} onValueChange={handleCountrySelect}>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Search and select country..." />
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
//             </CardContent>
//           </Card>

//           {/* Step 2: Phone Number Selection */}
//           {selectedCountry && (
//             <Card className="border-2 border-border">
//               <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//                 <CardTitle className="flex items-center gap-2">
//                   <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
//                     2
//                   </span>
//                   Select Phone Number
//                 </CardTitle>
//                 <CardDescription>Available phone numbers in {selectedCountry}</CardDescription>
//               </CardHeader>
//               <CardContent className="pt-6 space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Phone Number</label>
//                   <Select value={selectedPhone} onValueChange={handlePhoneSelect}>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Search and select phone number..." />
//                     </SelectTrigger>
//                     <SelectContent className="max-h-64">
//                       <div className="p-2">
//                         <Input
//                           placeholder="Search phone numbers..."
//                           value={phoneSearch}
//                           onChange={(e) => {
//                             setPhoneSearch(e.target.value)
//                             if (e.target.value) {
//                               fetchPhoneNumbersWithSearch(selectedCountry, e.target.value)
//                             } else {
//                               fetchPhoneNumbers(selectedCountry)
//                             }
//                           }}
//                           className="mb-2"
//                         />
//                       </div>
//                       {filteredPhoneNumbers.map((phone) => (
//                         <SelectItem key={phone.phone_number} value={phone.phone_number}>
//                           <div className="flex flex-col">
//                             <span>{phone.phone_number}</span>
//                             <span className="text-xs text-muted-foreground">
//                               {phone.locality}, {phone.region}
//                             </span>
//                           </div>
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Step 3: Bundle Selection */}
//           {selectedPhone && (
//             <Card className="border-2 border-border">
//               <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//                 <CardTitle className="flex items-center gap-2">
//                   <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
//                     3
//                   </span>
//                   Select or Create Bundle
//                 </CardTitle>
//                 <CardDescription>Choose an existing bundle or create a new one</CardDescription>
//               </CardHeader>
//               <CardContent className="pt-6 space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Bundle</label>
//                   <div className="flex gap-2">
//                     <Select value={selectedBundle} onValueChange={handleBundleSelect}>
//                       <SelectTrigger className="flex-1">
//                         <SelectValue placeholder="Search and select bundle..." />
//                       </SelectTrigger>
//                       <SelectContent className="max-h-64">
//                         <div className="p-2">
//                           <Input
//                             placeholder="Search bundles..."
//                             value={bundleSearch}
//                             onChange={(e) => setBundleSearch(e.target.value)}
//                             className="mb-2"
//                           />
//                         </div>
//                         {filteredBundles.map((bundle) => (
//                           <SelectItem key={bundle.id} value={bundle.id}>
//                             {bundle.friendly_name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <Button onClick={() => setShowCreateBundleModal(true)} className="whitespace-nowrap">
//                       Create Bundle
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Continue Button */}
//                 <Button onClick={handleProceedToEndUser} disabled={!selectedBundle} className="w-full mt-6" size="lg">
//                   Continue to End User Details
//                 </Button>
//               </CardContent>
//             </Card>
//           )}

//           {/* Cancel Button */}
//           <Button onClick={() => router.back()} variant="outline" className="w-full">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Cancel
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }


// "use client"
// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ArrowLeft } from "lucide-react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { useRouter } from "next/navigation"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { CreateBundleModal } from "./create-bundle-modal"
// import { EndUserModal } from "./end-user-modal"
// import { AddressModal } from "./address-modal"
// import { FinalSubmissionModal } from "./final-submission-modal"

// interface Country {
//   country: string
//   country_code: string
// }

// interface PhoneNumber {
//   phone_number: string
//   friendly_name: string
//   locality: string
//   region: string
//   iso_country: string
// }

// interface Bundle {
//   id: string
//   friendly_name: string
// }

// interface BundleData {
//   friendly_name: string
//   iso_country: string
//   number_type: string
//   email: string
// }

// type WizardStep = "country" | "phone" | "bundle" | "create-bundle" | "end-user" | "address" | "final-submission"

// export function PhoneNumberBuyForm() {
//   const router = useRouter()
//   const [currentStep, setCurrentStep] = useState<WizardStep>("country")
//   const [isLoading, setIsLoading] = useState(false)
//   const [countries, setCountries] = useState<Country[]>([])
//   const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([])
//   const [bundles, setBundles] = useState<Bundle[]>([])
//   const [countrySearch, setCountrySearch] = useState("")
//   const [phoneSearch, setPhoneSearch] = useState("")
//   const [bundleSearch, setBundleSearch] = useState("")
//   const [selectedCountry, setSelectedCountry] = useState("")
//   const [selectedPhone, setSelectedPhone] = useState("")
//   const [selectedBundle, setSelectedBundle] = useState("")
//   const [showCreateBundleModal, setShowCreateBundleModal] = useState(false)
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const authToken = localStorage.getItem("authToken")

//   useEffect(() => {
//     fetchCountries()
//     fetchBundles()
//   }, [])

//   const fetchCountries = async () => {
//     try {
//       setIsLoading(true)
//       const response = await axios.get(`${BASE_URL}/phone_number/countries`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setCountries(response.data.countries || [])
//     } catch (err) {
//       console.log("[v0] Error fetching countries:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to fetch countries",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const fetchPhoneNumbers = async (countryCode: string) => {
//     try {
//       setIsLoading(true)
//       const response = await axios.get(`${BASE_URL}/phone_number/available_phone_numbers?country=${countryCode}`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setPhoneNumbers(response.data.phone_numbers || [])
//       setSelectedPhone("")
//     } catch (err) {
//       console.log("[v0] Error fetching phone numbers:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to fetch phone numbers",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const fetchPhoneNumbersWithSearch = async (countryCode: string, searchTerm: string) => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/phone_number/available_phone_numbers?country=${countryCode}&search=${searchTerm}`,
//         {
//           headers: { Authorization: `Bearer ${authToken}` },
//         },
//       )
//       setPhoneNumbers(response.data.phone_numbers || [])
//     } catch (err) {
//       console.log("[v0] Error fetching phone numbers:", err)
//     }
//   }

//   const fetchBundles = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/phone_number/bundles`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setBundles(response.data.results || response.data || [])
//     } catch (err) {
//       console.log("[v0] Error fetching bundles:", err)
//     }
//   }

//   const handleCountrySelect = (value: string) => {
//     setSelectedCountry(value)
//     setPhoneNumbers([])
//     setSelectedPhone("")
//     setCurrentStep("phone")
//     fetchPhoneNumbers(value)
//   }

//   const fetchCountriesWithSearch = async (searchTerm: string) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/phone_number/countries?search=${searchTerm}`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setCountries(response.data.countries || [])
//     } catch (err) {
//       console.log("[v0] Error fetching countries:", err)
//     }
//   }

//   const handlePhoneSelect = (value: string) => {
//     setSelectedPhone(value)
//     setCurrentStep("bundle")
//   }

//   const handleBundleSelect = (value: string) => {
//     setSelectedBundle(value)
//   }

//   const handleBundleCreated = () => {
//     fetchBundles()
//     setShowCreateBundleModal(false)
//     setToast({
//       title: "Success",
//       description: "Bundle created successfully",
//       variant: "default",
//     })
//   }

//   const handleProceedToEndUser = () => {
//     if (!selectedBundle) {
//       setToast({
//         title: "Error",
//         description: "Please select or create a bundle",
//         variant: "destructive",
//       })
//       return
//     }
//     setCurrentStep("end-user")
//   }

//   const filteredCountries = countries.filter((c) => c.country.toLowerCase().includes(countrySearch.toLowerCase()))

//   const filteredPhoneNumbers = phoneNumbers.filter(
//     (p) =>
//       p.phone_number.toLowerCase().includes(phoneSearch.toLowerCase()) ||
//       p.friendly_name.toLowerCase().includes(phoneSearch.toLowerCase()),
//   )

//   const filteredBundles = bundles.filter((b) => b.friendly_name.toLowerCase().includes(bundleSearch.toLowerCase()))

//   if (currentStep === "end-user") {
//     return (
//       <EndUserModal
//         bundleCountry={selectedCountry}
//         onBack={() => setCurrentStep("bundle")}
//         onNext={() => setCurrentStep("address")}
//       />
//     )
//   }

//   if (currentStep === "address") {
//     return (
//       <AddressModal
//         bundleCountry={selectedCountry}
//         onBack={() => setCurrentStep("end-user")}
//         onNext={() => setCurrentStep("final-submission")}
//       />
//     )
//   }

//   if (currentStep === "final-submission") {
//     return (
//       <FinalSubmissionModal
//         phoneNumber={selectedPhone}
//         bundleId={selectedBundle}
//         countryCode={selectedCountry}
//         onBack={() => setCurrentStep("bundle")}
//       />
//     )
//   }

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <LoaderOverlay isLoading={isLoading} message="Loading data..." />

//       {toast && (
//         <ToastNotification
//           title={toast.title}
//           description={toast.description}
//           variant={toast.variant}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <CreateBundleModal
//         isOpen={showCreateBundleModal}
//         countryCode={selectedCountry}
//         onClose={() => setShowCreateBundleModal(false)}
//         onBundleCreated={handleBundleCreated}
//       />

//       <div className="p-4 md:p-8 space-y-8">
//         {/* Header */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-foreground">Buy Phone Number</h1>
//               <p className="text-muted-foreground mt-2">Select country, phone number, and bundle</p>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-4xl mx-auto space-y-6">
//           {/* Step 1: Country Selection */}
//           <Card className="border-2 border-border">
//             <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//               <CardTitle className="flex items-center gap-2">
//                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
//                   1
//                 </span>
//                 Select Country
//               </CardTitle>
//               <CardDescription>Choose the country code for your phone number</CardDescription>
//             </CardHeader>
//             <CardContent className="pt-6 space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Country Code</label>
//                 <Select value={selectedCountry} onValueChange={handleCountrySelect}>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Search and select country..." />
//                   </SelectTrigger>
//                   <SelectContent className="max-h-64">
//                     <div className="p-2">
//                       <Input
//                         placeholder="Search countries..."
//                         value={countrySearch}
//                         onChange={(e) => {
//                           setCountrySearch(e.target.value)
//                           if (e.target.value) {
//                             fetchCountriesWithSearch(e.target.value)
//                           } else {
//                             fetchCountries()
//                           }
//                         }}
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
//             </CardContent>
//           </Card>

//           {/* Step 2: Phone Number Selection */}
//           {selectedCountry && (
//             <Card className="border-2 border-border">
//               <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//                 <CardTitle className="flex items-center gap-2">
//                   <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
//                     2
//                   </span>
//                   Select Phone Number
//                 </CardTitle>
//                 <CardDescription>Available phone numbers in {selectedCountry}</CardDescription>
//               </CardHeader>
//               <CardContent className="pt-6 space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Phone Number</label>
//                   <Select value={selectedPhone} onValueChange={handlePhoneSelect}>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Search and select phone number..." />
//                     </SelectTrigger>
//                     <SelectContent className="max-h-64">
//                       <div className="p-2">
//                         <Input
//                           placeholder="Search phone numbers..."
//                           value={phoneSearch}
//                           onChange={(e) => {
//                             setPhoneSearch(e.target.value)
//                             if (e.target.value) {
//                               fetchPhoneNumbersWithSearch(selectedCountry, e.target.value)
//                             } else {
//                               fetchPhoneNumbers(selectedCountry)
//                             }
//                           }}
//                           className="mb-2"
//                         />
//                       </div>
//                       {filteredPhoneNumbers.map((phone) => (
//                         <SelectItem key={phone.phone_number} value={phone.phone_number}>
//                           <div className="flex flex-col">
//                             <span>{phone.phone_number}</span>
//                             <span className="text-xs text-muted-foreground">
//                               {phone.locality}, {phone.region}
//                             </span>
//                           </div>
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Step 3: Bundle Selection */}
//           {selectedPhone && (
//             <Card className="border-2 border-border">
//               <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//                 <CardTitle className="flex items-center gap-2">
//                   <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
//                     3
//                   </span>
//                   Select or Create Bundle
//                 </CardTitle>
//                 <CardDescription>Choose an existing bundle or create a new one</CardDescription>
//               </CardHeader>
//               <CardContent className="pt-6 space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Bundle</label>
//                   <div className="flex gap-2">
//                     <Select value={selectedBundle} onValueChange={handleBundleSelect}>
//                       <SelectTrigger className="flex-1">
//                         <SelectValue placeholder="Search and select bundle..." />
//                       </SelectTrigger>
//                       <SelectContent className="max-h-64">
//                         <div className="p-2">
//                           <Input
//                             placeholder="Search bundles..."
//                             value={bundleSearch}
//                             onChange={(e) => setBundleSearch(e.target.value)}
//                             className="mb-2"
//                           />
//                         </div>
//                         {filteredBundles.map((bundle) => (
//                           <SelectItem key={bundle.id} value={bundle.id}>
//                             {bundle.friendly_name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <Button onClick={() => setShowCreateBundleModal(true)} className="whitespace-nowrap">
//                       Create Bundle
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Continue Button */}
//                 <Button onClick={handleProceedToEndUser} disabled={!selectedBundle} className="w-full mt-6" size="lg">
//                   Continue to End User Details
//                 </Button>
//               </CardContent>
//             </Card>
//           )}

//           {/* Cancel Button */}
//           <Button onClick={() => router.back()} variant="outline" className="w-full">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Cancel
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }


// "use client"
// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ArrowLeft } from "lucide-react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { useRouter } from "next/navigation"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { CreateBundleModal } from "./create-bundle-modal"
// import { EndUserModal } from "./end-user-modal"
// import { AddressModal } from "./address-modal"
// import { FinalSubmissionModal } from "./final-submission-modal"

// interface Country {
//   country: string
//   country_code: string
// }

// interface PhoneNumber {
//   phone_number: string
//   friendly_name: string
//   locality: string
//   region: string
//   iso_country: string
// }

// interface Bundle {
//   id: string
//   friendly_name: string
// }

// interface BundleData {
//   friendly_name: string
//   iso_country: string
//   number_type: string
//   email: string
// }

// type WizardStep = "country" | "phone" | "bundle" | "create-bundle" | "end-user" | "address" | "final-submission"

// export function PhoneNumberBuyForm() {
//   const router = useRouter()
//   const [currentStep, setCurrentStep] = useState<WizardStep>("country")
//   const [isLoading, setIsLoading] = useState(false)
//   const [countries, setCountries] = useState<Country[]>([])
//   const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([])
//   const [bundles, setBundles] = useState<Bundle[]>([])
//   const [countrySearch, setCountrySearch] = useState("")
//   const [phoneSearch, setPhoneSearch] = useState("")
//   const [bundleSearch, setBundleSearch] = useState("")
//   const [selectedCountry, setSelectedCountry] = useState("")
//   const [selectedPhone, setSelectedPhone] = useState("")
//   const [selectedBundle, setSelectedBundle] = useState("")
//   const [showCreateBundleModal, setShowCreateBundleModal] = useState(false)
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const authToken = localStorage.getItem("authToken")

//   useEffect(() => {
//     fetchCountries()
//     fetchBundles()
//   }, [])

//   const fetchCountries = async () => {
//     try {
//       setIsLoading(true)
//       const response = await axios.get(`${BASE_URL}/phone_number/countries`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setCountries(response.data.countries || [])
//     } catch (err) {
//       console.log("[v0] Error fetching countries:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to fetch countries",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const fetchPhoneNumbers = async (countryCode: string) => {
//     try {
//       setIsLoading(true)
//       const response = await axios.get(`${BASE_URL}/phone_number/available_phone_numbers?country=${countryCode}`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setPhoneNumbers(response.data.phone_numbers || [])
//       setSelectedPhone("")
//     } catch (err) {
//       console.log("[v0] Error fetching phone numbers:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to fetch phone numbers",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const fetchPhoneNumbersWithSearch = async (countryCode: string, searchTerm: string) => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/phone_number/available_phone_numbers?country=${countryCode}&search=${searchTerm}`,
//         {
//           headers: { Authorization: `Bearer ${authToken}` },
//         },
//       )
//       setPhoneNumbers(response.data.phone_numbers || [])
//     } catch (err) {
//       console.log("[v0] Error fetching phone numbers:", err)
//     }
//   }

//   const fetchBundles = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/phone_number/bundles`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setBundles(response.data.results || response.data || [])
//     } catch (err) {
//       console.log("[v0] Error fetching bundles:", err)
//     }
//   }

//   const handleCountrySelect = (value: string) => {
//     setSelectedCountry(value)
//     setPhoneNumbers([])
//     setSelectedPhone("")
//     setCurrentStep("phone")
//     fetchPhoneNumbers(value)
//   }

//   const fetchCountriesWithSearch = async (searchTerm: string) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/phone_number/countries?search=${searchTerm}`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setCountries(response.data.countries || [])
//     } catch (err) {
//       console.log("[v0] Error fetching countries:", err)
//     }
//   }

//   const handlePhoneSelect = (value: string) => {
//     setSelectedPhone(value)
//     setCurrentStep("bundle")
//   }

//   const handleBundleSelect = (value: string) => {
//     setSelectedBundle(value)
//   }

//   const handleBundleCreated = () => {
//     fetchBundles()
//     setShowCreateBundleModal(false)
//     setToast({
//       title: "Success",
//       description: "Bundle created successfully",
//       variant: "default",
//     })
//   }

//   const handleProceedToEndUser = () => {
//     if (!selectedBundle) {
//       setToast({
//         title: "Error",
//         description: "Please select or create a bundle",
//         variant: "destructive",
//       })
//       return
//     }
//     setCurrentStep("end-user")
//   }

//   const filteredCountries = countries.filter((c) => c.country.toLowerCase().includes(countrySearch.toLowerCase()))

//   const filteredPhoneNumbers = phoneNumbers.filter(
//     (p) =>
//       p.phone_number.toLowerCase().includes(phoneSearch.toLowerCase()) ||
//       p.friendly_name.toLowerCase().includes(phoneSearch.toLowerCase()),
//   )

//   const filteredBundles = bundles.filter((b) => b.friendly_name.toLowerCase().includes(bundleSearch.toLowerCase()))

//   if (currentStep === "end-user") {
//     return (
//       <EndUserModal
//         bundleCountry={selectedCountry}
//         onBack={() => setCurrentStep("bundle")}
//         onNext={() => setCurrentStep("address")}
//       />
//     )
//   }

//   if (currentStep === "address") {
//     return (
//       <AddressModal
//         bundleCountry={selectedCountry}
//         onBack={() => setCurrentStep("end-user")}
//         onNext={() => setCurrentStep("final-submission")}
//       />
//     )
//   }

//   if (currentStep === "final-submission") {
//     return (
//       <FinalSubmissionModal
//         phoneNumber={selectedPhone}
//         bundleId={selectedBundle}
//         countryCode={selectedCountry}
//         onBack={() => setCurrentStep("bundle")}
//       />
//     )
//   }

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <LoaderOverlay isLoading={isLoading} message="Loading data..." />

//       {toast && (
//         <ToastNotification
//           title={toast.title}
//           description={toast.description}
//           variant={toast.variant}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <CreateBundleModal
//         isOpen={showCreateBundleModal}
//         countryCode={selectedCountry}
//         onClose={() => setShowCreateBundleModal(false)}
//         onBundleCreated={handleBundleCreated}
//       />

//       <div className="p-4 md:p-8 space-y-8">
//         {/* Header */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-foreground">Buy Phone Number</h1>
//               <p className="text-muted-foreground mt-2">Select country, phone number, and bundle</p>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-4xl mx-auto space-y-6">
//           {/* Step 1: Country Selection */}
//           <Card className="border-2 border-border">
//             <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//               <CardTitle className="flex items-center gap-2">
//                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
//                   1
//                 </span>
//                 Select Country
//               </CardTitle>
//               <CardDescription>Choose the country code for your phone number</CardDescription>
//             </CardHeader>
//             <CardContent className="pt-6 space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Country Code</label>
//                 <Select value={selectedCountry} onValueChange={handleCountrySelect}>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Search and select country..." />
//                   </SelectTrigger>
//                   <SelectContent className="max-h-64">
//                     <div className="p-2">
//                       <Input
//                         placeholder="Search countries..."
//                         value={countrySearch}
//                         onChange={(e) => {
//                           setCountrySearch(e.target.value)
//                           if (e.target.value) {
//                             fetchCountriesWithSearch(e.target.value)
//                           } else {
//                             fetchCountries()
//                           }
//                         }}
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
//             </CardContent>
//           </Card>

//           {/* Step 2: Phone Number Selection */}
//           {selectedCountry && (
//             <Card className="border-2 border-border">
//               <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//                 <CardTitle className="flex items-center gap-2">
//                   <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
//                     2
//                   </span>
//                   Select Phone Number
//                 </CardTitle>
//                 <CardDescription>Available phone numbers in {selectedCountry}</CardDescription>
//               </CardHeader>
//               <CardContent className="pt-6 space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Phone Number</label>
//                   <Select value={selectedPhone} onValueChange={handlePhoneSelect}>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Search and select phone number..." />
//                     </SelectTrigger>
//                     <SelectContent className="max-h-64">
//                       <div className="p-2">
//                         <Input
//                           placeholder="Search phone numbers..."
//                           value={phoneSearch}
//                           onChange={(e) => {
//                             setPhoneSearch(e.target.value)
//                             if (e.target.value) {
//                               fetchPhoneNumbersWithSearch(selectedCountry, e.target.value)
//                             } else {
//                               fetchPhoneNumbers(selectedCountry)
//                             }
//                           }}
//                           className="mb-2"
//                         />
//                       </div>
//                       {filteredPhoneNumbers.map((phone) => (
//                         <SelectItem key={phone.phone_number} value={phone.phone_number}>
//                           <div className="flex flex-col">
//                             <span>{phone.phone_number}</span>
//                             <span className="text-xs">
//                               {phone.locality}, {phone.region}
//                             </span>
//                           </div>
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Step 3: Bundle Selection */}
//           {selectedPhone && (
//             <Card className="border-2 border-border">
//               <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//                 <CardTitle className="flex items-center gap-2">
//                   <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
//                     3
//                   </span>
//                   Select or Create Bundle
//                 </CardTitle>
//                 <CardDescription>Choose an existing bundle or create a new one</CardDescription>
//               </CardHeader>
//               <CardContent className="pt-6 space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Bundle</label>
//                   <div className="flex gap-2">
//                     <Select value={selectedBundle} onValueChange={handleBundleSelect}>
//                       <SelectTrigger className="flex-1">
//                         <SelectValue placeholder="Search and select bundle..." />
//                       </SelectTrigger>
//                       <SelectContent className="max-h-64">
//                         <div className="p-2">
//                           <Input
//                             placeholder="Search bundles..."
//                             value={bundleSearch}
//                             onChange={(e) => setBundleSearch(e.target.value)}
//                             className="mb-2"
//                           />
//                         </div>
//                         {filteredBundles.map((bundle) => (
//                           <SelectItem key={bundle.id} value={bundle.id}>
//                             {bundle.friendly_name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <Button onClick={() => setShowCreateBundleModal(true)} className="whitespace-nowrap">
//                       Create Bundle
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Continue Button */}
//                 <Button onClick={handleProceedToEndUser} disabled={!selectedBundle} className="w-full mt-6" size="lg">
//                   Continue to End User Details
//                 </Button>
//               </CardContent>
//             </Card>
//           )}

//           {/* Cancel Button */}
//           <Button onClick={() => router.back()} variant="outline" className="w-full">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Cancel
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }


// "use client"
// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ArrowLeft } from "lucide-react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { useRouter } from "next/navigation"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { CreateBundleModal } from "./create-bundle-modal"
// import { EndUserModal } from "./end-user-modal"
// import { AddressModal } from "./address-modal"
// import { FinalSubmissionModal } from "./final-submission-modal"

// interface Country {
//   country: string
//   country_code: string
// }

// interface PhoneNumber {
//   phone_number: string
//   friendly_name: string
//   locality: string
//   region: string
//   iso_country: string
// }

// interface Bundle {
//   id: string
//   friendly_name: string
// }

// interface BundleData {
//   friendly_name: string
//   iso_country: string
//   number_type: string
//   email: string
// }

// type WizardStep = "country" | "phone" | "bundle" | "create-bundle" | "end-user" | "address" | "final-submission"

// export function PhoneNumberBuyForm() {
//   const router = useRouter()
//   const [currentStep, setCurrentStep] = useState<WizardStep>("country")
//   const [isLoading, setIsLoading] = useState(false)
//   const [countries, setCountries] = useState<Country[]>([])
//   const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([])
//   const [bundles, setBundles] = useState<Bundle[]>([])
//   const [countrySearch, setCountrySearch] = useState("")
//   const [phoneSearch, setPhoneSearch] = useState("")
//   const [bundleSearch, setBundleSearch] = useState("")
//   const [selectedCountry, setSelectedCountry] = useState("")
//   const [selectedPhone, setSelectedPhone] = useState("")
//   const [selectedBundle, setSelectedBundle] = useState("")
//   const [showCreateBundleModal, setShowCreateBundleModal] = useState(false)
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const authToken = localStorage.getItem("authToken")

//   useEffect(() => {
//     fetchCountries()
//     fetchBundles()
//   }, [])

//   const fetchCountries = async () => {
//     try {
//       setIsLoading(true)
//       const response = await axios.get(`${BASE_URL}/phone_number/countries`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setCountries(response.data.countries || [])
//     } catch (err) {
//       console.log("[v0] Error fetching countries:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to fetch countries",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const fetchPhoneNumbers = async (countryCode: string) => {
//     try {
//       setIsLoading(true)
//       const response = await axios.get(`${BASE_URL}/phone_number/available_phone_numbers?country=${countryCode}`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setPhoneNumbers(response.data.phone_numbers || [])
//       setSelectedPhone("")
//     } catch (err) {
//       console.log("[v0] Error fetching phone numbers:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to fetch phone numbers",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const fetchPhoneNumbersWithSearch = async (countryCode: string, searchTerm: string) => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/phone_number/available_phone_numbers?country=${countryCode}&search=${searchTerm}`,
//         {
//           headers: { Authorization: `Bearer ${authToken}` },
//         },
//       )
//       setPhoneNumbers(response.data.phone_numbers || [])
//     } catch (err) {
//       console.log("[v0] Error fetching phone numbers:", err)
//     }
//   }

//   const fetchBundles = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/phone_number/bundles`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setBundles(response.data.results || response.data || [])
//     } catch (err) {
//       console.log("[v0] Error fetching bundles:", err)
//     }
//   }

//   const handleCountrySelect = (value: string) => {
//     setSelectedCountry(value)
//     setPhoneNumbers([])
//     setSelectedPhone("")
//     setCurrentStep("phone")
//     fetchPhoneNumbers(value)
//   }

//   const fetchCountriesWithSearch = async (searchTerm: string) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/phone_number/countries?search=${searchTerm}`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       })
//       setCountries(response.data.countries || [])
//     } catch (err) {
//       console.log("[v0] Error fetching countries:", err)
//     }
//   }

//   const handlePhoneSelect = (value: string) => {
//     setSelectedPhone(value)
//     setCurrentStep("bundle")
//   }

//   const handleBundleSelect = (value: string) => {
//     setSelectedBundle(value)
//   }

//   const handleBundleCreated = () => {
//     fetchBundles()
//     setShowCreateBundleModal(false)
//     setToast({
//       title: "Success",
//       description: "Bundle data saved. Proceeding to End User Details",
//       variant: "default",
//     })
//     setTimeout(() => {
//       setCurrentStep("end-user")
//     }, 1500)
//   }

//   const handleSubmitPurchase = async () => {
//     if (!selectedBundle || !selectedPhone) {
//       setToast({
//         title: "Error",
//         description: "Please select a phone number and bundle",
//         variant: "destructive",
//       })
//       return
//     }

//     try {
//       setIsLoading(true)
//       await axios.post(
//         `${BASE_URL}/phone_number/buy`,
//         {
//           phone_number: selectedPhone,
//           bundle_id: selectedBundle,
//         },
//         {
//           headers: { Authorization: `Bearer ${authToken}` },
//         },
//       )

//       setToast({
//         title: "Success",
//         description: "Phone number purchase completed",
//         variant: "default",
//       })

//       localStorage.removeItem("bundleFormData")
//       localStorage.removeItem("endUserFormData")
//       localStorage.removeItem("addressFormData")

//       setTimeout(() => {
//         router.push("/dashboard")
//       }, 2000)
//     } catch (err) {
//       console.log("[v0] Error submitting purchase:", err)
//       setToast({
//         title: "Error",
//         description: "Failed to complete purchase",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const filteredCountries = countries.filter((c) => c.country.toLowerCase().includes(countrySearch.toLowerCase()))

//   const filteredPhoneNumbers = phoneNumbers.filter(
//     (p) =>
//       p.phone_number.toLowerCase().includes(phoneSearch.toLowerCase()) ||
//       p.friendly_name.toLowerCase().includes(phoneSearch.toLowerCase()),
//   )

//   const filteredBundles = bundles.filter((b) => b.friendly_name.toLowerCase().includes(bundleSearch.toLowerCase()))

//   if (currentStep === "end-user") {
//     return (
//       <EndUserModal
//         bundleCountry={selectedCountry}
//         onBack={() => setCurrentStep("bundle")}
//         onNext={() => setCurrentStep("address")}
//       />
//     )
//   }

//   if (currentStep === "address") {
//     return (
//       <AddressModal
//         bundleCountry={selectedCountry}
//         onBack={() => setCurrentStep("end-user")}
//         onNext={() => setCurrentStep("final-submission")}
//       />
//     )
//   }

//   if (currentStep === "final-submission") {
//     return (
//       <FinalSubmissionModal
//         phoneNumber={selectedPhone}
//         bundleId={selectedBundle}
//         countryCode={selectedCountry}
//         onBack={() => setCurrentStep("address")}
//       />
//     )
//   }

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <LoaderOverlay isLoading={isLoading} message="Loading data..." />

//       {toast && (
//         <ToastNotification
//           title={toast.title}
//           description={toast.description}
//           variant={toast.variant}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <CreateBundleModal
//         isOpen={showCreateBundleModal}
//         countryCode={selectedCountry}
//         onClose={() => setShowCreateBundleModal(false)}
//         onBundleCreated={handleBundleCreated}
//       />

//       <div className="p-4 md:p-8 space-y-8">
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-foreground">Buy Phone Number</h1>
//               <p className="text-muted-foreground mt-2">Select country, phone number, and bundle</p>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-4xl mx-auto space-y-6">
//           <Card className="border-2 border-border">
//             <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//               <CardTitle className="flex items-center gap-2">
//                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
//                   1
//                 </span>
//                 Select Country
//               </CardTitle>
//               <CardDescription>Choose the country code for your phone number</CardDescription>
//             </CardHeader>
//             <CardContent className="pt-6 space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">Country Code</label>
//                 <Select value={selectedCountry} onValueChange={handleCountrySelect}>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Search and select country..." />
//                   </SelectTrigger>
//                   <SelectContent className="max-h-64">
//                     <div className="p-2">
//                       <Input
//                         placeholder="Search countries..."
//                         value={countrySearch}
//                         onChange={(e) => {
//                           setCountrySearch(e.target.value)
//                           if (e.target.value) {
//                             fetchCountriesWithSearch(e.target.value)
//                           } else {
//                             fetchCountries()
//                           }
//                         }}
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
//             </CardContent>
//           </Card>

//           {selectedCountry && (
//             <Card className="border-2 border-border">
//               <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//                 <CardTitle className="flex items-center gap-2">
//                   <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
//                     2
//                   </span>
//                   Select Phone Number
//                 </CardTitle>
//                 <CardDescription>Available phone numbers in {selectedCountry}</CardDescription>
//               </CardHeader>
//               <CardContent className="pt-6 space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Phone Number</label>
//                   <Select value={selectedPhone} onValueChange={handlePhoneSelect}>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Search and select phone number..." />
//                     </SelectTrigger>
//                     <SelectContent className="max-h-64">
//                       <div className="p-2">
//                         <Input
//                           placeholder="Search phone numbers..."
//                           value={phoneSearch}
//                           onChange={(e) => {
//                             setPhoneSearch(e.target.value)
//                             if (e.target.value) {
//                               fetchPhoneNumbersWithSearch(selectedCountry, e.target.value)
//                             } else {
//                               fetchPhoneNumbers(selectedCountry)
//                             }
//                           }}
//                           className="mb-2"
//                         />
//                       </div>
//                       {filteredPhoneNumbers.map((phone) => (
//                         <SelectItem key={phone.phone_number} value={phone.phone_number}>
//                           <div className="flex flex-col">
//                             <span>{phone.phone_number}</span>
//                             <span className="text-xs text-muted-foreground hover:text-foreground">
//                               {phone.locality}, {phone.region}
//                             </span>
//                           </div>
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {selectedPhone && (
//             <Card className="border-2 border-border">
//               <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
//                 <CardTitle className="flex items-center gap-2">
//                   <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
//                     3
//                   </span>
//                   Select or Create Bundle
//                 </CardTitle>
//                 <CardDescription>Choose an existing bundle or create a new one</CardDescription>
//               </CardHeader>
//               <CardContent className="pt-6 space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Bundle</label>
//                   <div className="flex gap-2">
//                     <Select value={selectedBundle} onValueChange={(value) => setSelectedBundle(value)}>
//                       <SelectTrigger className="flex-1">
//                         <SelectValue placeholder="Search and select bundle..." />
//                       </SelectTrigger>
//                       <SelectContent className="max-h-64">
//                         <div className="p-2">
//                           <Input
//                             placeholder="Search bundles..."
//                             value={bundleSearch}
//                             onChange={(e) => setBundleSearch(e.target.value)}
//                             className="mb-2"
//                           />
//                         </div>
//                         {filteredBundles.map((bundle) => (
//                           <SelectItem key={bundle.id} value={bundle.id}>
//                             {bundle.friendly_name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <Button onClick={() => setShowCreateBundleModal(true)} className="whitespace-nowrap">
//                       Create Bundle
//                     </Button>
//                   </div>
//                 </div>

//                 <Button onClick={handleSubmitPurchase} disabled={!selectedBundle} className="w-full mt-6" size="lg">
//                   Submit Purchase
//                 </Button>
//               </CardContent>
//             </Card>
//           )}

//           <Button onClick={() => router.back()} variant="outline" className="w-full">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Cancel
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ChevronDown, Search } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "@/components/auth/loader-overlay"
import { ToastNotification } from "@/components/auth/toast-notification"
import { CreateBundleModal } from "./create-bundle-modal"
import { EndUserModal } from "./end-user-modal"
import { AddressModal } from "./address-modal"
import { FinalSubmissionModal } from "./final-submission-modal"
import { useRouter } from "next/navigation"

interface Country {
  country: string
  country_code: string
}

interface PhoneNumber {
  phone_number: string
  friendly_name: string
  locality: string
  region: string
}

interface Bundle {
  id: string
  friendly_name: string
}

export function PhoneNumberBuyForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState("")
  const [toast, setToast] = useState<any>(null)
  const router = useRouter()

  // Country selection
  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState("")
  const [countrySearch, setCountrySearch] = useState("")
  const [showCountriesDropdown, setShowCountriesDropdown] = useState(false)

  // Phone number selection
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([])
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("")
  const [phoneSearch, setPhoneSearch] = useState("")
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false)

  // Bundle selection
  const [bundles, setBundles] = useState<Bundle[]>([])
  const [selectedBundle, setSelectedBundle] = useState("")
  const [bundleSearch, setBundleSearch] = useState("")
  const [showBundleDropdown, setShowBundleDropdown] = useState(false)

  // Modals
  const [showCreateBundleModal, setShowCreateBundleModal] = useState(false)
  const [showEndUserModal, setShowEndUserModal] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [showFinalModal, setShowFinalModal] = useState(false)
  const [createBundleStep, setCreateBundleStep] = useState(0)

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchCountries()
      fetchBundles()
    }
  }, [])

  const fetchCountries = async () => {
    try {
      const authToken = localStorage.getItem("authToken")
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

  const fetchBundles = async () => {
    try {
      const authToken = localStorage.getItem("authToken")
      const response = await axios.get(`${BASE_URL}/phone_number/bundles`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      setBundles(response.data.results || [])
    } catch (err) {
      console.log("[v0] Error fetching bundles:", err)
    }
  }

  const fetchPhoneNumbers = async (countryCode: string) => {
    try {
      setIsFetching(true)
      const authToken = localStorage.getItem("authToken")
      const response = await axios.get(`${BASE_URL}/phone_number/available_phone_numbers?country=${countryCode}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      if (response.data.phone_numbers) {
        setPhoneNumbers(response.data.phone_numbers)
      }
    } catch (err) {
      console.log("[v0] Error fetching phone numbers:", err)
      setError("Failed to load phone numbers")
    } finally {
      setIsFetching(false)
    }
  }

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode)
    setShowCountriesDropdown(false)
    setCountrySearch("")
    fetchPhoneNumbers(countryCode)
    setSelectedPhoneNumber("")
    setPhoneNumbers([])
  }

  const filteredCountries = countries.filter(
    (c) =>
      c.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.country_code.toLowerCase().includes(countrySearch.toLowerCase()),
  )

  const filteredPhoneNumbers = phoneNumbers.filter((p) =>
    p.phone_number.toLowerCase().includes(phoneSearch.toLowerCase()),
  )

  const filteredBundles = bundles.filter((b) => b.friendly_name.toLowerCase().includes(bundleSearch.toLowerCase()))

  const handleCreateBundleNext = () => {
    setCreateBundleStep(1)
  }

  const handleEndUserNext = () => {
    setCreateBundleStep(2)
  }

  const handleAddressNext = () => {
    setShowFinalModal(true)
  }

  const handleFinalSubmitSuccess = (bundleData: any) => {
    setBundles((prev) => [...prev, bundleData])
    setSelectedBundle(bundleData.id)
    setShowCreateBundleModal(false)
    setShowFinalModal(false)
    setCreateBundleStep(0)
    setToast({
      title: "Success",
      description: "Bundle created successfully",
      variant: "default",
    })
  }

  const handleSubmitPurchase = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!selectedPhoneNumber || !selectedBundle) {
      setError("Please select both phone number and bundle")
      return
    }

    try {
      setIsLoading(true)
      const authToken = localStorage.getItem("authToken")

      const response = await axios.post(
        `${BASE_URL}/phone_number/buy`,
        {
          phone_number: selectedPhoneNumber,
          bundle_id: selectedBundle,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      )

      setToast({
        title: "Success",
        description: "Phone number purchased successfully",
        variant: "default",
      })

      setTimeout(() => {
        router.push("/dashboard/phone-numbers")
      }, 2000)
    } catch (err) {
      console.log("[v0] Error purchasing phone number:", err)
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.error || "Failed to purchase phone number"
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <LoaderOverlay isLoading={isLoading || isFetching} />
      {toast && (
        <ToastNotification
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}

      <CreateBundleModal
        open={showCreateBundleModal && createBundleStep === 0}
        onOpenChange={(open) => !open && setShowCreateBundleModal(false)}
        onNext={handleCreateBundleNext}
        selectedCountryCode={selectedCountry}
      />

      <EndUserModal
        open={showCreateBundleModal && createBundleStep === 1}
        onOpenChange={(open) => !open && setShowCreateBundleModal(false)}
        onBack={() => setCreateBundleStep(0)}
        onNext={handleEndUserNext}
      />

      <AddressModal
        open={showCreateBundleModal && createBundleStep === 2}
        onOpenChange={(open) => !open && setShowCreateBundleModal(false)}
        onBack={() => setCreateBundleStep(1)}
        onNext={handleAddressNext}
        selectedCountryCode={selectedCountry}
      />

      <FinalSubmissionModal
        open={showFinalModal}
        onOpenChange={(open) => !open && setShowFinalModal(false)}
        onBack={() => {
          setShowFinalModal(false)
          setCreateBundleStep(2)
        }}
        onSuccess={handleFinalSubmitSuccess}
      />

      <div className="p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Buy Phone Number</h1>
            <p className="text-muted-foreground mt-2">Select country, phone number, and bundle to purchase</p>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm font-medium">
            {error}
          </div>
        )}

        <Card className="border-2 border-border shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border p-6">
            <CardTitle className="text-2xl">Phone Number Purchase</CardTitle>
            <CardDescription>Select your preferred country, phone number, and bundle</CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={handleSubmitPurchase} className="space-y-6">
              {/* Country Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Select Country *</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountriesDropdown(!showCountriesDropdown)}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground text-left flex items-center justify-between hover:border-primary focus:border-primary transition-all"
                  >
                    <span>
                      {selectedCountry
                        ? `${selectedCountry} - ${countries.find((c) => c.country_code === selectedCountry)?.country}`
                        : "Select Country"}
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
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className="border border-border"
                        />
                      </div>
                      <div className="overflow-y-auto">
                        {filteredCountries.map((country) => (
                          <button
                            key={country.country_code}
                            type="button"
                            onClick={() => handleCountrySelect(country.country_code)}
                            className="w-full px-4 py-3 text-left hover:bg-primary/10 text-foreground flex items-center justify-between border-b border-border/50 last:border-b-0"
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

              {/* Phone Number Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Select Phone Number *</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPhoneDropdown(!showPhoneDropdown)}
                    disabled={!selectedCountry}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground text-left flex items-center justify-between hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <span>
                      {selectedPhoneNumber || (selectedCountry ? "Select Phone Number" : "Select a country first")}
                    </span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${showPhoneDropdown ? "rotate-180" : ""}`} />
                  </button>

                  {showPhoneDropdown && selectedCountry && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-background border-2 border-border rounded-lg shadow-lg z-50 max-h-64 overflow-hidden flex flex-col">
                      <div className="p-2 border-b border-border">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="Search phone numbers..."
                            value={phoneSearch}
                            onChange={(e) => setPhoneSearch(e.target.value)}
                            className="border border-border pl-9"
                          />
                        </div>
                      </div>
                      <div className="overflow-y-auto">
                        {filteredPhoneNumbers.map((phone) => (
                          <button
                            key={phone.phone_number}
                            type="button"
                            onClick={() => {
                              setSelectedPhoneNumber(phone.phone_number)
                              setShowPhoneDropdown(false)
                              setPhoneSearch("")
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-primary/10 text-foreground flex items-center justify-between border-b border-border/50 last:border-b-0"
                          >
                            <div>
                              <p className="font-medium">{phone.phone_number}</p>
                              <p className="text-xs text-muted-foreground">
                                {phone.locality}, {phone.region}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bundle Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-foreground">Select Bundle *</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCreateBundleStep(0)
                      setShowCreateBundleModal(true)
                    }}
                    className="text-xs border-2 border-primary text-primary hover:bg-muted bg-gradient-to-r from-primary/20 to-primary/20 dark:hover:text-white/50"
                  >
                    + Create Bundle
                  </Button>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowBundleDropdown(!showBundleDropdown)}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground text-left flex items-center justify-between hover:border-primary transition-all"
                  >
                    <span>
                      {selectedBundle ? bundles.find((b) => b.id === selectedBundle)?.friendly_name : "Select Bundle"}
                    </span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${showBundleDropdown ? "rotate-180" : ""}`} />
                  </button>

                  {showBundleDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-background border-2 border-border rounded-lg shadow-lg z-50 max-h-64 overflow-hidden flex flex-col">
                      <div className="p-2 border-b border-border">
                        <Input
                          placeholder="Search bundles..."
                          value={bundleSearch}
                          onChange={(e) => setBundleSearch(e.target.value)}
                          className="border border-border"
                        />
                      </div>
                      <div className="overflow-y-auto">
                        {filteredBundles.map((bundle) => (
                          <button
                            key={bundle.id}
                            type="button"
                            onClick={() => {
                              setSelectedBundle(bundle.id)
                              setShowBundleDropdown(false)
                              setBundleSearch("")
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-primary/10 text-foreground border-b border-border/50 last:border-b-0"
                          >
                            {bundle.friendly_name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  className="border-2 border-border bg-gradient-to-r from-primary/20 to-primary/20 dark:hover:text-white/50"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !selectedPhoneNumber || !selectedBundle}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  {isLoading ? "Processing..." : "Submit Purchase"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
