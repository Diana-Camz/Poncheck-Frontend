import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: "var(--border-2)", // Color personalizado al seleccionar
          },
          "& .MuiInputLabel-shrink": {
                        transform: "translate(14px, -11px) scale(0.85)",
                    },
        },
      },
    },
  },
});
