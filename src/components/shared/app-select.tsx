"use client";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from '@mui/material/Select';

type SelectValue = number | "";

type AppSelectProps = {
    label: string;
    options: { value: number | ""; label: string }[];
    value: SelectValue;
    onChange: (value: SelectValue) => void;
};

export default function AppSelect({
    label,
    options,
    value,
    onChange
}: AppSelectProps) {


    return (
        <FormControl variant="outlined" sx={{
            m: 1, minWidth: 200,
            "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "2px",
                borderRadius: "10px",
                borderColor: "var(--border-2)"
            },
            "& .MuiOutlinedInput-notchedOutline legend > span": {
                paddingInline: "18px",
            },

            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--brown)",
            }
        }}>
            <InputLabel
                shrink={value !== ""}
                sx={{
                    color: "var(--border-2)",
                    fontSize: "1.2rem",
                    px: 0.5,
                }}
            >
                {label}
            </InputLabel>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value as SelectValue)}
                label={label}
                notched={value !== ""}
                sx={{
                    color: "var(--brown)",
                    "& .MuiSelect-icon": {
                        color: "var(--border-2)",
                        fontSize: "1.8rem",
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "var(--border-2)",
                        color: "var(--foreground)",
                    },
                }}
                MenuProps={{
                    slotProps: {
                        paper: {
                            sx: {
                                backgroundColor: "var(--backgroundSelect)",
                                color: "var(--foreground)",
                            },
                        }
                    },
                }}
            >
                <MenuItem value={""}>
                    <em>None</em>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}