import React from 'react'
import App from '../App'
import ColorModeContext from './contexts/ColorModeContext'
import createTheme from '@mui/material/styles/createTheme'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline'
import useMediaQuery from '@mui/material/useMediaQuery'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { PaletteMode, ThemeOptions } from '@mui/material'
import createPalette from '@mui/material/styles/createPalette'
import nord from './nord'

type Props = {}

const nordGrey = {
  200: nord[6],
  300: nord[5],
  400: nord[4],
  500: nord[3],
  600: nord[2],
  700: nord[1],
  800: nord[0],
  A100: nord[6],
  A200: nord[4],
  A400: nord[2],
  A700: nord[0],
}

const lightPalette = createPalette({
  primary: {
    main: nord[10],
  },
  secondary: {
    main: nord[9],
  },
  error: {
    main: nord[11],
  },
  warning: {
    main: nord[13],
  },
  info: {
    main: nord[7],
  },
  success: {
    main: nord[14],
  },
  mode: 'light',
  common: {
    black: nord[0],
    white: nord[6]
  },
  grey: nordGrey,
  text: {
    primary: nord[0],
    secondary: nord[1],
    disabled: nord[3],
  },
  divider: nord[0],
  action: {
    active: nord[4],
    hover: nord[5],
    selected: nord[2],
    disabled: nord[3],
    disabledBackground: nord[6],
    focus: nord[10],
  },
  background: {
    default: nord[6],
    paper: nord[5]
  },
})

const darkPalette = createPalette({
  primary: {
    main: nord[8],
  },
  secondary: {
    main: nord[9],
  },
  error: {
    main: nord[11],
  },
  warning: {
    main: nord[13],
  },
  info: {
    main: nord[7],
  },
  success: {
    main: nord[14],
  },
  mode: 'dark',
  common: {
    black: nord[0],
    white: nord[6],
  },
  grey: nordGrey,
  text: {
    primary: nord[6],
    secondary: nord[5],
    disabled: nord[3],
  },
  divider: nord[6],
  action: {
    active: nord[2],
    hover: nord[1],
    selected: nord[4],
    disabled: nord[3],
    disabledBackground: nord[0],
    focus: nord[9],
  },
  background: {
    default: nord[0],
    paper: nord[1]
  },
})

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  shadows: ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  palette: mode === 'light' ? lightPalette : darkPalette,
  typography: {
    fontFamily: 'Inter, sans-serif'
  }
})

const ToggleColorMode = (props: Props) => {
  const [mode, setMode] = React.useState<PaletteMode>(useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    [],
  )

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App guessLimit={6} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default ToggleColorMode