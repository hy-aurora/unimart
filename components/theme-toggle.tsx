"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
  iconClassName?: string
  variant?: "default" | "ghost" | "outline"
  showLabel?: boolean
}

export function ThemeToggle({ 
  className, 
  iconClassName,
  variant = "ghost",
  showLabel = false,
}: ThemeToggleProps) {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant={variant} size="icon" className={className} disabled>
        <Sun className={cn("h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0", iconClassName)} />
        <Moon className={cn("absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100", iconClassName)} />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={showLabel ? "sm" : "icon"} className={className}>
          <Sun className={cn("h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0", iconClassName)} />
          <Moon className={cn("absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100", iconClassName)} />
          {showLabel && (
            <span className="ml-2">{theme === "dark" ? "Dark" : "Light"}</span>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={cn(theme === "light" && "bg-accent text-accent-foreground")}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={cn(theme === "dark" && "bg-accent text-accent-foreground")}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={cn(theme === "system" && "bg-accent text-accent-foreground")}
        >
          <span className="mr-2 flex h-4 w-4 items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" x2="16" y1="21" y2="21" />
              <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
          </span>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}