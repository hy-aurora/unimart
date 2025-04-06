"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SearchInputProps extends React.ComponentProps<typeof Input> {
  onSearch?: (value: string) => void
  clearable?: boolean
  className?: string
  containerClassName?: string
  loading?: boolean
}

export function SearchInput({
  placeholder = "Search...",
  onSearch,
  clearable = true,
  className,
  containerClassName,
  loading = false,
  value: propValue,
  onChange: propOnChange,
  ...props
}: SearchInputProps) {
  const [value, setValue] = React.useState("")
  const isControlled = propValue !== undefined
  const currentValue = isControlled ? String(propValue) : value
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setValue(e.target.value)
    }
    propOnChange?.(e)
  }

  const handleClear = () => {
    if (!isControlled) {
      setValue("")
    }
    // Call onChange with an artificial event
    propOnChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
    onSearch?.("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(currentValue)
    }
  }

  React.useEffect(() => {
    // When controlled value changes from outside
    if (isControlled && propValue !== value) {
      setValue(String(propValue))
    }
  }, [isControlled, propValue, value])

  return (
    <div className={cn("relative flex w-full items-center", containerClassName)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        className={cn("pl-10", currentValue && clearable && "pr-8", className)}
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="search"
        {...props}
      />
      {currentValue && clearable && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={handleClear}
          disabled={loading}
        >
          <X className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
        </div>
      )}
    </div>
  )
}
