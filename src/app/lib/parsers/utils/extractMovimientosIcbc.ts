import { Movimiento } from "@/app/types/Movimiento";

export function extractMovimientosICBC(text: string): Movimiento[] {
  const movimientos: Movimiento[] = [];

  const lines = text.split("\n");

  const fechaRegex = /\d{2}-[A-Za-z]{3}-\d{2}/; // ejemplo: 14-Oct-24

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!fechaRegex.test(line)) continue;

    const parts = line.split(/\s{2,}/); // separa por 2 o más espacios

    if (parts.length >= 5) {
      const [fecha, referencia, cuota, comprobante, pesosStr] = parts;

      movimientos.push({
        fecha: fecha.trim(),
        referencia: referencia.trim(),
        cuota: cuota?.trim() ?? "",
        comprobante: comprobante.trim(),
        pesos: parseFloat(pesosStr.replace(/\./g, "").replace(",", ".")) || 0,
        dolares: 0,
      });
    }
  }

  return movimientos;
}
