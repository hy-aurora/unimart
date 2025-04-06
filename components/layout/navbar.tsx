"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Menu, ShoppingBag, User, X, Heart, Bell, Settings, LogOut, ShoppingCart, Home, Book, Ruler, Info, Phone, ChevronDown, Search } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SearchInput } from "@/components/ui/search-input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { useIsMobile } from "@/hooks/use-mobile"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationOpen, setNotificationOpen] = useState(false)
  const isMobile = useIsMobile()

  // Mock counts
  const cartCount = 3
  const wishlistCount = 5
  const notificationCount = 2

  // Mock notifications
  const notifications = [
    { id: 1, title: "Order Shipped", content: "Your order #12345 has been shipped", time: "10 minutes ago", read: false },
    { id: 2, title: "Sale Alert", content: "25% off on school uniforms this week!", time: "2 hours ago", read: false },
    { id: 3, title: "New Arrival", content: "Check out our new PE Kit collection", time: "Yesterday", read: true },
    { id: 4, title: "Order Delivered", content: "Your order #12340 has been delivered", time: "3 days ago", read: true },
  ]

  const handleSearch = useCallback((value: string) => {
    console.log("Searching for:", value)
    // Here you would typically initiate a search or navigation
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm transition-all">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden relative z-50">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-lg font-bold text-primary dark:text-primary">
                UniMart
              </Link>
              <div className="space-y-3">
                <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-2">CATEGORIES</p>
                  <div className="pl-2 space-y-2">
                    <Link href="/catalog/uniforms" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                      Uniforms
                    </Link>
                    <Link href="/catalog/accessories" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                      Accessories
                    </Link>
                    <Link href="/catalog/shoes" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                      Shoes
                    </Link>
                    <Link href="/catalog/sports" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                      Sports Gear
                    </Link>
                    <Link href="/catalog/supplies" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                      School Supplies
                    </Link>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-2">BRANDS</p>
                  <div className="pl-2 space-y-2">
                    <Link href="/brands/nike" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                      Nike
                    </Link>
                    <Link href="/brands/adidas" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                      Adidas
                    </Link>
                    <Link href="/brands/clarks" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                      Clarks
                    </Link>
                    <Link href="/brands/trutex" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                      Trutex
                    </Link>
                    <Link href="/brands/all" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                      View All Brands
                    </Link>
                  </div>
                </div>
                <Link href="/schools" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <Book className="h-4 w-4" />
                  Schools
                </Link>
                <Link href="/catalog" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <ShoppingCart className="h-4 w-4" />
                  Catalog
                </Link>

                <Link href="/about" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <Info className="h-4 w-4" />
                  About Us
                </Link>
                <Link href="/contact" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  Contact
                </Link>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex flex-col gap-3">
                  <Link href="/profile" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                  <Link href="/cart" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
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
          <span className="text-xl font-bold text-primary dark:text-primary">UniMart</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1 px-2 hover:bg-accent/50">
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
          <Link href="/about" className="font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
            About Us
          </Link>
          <Link href="/contact" className="font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
            Contact
          </Link>
        </nav>
        <div className="flex items-center ml-auto gap-2">
          {isSearchOpen ? (
            <div className="flex items-center w-full md:w-auto absolute left-0 right-0 px-4 md:relative md:px-0 bg-background dark:bg-background z-20">
              <SearchInput 
                placeholder="Search products, schools..."
                className="w-full md:w-[300px]" 
                onSearch={handleSearch}
                autoFocus
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="ml-2">
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
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative" 
            onClick={() => setNotificationOpen(true)}
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                {notificationCount}
              </Badge>
            )}
          </Button>
          
          <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Notifications</DialogTitle>
              </DialogHeader>
              <div className="max-h-[60vh] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`py-3 px-1 ${notification.read ? '' : 'bg-muted/50'}`}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm mt-1">{notification.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <DialogFooter className="sm:justify-between">
                <Button variant="ghost" size="sm">Mark all as read</Button>
                <Button variant="outline" size="sm">View all</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
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
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary">
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