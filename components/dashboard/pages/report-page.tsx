"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { LoaderOverlay } from "@/components/auth/loader-overlay"

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
    call_sid: string
    application_id: number
    candidate_id: number
    candidate_name: string
    candidate_email: string
    candidate_phone: string
    job_id: number
    conversation_text: string
    conversation_json: ChatMessage[]
    message_count: number
    started_at: string | null
    ended_at: string | null
    organization: number
    interview: number
}

interface ReportItem {
    id: number
    interview_data: InterviewData
    status: string
    organization: number
}

interface ReportResponse {
    count: number
    next: string | null
    previous: string | null
    results: ReportItem[]
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
    const [reports, setReports] = useState<ReportItem[]>([])
    const [loading, setLoading] = useState(true)
    const [featureName, setFeatureName] = useState("WhatsApp Recruiter Report") // Default or loaded
    const [selectedInterview, setSelectedInterview] = useState<InterviewData | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const authToken = localStorage.getItem("authToken")
                const headers = { Authorization: `Bearer ${authToken}` }

                // Fetch Feature Name if UID is provided
                if (featureUid) {
                    const featuresRes = await axios.get<{ results: AppFeature[] }>(`${BASE_URL}/subscription/features/`, { headers })
                    const currentFeature = featuresRes.data.results.find(f => f.uid === featureUid)
                    if (currentFeature) {
                        setFeatureName(currentFeature.name)
                    }
                }

                // Fetch Reports
                // The user said "table data show from get api "BASE_URL}/interview/" in "app/report/[uid]/page.tsx" page"
                // and structure matches ReportResponse
                const reportsRes = await axios.get<ReportResponse>(`${BASE_URL}/interview/`, { headers })
                setReports(reportsRes.data.results)

            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [featureUid])

    const handleViewChat = (interview: InterviewData) => {
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
            <div className="border rounded-lg bg-card overflow-hidden">
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
                            <TableHead className="font-semibold text-foreground">Updated At</TableHead>
                            <TableHead className="font-semibold text-foreground">Chat History</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center h-24">Loading records...</TableCell>
                            </TableRow>
                        ) : reports.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center h-24">No records found.</TableCell>
                            </TableRow>
                        ) : (
                            reports.map((row) => (
                                <TableRow key={row.id} className="hover:bg-muted/30">
                                    <TableCell className="text-sm">{row.interview_data.uid}</TableCell>
                                    <TableCell className="text-sm">{row.interview_data.candidate_id}</TableCell>
                                    <TableCell className="text-sm">{row.interview_data.candidate_name}</TableCell>
                                    <TableCell className="text-sm">{row.interview_data.candidate_email}</TableCell>
                                    <TableCell className="text-sm">{row.interview_data.candidate_phone}</TableCell>
                                    <TableCell className="text-sm">{formatDate(row.interview_data.started_at)}</TableCell>
                                    <TableCell className="text-sm">{row.status}</TableCell>
                                    <TableCell className="text-sm">{formatDate(row.interview_data.updated_at)}</TableCell>
                                    <TableCell className="text-sm">
                                        <Button
                                            variant="link"
                                            className="text-primary hover:underline p-0 h-auto cursor-pointer"
                                            onClick={() => handleViewChat(row.interview_data)}
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

            {/* Chat History Modal */}
            <Dialog open={isChatModalOpen} onOpenChange={setIsChatModalOpen}>
                <DialogContent className="max-w-xl p-0 overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-xl font-semibold text-foreground">Chat History</h2>
                        <button
                            onClick={() => setIsChatModalOpen(false)}
                            className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
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
