import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-brand-green', className)}>
      {children}
    </span>
  );
}