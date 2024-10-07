"use client"

import * as React from "react"
import { AxisBottom, AxisLeft } from "@visx/axis"
import { Grid } from "@visx/grid"
import { Group } from "@visx/group"
import { scaleBand, scaleLinear } from "@visx/scale"
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip"
import { localPoint } from "@visx/event"

import { cn } from "@/lib/utils"

const tooltipStyles = {
  ...defaultStyles,
  background: "hsl(var(--background))",
  border: "1px solid hsl(var(--border))",
  color: "hsl(var(--foreground))",
  zIndex: 40,
}

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<{ name: string; value: number }>
  width?: number
  height?: number
}

interface ChartDataPoint {
  name: string;
  value: number;
}

export function Chart({
  data,
  width = 400,
  height = 300,
  className,
  ...props
}: ChartProps) {
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  })

  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  } = useTooltip<ChartDataPoint>()

  const xScale = React.useMemo(
    () =>
      scaleBand<string>({
        range: [0, width],
        domain: data.map((d) => d.name),
        padding: 0.4,
      }),
    [width, data]
  )

  const yScale = React.useMemo(
    () =>
      scaleLinear<number>({
        range: [height, 0],
        domain: [0, Math.max(...data.map((d) => d.value))],
      }),
    [height, data]
  )

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-full", className)}
      {...props}
    >
      <svg width={width} height={height}>
        <Group>
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={width}
            height={height}
            stroke="hsl(var(--border))"
            strokeOpacity={0.1}
          />
          <AxisBottom
            top={height}
            scale={xScale}
            stroke="hsl(var(--border))"
            tickStroke="hsl(var(--border))"
            tickLabelProps={{
              fill: "hsl(var(--foreground))",
              fontSize: 12,
              textAnchor: "middle",
            }}
          />
          <AxisLeft
            scale={yScale}
            stroke="hsl(var(--border))"
            tickStroke="hsl(var(--border))"
            tickLabelProps={{
              fill: "hsl(var(--foreground))",
              fontSize: 12,
              textAnchor: "end",
              dy: "0.33em",
              dx: -4,
            }}
          />
          {data.map((d) => {
            const barWidth = xScale.bandwidth()
            const barHeight = height - (yScale(d.value) ?? 0)
            const barX = xScale(d.name)
            const barY = height - barHeight

            return (
              <Group key={`bar-${d.name}`}>
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill="hsl(var(--primary))"
                  onMouseMove={(event) => {
                    const point = localPoint(event)
                    if (!point) return
                    showTooltip({
                      tooltipData: d,
                      tooltipTop: point.y,
                      tooltipLeft: point.x,
                    })
                  }}
                  onMouseLeave={() => hideTooltip()}
                />
              </Group>
            )
          })}
        </Group>
      </svg>
      {tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div className="flex flex-col">
            <span className="font-bold">{tooltipData.name}</span>
            <span>{tooltipData.value}</span>
          </div>
        </TooltipInPortal>
      )}
    </div>
  )
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full h-full", className)}
    {...props}
  />
))
ChartContainer.displayName = "ChartContainer"

export const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute z-50 p-2 pointer-events-none rounded-md bg-background border",
      className
    )}
    {...props}
  />
))
ChartTooltip.displayName = "ChartTooltip"

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col", className)}
    {...props}
  />
))
ChartTooltipContent.displayName = "ChartTooltipContent"