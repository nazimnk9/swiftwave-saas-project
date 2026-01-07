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
import { getCookie } from "cookies-next"
import { Trash2, CheckCircle2, AlertCircle, X, Upload, Image as ImageIcon, ArrowLeft, Search, Plus } from "lucide-react"
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

interface AwrStatus {
  id: number
  name: string
}

interface AwrPaymentType {
  name: string
}

interface AwrMonthOption {
  label: string
  value: number
}

interface CandidateStatus {
  id: number
  name: string
}

interface ContentVariable {
  serial: string
  value: string
}

interface Contact {
  id: number
  first_name: string | null
  last_name: string | null
  email: string | null
  phone: string | null
}


// Fixed dropdown options for calling time
const CALLING_TIME_OPTIONS = [
  { label: "5 min", value: 5 },
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

// Skill Search Constants
const SEARCH_RADIUS_OPTIONS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
const MIN_SKILL_MATCH_OPTIONS = [
  { label: "10%", value: 10 },
  { label: "20%", value: 20 },
  { label: "30%", value: 30 },
  { label: "40%", value: 40 },
  { label: "50%", value: 50 },
  { label: "60%", value: 60 },
  { label: "70%", value: 70 },
  { label: "80%", value: 80 },
  { label: "90%", value: 90 },
  { label: "100%", value: 100 },
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

const SERIAL_OPTIONS = Array.from({ length: 10 }, (_, i) => ({
  label: String(i + 1),
  value: i + 1
}))


const GDPR_INTERVAL_OPTIONS = [
  { label: "6 Months", value: "6_MONTH" },
  { label: "12 Months", value: "12_MONTH" },
  { label: "24 Months", value: "24_MONTH" },
  { label: "36 Months", value: "36_MONTH" },
  { label: "48 Months", value: "48_MONTH" },
]

const AWR_PLACEMENT_DAYS_OPTIONS: AwrMonthOption[] = [
  { label: "1 month", value: 30 },
  { label: "2 month", value: 60 },
  { label: "3 month", value: 90 },
  { label: "4 month", value: 120 },
  { label: "5 month", value: 150 },
  { label: "6 month", value: 180 },
  { label: "7 month", value: 210 },
  { label: "8 month", value: 240 },
  { label: "9 month", value: 270 },
  { label: "10 month", value: 300 },
  { label: "11 month", value: 330 },
  { label: "12 month", value: 360 }
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

  // Skill Search Data States
  const [candidateStatusOptions, setCandidateStatusOptions] = useState<CandidateStatus[]>([])

  // WhatsApp Campaign Data States
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactSearchTerm, setContactSearchTerm] = useState("")
  // Dropdown visibility state
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false)
  const contactDropdownRef = useRef<HTMLDivElement>(null)

  // Click outside handler for contact dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target as Node)) {
        setIsContactDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])


  // Form Field States
  const [phoneNumberUid, setPhoneNumberUid] = useState("")
  const [platformUid, setPlatformUid] = useState("")
  const [voiceId, setVoiceId] = useState("")
  const [endCallNegative, setEndCallNegative] = useState("false")

  // Skill Search Form States
  const [searchRadiusKm, setSearchRadiusKm] = useState<string>("")
  const [selectedCandidateStatusIds, setSelectedCandidateStatusIds] = useState<number[]>([])
  const [jobAdStatusForSkillSearch, setJobAdStatusForSkillSearch] = useState<string>("Current")
  const [minSkillMatchPercentage, setMinSkillMatchPercentage] = useState<string>("")
  const [considerEmploymentHistory, setConsiderEmploymentHistory] = useState("true")
  const [processCvForSkills, setProcessCvForSkills] = useState("true")
  const [maxCandidatesPerJob, setMaxCandidatesPerJob] = useState<string>("")
  const [autoApplyMatchedCandidates, setAutoApplyMatchedCandidates] = useState("true")
  const [autoApplyStatus, setAutoApplyStatus] = useState<string>("")
  const [sendWhatsappNotifications, setSendWhatsappNotifications] = useState("true")

  // WhatsApp Campaign Form States
  const [campaignTitle, setCampaignTitle] = useState("")
  const [twilioContentSid, setTwilioContentSid] = useState("")
  const [contentVariables, setContentVariables] = useState<ContentVariable[]>([])
  const [contactFilterType, setContactFilterType] = useState<string>("")
  const [selectedContactIds, setSelectedContactIds] = useState<number[]>([])
  const [scheduleType, setScheduleType] = useState<string>("")
  const [scheduledAt, setScheduledAt] = useState("")
  const [chatbotTemplate, setChatbotTemplate] = useState<string>("")
  const [waFromPhoneNumber, setWaFromPhoneNumber] = useState("")


  // Status Assignments
  const [jobAdStatus, setJobAdStatus] = useState("Current")
  const [applicationStatus, setApplicationStatus] = useState<string>("")
  const [callingTime, setCallingTime] = useState<string>("5")
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

  // AWR Specific States
  const [awrStatusOptions, setAwrStatusOptions] = useState<AwrStatus[]>([])
  const [awrPaymentTypeOptions, setAwrPaymentTypeOptions] = useState<AwrPaymentType[]>([])
  const [awrSelectedStatusIds, setAwrSelectedStatusIds] = useState<number[]>([])
  const [awrSelectedPaymentTypes, setAwrSelectedPaymentTypes] = useState<string[]>([])
  const [awrPlacementDays, setAwrPlacementDays] = useState<string>("")

  // Dynamic Questions
  const [questions, setQuestions] = useState<QuestionInput[]>([{ tempId: crypto.randomUUID(), value: "", isSaved: false }])

  // UI States
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  // Determine App Type
  const isSms = featureName.toLowerCase().includes("sms")
  const isWhatsApp = featureName.toLowerCase().includes("recruiter") || featureName.toLowerCase().includes("recruiter")
  const isMessage = isSms || isWhatsApp

  const isCvFormatter = featureName.toLowerCase().includes("cv") && featureName.toLowerCase().includes("formatter")
  const isGdpr = featureName.toLowerCase().includes("gdpr")
  const isAwr = featureName.toLowerCase().includes("awr") && (featureName.toLowerCase().includes("complience") || featureName.toLowerCase().includes("compliance"))
  const isSkillSearch = featureName.toLowerCase().includes("skill") && featureName.toLowerCase().includes("search")
  const isWhatsappCampaign = featureName.toLowerCase().includes("campaign") && featureName.toLowerCase().includes("whatsapp")


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
        const authToken = getCookie("authToken")
        const headers = { Authorization: `Bearer ${authToken}` }

        const [statusRes, platformRes, phoneRes, featuresRes, questionsRes, awrStatusRes, awrPaymentRes, candidateStatusRes] = await Promise.all([
          axios.get<InterviewStatus[]>(`${BASE_URL}/interview/status/`, { headers }),
          axios.get<{ results: Platform[] }>(`${BASE_URL}/organizations/platform/my_platforms`, { headers }),
          axios.get<{ results: PhoneNumber[] }>(`${BASE_URL}/phone_number/`, { headers }),
          axios.get<{ results: AppFeature[] }>(`${BASE_URL}/subscription/features/`, { headers }),
          axios.get<{ results: SuggestedQuestion[] }>(`${BASE_URL}/interview/call/config/primary_questions`, { headers }),
          axios.get<AwrStatus[]>(`${BASE_URL}/awr/list/status`, { headers }).catch(() => ({ data: [] })),
          axios.get<AwrPaymentType[]>(`${BASE_URL}/awr/list/payment-types`, { headers }).catch(() => ({ data: [] })),
          axios.get<CandidateStatus[]>(`${BASE_URL}/skill_search/list/candidates/status`, { headers }).catch(() => ({ data: [] }))
        ])

        if (statusRes) setStatusOptions(statusRes.data)
        if (platformRes) setPlatformOptions(platformRes.data.results)
        if (phoneRes) setPhoneNumberOptions(phoneRes.data.results)
        if (questionsRes) setSuggestedQuestions(questionsRes.data.results)
        if (awrStatusRes) setAwrStatusOptions(awrStatusRes.data)
        if (awrPaymentRes) setAwrPaymentTypeOptions(awrPaymentRes.data)
        // @ts-ignore
        if (candidateStatusRes) setCandidateStatusOptions(candidateStatusRes.data)

        // Data processing

        const currentFeature = featuresRes.data.results.find(f => f.uid === featureUid)
        if (currentFeature) {
          setFeatureName(currentFeature.name)
        }

        // Feature Logic Detection
        const name = currentFeature?.name.toLowerCase() || ""
        const currentIsCv = name.includes("cv") && name.includes("formatter")
        const currentIsGdpr = name.includes("gdpr")
        const currentIsSms = name.includes("sms")
        const currentIsWhatsApp = name.includes("recruiter") || name.includes("recruiter")
        const currentIsAwr = name.includes("awr")
        const currentIsSkillSearch = name.includes("skill") && name.includes("search")
        const currentIsWhatsappCampaign = name.includes("campaign") && name.includes("whatsapp")
        const currentIsMessage = currentIsSms || currentIsWhatsApp

        const currentType = currentIsWhatsApp ? "AI_WHATSAPP" : (currentIsSms ? "AI_SMS" : null)

        if (currentIsAwr) {
          try {
            const configRes = await axios.get(`${BASE_URL}/awr/config/details`, { headers })
            const configData = configRes.data

            if (configData) {
              setIsUpdateMode(true)
              setPlatformUid(configData.platform?.uid || "")
              setAwrSelectedStatusIds(configData.selected_status_ids || [])
              setAwrSelectedPaymentTypes(configData.selected_payment_types || [])
              setAwrPlacementDays(String(configData.placement_started_before_days || ""))
            }
          } catch (err) {
            // No config yet
          }
        } else if (currentIsGdpr) {
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
        } else if (currentIsSkillSearch) {
          try {
            const configRes = await axios.get(`${BASE_URL}/skill_search/config/details`, { headers })
            const configData = configRes.data

            if (configData) {
              setIsUpdateMode(true)
              setPlatformUid(configData.platform?.uid || "")
              setSearchRadiusKm(String(configData.search_radius_km || ""))
              setSelectedCandidateStatusIds(configData.candidate_status_ids || [])
              setJobAdStatusForSkillSearch(configData.jobad_status_for_skill_search || "Current")
              setMinSkillMatchPercentage(String(configData.minimum_skill_match_percentage || ""))
              setConsiderEmploymentHistory(configData.consider_employment_history ? "true" : "false")
              setProcessCvForSkills(configData.process_cv_for_skills ? "true" : "false")
              setMaxCandidatesPerJob(String(configData.max_candidates_per_job || ""))
              setAutoApplyMatchedCandidates(configData.auto_apply_matched_candidates ? "true" : "false")
              setAutoApplyStatus(String(configData.auto_apply_status || ""))
              setSendWhatsappNotifications(configData.send_whatsapp_notifications ? "true" : "false")
            }
          } catch (err) {
            // No config yet
          }
        } else if (currentIsWhatsappCampaign) {
          try {
            // Fetch initial contacts
            // Note: The prompt says "when select 'selected' from 'Contact filter type' drop down select field then show 'Selected contact ids' multi drop down select field & option show in 'Selected contact ids' multi drop down select field from get api"
            // But we might want to pre-fetch if we are in update mode and contacts are already selected.
            // For now, we will fetch contacts when the component mounts if it is a campaign app, or lazily when needed.
            // Let's fetch basic contacts here.
            axios.get<Contact[]>(`${BASE_URL}/campaign/whatsapp/list/contacts`, { headers }).then(res => {
              setContacts(res.data)
            }).catch(e => console.error("Error fetching contacts", e))

            // Usually we would fetch current config details here, but the prompt implies we are building the form. 
            // If there's a GET endpoint for config details, we should use it. 
            // The prompt says "post data in post api", but also implied "when click Configure button ... then show ... field". 
            // It doesn't explicitly mention fetching existing config for campaign, but standard practice is to try.
            // I will assume standard pattern applies if endpoint exists, otherwise just default state.
            // Given the prompt instruction "when input data from all input field then click Save... then post data", 
            // and the fact it's a "campagin", it might be a one-off create action? 
            // However, this page is "configure-page", which implies persistent configuration.
            // I'll skip fetching config details for now as strictly not requested, but I'll set defaults.

          } catch (err) {
            console.error(err)
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
      const authToken = getCookie("authToken")
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

  // --- Campaign Handlers ---
  const handleAddContentVariable = () => {
    setContentVariables([...contentVariables, { serial: "", value: "" }])
  }

  const handleContentVariableChange = (index: number, field: keyof ContentVariable, val: string) => {
    const newVars = [...contentVariables]
    newVars[index][field] = val
    setContentVariables(newVars)
  }

  const fetchContacts = async (searchTerm: string = "") => {
    try {
      const authToken = getCookie("authToken")
      const params = searchTerm ? { name: searchTerm } : {}
      const res = await axios.get<Contact[]>(`${BASE_URL}/campaign/whatsapp/list/contacts`, {
        headers: { Authorization: `Bearer ${authToken}` },
        params
      })
      setContacts(res.data)
    } catch (err) {
      console.error("Failed to fetch contacts", err)
    }
  }

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      if (isWhatsappCampaign && contactFilterType === "selected") {
        fetchContacts(contactSearchTerm)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [contactSearchTerm, isWhatsappCampaign, contactFilterType])




  // Final Save/Update Handler
  const handleSaveConfiguration = async () => {
    setError("")

    if (!isCvFormatter && !isGdpr && !isAwr && !isSkillSearch && !isWhatsappCampaign) {
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
      const authToken = getCookie("authToken")
      let response

      if (isAwr) {
        const payload = {
          platform_uid: platformUid,
          selected_status_ids: awrSelectedStatusIds,
          selected_payment_types: awrSelectedPaymentTypes,
          placement_started_before_days: Number(awrPlacementDays)
        }

        if (isUpdateMode) {
          response = await axios.patch(`${BASE_URL}/awr/config/details`, payload, {
            headers: { Authorization: `Bearer ${authToken}` }
          })
        } else {
          response = await axios.post(`${BASE_URL}/awr/config/`, payload, {
            headers: { Authorization: `Bearer ${authToken}` }
          })
        }

      } else if (isGdpr) {
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

      } else if (isSkillSearch) {
        const payload = {
          platform_uid: platformUid,
          search_radius_km: Number(searchRadiusKm),
          candidate_status_ids: selectedCandidateStatusIds,
          jobad_status_for_skill_search: jobAdStatusForSkillSearch,
          minimum_skill_match_percentage: Number(minSkillMatchPercentage),
          consider_employment_history: considerEmploymentHistory === "true",
          process_cv_for_skills: processCvForSkills === "true",
          max_candidates_per_job: Number(maxCandidatesPerJob),
          auto_apply_matched_candidates: autoApplyMatchedCandidates === "true",
          auto_apply_status: Number(autoApplyStatus),
          send_whatsapp_notifications: sendWhatsappNotifications === "true",
        }

        if (isUpdateMode) {
          response = await axios.patch(`${BASE_URL}/skill_search/config/details`, payload, {
            headers: { Authorization: `Bearer ${authToken}` }
          })
        } else {
          response = await axios.post(`${BASE_URL}/skill_search/config/`, payload, {
            headers: { Authorization: `Bearer ${authToken}` }
          })
        }

      } else if (isWhatsappCampaign) {
        const payload = {
          platform_uid: platformUid,
          campaign_title: campaignTitle,
          twilio_content_sid: twilioContentSid,
          content_variables: contentVariables,
          contact_filter_type: contactFilterType,
          selected_contact_ids: selectedContactIds,
          schedule_type: scheduleType,
          chatbot_template: chatbotTemplate,
          from_phone_number: waFromPhoneNumber,
          scheduled_at: scheduledAt
        }

        response = await axios.post(`${BASE_URL}/campaign/whatsapp/config/`, payload, {
          headers: { Authorization: `Bearer ${authToken}` }
        })

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
        <div className="flex items-center gap-6 mb-2">
          <button onClick={() => router.back()} className="h-8 w-8 -ml-2 cursor-pointer rounded-full transition-all duration-300 hover:scale-125">
            <ArrowLeft className="h-8 w-8" />
          </button>
          <h1 className="text-3xl font-bold text-foreground">Configure – {featureName || "Loading..."}</h1>
        </div>
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

              {/* Skill Search Specific Fields (Moved to General Settings) */}
              {isSkillSearch && (
                <>
                  {/* Search Radius Km */}
                  <div className="space-y-2">
                    <Label>Search Radius Km</Label>
                    <Select value={searchRadiusKm} onValueChange={handleSelectChange(setSearchRadiusKm)}>
                      <SelectTrigger><SelectValue placeholder="Select radius" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                        {SEARCH_RADIUS_OPTIONS.map(opt => (
                          <SelectItem key={opt} value={String(opt)}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Candidate Status Ids */}
                  <div className="space-y-2">
                    <Label>Candidate Status Ids</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedCandidateStatusIds.map((id) => {
                        const status = candidateStatusOptions.find(opt => opt.id === id)
                        return (
                          <div key={id} className="bg-primary/10 text-primary dark:text-white dark:border border-white text-sm px-3 py-1 rounded-full flex items-center gap-1 border border-primary/20">
                            {status ? status.name : id}
                            <X className="h-3 w-3 cursor-pointer hover:text-primary/70 dark:hover:text-white/70" onClick={() => setSelectedCandidateStatusIds(prev => prev.filter(item => item !== id))} />
                          </div>
                        )
                      })}
                    </div>
                    <Select onValueChange={(val) => {
                      const id = Number(val)
                      if (!selectedCandidateStatusIds.includes(id)) {
                        setSelectedCandidateStatusIds([...selectedCandidateStatusIds, id])
                      }
                    }} value="">
                      <SelectTrigger><SelectValue placeholder="Select status to add" /></SelectTrigger>
                      <SelectContent>
                        {candidateStatusOptions.filter(opt => !selectedCandidateStatusIds.includes(opt.id)).map(opt => (
                          <SelectItem key={opt.id} value={String(opt.id)}>{opt.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Job Ad Status for Skill Search */}
                  <div className="space-y-2">
                    <Label>Job Ad Status</Label>
                    <Select value={jobAdStatusForSkillSearch} onValueChange={handleSelectChange(setJobAdStatusForSkillSearch)}>
                      <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Current">Current</SelectItem>
                        <SelectItem value="Expired">Expired</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Minimum Skill Match Percentage */}
                  <div className="space-y-2">
                    <Label>Minimum Skill Match Percentage</Label>
                    <Select value={minSkillMatchPercentage} onValueChange={handleSelectChange(setMinSkillMatchPercentage)}>
                      <SelectTrigger><SelectValue placeholder="Select percentage" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                        {MIN_SKILL_MATCH_OPTIONS.map(opt => (
                          <SelectItem key={opt.value} value={String(opt.value)}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Consider Employment History */}
                  <div className="space-y-3 pt-2">
                    <Label>Consider Employment History?</Label>
                    <RadioGroup value={considerEmploymentHistory} onValueChange={setConsiderEmploymentHistory} className="flex gap-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="ceh-yes" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="ceh-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="ceh-no" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="ceh-no">No</Label></div>
                    </RadioGroup>
                  </div>

                  {/* Process CV for Skills */}
                  <div className="space-y-3 pt-2">
                    <Label>Process cv for skills?</Label>
                    <RadioGroup value={processCvForSkills} onValueChange={setProcessCvForSkills} className="flex gap-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="pcs-yes" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="pcs-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="pcs-no" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="pcs-no">No</Label></div>
                    </RadioGroup>
                  </div>

                  {/* Max Candidates Per Job */}
                  <div className="space-y-2">
                    <Label>Max Candidates Per Job</Label>
                    <Input type="number" value={maxCandidatesPerJob} onChange={(e) => setMaxCandidatesPerJob(e.target.value)} className="bg-background" />
                  </div>

                  {/* Auto Apply Matched Candidates */}
                  <div className="space-y-3 pt-2">
                    <Label>Auto apply matched candidates?</Label>
                    <RadioGroup value={autoApplyMatchedCandidates} onValueChange={setAutoApplyMatchedCandidates} className="flex gap-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="aamc-yes" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="aamc-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="aamc-no" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="aamc-no">No</Label></div>
                    </RadioGroup>
                  </div>

                  {/* Auto Apply Status */}
                  <div className="space-y-2">
                    <Label>Auto Apply Status</Label>
                    <Select value={autoApplyStatus} onValueChange={handleSelectChange(setAutoApplyStatus)}>
                      <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                        {statusOptions.map(s => (<SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Send Whatsapp Notifications */}
                  <div className="space-y-3 pt-2">
                    <Label>Send whatsapp notifications?</Label>
                    <RadioGroup value={sendWhatsappNotifications} onValueChange={setSendWhatsappNotifications} className="flex gap-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="swn-yes" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="swn-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="swn-no" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="swn-no">No</Label></div>
                    </RadioGroup>
                  </div>
                </>
              )}

              {/* WhatsApp Campaign Specific Fields */}
              {isWhatsappCampaign && (
                <>
                  <div className="space-y-2">
                    <Label>Campaign Title</Label>
                    <Input value={campaignTitle} onChange={(e) => setCampaignTitle(e.target.value)} placeholder="Type title" className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label>Twilio Content Sid</Label>
                    <Input value={twilioContentSid} onChange={(e) => setTwilioContentSid(e.target.value)} placeholder="Type SID" className="bg-background" />
                  </div>

                  {/* Content Variables */}
                  <div className="space-y-2 border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label>Content variables</Label>
                      <Button variant="outline" size="sm" onClick={handleAddContentVariable} className="gap-1 bg-primary hover:bg-primary/90 cursor-pointer dark:border-white"><Plus className="h-4 w-4" /> Add</Button>
                    </div>
                    <div className="space-y-3">
                      {contentVariables.map((v, idx) => (
                        <div key={idx} className="flex gap-2 items-end">
                          <div className="space-y-1 flex-1">
                            <Label className="text-xs text-muted-foreground">Serial</Label>
                            <Select value={v.serial} onValueChange={(val) => handleContentVariableChange(idx, 'serial', val)}>
                              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                              <SelectContent>
                                {SERIAL_OPTIONS.map(opt => (
                                  <SelectItem key={opt.value} value={opt.label}>{opt.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1 flex-[2]">
                            <Label className="text-xs text-muted-foreground">Value</Label>
                            <Input value={v.value} onChange={(e) => handleContentVariableChange(idx, 'value', e.target.value)} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Contact filter type</Label>
                    <Select value={contactFilterType} onValueChange={handleSelectChange(setContactFilterType)}>
                      <SelectTrigger><SelectValue placeholder="Select filter type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                        <SelectItem value="selected">selected</SelectItem>
                        <SelectItem value="all">all</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {contactFilterType === "selected" && (
                    <div className="space-y-2" ref={contactDropdownRef}>
                      <Label>Selected contact ids</Label>
                      {/* Display Selected Tags (Click to open) */}
                      <div
                        className="flex flex-wrap gap-2 mb-2 bg-background border p-2 rounded-md min-h-[40px] cursor-pointer"
                        onClick={() => setIsContactDropdownOpen(true)}
                      >
                        {selectedContactIds.length === 0 && (
                          <span className="text-muted-foreground text-sm my-auto pl-1">Select contacts...</span>
                        )}
                        {selectedContactIds.map(id => {
                          const contact = contacts.find(c => c.id === id)

                          let label = String(id)
                          if (contact) {
                            const nameParts = [contact.first_name, contact.last_name].filter(n => n && n.trim())
                            const finalNameStr = nameParts.length > 0 ? `(${nameParts.join(" ")})` : ""
                            label = contact.phone ? `${contact.phone} ${finalNameStr}`.trim() : (finalNameStr || "Not found")
                          }

                          return (
                            <div key={id} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs flex items-center gap-1 border border-primary/20">
                              <span>{label}</span>
                              <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={(e) => {
                                e.stopPropagation() // Prevent reopening if clicking close
                                setSelectedContactIds(prev => prev.filter(pid => pid !== id))
                              }} />
                            </div>
                          )
                        })}
                      </div>

                      {/* Searchable Dropdown area - Conditional Render */}
                      {isContactDropdownOpen && (
                        <div className="relative">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search contacts..."
                              className="pl-8 bg-background"
                              value={contactSearchTerm}
                              onChange={(e) => setContactSearchTerm(e.target.value)}
                              autoFocus
                            />
                          </div>
                          <div className="max-h-[200px] overflow-y-auto border rounded-md mt-1 bg-background shadow-md absolute w-full z-10">
                            {contacts.length === 0 ? (
                              <div className="p-2 text-sm text-muted-foreground text-center">No contacts found</div>
                            ) : (
                              contacts.map(contact => {
                                const isSelected = selectedContactIds.includes(contact.id)

                                const nameParts = [contact.first_name, contact.last_name].filter(n => n && n.trim())
                                const finalNameStr = nameParts.length > 0 ? `(${nameParts.join(" ")})` : ""

                                const displayText = contact.phone ? `${contact.phone} ${finalNameStr}`.trim() : (finalNameStr || "Not found")

                                return (
                                  <div
                                    key={contact.id}
                                    className={`p-2 text-sm cursor-pointer hover:bg-muted flex items-center justify-between ${isSelected ? "bg-muted/50" : ""}`}
                                    onClick={() => {
                                      if (!isSelected) {
                                        setSelectedContactIds([...selectedContactIds, contact.id])
                                      } else {
                                        setSelectedContactIds(selectedContactIds.filter(id => id !== contact.id))
                                      }
                                    }}
                                  >
                                    <span>{displayText}</span>
                                    <div className="text-xs text-muted-foreground">{contact.first_name || ""} {contact.last_name || ""}</div>
                                    {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                                  </div>
                                )
                              })
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Schedule type</Label>
                    <Select value={scheduleType} onValueChange={handleSelectChange(setScheduleType)}>
                      <SelectTrigger><SelectValue placeholder="Select schedule type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                        <SelectItem value="now">now</SelectItem>
                        <SelectItem value="scheduled">scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {scheduleType === "scheduled" && (
                    <div className="space-y-2">
                      <Label>Scheduled at</Label>
                      <Input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} className="bg-background" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Chatbot template</Label>
                    <Select value={chatbotTemplate} onValueChange={handleSelectChange(setChatbotTemplate)}>
                      <SelectTrigger><SelectValue placeholder="Select template" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                        <SelectItem value="ai_call">ai_call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>From Phone Number</Label>
                    <Input value={waFromPhoneNumber} onChange={(e) => setWaFromPhoneNumber(e.target.value)} placeholder="Type phone number" className="bg-background" />
                  </div>
                </>
              )}

              {/* Phone Number (Hide for CV Formatter & GDPR & AWR & Skill Search) */}
              {!isCvFormatter && !isGdpr && !isAwr && !isSkillSearch && !isWhatsappCampaign && (

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

              {/* AWR Specific Fields */}
              {isAwr && (
                <>
                  {/* Selected Status Ids */}
                  <div className="space-y-2">
                    <Label>Selected Status Ids</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {awrSelectedStatusIds.map((id) => {
                        const status = awrStatusOptions.find(opt => opt.id === id)
                        return (
                          <div key={id} className="bg-primary/10 text-primary dark:text-white dark:border border-white text-sm px-3 py-1 rounded-full flex items-center gap-1 border border-primary/20">
                            {status ? status.name : id}
                            <X className="h-3 w-3 cursor-pointer hover:text-primary/70 dark:hover:text-white/70" onClick={() => setAwrSelectedStatusIds(prev => prev.filter(item => item !== id))} />
                          </div>
                        )
                      })}
                    </div>
                    <Select onValueChange={(val) => {
                      const id = Number(val)
                      if (!awrSelectedStatusIds.includes(id)) {
                        setAwrSelectedStatusIds([...awrSelectedStatusIds, id])
                      }
                    }} value="">
                      <SelectTrigger>
                        <SelectValue placeholder="Select status to add" />
                      </SelectTrigger>
                      <SelectContent>
                        {awrStatusOptions.filter(opt => !awrSelectedStatusIds.includes(opt.id)).map(opt => (
                          <SelectItem key={opt.id} value={String(opt.id)}>{opt.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Selected Payment Types */}
                  <div className="space-y-2">
                    <Label>Selected Payment Types</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {awrSelectedPaymentTypes.map((type) => (
                        <div key={type} className="bg-primary/10 text-primary dark:text-white dark:border border-white text-sm px-3 py-1 rounded-full flex items-center gap-1 border border-primary/20">
                          {type}
                          <X className="h-3 w-3 cursor-pointer hover:text-primary/70 dark:hover:text-white/70" onClick={() => setAwrSelectedPaymentTypes(prev => prev.filter(item => item !== type))} />
                        </div>
                      ))}
                    </div>
                    <Select onValueChange={(val) => {
                      if (!awrSelectedPaymentTypes.includes(val)) {
                        setAwrSelectedPaymentTypes([...awrSelectedPaymentTypes, val])
                      }
                    }} value="">
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment type to add" />
                      </SelectTrigger>
                      <SelectContent>
                        {awrPaymentTypeOptions.filter(opt => !awrSelectedPaymentTypes.includes(opt.name)).map(opt => (
                          <SelectItem key={opt.name} value={opt.name}>{opt.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Placement Started Before Days */}
                  <div className="space-y-2">
                    <Label>Placement Started Before Days</Label>
                    <Select value={awrPlacementDays} onValueChange={handleSelectChange(setAwrPlacementDays)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_CLEAR_" className="text-muted-foreground font-medium">Remove Selection</SelectItem>
                        {AWR_PLACEMENT_DAYS_OPTIONS.map(opt => (
                          <SelectItem key={opt.value} value={String(opt.value)}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
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
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="app-yes" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="app-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="app-no" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="app-no">No</Label></div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Label>Should use last placement date</Label>
                    <RadioGroup value={gdprShouldUseLastPlacementDate} onValueChange={setGdprShouldUseLastPlacementDate} className="flex gap-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="place-yes" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="place-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="place-no" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="place-no">No</Label></div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Label>Should use last note creatation date</Label>
                    <RadioGroup value={gdprShouldUseLastNoteCreatationDate} onValueChange={setGdprShouldUseLastNoteCreatationDate} className="flex gap-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="note-yes" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="note-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="note-no" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="note-no">No</Label></div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Label>Should use activity creation date</Label>
                    <RadioGroup value={gdprShouldUseActivityCreationDate} onValueChange={setGdprShouldUseActivityCreationDate} className="flex gap-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="act-yes" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="act-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="act-no" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="act-no">No</Label></div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Label>Should use candidate update date</Label>
                    <RadioGroup value={gdprShouldUseCandidateUpdateDate} onValueChange={setGdprShouldUseCandidateUpdateDate} className="flex gap-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="cand-yes" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="cand-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="cand-no" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="cand-no">No</Label></div>
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

              {/* Existing Interview Fields (Calls, Voice ID) - Hide if CV Formatter or Message or GDPR or Skill Search */}
              {!isCvFormatter && !isMessage && !isGdpr && !isAwr && !isSkillSearch && !isWhatsappCampaign && (
                <>
                  <div className="space-y-2">
                    <Label>ElevenLabs Voice ID (Optional)</Label>
                    <Input value={voiceId} onChange={(e) => setVoiceId(e.target.value)} placeholder="Enter Voice ID" className="bg-background" />
                  </div>
                  <div className="space-y-3 pt-2">
                    <Label>End call if primary answer is negative?</Label>
                    <RadioGroup value={endCallNegative} onValueChange={setEndCallNegative} className="flex gap-4">
                      <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="ec-yes" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="ec-yes">Yes</Label></div>
                      <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="ec-no" className="dark:text-white dark:bg-white dark:hover:text-white dark:hover:bg-white dark:hover:text-white" /><Label htmlFor="ec-no">No</Label></div>
                    </RadioGroup>
                  </div>
                </>
              )}

            </div>
          </Card>

          {/* Automation Logic Card - Hide for CV Formatter & GDPR */}
          {/* Interview Questions - Moved to Left Column */}
          {!isCvFormatter && !isGdpr && !isAwr && !isSkillSearch && !isWhatsappCampaign && (

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
                <Button onClick={handleAddQuestion} variant="default" className="bg-white border border-black text-black inline-block mt-4 pb-7 cursor-pointer">Add More Question</Button>
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
        ) : isAwr ? (
          // AWR - Empty Right Column (or we can add instructions/branding if needed)
          null
        ) : isSkillSearch ? (
          // Skill Search - Empty Right Column
          null
        ) : isWhatsappCampaign ? (
          // Campaign - Empty Right Column
          null
        ) : (

          /* Automation Logic - Moved to Right Column */
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

      {/* Bottom Save Bar */}
      <div className="mt-8 flex justify-center gap-4">
        <Button
          size="lg"
          onClick={handleSaveConfiguration}
          disabled={isSaving}
          className="bg-primary hover:bg-primary/90 min-w-[200px] cursor-pointer dark:border-white"
        >
          {isSaving ? (isUpdateMode ? "Updating..." : "Saving...") : (isWhatsappCampaign ? "Create" : (isUpdateMode ? "Update Configure" : "Save Configure"))}
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
