import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const {
  PRIVATE_KEY,
  GAS_REPORT,
  COINMARKETCAP_API_KEY,
  SNOWTRACE_API_KEY,
  CELO_EXPLORER_API_KEY
} = process.env

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      accounts: [`${PRIVATE_KEY}`]
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [`${PRIVATE_KEY}`],
      chainId: 44787
    }
  },
  gasReporter: {
    enabled: GAS_REPORT ? true : false,
    currency: 'JPY',
    gasPrice: 20,
    token: 'ETH',
    coinmarketcap: COINMARKETCAP_API_KEY,
    gasPriceApi: 'https://api.etherscan.io/api?module=proxy&action=eth_gasPrice',
  },
  etherscan: {
    apiKey: {
      avalancheFujiTestnet: SNOWTRACE_API_KEY!,
      alfajores: CELO_EXPLORER_API_KEY!
    },
    customChains: [
      {
          network: "alfajores",
          chainId: 44787,
          urls: {
              apiURL: "https://api-alfajores.celoscan.io/api",
              browserURL: "https://alfajores.celoscan.io",
          },
      },
    ]
  }
};

export default config;