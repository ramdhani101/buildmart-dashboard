import { isAddress } from "viem";

export type Recipient = {
  address: `0x${string}`;
  amount: string;
};

export type ParseResult =
  | { ok: true; recipients: Recipient[] }
  | { ok: false; error: string };

/**
 * Parse bulk input: one line per recipient.
 * Formats: `0xabc...` or `0xabc...,1.5` or `0xabc... 1.5`
 */
export function parseRecipientLines(
  text: string,
  defaultAmount: string,
): ParseResult {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return { ok: false, error: "Tambahkan minimal satu alamat penerima." };
  }

  const recipients: Recipient[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNo = i + 1;

    let addressPart: string;
    let amountPart: string | undefined;

    if (line.includes(",")) {
      const [a, b, ...rest] = line.split(",");
      if (rest.length > 0) {
        return {
          ok: false,
          error: `Baris ${lineNo}: format tidak valid. Gunakan alamat,jumlah`,
        };
      }
      addressPart = a.trim();
      amountPart = b?.trim();
    } else {
      const parts = line.split(/\s+/);
      addressPart = parts[0];
      amountPart = parts[1];
    }

    if (!isAddress(addressPart)) {
      return { ok: false, error: `Baris ${lineNo}: alamat tidak valid.` };
    }

    const lower = addressPart.toLowerCase();
    if (seen.has(lower)) {
      return { ok: false, error: `Baris ${lineNo}: alamat duplikat.` };
    }
    seen.add(lower);

    const amount = amountPart ?? defaultAmount;
    const num = Number(amount);
    if (!amount || Number.isNaN(num) || num <= 0) {
      return {
        ok: false,
        error: `Baris ${lineNo}: jumlah USDC harus angka positif.`,
      };
    }

    recipients.push({
      address: addressPart as `0x${string}`,
      amount,
    });
  }

  return { ok: true, recipients };
}

export function sumAmounts(recipients: Recipient[]): number {
  return recipients.reduce((s, r) => s + Number(r.amount), 0);
}
