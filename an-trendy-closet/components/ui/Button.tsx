"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark" | "gold";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold tracking-wide rounded-full transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const variants = {
      primary:
        "bg-[#C89C7A] text-white hover:bg-[#B58967] shadow-luxury hover:shadow-md",
      secondary:
        "bg-[#F4EFEB] text-[#121212] hover:bg-[#EAE5DF] border border-[#EAE5DF]",
      outline:
        "bg-transparent text-[#121212] border border-[#D8D2C9] hover:border-[#C89C7A] hover:text-[#C89C7A]",
      ghost:
        "bg-transparent text-[#555555] hover:text-[#121212] hover:bg-[#F4EFEB]",
      dark:
        "bg-[#121212] text-white hover:bg-black shadow-luxury",
      gold:
        "bg-[#D4AF37] text-white hover:bg-[#C29E2E] shadow-luxury",
    };

    const sizes = {
      sm: "px-3.5 py-1.5 text-xs gap-1.5",
      md: "px-5 py-2.5 text-xs sm:text-sm gap-2",
      lg: "px-7 py-3.5 text-sm font-semibold gap-2.5",
      xl: "px-9 py-4 text-base font-bold gap-3",
    };

    const widthStyle = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
