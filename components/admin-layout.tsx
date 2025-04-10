"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  School,
  Tag,
  Layers,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: BarChart3,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Tag,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Schools",
    href: "/admin/schools",
    icon: School,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Always call the user query
  const user = useQuery(api.users.get) || null;

  // Get admin notifications
  const adminNotifications = useQuery(api.adminNotifications.getAll) || [];
  const notificationsSet = useRef(false);

  // Effect to set notifications when data is loaded
  useEffect(() => {
    if (adminNotifications && !notificationsSet.current) {
      setNotifications(adminNotifications.slice(0, 5));
      notificationsSet.current = true;
    }
  }, [adminNotifications]);

  // Mark notification as read
  const markAsRead = useMutation(api.adminNotifications.markAsRead);

  // Handle notification click
  const handleNotificationClick = async (notificationId: string) => {
    try {
      await markAsRead({ notificationId: notificationId as any });
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Handle unauthenticated state
  if (user === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-red-500">
          You are not authorized to access this page.
        </p>
      </div>
    );
  }

  // Handle non-admin users
  if (user?.role !== "admin") {
    useEffect(() => {
      const timer = setTimeout(() => {
        router.push("/");
      }, 3000);

      return () => clearTimeout(timer);
    }, [router]);

    return (
      <div className="flex items-center justify-center min-h-screen flex-col">
        <p className="text-lg font-medium text-red-500 mb-4">
          You do not have administrator privileges.
        </p>
        <p className="text-gray-500">Redirecting to homepage...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 hidden h-full flex-col border-r bg-white dark:bg-gray-950 dark:border-gray-800 md:flex",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b dark:border-gray-800">
          <Link href="/admin" className="flex items-center">
            {isSidebarOpen ? (
              <h1 className="text-xl font-bold">UniMart Admin</h1>
            ) : (
              <span className="text-xl font-bold">UM</span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="h-8 w-8"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
                !isSidebarOpen && "justify-center px-0 py-2"
              )}
              target="_blank"
            >
              <Home className={cn("h-5 w-5", !isSidebarOpen && "h-6 w-6")} />
              {isSidebarOpen && <span>View Store</span>}
            </Link>
            
            <div className="my-2 px-3">
              {isSidebarOpen && (
                <p className="text-xs uppercase text-gray-400 mb-2">Main Menu</p>
              )}
              <div className="h-px bg-gray-100 dark:bg-gray-800"></div>
            </div>
            
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
                  !isSidebarOpen && "justify-center px-0 py-2"
                )}
              >
                <item.icon
                  className={cn("h-5 w-5", !isSidebarOpen && "h-6 w-6")}
                />
                {isSidebarOpen && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t p-4 dark:border-gray-800">
          <div
            className={cn(
              "flex items-center gap-3",
              !isSidebarOpen && "flex-col"
            )}
          >
            <Avatar>
              <AvatarImage src={user?.imageUrl || ""} />
              <AvatarFallback>{user?.name?.substring(0, 2) || "AD"}</AvatarFallback>
            </Avatar>
            {isSidebarOpen && (
              <div className="grid gap-0.5">
                <p className="text-sm font-medium">{user?.name || "Admin User"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email || "admin@unimart.com"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 z-40 md:hidden"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="flex h-16 items-center border-b px-4">
            <Link href="/admin" className="flex items-center">
              <h1 className="text-xl font-bold">UniMart Admin</h1>
            </Link>
          </div>
          <nav className="grid gap-1 p-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              target="_blank"
            >
              <Home className="h-5 w-5" />
              <span>View Store</span>
            </Link>
            
            <div className="my-2 px-3">
              <p className="text-xs uppercase text-gray-400 mb-2">Main Menu</p>
              <div className="h-px bg-gray-100 dark:bg-gray-800"></div>
            </div>
            
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div
        className={cn(
          "flex min-h-screen flex-col md:pl-64",
          !isSidebarOpen && "md:pl-16"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 dark:bg-gray-950 dark:border-gray-800">
          <div className="flex-1 md:flex-shrink-0">
            <div className="relative md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 md:w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem 
                        key={notification._id} 
                        className={cn(
                          "cursor-pointer",
                          !notification.isRead && "bg-blue-50 dark:bg-blue-900/20"
                        )}
                        onClick={() => handleNotificationClick(notification._id)}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <Badge 
                              className={cn(
                                "h-2 w-2 rounded-full p-0",
                                notification.isRead ? "bg-gray-300" : 
                                notification.type === "success" ? "bg-green-500" :
                                notification.type === "warning" ? "bg-yellow-500" :
                                notification.type === "error" ? "bg-red-500" :
                                "bg-blue-500"
                              )} 
                            />
                            <p className="text-sm font-medium line-clamp-1">
                              {notification.message}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">
                            {new Date(notification.createdAt).toLocaleTimeString()} • 
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
                {notifications.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="justify-center font-medium text-primary">
                      View All Notifications
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.imageUrl || ""} />
                    <AvatarFallback>{user?.name?.substring(0, 2) || "AD"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/admin/settings?tab=profile" className="flex w-full">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/admin/settings" className="flex w-full">Admin Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
