/// <reference types="vite/client" />
import type { Eip1193Provider } from "ethers/providers";

declare global {
  interface Window {
    ethereum?: Eip1193Provider | null;
  }
}
