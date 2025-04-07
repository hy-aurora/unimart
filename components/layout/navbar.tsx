"use client";

import { useState, useCallback } from "react";
import NextLink from "next/link";
import {
  ShoppingBag,
  User,
  X,
  Bell,
  Settings,
  LogOut,
  ShoppingCart,
  Home,
  Book,
  Info,
  Phone,
  Search,
} from "lucide-react";
import { Authenticated, Unauthenticated } from "convex/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { ThemeToggle } from "@/components/theme-toggle";

// Mock Data & Navigation Links
const cartCount = 3;
const notificationCount = 2;
const notifications = [
  { id: 1, title: "Order Shipped", content: "Your order #12345 has been shipped", time: "10 minutes ago", read: false },
  { id: 2, title: "Sale Alert", content: "25% off on school uniforms this week!", time: "2 hours ago", read: false },
  { id: 3, title: "New Arrival", content: "Check out our new PE Kit collection", time: "Yesterday", read: true },
  { id: 4, title: "Order Delivered", content: "Your order #12340 has been delivered", time: "3 days ago", read: true },
];

const navLinks = [
  { href: "/schools", label: "Schools", icon: <Book className="h-5 w-5" /> },
  { href: "/catalog", label: "Catalog", icon: <ShoppingCart className="h-5 w-5" /> },
  { href: "/about", label: "About Us", icon: <Info className="h-5 w-5" /> },
  { href: "/contact", label: "Contact", icon: <Phone className="h-5 w-5" /> },
];

export default function SiteNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((value: string) => {
    console.log("Searching for:", value);
    // Implement your search logic here
    setIsSearchOpen(false);
  }, []);

  const closeMenu = useCallback(() => isMenuOpen && setIsMenuOpen(false), [isMenuOpen]);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm shadow-sm min-h-[70px] py-2"
    >
      {/* Mobile Header (visible on mobile only) */}
      <NavbarContent className="flex sm:hidden justify-between items-center">
        <div className="flex items-center gap-2">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
          <NavbarBrand>
            <Link href="/" as={NextLink} className="text-2xl font-bold text-primary tracking-tight">
              UniMart
            </Link>
          </NavbarBrand>
        </div>
        <Button as={NextLink} href="/cart" isIconOnly variant="light" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 && <Badge color="primary" size="sm" placement="top-right">{cartCount}</Badge>}
        </Button>
      </NavbarContent>

      {/* Desktop Header */}
      <NavbarContent className="hidden sm:flex">
        <NavbarBrand>
          <Link href="/" as={NextLink} className="text-2xl font-bold text-primary tracking-tight">
            UniMart
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navLinks.map((link) => (
          <NavbarItem key={link.href}>
            <Link
              href={link.href}
              as={NextLink}
              color="foreground"
              className="text-base font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Desktop Controls */}
      <NavbarContent justify="end" className="hidden sm:flex items-center gap-2">
        <Button isIconOnly variant="light" onClick={() => setIsSearchOpen(true)}>
          <Search className="h-5 w-5" />
        </Button>
        <ThemeToggle />
        <Button as={NextLink} href="/cart" isIconOnly variant="light" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 && <Badge color="primary" size="sm" placement="top-right">{cartCount}</Badge>}
        </Button>
        <Authenticated>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && <Badge color="primary" size="sm" placement="top-right">{notificationCount}</Badge>}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Notifications" className="w-80">
              <DropdownItem key="notification-title" className="font-semibold">
                Notifications
              </DropdownItem>
              <>
              {notifications.map((n) => (
                <DropdownItem key={n.id} className={!n.read ? "bg-default-100" : ""}>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{n.title}</span>
                      <span className="text-xs text-default-400">{n.time}</span>
                    </div>
                    <p className="text-sm">{n.content}</p>
                  </div>
                </DropdownItem>
              ))}
              </>
              <DropdownItem key="notification-actions" className="mt-2">
                <div className="flex justify-between">
                  <span className="text-sm">Mark all as read</span>
                  <span className="text-sm">View all</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <User className="h-5 w-5" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Menu">
              <DropdownItem key="account-title" className="font-semibold">
                My Account
              </DropdownItem>
              <DropdownItem key="profile" onClick={() => (window.location.href = "/profile")}>
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span>My Profile</span>
                </div>
              </DropdownItem>
              <DropdownItem key="orders" onClick={() => (window.location.href = "/profile/orders")}>
                <div className="flex items-center gap-2">
                  <ShoppingCart size={18} />
                  <span>My Orders</span>
                </div>
              </DropdownItem>
              <DropdownItem key="settings" onClick={() => (window.location.href = "/profile/settings")}>
                <div className="flex items-center gap-2">
                  <Settings size={18} />
                  <span>Settings</span>
                </div>
              </DropdownItem>
              <DropdownItem key="logout" className="text-danger" color="danger">
                <div className="flex items-center gap-2">
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Authenticated>
        <Unauthenticated>
          <Button as={NextLink} href="/auth" color="primary" variant="flat">
            Login
          </Button>
        </Unauthenticated>
      </NavbarContent>

      {/* Mobile Menu (slides in) */}
      <NavbarMenu className="pt-4 px-4">
        <div className="mb-6 mt-2">
          <input
            type="text"
            placeholder="Search products, schools..."
            className="w-full h-10 px-3 rounded-md border border-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
          />
        </div>
        <NavbarMenuItem>
          <Link href="/" as={NextLink} color="foreground" className="flex items-center gap-3 text-base" onClick={closeMenu}>
            <Home className="h-5 w-5" />
            Home
          </Link>
        </NavbarMenuItem>
        {navLinks.map((link) => (
          <NavbarMenuItem key={link.href}>
            <Link href={link.href} as={NextLink} color="foreground" className="flex items-center gap-3 text-base" onClick={closeMenu}>
              {link.icon}
              {link.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link href="/cart" as={NextLink} color="foreground" className="flex items-center justify-between gap-3 text-base" onClick={closeMenu}>
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5" />
              Cart
            </div>
            {cartCount > 0 && <Badge color="primary">{cartCount}</Badge>}
          </Link>
        </NavbarMenuItem>
        <Authenticated>
          <NavbarMenuItem>
            <Link href="/profile" as={NextLink} color="foreground" className="flex items-center gap-3 text-base" onClick={closeMenu}>
              <User className="h-5 w-5" />
              My Profile
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link color="danger" className="flex items-center gap-3 text-base" onClick={closeMenu}>
              <LogOut className="h-5 w-5" />
              Sign Out
            </Link>
          </NavbarMenuItem>
        </Authenticated>
        <Unauthenticated>
          <NavbarMenuItem className="mt-4">
            <Button as={NextLink} href="/auth" color="primary" variant="flat" className="w-full" size="lg" onClick={closeMenu}>
              Login
            </Button>
          </NavbarMenuItem>
        </Unauthenticated>
        <div className="mt-6">
          <ThemeToggle />
        </div>
      </NavbarMenu>

      {/* Search Modal using @heroui/react Modal */}
      <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
        <ModalContent>
          <ModalHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Search</h3>
              <Button isIconOnly variant="light" onClick={() => setIsSearchOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
          </ModalHeader>
          <ModalBody>
            <input
              type="text"
              placeholder="Search products, schools..."
              className="w-full h-12 px-4 rounded-md border border-input"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleSearch(searchQuery)}>Search</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Navbar>
  );
}
