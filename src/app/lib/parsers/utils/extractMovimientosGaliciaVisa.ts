import { Movimiento } from "@/app/types/Movimiento";


export function extractMovimientosGaliciaVisa(text: string) : Movimiento[] {
  const movimientos: Movimiento[] = [];
  const lines = text.split("\n").slice(28); // empieza desde la línea 28

  const regex = /^\s+(\d{2}-\d{2}-\d{2})\s+\*?\s*(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(\d+)\s+([\d.]+,\d{2})(?:\s+([\d.]+,\d{2}))?$/;


  for (const line of lines) {
    const match = line.match(regex);
    if (match) {
      const [, fechaRaw, referencia, cuotaRaw, comprobante, pesosRaw, dolaresRaw] = match;

      const fecha = formatFecha(fechaRaw); // "15-10-24" → "2024-10-15"
      const pesos = parseMonto(pesosRaw);
      const dolares = dolaresRaw ? parseMonto(dolaresRaw) : 0;
      const cuota = cuotaRaw ?? "";

      movimientos.push({
        fecha,
        referencia: referencia.trim(),
        cuota,
        comprobante,
        pesos,
        dolares,
      });
    }
  }
  return movimientos;
}

function formatFecha(fecha: string) {
  const [dd, mm, yy] = fecha.split("-");
  return `20${yy}-${mm}-${dd}`;
}

function parseMonto(monto: string): number {
  return parseFloat(monto.replace(/\./g, '').replace(',', '.'));
}