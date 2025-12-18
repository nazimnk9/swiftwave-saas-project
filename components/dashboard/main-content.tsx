// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Skeleton } from "@/components/ui/skeleton"
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts"
// import { TrendingUp, Users, Briefcase, CheckCircle, Clock, AlertCircle } from "lucide-react"

// export function MainContent() {
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // Simulate data loading
//     const timer = setTimeout(() => setIsLoading(false), 2000)
//     return () => clearTimeout(timer)
//   }, [])

//   const stats = [
//     { label: "Active Jobs", value: "24", icon: Briefcase, color: "bg-blue-500" },
//     { label: "Total Candidates", value: "1,248", icon: Users, color: "bg-purple-500" },
//     { label: "Interviews Scheduled", value: "18", icon: Clock, color: "bg-orange-500" },
//     { label: "Offers Extended", value: "12", icon: CheckCircle, color: "bg-green-500" },
//   ]

//   const chartData = [
//     { month: "Jan", applications: 400, interviews: 240, offers: 120 },
//     { month: "Feb", applications: 520, interviews: 290, offers: 150 },
//     { month: "Mar", applications: 680, interviews: 350, offers: 180 },
//     { month: "Apr", applications: 750, interviews: 420, offers: 210 },
//     { month: "May", applications: 890, interviews: 480, offers: 240 },
//     { month: "Jun", applications: 1020, interviews: 550, offers: 280 },
//   ]

//   const pieData = [
//     { name: "Shortlisted", value: 35 },
//     { name: "Rejected", value: 25 },
//     { name: "Pending", value: 40 },
//   ]

//   const COLORS = ["#3b82f6", "#ef4444", "#f59e0b"]

//   const recentJobs = [
//     { id: 1, title: "Senior React Developer", department: "Engineering", applications: 24, status: "Active" },
//     { id: 2, title: "Product Manager", department: "Product", applications: 18, status: "Active" },
//     { id: 3, title: "UX Designer", department: "Design", applications: 12, status: "Active" },
//     { id: 4, title: "Data Scientist", department: "Analytics", applications: 8, status: "Draft" },
//   ]

//   const recentCandidates = [
//     {
//       id: 1,
//       name: "Alice Johnson",
//       position: "Senior React Developer",
//       status: "Interview Scheduled",
//       date: "2024-01-15",
//     },
//     { id: 2, name: "Bob Smith", position: "Product Manager", status: "Shortlisted", date: "2024-01-14" },
//     { id: 3, name: "Carol White", position: "UX Designer", status: "Offer Extended", date: "2024-01-13" },
//     { id: 4, name: "David Brown", position: "Data Scientist", status: "Pending Review", date: "2024-01-12" },
//   ]

//   return (
//     <div className="flex-1 overflow-y-auto bg-background">
//       <div className="p-4 md:p-8 space-y-8">
//         {/* Header */}
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
//           <p className="text-muted-foreground mt-2">Welcome back! Here's your hiring overview.</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {stats.map((stat, idx) => {
//             const Icon = stat.icon
//             return (
//               <Card key={idx} className="border-border">
//                 <CardContent className="p-6">
//                   {isLoading ? (
//                     <div className="space-y-3">
//                       <Skeleton className="h-4 w-24" />
//                       <Skeleton className="h-8 w-16" />
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
//                           <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
//                         </div>
//                         <div className={`${stat.color} p-3 rounded-lg`}>
//                           <Icon className="w-6 h-6 text-white" />
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2 mt-4 text-sm text-green-600">
//                         <TrendingUp className="w-4 h-4" />
//                         <span>+12% from last month</span>
//                       </div>
//                     </>
//                   )}
//                 </CardContent>
//               </Card>
//             )
//           })}
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Line Chart */}
//           <Card className="lg:col-span-2 border-border">
//             <CardHeader>
//               <CardTitle>Hiring Pipeline</CardTitle>
//               <CardDescription>Applications, interviews, and offers over time</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {isLoading ? (
//                 <Skeleton className="h-80 w-full" />
//               ) : (
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
//                     <XAxis stroke="var(--color-muted-foreground)" />
//                     <YAxis stroke="var(--color-muted-foreground)" />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "var(--color-card)",
//                         border: "1px solid var(--color-border)",
//                         borderRadius: "8px",
//                       }}
//                     />
//                     <Legend />
//                     <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} />
//                     <Line type="monotone" dataKey="interviews" stroke="#8b5cf6" strokeWidth={2} />
//                     <Line type="monotone" dataKey="offers" stroke="#10b981" strokeWidth={2} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               )}
//             </CardContent>
//           </Card>

//           {/* Pie Chart */}
//           <Card className="border-border">
//             <CardHeader>
//               <CardTitle>Candidate Status</CardTitle>
//               <CardDescription>Distribution of candidates</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {isLoading ? (
//                 <Skeleton className="h-80 w-full" />
//               ) : (
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ name, value }) => `${name}: ${value}%`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Jobs and Candidates */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Recent Jobs */}
//           <Card className="border-border">
//             <CardHeader>
//               <CardTitle>Recent Job Postings</CardTitle>
//               <CardDescription>Your latest job openings</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {isLoading ? (
//                 <div className="space-y-4">
//                   {[1, 2, 3, 4].map((i) => (
//                     <Skeleton key={i} className="h-16 w-full" />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {recentJobs.map((job) => (
//                     <div key={job.id} className="p-4 border border-border rounded-lg hover:bg-muted transition-colors">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <h4 className="font-semibold text-foreground">{job.title}</h4>
//                           <p className="text-sm text-muted-foreground">{job.department}</p>
//                         </div>
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-medium ${
//                             job.status === "Active"
//                               ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
//                               : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
//                           }`}
//                         >
//                           {job.status}
//                         </span>
//                       </div>
//                       <p className="text-sm text-muted-foreground mt-2">{job.applications} applications</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Recent Candidates */}
//           <Card className="border-border">
//             <CardHeader>
//               <CardTitle>Recent Candidates</CardTitle>
//               <CardDescription>Latest candidate activities</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {isLoading ? (
//                 <div className="space-y-4">
//                   {[1, 2, 3, 4].map((i) => (
//                     <Skeleton key={i} className="h-16 w-full" />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {recentCandidates.map((candidate) => (
//                     <div
//                       key={candidate.id}
//                       className="p-4 border border-border rounded-lg hover:bg-muted transition-colors"
//                     >
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <h4 className="font-semibold text-foreground">{candidate.name}</h4>
//                           <p className="text-sm text-muted-foreground">{candidate.position}</p>
//                         </div>
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-medium ${
//                             candidate.status === "Offer Extended"
//                               ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
//                               : candidate.status === "Interview Scheduled"
//                                 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
//                                 : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
//                           }`}
//                         >
//                           {candidate.status}
//                         </span>
//                       </div>
//                       <p className="text-xs text-muted-foreground mt-2">{candidate.date}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Action Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <Card className="border-border bg-gradient-to-br from-primary/10 to-primary/5">
//             <CardContent className="p-6">
//               <Briefcase className="w-8 h-8 text-primary mb-3" />
//               <h3 className="font-semibold text-foreground mb-2">Post a New Job</h3>
//               <p className="text-sm text-muted-foreground mb-4">Create and publish a new job opening</p>
//               <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Post Job</Button>
//             </CardContent>
//           </Card>

//           <Card className="border-border bg-gradient-to-br from-purple-500/10 to-purple-500/5">
//             <CardContent className="p-6">
//               <Users className="w-8 h-8 text-purple-600 mb-3" />
//               <h3 className="font-semibold text-foreground mb-2">View Candidates</h3>
//               <p className="text-sm text-muted-foreground mb-4">Browse and manage all candidates</p>
//               <Button variant="outline" className="w-full border-border hover:bg-muted bg-transparent">
//                 View Candidates
//               </Button>
//             </CardContent>
//           </Card>

//           <Card className="border-border bg-gradient-to-br from-orange-500/10 to-orange-500/5">
//             <CardContent className="p-6">
//               <AlertCircle className="w-8 h-8 text-orange-600 mb-3" />
//               <h3 className="font-semibold text-foreground mb-2">Pending Actions</h3>
//               <p className="text-sm text-muted-foreground mb-4">3 items need your attention</p>
//               <Button variant="outline" className="w-full border-border hover:bg-muted bg-transparent">
//                 Review
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, Briefcase, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { ProfilePage } from "./pages/profile-page"
import { SettingsPage } from "./pages/settings-page"
import { usePathname } from "next/navigation"

export function MainContent() {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (pathname === "/dashboard/profile") {
    return <ProfilePage />
  }

  if (pathname === "/dashboard/settings") {
    return <SettingsPage />
  }

  const stats = [
    { label: "Active Jobs", value: "0", icon: Briefcase, color: "bg-blue-500" },
    { label: "Total Candidates", value: "0", icon: Users, color: "bg-purple-500" },
    { label: "Interviews Scheduled", value: "0", icon: Clock, color: "bg-orange-500" },
    { label: "Offers Extended", value: "0", icon: CheckCircle, color: "bg-green-500" },
  ]

  const chartData = [
    { month: "Jan", applications: 400, interviews: 240, offers: 120 },
    { month: "Feb", applications: 520, interviews: 290, offers: 150 },
    { month: "Mar", applications: 680, interviews: 350, offers: 180 },
    { month: "Apr", applications: 750, interviews: 420, offers: 210 },
    { month: "May", applications: 890, interviews: 480, offers: 240 },
    { month: "Jun", applications: 1020, interviews: 550, offers: 280 },
  ]

  const pieData = [
    { name: "Shortlisted", value: 35 },
    { name: "Rejected", value: 25 },
    { name: "Pending", value: 40 },
  ]

  const COLORS = ["#3b82f6", "#ef4444", "#f59e0b"]

  const recentJobs = [
    { id: 1, title: "Senior React Developer", department: "Engineering", applications: 24, status: "Active" },
    { id: 2, title: "Product Manager", department: "Product", applications: 18, status: "Active" },
    { id: 3, title: "UX Designer", department: "Design", applications: 12, status: "Active" },
    { id: 4, title: "Data Scientist", department: "Analytics", applications: 8, status: "Draft" },
  ]

  const recentCandidates = [
    {
      id: 1,
      name: "Alice Johnson",
      position: "Senior React Developer",
      status: "Interview Scheduled",
      date: "2024-01-15",
    },
    { id: 2, name: "Bob Smith", position: "Product Manager", status: "Shortlisted", date: "2024-01-14" },
    { id: 3, name: "Carol White", position: "UX Designer", status: "Offer Extended", date: "2024-01-13" },
    { id: 4, name: "David Brown", position: "Data Scientist", status: "Pending Review", date: "2024-01-12" },
  ]

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="p-4 md:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's your hiring overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <Card key={idx} className="border-border">
                <CardContent className="p-6">
                  {isLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                          <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                        </div>
                        <div className={`${stat.color} p-3 rounded-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 text-sm text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>+12% from last month</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          {/* <Card className="lg:col-span-2 border-border">
            <CardHeader>
              <CardTitle>Hiring Pipeline</CardTitle>
              <CardDescription>Applications, interviews, and offers over time</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-80 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="interviews" stroke="#8b5cf6" strokeWidth={2} />
                    <Line type="monotone" dataKey="offers" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card> */}

          {/* Pie Chart */}
          {/* <Card className="border-border">
            <CardHeader>
              <CardTitle>Candidate Status</CardTitle>
              <CardDescription>Distribution of candidates</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-80 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card> */}
        </div>

        {/* Recent Jobs and Candidates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Jobs */}
          {/* <Card className="border-border">
            <CardHeader>
              <CardTitle>Recent Job Postings</CardTitle>
              <CardDescription>Your latest job openings</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job.id} className="p-4 border border-border rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{job.title}</h4>
                          <p className="text-sm text-muted-foreground">{job.department}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            job.status === "Active"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{job.applications} applications</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card> */}

          {/* Recent Candidates */}
          {/* <Card className="border-border">
            <CardHeader>
              <CardTitle>Recent Candidates</CardTitle>
              <CardDescription>Latest candidate activities</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{candidate.name}</h4>
                          <p className="text-sm text-muted-foreground">{candidate.position}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            candidate.status === "Offer Extended"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : candidate.status === "Interview Scheduled"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                          }`}
                        >
                          {candidate.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{candidate.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card> */}
        </div>

        {/* Action Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <Briefcase className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Post a New Job</h3>
              <p className="text-sm text-muted-foreground mb-4">Create and publish a new job opening</p>
              <Button className="cursor-pointer w-full bg-primary/50 hover:bg-primary/70 text-primary-foreground">Post Job</Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-gradient-to-br from-purple-500/10 to-purple-500/5">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-foreground mb-2">View Candidates</h3>
              <p className="text-sm text-muted-foreground mb-4">Browse and manage all candidates</p>
              <Button className="cursor-pointer w-full border-border bg-primary/50 hover:bg-primary/70 text-primary-foreground">
                View Candidates
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-gradient-to-br from-orange-500/10 to-orange-500/5">
            <CardContent className="p-6">
              <AlertCircle className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Pending Actions</h3>
              <p className="text-sm text-muted-foreground mb-4">3 items need your attention</p>
              <Button className="cursor-pointer w-full border-border bg-primary/50 hover:bg-primary/70 text-primary-foreground">
                Review
              </Button>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  )
}
