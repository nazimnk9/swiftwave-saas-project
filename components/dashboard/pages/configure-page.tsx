"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { Trash2, CheckCircle2, AlertCircle, X, Upload, Image as ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToastNotification } from "@/components/auth/toast-provider"
import { LoaderOverlay } from "@/components/auth/loader-overlay"
import Image from "next/image"

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
  tempId: string
  uid?: string
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
  // ... others
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

// CV Formatter Constants
const CV_ENABLED_SECTIONS_OPTIONS = [
  "Full Name",
  "Email Address",
  "Phone Number",
  "Address",
  "Professional Summary",
  "Professional Experience",
  "Education",
  "Skills",
  "Certifications",
  "Languages",
  "Areas of Expertise",
  "Areas for improvement & recommendations"
]

const GDPR_INTERVAL_OPTIONS = [
  { label: "6 Months", value: "6_MONTH" },
  { label: "12 Months", value: "12_MONTH" },
  { label: "24 Months", value: "24_MONTH" },
  { label: "36 Months", value: "36_MONTH" },
  { label: "48 Months", value: "48_MONTH" },
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
  const [endCallNegative, setEndCallNegative] = useState("false")

  // Status Assignments
  const [jobAdStatus, setJobAdStatus] = useState("Current")
  const [applicationStatus, setApplicationStatus] = useState<string>("")
  const [callingTime, setCallingTime] = useState<string>("10")
  const [unsuccessfulStatus, setUnsuccessfulStatus] = useState<string>("")
  const [successfulStatus, setSuccessfulStatus] = useState<string>("")
  const [placedStatus, setPlacedStatus] = useState<string>("")

  // CV Formatter Specific States
  const [cvJobStatus, setCvJobStatus] = useState("")
  const [cvEnabledSections, setCvEnabledSections] = useState<string[]>([])
  const [cvUploadWithLogo, setCvUploadWithLogo] = useState("true")
  const [cvUploadWithoutLogo, setCvUploadWithoutLogo] = useState("true")
  const [cvLogo, setCvLogo] = useState<File | null>(null)
  const [cvLogoPreview, setCvLogoPreview] = useState<string | null>(null)

  // GDPR Specific States
  const [gdprShouldUseLastApplicationDate, setGdprShouldUseLastApplicationDate] = useState("true")
  const [gdprShouldUseLastPlacementDate, setGdprShouldUseLastPlacementDate] = useState("true")
  const [gdprShouldUseLastNoteCreatationDate, setGdprShouldUseLastNoteCreatationDate] = useState("true")
  const [gdprShouldUseActivityCreationDate, setGdprShouldUseActivityCreationDate] = useState("true")
  const [gdprShouldUseCandidateUpdateDate, setGdprShouldUseCandidateUpdateDate] = useState("true")
  const [gdprIntervalFromLastAction, setGdprIntervalFromLastAction] = useState("6_MONTH")

  // Dynamic Questions
  const [questions, setQuestions] = useState<QuestionInput[]>([{ tempId: crypto.randomUUID(), value: "", isSaved: false }])

  // UI States
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  // Determine App Type
  const isSms = featureName.toLowerCase().includes("sms")
  const isWhatsApp = featureName.toLowerCase().includes("what's app") || featureName.toLowerCase().includes("whatsapp")
  const isMessage = isSms || isWhatsApp

  const isCvFormatter = featureName.toLowerCase().includes("cv") && featureName.toLowerCase().includes("formatter")
  const isGdpr = featureName.toLowerCase().includes("gdpr")

  // Logo File Input Ref
  const logoInputRef = useRef<HTMLInputElement>(null)

  const getMessageType = () => {
    if (isWhatsApp) return "AI_WHATSAPP"
    if (isSms) return "AI_SMS"
    return null
  }

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

        // Feature Logic Detection
        const name = currentFeature?.name.toLowerCase() || ""
        const currentIsCv = name.includes("cv") && name.includes("formatter")
        const currentIsGdpr = name.includes("gdpr")
        const currentIsSms = name.includes("sms")
        const currentIsWhatsApp = name.includes("what's app") || name.includes("whatsapp")
        const currentIsMessage = currentIsSms || currentIsWhatsApp
        const currentType = currentIsWhatsApp ? "AI_WHATSAPP" : (currentIsSms ? "AI_SMS" : null)

        if (currentIsGdpr) {
          try {
            const configRes = await axios.get(`${BASE_URL}/gdpr/config/details`, { headers })
            const configData = configRes.data

            if (configData) {
              setIsUpdateMode(true)
              setPlatformUid(configData.platform?.uid || "")
              setGdprShouldUseLastApplicationDate(configData.should_use_last_application_date ? "true" : "false")
              setGdprShouldUseLastPlacementDate(configData.should_use_last_placement_date ? "true" : "false")
              setGdprShouldUseLastNoteCreatationDate(configData.should_use_last_note_creatation_date ? "true" : "false")
              setGdprShouldUseActivityCreationDate(configData.should_use_activity_creation_date ? "true" : "false")
              setGdprShouldUseCandidateUpdateDate(configData.should_use_candidate_update_date ? "true" : "false")
              setGdprIntervalFromLastAction(configData.interval_from_last_action || "6_MONTH")
            }
          } catch (err) {
            // No config yet
          }
        } else if (currentIsCv) {
          // Fetch CV Config
          try {
            const configRes = await axios.get(`${BASE_URL}/cv_formatter/config/details`, { headers })
            const configData = configRes.data

            if (configData) {
              setIsUpdateMode(true)
              setPlatformUid(configData.platform?.uid || "")
              setCvJobStatus(String(configData.job_status_for_formatting || ""))
              setCvEnabledSections(Array.isArray(configData.enabled_sections) ? configData.enabled_sections : [])
              setCvUploadWithLogo(configData.upload_with_logo ? "true" : "false")
              setCvUploadWithoutLogo(configData.upload_without_logo ? "true" : "false")
              if (configData.logo) {
                setCvLogoPreview(configData.logo) // Assuming URL is returned
              }
            } else {
              // Default values for new config
              // Per user request: "all data selected in Enabled Sections" initially
              setCvEnabledSections([...CV_ENABLED_SECTIONS_OPTIONS])
            }
          } catch (err) {
            // No config yet, set defaults
            setCvEnabledSections([...CV_ENABLED_SECTIONS_OPTIONS])
          }
        } else if (currentIsMessage && currentType) {
          try {
            const configRes = await axios.get(`${BASE_URL}/interview/message/config/details`, {
              headers,
              params: { type: currentType }
            })
            const configData = configRes.data

            if (configData) {
              setIsUpdateMode(true)

              setPlatformUid(configData.platform?.uid || "")
              setPhoneNumberUid(configData.phone?.uid || "")

              setJobAdStatus(configData.jobad_status_for_sms || "Current")
              setApplicationStatus(String(configData.application_status_for_sms || ""))
              setCallingTime(String(configData.sms_time_after_status_update || "10"))
              setUnsuccessfulStatus(String(configData.status_for_unsuccessful_sms || ""))
              setSuccessfulStatus(String(configData.status_for_successful_sms || ""))
              setPlacedStatus(String(configData.status_when_sms_is_send || ""))

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
          }
        } else {
          try {
            const configRes = await axios.get(`${BASE_URL}/interview/call/config/details`, { headers })
            const configData = configRes.data

            if (configData) {
              setIsUpdateMode(true)

              setPlatformUid(configData.platform?.uid || "")
              setPhoneNumberUid(configData.phone?.uid || "")
              setVoiceId(configData.voice_id || "")
              setEndCallNegative(configData.end_call_if_primary_answer_negative ? "true" : "false")

              setJobAdStatus(configData.jobad_status_for_calling || "Current")
              setApplicationStatus(String(configData.application_status_for_calling || ""))
              setCallingTime(String(configData.calling_time_after_status_update || "15"))
              setUnsuccessfulStatus(String(configData.status_for_unsuccessful_call || ""))
              setSuccessfulStatus(String(configData.status_for_successful_call || ""))
              setPlacedStatus(String(configData.status_when_call_is_placed || ""))

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

  // ... (Previous Question Handlers - Kept Helper Functions)
  const handleAddQuestion = () => {
    setQuestions([...questions, { tempId: crypto.randomUUID(), value: "", isSaved: false }])
  }

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index].value = value
    newQuestions[index].isSaved = false
    setQuestions(newQuestions)
  }

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index)
    setQuestions(newQuestions.length ? newQuestions : [{ tempId: crypto.randomUUID(), value: "", isSaved: false }])
  }

  const handleSuggestionClick = (index: number, suggestion: string) => {
    const newQuestions = [...questions]
    newQuestions[index].value = suggestion
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

    } catch (err) {
      console.error("Error saving question:", err)
    }
  }

  // --- CV Formatter Handlers ---
  const handleSectionSelect = (value: string) => {
    if (!cvEnabledSections.includes(value)) {
      setCvEnabledSections([...cvEnabledSections, value])
    }
  }

  const handleSectionRemove = (value: string) => {
    setCvEnabledSections(cvEnabledSections.filter(s => s !== value))
  }

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0]

      // Auto-compress if > 999KB
      if (file.size > 999 * 1024) {
        try {
          file = await compressImage(file)
        } catch (err) {
          console.error("Image compression failed:", err)
        }
      }

      setCvLogo(file)
      const objectUrl = URL.createObjectURL(file)
      setCvLogoPreview(objectUrl)
    }
  }

  const handleRemoveLogo = () => {
    setCvLogo(null)
    setCvLogoPreview(null)
    if (logoInputRef.current) logoInputRef.current.value = ""
  }


  // Final Save/Update Handler
  const handleSaveConfiguration = async () => {
    setError("")

    if (!isCvFormatter && !isGdpr) {
      // Validation for Interview/Message apps
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
    }

    try {
      setIsSaving(true)
      const authToken = localStorage.getItem("authToken")
      let response

      if (isGdpr) {
        const payload = {
          platform_uid: platformUid,
          should_use_last_application_date: gdprShouldUseLastApplicationDate === "true",
          should_use_last_placement_date: gdprShouldUseLastPlacementDate === "true",
          should_use_last_note_creatation_date: gdprShouldUseLastNoteCreatationDate === "true",
          should_use_activity_creation_date: gdprShouldUseActivityCreationDate === "true",
          should_use_candidate_update_date: gdprShouldUseCandidateUpdateDate === "true",
          interval_from_last_action: gdprIntervalFromLastAction
        }

        if (isUpdateMode) {
          response = await axios.patch(`${BASE_URL}/gdpr/config/details`, payload, {
            headers: { Authorization: `Bearer ${authToken}` }
          })
        } else {
          response = await axios.post(`${BASE_URL}/gdpr/config/`, payload, {
            headers: { Authorization: `Bearer ${authToken}` }
          })
        }

      } else if (isCvFormatter) {
        // CV Formatter Save Logic (FormData)
        const formData = new FormData()
        formData.append("platform_uid", platformUid)
        formData.append("job_status_for_formatting", cvJobStatus)
        formData.append("upload_with_logo", cvUploadWithLogo)
        formData.append("upload_without_logo", cvUploadWithoutLogo)

        cvEnabledSections.forEach(section => {
          formData.append("enabled_sections", section)
        })

        if (cvLogo) {
          formData.append("logo", cvLogo)
        }

        if (isUpdateMode) {
          response = await axios.patch(`${BASE_URL}/cv_formatter/config/details`, formData, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "multipart/form-data"
            }
          })
        } else {
          response = await axios.post(`${BASE_URL}/cv_formatter/config/`, formData, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "multipart/form-data"
            }
          })
        }

      } else {
        // Message & Call Logic
        const questionUids = questions.filter(q => q.uid).map(q => q.uid)
        let payload: any = {}

        if (isMessage) {
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
            type: getMessageType()
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

        if (isUpdateMode) {
          if (isMessage) {
            response = await axios.patch(`${BASE_URL}/interview/message/config/details`, payload, {
              headers: { Authorization: `Bearer ${authToken}` },
              params: { type: getMessageType() }
            })
          } else {
            response = await axios.patch(`${BASE_URL}/interview/call/config/details`, payload, {
              headers: { Authorization: `Bearer ${authToken}` }
            })
          }
        } else {
          if (isMessage) {
            response = await axios.post(`${BASE_URL}/interview/message/config/`, payload, {
              headers: { Authorization: `Bearer ${authToken}` }
            })
          } else {
            response = await axios.post(`${BASE_URL}/interview/call/config/`, payload, {
              headers: { Authorization: `Bearer ${authToken}` }
            })
          }
        }
      }

      // Success
      const successMsg = response.data?.message || (isUpdateMode ? "Configuration updated successfully!" : "Configuration saved successfully!")
      toast({
        title: "Success",
        description: successMsg
      })

      localStorage.removeItem("lastSavedQuestionUid")

      setTimeout(() => {
        router.push("/dashboard/apps")
      }, 1000)

    } catch (err: any) {
      console.error("Error saving/updating configuration:", err)
      const errorMsg = err.response?.data?.details || "Failed to save configuration. Please check all fields."
      setError(errorMsg)
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMsg
      })
      setIsSaving(false)
    }
  }

  const handleSelectChange = (setter: (val: string) => void) => (val: string) => {
    if (val === "_CLEAR_") {
      setter("")
    } else {
      setter(val)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      <LoaderOverlay
        isLoading={isLoading || isSaving}
        message={isLoading ? "Loading configuration..." : (isUpdateMode ? "Updating changes..." : "Saving changes...")}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Configure – {featureName || "Loading..."}</h1>
        <p className="text-muted-foreground">Complete your setup and configure {isCvFormatter ? "CV Formatting" : (isGdpr ? "GDPR Compliance" : (isMessage ? "messaging" : "interview"))} settings.</p>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive p-4 rounded-md mb-6 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Column */}
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">General Settings</h2>
            <div className="space-y-6">

              {/* Platform (Common) */}
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

              {/* Phone Number (Hide for CV Formatter & GDPR) */}
              {!isCvFormatter && !isGdpr && (
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
              )}

              {/* CV Formatter Specific Fields */}
              {isCvFormatter && (
                <>
                  {/* Application Status for Formatting */}
                  <div className="space-y-2">
                    <Label>Application Status for Formatting</Label>
                    <Select value={cvJobStatus} onValueChange={handleSelectChange(setCvJobStatus)}>
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

                  {/* Enabled Sections Multi-Select */}
                  <div className="space-y-2">
                    <Label>Enabled Sections</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {cvEnabledSections.map((section) => (
                        <div key={section} className="bg-primary/10 text-primary dark:text-white dark:border border-white text-sm px-3 py-1 rounded-full flex items-center gap-1 border border-primary/20">
                          {section}
                          <X className="h-3 w-3 cursor-pointer hover:text-primary/70 dark:hover:text-white/70" onClick={() => handleSectionRemove(section)} />
                        </div>
                      ))}
                    </div>
                    <Select onValueChange={handleSectionSelect} value="">
                      <SelectTrigger>
                        <SelectValue placeholder="Select section to add" />
                      </SelectTrigger>
                      <SelectContent>
                        {CV_ENABLED_SECTIONS_OPTIONS.filter(opt => !cvEnabledSections.includes(opt)).length > 0 ? (
                          CV_ENABLED_SECTIONS_OPTIONS.filter(opt => !cvEnabledSections.includes(opt)).map(opt => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-sm text-muted-foreground text-center">All sections selected</div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Upload With Logo Radio */}
                  <div className="space-y-3 pt-2">
                    <Label>Upload with logo?</Label>
                    <RadioGroup value={cvUploadWithLogo} onValueChange={setCvUploadWithLogo} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="uwl-yes" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white " />
                        <Label htmlFor="uwl-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="uwl-no" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" />
                        <Label htmlFor="uwl-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Upload Without Logo Radio */}
                  <div className="space-y-3 pt-2">
                    <Label>Upload without logo?</Label>
                    <RadioGroup value={cvUploadWithoutLogo} onValueChange={setCvUploadWithoutLogo} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="uwtl-yes" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" />
                        <Label htmlFor="uwtl-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="uwtl-no" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" />
                        <Label htmlFor="uwtl-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}

              {/* GDPR Specific Fields */}
              {isGdpr && (
                <>
                  <div className="space-y-3 pt-2">
                    <Label>Should use last application date</Label>
                    <RadioGroup value={gdprShouldUseLastApplicationDate} onValueChange={setGdprShouldUseLastApplicationDate} className="flex gap-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="app-yes" /><Label htmlFor="app-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="app-no" /><Label htmlFor="app-no">No</Label></div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Label>Should use last placement date</Label>
                    <RadioGroup value={gdprShouldUseLastPlacementDate} onValueChange={setGdprShouldUseLastPlacementDate} className="flex gap-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="place-yes" /><Label htmlFor="place-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="place-no" /><Label htmlFor="place-no">No</Label></div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Label>Should use last note creatation date</Label>
                    <RadioGroup value={gdprShouldUseLastNoteCreatationDate} onValueChange={setGdprShouldUseLastNoteCreatationDate} className="flex gap-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="note-yes" /><Label htmlFor="note-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="note-no" /><Label htmlFor="note-no">No</Label></div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Label>Should use activity creation date</Label>
                    <RadioGroup value={gdprShouldUseActivityCreationDate} onValueChange={setGdprShouldUseActivityCreationDate} className="flex gap-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="act-yes" /><Label htmlFor="act-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="act-no" /><Label htmlFor="act-no">No</Label></div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Label>Should use candidate update date</Label>
                    <RadioGroup value={gdprShouldUseCandidateUpdateDate} onValueChange={setGdprShouldUseCandidateUpdateDate} className="flex gap-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="cand-yes" /><Label htmlFor="cand-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="cand-no" /><Label htmlFor="cand-no">No</Label></div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label>Interval from last action</Label>
                    <Select value={gdprIntervalFromLastAction} onValueChange={setGdprIntervalFromLastAction}>
                      <SelectTrigger><SelectValue placeholder="Select interval" /></SelectTrigger>
                      <SelectContent>
                        {GDPR_INTERVAL_OPTIONS.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Existing Interview Fields (Calls, Voice ID) - Hide if CV Formatter or Message or GDPR */}
              {!isCvFormatter && !isMessage && !isGdpr && (
                <>
                  <div className="space-y-2">
                    <Label>ElevenLabs Voice ID (Optional)</Label>
                    <Input value={voiceId} onChange={(e) => setVoiceId(e.target.value)} placeholder="Enter Voice ID" className="bg-background" />
                  </div>
                  <div className="space-y-3 pt-2">
                    <Label>End call if primary answer is negative?</Label>
                    <RadioGroup value={endCallNegative} onValueChange={setEndCallNegative} className="flex gap-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="ec-yes" /><Label htmlFor="ec-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="ec-no" /><Label htmlFor="ec-no">No</Label></div>
                    </RadioGroup>
                  </div>
                </>
              )}

            </div>
          </Card>

          {/* Automation Logic Card - Hide for CV Formatter & GDPR */}
          {!isCvFormatter && !isGdpr && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Automation Logic</h2>
              <div className="space-y-6">
                {/* Job Ad Status */}
                <div className="space-y-2">
                  <Label>{isMessage ? "Job Ad Status for Message" : "Job Ad Status for Calling"}</Label>
                  <Select value={jobAdStatus} onValueChange={handleSelectChange(setJobAdStatus)}>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                      <SelectItem value="Current">Current</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Other existing automation fields... */}
                <div className="space-y-2">
                  <Label>{isMessage ? "Application Status for Message" : "Application Status for Calling"}</Label>
                  <Select value={applicationStatus} onValueChange={handleSelectChange(setApplicationStatus)}>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                      {statusOptions.map(s => (<SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                {/* ... Calling/SMS Time, Statuses ... */}
                <div className="space-y-2">
                  <Label>{isMessage ? "Message Time After Status Update" : "Calling Time After Status Update"}</Label>
                  <Select value={callingTime} onValueChange={handleSelectChange(setCallingTime)}>
                    <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                      {CALLING_TIME_OPTIONS.map(opt => (<SelectItem key={opt.value} value={String(opt.value)}>{opt.label}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{isMessage ? "Status When Message is send" : "Status When Call is Placed"}</Label>
                  <Select value={placedStatus} onValueChange={handleSelectChange(setPlacedStatus)}>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                      {statusOptions.map(s => (<SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{isMessage ? "Status for Successful Message" : "Status for Successful Call"}</Label>
                  <Select value={successfulStatus} onValueChange={handleSelectChange(setSuccessfulStatus)}>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                      {statusOptions.map(s => (<SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{isMessage ? "Status for Unsuccessful Message" : "Status for Unsuccessful Call"}</Label>
                  <Select value={unsuccessfulStatus} onValueChange={handleSelectChange(setUnsuccessfulStatus)}>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                      {statusOptions.map(s => (<SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          )}

        </div>

        {/* Right Column */}
        {isCvFormatter ? (
          // CV Formatter Logic - Logo Upload
          <Card className="p-6 h-fit">
            <h2 className="text-xl font-semibold text-foreground mb-4">Branding</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="border-2 border-dashed border-input rounded-lg p-6 flex flex-col items-center justify-center gap-4 hover:bg-muted/50 transition-colors">
                  {cvLogoPreview ? (
                    <div className="relative w-full aspect-video max-h-[200px] bg-muted rounded-md overflow-hidden flex items-center justify-center">
                      <img src={cvLogoPreview} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-md"
                        onClick={handleRemoveLogo}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <div className="bg-primary/10 p-4 rounded-full inline-block">
                        <ImageIcon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Click to upload logo</p>
                        {/* <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p> */}
                      </div>
                    </div>
                  )}

                  <Input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className={cvLogoPreview ? "hidden" : "cursor-pointer"}
                  />
                </div>
              </div>
            </div>
          </Card>
        ) : isGdpr ? (
          // GDPR - Empty Right Column (or we can add instructions/branding if needed)
          null
        ) : (
          // Existing Question Logic
          <Card className="p-6 h-fit">
            <h2 className="text-xl font-semibold text-foreground mb-4">Interview Questions</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Add primary questions for the {isMessage ? "message" : "interview"}. Save each question before saving the full configuration.
            </p>

            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={q.tempId} className="space-y-1">
                  <div className="flex gap-2 items-center">
                    <Input
                      value={q.value}
                      onChange={(e) => handleQuestionChange(index, e.target.value)}
                      placeholder={isMessage ? "Type message question" : "Type a question"}
                      className={`bg-background ${q.isSaved ? "border-green-500" : ""}`}
                      disabled={q.isSaved}
                    />
                    <div className="flex gap-1 shrink-0">
                      {!q.isSaved ? (
                        <Button size="sm" variant="outline" onClick={() => handleSaveQuestion(index)} className="h-10 px-3 cursor-pointer" title="Save Question" >Save</Button>
                      ) : (
                        <div className="h-10 w-10 flex items-center justify-center text-green-500" title="Saved"><CheckCircle2 className="h-5 w-5" /></div>
                      )}
                      <Button size="icon" variant="ghost" onClick={() => handleDeleteQuestion(index)} className="h-10 w-10 text-destructive hover:text-destructive/90 cursor-pointer" title="Delete"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  {!q.value && !q.isSaved && suggestedQuestions.length > 0 && (
                    <div className="border rounded-md p-2 bg-muted/20 space-y-2 mt-1">
                      <p className="text-xs text-muted-foreground font-medium px-1">Suggested Questions:</p>
                      <div className="flex flex-col gap-1">
                        {suggestedQuestions.map(s => (
                          <div key={s.id} onClick={() => handleSuggestionClick(index, s.question)} className="text-sm p-2 hover:bg-muted rounded-sm cursor-pointer transition-colors">{s.question}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Button onClick={handleAddQuestion} variant="default" className="bg-[#1e293b] hover:bg-[#1e293b]/90 text-white inline-block mt-4 cursor-pointer">Add More Question</Button>
            </div>
          </Card>
        )}
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

    </div >
  )
}

// Client-side image compression helper
const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    const src = URL.createObjectURL(file)
    img.src = src

    img.onload = () => {
      URL.revokeObjectURL(src)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        reject(new Error("Canvas context failed"))
        return
      }

      // Resize logic: Cap dimensions to 1024px
      const MAX_DIMENSION = 1024
      let width = img.width
      let height = img.height

      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = (height * MAX_DIMENSION) / width
          width = MAX_DIMENSION
        } else {
          width = (width * MAX_DIMENSION) / height
          height = MAX_DIMENSION
        }
      }

      canvas.width = width
      canvas.height = height

      ctx.drawImage(img, 0, 0, width, height)

      const type = file.type
      const quality = 0.7
      const finalType = type === "image/jpeg" ? "image/jpeg" : "image/png"

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas toBlob failed"))
          return
        }

        const compressedFile = new File([blob], file.name, {
          type: finalType,
          lastModified: Date.now(),
        })

        resolve(compressedFile)
      }, finalType, quality)
    }

    img.onerror = (err) => {
      URL.revokeObjectURL(src)
      reject(err)
    }
  })
}
