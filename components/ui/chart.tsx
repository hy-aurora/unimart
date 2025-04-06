"use client"

import * as React from "react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { cn } from "@/lib/utils"

type ChartConfig = {
  [key: string]: {
    theme?: string
    color?: string
  }
}

const ChartContext = React.createContext<{
  config: ChartConfig
}>({
  config: {}
})

const Chart = React.forwardRef<
  React.ElementRef<typeof BarChart>,
  React.ComponentPropsWithoutRef<typeof BarChart>
>(({ className, children, ...props }, ref) => {
  return (
    <BarChart ref={ref} margin={{ top: 16, right: 16, bottom: 16, left: 16 }} {...props}>
      {children}
    </BarChart>
  )
})
Chart.displayName = "Chart"

function ChartXAxis(props: React.ComponentProps<typeof XAxis>) {
  return <XAxis {...props} axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)" }} />
}
ChartXAxis.displayName = "ChartXAxis"

function ChartYAxis(props: React.ComponentProps<typeof YAxis>) {
  return <YAxis {...props} axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)" }} />
}
ChartYAxis.displayName = "ChartYAxis"

function ChartTooltip(props: React.ComponentProps<typeof Tooltip>) {
  return <Tooltip {...props} contentStyle={{ backgroundColor: "var(--background)", border: "none" }} />
}
ChartTooltip.displayName = "ChartTooltip"

function ChartContainer({
  id,
  className,
  children,
  config = {},
  ...props
}: React.ComponentProps<"div"> & {
  config?: ChartConfig
  children: React.ComponentProps<
    typeof ResponsiveContainer
  >["children"]
}) {
  const chartId = id || React.useId()

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-background [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-background [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  // Fixed the Object.entries error by ensuring config is an object
  const colorConfig = Object.entries(config || {}).filter(
    ([, config]) => config?.theme || config?.color
  )

  if (!colorConfig.length) return null

  const cssVariables = colorConfig
    .map(([key, { theme, color }]) => {
      if (theme) {
        return `[data-chart="${id}"] .recharts-layer[name="${key}"] { color: hsl(var(--${theme})); }`
      }
      
      if (color) {
        return `[data-chart="${id}"] .recharts-layer[name="${key}"] { color: ${color}; }`
      }
      
      return ""
    })
    .join("\n")

  return <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
}

export { Chart, ChartContainer, ChartXAxis, ChartYAxis, ChartTooltip }
