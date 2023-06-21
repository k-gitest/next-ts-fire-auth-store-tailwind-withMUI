import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'components/layout/Layout'
import {AuthProvider} from 'components/provider/AuthProvider'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  // テーマの設定
  palette: {
    primary: {
      main: '#1e88e5',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  )
}
