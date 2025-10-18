import { createTheme } from '@mui/material/styles';

// ============================================================================
// COLOR PALETTE SYSTEM
// ============================================================================

const colors = {
  // PRIMARY BLUES - Main brand colors
  deepNavy: {
    50: '#e8eaed',
    100: '#c5cad2',
    200: '#9ea7b4',
    300: '#778496',
    400: '#596980',
    500: '#3c4f69',
    600: '#344761',
    700: '#2a3d56',
    800: '#22334c',
    900: '#1a2332', // Main Deep Navy
    950: '#0f172a',
  },
  richBlue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#2563eb', // Primary Rich Blue
    600: '#1d4ed8',
    700: '#1e40af',
    800: '#1e3a8a',
    900: '#1e3a70',
  },
  oceanBlue: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Main Ocean Blue
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  skyBlue: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8', // Main Sky Blue
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },

  // NEUTRAL GRAYS - Slate variations
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b', // Steel Blue
    600: '#475569', // Slate Blue
    700: '#334155', // Charcoal
    800: '#1e293b',
    900: '#0f172a', // Midnight
    950: '#020617',
  },

  // ACCENT COLORS
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0891b2', // Main Teal Blue
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc', // Periwinkle
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5', // Main Indigo
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },

  // SEMANTIC COLORS
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
};

// ============================================================================
// SHADOWS & ELEVATION
// ============================================================================

const shadows = {
  light: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  ],
  dark: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
    '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)',
    '0 10px 15px -3px rgb(0 0 0 / 0.6), 0 4px 6px -4px rgb(0 0 0 / 0.6)',
    '0 20px 25px -5px rgb(0 0 0 / 0.7), 0 8px 10px -6px rgb(0 0 0 / 0.7)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    '0 25px 50px -12px rgb(0 0 0 / 0.8)',
  ],
};

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================

const typography = {
  fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
};

// ============================================================================
// DARK THEME
// ============================================================================

const darkTheme = {
  palette: {
    mode: 'dark' as const,
    primary: {
      main: colors.skyBlue[400],
      light: colors.skyBlue[300],
      dark: colors.skyBlue[500],
      contrastText: colors.slate[50],
    },
    secondary: {
      main: colors.oceanBlue[500],
      light: colors.oceanBlue[400],
      dark: colors.oceanBlue[600],
      contrastText: colors.slate[50],
    },
    error: {
      main: colors.error[500],
      light: colors.error[400],
      dark: colors.error[600],
    },
    warning: {
      main: colors.warning[500],
      light: colors.warning[400],
      dark: colors.warning[600],
    },
    info: {
      main: colors.info[500],
      light: colors.info[400],
      dark: colors.info[600],
    },
    success: {
      main: colors.success[500],
      light: colors.success[400],
      dark: colors.success[600],
    },
    background: {
      default: colors.deepNavy[900],
      paper: colors.deepNavy[800],
    },
    text: {
      primary: colors.slate[50],
      secondary: colors.slate[400],
      disabled: colors.slate[600],
    },
    divider: colors.slate[700],
    action: {
      active: colors.skyBlue[400],
      hover: 'rgba(56, 189, 248, 0.08)',
      selected: 'rgba(56, 189, 248, 0.16)',
      disabled: colors.slate[700],
      disabledBackground: colors.slate[800],
      focus: 'rgba(56, 189, 248, 0.12)',
    },
  },
  shadows: shadows.dark as any,
  typography,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.deepNavy[800],
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.slate[900],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: colors.slate[700],
            },
            '&:hover fieldset': {
              borderColor: colors.slate[600],
            },
          },
        },
      },
    },
  },
};

// ============================================================================
// LIGHT THEME
// ============================================================================

const lightTheme = {
  palette: {
    mode: 'light' as const,
    primary: {
      main: colors.richBlue[500],
      light: colors.richBlue[400],
      dark: colors.richBlue[600],
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.oceanBlue[500],
      light: colors.oceanBlue[400],
      dark: colors.oceanBlue[600],
      contrastText: '#ffffff',
    },
    error: {
      main: colors.error[500],
      light: colors.error[400],
      dark: colors.error[600],
    },
    warning: {
      main: colors.warning[500],
      light: colors.warning[400],
      dark: colors.warning[600],
    },
    info: {
      main: colors.info[500],
      light: colors.info[400],
      dark: colors.info[600],
    },
    success: {
      main: colors.success[500],
      light: colors.success[400],
      dark: colors.success[600],
    },
    background: {
      default: colors.slate[50],
      paper: '#ffffff',
    },
    text: {
      primary: colors.slate[900],
      secondary: colors.slate[600],
      disabled: colors.slate[400],
    },
    divider: colors.slate[200],
    action: {
      active: colors.richBlue[500],
      hover: 'rgba(37, 99, 235, 0.04)',
      selected: 'rgba(37, 99, 235, 0.08)',
      disabled: colors.slate[300],
      disabledBackground: colors.slate[100],
      focus: 'rgba(37, 99, 235, 0.12)',
    },
  },
  shadows: shadows.light as any,
  typography,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
          borderRadius: 12,
          border: `1px solid ${colors.slate[200]}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
          color: colors.slate[900],
          borderBottom: `1px solid ${colors.slate[200]}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: colors.slate[300],
            },
            '&:hover fieldset': {
              borderColor: colors.slate[400],
            },
          },
        },
      },
    },
  },
};

export const createDarkTheme = () => createTheme(darkTheme as any);
export const createLightTheme = () => createTheme(lightTheme as any);
export { colors };

export default {
  dark: createDarkTheme(),
  light: createLightTheme(),
  colors,
};