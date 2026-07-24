import Chip from "@mui/material/Chip";
import { ReactElement } from "react";
import { colorVariants, type ColorVariant } from "@/utils/styles/color-classes";

type ChipProps = {
    label: string;
    icon?: ReactElement;
    textColor?: ColorVariant;
    bgColor?: ColorVariant;
    size?: "small" | "medium";
    onClick?: () => void;
    variant?: "outlined" | "filled";
    selected?: boolean;
};

export default function AppChip({
    icon,
    label,
    textColor = "txDefault",
    bgColor = "bgDefault",
    size = "medium",
    onClick,
    variant = "filled",
    selected = false
}: ChipProps) {
    const backgroundColor = selected ? "var(--chip-selected-background)" : colorVariants[bgColor];
    const foregroundColor = selected ? "var(--background)" : colorVariants[textColor];

    return (
        <Chip icon={icon} label={label} size={size} variant={variant} onClick={onClick}
        sx={{
            backgroundColor,
            color: foregroundColor,
            border: selected ? "1px solid transparent" : "1px solid var(--border)",
            fontSize: 16,
            fontWeight: 500,
            width: 170,
            paddingY: 2.5,
            '&:hover': {
                backgroundColor,
            },
            '& .MuiChip-icon': {
                color: foregroundColor,
                fontSize: 17,
            },
        }} />
    );
}
