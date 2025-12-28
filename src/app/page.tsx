import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Code, History, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: 'Automated Analysis',
    description: 'Run static analysis to detect common vulnerabilities like reentrancy and access control issues.',
  },
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: 'AI-Powered Explanations',
    description: 'Understand complex vulnerabilities with plain-English summaries and actionable fix suggestions.',
  },
  {
    icon: <History className="h-6 w-6 text-primary" />,
    title: 'Scan History',
    description: 'Track your contract’s security improvements over time by comparing scans.',
  },
];

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Logo />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="relative">
          {heroImage && (
            <div className="absolute inset-0 z-0 opacity-10">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                priority
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
               <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
            </div>
          )}
          <section className="relative container grid lg:grid-cols-2 items-center gap-12 py-24 md:py-32">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl font-headline">
                Fewer Hacks.
                <br />
                <span className="text-primary">Faster Audits.</span>
              </h1>
              <p className="max-w-prose text-lg text-foreground/80">
                BlockGuard is a developer-first security platform for smart contracts. Catch vulnerabilities early, understand them clearly, and ship safer code without needing deep security expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">Scan Your First Contract</Link>
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Card className="max-w-md shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-green-500" />
                    <span>Analysis Complete</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-red-500/10 text-red-700 dark:text-red-400">
                    <span className="font-bold">1 Critical Issue</span>
                    <span className="text-sm">Reentrancy</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-orange-500/10 text-orange-700 dark:text-orange-400">
                    <span className="font-bold">2 High Issues</span>
                    <span className="text-sm">Access Control</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">
                    <span className="font-bold">3 Medium Issues</span>
                    <span className="text-sm">Gas Inefficiencies</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        <section id="features" className="container py-16 md:py-24">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center gap-4">
            <h2 className="text-3xl font-bold md:text-4xl font-headline">Make Security a Habit, Not an Afterthought</h2>
            <p className="text-lg text-foreground/70">
              BlockGuard integrates seamlessly into your workflow, making it easy to build secure contracts from the start.
            </p>
          </div>
          <div className="mx-auto mt-16 grid justify-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4">
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <Logo />
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} BlockGuard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
