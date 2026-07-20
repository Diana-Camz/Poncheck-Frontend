import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { cn } from "@/utils/styles/utils";

export type EmptyStateProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "title"
> & {
  title: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  ...props
}: EmptyStateProps) {
  const generatedId = useId();
  const titleId = `${generatedId}-title`;
  const descriptionId = `${generatedId}-description`;

  return (
    <section
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      className={cn(
        "flex size-0.5 w-full flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-12",
        className
      )}
      {...props}
    >
      {icon && (
        <div
          className="flex items-center justify-center text-muted-foreground"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-[1rem] text-muted-foreground">
          {title}
        </p>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      {true && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {action}
        </div>
      )}
    </section>
  );
}
