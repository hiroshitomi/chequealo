"use client";

import {Card, CardContent} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";

interface movimiento {
  fecha: string;
  referencia: string;
  cuota: string;
  comprobante: string;
  pesos: number;
  dolares: number;
}

type ResultViewerProps = {
  data: movimiento[];
};

export default function ResultViewer({data}: ResultViewerProps) {
  if (!data.length) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        No se encontraron movimientos.
      </p>
    );
  }

  const seen = new Map<string, number>();
  data.forEach((tx) => {
    const key = `${tx.fecha}|${tx.referencia}`;
    seen.set(key, (seen.get(key) || 0) + 1);
  });

  const isDuplicated = (tx: movimiento) => {
    return (seen.get(`${tx.fecha}|${tx.referencia}`) ?? 0) > 1;
  };

  return (
    <ScrollArea className="max-h-[500px] w-full">
      <div className="gap-2 grid grid-cols-2">
        {data.map((tx, idx) => {
          const duplicated = isDuplicated(tx);

          return (
            <Card
              key={idx}
              className={`rounded-2xl p-3 shadow-sm ${
                duplicated ? "border-red-500 bg-red-50" : ""
              }`}
            >
              <CardContent className="p-0 flex flex-col gap-1">
                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    {tx.fecha}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {tx.cuota}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="font-medium">{tx.referencia}</div>
                  <div className="text-right text-sm font-semibold">
                    ${""}
                    {tx.pesos !== 0
                      ? tx.pesos.toFixed(2)
                      : tx.dolares.toFixed(2)}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
}
