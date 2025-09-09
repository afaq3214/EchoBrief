import { Suspense } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import NewsGrid from "@/components/news-grid"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-4 flex justify-center">
        <AdBanner size="leaderboard" className="hidden md:block" />
        <AdBanner size="mobile-banner" className="md:hidden" />
      </div>

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<HeroSkeleton />}>
          <HeroSection />
        </Suspense>

        <div className="flex justify-center my-8">
          <AdBanner size="rectangle" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
          <div className="lg:col-span-3">
            <Suspense fallback={<NewsGridSkeleton />}>
              <NewsGrid />
            </Suspense>
          </div>

          <aside className="lg:col-span-1">
            <Suspense fallback={<SidebarSkeleton />}>
              <Sidebar />
            </Suspense>
          </aside>
        </div>

        <div className="flex justify-center mt-12 mb-8">
          <AdBanner size="rectangle" />
        </div>
      </main>

      <Footer />
    </div>
  )
}

function HeroSkeleton() {
  return (
    <div className="relative h-96 rounded-lg overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  )
}

function NewsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="w-full h-48 rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  )
}

function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-32" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  )
}
