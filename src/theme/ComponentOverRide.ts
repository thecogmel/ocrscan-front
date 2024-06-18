import { Theme } from '@mui/material';

const components: any = (theme: Theme) => {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          height: '100%',
          width: '100%',
        },
        body: {
          height: '100%',
          margin: 0,
          padding: 0,
        },
        '#root': {
          height: '100%',
        },
        "*[dir='rtl'] .buyNowImg": {
          transform: 'scaleX(-1)',
        },

        '.buyNowImg': {
          position: 'absolute',
          right: '-44px',
          top: '-18px',
          width: '143px',
          height: '175px',
        },
        '.MuiCardHeader-action': {
          alignSelf: 'center !important',
        },
        '.scrollbar-container': {
          borderRight: '0 !important',
        },
        "*[dir='rtl'] .welcomebg:before": {
          backgroundPosition: 'top -24px left -9px !important',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '15px !important',
          paddingRight: '15px !important',
          maxWidth: '1600px',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',

          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedSuccess: {
          backgroundColor: `${theme.palette.success.main}40`,
          color: theme.palette.success.main,
          fontWeight: '500',
          '&:hover': {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.common.white,
          },
        },
        containedError: {
          backgroundColor: `${theme.palette.error.main}50`,
          color: theme.palette.error.main,
          fontWeight: '500',
          '&:hover': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.common.white,
          },
        },
        containedInfo: {
          backgroundColor: `${theme.palette.info.main}50`,
          color: theme.palette.info.main,
          fontWeight: '500',
          '&:hover': {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.common.white,
          },
        },
        containedSecondary: {
          backgroundColor: `${theme.palette.secondary.light}40`,
          color: theme.palette.secondary.main,
          fontWeight: '500',
          '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
          },
        },
        containedWarning: {
          backgroundColor: `${theme.palette.warning.main}40`,
          color: theme.palette.secondary.main,
          fontWeight: '500',
          '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
          },
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: '9px',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          padding: '15px',
          margin: '15px',
          boxShadow: '0px 7px 30px 0px rgba(90, 114, 123, 0.11)',
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '40px',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: '#ecf0f2',
          borderRadius: '6px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: '0',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: '500',
          fontSize: '0.75rem',
        },
      },
    },
  };
};

export default components;
