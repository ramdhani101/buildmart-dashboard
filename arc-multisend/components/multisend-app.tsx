"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { erc20Abi, formatUnits, parseUnits } from "viem";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useSwitchChain,
  useWriteContract,
} from "wagmi";
import {
  ARC_DOCS,
  ARC_FAUCET,
  arcTestnet,
  USDC_ADDRESS,
  USDC_DECIMALS,
} from "@/lib/arc";
import { addArcTestnetToWallet } from "@/lib/add-arc-chain";
import {
  parseRecipientLines,
  sumAmounts,
  type Recipient,
} from "@/lib/parse-recipients";

type TxStatus = "pending" | "success" | "error";

type TxRow = {
  address: string;
  amount: string;
  status: TxStatus;
  hash?: string;
  error?: string;
};

const PLACEHOLDER = `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0,1.00
0x8ba1f109551bD432803012645Ac136c22C929E,2.50`;

export function MultiSendApp() {
  const { address, chainId, isConnected } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();

  const [bulkText, setBulkText] = useState("");
  const [defaultAmount, setDefaultAmount] = useState("1.00");
  const [txRows, setTxRows] = useState<TxRow[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const onArc = chainId === arcTestnet.id;

  const parsed = useMemo(
    () => parseRecipientLines(bulkText, defaultAmount),
    [bulkText, defaultAmount],
  );

  const recipients: Recipient[] = parsed.ok ? parsed.recipients : [];
  const totalUsdc = parsed.ok ? sumAmounts(recipients) : 0;

  const { data: balanceRaw, refetch: refetchBalance } = useReadContract({
    address: USDC_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: arcTestnet.id,
    query: { enabled: Boolean(address && onArc) },
  });

  const balanceFormatted =
    balanceRaw !== undefined
      ? formatUnits(balanceRaw, USDC_DECIMALS)
      : null;

  const connectWallet = useCallback(() => {
    void addArcTestnetToWallet();
    const connector = connectors[0];
    if (connector) connect({ connector, chainId: arcTestnet.id });
  }, [connect, connectors]);

  const ensureArc = useCallback(async () => {
    if (!isConnected) throw new Error("Hubungkan wallet dulu.");
    if (chainId !== arcTestnet.id) {
      await switchChainAsync({ chainId: arcTestnet.id });
    }
  }, [chainId, isConnected, switchChainAsync]);

  const sendAll = useCallback(async () => {
    setSendError(null);
    if (!parsed.ok) {
      setSendError(parsed.error);
      return;
    }
    if (recipients.length === 0) return;

    try {
      await ensureArc();
    } catch (e) {
      setSendError(
        e instanceof Error ? e.message : "Gagal switch ke Arc Testnet.",
      );
      return;
    }

    setIsSending(true);
    setTxRows(
      recipients.map((r) => ({
        address: r.address,
        amount: r.amount,
        status: "pending" as const,
      })),
    );

    for (let i = 0; i < recipients.length; i++) {
      const { address: to, amount } = recipients[i];
      try {
        const hash = await writeContractAsync({
          chainId: arcTestnet.id,
          address: USDC_ADDRESS,
          abi: erc20Abi,
          functionName: "transfer",
          args: [to, parseUnits(amount, USDC_DECIMALS)],
        });
        setTxRows((rows) =>
          rows.map((row, idx) =>
            idx === i ? { ...row, status: "success", hash } : row,
          ),
        );
      } catch (e) {
        const msg =
          e instanceof Error ? e.message : "Transaksi dibatalkan atau gagal.";
        setTxRows((rows) =>
          rows.map((row, idx) =>
            idx === i ? { ...row, status: "error", error: msg } : row,
          ),
        );
        setSendError(
          `Berhenti di penerima ${i + 1}/${recipients.length}: ${msg}`,
        );
        setIsSending(false);
        void refetchBalance();
        return;
      }
    }

    setIsSending(false);
    void refetchBalance();
  }, [
    ensureArc,
    parsed,
    recipients,
    refetchBalance,
    writeContractAsync,
  ]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-sky-400">
            Arc Testnet · USDC
          </p>
          <h1 className="mt-1 font-semibold text-2xl text-white tracking-tight">
            Multi Send
          </h1>
          <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
            Kirim USDC dari satu wallet ke banyak alamat. Setiap penerima = satu
            transaksi (konfirmasi di wallet).
          </p>
        </div>
        <WalletButton
          address={address}
          isConnected={isConnected}
          isConnecting={isConnecting}
          onArc={onArc}
          onConnect={connectWallet}
          onDisconnect={() => disconnect()}
        />
      </header>

      {!isConnected && (
        <Callout>
          Hubungkan MetaMask / Rabby, lalu pilih jaringan{" "}
          <strong className="text-zinc-200">Arc Testnet</strong>. Butuh USDC
          testnet?{" "}
          <a
            href={ARC_FAUCET}
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:underline"
          >
            Circle Faucet
          </a>
        </Callout>
      )}

      {isConnected && !onArc && (
        <Callout tone="warn">
          Wallet belum di Arc Testnet.{" "}
          <button
            type="button"
            onClick={() => void switchChainAsync({ chainId: arcTestnet.id })}
            className="font-medium text-amber-300 hover:underline"
          >
            Switch sekarang
          </button>
        </Callout>
      )}

      {isConnected && onArc && balanceFormatted !== null && (
        <p className="text-sm text-zinc-400">
          Saldo USDC (ERC-20):{" "}
          <span className="font-mono text-zinc-200">{balanceFormatted}</span>
        </p>
      )}

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-300">
            Jumlah default (jika baris tanpa jumlah)
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={defaultAmount}
            onChange={(e) => setDefaultAmount(e.target.value)}
            className="input"
            placeholder="1.00"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-300">
            Daftar penerima
          </span>
          <span className="text-xs text-zinc-500">
            Satu baris per wallet:{" "}
            <code className="text-zinc-400">0xAlamat</code> atau{" "}
            <code className="text-zinc-400">0xAlamat,12.5</code>
          </span>
          <textarea
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            rows={8}
            className="input font-mono text-sm resize-y min-h-[160px]"
            placeholder={PLACEHOLDER}
          />
        </label>

        {!parsed.ok && bulkText.trim() && (
          <p className="text-sm text-red-400">{parsed.error}</p>
        )}

        {parsed.ok && recipients.length > 0 && (
          <p className="text-sm text-zinc-400">
            {recipients.length} penerima · total{" "}
            <span className="font-mono text-zinc-200">
              {totalUsdc.toFixed(2)} USDC
            </span>
          </p>
        )}

        {sendError && (
          <p className="text-sm text-red-400 break-words">{sendError}</p>
        )}

        <button
          type="button"
          disabled={
            !isConnected ||
            !onArc ||
            !parsed.ok ||
            recipients.length === 0 ||
            isSending
          }
          onClick={() => void sendAll()}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSending
            ? `Mengirim… (${txRows.filter((r) => r.status === "success").length}/${recipients.length})`
            : `Kirim ke ${recipients.length || 0} wallet`}
        </button>
      </section>

      {txRows.length > 0 && (
        <section className="rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
            <h2 className="text-sm font-medium text-zinc-300">Progress</h2>
          </div>
          <ul className="divide-y divide-zinc-800">
            {txRows.map((row) => (
              <li
                key={`${row.address}-${row.amount}`}
                className="flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-mono text-zinc-400 truncate max-w-full sm:max-w-[280px]">
                  {row.address}
                </span>
                <span className="text-zinc-500">{row.amount} USDC</span>
                <StatusBadge row={row} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="text-xs text-zinc-600 text-center pb-8">
        Berdasarkan{" "}
        <a
          href={ARC_DOCS}
          target="_blank"
          rel="noreferrer"
          className="text-zinc-500 hover:text-zinc-400"
        >
          docs.arc.io
        </a>
        {" · "}
        Chain ID {arcTestnet.id}
      </footer>
    </div>
  );
}

function WalletButton({
  address,
  isConnected,
  isConnecting,
  onArc,
  onConnect,
  onDisconnect,
}: {
  address?: string;
  isConnected: boolean;
  isConnecting: boolean;
  onArc: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}) {
  if (!isConnected) {
    return (
      <button
        type="button"
        onClick={onConnect}
        className="btn-secondary shrink-0"
      >
        {isConnecting ? "Menghubungkan…" : "Hubungkan wallet"}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2 shrink-0">
      <button
        type="button"
        onClick={onDisconnect}
        className="btn-secondary text-xs"
      >
        Putuskan
      </button>
      <p className="font-mono text-xs text-zinc-500 max-w-[200px] truncate">
        {address}
      </p>
      <p className="text-xs text-zinc-500">
        {onArc ? "Arc Testnet" : "Salah jaringan"}
      </p>
    </div>
  );
}

function StatusBadge({ row }: { row: TxRow }) {
  if (row.status === "pending") {
    return <span className="text-amber-400">Menunggu…</span>;
  }
  if (row.status === "error") {
    return (
      <span className="text-red-400 truncate max-w-[200px]" title={row.error}>
        Gagal
      </span>
    );
  }
  return (
    <a
      href={`https://testnet.arcscan.app/tx/${row.hash}`}
      target="_blank"
      rel="noreferrer"
      className="text-sky-400 hover:underline"
    >
      Berhasil ↗
    </a>
  );
}

function Callout({
  children,
  tone = "info",
}: {
  children: ReactNode;
  tone?: "info" | "warn";
}) {
  const border =
    tone === "warn"
      ? "border-amber-900/60 bg-amber-950/30"
      : "border-zinc-800 bg-zinc-900/40";
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm text-zinc-400 ${border}`}>
      {children}
    </div>
  );
}
