import type React from "react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Line, Legend } from "recharts"

interface ChartData {
  name: string
  value?: number
  total?: number
}

interface ChartContainerProps {
  children: React.ReactNode
  height?: number
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ children, height = 300 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      {children}
    </ResponsiveContainer>
  )
}

interface ChartProps {
  data: ChartData[]
  children: React.ReactNode
}

export const Chart: React.FC<ChartProps> = ({ data, children }) => {
  return <BarChart data={data}>{children}</BarChart>
}

interface ChartXAxisProps {
  dataKey: string
}

export const ChartXAxis: React.FC<ChartXAxisProps> = ({ dataKey }) => {
  return <XAxis dataKey={dataKey} />
}

export const ChartYAxis: React.FC = () => {
  return <YAxis />
}

type ChartTooltipProps = {}

export const ChartTooltip: React.FC<ChartTooltipProps> = () => {
  return <Tooltip />
}

type ChartLegendProps = {}

export const ChartLegend: React.FC<ChartLegendProps> = () => {
  return <Legend />
}

interface ChartBarProps {
  dataKey: string
  fill: string
  radius?: number[]
}

export const ChartBar: React.FC<ChartBarProps> = ({ dataKey, fill, radius }) => {
  return <Bar dataKey={dataKey} fill={fill} radius={radius} />
}

interface ChartLineProps {
  dataKey: string
  stroke: string
}

export const ChartLine: React.FC<ChartLineProps> = ({ dataKey, stroke }) => {
  return <Line type="monotone" dataKey={dataKey} stroke={stroke} />
}

