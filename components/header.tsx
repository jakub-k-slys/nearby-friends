"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-md">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="GeoConnect Logo"
                width={32}
                height={32}
                className="bg-primary text-primary-foreground"
              />
            </div>
            <span className="font-bold">GeoConnect</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-primary">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
            How It Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary">
            Pricing
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm">
            Log In
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container md:hidden py-4 pb-6">
          <nav className="flex flex-col gap-4">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" size="sm" className="w-full">
                Log In
              </Button>
              <Button size="sm" className="w-full">
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
