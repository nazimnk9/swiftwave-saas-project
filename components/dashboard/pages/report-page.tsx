"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ArrowLeft, FileText, Trash2, Eye } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "@/components/auth/loader-overlay"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToastNotification } from "@/components/auth/toast-provider"

// Interfaces based on user provided JSON structure
interface ChatMessage {
    sender?: string
    role?: string
    message?: string
    content?: string
    timestamp?: string
}

interface InterviewData {
    id: number
    uid: string
    created_at: string
    updated_at: string
    call_sid?: string
    application_id: number
    candidate_id: number
    candidate_name: string
    candidate_email: string
    candidate_phone: string
    job_id?: number
    jobad_id?: number
    conversation_text?: string
    conversation_json: ChatMessage[]
    message_count: number
    started_at?: string | null
    ended_at?: string | null
    organization: number
    interview?: number
    type?: string
}

// WhatsApp Campaign Types
interface WhatsAppCampaign {
    id: number
    uid: string
    campaign_title: string
    created_at: string
    status: string
    schedule_type: string
    scheduled_at: string | null
    total_contacts: number
    messages_sent: number
}

interface WhatsAppCampaignReport {
    id: number
    uid: string
    created_at: string
    contact_name: string
    contact_email: string
    contact_phone: string
    message_status: string
    conversation_json: ChatMessage[]
    ai_decision?: string
}

// Internal normalized interface for display
interface DisplayReportItem {
    id: number
    reports_uid?: string // Added for Recall API
    uid: string // Used for Interview UID or Attachment ID sometimes if needed, mostly Interview UID
    candidate_id: number
    candidate_name: string
    candidate_email: string
    candidate_phone: string
    started_at: string | null
    ai_decision: string
    status: string
    updated_at: string
    conversation_json: ChatMessage[]
    // CV Formatter Extra Fields
    attachment_id?: string
    pdf_file_with_logo?: string
    pdf_file_without_logo?: string
    // AWR Extra Fields
    placement_id?: number
    contact_email?: string
    // Skill Search Extra Fields
    job_ad_id?: number
    match_percentage?: number
    match_source?: string
    application_id?: number | null
    application_created?: boolean
    // Campaign Extra Fields - we will use a separate state given structure differnce, but can fallback
}

interface ReportResponse {
    count: number
    next: string | null
    previous: string | null
    results: any[]
}

interface AppFeature {
    uid: string
    name: string
}

interface ReportPageProps {
    featureUid?: string
}

const RETRY_OPTIONS = Array.from({ length: 20 }, (_, i) => ({
    label: `${(i + 1) * 5} person`,
    value: (i + 1) * 5
}))

export default function ReportPage({ featureUid }: ReportPageProps) {
    const { toast } = useToastNotification()
    const [isChatModalOpen, setIsChatModalOpen] = useState(false)
    const [isRecallModalOpen, setIsRecallModalOpen] = useState(false)
    const [recallLimit, setRecallLimit] = useState("5")
    const [isRecalling, setIsRecalling] = useState(false)

    // Main Reports State
    const [reports, setReports] = useState<DisplayReportItem[]>([])

    // Campaign Specific State
    const [campaigns, setCampaigns] = useState<WhatsAppCampaign[]>([])
    const [campaignReports, setCampaignReports] = useState<WhatsAppCampaignReport[]>([])
    const [isCampaignReportModalOpen, setIsCampaignReportModalOpen] = useState(false)
    const [campaignToDelete, setCampaignToDelete] = useState<WhatsAppCampaign | null>(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const [loading, setLoading] = useState(true)
    const [featureName, setFeatureName] = useState("Reports")
    const [selectedInterview, setSelectedInterview] = useState<DisplayReportItem | null>(null)
    const router = useRouter()

    const nameLower = featureName ? featureName.toLowerCase() : ""
    const isCvFormatter = nameLower.includes("cv") && nameLower.includes("formatter")
    const isGdpr = nameLower.includes("gdpr")
    const isSms = nameLower.includes("sms")
    const isWhatsApp = nameLower.includes("recruiter") || nameLower.includes("recruiter")
    const isAwr = nameLower.includes("awr") && (nameLower.includes("complience") || nameLower.includes("compliance"))
    const isSkillSearch = nameLower.includes("skill") && nameLower.includes("search")
    const isWhatsappCampaign = nameLower.includes("campaign") && nameLower.includes("whatsapp")
    const isMessage = isSms || isWhatsApp

    const fetchCampaigns = async () => {
        try {
            setLoading(true)
            const authToken = getCookie("authToken")
            const headers = { Authorization: `Bearer ${authToken}` }
            const res = await axios.get<ReportResponse>(`${BASE_URL}/campaign/whatsapp/config/`, { headers })
            setCampaigns(res.data.results)
        } catch (error) {
            console.error("Error fetching campaigns:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const authToken = getCookie("authToken")
                const headers = { Authorization: `Bearer ${authToken}` }

                let currentFeatureName = ""

                // Fetch Feature Name if UID is provided
                if (featureUid) {
                    const featuresRes = await axios.get<{ results: AppFeature[] }>(`${BASE_URL}/subscription/features/`, { headers })
                    const currentFeature = featuresRes.data.results.find(f => f.uid === featureUid)
                    if (currentFeature) {
                        setFeatureName(currentFeature.name)
                        currentFeatureName = currentFeature.name
                    }
                }

                const name = currentFeatureName.toLowerCase()

                if (name.includes("campaign") && name.includes("whatsapp")) {
                    // Campaign Fetch Logic
                    const res = await axios.get<ReportResponse>(`${BASE_URL}/campaign/whatsapp/config/`, { headers })
                    setCampaigns(res.data.results)
                    setLoading(false)
                    return // Exit early as structure is different
                }

                if (name.includes("cv") && name.includes("formatter")) {
                    // CV Formatter Report Fetch
                    const reportsRes = await axios.get<ReportResponse>(`${BASE_URL}/cv_formatter/reports/`, { headers })

                    // Normalize CV data
                    const normalized = reportsRes.data.results.map((item: any) => ({
                        id: item.id,
                        uid: item.uid || "", // Might not be present or needed for CV
                        attachment_id: item.attachment_id,
                        candidate_id: item.candidate_id,
                        pdf_file_with_logo: item.pdf_file_with_logo,
                        pdf_file_without_logo: item.pdf_file_without_logo,
                        // Default other fields to empty/dash as they are not used in CV view
                        candidate_name: "-",
                        candidate_email: "-",
                        candidate_phone: "-",
                        started_at: null,
                        ai_decision: "-",
                        status: "-",
                        updated_at: "", // or item.created_at if available
                        conversation_json: []
                    }))
                    setReports(normalized)

                } else if (name.includes("awr") && (name.includes("complience") || name.includes("compliance"))) {
                    // AWR Report Fetch
                    const reportsRes = await axios.get<ReportResponse>(`${BASE_URL}/awr/reports/`, { headers })

                    const normalized = reportsRes.data.results.map((item: any) => ({
                        id: item.id,
                        uid: item.uid,
                        placement_id: item.placement_id,
                        contact_email: item.contact_email,
                        // Default others
                        candidate_id: 0,
                        candidate_name: "-",
                        candidate_email: "-",
                        candidate_phone: "-",
                        started_at: item.created_at,
                        status: "-",
                        ai_decision: "-",
                        updated_at: item.updated_at,
                        conversation_json: []
                    }))
                    setReports(normalized)

                } else if (name.includes("skill") && name.includes("search")) {
                    // Skill Search Report Fetch
                    const reportsRes = await axios.get<ReportResponse>(`${BASE_URL}/skill_search/reports/`, { headers })

                    const normalized = reportsRes.data.results.map((item: any) => ({
                        id: item.id,
                        uid: "", // Not used
                        candidate_id: item.candidate_id,
                        job_ad_id: item.job_ad_id,
                        match_percentage: item.match_percentage,
                        match_source: item.match_source,
                        application_id: item.application_id,
                        application_created: item.application_created,
                        // Default others
                        candidate_name: "-",
                        candidate_email: "-",
                        candidate_phone: "-",
                        started_at: item.created_at,
                        status: "-",
                        ai_decision: "-",
                        updated_at: "",
                        conversation_json: []
                    }))
                    setReports(normalized)

                } else if (name.includes("gdpr")) {
                    // GDPR Report Fetch
                    const reportsRes = await axios.get<ReportResponse>(`${BASE_URL}/gdpr/reports/`, { headers })

                    const normalized = reportsRes.data.results.map((item: any) => ({
                        id: item.id,
                        uid: item.uid || "",
                        candidate_id: item.candidate_id,
                        candidate_email: item.email, // Mapping 'email' from API to 'candidate_email'
                        status: item.status,
                        updated_at: item.updated_at,
                        // Defaulting others
                        candidate_name: "-",
                        candidate_phone: "-",
                        started_at: item.created_at,
                        ai_decision: item.ai_dicision || "-", // Typo in API response "ai_dicision" handled
                        conversation_json: item.conversation_json ? item.conversation_json.map((msg: any) => ({
                            role: msg.sender === "ai" ? "assistant" : "user",
                            content: msg.message,
                            timestamp: "" // Timestamp not provided in example JSON
                        })) : []
                    }))
                    setReports(normalized)

                } else if (name.includes("sms") || (name.includes("recruiter") || name.includes("recruiter"))) {
                    const isWA = name.includes("recruiter") || name.includes("recruiter")
                    const typeParam = isWA ? "AI_WHATSAPP" : "AI_SMS"

                    const reportsRes = await axios.get<ReportResponse>(`${BASE_URL}/interview/message/report`, {
                        headers,
                        params: { type: typeParam }
                    })

                    const normalized = reportsRes.data.results.map((item: any) => ({
                        id: item.id,
                        uid: item.uid,
                        candidate_id: item.candidate_id,
                        candidate_name: item.candidate_name,
                        candidate_email: item.candidate_email,
                        candidate_phone: item.candidate_phone,
                        started_at: item.created_at,
                        status: item.status,
                        ai_decision: item.ai_decision,
                        updated_at: item.updated_at,
                        conversation_json: item.conversation_json ? item.conversation_json.map((msg: any) => ({
                            role: msg.sender === "ai" ? "assistant" : "user",
                            content: msg.message,
                            timestamp: msg.timestamp
                        })) : []
                    }))
                    setReports(normalized)

                } else {
                    // Call Interview
                    const reportsRes = await axios.get<ReportResponse>(`${BASE_URL}/interview/`, { headers })

                    const normalized = reportsRes.data.results.map((item: any) => ({
                        id: item.id,
                        reports_uid: item.uid,
                        uid: item.uid,
                        candidate_id: item.candidate_id,
                        candidate_name: item.candidate_name,
                        candidate_email: item.candidate_email,
                        candidate_phone: item.candidate_phone,
                        started_at: item.started_at,
                        status: item.status,
                        ai_decision: item.ai_decision,
                        updated_at: item.updated_at,
                        conversation_json: item.interview_data.conversation_json || []
                    }))
                    setReports(normalized)
                }

            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [featureUid])

    const handleViewChat = (interview: DisplayReportItem) => {
        setSelectedInterview(interview)
        setIsChatModalOpen(true)
    }

    const handleViewPdf = (url?: string) => {
        if (url) {
            window.open(url, '_blank')
        }
    }

    // Helper to safely format date
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "-"
        try {
            return new Date(dateString).toLocaleString()
        } catch (e) {
            return dateString
        }
    }

    const handleRecall = async () => {
        try {
            setIsRecalling(true)
            const authToken = getCookie("authToken")
            await axios.post(`${BASE_URL}/interview/retry/`, { limit: Number(recallLimit) }, {
                headers: { Authorization: `Bearer ${authToken}` }
            })
            toast({
                title: "Success",
                description: "Retry call process started successfully."
            })
            setIsRecallModalOpen(false)
        } catch (error) {
            console.error("Error retrying calls:", error)
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to initiate retry calls."
            })
        } finally {
            setIsRecalling(false)
        }
    }

    const handleSingleRecall = async (uid?: string) => {
        if (!uid) return
        try {
            setIsRecalling(true)
            const authToken = getCookie("authToken")
            await axios.post(`${BASE_URL}/interview/retry/${uid}`, {}, {
                headers: { Authorization: `Bearer ${authToken}` }
            })
            toast({
                title: "Success",
                description: "Recall initiated successfully."
            })
        } catch (error) {
            console.error("Error recalling interview:", error)
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to initiate recall."
            })
        } finally {
            setIsRecalling(false)
        }
    }

    // --- WhatsApp Campaign Handlers ---
    const handleDeleteClick = (campaign: WhatsAppCampaign) => {
        setCampaignToDelete(campaign)
        setIsDeleteModalOpen(true)
    }

    const confirmDelete = async () => {
        if (!campaignToDelete) return

        try {
            setIsRecalling(true) // Reusing loading state spinner
            const authToken = getCookie("authToken")
            await axios.delete(`${BASE_URL}/campaign/whatsapp/config/${campaignToDelete.uid}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            })

            toast({ title: "Success", description: "Campaign deleted successfully." })
            setCampaigns(campaigns.filter(c => c.uid !== campaignToDelete.uid))
            setIsDeleteModalOpen(false)
        } catch (err) {
            console.error("Delete failed", err)
            toast({ variant: "destructive", title: "Error", description: "Failed to delete campaign" })
        } finally {
            setIsRecalling(false)
        }
    }

    const handleViewCampaignReport = async (campaign: WhatsAppCampaign) => {
        try {
            setLoading(true)
            const authToken = getCookie("authToken")
            const res = await axios.get<ReportResponse>(`${BASE_URL}/campaign/whatsapp/reports/${campaign.uid}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            })

            // Normalize
            const reports = res.data.results.map((r: any) => ({
                id: r.id,
                uid: r.uid,
                created_at: r.created_at,
                contact_name: r.contact_name,
                contact_email: r.contact_email,
                contact_phone: r.contact_phone,
                message_status: r.message_status,
                // Handle sender 'ai' -> 'assistant', etc if needed, but simple map is fine
                conversation_json: r.conversation_json || [],
                ai_decision: r.ai_conversation_outcome
            }))

            setCampaignReports(reports)
            setIsCampaignReportModalOpen(true)
        } catch (err) {
            console.error("Fetch campaign report failed", err)
            toast({ variant: "destructive", title: "Error", description: "Failed to load campaign reports" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <LoaderOverlay isLoading={loading || isRecalling} message={isRecalling ? "Processing..." : "Loading records..."} />
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        {isWhatsappCampaign ? "Campaign List" : `Report - ${featureName}`}
                    </h1>
                    <p className="text-muted-foreground">
                        {isWhatsappCampaign
                            ? "Manage your WhatsApp campaigns."
                            : `View ${isCvFormatter ? "formatted CVs" : "automation interview records"} for the ${featureName}.`
                        }
                    </p>
                </div>
                {/* Retry Call Interview Button (Only for Call Interview) */}
                {!isCvFormatter && !isGdpr && !isAwr && !isSkillSearch && !isMessage && !isWhatsappCampaign && (
                    <Button
                        onClick={() => setIsRecallModalOpen(true)}
                        className="bg-primary hover:bg-primary/90 cursor-pointer"
                    >
                        Retry Call Interview
                    </Button>
                )}
            </div>

            {/* Report Table */}
            <div className="border rounded-lg bg-card overflow-hidden mb-8">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            {isWhatsappCampaign ? (
                                <>
                                    <TableHead className="font-semibold text-foreground">Campaign Title</TableHead>
                                    <TableHead className="font-semibold text-foreground">Status</TableHead>
                                    <TableHead className="font-semibold text-foreground">Schedule Type</TableHead>
                                    <TableHead className="font-semibold text-foreground">Created At</TableHead>
                                    <TableHead className="font-semibold text-foreground">Action</TableHead>
                                </>
                            ) : isCvFormatter ? (
                                <>
                                    <TableHead className="font-semibold text-foreground">Attachment ID</TableHead>
                                    <TableHead className="font-semibold text-foreground">Candidate ID</TableHead>
                                    <TableHead className="font-semibold text-foreground">PDF File With Logo</TableHead>
                                    <TableHead className="font-semibold text-foreground">PDF File Without Logo</TableHead>
                                </>
                            ) : isGdpr ? (
                                <>
                                    <TableHead className="font-semibold text-foreground">Candidate Email</TableHead>
                                    <TableHead className="font-semibold text-foreground">Candidate Id</TableHead>
                                    <TableHead className="font-semibold text-foreground">Status</TableHead>
                                    <TableHead className="font-semibold text-foreground">Chat History</TableHead>
                                </>
                            ) : isAwr ? (
                                <>
                                    <TableHead className="font-semibold text-foreground">Placement Id</TableHead>
                                    <TableHead className="font-semibold text-foreground">Client Email</TableHead>
                                </>
                            ) : isSkillSearch ? (
                                <>
                                    <TableHead className="font-semibold text-foreground">Candidate ID</TableHead>
                                    <TableHead className="font-semibold text-foreground">Job Ad ID</TableHead>
                                    <TableHead className="font-semibold text-foreground">Match Percentage</TableHead>
                                    <TableHead className="font-semibold text-foreground">Match Source</TableHead>
                                    <TableHead className="font-semibold text-foreground">Application ID</TableHead>
                                    <TableHead className="font-semibold text-foreground">Application Created</TableHead>
                                </>
                            ) : (
                                <>
                                    <TableHead className="font-semibold text-foreground">Interview ID</TableHead>
                                    <TableHead className="font-semibold text-foreground">Candidate ID</TableHead>
                                    <TableHead className="font-semibold text-foreground">Candidate Name</TableHead>
                                    <TableHead className="font-semibold text-foreground">Candidate Email</TableHead>
                                    <TableHead className="font-semibold text-foreground">Candidate Mobile</TableHead>
                                    <TableHead className="font-semibold text-foreground">First Message Sent At</TableHead>
                                    <TableHead className="font-semibold text-foreground">Status</TableHead>
                                    <TableHead className="font-semibold text-foreground">Ai Decision</TableHead>
                                    <TableHead className="font-semibold text-foreground">Updated At</TableHead>
                                    <TableHead className="font-semibold text-foreground">Chat History</TableHead>
                                    {!isMessage && <TableHead className="font-semibold text-foreground">Retry call Interview</TableHead>}
                                </>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={10} className="text-center h-24">Loading records...</TableCell>
                            </TableRow>
                        ) : (isWhatsappCampaign ? campaigns.length === 0 : reports.length === 0) ? (
                            <TableRow>
                                <TableCell colSpan={10} className="text-center h-24">No records found.</TableCell>
                            </TableRow>
                        ) : isWhatsappCampaign ? (
                            campaigns.map((row) => (
                                <TableRow key={row.id} className="hover:bg-muted/30">
                                    <TableCell>{row.campaign_title}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>{row.schedule_type}</TableCell>
                                    <TableCell>{formatDate(row.created_at)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button size="sm" variant="destructive" onClick={() => handleDeleteClick(row)} className="cursor-pointer">Delete</Button>
                                            <Button size="sm" variant="outline" onClick={() => handleViewCampaignReport(row)} className="cursor-pointer">Report</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            reports.map((row) => (
                                <TableRow key={row.id} className="hover:bg-muted/30">
                                    {isCvFormatter ? (
                                        <>
                                            <TableCell className="text-sm">{row.attachment_id}</TableCell>
                                            <TableCell className="text-sm">{row.candidate_id}</TableCell>
                                            <TableCell className="text-sm">
                                                {row.pdf_file_with_logo ? (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleViewPdf(row.pdf_file_with_logo)}
                                                        className="text-primary hover:text-primary/80 gap-2 cursor-pointer"
                                                    >
                                                        <FileText className="h-4 w-4" /> View
                                                    </Button>
                                                ) : "-"}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {row.pdf_file_without_logo ? (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleViewPdf(row.pdf_file_without_logo)}
                                                        className="text-primary hover:text-primary/80 gap-2 cursor-pointer"
                                                    >
                                                        <FileText className="h-4 w-4" /> View
                                                    </Button>
                                                ) : "-"}
                                            </TableCell>
                                        </>
                                    ) : isGdpr ? (
                                        <>
                                            <TableCell className="text-sm">{row.candidate_email}</TableCell>
                                            <TableCell className="text-sm">{row.candidate_id}</TableCell>
                                            <TableCell className="text-sm">{row.status}</TableCell>
                                            <TableCell className="text-sm">
                                                <Button
                                                    variant="link"
                                                    className="text-primary hover:underline p-0 h-auto cursor-pointer"
                                                    onClick={() => handleViewChat(row)}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </>
                                    ) : isAwr ? (
                                        <>
                                            <TableCell className="text-sm">{row.placement_id}</TableCell>
                                            <TableCell className="text-sm">{row.contact_email}</TableCell>
                                        </>
                                    ) : isSkillSearch ? (
                                        <>
                                            <TableCell className="text-sm">{row.candidate_id}</TableCell>
                                            <TableCell className="text-sm">{row.job_ad_id}</TableCell>
                                            <TableCell className="text-sm">{row.match_percentage}%</TableCell>
                                            <TableCell className="text-sm">{row.match_source}</TableCell>
                                            <TableCell className="text-sm">{row.application_id || "-"}</TableCell>
                                            <TableCell className="text-sm">
                                                {row.application_created ? (
                                                    <div className="flex justify-start text-green-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-start text-red-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                                    </div>
                                                )}
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell className="text-sm">{row.uid}</TableCell>
                                            <TableCell className="text-sm">{row.candidate_id}</TableCell>
                                            <TableCell className="text-sm">{row.candidate_name}</TableCell>
                                            <TableCell className="text-sm">{row.candidate_email}</TableCell>
                                            <TableCell className="text-sm">{row.candidate_phone}</TableCell>
                                            <TableCell className="text-sm">{formatDate(row.started_at)}</TableCell>
                                            <TableCell className="text-sm">{row.status}</TableCell>
                                            <TableCell className="text-sm">{row.ai_decision}</TableCell>
                                            <TableCell className="text-sm">{formatDate(row.updated_at)}</TableCell>
                                            <TableCell className="text-sm">
                                                <Button
                                                    variant="link"
                                                    className="text-primary hover:underline p-0 h-auto cursor-pointer"
                                                    onClick={() => handleViewChat(row)}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                            {!isMessage && (
                                                <TableCell className="text-sm">
                                                    <Button
                                                        size="sm"
                                                        variant="default"
                                                        className="cursor-pointer"
                                                        onClick={() => handleSingleRecall(row.reports_uid)}
                                                        disabled={isRecalling}
                                                    >
                                                        Recall
                                                    </Button>
                                                </TableCell>
                                            )}
                                        </>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Button
                variant="ghost"
                className="text-primary bg-primary/30 hover:bg-black hover:text-white mt-4 cursor-pointer"
                onClick={() => router.back()}
            >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
            </Button>

            {/* Chat History Modal - Only for Non-CV features */}
            {
                !isCvFormatter && (
                    <Dialog open={isChatModalOpen} onOpenChange={setIsChatModalOpen}>
                        <DialogContent className="max-w-xl p-0 overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h2 className="text-xl font-semibold text-foreground">Chat History</h2>
                                <button
                                    onClick={() => setIsChatModalOpen(false)}
                                    className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none cursor-pointer"
                                >
                                    <X className="h-5 w-5" />
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                                {selectedInterview?.conversation_json && selectedInterview.conversation_json.length > 0 ? (
                                    selectedInterview.conversation_json.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === "assistant" || msg.sender === "ai" ? "justify-start" : "justify-end"}`}>
                                            <div
                                                className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed shadow-sm ${msg.role === "assistant" || msg.sender === "ai"
                                                    ? "bg-[#ebf0f5] text-foreground rounded-tl-none border border-slate-200"
                                                    : "bg-[#5fa0d6] text-white rounded-tr-none"
                                                    }`}
                                            >
                                                {msg.content || msg.message}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-muted-foreground">No chat history available.</p>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                )
            }

            {/* Recall Modal */}
            <Dialog open={isRecallModalOpen} onOpenChange={setIsRecallModalOpen}>
                <DialogContent className="max-w-md">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-foreground">Recall</h2>
                        <button
                            onClick={() => setIsRecallModalOpen(false)}
                            className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none cursor-pointer"
                        >
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Select number of recently disconnected candidates to call</Label>
                            <Select value={recallLimit} onValueChange={setRecallLimit}>
                                <SelectTrigger className="w-full mt-1 h-8 text-xs pr-8">
                                    <SelectValue placeholder="Select count" />
                                </SelectTrigger>
                                <SelectContent>
                                    {RETRY_OPTIONS.map(opt => (
                                        <SelectItem key={opt.value} value={String(opt.value)}>{opt.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {recallLimit && (
                                <X
                                    className="absolute right-8 top-1/2 h-3.5 w-3.5 cursor-pointer text-muted-foreground hover:text-foreground z-10"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setRecallLimit("")
                                    }}
                                />
                            )}
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                onClick={handleRecall}
                                disabled={isRecalling}
                                className="bg-primary hover:bg-primary/90 cursor-pointer"
                            >
                                {isRecalling ? "Processing..." : "Recall"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="max-w-sm">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-semibold">Delete</h2>
                        <button onClick={() => setIsDeleteModalOpen(false)}><X className="h-5 w-5" /></button>
                    </div>
                    <p className="text-muted-foreground mb-6">Are you sure you want to delete this campaign? This action cannot be undone.</p>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Campaign Report Modal */}
            <Dialog open={isCampaignReportModalOpen} onOpenChange={setIsCampaignReportModalOpen}>
                <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col p-0">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-xl font-semibold">Campaign Reports</h2>
                        <button onClick={() => setIsCampaignReportModalOpen(false)}><X className="h-5 w-5" /></button>
                    </div>

                    <div className="p-4 overflow-y-auto flex-1 bg-muted/10">
                        {campaignReports.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                                <p>No reports found for this campaign.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                                {campaignReports.map(r => (
                                    <div key={r.id} className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-lg text-foreground">{r.contact_name}</span>
                                                <span className="text-sm text-muted-foreground">{r.contact_email}</span>
                                                <span className="text-xs text-muted-foreground mt-0.5">{r.contact_phone}</span>
                                            </div>
                                            <div className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize border ${r.message_status.toLowerCase() === 'sent' || r.message_status.toLowerCase() === 'delivered'
                                                    ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
                                                    : r.message_status.toLowerCase() === 'failed'
                                                        ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
                                                        : 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                                                }`}>
                                                {r.message_status}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 mt-4 pt-3 border-t">
                                            {r.ai_decision && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-muted-foreground">AI Outcome:</span>
                                                    <span className="font-medium text-foreground">{r.ai_decision}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-muted-foreground">Created:</span>
                                                <span className="text-foreground">{formatDate(r.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    )
}
