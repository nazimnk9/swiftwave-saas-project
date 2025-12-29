"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { Trash2, CheckCircle2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToastNotification } from "@/components/auth/toast-provider"
import { LoaderOverlay } from "@/components/auth/loader-overlay"

interface ConfigurePageProps {
  featureUid?: string
}

interface InterviewStatus {
  id: number
  name: string
}

interface Platform {
  id: number
  uid: string
  platform: {
    name: string
  }
}

interface PhoneNumber {
  id: number
  uid: string
  phone_number: string
  friendly_name: string
}

interface QuestionInput {
  tempId: string // Used for key when unsaved
  uid?: string // Present if saved
  value: string
  isSaved: boolean
}

interface SuggestedQuestion {
  id: number
  uid: string
  question: string
  status: string
}

interface AppFeature {
  uid: string
  name: string
}

// Fixed dropdown options for calling time
const CALLING_TIME_OPTIONS = [
  { label: "10 min", value: 10 },
  { label: "15 min", value: 15 },
  { label: "20 min", value: 20 },
  { label: "25 min", value: 25 },
  { label: "30 min", value: 30 },
  { label: "35 min", value: 35 },
  { label: "40 min", value: 40 },
  { label: "45 min", value: 45 },
  { label: "50 min", value: 50 },
  { label: "55 min", value: 55 },
  { label: "60 min", value: 60 },
]

export default function ConfigurePage({ featureUid }: ConfigurePageProps) {
  const router = useRouter()
  const { toast } = useToastNotification()

  // Dropdown Data States
  const [statusOptions, setStatusOptions] = useState<InterviewStatus[]>([])
  const [platformOptions, setPlatformOptions] = useState<Platform[]>([])
  const [phoneNumberOptions, setPhoneNumberOptions] = useState<PhoneNumber[]>([])
  const [featureName, setFeatureName] = useState("")
  const [isUpdateMode, setIsUpdateMode] = useState(false)
  const [suggestedQuestions, setSuggestedQuestions] = useState<SuggestedQuestion[]>([])

  // Form Field States
  const [phoneNumberUid, setPhoneNumberUid] = useState("")
  const [platformUid, setPlatformUid] = useState("")
  const [voiceId, setVoiceId] = useState("")
  const [endCallNegative, setEndCallNegative] = useState("false") // "true" or "false" string for radio

  // Status Assignments
  const [jobAdStatus, setJobAdStatus] = useState("Current") // "Current", "Expired", "Draft"
  const [applicationStatus, setApplicationStatus] = useState<string>("")
  const [callingTime, setCallingTime] = useState<string>("10")
  const [unsuccessfulStatus, setUnsuccessfulStatus] = useState<string>("")
  const [successfulStatus, setSuccessfulStatus] = useState<string>("")
  const [placedStatus, setPlacedStatus] = useState<string>("") // status_when_call_is_placed or status_when_sms_is_send

  // Dynamic Questions
  const [questions, setQuestions] = useState<QuestionInput[]>([{ tempId: crypto.randomUUID(), value: "", isSaved: false }])

  // UI States
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  const isSms = featureName.toLowerCase().includes("sms")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken")
        const headers = { Authorization: `Bearer ${authToken}` }

        const [statusRes, platformRes, phoneRes, featuresRes, questionsRes] = await Promise.all([
          axios.get<InterviewStatus[]>(`${BASE_URL}/interview/status/`, { headers }),
          axios.get<{ results: Platform[] }>(`${BASE_URL}/organizations/platform/my_platforms`, { headers }),
          axios.get<{ results: PhoneNumber[] }>(`${BASE_URL}/phone_number/`, { headers }),
          axios.get<{ results: AppFeature[] }>(`${BASE_URL}/subscription/features/`, { headers }),
          axios.get<{ results: SuggestedQuestion[] }>(`${BASE_URL}/interview/call/config/primary_questions`, { headers })
        ])

        setStatusOptions(statusRes.data)
        setPlatformOptions(platformRes.data.results)
        setPhoneNumberOptions(phoneRes.data.results)
        setSuggestedQuestions(questionsRes.data.results)

        const currentFeature = featuresRes.data.results.find(f => f.uid === featureUid)
        if (currentFeature) {
          setFeatureName(currentFeature.name)
        }

        // Try to fetch existing configuration
        // We only attempt this for "Ai Call Interview" or non-SMS features as requested.
        // User explicitly stated: do not show data from get api under "Ai SMS recruiter"
        const isSmsFeature = currentFeature?.name.toLowerCase().includes("sms")

        if (!isSmsFeature) {
          try {
            const configRes = await axios.get(`${BASE_URL}/interview/call/config/details`, { headers })
            const configData = configRes.data

            if (configData) {
              setIsUpdateMode(true)

              // Populate fields
              setPlatformUid(configData.platform?.uid || "")
              setPhoneNumberUid(configData.phone?.uid || "")
              setVoiceId(configData.voice_id || "")
              setEndCallNegative(configData.end_call_if_primary_answer_negative ? "true" : "false")

              // Map statuses
              // Note: The API returns `application_status_for_calling` etc which matches our state keys mostly
              setJobAdStatus(configData.jobad_status_for_calling || configData.jobad_status_for_sms || "Current")
              setApplicationStatus(String(configData.application_status_for_calling || configData.application_status_for_sms || ""))
              setCallingTime(String(configData.calling_time_after_status_update || configData.sms_time_after_status_update || "15"))
              setUnsuccessfulStatus(String(configData.status_for_unsuccessful_call || configData.status_for_unsuccessful_sms || ""))
              setSuccessfulStatus(String(configData.status_for_successful_call || configData.status_for_successful_sms || ""))
              setPlacedStatus(String(configData.status_when_call_is_placed || configData.status_when_sms_is_send || ""))

              // Map Questions
              if (configData.primary_questions && Array.isArray(configData.primary_questions)) {
                const mappedQuestions = configData.primary_questions.map((q: any) => ({
                  tempId: crypto.randomUUID(),
                  uid: q.uid,
                  value: q.question,
                  isSaved: true
                }))
                setQuestions(mappedQuestions.length > 0 ? mappedQuestions : [{ tempId: crypto.randomUUID(), value: "", isSaved: false }])
              }
            }
          } catch (configErr) {
            // Ignore 404 or other errors, implies no existing config or different endpoint
            console.log("No existing configuration found or error fetching it:", configErr)
          }
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching configuration data:", err)
        setError("Failed to load configuration options")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Question Handlers
  const handleAddQuestion = () => {
    setQuestions([...questions, { tempId: crypto.randomUUID(), value: "", isSaved: false }])
  }

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index].value = value
    newQuestions[index].isSaved = false // Reset saved state on edit
    setQuestions(newQuestions)
  }

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index)
    setQuestions(newQuestions.length ? newQuestions : [{ tempId: crypto.randomUUID(), value: "", isSaved: false }])
  }

  const handleSuggestionClick = (index: number, suggestion: string) => {
    const newQuestions = [...questions]
    newQuestions[index].value = suggestion
    // We don't mark as saved yet because user might want to edit it or save manually
    // But typically we treat it as an edit.
    setQuestions(newQuestions)
  }

  const handleSaveQuestion = async (index: number) => {
    const question = questions[index]
    if (!question.value.trim()) return

    try {
      const authToken = localStorage.getItem("authToken")
      const response = await axios.post(
        `${BASE_URL}/interview/call/config/primary_questions`,
        { question: question.value },
        { headers: { Authorization: `Bearer ${authToken}` } }
      )

      const newQuestions = [...questions]
      newQuestions[index].uid = response.data.uid
      newQuestions[index].isSaved = true
      setQuestions(newQuestions)

      // Store in localStorage as requested (though strictly speaking we have it in state now)
      // localStorage.setItem("lastSavedQuestionUid", response.data.uid) 

    } catch (err) {
      console.error("Error saving question:", err)
      // Ideally show a toast or error for this specific action
    }
  }

  // Final Save/Update Handler
  const handleSaveConfiguration = async () => {
    setError("")

    // Validation: Check for status overlaps
    const selectedStatuses = [applicationStatus, unsuccessfulStatus, successfulStatus, placedStatus].filter(Boolean)
    const uniqueStatuses = new Set(selectedStatuses)
    if (selectedStatuses.length !== uniqueStatuses.size) {
      const msg = "Error: You cannot select the same status for multiple distinct outcomes."
      setError(msg)
      toast({
        variant: "destructive",
        title: "Error",
        description: msg
      })
      return
    }

    // Validation: Ensure all questions are saved
    const unsavedQuestions = questions.filter(q => q.value.trim() && !q.isSaved)
    if (unsavedQuestions.length > 0) {
      const msg = "Please save all your questions before saving the configuration."
      setError(msg)
      toast({
        variant: "destructive",
        title: "Error",
        description: msg
      })
      return
    }

    // Filter out valid question UIDs
    const questionUids = questions.filter(q => q.uid).map(q => q.uid)

    try {
      setIsSaving(true)
      const authToken = localStorage.getItem("authToken")

      let payload: any = {}

      if (isSms) {
        payload = {
          application_status_for_sms: Number(applicationStatus),
          jobad_status_for_sms: jobAdStatus,
          sms_time_after_status_update: Number(callingTime),
          status_for_unsuccessful_sms: Number(unsuccessfulStatus),
          status_for_successful_sms: Number(successfulStatus),
          status_when_sms_is_send: Number(placedStatus),
          platform_uid: platformUid,
          phone_uid: phoneNumberUid,
          primary_question_inputs: questionUids,
          type: "AI_SMS"
        }
      } else {
        payload = {
          end_call_if_primary_answer_negative: endCallNegative === "true",
          jobad_status_for_calling: jobAdStatus,
          application_status_for_calling: Number(applicationStatus),
          calling_time_after_status_update: Number(callingTime),
          status_for_unsuccessful_call: Number(unsuccessfulStatus),
          status_for_successful_call: Number(successfulStatus),
          status_when_call_is_placed: Number(placedStatus),
          platform_uid: platformUid,
          phone_uid: phoneNumberUid,
          primary_question_inputs: questionUids,
          voice_id: voiceId
        }
      }

      let response
      if (isUpdateMode) {
        // PATCH request for Update
        response = await axios.patch(`${BASE_URL}/interview/call/config/details`, payload, {
          headers: { Authorization: `Bearer ${authToken}` }
        })
      } else {
        // POST request for Create
        response = await axios.post(`${BASE_URL}/interview/call/config/`, payload, {
          headers: { Authorization: `Bearer ${authToken}` }
        })
      }

      // Success
      const successMsg = response.data?.message || (isUpdateMode ? "Configuration updated successfully!" : "Configuration saved successfully!")
      toast({
        title: "Success",
        description: successMsg
      })

      localStorage.removeItem("lastSavedQuestionUid") // cleanup if we used it

      // Delay redirect slightly to show toast
      setTimeout(() => {
        router.push("/dashboard/apps")
      }, 1000)

    } catch (err: any) {
      console.error("Error saving/updating configuration:", err)

      const smsErrors = isSms ? (err.response?.data?.application_status_for_sms || err.response?.data?.jobad_status_for_sms || err.response?.data?.sms_time_after_status_update || err.response?.data?.status_for_unsuccessful_sms || err.response?.data?.status_for_successful_sms || err.response?.data?.status_when_sms_is_send) : null

      const callErrors = !isSms ? (err.response?.data?.end_call_if_primary_answer_negative || err.response?.data?.jobad_status_for_calling || err.response?.data?.application_status_for_calling || err.response?.data?.calling_time_after_status_update || err.response?.data?.status_for_unsuccessful_call || err.response?.data?.status_for_successful_call || err.response?.data?.status_when_call_is_placed || err.response?.data?.voice_id) : null

      const commonErrors = err.response?.data?.platform_uid || err.response?.data?.phone_uid || err.response?.data?.primary_question_inputs || err.response?.data?.details || "Failed to save configuration. Please check all fields."

      const errorMsg = smsErrors || callErrors || commonErrors

      setError(errorMsg)
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMsg
      })
      setIsSaving(false)
    }
  }

  // Handle Select Change with Clear Option
  const handleSelectChange = (setter: (val: string) => void) => (val: string) => {
    if (val === "_CLEAR_") {
      setter("")
    } else {
      setter(val)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <LoaderOverlay
        isLoading={isLoading || isSaving}
        message={isLoading ? "Loading configuration..." : (isUpdateMode ? "Updating changes..." : "Saving changes...")}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Configure – {featureName || "Loading..."}</h1>
        <p className="text-muted-foreground">Complete your setup and configure {isSms ? "SMS" : "interview"} settings.</p>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive p-4 rounded-md mb-6 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - General & Status Settings */}
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">General Settings</h2>
            <div className="space-y-6">

              {/* Platform */}
              <div className="space-y-2">
                <Label>Platform</Label>
                <Select value={platformUid} onValueChange={handleSelectChange(setPlatformUid)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                    {platformOptions.map(p => (
                      <SelectItem key={p.id} value={p.uid}>{p.platform.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label>Select Phone Number</Label>
                <Select value={phoneNumberUid} onValueChange={handleSelectChange(setPhoneNumberUid)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select phone number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                    {phoneNumberOptions.map(p => (
                      <SelectItem key={p.id} value={p.uid}>
                        {p.phone_number} {p.friendly_name ? `(${p.friendly_name})` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Need another number? <Link href="/dashboard/phone-number-buy" className="text-primary hover:underline">Buy New Number</Link>
                </p>
              </div>

              {/* Voice ID - Hidden for SMS */}
              {!isSms && (
                <div className="space-y-2">
                  <Label>ElevenLabs Voice ID (Optional)</Label>
                  <Input
                    value={voiceId}
                    onChange={(e) => setVoiceId(e.target.value)}
                    placeholder="Enter Voice ID"
                    className="bg-background"
                  />
                </div>
              )}

              {/* End Call Negative Radio - Hidden for SMS */}
              {!isSms && (
                <div className="space-y-3 pt-2">
                  <Label>End call if primary answer is negative?</Label>
                  <RadioGroup value={endCallNegative} onValueChange={setEndCallNegative} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="ec-yes" />
                      <Label htmlFor="ec-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="ec-no" />
                      <Label htmlFor="ec-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Automation Logic</h2>
            <div className="space-y-6">

              {/* Job Ad Status */}
              <div className="space-y-2">
                <Label>{isSms ? "Job Ad Status for SMS" : "Job Ad Status for Calling"}</Label>
                <Select value={jobAdStatus} onValueChange={handleSelectChange(setJobAdStatus)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                    <SelectItem value="Current">Current</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Application Status */}
              <div className="space-y-2">
                <Label>{isSms ? "Application Status for SMS" : "Application Status for Calling"}</Label>
                <Select value={applicationStatus} onValueChange={handleSelectChange(setApplicationStatus)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                    {statusOptions.map(s => (
                      <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Calling/SMS Time */}
              <div className="space-y-2">
                <Label>{isSms ? "SMS Time After Status Update" : "Calling Time After Status Update"}</Label>
                <Select value={callingTime} onValueChange={handleSelectChange(setCallingTime)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                    {CALLING_TIME_OPTIONS.map(opt => (
                      <SelectItem key={opt.value} value={String(opt.value)}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status When Call Placed / SMS Sent */}
              <div className="space-y-2">
                <Label>{isSms ? "Status When SMS is send" : "Status When Call is Placed"}</Label>
                <Select value={placedStatus} onValueChange={handleSelectChange(setPlacedStatus)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                    {statusOptions.map(s => (
                      <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status for Successful */}
              <div className="space-y-2">
                <Label>{isSms ? "Status for Successful SMS" : "Status for Successful Call"}</Label>
                <Select value={successfulStatus} onValueChange={handleSelectChange(setSuccessfulStatus)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                    {statusOptions.map(s => (
                      <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status for Unsuccessful */}
              <div className="space-y-2">
                <Label>{isSms ? "Status for Unsuccessful SMS" : "Status for Unsuccessful Call"}</Label>
                <Select value={unsuccessfulStatus} onValueChange={handleSelectChange(setUnsuccessfulStatus)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                    {statusOptions.map(s => (
                      <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            </div>
          </Card>
        </div>

        {/* Right Column - Questions */}
        <Card className="p-6 h-fit">
          <h2 className="text-xl font-semibold text-foreground mb-4">Interview Questions</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Add primary questions for the {isSms ? "SMS" : "interview"}. Save each question before saving the full configuration.
          </p>

          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={q.tempId} className="space-y-1">
                <div className="flex gap-2 items-center">
                  <Input
                    value={q.value}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                    placeholder={isSms ? "Type SMS question" : "Type a question"}
                    className={`bg-background ${q.isSaved ? "border-green-500" : ""}`}
                    disabled={q.isSaved}
                  />

                  {/* Action Buttons */}
                  <div className="flex gap-1 shrink-0">
                    {!q.isSaved ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSaveQuestion(index)}
                        className="h-10 px-3 cursor-pointer"
                        title="Save Question"
                      >
                        Save
                      </Button>
                    ) : (
                      <div className="h-10 w-10 flex items-center justify-center text-green-500" title="Saved">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    )}

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteQuestion(index)}
                      className="h-10 w-10 text-destructive hover:text-destructive/90 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Suggested Questions - Only show if input is empty and not saved */}
                {!q.value && !q.isSaved && suggestedQuestions.length > 0 && (
                  <div className="border rounded-md p-2 bg-muted/20 space-y-2 mt-1">
                    <p className="text-xs text-muted-foreground font-medium px-1">Suggested Questions:</p>
                    <div className="flex flex-col gap-1">
                      {suggestedQuestions.map(s => (
                        <div
                          key={s.id}
                          onClick={() => handleSuggestionClick(index, s.question)}
                          className="text-sm p-2 hover:bg-muted rounded-sm cursor-pointer transition-colors"
                        >
                          {s.question}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Button
              onClick={handleAddQuestion}
              variant="default"
              className="bg-[#1e293b] hover:bg-[#1e293b]/90 text-white inline-block mt-4 cursor-pointer"
            >
              Add More Question
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Save Bar */}
      <div className="mt-8 flex justify-start gap-4">
        <Button
          size="lg"
          onClick={handleSaveConfiguration}
          disabled={isSaving}
          className="bg-primary hover:bg-primary/90 min-w-[200px] cursor-pointer"
        >
          {isSaving ? (isUpdateMode ? "Updating..." : "Saving...") : (isUpdateMode ? "Update Configure" : "Save Configure")}
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={() => router.back()}
          className="min-w-[100px] cursor-pointer"
        >
          Back
        </Button>
      </div>

    </div>
  )
}
