"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Mail, Plus, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

interface Invite {
  id: number
  email: string
  status: "pending" | "accepted" | "rejected"
  sentDate: string
  expiryDate: string
}

export function InviteListPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Static invite list data
  const [invites] = useState<Invite[]>([
    {
      id: 1,
      email: "john.doe@example.com",
      status: "pending",
      sentDate: "2025-10-25",
      expiryDate: "2025-11-25",
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      status: "accepted",
      sentDate: "2025-10-20",
      expiryDate: "2025-11-20",
    },
    {
      id: 3,
      email: "bob.wilson@example.com",
      status: "rejected",
      sentDate: "2025-10-15",
      expiryDate: "2025-11-15",
    },
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

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
            <Button className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Invite User
            </Button>
          </Link>
        </div>

        {/* Invites Grid */}
        <div className="grid gap-4">
          {isLoading ? (
            <>
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
            </>
          ) : invites.length > 0 ? (
            invites.map((invite) => (
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

                      <div className="grid grid-cols-3 gap-4 mt-4">
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
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-foreground/60">Expires:</span>
                          <span className="font-medium text-foreground">{formatDate(invite.expiryDate)}</span>
                        </div>
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
                <p className="text-foreground/60">No invitations found</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
