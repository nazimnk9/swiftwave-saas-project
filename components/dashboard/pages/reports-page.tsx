"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
import { Download } from "lucide-react"

export function ReportsPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const hiringData = [
    { month: "Jan", applications: 400, interviews: 240, offers: 120 },
    { month: "Feb", applications: 520, interviews: 290, offers: 150 },
    { month: "Mar", applications: 680, interviews: 350, offers: 180 },
    { month: "Apr", applications: 750, interviews: 420, offers: 210 },
    { month: "May", applications: 890, interviews: 480, offers: 240 },
    { month: "Jun", applications: 1020, interviews: 550, offers: 280 },
  ]

  const departmentData = [
    { name: "Engineering", value: 45 },
    { name: "Product", value: 25 },
    { name: "Design", value: 15 },
    { name: "Sales", value: 10 },
    { name: "Other", value: 5 },
  ]

  const performanceData = [
    { metric: "Time to Hire", value: 28, target: 30 },
    { metric: "Offer Acceptance", value: 85, target: 80 },
    { metric: "Candidate Quality", value: 92, target: 90 },
    { metric: "Interview Rate", value: 35, target: 40 },
  ]

  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-2">Track your hiring metrics and performance</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 w-full md:w-auto">
            <Download className="w-5 h-5" />
            Export Report
          </Button>
        </div>

        {/* Hiring Pipeline Chart */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Hiring Pipeline Trends</CardTitle>
            <CardDescription>Applications, interviews, and offers over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hiringData}>
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
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department Distribution */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Hiring by Department</CardTitle>
              <CardDescription>Distribution of open positions</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-80 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key hiring performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {performanceData.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{item.metric}</span>
                        <span className="text-sm font-semibold text-primary">{item.value}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Target: {item.target}%</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bar Chart */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Monthly Performance Comparison</CardTitle>
            <CardDescription>Comparison of key metrics across months</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hiringData}>
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
                  <Bar dataKey="applications" fill="#3b82f6" />
                  <Bar dataKey="interviews" fill="#8b5cf6" />
                  <Bar dataKey="offers" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
