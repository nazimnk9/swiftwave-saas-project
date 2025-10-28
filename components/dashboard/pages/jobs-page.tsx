"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Briefcase, Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react"

export function JobsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const jobs = [
    {
      id: 1,
      title: "Senior React Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      applications: 24,
      status: "Active",
      postedDate: "2024-01-10",
      salary: "$120k - $160k",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      applications: 18,
      status: "Active",
      postedDate: "2024-01-08",
      salary: "$100k - $140k",
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      applications: 12,
      status: "Active",
      postedDate: "2024-01-05",
      salary: "$80k - $120k",
    },
    {
      id: 4,
      title: "Data Scientist",
      department: "Analytics",
      location: "Boston, MA",
      applications: 8,
      status: "Draft",
      postedDate: "2024-01-03",
      salary: "$110k - $150k",
    },
    {
      id: 5,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      applications: 15,
      status: "Active",
      postedDate: "2024-01-01",
      salary: "$130k - $170k",
    },
  ]

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Jobs</h1>
            <p className="text-muted-foreground mt-2">Manage and track all your job postings</p>
          </div>
          {/* <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 w-full md:w-auto">
            <Plus className="w-5 h-5" />
            Post New Job
          </Button> */}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 border-2 border-border focus:border-primary"
            />
          </div>
          <Button variant="outline" className="border-2 border-border hover:bg-muted bg-transparent gap-2">
            <Filter className="w-5 h-5" />
            Filter
          </Button>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Briefcase className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.department}</p>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{job.location}</span>
                            <span>{job.salary}</span>
                            <span>{job.applications} applications</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          job.status === "Active"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {job.status}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="hover:bg-muted">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-muted">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-muted">
                          <Trash2 className="w-4 h-4 text-destructive" />
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
