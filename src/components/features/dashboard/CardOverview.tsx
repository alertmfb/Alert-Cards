"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const cardOverviewData = [
  { month: "January", total: 120 },
  { month: "February", total: 150 },
  { month: "March", total: 170 },
  { month: "April", total: 140 },
  { month: "May", total: 200 },
  { month: "June", total: 240 },
  { month: "July", total: 220 },
  { month: "August", total: 260 },
  { month: "September", total: 300 },
  { month: "October", total: 280 },
  { month: "November", total: 320 },
  { month: "December", total: 350 },
];

const chartConfig = {
  total: {
    label: "Card Overview",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function CardOverviewChart() {
  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader>
        <CardTitle>Card Overview</CardTitle>
        <CardDescription>
          Monthly performance snapshot across 2025
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={cardOverviewData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="total"
              type="monotone"
              fill="var(--color-total)"
              fillOpacity={0.3}
              stroke="var(--color-total)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium">
              Trending up by 8.9% this year <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">January - December 2025</div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
