import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none ring-1 ring-slate-900/5 transition focus:border-brand-green focus:ring-4 focus:ring-brand-green/20",
        error &&
          "border-rose-400 ring-rose-100 focus:border-rose-500 focus:ring-rose-100",
        className,
      )}
      {...props}
    />
  );
});

export default Input;
