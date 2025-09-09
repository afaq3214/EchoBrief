"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

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

export default function HeroSection() {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedNews = async () => {
      try {
        const response = await fetch("/api/news?category=general&pageSize=1")
        const data = await response.json()

        if (data.articles && data.articles.length > 0) {
          setFeaturedArticle(data.articles[0])
        }
      } catch (error) {
        console.error("Error fetching featured news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedNews()
  }, [])

  if (loading) {
    return (
      <section className="relative h-96 rounded-lg overflow-hidden bg-muted animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="h-4 bg-white/20 rounded mb-4 w-24" />
          <div className="h-8 bg-white/20 rounded mb-4" />
          <div className="h-4 bg-white/20 rounded w-3/4" />
        </div>
      </section>
    )
  }

  if (!featuredArticle) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section className="relative h-96 rounded-lg overflow-hidden">
      <Image
        src={featuredArticle.urlToImage || "/placeholder.svg?height=400&width=800&query=breaking news"}
        alt={featuredArticle.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-8 left-8 right-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            Breaking News
          </Badge>
          <div className="flex items-center gap-1 text-sm text-white/80">
            <Clock className="w-4 h-4" />
            {formatDate(featuredArticle.publishedAt)}
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance leading-tight">{featuredArticle.title}</h1>

        <p className="text-lg text-white/90 mb-6 text-pretty line-clamp-2">{featuredArticle.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-white/80">Source: {featuredArticle.source.name}</span>

          <Button asChild className="bg-accent hover:bg-accent/90">
            <Link href={featuredArticle.url} target="_blank" rel="noopener noreferrer">
              Read Full Story
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
