// components/BankCardUploader.tsx
"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ResultViewer from "../components/ResultViewer";
import {Movimiento} from "@/app/types/Movimiento";

const bancos = ["Galicia", "ICBC"];
const tarjetas = ["Visa", "Mastercard", "American Express"];

export function BankCardUploader() {
  const [banco, setBanco] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [movimientos, setMovimientos] = useState<Movimiento[] | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setArchivo(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!archivo || !banco || !tarjeta) {
      setError("Seleccioná banco, tarjeta y archivo");
      return;
    }
    try {
      const {parsePdf} = await import("../../lib/parsePdf");
      const data = await parsePdf(archivo, banco, tarjeta);
      setMovimientos(data);
      setError("");
    } catch (error) {
      console.error(error);
      setError("No se pudo procesar el PDF.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Select onValueChange={setBanco}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Banco" />
          </SelectTrigger>
          <SelectContent>
            {bancos.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setTarjeta}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tarjeta" />
          </SelectTrigger>
          <SelectContent>
            {tarjetas.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <input
        className="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center cursor-pointer mb-2"
        type="file"
        accept="application/pdf"
        onChange={handleFile}
      />
      <Button onClick={handleUpload}>Procesar PDF</Button>

      {movimientos && <ResultViewer data={movimientos} />}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
