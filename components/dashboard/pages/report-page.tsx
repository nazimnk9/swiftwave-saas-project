"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ArrowLeft, FileText } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "@/components/auth/loader-overlay"
import { useRouter } from "next/navigation"

// Interfaces based on user provided JSON structure
interface ChatMessage {
    role: string
    content: string
    timestamp: string
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

interface ReportItem {
    id: number
    interview_data?: InterviewData
    uid?: string
    candidate_name?: string
    candidate_email?: string
    candidate_phone?: string
    conversation_json?: any[]
    status: string
    ai_decision: string
    updated_at: string
}

// Internal normalized interface for display
interface DisplayReportItem {
    id: number
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

export default function ReportPage({ featureUid }: ReportPageProps) {
    const [isChatModalOpen, setIsChatModalOpen] = useState(false)
    const [reports, setReports] = useState<DisplayReportItem[]>([])
    const [loading, setLoading] = useState(true)
    const [featureName, setFeatureName] = useState("Reports")
    const [loadingFeature, setLoadingFeature] = useState(true)
    const [selectedInterview, setSelectedInterview] = useState<DisplayReportItem | null>(null)
    const router = useRouter()

    const nameLower = featureName ? featureName.toLowerCase() : ""
    const isCvFormatter = nameLower.includes("cv") && nameLower.includes("formatter")
    const isSms = nameLower.includes("sms")
    const isWhatsApp = nameLower.includes("what's app") || nameLower.includes("whatsapp")
    const isMessage = isSms || isWhatsApp

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const authToken = localStorage.getItem("authToken")
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

                } else if (name.includes("sms") || (name.includes("what's app") || name.includes("whatsapp"))) {
                    const isWA = name.includes("what's app") || name.includes("whatsapp")
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
                        uid: item.interview_data.uid,
                        candidate_id: item.interview_data.candidate_id,
                        candidate_name: item.interview_data.candidate_name,
                        candidate_email: item.interview_data.candidate_email,
                        candidate_phone: item.interview_data.candidate_phone,
                        started_at: item.interview_data.started_at,
                        status: item.status,
                        ai_decision: item.ai_decision,
                        updated_at: item.interview_data.updated_at,
                        conversation_json: item.interview_data.conversation_json || []
                    }))
                    setReports(normalized)
                }

            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
                setLoadingFeature(false)
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

    return (
        <div className="min-h-screen bg-background p-8">
            <LoaderOverlay isLoading={loading} message="Loading reports..." />
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Report - {featureName}</h1>
                <p className="text-muted-foreground">
                    View {isCvFormatter ? "formatted CVs" : "automation interview records"} for the {featureName}.
                </p>
            </div>

            {/* Report Table */}
            <div className="border rounded-lg bg-card overflow-hidden mb-8">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            {isCvFormatter ? (
                                <>
                                    <TableHead className="font-semibold text-foreground">Attachment ID</TableHead>
                                    <TableHead className="font-semibold text-foreground">Candidate ID</TableHead>
                                    <TableHead className="font-semibold text-foreground">PDF File With Logo</TableHead>
                                    <TableHead className="font-semibold text-foreground">PDF File Without Logo</TableHead>
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
                                </>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={isCvFormatter ? 4 : 10} className="text-center h-24">Loading records...</TableCell>
                            </TableRow>
                        ) : reports.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={isCvFormatter ? 4 : 10} className="text-center h-24">No records found.</TableCell>
                            </TableRow>
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
            {!isCvFormatter && (
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
                                    <div key={idx} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
                                        <div
                                            className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed shadow-sm ${msg.role === "assistant"
                                                ? "bg-[#ebf0f5] text-foreground rounded-tl-none border border-slate-200"
                                                : "bg-[#5fa0d6] text-white rounded-tr-none"
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-muted-foreground">No chat history available.</p>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}
