"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState } from "react"

export default function ConfigurePage() {
  const [questions, setQuestions] = useState(["", ""])
  const [phoneNumber, setPhoneNumber] = useState("+1 415-555-0111")
  const [voiceId, setVoiceId] = useState("")
  const [sendPreAppLink, setSendPreAppLink] = useState("yes")

  const handleAddMoreQuestion = () => {
    setQuestions([...questions, ""])
  }

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index] = value
    setQuestions(newQuestions)
  }

  const handleSaveConfiguration = () => {
    console.log("Configuration saved:", {
      phoneNumber,
      voiceId,
      questions,
      sendPreAppLink,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Configure – AI Phone Call Recruiter</h1>
        <p className="text-muted-foreground">Complete your WhatsApp sender setup and configure interview settings.</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - General Setting */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">General setting</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Select a phone number for outbound calls and optionally configure your ElevenLabs voice.
          </p>

          <div className="space-y-6">
            {/* Select Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone-number" className="text-sm font-semibold">
                Select Phone Number
              </Label>
              <Select value={phoneNumber} onValueChange={setPhoneNumber}>
                <SelectTrigger id="phone-number">
                  <SelectValue placeholder="Select phone number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+1 415-555-0111">+1 415-555-0111</SelectItem>
                  <SelectItem value="+1 415-555-0222">+1 415-555-0222</SelectItem>
                  <SelectItem value="+1 415-555-0333">+1 415-555-0333</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Need another number?{" "}
                <Link href="/dashboard/phone-number-buy" className="text-primary hover:underline">
                  Buy new Number
                </Link>
              </p>
            </div>

            {/* ElevenLabs Voice ID */}
            <div className="space-y-2">
              <Label htmlFor="voice-id" className="text-sm font-semibold">
                ElevenLabs Voice ID (Optional)
              </Label>
              <Input
                id="voice-id"
                placeholder="elevenlabs voice id"
                value={voiceId}
                onChange={(e) => setVoiceId(e.target.value)}
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground">Paste your ElevenLabs Voice ID to use a custom voice.</p>
            </div>

            {/* Save Configuration Button */}
            <Button onClick={handleSaveConfiguration} className="w-full bg-[#1e293b] hover:bg-[#1e293b]/90 text-white">
              Save Configuration
            </Button>
          </div>
        </Card>

        {/* Right Column - Interview Settings */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Interview Settings</h2>

          <div className="space-y-6">
            {/* Add Common Question Section */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Add Common Question</Label>

              {questions.map((question, index) => (
                <Input
                  key={index}
                  placeholder={index === 0 ? "Type a common question" : "Type another question"}
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  className="bg-background"
                />
              ))}

              <Button
                onClick={handleAddMoreQuestion}
                variant="default"
                className="bg-[#1e293b] hover:bg-[#1e293b]/90 text-white"
              >
                Add More
              </Button>
            </div>

            {/* Send Pre-Application Link Section */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Send Pre-Application link to good matched?</Label>
              <RadioGroup value={sendPreAppLink} onValueChange={setSendPreAppLink}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="font-normal cursor-pointer">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="font-normal cursor-pointer">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
