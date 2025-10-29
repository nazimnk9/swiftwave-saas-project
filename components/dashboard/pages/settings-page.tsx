// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Bell, Lock, User, Building, Save } from "lucide-react"

// export function SettingsPage() {
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSaving, setIsSaving] = useState(false)

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 2000)
//     return () => clearTimeout(timer)
//   }, [])

//   const handleSave = async () => {
//     setIsSaving(true)
//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     setIsSaving(false)
//   }

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <div className="p-4 md:p-8 space-y-8">
//         {/* Header */}
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Settings</h1>
//           <p className="text-muted-foreground mt-2">Manage your account and preferences</p>
//         </div>

//         {/* Profile Settings */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <User className="w-5 h-5" />
//               Profile Information
//             </CardTitle>
//             <CardDescription>Update your personal information</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {isLoading ? (
//               <>
//                 {[1, 2, 3, 4].map((i) => (
//                   <Skeleton key={i} className="h-11 w-full" />
//                 ))}
//               </>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-foreground">First Name</label>
//                     <Input
//                       type="text"
//                       placeholder="John"
//                       defaultValue="John"
//                       className="h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-foreground">Last Name</label>
//                     <Input
//                       type="text"
//                       placeholder="Doe"
//                       defaultValue="Doe"
//                       className="h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Email Address</label>
//                   <Input
//                     type="email"
//                     placeholder="john@example.com"
//                     defaultValue="john@example.com"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Phone Number</label>
//                   <Input
//                     type="tel"
//                     placeholder="+1 (555) 000-0000"
//                     defaultValue="+1 (555) 123-4567"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <Button
//                   onClick={handleSave}
//                   disabled={isSaving}
//                   className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
//                 >
//                   <Save className="w-4 h-4" />
//                   {isSaving ? "Saving..." : "Save Changes"}
//                 </Button>
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* Company Settings */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Building className="w-5 h-5" />
//               Company Information
//             </CardTitle>
//             <CardDescription>Update your company details</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {isLoading ? (
//               <>
//                 {[1, 2, 3].map((i) => (
//                   <Skeleton key={i} className="h-11 w-full" />
//                 ))}
//               </>
//             ) : (
//               <>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Company Name</label>
//                   <Input
//                     type="text"
//                     placeholder="Your Company"
//                     defaultValue="Tech Innovations Inc."
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Industry</label>
//                   <Input
//                     type="text"
//                     placeholder="Technology"
//                     defaultValue="Software Development"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Company Size</label>
//                   <Input
//                     type="text"
//                     placeholder="50-100"
//                     defaultValue="50-100 employees"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <Button
//                   onClick={handleSave}
//                   disabled={isSaving}
//                   className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
//                 >
//                   <Save className="w-4 h-4" />
//                   {isSaving ? "Saving..." : "Save Changes"}
//                 </Button>
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* Notification Settings */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Bell className="w-5 h-5" />
//               Notifications
//             </CardTitle>
//             <CardDescription>Manage your notification preferences</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {isLoading ? (
//               <>
//                 {[1, 2, 3].map((i) => (
//                   <Skeleton key={i} className="h-12 w-full" />
//                 ))}
//               </>
//             ) : (
//               <>
//                 <div className="flex items-center justify-between p-3 border border-border rounded-lg">
//                   <div>
//                     <p className="font-medium text-foreground">Email Notifications</p>
//                     <p className="text-sm text-muted-foreground">Receive updates via email</p>
//                   </div>
//                   <input type="checkbox" defaultChecked className="w-5 h-5" />
//                 </div>
//                 <div className="flex items-center justify-between p-3 border border-border rounded-lg">
//                   <div>
//                     <p className="font-medium text-foreground">Application Updates</p>
//                     <p className="text-sm text-muted-foreground">Get notified of new applications</p>
//                   </div>
//                   <input type="checkbox" defaultChecked className="w-5 h-5" />
//                 </div>
//                 <div className="flex items-center justify-between p-3 border border-border rounded-lg">
//                   <div>
//                     <p className="font-medium text-foreground">Interview Reminders</p>
//                     <p className="text-sm text-muted-foreground">Reminders for scheduled interviews</p>
//                   </div>
//                   <input type="checkbox" defaultChecked className="w-5 h-5" />
//                 </div>
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* Security Settings */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Lock className="w-5 h-5" />
//               Security
//             </CardTitle>
//             <CardDescription>Manage your account security</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {isLoading ? (
//               <>
//                 {[1, 2].map((i) => (
//                   <Skeleton key={i} className="h-11 w-full" />
//                 ))}
//               </>
//             ) : (
//               <>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Current Password</label>
//                   <Input
//                     type="password"
//                     placeholder="••••••••"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">New Password</label>
//                   <Input
//                     type="password"
//                     placeholder="••••••••"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Confirm Password</label>
//                   <Input
//                     type="password"
//                     placeholder="••••••••"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <Button
//                   onClick={handleSave}
//                   disabled={isSaving}
//                   className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
//                 >
//                   <Lock className="w-4 h-4" />
//                   {isSaving ? "Updating..." : "Update Password"}
//                 </Button>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Bell, Lock, User, Building, Save } from "lucide-react"

// export function SettingsPage() {
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSaving, setIsSaving] = useState(false)
//   const [settingsData, setSettingsData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     company: "",
//     industry: "",
//     companySize: "",
//   })

//   useEffect(() => {
//     const firstName = localStorage.getItem("userFirstName") || ""
//     const lastName = localStorage.getItem("userLastName") || ""
//     const email = localStorage.getItem("userEmail") || ""
//     const phone = localStorage.getItem("userPhone") || ""
//     const company = localStorage.getItem("userCompany") || ""

//     setSettingsData((prev) => ({
//       ...prev,
//       firstName,
//       lastName,
//       email,
//       phone,
//       company,
//     }))
//     setIsLoading(false)
//   }, [])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setSettingsData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSave = async () => {
//     setIsSaving(true)
//     // Save to localStorage
//     localStorage.setItem("userFirstName", settingsData.firstName)
//     localStorage.setItem("userLastName", settingsData.lastName)
//     localStorage.setItem("userPhone", settingsData.phone)
//     localStorage.setItem("userCompany", settingsData.company)

//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     setIsSaving(false)
//   }

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <div className="p-4 md:p-8 space-y-8">
//         {/* Header */}
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Settings</h1>
//           <p className="text-muted-foreground mt-2">Manage your account and preferences</p>
//         </div>

//         {/* Profile Settings */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <User className="w-5 h-5" />
//               Profile Information
//             </CardTitle>
//             <CardDescription>Update your personal information</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {isLoading ? (
//               <>
//                 {[1, 2, 3, 4].map((i) => (
//                   <Skeleton key={i} className="h-11 w-full" />
//                 ))}
//               </>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-foreground">First Name</label>
//                     <Input
//                       type="text"
//                       name="firstName"
//                       value={settingsData.firstName}
//                       onChange={handleInputChange}
//                       className="h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-foreground">Last Name</label>
//                     <Input
//                       type="text"
//                       name="lastName"
//                       value={settingsData.lastName}
//                       onChange={handleInputChange}
//                       className="h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Email Address</label>
//                   <Input
//                     type="email"
//                     name="email"
//                     value={settingsData.email}
//                     disabled
//                     className="h-11 border-2 border-border bg-muted"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Phone Number</label>
//                   <Input
//                     type="tel"
//                     name="phone"
//                     value={settingsData.phone}
//                     onChange={handleInputChange}
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <Button
//                   onClick={handleSave}
//                   disabled={isSaving}
//                   className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
//                 >
//                   <Save className="w-4 h-4" />
//                   {isSaving ? "Saving..." : "Save Changes"}
//                 </Button>
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* Company Settings */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Building className="w-5 h-5" />
//               Company Information
//             </CardTitle>
//             <CardDescription>Update your company details</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {isLoading ? (
//               <>
//                 {[1, 2, 3].map((i) => (
//                   <Skeleton key={i} className="h-11 w-full" />
//                 ))}
//               </>
//             ) : (
//               <>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Company Name</label>
//                   <Input
//                     type="text"
//                     name="company"
//                     value={settingsData.company}
//                     onChange={handleInputChange}
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Industry</label>
//                   <Input
//                     type="text"
//                     name="industry"
//                     value={settingsData.industry}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Technology"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Company Size</label>
//                   <Input
//                     type="text"
//                     name="companySize"
//                     value={settingsData.companySize}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 50-100 employees"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <Button
//                   onClick={handleSave}
//                   disabled={isSaving}
//                   className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
//                 >
//                   <Save className="w-4 h-4" />
//                   {isSaving ? "Saving..." : "Save Changes"}
//                 </Button>
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* Notification Settings */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Bell className="w-5 h-5" />
//               Notifications
//             </CardTitle>
//             <CardDescription>Manage your notification preferences</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {isLoading ? (
//               <>
//                 {[1, 2, 3].map((i) => (
//                   <Skeleton key={i} className="h-12 w-full" />
//                 ))}
//               </>
//             ) : (
//               <>
//                 <div className="flex items-center justify-between p-3 border border-border rounded-lg">
//                   <div>
//                     <p className="font-medium text-foreground">Email Notifications</p>
//                     <p className="text-sm text-muted-foreground">Receive updates via email</p>
//                   </div>
//                   <input type="checkbox" defaultChecked className="w-5 h-5" />
//                 </div>
//                 <div className="flex items-center justify-between p-3 border border-border rounded-lg">
//                   <div>
//                     <p className="font-medium text-foreground">Application Updates</p>
//                     <p className="text-sm text-muted-foreground">Get notified of new applications</p>
//                   </div>
//                   <input type="checkbox" defaultChecked className="w-5 h-5" />
//                 </div>
//                 <div className="flex items-center justify-between p-3 border border-border rounded-lg">
//                   <div>
//                     <p className="font-medium text-foreground">Interview Reminders</p>
//                     <p className="text-sm text-muted-foreground">Reminders for scheduled interviews</p>
//                   </div>
//                   <input type="checkbox" defaultChecked className="w-5 h-5" />
//                 </div>
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* Security Settings */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Lock className="w-5 h-5" />
//               Security
//             </CardTitle>
//             <CardDescription>Manage your account security</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {isLoading ? (
//               <>
//                 {[1, 2].map((i) => (
//                   <Skeleton key={i} className="h-11 w-full" />
//                 ))}
//               </>
//             ) : (
//               <>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Current Password</label>
//                   <Input
//                     type="password"
//                     placeholder="••••••••"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">New Password</label>
//                   <Input
//                     type="password"
//                     placeholder="••••••••"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Confirm Password</label>
//                   <Input
//                     type="password"
//                     placeholder="••••••••"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <Button
//                   onClick={handleSave}
//                   disabled={isSaving}
//                   className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
//                 >
//                   <Lock className="w-4 h-4" />
//                   {isSaving ? "Updating..." : "Update Password"}
//                 </Button>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Bell, Lock, User, Building, Save, AlertTriangle } from "lucide-react"
// import { ToastNotification } from "@/components/auth/toast-notification"

// export function SettingsPage() {
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSaving, setIsSaving] = useState(false)
//   const [toast, setToast] = useState<{
//     title: string
//     description: string
//     variant: "default" | "destructive"
//   } | null>(null)
//   const [settingsData, setSettingsData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     company: "",
//     industry: "",
//     companySize: "",
//   })

//   const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
//   const [showDeactivateModal, setShowDeactivateModal] = useState(false)
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   })
//   const [deactivateData, setDeactivateData] = useState({
//     email: "",
//     password: "",
//   })

//   useEffect(() => {
//     const firstName = localStorage.getItem("userFirstName") || ""
//     const lastName = localStorage.getItem("userLastName") || ""
//     const email = localStorage.getItem("userEmail") || ""
//     const phone = localStorage.getItem("userPhone") || ""
//     const company = localStorage.getItem("userCompany") || ""

//     setSettingsData((prev) => ({
//       ...prev,
//       firstName,
//       lastName,
//       email,
//       phone,
//       company,
//     }))
//     setIsLoading(false)
//   }, [])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setSettingsData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setPasswordData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleDeactivateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setDeactivateData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSave = async () => {
//     setIsSaving(true)
//     localStorage.setItem("userFirstName", settingsData.firstName)
//     localStorage.setItem("userLastName", settingsData.lastName)
//     localStorage.setItem("userPhone", settingsData.phone)
//     localStorage.setItem("userCompany", settingsData.company)

//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     setIsSaving(false)
//     setToast({
//       title: "Success",
//       description: "Settings saved successfully",
//       variant: "default",
//     })
//   }

//   const handleChangePassword = async () => {
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setToast({
//         title: "Error",
//         description: "New passwords do not match",
//         variant: "destructive",
//       })
//       return
//     }

//     if (passwordData.newPassword.length < 8) {
//       setToast({
//         title: "Error",
//         description: "Password must be at least 8 characters",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsSaving(true)
//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     setIsSaving(false)
//     setToast({
//       title: "Success",
//       description: "Password changed successfully",
//       variant: "default",
//     })
//     setShowChangePasswordModal(false)
//     setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
//   }

//   const handleDeactivateProfile = async () => {
//     if (!deactivateData.email || !deactivateData.password) {
//       setToast({
//         title: "Error",
//         description: "Please fill in all fields",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsSaving(true)
//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     setIsSaving(false)
//     setToast({
//       title: "Success",
//       description: "Profile deactivated successfully",
//       variant: "default",
//     })
//     setShowDeactivateModal(false)
//     setDeactivateData({ email: "", password: "" })
//   }

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
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
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Settings</h1>
//           <p className="text-muted-foreground mt-2">Manage your account and preferences</p>
//         </div>

//         {/* Profile Settings */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <User className="w-5 h-5" />
//               Profile Information
//             </CardTitle>
//             <CardDescription>Update your personal information</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {isLoading ? (
//               <>
//                 {[1, 2, 3, 4].map((i) => (
//                   <Skeleton key={i} className="h-11 w-full" />
//                 ))}
//               </>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-foreground">First Name</label>
//                     <Input
//                       type="text"
//                       name="firstName"
//                       value={settingsData.firstName}
//                       onChange={handleInputChange}
//                       className="h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-foreground">Last Name</label>
//                     <Input
//                       type="text"
//                       name="lastName"
//                       value={settingsData.lastName}
//                       onChange={handleInputChange}
//                       className="h-11 border-2 border-border focus:border-primary"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Email Address</label>
//                   <Input
//                     type="email"
//                     name="email"
//                     value={settingsData.email}
//                     disabled
//                     className="h-11 border-2 border-border bg-muted"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Phone Number</label>
//                   <Input
//                     type="tel"
//                     name="phone"
//                     value={settingsData.phone}
//                     onChange={handleInputChange}
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <Button
//                   onClick={handleSave}
//                   disabled={isSaving}
//                   className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
//                 >
//                   <Save className="w-4 h-4" />
//                   {isSaving ? "Saving..." : "Save Changes"}
//                 </Button>
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* Company Settings */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Building className="w-5 h-5" />
//               Company Information
//             </CardTitle>
//             <CardDescription>Update your company details</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {isLoading ? (
//               <>
//                 {[1, 2, 3].map((i) => (
//                   <Skeleton key={i} className="h-11 w-full" />
//                 ))}
//               </>
//             ) : (
//               <>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Company Name</label>
//                   <Input
//                     type="text"
//                     name="company"
//                     value={settingsData.company}
//                     onChange={handleInputChange}
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Industry</label>
//                   <Input
//                     type="text"
//                     name="industry"
//                     value={settingsData.industry}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Technology"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-foreground">Company Size</label>
//                   <Input
//                     type="text"
//                     name="companySize"
//                     value={settingsData.companySize}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 50-100 employees"
//                     className="h-11 border-2 border-border focus:border-primary"
//                   />
//                 </div>
//                 <Button
//                   onClick={handleSave}
//                   disabled={isSaving}
//                   className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
//                 >
//                   <Save className="w-4 h-4" />
//                   {isSaving ? "Saving..." : "Save Changes"}
//                 </Button>
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* Notification Settings */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Bell className="w-5 h-5" />
//               Notifications
//             </CardTitle>
//             <CardDescription>Manage your notification preferences</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {isLoading ? (
//               <>
//                 {[1, 2, 3].map((i) => (
//                   <Skeleton key={i} className="h-12 w-full" />
//                 ))}
//               </>
//             ) : (
//               <>
//                 <div className="flex items-center justify-between p-3 border border-border rounded-lg">
//                   <div>
//                     <p className="font-medium text-foreground">Email Notifications</p>
//                     <p className="text-sm text-muted-foreground">Receive updates via email</p>
//                   </div>
//                   <input type="checkbox" defaultChecked className="w-5 h-5" />
//                 </div>
//                 <div className="flex items-center justify-between p-3 border border-border rounded-lg">
//                   <div>
//                     <p className="font-medium text-foreground">Application Updates</p>
//                     <p className="text-sm text-muted-foreground">Get notified of new applications</p>
//                   </div>
//                   <input type="checkbox" defaultChecked className="w-5 h-5" />
//                 </div>
//                 <div className="flex items-center justify-between p-3 border border-border rounded-lg">
//                   <div>
//                     <p className="font-medium text-foreground">Interview Reminders</p>
//                     <p className="text-sm text-muted-foreground">Reminders for scheduled interviews</p>
//                   </div>
//                   <input type="checkbox" defaultChecked className="w-5 h-5" />
//                 </div>
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* Security Settings */}
//         <Card className="border-border">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Lock className="w-5 h-5" />
//               Security
//             </CardTitle>
//             <CardDescription>Manage your account security</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {isLoading ? (
//               <>
//                 {[1, 2].map((i) => (
//                   <Skeleton key={i} className="h-11 w-full" />
//                 ))}
//               </>
//             ) : (
//               <>
//                 <div className="flex gap-3">
//                   <Button
//                     onClick={() => setShowChangePasswordModal(true)}
//                     className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
//                   >
//                     <Lock className="w-4 h-4" />
//                     Change Password
//                   </Button>
//                   <Button
//                     onClick={() => setShowDeactivateModal(true)}
//                     variant="outline"
//                     className="border-2 border-border hover:bg-muted bg-gradient-to-r from-primary/20 to-primary/20 dark:hover:text-white/50 text-foreground font-semibold transition-all duration-200"
//                   >
//                     <AlertTriangle className="w-4 h-4" />
//                     Deactivate Profile
//                   </Button>
//                 </div>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {showChangePasswordModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <Card className="w-full max-w-md border-2 border-border">
//             <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 p-6">
//               <CardTitle className="flex items-center gap-2">
//                 <Lock className="w-5 h-5" />
//                 Change Password
//               </CardTitle>
//               <CardDescription>Enter your current and new password</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4 pt-6">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Current Password</label>
//                 <Input
//                   type="password"
//                   name="currentPassword"
//                   placeholder="••••••••"
//                   value={passwordData.currentPassword}
//                   onChange={handlePasswordChange}
//                   className="h-11 border-2 border-border focus:border-primary"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">New Password</label>
//                 <Input
//                   type="password"
//                   name="newPassword"
//                   placeholder="••••••••"
//                   value={passwordData.newPassword}
//                   onChange={handlePasswordChange}
//                   className="h-11 border-2 border-border focus:border-primary"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Confirm Password</label>
//                 <Input
//                   type="password"
//                   name="confirmPassword"
//                   placeholder="••••••••"
//                   value={passwordData.confirmPassword}
//                   onChange={handlePasswordChange}
//                   className="h-11 border-2 border-border focus:border-primary"
//                 />
//               </div>
//               <div className="flex gap-3 pt-4">
//                 <Button
//                   onClick={() => {
//                     setShowChangePasswordModal(false)
//                     setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
//                   }}
//                   variant="outline"
//                   className="flex-1"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={handleChangePassword}
//                   disabled={isSaving}
//                   className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
//                 >
//                   {isSaving ? "Updating..." : "Update Password"}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {showDeactivateModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <Card className="w-full max-w-md border-2 border-border">
//             <CardHeader className="bg-gradient-to-r from-destructive/5 to-destructive/10 p-6">
//               <CardTitle className="flex items-center gap-2 text-destructive">
//                 <AlertTriangle className="w-5 h-5" />
//                 Deactivate Profile
//               </CardTitle>
//               <CardDescription>This action cannot be undone. Please confirm your identity.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4 pt-6">
//               <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
//                 Warning: Deactivating your profile will permanently delete all your data and cannot be recovered.
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Email Address</label>
//                 <Input
//                   type="email"
//                   name="email"
//                   placeholder="your@email.com"
//                   value={deactivateData.email}
//                   onChange={handleDeactivateChange}
//                   className="h-11 border-2 border-border focus:border-primary"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-foreground">Password</label>
//                 <Input
//                   type="password"
//                   name="password"
//                   placeholder="••••••••"
//                   value={deactivateData.password}
//                   onChange={handleDeactivateChange}
//                   className="h-11 border-2 border-border focus:border-primary"
//                 />
//               </div>
//               <div className="flex gap-3 pt-4">
//                 <Button
//                   onClick={() => {
//                     setShowDeactivateModal(false)
//                     setDeactivateData({ email: "", password: "" })
//                   }}
//                   variant="outline"
//                   className="flex-1"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={handleDeactivateProfile}
//                   disabled={isSaving}
//                   className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
//                 >
//                   {isSaving ? "Deactivating..." : "Deactivate"}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
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
import { Bell, Lock, User, Building, Save, AlertTriangle } from "lucide-react"
import { ToastNotification } from "@/components/auth/toast-notification"
import { LoaderOverlay } from "@/components/auth/loader-overlay"
import { BASE_URL } from "@/lib/baseUrl"

export function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [toast, setToast] = useState<{
    title: string
    description: string
    variant: "default" | "destructive"
  } | null>(null)
  const [settingsData, setSettingsData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    companySize: "",
    address: "",
    description: "",
    website: "",
    country: "",
    name: "",
    //status: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [deactivateData, setDeactivateData] = useState({
    email: "",
    password: "",
  })

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
        setSettingsData((prev) => ({
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
    setSettingsData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDeactivateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDeactivateData((prev) => ({ ...prev, [name]: value }))
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
          email: settingsData.email,
          phone: settingsData.phone,
          website: settingsData.website,
          address: settingsData.address,
          country: settingsData.country,
          description: settingsData.description,
          name: settingsData.name,
          //status: settingsData.status,
          first_name: settingsData.firstName,
          last_name: settingsData.lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )

      setToast({
        title: "Success",
        description: "Settings saved successfully",
        variant: "default",
      })
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
          description: "Failed to save settings",
          variant: "destructive",
        })
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setToast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      setToast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
    setToast({
      title: "Success",
      description: "Password changed successfully",
      variant: "default",
    })
    setShowChangePasswordModal(false)
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handleDeactivateProfile = async () => {
    if (!deactivateData.email || !deactivateData.password) {
      setToast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
    setToast({
      title: "Success",
      description: "Profile deactivated successfully",
      variant: "default",
    })
    setShowDeactivateModal(false)
    setDeactivateData({ email: "", password: "" })
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <LoaderOverlay isLoading={isSaving} message="Saving changes..." />

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
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account and preferences</p>
        </div>

        {/* Profile Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-11 w-full" />
                ))}
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <Input
                      type="text"
                      name="firstName"
                      value={settingsData.firstName}
                      onChange={handleInputChange}
                      className="h-11 border-2 border-border focus:border-primary"
                    />
                    {errors.first_name && <p className="text-xs text-destructive">{errors.first_name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <Input
                      type="text"
                      name="lastName"
                      value={settingsData.lastName}
                      onChange={handleInputChange}
                      className="h-11 border-2 border-border focus:border-primary"
                    />
                    {errors.last_name && <p className="text-xs text-destructive">{errors.last_name}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <Input
                    type="email"
                    name="email"
                    value={settingsData.email}
                    onChange={handleInputChange}
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Phone Number</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={settingsData.phone}
                    onChange={handleInputChange}
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Website</label>
                  <Input
                    type="url"
                    name="website"
                    value={settingsData.website}
                    onChange={handleInputChange}
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
                    value={settingsData.country}
                    onChange={handleInputChange}
                    placeholder="e.g., Bangladesh"
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                  {errors.country && <p className="text-xs text-destructive">{errors.country}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Address</label>
                  <textarea
                    name="address"
                    value={settingsData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    className="w-full px-3 py-2 border-2 border-border rounded-md focus:border-primary focus:outline-none resize-none"
                    rows={3}
                  />
                  {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <textarea
                    name="description"
                    value={settingsData.description}
                    onChange={handleInputChange}
                    placeholder="Enter your description"
                    className="w-full px-3 py-2 border-2 border-border rounded-md focus:border-primary focus:outline-none resize-none"
                    rows={3}
                  />
                  {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                </div>
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Status</label>
                  <Input
                    type="text"
                    name="status"
                    value={settingsData.status}
                    onChange={handleInputChange}
                    placeholder="e.g., ACTIVE"
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                  {errors.status && <p className="text-xs text-destructive">{errors.status}</p>}
                </div> */}
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Company Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Company Information
            </CardTitle>
            <CardDescription>Update your company details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-11 w-full" />
                ))}
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Company Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={settingsData.name}
                    onChange={handleInputChange}
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Industry</label>
                  <Input
                    type="text"
                    name="industry"
                    value={settingsData.industry}
                    onChange={handleInputChange}
                    placeholder="e.g., Technology"
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Company Size</label>
                  <Input
                    type="text"
                    name="companySize"
                    value={settingsData.companySize}
                    onChange={handleInputChange}
                    placeholder="e.g., 50-100 employees"
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                </div>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Application Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified of new applications</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Interview Reminders</p>
                    <p className="text-sm text-muted-foreground">Reminders for scheduled interviews</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <>
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-11 w-full" />
                ))}
              </>
            ) : (
              <>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowChangePasswordModal(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Change Password
                  </Button>
                  <Button
                    onClick={() => setShowDeactivateModal(true)}
                    variant="outline"
                    className="border-2 border-border hover:bg-muted bg-gradient-to-r from-primary/20 to-primary/20 dark:hover:text-white/50 text-foreground font-semibold transition-all duration-200"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Deactivate Profile
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-2 border-border">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 p-6">
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Change Password
              </CardTitle>
              <CardDescription>Enter your current and new password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Current Password</label>
                <Input
                  type="password"
                  name="currentPassword"
                  placeholder="••••••••"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="h-11 border-2 border-border focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">New Password</label>
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="••••••••"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="h-11 border-2 border-border focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Confirm Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="h-11 border-2 border-border focus:border-primary"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => {
                    setShowChangePasswordModal(false)
                    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleChangePassword}
                  disabled={isSaving}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isSaving ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-2 border-border">
            <CardHeader className="bg-gradient-to-r from-destructive/5 to-destructive/10 p-6">
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Deactivate Profile
              </CardTitle>
              <CardDescription>This action cannot be undone. Please confirm your identity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
                Warning: Deactivating your profile will permanently delete all your data and cannot be recovered.
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={deactivateData.email}
                  onChange={handleDeactivateChange}
                  className="h-11 border-2 border-border focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={deactivateData.password}
                  onChange={handleDeactivateChange}
                  className="h-11 border-2 border-border focus:border-primary"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => {
                    setShowDeactivateModal(false)
                    setDeactivateData({ email: "", password: "" })
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeactivateProfile}
                  disabled={isSaving}
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  {isSaving ? "Deactivating..." : "Deactivate"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
