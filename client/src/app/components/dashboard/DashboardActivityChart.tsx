"use client";
import React from "react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { DashboardActivity } from "@/lib/api/dashboard.api";

interface DashboardActivityChartProps {
  activity: DashboardActivity[];
}

const activities = [
  { key: "executions", name: "Executions", color: "#FF9D00" },
  { key: "successful", name: "Successful", color: "#34D399" },
  { key: "ai", name: "AI usage", color: "#A78BFA" },
  { key: "github", name: "GitHub pushes", color: "#60A5FA" },
];

const DashboardActivityChart = ({ activity }: DashboardActivityChartProps) => {
  const chartData = activity.map((item) => ({
    day: new Date(`${item.date}T00:00:00`).toLocaleDateString("en-US", { weekday: "short" }),
    executions: item.executions,
    successful: item.successful,
    ai: item.ai,
    github: item.github,
  }));

  const totalActivity = activity.reduce((total, item) => total + item.executions + item.ai + item.github, 0);

  return (
    <Card className="border border-black/[0.08] dark:border-white/[0.07] bg-white/5 dark:bg-[#15171B]/5 text-black dark:text-white shadow-none backdrop-blur-xs rounded-[28px] overflow-hidden">
      <CardHeader className="pb-5 pt-6 px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base font-bold tracking-tight text-black dark:text-white">Activity</CardTitle>
            <CardDescription className="mt-1 text-xs text-black/50 dark:text-white/35 font-medium">Your development activity over the last 7 days</CardDescription>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-black tracking-tight text-black dark:text-white leading-none">{totalActivity}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-black/40 dark:text-white/30 mt-1.5">total activity</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <ChartContainer config={{ executions: { label: "Executions", color: "#FF9D00" }, successful: { label: "Successful", color: "#34D399" }, ai: { label: "AI usage", color: "#A78BFA" }, github: { label: "GitHub pushes", color: "#60A5FA" } }} className="h-[280px] w-full">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {activities.map((activity) => (
                <linearGradient key={`glow-${activity.key}`} id={`glow-${activity.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={activity.color} stopOpacity={0.16} />
                  <stop offset="100%" stopColor={activity.color} stopOpacity={0.00} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid 
              vertical={false} 
              className="stroke-black/[0.06] dark:stroke-white/[0.05]" 
              strokeDasharray="4 4" 
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              className="fill-black/35 dark:fill-white/25 text-[10px] font-medium"
            />
            
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tickMargin={12} 
              className="fill-black/40 dark:fill-white/30 text-[11px] font-medium"
            />
            
            <ChartTooltip 
              cursor={{ className: "stroke-black/[0.08] dark:stroke-white/[0.10]", strokeWidth: 1 }} 
              content={
                <ChartTooltipContent className="border-black/[0.08] dark:border-white/[0.08] bg-white/95 dark:bg-[#181A1F] text-black dark:text-white backdrop-blur-md rounded-xl shadow-xl p-3" />
              } 
            />
            
            {activities.map((activity) => (
              <Area 
                key={activity.key} 
                type="monotone" 
                dataKey={activity.key} 
                stroke={activity.color} 
                strokeWidth={2.5} 
                fill={`url(#glow-${activity.key})`}
                dot={false} 
                activeDot={{ 
                  r: 5, 
                  fill: activity.color, 
                  stroke: "var(--background, #fff)", 
                  dark: { stroke: "#15171B" }, 
                  strokeWidth: 2 
                }} 
              />
            ))}
          </AreaChart>
        </ChartContainer>
        
        <div className="mt-5 flex flex-wrap gap-2 border-t border-black/[0.05] dark:border-white/[0.06] pt-5">
          {activities.map((activity) => (
            <div key={activity.key} className="flex items-center gap-2 rounded-xl border border-black/[0.04] dark:border-white/[0.04] bg-black/[0.015] dark:bg-white/[0.015] px-3.5 py-1.5 transition-all hover:bg-black/[0.04] dark:hover:bg-white/[0.04] cursor-pointer group/legend">
              <span className="h-2 w-2 rounded-full shrink-0 transition-transform group-hover/legend:scale-110" style={{ backgroundColor: activity.color }} />
              <span className="text-[11px] font-medium text-black/60 dark:text-white/40 group-hover/legend:text-black dark:group-hover/legend:text-white">{activity.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardActivityChart;