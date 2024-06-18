'use theme';

import * as locales from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';

import components from './ComponentOverRide';
import shadows from './Shadows';
import typography from './Typography';

const baseTheme = (mode: any) => {
  return {
    palette: {
      mode: mode,
      primary: {
        main: '#4F46E5',
        light: '#726BEA',
        dark: '#3731A0',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#FA896B',
        light: '#FBF2EF',
        dark: '#F48162',
        contrastText: '#ffffff',
      },
      success: {
        main: '#00c292',
        light: '#ebfaf2',
        dark: '#00964b',
        contrastText: '#ffffff',
      },
      danger: {
        main: '#e46a76',
        light: '#fdf3f5',
      },
      info: {
        main: '#0bb2fb',
        light: '#a7e3f4',
      },
      error: {
        main: '#e46a76',
        light: '#fdf3f5',
        dark: '#e45a68',
      },
      warning: {
        main: '#fec90f',
        light: '#fff4e5',
        dark: '#dcb014',
        contrastText: '#ffffff',
      },
      text: {
        secondary: '#777e89',
        danger: '#fc4b6c',
      },
      grey: {
        A100: '#ecf0f2',
        A200: '#99abb4',
        A400: '#767e89',
        A700: '#e6f4ff',
      },
      action: {
        disabledBackground: 'rgba(73,82,88,0.12)',
        hoverOpacity: 0.02,
        hover: 'rgba(0, 0, 0, 0.03)',
        edit: '#72c48c',
        delete: '#d66767',
      },
      background: {
        default: mode === 'light' ? '#fafbfb' : '#2D2D2D',
        paper: mode === 'light' ? '#ffffff' : '#121212',
      },
    },
    mixins: {
      toolbar: {
        color: '#949db2',
        '@media(min-width:1280px)': {
          minHeight: '64px',
          padding: '0 30px',
        },
        '@media(max-width:1280px)': {
          minHeight: '64px',
        },
      },
    },
    shadows,
    typography,
  };
};

export const BuildTheme = (mode: 'light' | 'dark') => {
  const theme = createTheme(baseTheme(mode), locales['ptBR']);
  theme.components = components(theme);
  return theme;
};
