import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type AppButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

type AppButtonSize = "sm" | "default" | "lg" | "icon";

type ButtonVariant = ComponentPropsWithoutRef<typeof Button>["variant"];
type ButtonSize = ComponentPropsWithoutRef<typeof Button>["size"];

export type AppButtonProps = Omit<
  ComponentPropsWithoutRef<typeof Button>,
  "variant" | "size"
> & {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loadingText?: string;
};

const variantMap: Record<AppButtonVariant, ButtonVariant> = {
  primary: "default",
  secondary: "secondary",
  outline: "outline",
  ghost: "ghost",
  destructive: "destructive",
};

const sizeMap: Record<AppButtonSize, ButtonSize> = {
  sm: "sm",
  default: "default",
  lg: "lg",
  icon: "icon",
};

export function  AppButton({
  children,
  disabled,
  isLoading = false,
  leftIcon,
  loadingText,
  rightIcon,
  variant = "primary",
  size = "default",
  type = "button",
  ...props
}: AppButtonProps) {
  const isDisabled = disabled || isLoading;
  const isIconOnly = size === "icon";

  return (
    <Button
      aria-busy={isLoading || undefined}
      disabled={isDisabled}
      size={sizeMap[size]}
      type={type}
      variant={variantMap[variant]}
      className={"cursor-pointer"}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        leftIcon && <span aria-hidden="true">{leftIcon}</span>
      )}

      {!isIconOnly && (
        <span>{isLoading && loadingText ? loadingText : children}</span>
      )}

      {!isLoading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </Button>
  );
}
