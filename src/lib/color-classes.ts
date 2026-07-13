export const textColorClasses = {
  primary: "text-mint",
  secondary: "text-cyan",
  success: "text-green",
  error: "text-red",
} as const;

export const bgColorClasses = {
  primary: "bg-mint",
  secondary: "bg-cyan",
  success: "bg-green",
  error: "bg-red",
} as const;

export const borderColorClasses = {
  primary: "border-mint",
  secondary: "border-cyan",
  success: "border-green",
  error: "border-red",
} as const;

export const colorVariants = {
  primary: "var(--mint)",
  secondary: "var(--cyan)",
  thirdary: "var(--yellow)",
  red: "var(--red)",
  bgDefault: "var(--chip-foreground)",
  txdefault: "var(--chip)",
  badgeDefault: "var(--badgeDefault)",
} as const;

export type TextColor = keyof typeof textColorClasses;
export type BgColor = keyof typeof bgColorClasses;
export type BorderColor = keyof typeof borderColorClasses;
export type ColorVariant = keyof typeof colorVariants;