"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HelpCircle, MessageSquare, FileText, Mail, Phone, ChevronDown } from "lucide-react"

export function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    {
      id: 1,
      question: "How do I post a new job?",
      answer:
        "To post a new job, navigate to the Jobs section and click the 'Post New Job' button. Fill in the job details, requirements, and salary information, then publish.",
    },
    {
      id: 2,
      question: "How can I manage candidates?",
      answer:
        "Visit the Candidates section to view all applicants. You can shortlist, schedule interviews, send messages, and manage offers from this page.",
    },
    {
      id: 3,
      question: "How do I generate reports?",
      answer:
        "Go to Reports & Analytics to view hiring metrics, pipeline trends, and performance indicators. You can also export reports in various formats.",
    },
    {
      id: 4,
      question: "Can I customize my dashboard?",
      answer:
        "Yes, you can customize your dashboard by adjusting widgets, changing the layout, and setting your preferences in the Settings section.",
    },
    {
      id: 5,
      question: "How do I reset my password?",
      answer:
        "Go to Settings > Security and click 'Update Password'. Enter your current password and set a new one. Make sure to use a strong password.",
    },
  ]

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "support@swiftwave.ai",
      action: "Send Email",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+1 (555) 123-4567",
      action: "Call Now",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our team",
      action: "Start Chat",
    },
  ]

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="p-4 md:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
          <p className="text-muted-foreground mt-2">Get help with SwiftWave.AI</p>
        </div>

        {/* Search */}
        <div className="relative">
          <HelpCircle className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search help articles..."
            className="pl-10 h-11 border-2 border-border focus:border-primary"
          />
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, idx) => {
            const Icon = method.icon
            return (
              <Card key={idx} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <Card key={faq.id} className="border-border">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-muted transition-colors"
                >
                  <h3 className="font-semibold text-foreground text-left">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      expandedFaq === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === faq.id && (
                  <CardContent className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Documentation */}
        <Card className="border-border bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <FileText className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">Full Documentation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Access our comprehensive documentation for detailed guides and tutorials.
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  View Documentation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
