import '@fortawesome/fontawesome-svg-core/styles.css';
import { SSRProvider } from '@react-aria/ssr';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { AuthProvider } from '../context/auth/AuthContext';
import '../styles/globals.css';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SSRProvider>
      <NextNProgress color="#1d4ed8" options={{ showSpinner: false }} />
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </SSRProvider>
  );
}

export default MyApp;
