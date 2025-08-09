import { Movimiento } from "@/app/types/Movimiento";
import { formatFecha, parseMonto } from "../utils/helpers";

export const icbcVisaParser = (text: string): Movimiento[] => {
  const movimientos: Movimiento[] = [];

  const lines = text.split("\n").slice(28); // ajustar si cambia el punto de inicio
  const regex =
    /^\s+(\d{2}-\d{2})\s+(.+?)\s+(?:\d{2}\/\d{2})?\s+(.+?)\s+([\d.,]+)\s+([\d.,]*)$/;

  for (const line of lines) {
    const match = line.match(regex);
    if (match) {
      const [, fechaRaw, referencia, comprobante, pesosRaw, dolaresRaw] = match;

      const fecha = formatFecha(fechaRaw);
      const pesos = parseMonto(pesosRaw);
      const dolares = dolaresRaw ? parseMonto(dolaresRaw) : 0;

      movimientos.push({
        fecha,
        referencia: referencia.trim(),
        cuota: "", // ICBC Visa puede no tener info de cuotas
        comprobante,
        pesos,
        dolares,
      });
    }
  }
  return movimientos;
};
