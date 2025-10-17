"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Bell, Lock, User, Building, Save } from "lucide-react"

export function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
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
                      placeholder="John"
                      defaultValue="John"
                      className="h-11 border-2 border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <Input
                      type="text"
                      placeholder="Doe"
                      defaultValue="Doe"
                      className="h-11 border-2 border-border focus:border-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    defaultValue="john@example.com"
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    defaultValue="+1 (555) 123-4567"
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
                    placeholder="Your Company"
                    defaultValue="Tech Innovations Inc."
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Industry</label>
                  <Input
                    type="text"
                    placeholder="Technology"
                    defaultValue="Software Development"
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Company Size</label>
                  <Input
                    type="text"
                    placeholder="50-100"
                    defaultValue="50-100 employees"
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
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Current Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">New Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-11 border-2 border-border focus:border-primary"
                  />
                </div>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
                >
                  <Lock className="w-4 h-4" />
                  {isSaving ? "Updating..." : "Update Password"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
