"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ExternalLink } from "lucide-react"
import AdBanner from "@/components/ad-banner"

interface Article {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: {
    name: string
  }
}

interface NewsGridProps {
  category?: string
  searchQuery?: string
}

export default function NewsGrid({ category, searchQuery }: NewsGridProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setArticles([])
    setPage(1)
    fetchNews(1)
  }, [category, searchQuery])

  const fetchNews = async (pageNum = 1) => {
    try {
      setLoading(true)
      let apiUrl = `/api/news?page=${pageNum}&pageSize=12`

      if (category) {
        apiUrl += `&category=${category}`
      }

      if (searchQuery) {
        apiUrl += `&q=${encodeURIComponent(searchQuery)}`
      }

      const response = await fetch(apiUrl)
      const data = await response.json()

      if (data.articles) {
        if (pageNum === 1) {
          setArticles(data.articles)
        } else {
          setArticles((prev) => [...prev, ...data.articles])
        }

        setHasMore(data.articles.length === 12)
      }
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchNews(nextPage)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading && articles.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden animate-pulse">
            <div className="h-48 bg-muted" />
            <CardHeader className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">
          {searchQuery
            ? `Search Results`
            : category
              ? `${category.charAt(0).toUpperCase() + category.slice(1)} News`
              : "Latest News"}
        </h2>
        <Badge variant="outline" className="text-muted-foreground">
          {articles.length} articles
        </Badge>
      </div>

      {articles.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {searchQuery ? `No articles found for "${searchQuery}"` : "No articles available at the moment"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <div key={`${article.url}-${index}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={
                    article.urlToImage ||
                    `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(article.title) || "/placeholder.svg"}`
                  }
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{article.source.name}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(article.publishedAt)}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-card-foreground line-clamp-2 text-balance">
                  {article.title}
                </h3>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground line-clamp-3 text-pretty">{article.description}</p>

                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href={article.url} target="_blank" rel="noopener noreferrer">
                    Read More
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {(index + 1) % 4 === 0 && index < articles.length - 1 && (
              <div className="flex justify-center my-8">
                <AdBanner size="rectangle" />
              </div>
            )}
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <Button onClick={loadMore} disabled={loading} className="bg-accent hover:bg-accent/90">
            {loading ? "Loading..." : "Load More Articles"}
          </Button>
        </div>
      )}
    </div>
  )
}
