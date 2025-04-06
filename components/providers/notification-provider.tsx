"use client"

import * as React from "react"
import { generateId } from "@/lib/utils"
import { Notification } from "@/components/ui/notification-center"

export interface NotificationContextProps {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "time" | "read">) => void
  updateNotification: (id: string | number, notification: Partial<Notification>) => void
  removeNotification: (id: string | number) => void
  markAsRead: (id: string | number) => void
  markAllAsRead: () => void
  clearAll: () => void
}

const NotificationContext = React.createContext<NotificationContextProps | undefined>(undefined)

export function useNotifications() {
  const context = React.useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

interface NotificationProviderProps {
  children: React.ReactNode
  initialNotifications?: Notification[]
}

function formatTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  // Less than a minute
  if (diff < 60 * 1000) {
    return 'Just now'
  }
  
  // Less than an hour
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000))
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  }
  
  // Less than a day
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000))
    return `${hours} hour${hours === 1 ? '' : 's'} ago`
  }
  
  // Less than a week
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(diff / (24 * 60 * 60 * 1000))
    return `${days} day${days === 1 ? '' : 's'} ago`
  }
  
  // Format as date
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
}

export function NotificationProvider({ children, initialNotifications = [] }: NotificationProviderProps) {
  const [notifications, setNotifications] = React.useState<Notification[]>(initialNotifications)
  
  // Add notification
  const addNotification = React.useCallback((notification: Omit<Notification, "id" | "time" | "read">) => {
    const newNotification: Notification = {
      id: generateId(),
      time: formatTime(new Date()),
      read: false,
      ...notification
    }
    
    setNotifications(prev => [newNotification, ...prev])
  }, [])
  
  // Update notification
  const updateNotification = React.useCallback((id: string | number, notification: Partial<Notification>) => {
    setNotifications(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...notification } : item
      )
    )
  }, [])
  
  // Remove notification
  const removeNotification = React.useCallback((id: string | number) => {
    setNotifications(prev => prev.filter(item => item.id !== id))
  }, [])
  
  // Mark notification as read
  const markAsRead = React.useCallback((id: string | number) => {
    setNotifications(prev => 
      prev.map(item => 
        item.id === id ? { ...item, read: true } : item
      )
    )
  }, [])
  
  // Mark all notifications as read
  const markAllAsRead = React.useCallback(() => {
    setNotifications(prev => 
      prev.map(item => ({ ...item, read: true }))
    )
  }, [])
  
  // Clear all notifications
  const clearAll = React.useCallback(() => {
    setNotifications([])
  }, [])
  
  const value = React.useMemo(() => ({
    notifications,
    addNotification,
    updateNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll
  }), [
    notifications,
    addNotification,
    updateNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll
  ])
  
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}
