import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import type { AppProps } from 'next/app'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

// We'll just be using Sepolia testnet for now
const { 
  chains, 
  provider, 
  webSocketProvider 
} = configureChains(
  [sepolia],
  [publicProvider()],
)

/**
 * createClient 
 */
const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

/**
 * App Component
 * @param param0 
 * @returns 
 */
export default function App({ Component, pageProps }: AppProps) {
  // We'll be using Wagmi sending our transaction and Mantine for CSS 
  // and notifications
  return (
    <WagmiConfig client={client}>
      <MantineProvider withNormalizeCSS>
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </WagmiConfig>
  )
}