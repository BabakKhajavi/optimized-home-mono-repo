import { createTheme } from '@mui/material/styles';

import { baseTheme } from './base';
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    contrast: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      light: string;
      main: string;
      dark: string;
      contrastText: string;
      lightGray: string;
      golden: string;
      lightGolden: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      light: string;
      main: string;
      dark: string;
      contrastText: string;
      lightGray: string;
      golden: string;
      lightGolden: string;
    };
  }
}

export const goldenBlackTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    customColors: {
      light: '#f5e1a4',
      main: '#ffffff',
      dark: '#faf8f2',
      contrastText: '#000',
      lightGray: '#d3d3d3',
      golden: '#ffffff',
      lightGolden: '#f2e77e',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contrast' },
          style: {
            color: '#000',
            backgroundColor: '#ffffff',
            '&:hover': {
              backgroundColor: '#faf8f2',
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: '3px',
          textTransform: 'none',
          padding: '8px 16px',
          color: '#ffffff',
          height: '30px',
          backgroundColor: '#000',
          '&:hover': {
            backgroundColor: '#66666e',
          },
          '&:disabled': {
            cursor: 'default',
            backgroundColor: '#e6e8e6',
            color: '#7e7f83',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          color: '#000',
          '&.Mui-checked': {
            color: '#000',
          },
          '& .MuiSvgIcon-root': { fontSize: 28 },
        },
      },
    },
  },
});
