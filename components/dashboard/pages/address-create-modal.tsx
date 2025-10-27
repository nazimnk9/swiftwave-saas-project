// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { X } from "lucide-react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { ToastNotification } from "@/components/auth/toast-notification"

// interface AddressCreateModalProps {
//   onClose: () => void
//   onAddressCreated: (address: { id: string; customer_name: string }) => void
// }

// export function AddressCreateModal({ onClose, onAddressCreated }: AddressCreateModalProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)

//   const [formData, setFormData] = useState({
//     customer_name: "",
//     street: "",
//     city: "",
//     region: "",
//     postal_code: "",
//     iso_country: "US",
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     if (!formData.customer_name || !formData.street || !formData.city || !formData.region || !formData.postal_code) {
//       setError("Please fill in all required fields")
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
//         `${BASE_URL}/phone_number/addresses/create`,
//         {
//           customer_name: formData.customer_name,
//           street: formData.street,
//           city: formData.city,
//           region: formData.region,
//           postal_code: formData.postal_code,
//           iso_country: formData.iso_country,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         },
//       )

//       console.log("[v0] Address created:", response.data)
//       setToast({
//         title: "Success",
//         description: "Address created successfully",
//         variant: "default",
//       })

//       onAddressCreated({
//         id: response.data.id || response.data.address_id,
//         customer_name: formData.customer_name,
//       })
//     } catch (err) {
//       console.log("[v0] Error creating address:", err)
//       if (axios.isAxiosError(err)) {
//         const errorMessage = err.response?.data?.error || "Failed to create address"
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
//         <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border p-6 flex flex-row items-center justify-between space-y-0 pb-4">
//           <div>
//             <CardTitle className="text-xl">Create Address</CardTitle>
//             <CardDescription className="mt-1">Add a new address for phone number</CardDescription>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-muted rounded-lg p-1"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </CardHeader>

//         <CardContent className="pt-6">
//           {error && (
//             <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm mb-4 font-medium">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Customer Name */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Customer Name *</label>
//               <Input
//                 type="text"
//                 name="customer_name"
//                 placeholder="John Doe"
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
//                 placeholder="123 Main St"
//                 value={formData.street}
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

//             {/* Region */}
//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">Region *</label>
//               <Input
//                 type="text"
//                 name="region"
//                 placeholder="CA"
//                 value={formData.region}
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

//             <div>
//               <label className="block text-sm font-semibold text-foreground mb-2">ISO Country *</label>
//               <Input
//                 type="text"
//                 name="iso_country"
//                 placeholder="US"
//                 value={formData.iso_country}
//                 onChange={handleChange}
//                 className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-3 pt-4 border-t border-border">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onClose}
//                 className="flex-1 border-2 border-border hover:bg-muted bg-gradient-to-r from-primary/20 to-primary/20 dark:hover:text-white/50 text-foreground font-semibold transition-all duration-200"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
//               >
//                 {isLoading ? "Creating..." : "Submit"}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { ToastNotification } from "@/components/auth/toast-notification"

interface AddressCreateModalProps {
  onClose: () => void
  onAddressCreated: (address: {
    id: string
    customer_name: string
    street: string
    city: string
    postal_code: string
  }) => void
}

export function AddressCreateModal({ onClose, onAddressCreated }: AddressCreateModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [toast, setToast] = useState<{
    title: string
    description: string
    variant: "default" | "destructive"
  } | null>(null)

  const [formData, setFormData] = useState({
    customer_name: "",
    street: "",
    city: "",
    region: "",
    postal_code: "",
    iso_country: "US",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // if (!formData.customer_name || !formData.street || !formData.city || !formData.region || !formData.postal_code) {
    //   setError("Please fill in all required fields")
    //   return
    // }

    try {
      setIsLoading(true)
      const authToken = localStorage.getItem("authToken")

      if (!authToken) {
        setError("Authentication token not found")
        setIsLoading(false)
        return
      }

      const response = await axios.post(
        `${BASE_URL}/phone_number/addresses/create`,
        {
          customer_name: formData.customer_name,
          street: formData.street,
          city: formData.city,
          region: formData.region,
          postal_code: formData.postal_code,
          iso_country: formData.iso_country,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )

      console.log("[v0] Address created:", response.data)
      setToast({
        title: "Success",
        description: "Address created successfully",
        variant: "default",
      })

      onAddressCreated({
        id: response.data.id || response.data.address_id,
        customer_name: formData.customer_name,
        street: formData.street,
        city: formData.city,
        postal_code: formData.postal_code,
      })
    } catch (err) {
      console.log("[v0] Error creating address:", err)
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.error || "Failed to create address"
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      {toast && (
        <ToastNotification
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}

      <Card className="w-full max-w-md border-2 border-border shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border flex flex-row items-center justify-between space-y-0 p-6">
          <div>
            <CardTitle className="text-xl">Create Address</CardTitle>
            <CardDescription className="mt-1">Add a new address for phone number</CardDescription>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-muted rounded-lg p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent className="pt-6 bg-background">
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm mb-4 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Customer Name *</label>
              <Input
                type="text"
                name="customer_name"
                placeholder="John Doe"
                value={formData.customer_name}
                onChange={handleChange}
                className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
              />
            </div>

            {/* Street */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Street *</label>
              <Input
                type="text"
                name="street"
                placeholder="123 Main St"
                value={formData.street}
                onChange={handleChange}
                className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">City *</label>
              <Input
                type="text"
                name="city"
                placeholder="San Francisco"
                value={formData.city}
                onChange={handleChange}
                className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
              />
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Region *</label>
              <Input
                type="text"
                name="region"
                placeholder="CA"
                value={formData.region}
                onChange={handleChange}
                className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
              />
            </div>

            {/* Postal Code */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Postal Code *</label>
              <Input
                type="text"
                name="postal_code"
                placeholder="94102"
                value={formData.postal_code}
                onChange={handleChange}
                className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">ISO Country *</label>
              <Input
                type="text"
                name="iso_country"
                placeholder="US"
                value={formData.iso_country}
                onChange={handleChange}
                className="w-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-2.5 transition-all duration-200 bg-background"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-2 border-border hover:bg-muted bg-gradient-to-r from-primary/20 to-primary/20 dark:hover:text-white/50 text-foreground font-semibold transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? "Creating..." : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

