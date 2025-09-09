import { Suspense } from "react"
import Header from "@/components/header"
import NewsGrid from "@/components/news-grid"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return {
    title: query ? `Search results for "${query}" - NewsHub` : "Search - NewsHub",
    description: query
      ? `Search results for "${query}". Find the latest news and articles related to your search.`
      : "Search for news articles and stories on NewsHub.",
    keywords: `search, news search, ${query}`,
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-4 flex justify-center">
        <AdBanner size="leaderboard" className="hidden md:block" />
        <AdBanner size="mobile-banner" className="md:hidden" />
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {query ? `Search results for "${query}"` : "Search News"}
          </h1>
          <p className="text-muted-foreground">
            {query ? `Find the latest news and articles related to "${query}"` : "Search for news articles and stories"}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <AdBanner size="rectangle" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Suspense fallback={<NewsGridSkeleton />}>
              <NewsGrid searchQuery={query} />
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
