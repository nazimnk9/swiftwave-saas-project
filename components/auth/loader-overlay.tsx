import { Spinner } from "@/components/ui/spinner"

interface LoaderOverlayProps {
  isLoading: boolean
  message?: string
}

export function LoaderOverlay({ isLoading, message = "Processing..." }: LoaderOverlayProps) {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
      <div className="bg-card border-2 border-border rounded-lg p-8 shadow-2xl flex flex-col items-center gap-4">
        <Spinner className="w-8 h-8 text-primary dark:text-white" />
        <p className="text-foreground font-medium">{message}</p>
      </div>
    </div>
  )
}
