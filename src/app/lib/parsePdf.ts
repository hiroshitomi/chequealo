import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { Movimiento } from "@/app/types/Movimiento";
import { galiciaVisaParser } from "@/app/lib/parsers/galicia/visa";
import { galiciaMastercardParser } from "@/app/lib/parsers/galicia/mastercard";
import { icbcVisaParser } from "@/app/lib/parsers/icbc/visa";
import { icbcMastercardParser } from "@/app/lib/parsers/icbc/mastercard";

GlobalWorkerOptions.workerPort = null;
GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';

interface LineItem {
  str: string;
  y: number;
}

interface PdfTextItem {
  str: string;
  transform: number[];
}

const parserMap: Record<
  string,
  Record<string, () => (text: string) => Movimiento[]>
> = {
  Galicia: {
    Visa: () => galiciaVisaParser,
    Mastercard: () => galiciaMastercardParser,
  },
  ICBC: {
    Visa: () => icbcVisaParser,
    Mastercard: () => icbcMastercardParser,
  },
};

export async function parsePdf(
  file: File,
  banco: string,
  tarjeta: string
): Promise<Movimiento[]> {
  const buffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: buffer }).promise;

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
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

  const parserFn = parserMap[banco]?.[tarjeta];
  if (!parserFn) throw new Error("No hay parser definido para esa combinación");

  return parserFn()(fullText);
}
