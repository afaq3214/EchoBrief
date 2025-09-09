"use client"

interface AdBannerProps {
  size: "leaderboard" | "rectangle" | "skyscraper" | "mobile-banner"
  className?: string
}

export default function AdBanner({ size, className = "" }: AdBannerProps) {
  const adSizes = {
    leaderboard: { width: 728, height: 90, label: "728x90" },
    rectangle: { width: 300, height: 250, label: "300x250" },
    skyscraper: { width: 160, height: 600, label: "160x600" },
    "mobile-banner": { width: 320, height: 50, label: "320x50" },
  }

  const { width, height, label } = adSizes[size]

  return (
    <div
      className={`bg-muted/30 border border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center ${className}`}
      style={{ width: `${width}px`, height: `${height}px`, maxWidth: "100%" }}
    >
      <div className="text-center">
        <div className="text-xs text-muted-foreground mb-1">Advertisement</div>
        <div className="text-xs font-mono text-muted-foreground/70">
          Google AdSense
          <br />
          {label}
        </div>
      </div>
    </div>
  )
}
