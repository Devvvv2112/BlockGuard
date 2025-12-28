import { cn } from '@/lib/utils';

interface CodeSnippetProps {
  code: string;
  highlightLine: number;
  className?: string;
  linesToShow?: number;
}

export function CodeSnippet({
  code,
  highlightLine,
  className,
  linesToShow = 5,
}: CodeSnippetProps) {
  const lines = code.split('\n');
  const startLine = Math.max(0, highlightLine - 1 - Math.floor(linesToShow / 2));
  const endLine = Math.min(lines.length, startLine + linesToShow);

  const visibleLines = lines.slice(startLine, endLine);

  return (
    <div
      className={cn(
        'rounded-md bg-muted/50 font-code text-sm overflow-hidden border',
        className
      )}
    >
      <pre className="p-4 overflow-x-auto">
        <code className="flex flex-col">
          {visibleLines.map((line, index) => {
            const currentLineNumber = startLine + index + 1;
            return (
              <span
                key={currentLineNumber}
                className={cn('flex', {
                  'bg-red-500/20 rounded-sm': currentLineNumber === highlightLine,
                })}
              >
                <span className="w-10 pr-4 text-right text-muted-foreground/50 select-none">
                  {currentLineNumber}
                </span>
                <span className="flex-1">{line}</span>
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
