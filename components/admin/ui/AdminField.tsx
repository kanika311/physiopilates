import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import {
  adminInputClass,
  adminInputStyle,
  adminSelectClass,
  adminTextareaClass,
} from "@/components/admin/ui/adminStyles";

interface FieldProps {
  label: string;
  children: ReactNode;
}

export function AdminField({ label, children }: FieldProps) {
  return (
    <div>
      <label
        className="mb-2 block text-sm font-[400] text-black"
      
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export function AdminInput({
  className = "",
  style,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`${adminInputClass} ${className}`}
      style={{ ...adminInputStyle, ...style }}
      {...props}
    />
  );
}

export function AdminTextarea({
  className = "",
  style,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`${adminTextareaClass} ${className}`}
      style={{ ...adminInputStyle, ...style }}
      {...props}
    />
  );
}

export function AdminSelect({
  className = "",
  style,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`${adminSelectClass} ${className}`}
      style={{ ...adminInputStyle, ...style }}
      {...props}
    />
  );
}
