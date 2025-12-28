'use client';

import { getScanById } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, BarChart2, Shield, FileText } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Severity } from '@/lib/types';
import { CodeSnippet } from '@/components/code-snippet';
import { AIExplanation } from '@/components/ai-explanation';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Cell } from 'recharts';
import React from 'react';
import { FormattedDate } from '@/components/formatted-date';

interface ScanPageProps {
  params: {
    id: string;
  };
}

const severityOrder: Record<Severity, number> = {
  Critical: 1,
  High: 2,
  Medium: 3,
  Low: 4,
  Info: 5,
};

function getSeverityBadgeVariant(severity: Severity) {
  switch (severity) {
    case 'Critical':
      return 'destructive';
    case 'High':
      return 'destructive';
    case 'Medium':
      return 'secondary';
    case 'Low':
      return 'outline';
    default:
      return 'default';
  }
}

const chartConfig = {
  count: {
    label: 'Count',
  },
  Critical: {
    label: 'Critical',
    color: 'hsl(var(--destructive))',
  },
  High: {
    label: 'High',
    color: 'hsl(var(--destructive))',
  },
  Medium: {
    label: 'Medium',
    color: 'hsl(var(--secondary-foreground))',
  },
  Low: {
    label: 'Low',
    color: 'hsl(var(--muted-foreground))',
  },
  Info: {
    label: 'Info',
    color: 'hsl(var(--muted-foreground))',
  },
} satisfies ChartConfig;

export default function ScanPage({ params }: ScanPageProps) {
  const resolvedParams = React.use(params as any);
  const scan = getScanById(resolvedParams.id);

  if (!scan) {
    notFound();
  }

  const severityCounts = scan.vulnerabilities.reduce((acc, v) => {
    acc[v.severity] = (acc[v.severity] || 0) + 1;
    return acc;
  }, {} as Record<Severity, number>);

  const sortedVulnerabilities = [...scan.vulnerabilities].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );

  const chartData = Object.entries(severityCounts)
    .map(([name, count]) => ({ name, count }))
    .sort(
      (a, b) =>
        severityOrder[a.name as Severity] - severityOrder[b.name as Severity]
    );

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">{scan.contractName}</h1>
        <p className="text-muted-foreground">
          Scan performed on <FormattedDate date={scan.scanDate} />
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scan.riskScore}</div>
            <p className="text-xs text-muted-foreground">
              {scan.riskScore > 75
                ? 'High Risk'
                : scan.riskScore > 50
                ? 'Medium Risk'
                : 'Low Risk'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {scan.vulnerabilities.length}
            </div>
            <p className="text-xs text-muted-foreground">
              vulnerabilities found
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Issues
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {severityCounts.Critical || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Immediate attention required
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Solidity Version
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scan.solidityVersion}</div>
            <p className="text-xs text-muted-foreground">Compiler version used</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Vulnerability Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {sortedVulnerabilities.map((vuln) => (
                <AccordionItem key={vuln.id} value={vuln.id}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-4 text-left">
                      <Badge variant={getSeverityBadgeVariant(vuln.severity)}>
                        {vuln.severity}
                      </Badge>
                      <span className="font-semibold">{vuln.title}</span>
                      <span className="text-sm text-muted-foreground">
                        L:{vuln.lineNumber}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p className="text-muted-foreground">{vuln.description}</p>
                    <CodeSnippet
                      code={scan.sourceCode}
                      highlightLine={vuln.lineNumber}
                    />
                    <AIExplanation
                      vulnerability={vuln}
                      contractCode={scan.sourceCode}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5" />
              Issues by Severity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    width={60}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Bar dataKey="count" radius={5}>
                    {chartData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={
                          chartConfig[entry.name as keyof typeof chartConfig]
                            ?.color
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
