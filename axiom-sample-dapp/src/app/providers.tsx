"use client";

import config from "@/lib/wagmiConfig";
import { useEffect, useState } from "react";
import { WagmiConfig } from 'wagmi';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


  return (
    <WagmiConfig config={config}>
      {mounted && children}
    </WagmiConfig>
  )
}
