import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type NavItemProps = {
  href: string;
  children: ReactNode;
  active?: boolean;
};

export default function NavItem({ href, children, active }: NavItemProps) {
  return (
    <a
      href={href}
      className={cn(
        'rounded-full px-4 py-2 text-sm font-medium transition',
        active ? 'bg-blue-50 text-brand-blue' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
      )}
    >
      {children}
    </a>
  );
}