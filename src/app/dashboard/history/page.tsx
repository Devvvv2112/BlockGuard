'use client';
import { getScanById, scanResults } from '@/lib/mock-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Severity } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormattedDate } from '@/components/formatted-date';

function getSeverityVariant(severity: Severity) {
  switch (severity) {
    case 'Critical':
      return 'destructive';
    case 'High':
      return 'destructive';
    case 'Medium':
      return 'secondary';
    default:
      return 'outline';
  }
}

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Scan History</h1>
        <p className="text-muted-foreground">
          Review past security analyses and track your progress.
        </p>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Contract Name</TableHead>
                <TableHead>Scan Date</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Vulnerabilities</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scanResults.map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell className="font-medium">
                    {scan.contractName}
                  </TableCell>
                  <TableCell>
                    <FormattedDate date={scan.scanDate} variant="short" />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        scan.riskScore > 75
                          ? 'destructive'
                          : scan.riskScore > 50
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {scan.riskScore}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {Object.entries(
                        scan.vulnerabilities.reduce((acc, v) => {
                          acc[v.severity] = (acc[v.severity] || 0) + 1;
                          return acc;
                        }, {} as Record<Severity, number>)
                      ).map(([severity, count]) => (
                        <Badge
                          key={severity}
                          variant={getSeverityVariant(severity as Severity)}
                          className="text-xs"
                        >
                          {count} {severity}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/scan/${scan.id}`}>
                        View Report <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
