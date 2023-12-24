import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';


/**
 * App Component
 * @param param0 
 * @returns 
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Notifications />
      <Component {...pageProps} />
    </MantineProvider>
  )
}