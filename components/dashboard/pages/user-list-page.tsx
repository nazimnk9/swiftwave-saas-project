// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Users, Search, Calendar } from "lucide-react"
// import axios from "axios"
// import { BASE_URL } from "@/lib/baseUrl"
// import { LoaderOverlay } from "@/components/auth/loader-overlay"
// import { ToastNotification } from "@/components/auth/toast-notification"

// interface User {
//   id: number
//   organization: number
//   user: number
//   role: string
//   is_active: boolean
//   joined_at: string
//   last_active: string | null
// }

// export function UserListPage() {
//   const [users, setUsers] = useState<User[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isFetching, setIsFetching] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [toast, setToast] = useState<{ title: string; description: string; variant: "default" | "destructive" } | null>(
//     null,
//   )

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   const fetchUsers = async () => {
//     try {
//       setIsFetching(true)
//       const authToken = localStorage.getItem("authToken")

//       if (!authToken) {
//         setToast({ title: "Error", description: "Authentication token not found", variant: "destructive" })
//         return
//       }

//       const response = await axios.get(`${BASE_URL}/organizations/users/`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })

//       setUsers(response.data.results || [])
//     } catch (error) {
//       console.error("Error fetching users:", error)
//       setToast({ title: "Error", description: "Failed to fetch users", variant: "destructive" })
//     } finally {
//       setIsLoading(false)
//       setIsFetching(false)
//     }
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   const filteredUsers = users.filter((user) => user.role.toLowerCase().includes(searchTerm.toLowerCase()))

//   return (
//     <div className="flex-1 overflow-auto relative">
//       {toast && (
//         <ToastNotification
//           title={toast.title}
//           description={toast.description}
//           variant={toast.variant}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <div className="p-8 space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
//               <Users className="w-8 h-8" />
//               User List
//             </h1>
//             <p className="text-foreground/60 mt-1">Manage organization users and their roles</p>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="relative">
//           <Search className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
//           <Input
//             placeholder="Search by role..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//             disabled={isLoading}
//           />
//         </div>

//         {/* Users Grid */}
//         <div className="grid gap-4">
//           {isLoading ? (
//             <>
//               <Skeleton className="h-24 rounded-lg" />
//               <Skeleton className="h-24 rounded-lg" />
//               <Skeleton className="h-24 rounded-lg" />
//             </>
//           ) : filteredUsers.length > 0 ? (
//             filteredUsers.map((user) => (
//               <Card key={user.id} className="hover:shadow-md transition-shadow">
//                 <CardContent className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-3">
//                         <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                           <Users className="w-5 h-5 text-primary" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-foreground">User ID: {user?.id}</h3>
//                           <p className="text-sm text-foreground/60">Organization ID: {user.organization}</p>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 gap-4 mt-4">
//                         <div className="flex items-center gap-2 text-sm">
//                           <span className="text-foreground/60">Role:</span>
//                           <span className="font-medium text-foreground">{user.role}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <span className="text-foreground/60">Status:</span>
//                           <span
//                             className={`px-2 py-1 rounded text-xs font-medium ${
//                               user.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                             }`}
//                           >
//                             {user.is_active ? "Active" : "Inactive"}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <Calendar className="w-4 h-4 text-foreground/40" />
//                           <span className="text-foreground/60">Joined: {formatDate(user.joined_at)}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <span className="text-foreground/60">
//                             Last Active: {user.last_active ? formatDate(user.last_active) : "Never"}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))
//           ) : (
//             <Card>
//               <CardContent className="p-12 text-center">
//                 <Users className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
//                 <p className="text-foreground/60">No users found</p>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, Search, Calendar, User, Mail, Phone } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "@/components/auth/loader-overlay"
import { ToastNotification } from "@/components/auth/toast-notification"
import { getCookie } from "cookies-next"

interface UserData {
  uid: string
  first_name: string
  last_name: string
  email: string
  phone: string
}

interface OrganizationUser {
  id: number
  uid: string
  organization: number
  user: UserData
  role: string
  is_active: boolean
  joined_at: string
  last_active: string | null
}

export function UserListPage() {
  const [users, setUsers] = useState<OrganizationUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [toast, setToast] = useState<{ title: string; description: string; variant: "default" | "destructive" } | null>(
    null,
  )

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setIsFetching(true)
      const authToken = getCookie("authToken")

      if (!authToken) {
        setToast({ title: "Error", description: "Authentication token not found", variant: "destructive" })
        return
      }

      const response = await axios.get(`${BASE_URL}/organizations/users/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      setUsers(response.data.results || [])
    } catch (error) {
      console.error("Error fetching users:", error)
      setToast({ title: "Error", description: "Failed to fetch users", variant: "destructive" })
    } finally {
      setIsLoading(false)
      setIsFetching(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "Never"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredUsers = users.filter((user) =>
    user.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="flex-1 overflow-auto relative">
      {toast && (
        <ToastNotification
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}

      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Users className="w-8 h-8" />
              User List
            </h1>
            <p className="text-foreground/60 mt-1">Manage organization users and their roles</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
          <Input
            placeholder="Search by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
        </div>

        {/* Users Grid */}
        <div className="grid gap-4">
          {isLoading ? (
            <>
              <Skeleton className="h-32 rounded-lg" />
              <Skeleton className="h-32 rounded-lg" />
              <Skeleton className="h-32 rounded-lg" />
            </>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-semibold text-primary">
                            {getUserInitials(user.user.first_name, user.user.last_name)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-lg">
                            {user.user.first_name} {user.user.last_name}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-foreground/60">
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              <span>{user.user.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              <span>{user.user.phone}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-foreground/60">Role:</span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === "OWNER"
                                  ? "bg-purple-100 text-purple-700"
                                  : user.role === "ADMIN"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}>
                                {user.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                        {/* <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-foreground/40" />
                          <div>
                            <span className="text-foreground/60">User ID: </span>
                            <span className="font-medium text-foreground">{user.user.uid}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-foreground/40" />
                          <div>
                            <span className="text-foreground/60">Org User ID: </span>
                            <span className="font-medium text-foreground">{user.id}</span>
                          </div>
                        </div> */}

                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-foreground/60">Status:</span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${user.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}
                          >
                            {user.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-foreground/40" />
                          <div>
                            <span className="text-foreground/60">Joined: </span>
                            <span className="font-medium text-foreground">{formatDate(user.joined_at)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t">
                        {/* <div className="flex items-center gap-2 text-sm">
                          <span className="text-foreground/60">Organization ID:</span>
                          <span className="font-medium text-foreground">{user.organization}</span>
                        </div> */}
                        <div className="flex items-center gap-2 text-sm mt-1">
                          <span className="text-foreground/60">Last Active:</span>
                          <span className="font-medium text-foreground">
                            {formatDateTime(user.last_active)}
                          </span>
                        </div>
                        {/* <div className="flex items-center gap-2 text-sm mt-1">
                          <span className="text-foreground/60">UID:</span>
                          <span className="font-medium text-foreground text-xs">{user.uid}</span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                <p className="text-foreground/60">No users found</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}