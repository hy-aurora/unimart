"use client"

import * as React from "react"
import { Bell, Check, Trash2, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export interface Notification {
  id: string | number
  title: string
  description: string
  time: string
  read: boolean
  category?: "info" | "success" | "warning" | "error"
  action?: string
  actionLink?: string
}

interface NotificationCenterProps {
  notifications?: Notification[]
  onMarkAsRead?: (id: string | number) => void
  onMarkAllAsRead?: () => void
  onRemove?: (id: string | number) => void
  onRemoveAll?: () => void
  className?: string
  maxHeight?: string
  useDialog?: boolean
  triggerAsChild?: boolean
}

export function NotificationCenter({
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onRemove,
  onRemoveAll,
  className,
  maxHeight = "420px",
  useDialog = false,
  triggerAsChild = false
}: NotificationCenterProps) {
  const [open, setOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<string>("all")
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  const handleMarkAsRead = (id: string | number) => {
    onMarkAsRead?.(id)
  }
  
  const handleMarkAllAsRead = () => {
    onMarkAllAsRead?.()
  }
  
  const handleRemove = (id: string | number) => {
    onRemove?.(id)
  }
  
  const filteredNotifications = React.useMemo(() => {
    if (activeTab === "all") return notifications
    if (activeTab === "unread") return notifications.filter(n => !n.read)
    return notifications.filter(n => n.category === activeTab)
  }, [notifications, activeTab])

  const categoryCount = React.useMemo(() => {
    return {
      info: notifications.filter(n => n.category === "info").length,
      success: notifications.filter(n => n.category === "success").length,
      warning: notifications.filter(n => n.category === "warning").length,
      error: notifications.filter(n => n.category === "error").length
    }
  }, [notifications])

  const NotificationList = () => (
    <div className="space-y-4">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all" className="text-xs">
              All
              {notifications.length > 0 && (
                <Badge variant="secondary" className="ml-1 px-1">{notifications.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">
              Unread
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1 px-1">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            {categoryCount.info > 0 && (
              <TabsTrigger value="info" className="text-xs">
                Info
                <Badge variant="secondary" className="ml-1 px-1">{categoryCount.info}</Badge>
              </TabsTrigger>
            )}
            {categoryCount.success > 0 && (
              <TabsTrigger value="success" className="text-xs">
                Success
                <Badge variant="secondary" className="ml-1 px-1">{categoryCount.success}</Badge>
              </TabsTrigger>
            )}
            {categoryCount.warning > 0 && (
              <TabsTrigger value="warning" className="text-xs">
                Warning
                <Badge variant="secondary" className="ml-1 px-1">{categoryCount.warning}</Badge>
              </TabsTrigger>
            )}
            {categoryCount.error > 0 && (
              <TabsTrigger value="error" className="text-xs">
                Error
                <Badge variant="secondary" className="ml-1 px-1">{categoryCount.error}</Badge>
              </TabsTrigger>
            )}
          </TabsList>
        </div>
        
        <TabsContent value={activeTab} className="mt-2">
          <div className={`overflow-y-auto ${maxHeight ? `max-h-[${maxHeight}]` : ''}`} style={{ maxHeight }}>
            <AnimatePresence>
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <Bell className="mb-2 h-10 w-10 opacity-20" />
                  <h3 className="text-sm font-medium">No notifications</h3>
                  <p className="text-xs mt-1">
                    {activeTab === "all" 
                      ? "You don't have any notifications yet." 
                      : activeTab === "unread" 
                        ? "You don't have any unread notifications." 
                        : `You don't have any ${activeTab} notifications.`
                    }
                  </p>
                </div>
              ) : (
                <ul className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <motion.li
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "relative px-4 py-3 transition-colors",
                        !notification.read && "bg-accent/40",
                        notification.category === "error" && !notification.read && "bg-destructive/10",
                        notification.category === "warning" && !notification.read && "bg-amber-50 dark:bg-amber-950/20",
                        notification.category === "success" && !notification.read && "bg-green-50 dark:bg-green-950/20"
                      )}
                    >
                      <div className="flex justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm font-medium truncate",
                            notification.category === "error" && "text-destructive"
                          )}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {notification.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                            {notification.action && (
                              <Button
                                variant="link"
                                size="sm"
                                className="h-auto p-0 text-xs text-primary"
                                asChild
                              >
                                <a href={notification.actionLink || '#'}>
                                  {notification.action}
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          {!notification.read && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="h-3.5 w-3.5" />
                              <span className="sr-only">Mark as read</span>
                            </Button>
                          )}
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 text-muted-foreground"
                            onClick={() => handleRemove(notification.id)}
                          >
                            <X className="h-3.5 w-3.5" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                      
                      {!notification.read && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                      )}
                    </motion.li>
                  ))}
                </ul>
              )}
            </AnimatePresence>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )

  if (useDialog) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {triggerAsChild ? (
          <DialogTrigger asChild>
            {notifications.length > 0 ? (
              <div className="relative inline-flex">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                    {unreadCount}
                  </Badge>
                )}
              </div>
            ) : (
              <Bell className="h-5 w-5" />
            )}
          </DialogTrigger>
        ) : (
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className={cn("relative", className)}>
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DialogTrigger>
        )}
        <DialogContent className={cn("sm:max-w-md", className)}>
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <DialogTitle>Notifications</DialogTitle>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                  <Check className="mr-2 h-4 w-4" />
                  Mark all as read
                </Button>
              )}
            </div>
          </DialogHeader>
          
          <NotificationList />
          
          <DialogFooter className="flex justify-between items-center pt-2">
            <Button variant="ghost" size="sm" className="text-destructive" onClick={onRemoveAll}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear all
            </Button>
            <Button variant="outline" size="sm">View all</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("relative", className)}>
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className={cn("w-80", className)}
        sideOffset={8}
      >
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleMarkAllAsRead}>
                <Check className="h-4 w-4" />
                <span className="sr-only">Mark all as read</span>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onRemoveAll}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Clear all</span>
            </Button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="py-2">
          <NotificationList />
        </div>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer justify-center font-medium">
          <a href="/notifications">View all notifications</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
