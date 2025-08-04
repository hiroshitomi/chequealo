import { BankParser } from "./BankParser";
import { extractMovimientosGaliciaVisa } from "./utils/extractMovimientosGaliciaVisa";

export const galiciaParser: BankParser = {
  name: "Galicia",
  detect: (text) => text.includes("BANCO GALICIA"),
  parse: extractMovimientosGaliciaVisa,
};