import { defineChain } from "viem";

/** Arc Testnet — https://docs.arc.io/arc/references/connect-to-arc */
export const arcTestnet = defineChain({
  id: 5042002,
  name: "Arc Testnet",
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.arc.network"],
      webSocket: ["wss://rpc.testnet.arc.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "Arcscan",
      url: "https://testnet.arcscan.app",
    },
  },
});

/** USDC ERC-20 on Arc Testnet (6 decimals) */
export const USDC_ADDRESS =
  "0x3600000000000000000000000000000000000000" as const;

export const USDC_DECIMALS = 6;

export const ARC_DOCS = "https://docs.arc.io";
export const ARC_FAUCET = "https://faucet.circle.com";
