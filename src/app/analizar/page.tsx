"use client";

import {useState} from "react";
import Dropzone from "../analizar/components/Dropzone";
// import ResultViewer from "../analizar/components/ResultViewer";

interface movimiento {
  fecha: string;
  referencia: string;
  cuota: string;
  comprobante: string;
  pesos: number;
  dolares: number;
}

export default function AnalizarPage() {
  const [movimientos, setMovimientos] = useState<movimiento[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePDF = async (file: File) => {
    setLoading(true);
    const {parsePdf} = await import("../lib/parseGaliciaPdf");
    const data = await parsePdf(file);
    console.log("data del parser", data);
    setMovimientos(data);
    setLoading(false);
  };

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">
        Chequeá tu resumen
      </h1>

      <Dropzone onFileAccepted={handlePDF} />

      {loading && (
        <p className="mt-4 text-center text-sm">Procesando archivo…</p>
      )}

      {/* {movimientos && <ResultViewer data={movimientos} />} */}
      <pre>{JSON.stringify(movimientos, null, 2)}</pre>
    </main>
  );
}
