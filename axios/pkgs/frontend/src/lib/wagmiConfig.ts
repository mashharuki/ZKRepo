import { Constants } from "@/shared/constants";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { goerli } from "viem/chains";
import { configureChains, createConfig } from 'wagmi';
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from 'wagmi/providers/public';
import { createClient } from 'viem'

const projectId = Constants.WALLETCONNECT_PROJECT_ID!

const metadata = {
  name: 'Autonomous Airdrop',
  description: 'Autonomous Airdrop Example',
  url: 'https://autonomous-airdrop-example.vercel.app/',
  icons: ['']
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [publicProvider()],
)
 
const config = createConfig({
  publicClient,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: projectId,
      },
    })
  ],
  webSocketPublicClient
})

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
createWeb3Modal({ 
  wagmiConfig: wagmiConfig,
  projectId,
  chains 
})

export default config;