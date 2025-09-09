"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const newsCategories = [
  { name: "Home", slug: "", href: "/" },
  { name: "Business", slug: "business", href: "/category/business" },
  { name: "Entertainment", slug: "entertainment", href: "/category/entertainment" },
  { name: "General", slug: "general", href: "/category/general" },
  { name: "Health", slug: "health", href: "/category/health" },
  { name: "Science", slug: "science", href: "/category/science" },
  { name: "Sports", slug: "sports", href: "/category/sports" },
  { name: "Technology", slug: "technology", href: "/category/technology" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold text-primary">NewsHub</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {newsCategories.map((category) => (
              <Link
                key={category.slug || "home"}
                href={category.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActiveLink(category.href) ? "text-accent border-b-2 border-accent pb-1" : "text-foreground"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {newsCategories.map((category) => (
                <Link
                  key={category.slug || "home"}
                  href={category.href}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    isActiveLink(category.href) ? "text-accent" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            <form onSubmit={handleSearch} className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
