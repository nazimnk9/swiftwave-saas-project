// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Skeleton } from "@/components/ui/skeleton"
// import { User, Mail, Phone, Building, Edit2, Save } from "lucide-react"

// export function ProfilePage() {
//   const [isLoading, setIsLoading] = useState(true)
//   const [isEditing, setIsEditing] = useState(false)
//   const [isSaving, setIsSaving] = useState(false)
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     company: "",
//   })

//   useEffect(() => {
//     const firstName = localStorage.getItem("userFirstName") || ""
//     const lastName = localStorage.getItem("userLastName") || ""
//     const email = localStorage.getItem("userEmail") || ""
//     const phone = localStorage.getItem("userPhone") || ""
//     const company = localStorage.getItem("userCompany") || ""

//     setProfileData({ firstName, lastName, email, phone, company })
//     setIsLoading(false)
//   }, [])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setProfileData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSave = async () => {
//     setIsSaving(true)
//     // Save to localStorage
//     localStorage.setItem("userFirstName", profileData.firstName)
//     localStorage.setItem("userLastName", profileData.lastName)
//     localStorage.setItem("userPhone", profileData.phone)
//     localStorage.setItem("userCompany", profileData.company)

//     await new Promise((resolve) => setTimeout(resolve, 1000))
//     setIsSaving(false)
//     setIsEditing(false)
//   }

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <div className="p-4 md:p-8 space-y-8">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">Profile</h1>
//             <p className="text-muted-foreground mt-2">View and manage your profile information</p>
//           </div>
//           <Button
//             onClick={() => setIsEditing(!isEditing)}
//             variant={isEditing ? "outline" : "default"}
//             className="gap-2"
//           >
//             <Edit2 className="w-4 h-4" />
//             {isEditing ? "Cancel" : "Edit Profile"}
//           </Button>
//         </div>

//         {/* Profile Card */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <User className="w-5 h-5" />
//               Personal Information
//             </CardTitle>
//             <CardDescription>Your profile details</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {isLoading ? (
//               <>
//                 {[1, 2, 3, 4, 5].map((i) => (
//                   <Skeleton key={i} className="h-11 w-full" />
//                 ))}
//               </>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-foreground flex items-center gap-2">
//                       <User className="w-4 h-4" />
//                       First Name
//                     </label>
//                     <Input
//                       type="text"
//                       name="firstName"
//                       value={profileData.firstName}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-foreground flex items-center gap-2">
//                       <User className="w-4 h-4" />
//                       Last Name
//                     </label>
//                     <Input
//                       type="text"
//                       name="lastName"
//                       value={profileData.lastName}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground flex items-center gap-2">
//                     <Mail className="w-4 h-4" />
//                     Email Address
//                   </label>
//                   <Input
//                     type="email"
//                     name="email"
//                     value={profileData.email}
//                     disabled
//                     className="h-11 border-2 border-border bg-muted"
//                   />
//                   <p className="text-xs text-muted-foreground">Email cannot be changed</p>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground flex items-center gap-2">
//                     <Phone className="w-4 h-4" />
//                     Phone Number
//                   </label>
//                   <Input
//                     type="tel"
//                     name="phone"
//                     value={profileData.phone}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground flex items-center gap-2">
//                     <Building className="w-4 h-4" />
//                     Company Name
//                   </label>
//                   <Input
//                     type="text"
//                     name="company"
//                     value={profileData.company}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>

//                 {isEditing && (
//                   <Button
//                     onClick={handleSave}
//                     disabled={isSaving}
//                     className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
//                   >
//                     <Save className="w-4 h-4" />
//                     {isSaving ? "Saving..." : "Save Changes"}
//                   </Button>
//                 )}
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* Account Summary */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle>Account Summary</CardTitle>
//             <CardDescription>Your account details</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="p-4 border border-border rounded-lg">
//                 <p className="text-sm text-muted-foreground">Account Status</p>
//                 <p className="text-lg font-semibold text-foreground mt-1">Active</p>
//               </div>
//               <div className="p-4 border border-border rounded-lg">
//                 <p className="text-sm text-muted-foreground">Member Since</p>
//                 <p className="text-lg font-semibold text-foreground mt-1">2024</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Skeleton } from "@/components/ui/skeleton"
// import { User, Mail, Phone, Building, Edit2, Save } from "lucide-react"
// import { ToastNotification } from "@/components/auth/toast-notification"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { BASE_URL } from "@/lib/baseUrl"

// export function ProfilePage() {
//   const [isLoading, setIsLoading] = useState(true)
//   const [isEditing, setIsEditing] = useState(false)
//   const [isSaving, setIsSaving] = useState(false)
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     company: "",
//     address: "",
//     description: "",
//     website: "",
//     country: "",
//     name: "",
//     //status: "",
//   })
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)
//   const [errors, setErrors] = useState<Record<string, string>>({})

//   useEffect(() => {
//     const fetchOrgData = async () => {
//       try {
//         const authToken = localStorage.getItem("authToken")
//         if (!authToken) {
//           setIsLoading(false)
//           return
//         }

//         const response = await axios.get(`${BASE_URL}/organizations/me`, {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         })

//         const data = response.data
//         setProfileData((prev) => ({
//           ...prev,
//           firstName: data.first_name || "",
//           lastName: data.last_name || "",
//           email: data.email || "",
//           phone: data.phone || "",
//           address: data.address || "",
//           description: data.description || "",
//           website: data.website || "",
//           country: data.country || "",
//           name: data.name || "",
//           //status: data.status || "",
//         }))
//       } catch (err) {
//         console.error("Error fetching organization data:", err)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchOrgData()
//   }, [])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setProfileData((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev }
//         delete newErrors[name]
//         return newErrors
//       })
//     }
//   }

//   const handleSave = async () => {
//     setIsSaving(true)
//     setErrors({})

//     try {
//       const authToken = localStorage.getItem("authToken")
//       if (!authToken) {
//         setToast({
//           title: "Error",
//           description: "Authentication token not found",
//           variant: "destructive",
//         })
//         setIsSaving(false)
//         return
//       }

//       const response = await axios.patch(
//         `${BASE_URL}/organizations/me`,
//         {
//           email: profileData.email,
//           phone: profileData.phone,
//           website: profileData.website,
//           address: profileData.address,
//           country: profileData.country,
//           description: profileData.description,
//           name: profileData.name,
//           //status: profileData.status,
//           first_name: profileData.firstName,
//           last_name: profileData.lastName,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         },
//       )

//       setToast({
//         title: "Success",
//         description: "Profile updated successfully",
//         variant: "default",
//       })
//       setIsEditing(false)
//     } catch (err) {
//       if (axios.isAxiosError(err) && err.response?.data?.errors) {
//         setErrors(err.response.data.errors)
//         setToast({
//           title: "Validation Error",
//           description: "Please check the errors below",
//           variant: "destructive",
//         })
//       } else {
//         setToast({
//           title: "Error",
//           description: "Failed to update profile",
//           variant: "destructive",
//         })
//       }
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <LoaderOverlay isLoading={isSaving} message="Updating profile..." />

//       {toast && (
//         <ToastNotification
//           title={toast.title}
//           description={toast.description}
//           variant={toast.variant}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <div className="p-4 md:p-8 space-y-8">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">Profile</h1>
//             <p className="text-muted-foreground mt-2">View and manage your profile information</p>
//           </div>
//           {/* <Button
//             onClick={() => setIsEditing(!isEditing)}
//             variant={isEditing ? "outline" : "default"}
//             className="gap-2"
//           >
//             <Edit2 className="w-4 h-4" />
//             {isEditing ? "Cancel" : "Edit Profile"}
//           </Button> */}
//         </div>

//         {/* Profile Card */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <User className="w-5 h-5" />
//               Personal Information
//             </CardTitle>
//             <CardDescription>Your profile details</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {isLoading ? (
//               <>
//                 {[1, 2, 3, 4, 5].map((i) => (
//                   <Skeleton key={i} className="h-11 w-full" />
//                 ))}
//               </>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-foreground flex items-center gap-2">
//                       <User className="w-4 h-4" />
//                       First Name
//                     </label>
//                     <Input
//                       type="text"
//                       name="firstName"
//                       value={profileData.firstName}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="h-11 border-2 border-border focus:border-primary"
//                     />
//                     {errors.first_name && <p className="text-xs text-destructive">{errors.first_name}</p>}
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-foreground flex items-center gap-2">
//                       <User className="w-4 h-4" />
//                       Last Name
//                     </label>
//                     <Input
//                       type="text"
//                       name="lastName"
//                       value={profileData.lastName}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="h-11 border-2 border-border focus:border-primary"
//                     />
//                     {errors.last_name && <p className="text-xs text-destructive">{errors.last_name}</p>}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground flex items-center gap-2">
//                     <Mail className="w-4 h-4" />
//                     Email Address
//                   </label>
//                   <Input
//                     type="email"
//                     name="email"
//                     value={profileData.email}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                   {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground flex items-center gap-2">
//                     <Phone className="w-4 h-4" />
//                     Phone Number
//                   </label>
//                   <Input
//                     type="tel"
//                     name="phone"
//                     value={profileData.phone}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                   {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground flex items-center gap-2">
//                     <Building className="w-4 h-4" />
//                     Company Name
//                   </label>
//                   <Input
//                     type="text"
//                     name="name"
//                     value={profileData.name}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                   {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Website</label>
//                   <Input
//                     type="url"
//                     name="website"
//                     value={profileData.website}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     placeholder="https://example.com"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                   {errors.website && <p className="text-xs text-destructive">{errors.website}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Country</label>
//                   <Input
//                     type="text"
//                     name="country"
//                     value={profileData.country}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     placeholder="e.g., Bangladesh"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                   {errors.country && <p className="text-xs text-destructive">{errors.country}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Address</label>
//                   <textarea
//                     name="address"
//                     value={profileData.address}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     placeholder="Enter your address"
//                     className="w-full px-3 py-2 border-2 border-border rounded-md focus:border-primary focus:outline-none resize-none disabled:bg-muted disabled:cursor-not-allowed"
//                     rows={3}
//                   />
//                   {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Description</label>
//                   <textarea
//                     name="description"
//                     value={profileData.description}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     placeholder="Enter your description"
//                     className="w-full px-3 py-2 border-2 border-border rounded-md focus:border-primary focus:outline-none resize-none disabled:bg-muted disabled:cursor-not-allowed"
//                     rows={3}
//                   />
//                   {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
//                 </div>
//                 {/* <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Status</label>
//                   <Input
//                     type="text"
//                     name="status"
//                     value={profileData.status}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     placeholder="e.g., ACTIVE"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                   {errors.status && <p className="text-xs text-destructive">{errors.status}</p>}
//                 </div> */}

//                 {isEditing && (
//                   <Button
//                     onClick={handleSave}
//                     disabled={isSaving}
//                     className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
//                   >
//                     <Save className="w-4 h-4" />
//                     {isSaving ? "Saving..." : "Save Changes"}
//                   </Button>
//                 )}
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* Account Summary */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle>Account Summary</CardTitle>
//             <CardDescription>Your account details</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="p-4 border border-border rounded-lg">
//                 <p className="text-sm text-muted-foreground">Account Status</p>
//                 <p className="text-lg font-semibold text-foreground mt-1">ACTIVE</p>
//               </div>
//               <div className="p-4 border border-border rounded-lg">
//                 <p className="text-sm text-muted-foreground">Member Since</p>
//                 <p className="text-lg font-semibold text-foreground mt-1">2024</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { User, Mail, Phone, Building, Edit2, Save } from "lucide-react"
import { ToastNotification } from "@/components/auth/toast-notification"
import { LoaderOverlay } from "@/components/auth/loader-overlay"
import { BASE_URL } from "@/lib/baseUrl"

export function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    description: "",
    website: "",
    country: "",
    name: "",
    //status: "",
  })
  const [toast, setToast] = useState<{
    title: string
    description: string
    variant: "default" | "destructive"
  } | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        const authToken = localStorage.getItem("authToken")
        if (!authToken) {
          setIsLoading(false)
          return
        }

        const response = await axios.get(`${BASE_URL}/organizations/me`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })

        const data = response.data
        setProfileData((prev) => ({
          ...prev,
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          description: data.description || "",
          website: data.website || "",
          country: data.country || "",
          name: data.name || "",
          //status: data.status || "",
        }))
      } catch (err) {
        console.error("Error fetching organization data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrgData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setErrors({})

    try {
      const authToken = localStorage.getItem("authToken")
      if (!authToken) {
        setToast({
          title: "Error",
          description: "Authentication token not found",
          variant: "destructive",
        })
        setIsSaving(false)
        return
      }

      const response = await axios.patch(
        `${BASE_URL}/organizations/me`,
        {
          email: profileData.email,
          phone: profileData.phone,
          website: profileData.website,
          address: profileData.address,
          country: profileData.country,
          description: profileData.description,
          name: profileData.name,
          //status: profileData.status,
          first_name: profileData.firstName,
          last_name: profileData.lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )

      setToast({
        title: "Success",
        description: "Profile updated successfully",
        variant: "default",
      })
      setIsEditing(false)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.errors) {
        setErrors(err.response.data.errors)
        setToast({
          title: "Validation Error",
          description: "Please check the errors below",
          variant: "destructive",
        })
      } else {
        setToast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive",
        })
      }
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <LoaderOverlay isLoading={isSaving} message="Updating profile..." />

      {toast && (
        <ToastNotification
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}

      <div className="p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground mt-2">View and manage your profile information</p>
          </div>
          {/* <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className="gap-2"
          >
            <Edit2 className="w-4 h-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button> */}
        </div>

        {/* Profile Card */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-11 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-11 w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-11 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-11 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-11 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-11 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-11 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-24 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="w-4 h-4" />
                      First Name
                    </label>
                    <Input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="h-11 border-2 border-border focus:border-primary"
                    />
                    {errors.first_name && <p className="text-xs text-destructive">{errors.first_name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Last Name
                    </label>
                    <Input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="h-11 border-2 border-border focus:border-primary"
                    />
                    {errors.last_name && <p className="text-xs text-destructive">{errors.last_name}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Company Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Website</label>
                  <Input
                    type="url"
                    name="website"
                    value={profileData.website}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="https://example.com"
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                  {errors.website && <p className="text-xs text-destructive">{errors.website}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Country</label>
                  <Input
                    type="text"
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="e.g., Bangladesh"
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                  {errors.country && <p className="text-xs text-destructive">{errors.country}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Address</label>
                  <textarea
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your address"
                    className="w-full px-3 py-2 border-2 border-border rounded-md focus:border-primary focus:outline-none resize-none disabled:bg-muted disabled:cursor-not-allowed"
                    rows={3}
                  />
                  {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <textarea
                    name="description"
                    value={profileData.description}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your description"
                    className="w-full px-3 py-2 border-2 border-border rounded-md focus:border-primary focus:outline-none resize-none disabled:bg-muted disabled:cursor-not-allowed"
                    rows={3}
                  />
                  {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                </div>
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Status</label>
                  <Input
                    type="text"
                    name="status"
                    value={profileData.status}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="e.g., ACTIVE"
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                  {errors.status && <p className="text-xs text-destructive">{errors.status}</p>}
                </div> */}

                {isEditing && (
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Account Summary */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <div className="p-4 border border-border rounded-lg space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">Account Status</p>
                  <p className="text-lg font-semibold text-foreground mt-1">ACTIVE</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="text-lg font-semibold text-foreground mt-1">2024</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
