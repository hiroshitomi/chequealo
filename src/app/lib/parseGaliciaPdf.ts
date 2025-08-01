import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

GlobalWorkerOptions.workerPort = null;
GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';

interface movimiento {
  fecha: string,
  referencia: string,
  cuota: string,
  comprobante: string,
  pesos: number,
  dolares: number,
}

interface PdfTextItem {
  str: string;
  transform: number[];
}

interface LineItem {
  str: string;
  y: number;
}

export async function parsePdf(file: File) {
  const buffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: buffer }).promise;

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    console.log("num pages: ", pdf.numPages)
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const items = content.items as PdfTextItem[];

    const lines = items.reduce<LineItem[][]>((acc, item) => {
      const y = item.transform[5];
      const lastLine = acc[acc.length - 1];

      if (!lastLine || Math.abs(y - lastLine[0]?.y) > 2) {
        acc.push([{ str: item.str, y }]);
      } else {
        lastLine.push({ str: item.str, y });
      }

      return acc;
    }, []);

    const text = lines
      .map((line) => line.map((item) => item.str).join(" "))
      .join("\n");

    fullText += text + "\n";
  }
  const movimientos = extractMovimientos(fullText);
  // const movimientos = extractMovimientosVisa(fullText);
  return movimientos;
}

function extractMovimientos(text: string) {
  const movimientos: movimiento[] = [];
  const lines = text.split("\n").slice(28); // empieza desde la línea 28
  console.log("lines", lines)

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

// function extractMovimientosVisa(text: string): movimiento[] {
//   const lines = text.split("\n");
//   const movimientos: movimiento[] = [];

//   let parsing = false;

//   const regex = /^\s*(\d{2}-\w{3}-\d{2})\s+(.+?)\s+(\d{2}\/\d{2})?\s*(\d{5})?\s+([\d.]+,\d{2})(?:\s+([\d.]+,\d{2}))?/;

//   for (const line of lines) {
//     // Detecta la cabecera
//     if (!parsing && line.toUpperCase().includes("FECHA") && line.toUpperCase().includes("REFERENCIA")) {
//       parsing = true;
//       continue;
//     }

//     // Empieza a parsear solo después de la cabecera
//     if (parsing) {
//       const match = line.match(regex);

//       // Si no hay match con una fecha → terminar parseo
//       if (!match) break;

//       const [, fechaRaw, referencia, cuota = "", comprobante = "", pesosRaw, dolaresRaw] = match;
//       console.log("match: ", match)

//       movimientos.push({
//         fecha: formatFechaVisa(fechaRaw), // ej: 14-Oct-24 → 2024-10-14
//         referencia: referencia.trim(),
//         cuota,
//         comprobante,
//         pesos: parseMonto(pesosRaw),
//         dolares: dolaresRaw ? parseMonto(dolaresRaw) : 0,
//       });
//     }
//   }

//   return movimientos;
// }