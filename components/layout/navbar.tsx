"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Search, ShoppingBag, User, X, Heart, Bell, Settings, LogOut, ShoppingCart, Home, Book, Ruler, Info, Phone, ChevronDown } from "lucide-react"
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

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Mock counts
  const cartCount = 3
  const wishlistCount = 5
  const notificationCount = 2

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
              <div className="space-y-3">
                <Link href="/" className="flex items-center gap-2 text-sm font-medium">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-2">CATEGORIES</p>
                  <div className="pl-2 space-y-2">
                    <Link href="/catalog/uniforms" className="flex items-center gap-2 text-sm font-medium">
                      Uniforms
                    </Link>
                    <Link href="/catalog/accessories" className="flex items-center gap-2 text-sm font-medium">
                      Accessories
                    </Link>
                    <Link href="/catalog/shoes" className="flex items-center gap-2 text-sm font-medium">
                      Shoes
                    </Link>
                    <Link href="/catalog/sports" className="flex items-center gap-2 text-sm font-medium">
                      Sports Gear
                    </Link>
                    <Link href="/catalog/supplies" className="flex items-center gap-2 text-sm font-medium">
                      School Supplies
                    </Link>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-2">BRANDS</p>
                  <div className="pl-2 space-y-2">
                    <Link href="/brands/nike" className="flex items-center gap-2 text-sm font-medium">
                      Nike
                    </Link>
                    <Link href="/brands/adidas" className="flex items-center gap-2 text-sm font-medium">
                      Adidas
                    </Link>
                    <Link href="/brands/clarks" className="flex items-center gap-2 text-sm font-medium">
                      Clarks
                    </Link>
                    <Link href="/brands/trutex" className="flex items-center gap-2 text-sm font-medium">
                      Trutex
                    </Link>
                    <Link href="/brands/all" className="flex items-center gap-2 text-sm font-medium">
                      View All Brands
                    </Link>
                  </div>
                </div>
                <Link href="/schools" className="flex items-center gap-2 text-sm font-medium">
                  <Book className="h-4 w-4" />
                  Schools
                </Link>
                <Link href="/catalog" className="flex items-center gap-2 text-sm font-medium">
                  <ShoppingCart className="h-4 w-4" />
                  Catalog
                </Link>
                <Link href="/custom-sizing" className="flex items-center gap-2 text-sm font-medium">
                  <Ruler className="h-4 w-4" />
                  Custom Sizing
                </Link>
                <Link href="/about" className="flex items-center gap-2 text-sm font-medium">
                  <Info className="h-4 w-4" />
                  About Us
                </Link>
                <Link href="/contact" className="flex items-center gap-2 text-sm font-medium">
                  <Phone className="h-4 w-4" />
                  Contact
                </Link>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex flex-col gap-3">
                  <Link href="/profile" className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                  <Link href="/profile/wishlist" className="flex items-center gap-2 text-sm font-medium">
                    <Heart className="h-4 w-4" />
                    Wishlist
                    {wishlistCount > 0 && (
                      <Badge className="ml-auto bg-indigo-600">{wishlistCount}</Badge>
                    )}
                  </Link>
                  <Link href="/cart" className="flex items-center gap-2 text-sm font-medium">
                    <ShoppingBag className="h-4 w-4" />
                    Cart
                    {cartCount > 0 && (
                      <Badge className="ml-auto bg-indigo-600">{cartCount}</Badge>
                    )}
                  </Link>
                </div>
              </div>
              <div className="flex items-center mt-4 justify-between">
                <ThemeToggle />
                <Button variant="outline" size="sm">Sign Out</Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 hidden md:flex">
          <span className="text-xl font-bold text-indigo-900 dark:text-indigo-400">UniMart</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1 px-2">
                <span>Categories</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/catalog/uniforms">Uniforms</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/catalog/accessories">Accessories</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/catalog/shoes">Shoes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/catalog/sports">Sports Gear</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/catalog/supplies">School Supplies</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/schools" className="font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
            Schools
          </Link>
          <Link href="/catalog" className="font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
            Catalog
          </Link>
          <Link href="/custom-sizing" className="font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
            Custom Sizing
          </Link>
          <Link href="/about" className="font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
            About Us
          </Link>
          <Link href="/contact" className="font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
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
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/notifications">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-indigo-600">
                  {notificationCount}
                </Badge>
              )}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm font-medium">My Account</div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/orders" className="cursor-pointer flex items-center">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  My Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/wishlist" className="cursor-pointer flex items-center">
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                  {wishlistCount > 0 && (
                    <Badge className="ml-auto bg-indigo-600">{wishlistCount}</Badge>
                  )}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile/settings" className="cursor-pointer flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/profile/wishlist">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-indigo-600">
                  {wishlistCount}
                </Badge>
              )}
            </Link>
          </Button>
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