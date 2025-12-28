'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, UploadCloud } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleScan = () => {
    setIsScanning(true);
    toast({
        title: "Scan Started",
        description: "Analyzing your smart contract for vulnerabilities...",
    });
    
    // Simulate a network delay and analysis time
    setTimeout(() => {
      router.push('/dashboard/scan/latest');
    }, 2500);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader>
            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                <UploadCloud className="h-8 w-8" />
            </div>
          <CardTitle className="mt-4 text-2xl font-bold">Start a New Scan</CardTitle>
          <CardDescription className="px-6">
            Upload your Solidity smart contract to begin the security analysis. Our engine will check for common vulnerabilities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mx-auto w-full max-w-sm p-8 border-2 border-dashed rounded-lg">
            <p className="text-sm text-muted-foreground">
              Click the button below to simulate uploading a `.sol` file.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            onClick={handleScan}
            disabled={isScanning}
          >
            {isScanning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scanning Contract...
              </>
            ) : (
              'Analyze Contract'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
