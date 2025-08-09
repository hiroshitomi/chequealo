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
import {Loader2} from "lucide-react";

const bancos = ["Galicia", "ICBC"];
const tarjetas = ["Visa", "Mastercard (Próximamente)"];

export function BankCardUploader() {
  const [banco, setBanco] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [movimientos, setMovimientos] = useState<Movimiento[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const {parsePdf} = await import("../../lib/parsePdf");
      const data = await parsePdf(archivo, banco, tarjeta);
      setMovimientos(data);
      setError("");
    } catch (error) {
      console.error(error);
      setError("No se pudo procesar el PDF.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 flex-col md:flex-row">
        <Select onValueChange={setBanco} disabled={isLoading}>
          <SelectTrigger className="w-full">
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

        <Select onValueChange={setTarjeta} disabled={isLoading}>
          <SelectTrigger className="w-full">
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

      {/* Input oculto para personalizar label */}
      <input
        id="fileUpload"
        type="file"
        accept="application/pdf"
        onChange={handleFile}
        disabled={isLoading}
        className="hidden"
      />

      {/* Botón personalizado */}
      <label
        htmlFor="fileUpload"
        className={`cursor-pointer inline-block px-4 py-2 rounded-md bg-secondary text-secondary-foreground border-2 border-dashed 
          hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed ${
            isLoading ? "pointer-events-none opacity-50" : ""
          }`}
      >
        {archivo ? archivo.name : "Seleccioná tu resumen a chequear"}
      </label>
      <Button onClick={handleUpload}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Procesando...
          </>
        ) : (
          "Procesar PDF"
        )}
      </Button>

      {movimientos && <ResultViewer data={movimientos} />}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
