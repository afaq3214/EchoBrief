import { Suspense } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import NewsGrid from "@/components/news-grid"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"
import { Skeleton } from "@/components/ui/skeleton"

const validCategories = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = params.category

  if (!validCategories.includes(category)) {
    return {
      title: "Category Not Found - EchoBrief",
    }
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

  return {
    title: `${categoryName} News - EchoBrief`,
    description: `Latest ${categoryName.toLowerCase()} news and articles. Stay updated with breaking news and trending stories in ${categoryName.toLowerCase()}.`,
    keywords: `${categoryName.toLowerCase()} news, ${categoryName.toLowerCase()} articles, latest ${categoryName.toLowerCase()} news`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = params.category

  if (!validCategories.includes(category)) {
    notFound()
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-4 flex justify-center">
        <AdBanner size="leaderboard" className="hidden md:block" />
        <AdBanner size="mobile-banner" className="md:hidden" />
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{categoryName} News</h1>
          <p className="text-muted-foreground">
            Latest {categoryName.toLowerCase()} news and articles from around the world
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <AdBanner size="rectangle" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Suspense fallback={<NewsGridSkeleton />}>
              <NewsGrid category={category} />
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

export function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }))
}
