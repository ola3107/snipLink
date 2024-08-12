"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getCardData } from "@/app/lib/action"



const chartConfig = {
  links: {
    label: "Links",
    color: "hsl(var(--chart-1))",
  },
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default async function Chart() {
  const {totalClicks, totalLinks} = await getCardData();
  const month = new Date().toLocaleString('default', { month: 'long' })

  const chartData = [
    { month: month, links: totalLinks, clicks: totalClicks },
  ]

  return (
    <div className="">
      { chartData.length === 0? <p>no data found</p> : <Card>
        <CardHeader>
          <CardTitle>Chart</CardTitle>
          <CardDescription>Monthly</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4} />
              <Bar dataKey="links" fill="var(--color-links)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Showing total Clicks and total Link created 
          </div>
        </CardFooter>
      </Card>}
    </div>
  )
}