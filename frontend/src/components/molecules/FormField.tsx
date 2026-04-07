import type { ReactNode } from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

type FormFieldProps = {
  label: string;
  error?: string;
  children?: ReactNode;
  hint?: string;
};

export default function FormField({ label, error, children, hint }: FormFieldProps) {
  return (
    <div>
      <Label>{label}</Label>
      {children ?? <Input />}
      {hint && !error ? <p className="mt-2 text-xs text-slate-500">{hint}</p> : null}
      {error ? <p className="mt-2 text-xs font-medium text-rose-500">{error}</p> : null}
    </div>
  );
}