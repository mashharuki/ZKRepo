import networks from "./networks.json";

export const switchNetwork = async () => {
  if (window.ethereum) {

    const ethereum = window.ethereum;

    try {
      // Try to switch to the chain
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          { chainId: `0x${parseInt(networks.selectedChain).toString(16)}` },
        ],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      // @ts-ignore
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            // @ts-ignore
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${parseInt(networks.selectedChain).toString(16)}`,
                // @ts-ignore
                chainName: networks[networks.selectedChain].chainName,
                // @ts-ignore
                rpcUrls: networks[networks.selectedChain].rpcUrls,
                nativeCurrency: {
                  symbol:
                    // @ts-ignore
                    networks[networks.selectedChain].nativeCurrency.symbol,
                  decimals: 18,
                },
                blockExplorerUrls:
                  // @ts-ignore
                  networks[networks.selectedChain].blockExplorerUrls,
              },
            ],
          });
        } catch (addError) {
          console.log(addError);
        }
      }
      // handle other "switch" errors
    }
  } else {
    // If window.ethereum is not found then MetaMask is not installed
    alert(
      "MetaMask is not installed. Please install it to use this app: https://metamask.io/download/"
    );
  }
};