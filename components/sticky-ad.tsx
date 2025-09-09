"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import AdBanner from "@/components/ad-banner"

export default function StickyAd() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isClosed) {
        setIsVisible(true)
      }
    }, 3000) // Show after 3 seconds

    return () => clearTimeout(timer)
  }, [isClosed])

  const handleClose = () => {
    setIsVisible(false)
    setIsClosed(true)
  }

  if (!isVisible || isClosed) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-background border border-border rounded-lg shadow-lg p-4 max-w-sm">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Close ad"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="mt-2">
        <AdBanner size="rectangle" className="mx-auto" />
      </div>
    </div>
  )
}
