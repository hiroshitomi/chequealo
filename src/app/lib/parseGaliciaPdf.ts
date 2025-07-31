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
  for (let i = 1; i <= 1; i++) {
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
    console.log("fulltext", fullText)
  }

  const movimientos = extractMovimientos(fullText);

  return movimientos;
}

function extractMovimientos(text: string) {
  const movimientos: movimiento[] = [];
  const lines = text.split("\n").slice(28); // empieza desde la línea 28
  console.log("lines", lines)

  const regex = /^\s+(\d{2}-\d{2}-\d{2})\s+\*?\s*(.+?)\s+(?:(\d{2}\/\d{2})\s+)?(\d+)\s+([\d.]+,\d{2})(?:\s+([\d.]+,\d{2}))?$/;


  for (const line of lines) {
    const match = line.match(regex);
    console.log("match", match)
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
  console.log("movimientos", movimientos)
  return movimientos;
}

function formatFecha(fecha: string) {
  const [dd, mm, yy] = fecha.split("-");
  return `20${yy}-${mm}-${dd}`;
}

function parseMonto(valor: string) {
  return parseFloat(valor.replace(/\./g, "").replace(",", "."));
}

// function extractMovimientos(text: string) {
//   const movimientos: any[] = [];
//   const regex = /(\d{2}\/\d{2}) (.+?) (\d+,\d{2})/g;
//   let match;

//   while ((match = regex.exec(text)) !== null) {
//     movimientos.push({
//       fecha: match[1],
//       descripcion: match[2].trim(),
//       monto: match[3],
//     });
//   }

//   return movimientos;
// }

// function extractMovimientos(text: string) {
//   const movimientos: any[] = [];
//   const lines = text.split("\n");

//   const regex = /^(\d{2}\/\d{2})\s+(.+?)\s+(-?\$?\d{1,3}(?:\.\d{3})*,\d{2})$/;

//   for (const line of lines) {
//     const match = line.match(regex);

//     if (match) {
//       const [_, fecha, descripcion, montoRaw] = match;

//       // Limpia símbolos y convierte a número
//       const monto = parseFloat(
//         montoRaw.replace(/\./g, "").replace(",", ".").replace("$", "")
//       );

//       movimientos.push({
//         fecha,
//         descripcion: descripcion.trim(),
//         monto,
//       });
//     }
//   }

//   return movimientos;
// }

