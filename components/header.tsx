"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Search, ShoppingBag, User, X, Heart } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Mock cart count
  const cartCount = 3

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-lg font-bold text-indigo-900 dark:text-indigo-400">
                UniMart
              </Link>
              <Link href="/schools" className="text-sm font-medium">
                Schools
              </Link>
              <Link href="/catalog" className="text-sm font-medium">
                Catalog
              </Link>
              <Link href="/custom-sizing" className="text-sm font-medium">
                Custom Sizing
              </Link>
              <Link href="/about" className="text-sm font-medium">
                About Us
              </Link>
              <Link href="/contact" className="text-sm font-medium">
                Contact
              </Link>
              <div className="flex items-center mt-4">
                <ThemeToggle />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 hidden md:flex">
          <span className="text-xl font-bold text-indigo-900 dark:text-indigo-400">UniMart</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/schools"
            className="font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Schools
          </Link>
          <Link
            href="/catalog"
            className="font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Catalog
          </Link>
          <Link
            href="/custom-sizing"
            className="font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Custom Sizing
          </Link>
          <Link
            href="/about"
            className="font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center ml-auto gap-2">
          {isSearchOpen ? (
            <div className="flex items-center">
              <Input type="search" placeholder="Search..." className="w-[200px] md:w-[300px]" autoFocus />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/orders" className="cursor-pointer">
                  My Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/wishlist" className="cursor-pointer">
                  Wishlist
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile/settings" className="cursor-pointer">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-indigo-600">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}