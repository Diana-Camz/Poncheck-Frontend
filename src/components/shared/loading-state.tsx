import { Loader2 } from "lucide-react";
import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { cn } from "@/utils/styles/utils";

type LoadingStateSize = "sm" | "md" | "lg";

export type LoadingStateProps = ComponentPropsWithoutRef<"div"> & {
  message: ReactNode;
  description?: ReactNode;
  fullPage?: boolean;
  size?: LoadingStateSize;
};

const sizeClasses: Record<
  LoadingStateSize,
  {
    container: string;
    spinner: string;
    iconWrap: string;
    message: string;
  }
> = {
  sm: {
    container: "gap-3 py-6",
    spinner: "size-4",
    iconWrap: "size-9",
    message: "text-sm",
  },
  md: {
    container: "gap-4 py-10",
    spinner: "size-5",
    iconWrap: "size-11",
    message: "text-base",
  },
  lg: {
    container: "gap-5 py-12",
    spinner: "size-6",
    iconWrap: "size-14",
    message: "text-lg",
  },
};

export function LoadingState({
  message,
  description,
  fullPage = false,
  size = "md",
  className,
  ...props
}: LoadingStateProps) {
  const generatedId = useId();
  const messageId = `${generatedId}-message`;
  const descriptionId = `${generatedId}-description`;
  const classes = sizeClasses[size];

  return (
    <div
      aria-busy="true"
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={messageId}
      aria-live="polite"
      className={cn(
        "flex w-full flex-col items-center justify-center px-4 text-center bg-background",
        fullPage ? "min-h-svh" : "min-h-40",
        classes.container,
        className
      )}
      role="status"
      {...props}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full border border-border text-mint",
          classes.iconWrap
        )}
        aria-hidden="true"
      >
        <Loader2 className={cn("animate-spin", classes.spinner)} />
      </div>

      <div className="flex max-w-md flex-col items-center gap-1.5">
        <p
          id={messageId}
          className={cn(
            "font-medium leading-none text-mint",
            classes.message
          )}
        >
          {message}
        </p>

        {description && (
          <p id={descriptionId} className="text-body-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
