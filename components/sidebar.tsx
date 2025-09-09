"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock } from "lucide-react"
import AdBanner from "@/components/ad-banner"

interface TrendingArticle {
  title: string
  url: string
  publishedAt: string
  source: {
    name: string
  }
}

export default function Sidebar() {
  const [trendingArticles, setTrendingArticles] = useState<TrendingArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch("/api/news?category=technology&pageSize=5")
        const data = await response.json()

        if (data.articles) {
          setTrendingArticles(data.articles)
        }
      } catch (error) {
        console.error("Error fetching trending news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrending()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const categories = [
    { name: "World", count: 245 },
    { name: "Technology", count: 189 },
    { name: "Business", count: 156 },
    { name: "Sports", count: 134 },
    { name: "Health", count: 98 },
    { name: "Science", count: 87 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <AdBanner size="rectangle" />
      </div>

      {/* Trending Articles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-accent" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
                </div>
              ))
            : trendingArticles.map((article, index) => (
                <div key={index} className="space-y-2 pb-4 border-b border-border last:border-b-0 last:pb-0">
                  <Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-accent transition-colors"
                  >
                    <h4 className="text-sm font-medium line-clamp-2 text-balance">{article.title}</h4>
                  </Link>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.source.name}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(article.publishedAt)}
                    </div>
                  </div>
                </div>
              ))}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <AdBanner size="rectangle" />
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/${category.name.toLowerCase()}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="text-sm font-medium">{category.name}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>

      <div className="hidden xl:flex justify-center">
        <AdBanner size="skyscraper" />
      </div>

      <div className="flex justify-center">
        <AdBanner size="rectangle" />
      </div>
    </div>
  )
}
