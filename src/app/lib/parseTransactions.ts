
type Transaction = {
  date: string;
  description: string;
  amount: number;
  currency: string;
};

export function parseTransactions(text: string): Transaction[] {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const transactions: Transaction[] = [];
  const regex = /^(\d{2}\/\d{2})\s+(.+?)\s+([\d.,]+)\s*(USD|ARS)?$/i;

  for (const line of lines) {
    const match = line.match(regex);
    if (match) {
      const [, date, description, amountStr, currencyRaw] = match;
      const currency = currencyRaw || "ARS";
      const amount = parseFloat(amountStr.replace(",", "."));
      transactions.push({ date, description, amount, currency });
    }
  }

  return transactions;
}
