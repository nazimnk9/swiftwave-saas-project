"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter, Star, MessageSquare, Download } from "lucide-react"

export function CandidatesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const candidates = [
    {
      id: 1,
      name: "Alice Johnson",
      position: "Senior React Developer",
      status: "Interview Scheduled",
      rating: 5,
      email: "alice@example.com",
      phone: "+1 (555) 123-4567",
      appliedDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Bob Smith",
      position: "Product Manager",
      status: "Shortlisted",
      rating: 4,
      email: "bob@example.com",
      phone: "+1 (555) 234-5678",
      appliedDate: "2024-01-14",
    },
    {
      id: 3,
      name: "Carol White",
      position: "UX Designer",
      status: "Offer Extended",
      rating: 5,
      email: "carol@example.com",
      phone: "+1 (555) 345-6789",
      appliedDate: "2024-01-13",
    },
    {
      id: 4,
      name: "David Brown",
      position: "Data Scientist",
      status: "Pending Review",
      rating: 3,
      email: "david@example.com",
      phone: "+1 (555) 456-7890",
      appliedDate: "2024-01-12",
    },
    {
      id: 5,
      name: "Emma Davis",
      position: "DevOps Engineer",
      status: "Rejected",
      rating: 2,
      email: "emma@example.com",
      phone: "+1 (555) 567-8901",
      appliedDate: "2024-01-11",
    },
  ]

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Offer Extended":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "Interview Scheduled":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "Shortlisted":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
      case "Pending Review":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Candidates</h1>
            <p className="text-muted-foreground mt-2">Review and manage all your candidates</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 border-2 border-border focus:border-primary"
            />
          </div>
          <Button variant="outline" className="cursor-pointer border-2 border-border hover:bg-muted bg-transparent gap-2">
            <Filter className="w-5 h-5" />
            Filter
          </Button>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </>
          ) : (
            filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-white font-bold">
                          {candidate.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground">{candidate.name}</h3>
                          <p className="text-sm text-muted-foreground">{candidate.position}</p>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{candidate.email}</span>
                            <span>{candidate.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}
                      >
                        {candidate.status}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="hover:bg-muted">
                          <Star className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-muted">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-muted">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
