import { BankParser } from "./BankParser";
import { extractMovimientosICBC } from "./utils/extractMovimientosIcbc";

export const icbcParser: BankParser = {
  name: "ICBC",
  detect: (text: string) => text.includes("ICBC") || text.includes("INDUSTRIAL AND COMMERCIAL BANK"),
  parse: extractMovimientosICBC,
};