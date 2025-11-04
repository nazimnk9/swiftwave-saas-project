// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Mail, Plus, Clock, CheckCircle, XCircle } from "lucide-react"
// import Link from "next/link"

// interface Invite {
//   id: number
//   email: string
//   status: "pending" | "accepted" | "rejected"
//   sentDate: string
//   expiryDate: string
// }

// export function InviteListPage() {
//   const [isLoading, setIsLoading] = useState(true)

//   // Static invite list data
//   const [invites] = useState<Invite[]>([
//     {
//       id: 1,
//       email: "john.doe@example.com",
//       status: "pending",
//       sentDate: "2025-10-25",
//       expiryDate: "2025-11-25",
//     },
//     {
//       id: 2,
//       email: "jane.smith@example.com",
//       status: "accepted",
//       sentDate: "2025-10-20",
//       expiryDate: "2025-11-20",
//     },
//     {
//       id: 3,
//       email: "bob.wilson@example.com",
//       status: "rejected",
//       sentDate: "2025-10-15",
//       expiryDate: "2025-11-15",
//     },
//   ])

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false)
//     }, 500)
//     return () => clearTimeout(timer)
//   }, [])

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "pending":
//         return <Clock className="w-5 h-5 text-yellow-500" />
//       case "accepted":
//         return <CheckCircle className="w-5 h-5 text-green-500" />
//       case "rejected":
//         return <XCircle className="w-5 h-5 text-red-500" />
//       default:
//         return null
//     }
//   }

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-700"
//       case "accepted":
//         return "bg-green-100 text-green-700"
//       case "rejected":
//         return "bg-red-100 text-red-700"
//       default:
//         return "bg-gray-100 text-gray-700"
//     }
//   }

//   return (
//     <div className="flex-1 overflow-auto">
//       <div className="p-8 space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
//               <Mail className="w-8 h-8" />
//               Invite List
//             </h1>
//             <p className="text-foreground/60 mt-1">Manage user invitations</p>
//           </div>
//           <Link href="/dashboard/invite-user">
//             <Button className="flex items-center gap-2">
//               <Plus className="w-5 h-5" />
//               Invite User
//             </Button>
//           </Link>
//         </div>

//         {/* Invites Grid */}
//         <div className="grid gap-4">
//           {isLoading ? (
//             <>
//               <Skeleton className="h-24 rounded-lg" />
//               <Skeleton className="h-24 rounded-lg" />
//               <Skeleton className="h-24 rounded-lg" />
//             </>
//           ) : invites.length > 0 ? (
//             invites.map((invite) => (
//               <Card key={invite.id} className="hover:shadow-md transition-shadow">
//                 <CardContent className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-3">
//                         <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                           <Mail className="w-5 h-5 text-primary" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-foreground">{invite.email}</h3>
//                           <p className="text-sm text-foreground/60">Sent on {formatDate(invite.sentDate)}</p>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-3 gap-4 mt-4">
//                         <div className="flex items-center gap-2">
//                           <span className="text-sm text-foreground/60">Status:</span>
//                           <div className="flex items-center gap-2">
//                             {getStatusIcon(invite.status)}
//                             <span
//                               className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusBadge(
//                                 invite.status,
//                               )}`}
//                             >
//                               {invite.status}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                           <span className="text-foreground/60">Expires:</span>
//                           <span className="font-medium text-foreground">{formatDate(invite.expiryDate)}</span>
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
//                 <Mail className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
//                 <p className="text-foreground/60">No invitations found</p>
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
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Mail, Plus, Clock, CheckCircle, XCircle, Search } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"

interface Invite {
  id: number
  organization: number
  sender: number
  role: "OWNER" | "ADMIN" | "MANAGER" | "RECRUITER" | "VIEWER"
  email: string
  status: "pending" | "accepted" | "rejected"
  sentDate: string
  expiryDate: string
}

interface ApiInvite {
  id: number
  organization: number
  sender: number
  role: "OWNER" | "ADMIN" | "MANAGER" | "RECRUITER" | "VIEWER"
  email: string
}

interface ApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: ApiInvite[]
}

const ROLE_DISPLAY_NAMES = {
  OWNER: "Owner",
  ADMIN: "Admin",
  MANAGER: "Manager",
  RECRUITER: "Recruiter",
  VIEWER: "Viewer"
} as const

export function InviteListPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [invites, setInvites] = useState<Invite[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchInvites()
  }, [])

  const fetchInvites = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const authToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
      
      if (!authToken) {
        throw new Error("No authentication token found")
      }

      const response = await axios.get(`${BASE_URL}/organizations/invite/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      const apiData: ApiResponse = response.data
      
      // Transform API data to match our frontend structure
      const transformedInvites: Invite[] = apiData.results.map((invite: ApiInvite) => ({
        id: invite.id,
        organization: invite.organization,
        sender: invite.sender,
        role: invite.role,
        email: invite.email,
        status: "pending", // You might need to get this from your API
        sentDate: new Date().toISOString().split('T')[0], // You might need to get this from your API
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
      }))

      setInvites(transformedInvites)
    } catch (err) {
      console.error("Error fetching invites:", err)
      setError("Failed to load invitations. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "accepted":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "accepted":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getRoleBadge = (role: keyof typeof ROLE_DISPLAY_NAMES) => {
    switch (role) {
      case "OWNER":
        return "bg-purple-100 text-purple-700"
      case "ADMIN":
        return "bg-blue-100 text-blue-700"
      case "MANAGER":
        return "bg-orange-100 text-orange-700"
      case "RECRUITER":
        return "bg-teal-100 text-teal-700"
      case "VIEWER":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredInvites = invites.filter(invite =>
    invite.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ROLE_DISPLAY_NAMES[invite.role].toLowerCase().includes(searchTerm.toLowerCase()) ||
    invite.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Mail className="w-8 h-8" />
              Invite List
            </h1>
            <p className="text-foreground/60 mt-1">Manage user invitations</p>
          </div>
          <Link href="/dashboard/invite-user">
            <Button className="cursor-pointer flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Invite User
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by email, role, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>

        {/* Error Message */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-red-700">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchInvites}
                  className="cursor-pointer border-red-300 text-red-700 hover:bg-red-100"
                >
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Invites Grid */}
        <div className="grid gap-4">
          {isLoading ? (
            <>
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
            </>
          ) : filteredInvites.length > 0 ? (
            filteredInvites.map((invite) => (
              <Card key={invite.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{invite.email}</h3>
                          <p className="text-sm text-foreground/60">Sent on {formatDate(invite.sentDate)}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground/60">Status:</span>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(invite.status)}
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusBadge(
                                invite.status,
                              )}`}
                            >
                              {invite.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground/60">Role:</span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getRoleBadge(invite.role)}`}
                          >
                            {invite.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-foreground/60">Expires:</span>
                          <span className="font-medium text-foreground">{formatDate(invite.expiryDate)}</span>
                        </div>
                        {/* <div className="flex items-center gap-2 text-sm">
                          <span className="text-foreground/60">Organization ID:</span>
                          <span className="font-medium text-foreground">{invite.organization}</span>
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
                <Mail className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                <p className="text-foreground/60">
                  {searchTerm ? "No invitations match your search" : "No invitations found"}
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    className="cursor-pointer mt-4"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Search
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}