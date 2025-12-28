import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  iconOnly = false,
}: {
  className?: string;
  iconOnly?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-foreground',
        className
      )}
    >
      <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
        <ShieldCheck className="h-6 w-6" />
      </div>
      {!iconOnly && (
        <span className="text-xl font-bold font-headline tracking-tight">
          BlockGuard
        </span>
      )}
    </div>
  );
}
