import Chip from "@mui/material/Chip";
import { ReactElement } from "react";
import { colorVariants, type ColorVariant } from "@/lib/color-classes";

type ChipProps = {
    label: string;
    icon?: ReactElement;
    textColor?: ColorVariant;
    bgColor?: ColorVariant;
    size?: "small" | "medium";
    onClick?: () => void;
    variant?: "outlined" | "filled";
};

export default function AppChip({
    icon,
    label,
    textColor = "txdefault",
    bgColor = "bgDefault",
    size = "medium",
    onClick,
    variant = "filled"
}: ChipProps) {
    return (
        <Chip icon={icon} label={label} size={size} variant={variant} onClick={onClick}
        sx={{
            backgroundColor: colorVariants[bgColor],
            color: colorVariants[textColor]
        }} />
    );
}