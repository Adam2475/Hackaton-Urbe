import { defineChain } from "viem";

// Base chain
export const base = defineChain({
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Base", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://basescan.org",
    },
  },
});