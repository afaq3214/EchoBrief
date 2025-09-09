import { type NextRequest, NextResponse } from "next/server"

const NEWS_API_KEY = "5f6ec7ad26704b0e89bc8fcb4319ec14"
const NEWS_API_BASE_URL = "https://newsapi.org/v2"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  // Get query parameters
  const category = searchParams.get("category") || "general"
  const page = Number.parseInt(searchParams.get("page") || "1")
  const pageSize = Number.parseInt(searchParams.get("pageSize") || "20")
  const q = searchParams.get("q") || ""

  try {
    // Build the API URL
    let apiUrl = `${NEWS_API_BASE_URL}/top-headlines?apiKey=${NEWS_API_KEY}&pageSize=${pageSize}&page=${page}`

    // Add category if specified
    if (category && category !== "general") {
      apiUrl += `&category=${category}`
    }

    // Add search query if specified
    if (q) {
      apiUrl += `&q=${encodeURIComponent(q)}`
    }

    // Add country parameter for better results
    apiUrl += "&country=us"

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "EchoBrief/1.0",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`)
    }

    const data = await response.json()

    // Filter out articles with missing essential data
    const filteredArticles =
      data.articles?.filter(
        (article: any) =>
          article.title &&
          article.description &&
          article.url &&
          article.title !== "[Removed]" &&
          article.description !== "[Removed]",
      ) || []

    return NextResponse.json({
      ...data,
      articles: filteredArticles,
    })
  } catch (error) {
    console.error("Error fetching news:", error)

    return NextResponse.json(
      {
        error: "Failed to fetch news",
        articles: [],
        totalResults: 0,
      },
      { status: 500 },
    )
  }
}
