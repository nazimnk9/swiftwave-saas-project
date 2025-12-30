"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ArrowLeft } from "lucide-react"
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
    call_sid?: string // Optional as it might not be in SMS
    application_id: number
    candidate_id: number
    candidate_name: string
    candidate_email: string
    candidate_phone: string
    job_id?: number // Optional
    jobad_id?: number // From SMS payload
    conversation_text?: string // Optional
    conversation_json: ChatMessage[]
    message_count: number
    started_at?: string | null // Optional
    ended_at?: string | null // Optional
    organization: number
    interview?: number
    type?: string // Added to distinguish
}

interface ReportItem {
    id: number
    interview_data?: InterviewData // For call reports structure if nested
    // Union for state simplicity, but I'll normalize to a common shape in state
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
    uid: string
    candidate_id: number
    candidate_name: string
    candidate_email: string
    candidate_phone: string
    started_at: string | null
    ai_decision: string
    status: string
    updated_at: string
    conversation_json: ChatMessage[]
}

interface ReportResponse {
    count: number
    next: string | null
    previous: string | null
    results: any[] // generic to handle both
}

interface AppFeature {
    uid: string
    name: string
}

interface ReportPageProps {
    featureUid?: string // Optional for backward compatibility if needed, but used for dynamic page
}

export default function ReportPage({ featureUid }: ReportPageProps) {
    const [isChatModalOpen, setIsChatModalOpen] = useState(false)
    const [reports, setReports] = useState<DisplayReportItem[]>([])
    const [loading, setLoading] = useState(true)
    const [featureName, setFeatureName] = useState("WhatsApp Recruiter Report") // Default or loaded
    const [loadingFeature, setLoadingFeature] = useState(true) // New state to wait for feature name
    const [selectedInterview, setSelectedInterview] = useState<DisplayReportItem | null>(null)
    const router = useRouter()

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

                const nameLower = currentFeatureName.toLowerCase()
                const isSms = nameLower.includes("sms")
                const isWhatsApp = nameLower.includes("what's app") || nameLower.includes("whatsapp")
                const isMessage = isSms || isWhatsApp

                if (isMessage) {
                    // Message Report Fetch (SMS or WhatsApp)
                    const typeParam = isWhatsApp ? "AI_WHATSAPP" : "AI_SMS"

                    const reportsRes = await axios.get<ReportResponse>(`${BASE_URL}/interview/message/report`, {
                        headers,
                        params: { type: typeParam }
                    })

                    // Normalize Message data to display structure
                    // Payload: { results: [ { id, uid, candidate_phone, conversation_json: [{sender, message, timestamp}], ... } ] }
                    const normalized = reportsRes.data.results.map((item: any) => ({
                        id: item.id,
                        uid: item.uid,
                        candidate_id: item.candidate_id,
                        candidate_name: item.candidate_name,
                        candidate_email: item.candidate_email,
                        candidate_phone: item.candidate_phone,
                        started_at: item.created_at, // Use created_at as start time proxy if started_at missing
                        status: item.status,
                        ai_decision: item.ai_decision,
                        updated_at: item.updated_at,
                        conversation_json: item.conversation_json ? item.conversation_json.map((msg: any) => ({
                            role: msg.sender === "ai" ? "assistant" : "user", // or "candidate" -> "user" to match UI style
                            content: msg.message,
                            timestamp: msg.timestamp
                        })) : []
                    }))
                    setReports(normalized)

                } else {
                    // Call Report Fetch (Previous Logic)
                    const reportsRes = await axios.get<ReportResponse>(`${BASE_URL}/interview/`, { headers })

                    // Normalize Call data
                    // Previous code assumed results wrapped in interview_data based on mapping
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
                    View automation interview records and chat histories for the {featureName}.
                </p>
            </div>

            {/* Report Table */}
            <div className="border rounded-lg bg-card overflow-hidden mb-8">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={10} className="text-center h-24">Loading records...</TableCell>
                            </TableRow>
                        ) : reports.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={10} className="text-center h-24">No records found.</TableCell>
                            </TableRow>
                        ) : (
                            reports.map((row) => (
                                <TableRow key={row.id} className="hover:bg-muted/30">
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

            {/* Chat History Modal */}
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
        </div>
    )
}
