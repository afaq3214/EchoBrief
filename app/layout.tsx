import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "NewsHub - Latest News & Blog Articles",
  description:
    "Stay updated with the latest news, trending stories, and insightful blog articles from around the world. Your trusted source for breaking news and analysis.",
  keywords: "news, blog, articles, breaking news, latest news, world news, trending stories",
  authors: [{ name: "NewsHub Team" }],
  creator: "NewsHub",
  publisher: "NewsHub",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://newshub.com",
    title: "NewsHub - Latest News & Blog Articles",
    description:
      "Stay updated with the latest news, trending stories, and insightful blog articles from around the world.",
    siteName: "NewsHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "NewsHub - Latest News & Blog Articles",
    description:
      "Stay updated with the latest news, trending stories, and insightful blog articles from around the world.",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXXX" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "NewsHub",
              url: "https://newshub.com",
              logo: "https://newshub.com/logo.png",
              sameAs: ["https://twitter.com/newshub", "https://facebook.com/newshub"],
            }),
          }}
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1520724689015577"
     crossOrigin="anonymous"></script>
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
