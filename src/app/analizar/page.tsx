"use client";

import {useState} from "react";
import Dropzone from "../analizar/components/Dropzone";
import ResultViewer from "../analizar/components/ResultViewer";
import {BankCardUploader} from "./components/BankCardUploader";

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

  // const handlePDF = async (file: File) => {
  //   setLoading(true);
  //   const {parsePdf} = await import("../lib/parsePdf");
  //   const data = await parsePdf(file);
  //   setMovimientos(data);
  //   setLoading(false);
  // };

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Chequealo</h1>
      <BankCardUploader />
      {/* <Dropzone onFileAccepted={handlePDF} />

      {loading && (
        <p className="mt-4 text-center text-sm">Procesando archivo…</p>
      )}

      {movimientos && <ResultViewer data={movimientos} />} */}
    </main>
  );
}
