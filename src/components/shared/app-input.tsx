import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/utils/styles/utils";

export type AppInputProps = Omit<
  ComponentPropsWithoutRef<typeof Input>,
  "aria-invalid"
> & {
  label?: ReactNode;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  "aria-invalid"?: boolean | "true" | "false";
};

export function AppInput({
  id,
  label,
  helperText,
  errorMessage,
  leftIcon,
  rightIcon,
  required,
  disabled,
  className,
  containerClassName,
  labelClassName,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: AppInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperTextId = `${inputId}-helper`;
  const errorMessageId = `${inputId}-error`;
  const isInvalid = Boolean(errorMessage) || ariaInvalid === true || ariaInvalid === "true";
  const describedBy = cn(
    ariaDescribedBy,
    helperText && helperTextId,
    errorMessage && errorMessageId
  );

  return (
    <div className={cn("flex w-full flex-col gap-1", containerClassName)}>
      {label && (
        <label
          className={cn(
            "text-[1rem] font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            disabled && "cursor-not-allowed opacity-70",
            labelClassName
          )}
          htmlFor={inputId}
        >
          {label}
          {required && (
            <span className="ml-1 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span
            className="pointer-events-none absolute left-2.5 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center text-foreground"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}

        <Input
          aria-describedby={describedBy || undefined}
          aria-invalid={isInvalid || undefined}
          className={cn(leftIcon && "pl-8", rightIcon && "pr-8", className)}
          disabled={disabled}
          id={inputId}
          required={required}
          {...props}
        />

        {rightIcon && (
          <span
            className="absolute right-2.5 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center text-foreground"
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>

      <div className={"min-h-5"}>
        {helperText && (
          <p id={helperTextId} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
        <p id={errorMessageId} className="text-sm font-medium text-destructive">
          {errorMessage ?? " "}
        </p>
      </div>
    </div>
  );
}
