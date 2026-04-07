import type { LabelHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
};

export default function Label({ className, children, ...props }: LabelProps) {
  return (
    <label className={cn('mb-2 block text-sm font-medium text-slate-700', className)} {...props}>
      {children}
    </label>
  );
}