import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className, ...props }, ref) => (
    <div className={className}>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        className="bg-white rounded-sm border-2 border-(--color-blue-dark) h-[3rem] w-full px-2"
        {...props}
        aria-label={label}
      />
    </div>
  )
);

Input.displayName = "Input";

export default Input;
