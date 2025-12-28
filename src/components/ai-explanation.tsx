'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Lightbulb, Bot, ShieldCheck, FileText } from 'lucide-react';
import type { ExplainVulnerabilityOutput } from '@/ai/flows/explain-vulnerability';
import { explainVulnerability } from '@/ai/flows/explain-vulnerability';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import type { Vulnerability } from '@/lib/types';

interface AIExplanationProps {
  vulnerability: Vulnerability;
  contractCode: string;
}

export function AIExplanation({ vulnerability, contractCode }: AIExplanationProps) {
  const [explanation, setExplanation] = useState<ExplainVulnerabilityOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleExplain = async () => {
    setIsLoading(true);
    setExplanation(null);
    try {
      const result = await explainVulnerability({
        vulnerabilityReport: vulnerability.rawReport,
        sourceCode: contractCode,
      });
      setExplanation(result);
    } catch (error) {
      console.error('Failed to get AI explanation:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate AI explanation. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (explanation) {
      return (
        <div className="space-y-4">
          <InfoCard icon={<FileText />} title="Explanation" content={explanation.explanation} />
          <InfoCard icon={<AlertCircle />} title="Risk Impact" content={explanation.riskImpact} />
          <InfoCard icon={<ShieldCheck />} title="Suggested Fixes" content={explanation.suggestedFixes} />
        </div>
      );
    }

    return (
      <div className="text-center text-muted-foreground p-6 border-dashed border-2 rounded-lg">
        <Bot className="mx-auto h-12 w-12" />
        <h3 className="mt-2 text-sm font-medium text-foreground">Need help understanding this?</h3>
        <p className="mt-1 text-sm">Let our AI assistant break it down for you.</p>
        <div className="mt-6">
          <Button onClick={handleExplain}>
            <Lightbulb className="mr-2 h-4 w-4" />
            Explain with AI
          </Button>
        </div>
      </div>
    );
  };

  return <div className="mt-4">{renderContent()}</div>;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
    </div>
  );
}

function InfoCard({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
  return (
    <Card className="bg-secondary/50">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
        <div className="text-accent">{icon}</div>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
      </CardContent>
    </Card>
  );
}
