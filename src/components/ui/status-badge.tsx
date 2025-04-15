
import React from "react";
import { cn } from "@/lib/utils";

type StatusVariant = 
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "pending";

interface StatusBadgeProps {
  variant?: StatusVariant;
  label: string;
}

export function StatusBadge({ variant = "default", label }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-gray-100 text-gray-800": variant === "default",
          "bg-green-100 text-green-800": variant === "success",
          "bg-yellow-100 text-yellow-800": variant === "warning",
          "bg-red-100 text-red-800": variant === "error",
          "bg-blue-100 text-blue-800": variant === "info",
          "bg-purple-100 text-purple-800": variant === "pending",
        }
      )}
    >
      {label}
    </span>
  );
}
