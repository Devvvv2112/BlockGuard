'use client';

import { ClientOnly } from './client-only';

interface FormattedDateProps {
  date: string | number | Date;
  variant?: 'long' | 'short';
}

export function FormattedDate({ date, variant = 'long' }: FormattedDateProps) {
  const dateObj = new Date(date);

  const longOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'long',
    timeStyle: 'short',
  };

  const shortOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const options = variant === 'long' ? longOptions : shortOptions;
  const formattedDate = dateObj.toLocaleString('en-US', options);

  return (
    <ClientOnly>
      <span>{formattedDate}</span>
    </ClientOnly>
  );
}
