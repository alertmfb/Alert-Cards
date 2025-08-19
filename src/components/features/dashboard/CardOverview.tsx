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
import { useGetChartData } from "@/hooks";
import ChartSkeletonLoader from "./ChartSkeleton";

const chartConfig = {
  total: {
    label: "Card Overview",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function CardOverviewChart() {
  const { data, isPending } = useGetChartData();

  const cardOverviewData = [
    { month: "January", total: data?.data?.january },
    { month: "February", total: data?.data?.february },
    { month: "March", total: data?.data?.march },
    { month: "April", total: data?.data?.april },
    { month: "May", total: data?.data?.may },
    { month: "June", total: data?.data?.june },
    { month: "July", total: data?.data?.july },
    { month: "August", total: data?.data?.august },
    { month: "September", total: data?.data?.september },
    { month: "October", total: data?.data?.october },
    { month: "November", total: data?.data?.november },
    { month: "December", total: data?.data?.december },
  ];
  const restructuredData = isPending ? [] : cardOverviewData || [];
  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader>
        <CardTitle>Card Overview</CardTitle>
        <CardDescription>
          Monthly performance snapshot across 2025
        </CardDescription>
      </CardHeader>
      {isPending ? (
        <ChartSkeletonLoader />
      ) : (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart data={restructuredData} margin={{ left: 12, right: 12 }}>
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
      )}

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
