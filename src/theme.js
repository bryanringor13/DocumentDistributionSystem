import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// eslint-disable-next-line import/no-mutable-exports
const theme = createMuiTheme({
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontFamily: 'Inter, Arial, sans-serif',
    fontWeightBold: '600',
    h1: {
      fontSize: 28,
      lineHeight: '1.7',
    },
    h3: {
      fontSize: 28,
      lineHeight: '1.7',
    },
  },
  palette: {
    common: {
      white: '#fff',
      black: '#2F3542',
    },
    type: 'light',
    primary: {
      light: '#9dd6bd',
      main: '#41B67F',
      dark: '#33a16e',
      grey: '#55565c',
    },
    secondary: {
      main: '#1F236F',
    },
    error: {
      light: '#f5cfd1',
      main: '#FA5656',
    },
    warning: {
      main: '#F8B344',
    },
    text: {
      primary: '#2F3542',
      // secondary: '',
      // disabled: '',
      // hint: '',
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  // shadows: {
  //   0: 'none',
  //   1: 'none',
  //   2: 'none',
  //   3: 'none',
  //   4: 'none',
  //   5: 'none',
  //   6: 'none',
  //   7: 'none',
  //   8: 'none',
  //   9: 'none',
  //   10: 'none',
  //   11: 'none',
  //   12: 'none',
  //   13: 'none',
  //   14: 'none',
  //   15: 'none',
  //   16: 'none',
  //   17: 'none',
  //   18: 'none',
  //   19: 'none',
  //   20: 'none',
  //   21: 'none',
  //   22: 'none',
  //   23: 'none',
  //   24: 'none',
  // },
  overrides: {
    MuiTextField: {
      root: {
        marginBottom: '1.25rem',
      },
    },
    MuiFormLabel: {
      root: {
        '&.Mui-error, &.Mui-focused': {
          color: '#2F3542',
        },
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: '16px !important',
      },
    },
    MuiButton: {
      root: {
        fontSize: '1rem',
        textTransform: 'none',
      },
      containedPrimary: {
        color: '#fff',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        '&.Mui-disabled': {
          color: '#fff',
          backgroundColor: '#9dd6bd',
          '& .MuiCircularProgress-root': {
            marginRight: 10,
          },
        },
      },
      sizeLarge: {
        height: '3.5rem',
        fontSize: '1rem',
      },
    },
    MuiInputLabel: {
      root: {
        color: '#2F3542',
      },
      outlined: {
        transform: 'translate(0, 0) scale(1)',
        position: 'relative',
        color: '#55565c',
        marginBottom: 7,
        fontSize: 14,
        '&$shrink': {
          transform: 'translate(0, 0) scale(1)',
        },
      },
      shrink: {
        transform: 'translate(0, 0) scale(1)',
      },
    },
    MuiPickersDateRangePickerInput: {
      toLabelDelimiter: {
        display: 'none',
      },
    },
    MuiOutlinedInput: {
      root: {
        '& fieldset': {
          display: 'none',
        },
      },
      inputAdornedStart: {
        paddingLeft: '10px',
      },
      input: {
        border: '1px solid #A5B0BE',
        backgroundColor: '#fff',
        borderRadius: 4,
        fontSize: 16,
        width: '100%',
        padding: '10px 12px',
        transition: 'all .25s ease',
        '&:hover': {
          borderColor: '#41B67F',
        },
        '.Mui-focused &': {
          borderColor: '#41B67F',
          boxShadow: '0 0 4px rgba(65, 182, 127, 0.65)',
        },
        '.Mui-error &': {
          borderColor: '#FA5656',
        },
        '.Mui-error:hover &, .Mui-error.Mui-focused &': {
          boxShadow: '0 0 4px rgba(250, 86, 86, 0.65)',
        },
      },
    },
    MuiFormHelperText: {
      contained: {
        marginLeft: 0,
        marginRight: 0,
      },
    },
    MuiAlert: {
      root: {
        display: 'flex',
        justifyContent: 'center',
        '& .MuiAlert-icon': {
          display: 'none',
        },
      },
      action: {
        alignItems: 'flex-start',
      },
      standardError: {
        color: '#2F3542',
        backgroundColor: 'rgba(250, 86, 86, 0.25)',
        borderLeft: 'solid 4px #FA5656',
      },
      standardSuccess: {
        backgroundColor: '#D6EFE3',
        borderLeft: 'solid 4px #1DD28B',
      },
      standardWarning: {
        backgroundColor: '#FEF7EC',
        borderLeft: 'solid 4px #F8B344',
      },
      standardInfo: {
        backgroundColor: '#CCECF1',
        borderLeft: 'solid 4px #29B1C3',
      },
      outlinedError: {
        backgroundColor: '#FFEEEE',
        borderLeft: 'solid 4px #FA5656',
      },
    },
    MuiAlertTitle: {
      root: {
        marginTop: 0,
        fontWeight: 600,
      },
    },
    MuiTab: {
      root: {
        fontWeight: 600,
        textTransform: 'none',
        minWidth: 115,
        borderBottom: 'solid 4px #E0E6ED',
        '@media (min-width: 0px)': {
          minWidth: 115,
        },
      },
    },
    MuiTabs: {
      indicator: {
        height: 4,
        backgroundColor: '#2F3542',
      },
    },
    MuiCardHeader: {
      action: {
        marginTop: 0,
        margiRight: 0,
      },
    },
    MuiTableFooter: {
      root: {
        backgroundColor: '#f4f6f9',
      },
    },
    MuiTableCell: {
      paddingCheckbox: {
        display: 'none',
      },
    },
    MuiTablePagination: {
      selectRoot: {
        background: '#FFFFFF',
        border: '1px solid #A5B0BE',
        borderRadius: '4px',
      },
    },
    MuiPaginationItem: {
      root: {
        color: '#2F3542',
        height: '20px',
        margin: '0px',
        padding: '0px',
        fontSize: '1rem',
        minWidth: '32px',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontFamily: 'Inter, Arial, sans-serif',
        fontWeight: 400,
        lineHeight: 1.43,
        borderRadius: '16px',
      },
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: '#29B1C3',
      },
    },
  },
});

export default responsiveFontSizes(theme);
