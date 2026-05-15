import { arcTestnet } from "./arc";

/** Tambahkan Arc Testnet ke wallet jika belum ada (EIP-3085). */
export async function addArcTestnetToWallet(): Promise<void> {
  const ethereum = (
    window as Window & {
      ethereum?: {
        request: (args: {
          method: string;
          params?: unknown[];
        }) => Promise<unknown>;
      };
    }
  ).ethereum;

  if (!ethereum) return;

  const chainIdHex = `0x${arcTestnet.id.toString(16)}`;
  const explorer = arcTestnet.blockExplorers?.default?.url;

  try {
    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: chainIdHex,
          chainName: arcTestnet.name,
          rpcUrls: [arcTestnet.rpcUrls.default.http[0]],
          nativeCurrency: arcTestnet.nativeCurrency,
          blockExplorerUrls: explorer ? [explorer] : undefined,
        },
      ],
    });
  } catch {
    // Wallet menolak atau chain sudah ada — abaikan
  }
}
